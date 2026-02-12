// backend/src/index.ts
import type { MiaSucia } from "./contracts/mia-sucia.contract.js";

import { ingestMidi } from "./dev/midi-ingestor.js";
import { asignarRoles } from "./dev/asignar-roles.js";
import { noiseFilterIA } from "./departamentoia/noise-filter-ia.js";
import { evaluarNotas } from "./departamentoia/IAEvaluator.js";
import {
  IAbrow_clasificarNotas,
  IAbrow_clasificarCapas
} from "./departamentoia/IAbrow.js";

import { adaptarCapasATramos } from "./backend-adaptadores-tramos/adaptador-tramos.js";
import { construirMiaSucia } from "./dev/constructor-mia-sucia.js";

import { validarMiaSucia } from "./aduana/aduana-mia-sucia.js";
import { TransportadorA } from "./teletransportador-A.js";

import { generarAnalisisMusical } from "./dev/analisis-musical.js";

export async function procesarMIDI(
  midiBuffer: Uint8Array | ArrayBuffer
): Promise<MiaSucia & { analisisMusical: any }> {

  // 1. Normalizar buffer
  const buffer =
    midiBuffer instanceof Uint8Array ? midiBuffer : new Uint8Array(midiBuffer);

  // 2. Ingesta física
  const { notes, bpm, ppq, duracion } = ingestMidi(buffer);

  // 3. Adaptador inicial
  const notasAdaptadas = asignarRoles(notes);

  // 4. Filtrado superficial
  const filtradas = noiseFilterIA(notasAdaptadas);

  // 5. Evaluación superficial
  const evaluadas = evaluarNotas(filtradas);

  // 6. Clasificación IA‑MIA
  const notasClasificadas = IAbrow_clasificarNotas(evaluadas);

  // 7. Capas constitucionales (NOTAS)
  const capas = IAbrow_clasificarCapas(notasClasificadas);

  // 8. Adaptar capas → TRAMOS reales
  const capasConTramos = adaptarCapasATramos(capas);

  // 9. Construcción del cubo soberano (con TRAMOS reales)
  const cubo = construirMiaSucia(capasConTramos);

  // 10. Totales derivados
  const totalNotas = notasClasificadas.length;
  const totalTramos =
    cubo.capas.BASE.tramos.length +
    cubo.capas.ACOMPANAMIENTO.tramos.length +
    cubo.capas.RUIDO.tramos.length;

  // 11. Ensamblar contrato MIA SUCIA v1.0
  const miaSucia: MiaSucia = {
    version: "1.0",
    cubo,
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas,
    totalTramos
  };

  // 12. Análisis musical optimizado
  const analisisMusical = generarAnalisisMusical(miaSucia);

  // 13. Validación constitucional
  validarMiaSucia(miaSucia);

  // 14. Ministerio Exterior
  const transportador = new TransportadorA();
  const miaFinal = transportador.enviar(miaSucia);

  // 15. Devolver MIA SUCIA + análisis musical
  return {
    ...miaFinal,
    analisisMusical
  };
}