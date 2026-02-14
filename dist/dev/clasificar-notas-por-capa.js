// -------------------------------------------------------------
//  CLASIFICAR NOTAS POR CAPA — Constitución 2.2
//  Usa los TRAMOS del cubo para asignar cada nota real a su capa
// -------------------------------------------------------------
export function clasificarNotasPorCapa(notas, cubo) {
    const resultado = {
        BASE: [],
        ACOMPANAMIENTO: [],
        RUIDO: []
    };
    const capas = cubo?.capas ?? {};
    // ⭐ Prioridad constitucional: BASE → ACOMPANAMIENTO → RUIDO
    const todasLasCapas = [
        { nombre: "BASE", tramos: capas.BASE?.tramos ?? [] },
        { nombre: "ACOMPANAMIENTO", tramos: capas.ACOMPANAMIENTO?.tramos ?? [] },
        { nombre: "RUIDO", tramos: capas.RUIDO?.tramos ?? [] }
    ];
    for (const nota of notas) {
        let asignada = false;
        for (const capa of todasLasCapas) {
            for (const tramo of capa.tramos) {
                if (nota.startTime >= tramo.inicio && nota.startTime < tramo.fin) {
                    resultado[capa.nombre].push(nota);
                    asignada = true;
                    break;
                }
            }
            if (asignada)
                break; // ⭐ evita asignar la nota a múltiples capas
        }
    }
    return resultado;
}
