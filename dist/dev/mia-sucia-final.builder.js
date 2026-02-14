// backend/src/dev/mia-sucia-final.builder.ts
// -------------------------------------------------------------
//  CONSTRUCTOR FINAL MIA SUCIA — Constitución 2.2
//  Alineado al pipeline soberano (notas → capas → tramos → cubo)
// -------------------------------------------------------------
import { IAOrchestrator } from "../departamentoia/IAOrchestrator.js";
import { adaptarCapasATramos } from "../backend-adaptadores-tramos/adaptador-tramos.js";
import { construirMiaSucia as construirCubo } from "./constructor-mia-sucia.js";
export function construirMiaSuciaFinal({ notes, bpm, ppq, duracion }) {
    // ⭐ 1. Pipeline completo IA (notas → capas)
    const ia = new IAOrchestrator();
    const capasNotas = ia.run(notes);
    // ⭐ 2. Adaptar capas → TRAMOS reales
    const capasConTramos = adaptarCapasATramos(capasNotas);
    // ⭐ 3. Construir cubo soberano (con TRAMOS)
    const cubo = construirCubo(capasConTramos);
    // ⭐ 4. Devolver estructura interna (NO contrato final)
    return {
        version: "1.0",
        bpmDetectado: bpm,
        ppq,
        duracion,
        totalNotas: notes.length,
        totalTramos: cubo.capas.BASE.tramos.length +
            cubo.capas.ACOMPANAMIENTO.tramos.length +
            cubo.capas.RUIDO.tramos.length,
        cubo
    };
}
