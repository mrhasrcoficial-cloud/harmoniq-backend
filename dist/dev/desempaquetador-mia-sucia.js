// backend/src/dev/desempaquetador-mia-sucia.ts
// -------------------------------------------------------------
//  DESEMPAQUETADOR MIA SUCIA — Versión constitucional 1.4.1
//  Alineado a SUPREMO y al contrato MIA SUCIA v1.0
// -------------------------------------------------------------
import { readFileSync } from "node:fs";
import { validarMiaSucia } from "./validar-mia-sucia.js";
export function desempaquetarMiaSucia(path) {
    let raw;
    // 1) Leer archivo .mia
    try {
        raw = readFileSync(path, "utf8");
    }
    catch (err) {
        console.error("❌ No se pudo leer el archivo .mia:", err);
        return null;
    }
    // 2) Parsear JSON
    let json;
    try {
        json = JSON.parse(raw);
    }
    catch {
        console.error("❌ El archivo no contiene JSON válido.");
        return null;
    }
    // 3) Validar contrato MIA SUCIA v1.0
    if (!validarMiaSucia(json)) {
        console.error("❌ Archivo MIA SUCIA inválido según el contrato.");
        return null;
    }
    // 4) NO transformar — solo castear
    const mia = json;
    return { mia };
}
