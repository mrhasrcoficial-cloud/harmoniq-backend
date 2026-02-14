// -------------------------------------------------------------
//  CONTRATO MIA SUCIA — Versión 1.0 (Alineado a SUPREMO 2.2)
//  Fuente soberana para SRC → SUPREMO → CRUZ → ARKLIM
// -------------------------------------------------------------
// -------------------------------------------------------------
//  ADAPTADOR: PMSmiaTramo → MidiNote (solo para vistas geográficas)
// -------------------------------------------------------------
export function tramoToMidiNote(t) {
    return {
        id: crypto.randomUUID(),
        pitch: t.altura,
        startTime: t.inicio,
        duration: t.fin - t.inicio,
        velocity: 100,
        trackIndex: t.capa === "BASE" ? 0 :
            t.capa === "ACOMPANAMIENTO" ? 1 :
                2
    };
}
