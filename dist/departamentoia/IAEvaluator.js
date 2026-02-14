// backend/src/departamentoia/IAEvaluator.ts
// -------------------------------------------------------------
//  IAEvaluator — Evaluación superficial de notas
//  Constitución 2.2 (preserva channel, pitch, y datos originales)
// -------------------------------------------------------------
//  Este módulo determina el "tipo" de cada nota:
//      - estructural
//      - guia
//      - paso
//      - relleno
//      - tension
//      - resolucion
//      - fantasma
//      - micro
//      - aislada
//      - acentuada
//      - debil
// -------------------------------------------------------------
// -------------------------------------------------------------
//  FUNCIÓN PRINCIPAL
// -------------------------------------------------------------
export function evaluarNotas(notes) {
    return notes.map((n, i) => evaluarNota(n, i, notes));
}
// -------------------------------------------------------------
//  EVALUACIÓN INDIVIDUAL
// -------------------------------------------------------------
function evaluarNota(n, index, notes) {
    const vecinos = obtenerVecinos(n, notes);
    const tipo = inferirTipo(n, vecinos);
    const estabilidad = calcularEstabilidad(n);
    const importancia = calcularImportancia(n, vecinos);
    return {
        ...n, // ⭐ preserva id, pitch, startTime, duration, velocity, pitchClass, channel
        tipo,
        estabilidad,
        importancia,
        contexto: {
            vecinosCercanos: vecinos.length,
            distanciaPromedio: distanciaPromedio(vecinos, n)
        }
    };
}
// -------------------------------------------------------------
//  DETECCIÓN DE VECINOS
// -------------------------------------------------------------
function obtenerVecinos(n, notes) {
    return notes.filter((m) => m !== n &&
        Math.abs(m.startTime - n.startTime) < 0.25 &&
        Math.abs(m.pitch - n.pitch) < 3);
}
function distanciaPromedio(vecinos, n) {
    if (vecinos.length === 0)
        return 1;
    const sum = vecinos.reduce((acc, m) => acc + Math.abs(m.startTime - n.startTime), 0);
    return sum / vecinos.length;
}
// -------------------------------------------------------------
//  INFERENCIA DEL TIPO DE NOTA
// -------------------------------------------------------------
function inferirTipo(n, vecinos) {
    if (n.duration <= 0 || n.velocity <= 0)
        return "fantasma";
    if (n.duration < 0.03)
        return "micro";
    if (vecinos.length === 0)
        return "aislada";
    if (n.pitchClass === 0 || n.pitchClass === 5 || n.pitchClass === 7)
        return "estructural";
    if (n.pitchClass === 4 || n.pitchClass === 11)
        return "guia";
    if (n.pitchClass === 2 || n.pitchClass === 9)
        return "tension";
    if (n.pitchClass === 0 || n.pitchClass === 4)
        return "resolucion";
    if (n.duration < 0.12)
        return "paso";
    return "relleno";
}
// -------------------------------------------------------------
//  ESTABILIDAD (0–1)
// -------------------------------------------------------------
function calcularEstabilidad(n) {
    if (n.pitchClass === 0)
        return 1.0;
    if (n.pitchClass === 7)
        return 0.9;
    if (n.pitchClass === 5)
        return 0.85;
    if (n.pitchClass === 4)
        return 0.75;
    if (n.pitchClass === 11)
        return 0.7;
    return 0.4;
}
// -------------------------------------------------------------
//  IMPORTANCIA (0–1)
// -------------------------------------------------------------
function calcularImportancia(n, vecinos) {
    let imp = 0;
    imp += Math.min(n.duration / 0.5, 1);
    imp += Math.min(n.velocity / 0.8, 1);
    imp += Math.min(vecinos.length / 4, 1);
    return imp / 3;
}
