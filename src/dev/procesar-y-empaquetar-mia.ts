// backend/src/dev/procesar-y-empaquetar-mia.ts
// -------------------------------------------------------------
//  PROCESAR + EMPAQUETAR MIA SUCIA — Constitución 2.1
// -------------------------------------------------------------

import { ingestMidi } from "./midi-ingestor.js";
import { IAOrchestrator } from "../departamentoia/IAOrchestrator.js";

import { adaptarCapasATramos } from "../backend-adaptadores-tramos/adaptador-tramos.js";
import { construirMiaSucia } from "./constructor-mia-sucia.js";
import { empaquetarMiaSucia } from "./empaquetador-mia-sucia.js";

import type { MiaSucia } from "../contracts/mia-sucia.contract.js";
import { validarMiaSucia } from "./validar-mia-sucia.js";

import { generarAnalisisMusical } from "./analisis-musical.js";

export async function procesarYEmpaquetarMia(
  midiBuffer: Uint8Array | ArrayBuffer,
  outputPath?: string
): Promise<MiaSucia & { analisisMusical: any }> {

  // 1. Ingestar MIDI físico
  const { notes, bpm, ppq, duracion } = ingestMidi(midiBuffer);

  // 2. Pipeline IA constitucional (notas → capas)
  const ia = new IAOrchestrator();
  const capasNotas = ia.run(notes);

  // 3. Adaptar capas → TRAMOS reales
  const capasConTramos = adaptarCapasATramos(capasNotas);

  // 4. Construir cubo soberano (con TRAMOS)
  const cubo = construirMiaSucia(capasConTramos);

  // 5. Construir contrato final
  const mia: MiaSucia = {
    version: "1.0",
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas: notes.length,
    totalTramos:
      cubo.capas.BASE.tramos.length +
      cubo.capas.ACOMPANAMIENTO.tramos.length +
      cubo.capas.RUIDO.tramos.length,
    cubo,

    // ⭐ NUEVO: notas reales del MIDI físico
    notasOriginales: notes
  };

  // 6. Análisis musical clásico (CAMINO B)
  const analisisMusical = generarAnalisisMusical(mia);

  // 7. Validar contrato
  validarMiaSucia(mia);

  // 8. Empaquetado opcional
  if (outputPath) {
    empaquetarMiaSucia(mia, outputPath);
  }

  // 9. Devolver contrato soberano + análisis musical
  return {
    ...mia,
    analisisMusical
  };
}