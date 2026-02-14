// ============================================================
//  backend/src/dev/templates/mia.plantilla.ts
//  Plantilla geográfica oficial para construir MIA SUCIA v1.0
//  Constitución 2.1 — Alineada a PMSmiaTramo (pitch real)
// ============================================================
export const crearPlantillaMia = () => ({
    version: "1.0",
    capas: {
        BASE: {
            nombre: "BASE",
            tramos: [], // tramos PMSmiaTramo (pitch real + alturaTexto decorativo)
        },
        ACOMPANAMIENTO: {
            nombre: "ACOMPANAMIENTO",
            tramos: [], // tramos PMSmiaTramo
        },
        RUIDO: {
            nombre: "RUIDO",
            tramos: [], // tramos PMSmiaTramo
        },
    }
});
