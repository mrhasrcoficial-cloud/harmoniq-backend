import { pitchToHAJL } from "./altura-hajl.js";
function convertirListaANTramos(lista, capa) {
    return lista.map(n => {
        const altura = pitchToHAJL(n.pitch);
        const inicio = Number(n.startTime) || 0;
        const dur = Number(n.duration) || 0;
        const fin = Math.max(inicio + dur, inicio + 0.01);
        return {
            capa,
            altura,
            inicio,
            fin
        };
    });
}
export function construirTramosDesdeCapas(capas) {
    const baseTramos = convertirListaANTramos(capas.base ?? [], "BASE");
    const acompTramos = convertirListaANTramos(capas.acompanamiento ?? [], "ACMP");
    const ruidoTramos = convertirListaANTramos(capas.ruido ?? [], "TRSH");
    return {
        BASE: { nombre: "BASE", tramos: baseTramos },
        ACMP: { nombre: "ACMP", tramos: acompTramos },
        TRSH: { nombre: "TRSH", tramos: ruidoTramos }
    };
}
