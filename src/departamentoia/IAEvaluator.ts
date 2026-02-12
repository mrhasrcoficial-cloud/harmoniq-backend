// backend/src/departamentoia/IAEvaluator.ts
// -------------------------------------------------------------
//  IAEvaluator — Evaluación superficial de notas
//  Constitución 2.1 (preserva channel, pitch, y datos originales)
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

import type { BackendMidiNote } from "../dev/types/backend.types.js";

export type TipoDeNota =
  | "estructural"
  | "guia"
  | "paso"
  | "relleno"
  | "tension"
  | "resolucion"
  | "fantasma"
  | "micro"
  | "aislada"
  | "acentuada"
  | "debil";

// ⭐ NotaEvaluada hereda TODO de BackendMidiNote (incluye channel)
export interface NotaEvaluada extends BackendMidiNote {
  tipo: TipoDeNota;
  estabilidad: number;   // 0–1
  importancia: number;   // 0–1
  contexto: {
    vecinosCercanos: number;
    distanciaPromedio: number;
  };
}

// -------------------------------------------------------------
//  FUNCIÓN PRINCIPAL
// -------------------------------------------------------------
export function evaluarNotas(notes: BackendMidiNote[]): NotaEvaluada[] {
  return notes.map((n, i) => evaluarNota(n, i, notes));
}

// -------------------------------------------------------------
//  EVALUACIÓN INDIVIDUAL
// -------------------------------------------------------------
function evaluarNota(
  n: BackendMidiNote,
  index: number,
  notes: BackendMidiNote[]
): NotaEvaluada {
  const vecinos = obtenerVecinos(n, notes);

  const tipo = inferirTipo(n, vecinos);
  const estabilidad = calcularEstabilidad(n);
  const importancia = calcularImportancia(n, vecinos);

  return {
    ...n, // ⭐ preserva channel, pitch, velocity, etc.
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
function obtenerVecinos(n: BackendMidiNote, notes: BackendMidiNote[]) {
  return notes.filter(
    (m) =>
      m !== n &&
      Math.abs(m.startTime - n.startTime) < 0.25 && // ventana contextual
      Math.abs(m.pitch - n.pitch) < 3
  );
}

function distanciaPromedio(vecinos: BackendMidiNote[], n: BackendMidiNote) {
  if (vecinos.length === 0) return 1;
  const sum = vecinos.reduce(
    (acc, m) => acc + Math.abs(m.startTime - n.startTime),
    0
  );
  return sum / vecinos.length;
}

// -------------------------------------------------------------
//  INFERENCIA DEL TIPO DE NOTA
// -------------------------------------------------------------
function inferirTipo(
  n: BackendMidiNote,
  vecinos: BackendMidiNote[]
): TipoDeNota {
  // 1) Notas fantasma
  if (n.duration <= 0 || n.velocity <= 0) return "fantasma";

  // 2) Micro-notas
  if (n.duration < 0.03) return "micro";

  // 3) Notas aisladas
  if (vecinos.length === 0) return "aislada";

  // 4) Notas estructurales (grados fuertes)
  if (n.pitchClass === 0 || n.pitchClass === 5 || n.pitchClass === 7)
    return "estructural";

  // 5) Notas guía (3ª y 7ª)
  if (n.pitchClass === 4 || n.pitchClass === 11) return "guia";

  // 6) Notas de tensión (2ª, 6ª)
  if (n.pitchClass === 2 || n.pitchClass === 9) return "tension";

  // 7) Notas de resolución (1ª, 3ª)
  if (n.pitchClass === 0 || n.pitchClass === 4) return "resolucion";

  // 8) Notas de paso
  if (n.duration < 0.12) return "paso";

  // 9) Notas de relleno
  return "relleno";
}

// -------------------------------------------------------------
//  ESTABILIDAD (0–1)
// -------------------------------------------------------------
function calcularEstabilidad(n: BackendMidiNote): number {
  if (n.pitchClass === 0) return 1.0;
  if (n.pitchClass === 7) return 0.9;
  if (n.pitchClass === 5) return 0.85;
  if (n.pitchClass === 4) return 0.75;
  if (n.pitchClass === 11) return 0.7;
  return 0.4;
}

// -------------------------------------------------------------
//  IMPORTANCIA (0–1)
// -------------------------------------------------------------
function calcularImportancia(
  n: BackendMidiNote,
  vecinos: BackendMidiNote[]
): number {
  let imp = 0;

  // duración
  imp += Math.min(n.duration / 0.5, 1);

  // velocity
  imp += Math.min(n.velocity / 0.8, 1);

  // vecinos
  imp += Math.min(vecinos.length / 4, 1);

  return imp / 3;
}