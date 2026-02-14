// backend/src/dev/constructor-mia-sucia.ts
// -------------------------------------------------------------
//  CONSTRUCTOR MIA SUCIA — Constitución 2.2 (Alineado a SUPREMO)
// -------------------------------------------------------------
import { crearPlantillaMia } from "./templates/mia.plantilla.js";
export function construirMiaSucia(capas) {
    const cubo = crearPlantillaMia();
    cubo.capas.BASE.tramos = capas.BASE.tramos;
    cubo.capas.ACOMPANAMIENTO.tramos = capas.ACOMPANAMIENTO.tramos;
    cubo.capas.RUIDO.tramos = capas.RUIDO.tramos;
    for (const capa of Object.values(cubo.capas)) {
        capa.tramos.sort((a, b) => a.inicio - b.inicio);
    }
    return cubo;
}
