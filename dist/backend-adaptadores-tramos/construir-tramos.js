// -------------------------------------------------------------
//  ADAPTADOR DE TRAMOS — Constitución 2.2
//  Convierte MiaSuciaCapas → PMSmiaTramo con pitch real
// -------------------------------------------------------------
import { pitchToHAJL } from "./altura-hajl.js";
function convertirListaANTramos(lista, capa) {
    return lista.map(n => {
        const alturaTexto = pitchToHAJL(n.pitch);
        const inicio = Number(n.startTime) || 0;
        const dur = Number(n.duration) || 0;
        const fin = Math.max(inicio + dur, inicio + 0.01);
        return {
            capa,
            pitch: n.pitch, // ⭐ pitch MIDI real
            alturaTexto, // ⭐ etiqueta HA–JL decorativa
            inicio,
            fin
        };
    });
}
export function construirTramosDesdeCapas(capas) {
    const baseTramos = convertirListaANTramos(capas.BASE, "BASE");
    const acompTramos = convertirListaANTramos(capas.ACOMPANAMIENTO, "ACOMPANAMIENTO");
    const ruidoTramos = convertirListaANTramos(capas.RUIDO, "RUIDO");
    return {
        BASE: { nombre: "BASE", tramos: baseTramos },
        ACOMPANAMIENTO: { nombre: "ACOMPANAMIENTO", tramos: acompTramos },
        RUIDO: { nombre: "RUIDO", tramos: ruidoTramos }
    };
}
