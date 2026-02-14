// backend/src/dev/aduana/aduana-mia-sucia.ts
// -------------------------------------------------------------
//  ADUANA MIA SUCIA — Constitución 2.1 (Alineado a SUPREMO)
// -------------------------------------------------------------
//  ⚠️ IMPORTANTE — CAMINO B:
//  Esta NO es la validación constitucional oficial del contrato.
//  Esa vive en: dev/validar-mia-sucia.ts
//
//  La Aduana es un órgano de CONTROL PROFUNDO:
//    - Revisa más estrictamente
//    - Lanza errores si algo está mal
//    - No define identidad del MIA SUCIA
//    - No reemplaza al validador oficial
//    - No participa en el pipeline soberano
//
//  Su función es AUDITAR, no IDENTIFICAR.
//  SRC y SUPREMO siguen usando el validador oficial.
// -------------------------------------------------------------
// Validación principal (contrato SUPREMO)
// ⚠️ Esta función es ADUANA, no validador constitucional.
//    Lanza errores si algo no cumple los estándares internos.
export function validarMiaSucia(mia) {
    if (mia.version !== "1.0") {
        throw new Error("Aduana Backend: Versión MIA SUCIA inválida.");
    }
    // Validar cubo soberano
    validarCubo(mia.cubo);
    // Metadata física requerida por SUPREMO
    if (typeof mia.bpmDetectado !== "number") {
        throw new Error("Aduana Backend: bpmDetectado inválido.");
    }
    if (typeof mia.ppq !== "number") {
        throw new Error("Aduana Backend: ppq inválido.");
    }
    if (typeof mia.duracion !== "number") {
        throw new Error("Aduana Backend: duracion inválida.");
    }
    // Totales opcionales
    if (mia.totalNotas !== undefined && typeof mia.totalNotas !== "number") {
        throw new Error("Aduana Backend: totalNotas inválido.");
    }
    if (mia.totalTramos !== undefined && typeof mia.totalTramos !== "number") {
        throw new Error("Aduana Backend: totalTramos inválido.");
    }
    return {
        ok: true,
        totalNotes: mia.totalNotas ?? 0,
        signature: "aduana-backend-1.4.1",
        timestamp: Date.now()
    };
}
// Validación del cubo geográfico MIA SUCIA v1.0
function validarCubo(cubo) {
    if (!cubo || typeof cubo !== "object") {
        throw new Error("Aduana Backend: cubo inválido.");
    }
    if (cubo.version !== "1.0") {
        throw new Error("Aduana Backend: versión del cubo inválida.");
    }
    // Capas soberanas
    validarCapa(cubo.capas.BASE, "BASE");
    validarCapa(cubo.capas.ACOMPANAMIENTO, "ACOMPANAMIENTO");
    validarCapa(cubo.capas.RUIDO, "RUIDO");
}
// Validación de una capa soberana
function validarCapa(capa, nombre) {
    if (!capa || typeof capa !== "object") {
        throw new Error(`Aduana Backend: capa ${nombre} inválida.`);
    }
    if (capa.nombre !== nombre) {
        throw new Error(`Aduana Backend: nombre de capa ${nombre} inválido.`);
    }
    if (!Array.isArray(capa.tramos)) {
        throw new Error(`Aduana Backend: tramos de ${nombre} inválidos.`);
    }
    capa.tramos.forEach(t => validarTramo(t, nombre));
}
// Validación superficial de un tramo PMSmia
function validarTramo(t, capaEsperada) {
    // ⭐ alturaTexto (decorativo)
    if (typeof t.alturaTexto !== "string" || t.alturaTexto.length === 0) {
        throw new Error("Aduana Backend: tramo.alturaTexto inválido.");
    }
    // ⭐ pitch MIDI real
    if (typeof t.pitch !== "number" || t.pitch < 0) {
        throw new Error("Aduana Backend: tramo.pitch inválido.");
    }
    if (typeof t.inicio !== "number" || t.inicio < 0) {
        throw new Error("Aduana Backend: tramo.inicio inválido.");
    }
    if (typeof t.fin !== "number" || t.fin < 0) {
        throw new Error("Aduana Backend: tramo.fin inválido.");
    }
    if (t.fin < t.inicio) {
        throw new Error("Aduana Backend: tramo.fin < tramo.inicio.");
    }
    if (t.capa !== capaEsperada) {
        throw new Error("Aduana Backend: tramo.capa no coincide con la capa contenedora.");
    }
}
