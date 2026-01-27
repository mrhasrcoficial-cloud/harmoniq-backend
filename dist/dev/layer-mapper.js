// backend/src/dev/layer-mapper.ts
// -------------------------------------------------------------
//  LayerMapper — separación constitucional de capas MIA SUCIA
//  Versión 1.4.1 (blindada y alineada con MIA SUCIA v1.0)
// -------------------------------------------------------------
//
//  ✔ NO hace cognición
//  ✔ NO interpreta música
//  ✔ NO transforma MIDI
//  ✔ NO altera pitch, duración, velocity o posición
//  ✔ NO usa ARKLIM ni CRUZ
//
//  Su única función:
//  → Clasificar superficialmente notas físicas en:
//      - BASE
//      - ACOMPANAMIENTO
//      - RUIDO
//
// -------------------------------------------------------------
// -------------------------------------------------------------
//  Ministerio de Capas — Función oficial
// -------------------------------------------------------------
export function layerMapper(notes) {
    const base = [];
    const acompanamiento = [];
    const ruido = [];
    for (const n of notes) {
        const role = n.role;
        switch (role) {
            case "base":
                base.push(n);
                break;
            case "acompanamiento":
                acompanamiento.push(n);
                break;
            case "ruido":
                ruido.push(n);
                break;
            default: {
                // Blindaje constitucional:
                // Cualquier rol desconocido se considera ruido superficial.
                ruido.push(n);
                break;
            }
        }
    }
    return { base, acompanamiento, ruido };
}
