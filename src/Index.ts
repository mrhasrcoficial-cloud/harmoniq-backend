// backend/src/index.ts
// -------------------------------------------------------------
//  ENTRADA OFICIAL BACKEND — Constitución 2.2
// -------------------------------------------------------------

import type { MiaSucia, BackendMidiNote } from "./contracts/mia-sucia.contract.js";

import { ingestMidi } from "./dev/midi-ingestor.js";
import { IAOrchestrator } from "./departamentoia/IAOrchestrator.js";

import { adaptarCapasATramos } from "./backend-adaptadores-tramos/adaptador-tramos.js";
import { construirMiaSucia } from "./dev/constructor-mia-sucia.js";

import { validarMiaSucia as validarMiaConstitucional } from "./dev/validar-mia-sucia.js";
import { generarAnalisisMusical } from "./dev/analisis-musical.js";

export async function procesarMIDI(
  midiBuffer: Uint8Array | ArrayBuffer
): Promise<MiaSucia & { analisisMusical: any }> {

  const buffer =
    midiBuffer instanceof Uint8Array ? midiBuffer : new Uint8Array(midiBuffer);

  // 2. Ingesta física → ⭐ AQUÍ ya tenemos las notas reales
  const { notes, bpm, ppq, duracion } = ingestMidi(buffer);

  // 3. IA constitucional
  const ia = new IAOrchestrator();
  const capasNotas = ia.run(notes);

  // 4. Adaptar capas → tramos
  const capasConTramos = adaptarCapasATramos(capasNotas);

  // 5. Construir cubo
  const cubo = construirMiaSucia(capasConTramos);

  // 6. Totales
  const totalNotas = notes.length;
  const totalTramos =
    cubo.capas.BASE.tramos.length +
    cubo.capas.ACOMPANAMIENTO.tramos.length +
    cubo.capas.RUIDO.tramos.length;

  // ⭐ 6.1 Mapear notas reales al contrato público
  const notasOriginales: BackendMidiNote[] = notes.map(n => ({
    pitch: n.pitch,
    startTime: n.startTime,
    duration: n.duration,
    velocity: n.velocity,
    trackIndex: n.trackIndex,
    channel: n.channel
  }));

  // 7. Ensamblar MIA SUCIA v1.0 (sin cambiar versión)
  const miaSucia: MiaSucia = {
    version: "1.0",
    cubo,
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas,
    totalTramos,
    notasOriginales   // ⭐ AQUÍ
  };

  const analisisMusical = generarAnalisisMusical(miaSucia);

  const esValida = validarMiaConstitucional(miaSucia);
  if (!esValida) {
    throw new Error("MIA SUCIA inválida según el validador constitucional.");
  }

  return {
    ...miaSucia,
    analisisMusical
  };
}