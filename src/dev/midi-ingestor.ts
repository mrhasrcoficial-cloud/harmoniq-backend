// backend/src/dev/midi-ingestor.ts
// -------------------------------------------------------------
//  MIDI INGESTOR — País Backend (Constitución 1.4.1)
// -------------------------------------------------------------

import type { BackendMidiNote } from "../dev/types/backend.types.js";
import MidiPkg from "@tonejs/midi";
const { Midi } = MidiPkg;

export function ingestMidi(
  buffer: Uint8Array | ArrayBuffer
): {
  notes: BackendMidiNote[];
  bpm: number;
  ppq: number;
  duracion: number;
} {
  const uint8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

  let midi: any; // ⭐ Blindaje contra tipos incompletos de ToneJS
  try {
    midi = new Midi(uint8);
  } catch (err) {
    console.error("❌ Error al parsear MIDI:", err);

    // ⭐ Return garantizado (evita el error TS)
    return { notes: [], bpm: 120, ppq: 480, duracion: 0 };
  }

  // -------------------------------------------------------------
  //  INGESTOR MIDI — Constitución 1.4.1 (alineado a pipeline 2.0)
  // -------------------------------------------------------------

  const notes: BackendMidiNote[] = [];

  midi.tracks.forEach((track: any, trackIndex: number) => {
    track.notes.forEach((n: any, idx: number) => {
      notes.push({
        id: `${trackIndex}-${idx}`,
        trackIndex,
        pitch: n.midi,
        startTime: n.time,
        duration: n.duration,
        velocity: n.velocity,
        pitchClass: n.midi % 12
      });
    });
  });

  // ⭐ Ordenar notas por tiempo (estabilidad constitucional)
  notes.sort((a, b) => a.startTime - b.startTime);

  // Metadata física
  const bpm = midi.header?.tempos?.[0]?.bpm ?? 120;
  const ppq = midi.header?.ppq ?? 480;
  const duracion = midi.duration ?? 0;

  // ⭐ Return final garantizado
  return { notes, bpm, ppq, duracion };
}