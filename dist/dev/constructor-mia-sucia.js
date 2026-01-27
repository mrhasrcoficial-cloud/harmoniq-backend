// backend/src/dev/constructor-mia-sucia.ts
// -------------------------------------------------------------
//  CONSTRUCTOR MIA SUCIA — Constitución 1.4.1 (Alineado a SUPREMO)
// -------------------------------------------------------------
import { crearPlantillaMia } from "./templates/mia.plantilla.js";
import { pitchToAltura } from "./utils/pitch-to-altura.js";
// -------------------------------------------------------------
//  Conversión superficial de MiaSuciaNote → PMSmiaTramo
// -------------------------------------------------------------
function convertirNotaATramo(n, capa) {
    return {
        altura: pitchToAltura(n.pitch),
        inicio: n.startTime,
        fin: n.startTime + n.duration,
        capa
    };
}
// -------------------------------------------------------------
//  Constructor oficial del cubo MIA SUCIA v1.0
// -------------------------------------------------------------
export function construirMiaSucia(capas) {
    const cubo = crearPlantillaMia();
    for (const n of capas.base) {
        cubo.capas.BASE.tramos.push(convertirNotaATramo(n, "BASE"));
    }
    for (const n of capas.acompanamiento) {
        cubo.capas.ACMP.tramos.push(convertirNotaATramo(n, "ACMP"));
    }
    for (const n of capas.ruido) {
        cubo.capas.TRSH.tramos.push(convertirNotaATramo(n, "TRSH"));
    }
    return cubo;
}
