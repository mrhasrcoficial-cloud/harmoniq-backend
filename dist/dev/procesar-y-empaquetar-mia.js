// backend/src/dev/procesar-y-empaquetar-mia.ts
// -------------------------------------------------------------
//  PROCESAR + EMPAQUETAR MIA SUCIA — Constitución 1.4.1
// -------------------------------------------------------------
import { procesarMIDI } from "../Index.js";
import { empaquetarMiaSucia } from "./empaquetador-mia-sucia.js";
import { validarMiaSucia } from "./validar-mia-sucia.js";
export async function procesarYEmpaquetarMia(midiBuffer, outputPath) {
    // 1. Ejecutar pipeline constitucional
    const resultado = await procesarMIDI(midiBuffer);
    // 2. Validar que el resultado cumple el contrato MIA SUCIA v1.0
    if (!validarMiaSucia(resultado)) {
        throw new Error("❌ El pipeline no devolvió un objeto MiaSucia válido.");
    }
    // 3. Afirmar tipo soberano
    const mia = resultado;
    // 4. Empaquetado opcional
    if (outputPath) {
        empaquetarMiaSucia(mia, outputPath);
    }
    // 5. Devolver contrato MIA SUCIA v1.0 intacto
    return mia;
}
