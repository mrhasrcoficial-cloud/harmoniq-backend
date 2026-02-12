// backend/src/dev/midi-ingestor.ts
// -------------------------------------------------------------
//  MIDI INGESTOR — País Backend (Constitución 2.1)
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

  let midi: any;
  try {
    midi = new Midi(uint8);
  } catch (err) {
    console.error("❌ Error al parsear MIDI:", err);
    return { notes: [], bpm: 120, ppq: 480, duracion: 0 };
  }

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
        pitchClass: n.midi % 12,

        // ⭐ CORRECCIÓN FUNDAMENTAL
        channel: n.channel ?? 0
      });
    });
  });

  notes.sort((a, b) => a.startTime - b.startTime);

  const bpm = midi.header?.tempos?.[0]?.bpm ?? 120;
  const ppq = midi.header?.ppq ?? 480;
  const duracion = midi.duration ?? 0;

  return { notes, bpm, ppq, duracion };
}