// backend/src/dev/midi-ingestor.ts
// -------------------------------------------------------------
//  MIDI INGESTOR — País Backend (Constitución 1.4.1)
// -------------------------------------------------------------
import MidiPkg from "@tonejs/midi";
const { Midi } = MidiPkg;
export function ingestMidi(buffer) {
    const uint8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let midi; // ⭐ Blindaje contra tipos incompletos de ToneJS
    try {
        midi = new Midi(uint8);
    }
    catch (err) {
        console.error("❌ Error al parsear MIDI:", err);
        return { notes: [], bpm: 120, ppq: 480, duracion: 0 };
    }
    const notes = [];
    midi.tracks.forEach((track, trackIndex) => {
        track.notes.forEach((n, idx) => {
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
    const bpm = midi.header?.tempos?.[0]?.bpm ?? 120;
    const ppq = midi.header?.ppq ?? 480;
    const duracion = midi.duration ?? 0;
    return { notes, bpm, ppq, duracion };
}
