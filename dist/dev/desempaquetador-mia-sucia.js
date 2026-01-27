// backend/src/dev/desempaquetador-mia-sucia.ts
// -------------------------------------------------------------
//  DESEMPAQUETADOR MIA SUCIA — Versión constitucional 1.4.1
// -------------------------------------------------------------
import { readFileSync } from "node:fs";
import { validarMiaSucia } from "./validar-mia-sucia.js";
export function desempaquetarMiaSucia(path) {
    let raw;
    try {
        raw = readFileSync(path, "utf8");
    }
    catch (err) {
        console.error("❌ No se pudo leer el archivo .mia:", err);
        return null;
    }
    let json;
    try {
        json = JSON.parse(raw);
    }
    catch {
        console.error("❌ El archivo no contiene JSON válido.");
        return null;
    }
    if (!validarMiaSucia(json)) {
        console.error("❌ Archivo MIA SUCIA inválido según el contrato.");
        return null;
    }
    const mia = json;
    return { mia };
}
