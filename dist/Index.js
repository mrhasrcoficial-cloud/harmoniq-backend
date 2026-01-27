import { ingestMidi } from "./dev/midi-ingestor.js";
import { IAbrow_clasificarNotas, IAbrow_clasificarCapas } from "./departamentoia/IAbrow.js";
import { construirMiaSucia } from "./dev/constructor-mia-sucia.js";
import { validarMiaSucia } from "./aduana/aduana-mia-sucia.js";
import { TransportadorA } from "./teletransportador-A.js";
import { adaptarCapasATramos } from "./backend-adaptadores-tramos/adaptador-tramos.js";
export async function procesarMIDI(midiBuffer) {
    // 1. Normalizar buffer
    const buffer = midiBuffer instanceof Uint8Array ? midiBuffer : new Uint8Array(midiBuffer);
    // 2. Ingesta física
    const { notes, bpm, ppq, duracion } = ingestMidi(buffer);
    // 3. Clasificación superficial IA‑MIA
    const notasClasificadas = IAbrow_clasificarNotas(notes);
    // 4. Capas constitucionales (por notas)
    const capas = IAbrow_clasificarCapas(notasClasificadas);
    // 5. Construcción del cubo geográfico vacío
    const cubo = construirMiaSucia(capas);
    // 6. Adaptar capas → tramos HA–JL
    const capasConTramos = adaptarCapasATramos(capas);
    // 7. Inyectar tramos en el cubo
    cubo.capas.BASE.tramos = capasConTramos.BASE.tramos;
    cubo.capas.ACMP.tramos = capasConTramos.ACMP.tramos;
    cubo.capas.TRSH.tramos = capasConTramos.TRSH.tramos;
    // 8. Totales derivados
    const totalNotas = notasClasificadas.length;
    const totalTramos = cubo.capas.BASE.tramos.length +
        cubo.capas.ACMP.tramos.length +
        cubo.capas.TRSH.tramos.length;
    // 9. Ensamblar contrato MIA SUCIA v1.0 (versión SUPREMO)
    const miaSucia = {
        version: "1.0",
        cubo,
        bpmDetectado: bpm,
        ppq,
        duracion,
        totalNotas,
        totalTramos
    };
    // 10. Validación constitucional (lanza si inválido)
    const sello = validarMiaSucia(miaSucia);
    // sello puede usarse para logging o auditoría
    // console.debug("Aduana sello:", sello);
    // 11. Ministerio Exterior
    const transportador = new TransportadorA();
    return transportador.enviar(miaSucia);
}
