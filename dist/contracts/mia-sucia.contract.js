// backend/src/contracts/mia-sucia.contract.ts
// -------------------------------------------------------------
//  CONTRATO MIA SUCIA — Versión 1.0 (Alineado a SUPREMO)
// -------------------------------------------------------------
//
//  Este contrato define la estructura diplomática oficial
//  que el Backend entrega a SRC y que SUPREMO consume.
//
//  ✔ NO hace cognición
//  ✔ NO interpreta música
//  ✔ NO transforma MIDI
//  ✔ NO usa ARKLIM ni CRUZ
//
// -------------------------------------------------------------
// -------------------------------------------------------------
//  ADAPTADOR: PMSmiaTramo → MidiNote (para SRC y SUPREMO)
// -------------------------------------------------------------
export function tramoToMidiNote(t) {
    return {
        id: crypto.randomUUID(),
        pitch: t.altura,
        startTime: t.inicio,
        duration: t.fin - t.inicio,
        velocity: 100,
        trackIndex: t.capa === "BASE" ? 0 :
            t.capa === "ACMP" ? 1 :
                2,
        channel: 0
    };
}
