// ============================================================
//  backend/src/dev/templates/mia.plantilla.ts
//  Plantilla geográfica oficial para construir MIA SUCIA v1.0
//  (Alineada al contrato SUPREMO)
// ============================================================
export const crearPlantillaMia = () => ({
    version: "1.0",
    capas: {
        BASE: {
            nombre: "BASE",
            tramos: [], // tramos HA–JL de la capa BASE
        },
        ACMP: {
            nombre: "ACMP",
            tramos: [], // tramos HA–JL de acompañamiento
        },
        TRSH: {
            nombre: "TRSH",
            tramos: [], // tramos HA–JL clasificados como ruido
        },
    }
});
