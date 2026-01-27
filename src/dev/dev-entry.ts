// backend/src/dev/dev-entry.ts
// -------------------------------------------------------------
//  PAÍS DEV — EXPORTADOR OFICIAL DE OFICINAS INTERNAS
//  Archivo constitucional 1.4.1
// -------------------------------------------------------------
//
//  Este archivo:
//
//  ✔ Exporta únicamente módulos NO cognitivos
//  ✔ No usa ARKLIM
//  ✔ No usa CRUZ
//  ✔ No interpreta música
//  ✔ No transforma MIDI
//  ✔ No altera pitch, duración, velocity o posición
//
// -------------------------------------------------------------


// -------------------------------------------------------------
// Ministerio de Entrada (lectura física del MIDI)
// -------------------------------------------------------------
export { ingestMidi } from "./midi-ingestor.js";


// -------------------------------------------------------------
// Ministerio de Capas (clasificación superficial BASE/ACOMP/RUIDO)
// -------------------------------------------------------------
export { layerMapper } from "./layer-mapper.js";


// -------------------------------------------------------------
// Ministerio de Identidad (constructor de MIA SUCIA v1.0)
// -------------------------------------------------------------
export { construirMiaSucia } from "./constructor-mia-sucia.js";


// -------------------------------------------------------------
// Ministerio de Plantillas Geográficas (cubo MIA SUCIA v1.0)
// -------------------------------------------------------------
export { crearPlantillaMia } from "./templates/mia.plantilla.js";


// -------------------------------------------------------------
// Ministerio de Desempaquetado Diplomático (.mia → objeto)
// -------------------------------------------------------------
export { desempaquetarMiaSucia } from "./desempaquetador-mia-sucia.js";


// -------------------------------------------------------------
// Ministerio de Tipos (contratos oficiales del Backend)
// -------------------------------------------------------------
export * from "./types/backend.types.js";
export * from "./types/mia.types.js";


// -------------------------------------------------------------
// Ministerio de Utilidades Técnicas (solo utilidades NO cognitivas)
// -------------------------------------------------------------
export { arrayBufferToBase64, base64ToArrayBuffer } from "./utils/base64.js";
export { toRealArrayBuffer } from "./utils/buffer.js";
