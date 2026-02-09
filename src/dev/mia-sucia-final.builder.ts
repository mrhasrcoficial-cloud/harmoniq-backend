// backend/src/dev/mia-sucia-final.builder.ts
// -------------------------------------------------------------
//  CONSTRUCTOR FINAL MIA SUCIA — Constitución 1.4.1
//  Alineado al pipeline IAOrchestrator (clasificación completa)
// -------------------------------------------------------------

import type { BackendMidiNote } from "./types/backend.types.js";
import type { MiaSuciaCapas } from "./types/backend.types.js";

import { IAOrchestrator } from "../departamentoia/IAOrchestrator.js";
import { construirMiaSucia as construirCubo } from "./constructor-mia-sucia.js";

interface DatosMiaFinal {
  notes: BackendMidiNote[];
  bpm: number;
  ppq: number;
  duracion: number;
}

export function construirMiaSuciaFinal({
  notes,
  bpm,
  ppq,
  duracion
}: DatosMiaFinal) {

  // ⭐ 1. Pipeline completo IA (ruido físico → evaluación → rol → capas)
  const ia = new IAOrchestrator();
  const capas: MiaSuciaCapas = ia.run(notes);

  // ⭐ 2. Construir cubo soberano (BASE / ACOMP / RUIDO)
  const cubo = construirCubo(capas);

  // ⭐ 3. Construir contrato MIA SUCIA v1.0
  return {
    version: "1.0",
    bpmDetectado: bpm,
    ppq,
    duracion,

    totalNotas: notes.length,

    totalTramos:
      cubo.capas.BASE.tramos.length +
      cubo.capas.ACOMPANAMIENTO.tramos.length +
      cubo.capas.RUIDO.tramos.length,

    cubo
  };
}