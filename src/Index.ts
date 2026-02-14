// backend/src/index.ts
// -------------------------------------------------------------
//  ENTRADA OFICIAL BACKEND — Constitución 2.2
//  Pipeline soberano unificado (CAMINO B + CAMINO C):
//    MIDI → ingestMidi → IAOrchestrator → capas → tramos → cubo → MIA SUCIA
//    + análisis musical
//    + (opcional) Aduana Backend para control profundo
//
//  ⚠️ Este archivo es el punto de compilación y entrada oficial.
//  La carpeta de compilación parte desde aquí.
// -------------------------------------------------------------

import type { MiaSucia } from "./contracts/mia-sucia.contract.js";

import { ingestMidi } from "./dev/midi-ingestor.js";
import { IAOrchestrator } from "./departamentoia/IAOrchestrator.js";

import { adaptarCapasATramos } from "./backend-adaptadores-tramos/adaptador-tramos.js";
import { construirMiaSucia } from "./dev/constructor-mia-sucia.js";

// Validador constitucional oficial (booleano)
import { validarMiaSucia as validarMiaConstitucional } from "./dev/validar-mia-sucia.js";

// Aduana Backend (control profundo, opcional)
import { validarMiaSucia as aduanaValidarMiaSucia } from "./aduana/aduana-mia-sucia.js";

import { generarAnalisisMusical } from "./dev/analisis-musical.js";

export async function procesarMIDI(
  midiBuffer: Uint8Array | ArrayBuffer
): Promise<MiaSucia & { analisisMusical: any }> {
  // 1. Normalizar buffer
  const buffer =
    midiBuffer instanceof Uint8Array ? midiBuffer : new Uint8Array(midiBuffer);

  // 2. Ingesta física
  const { notes, bpm, ppq, duracion } = ingestMidi(buffer);

  // 3. Pipeline IA constitucional (notas → capas)
  const ia = new IAOrchestrator();
  const capasNotas = ia.run(notes);

  // 4. Adaptar capas → TRAMOS reales
  const capasConTramos = adaptarCapasATramos(capasNotas);

  // 5. Construcción del cubo soberano (con TRAMOS reales)
  const cubo = construirMiaSucia(capasConTramos);

  // 6. Totales derivados
  const totalNotas = notes.length;
  const totalTramos =
    cubo.capas.BASE.tramos.length +
    cubo.capas.ACOMPANAMIENTO.tramos.length +
    cubo.capas.RUIDO.tramos.length;

  // 7. Ensamblar contrato MIA SUCIA v1.0
  const miaSucia: MiaSucia = {
    version: "1.0",
    cubo,
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas,
    totalTramos
  };

  // 8. Análisis musical optimizado
  const analisisMusical = generarAnalisisMusical(miaSucia);

  // 9. Validación constitucional oficial (booleano)
  const esValida = validarMiaConstitucional(miaSucia);
  if (!esValida) {
    throw new Error("MIA SUCIA inválida según el validador constitucional.");
  }

  // 10. (Opcional) Aduana Backend — control profundo
  //     Descomentar si quieres que cada MIA pase por la Aduana.
  // aduanaValidarMiaSucia(miaSucia);

  // 11. Devolver MIA SUCIA + análisis musical
  return {
    ...miaSucia,
    analisisMusical
  };
}