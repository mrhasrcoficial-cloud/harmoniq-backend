// backend/src/dev/empaquetador-mia-sucia.ts
// -------------------------------------------------------------
//  EMPAQUETADOR MIA SUCIA — Versión constitucional 1.4.1
// -------------------------------------------------------------
//  Función:
//    - Recibir un objeto MiaSucia (incluye cubo geográfico MIA v1.0)
//    - Opcionalmente escribirlo a disco como .mia
//    - NO modifica
//    - NO interpreta
//    - NO limpia
//    - NO transforma MIDI
// -------------------------------------------------------------

import { writeFileSync } from "node:fs";
import type { MiaSucia } from "../contracts/mia-sucia.contract.js";

export function empaquetarMiaSucia(
  mia: MiaSucia,
  outputPath?: string
): MiaSucia {

  // Escritura opcional del archivo .mia
  if (outputPath) {
    try {
      writeFileSync(outputPath, JSON.stringify(mia, null, 2), "utf8");
      console.log("📦 MIA SUCIA escrita en", outputPath);
    } catch (err) {
      console.error("❌ Error al escribir archivo MIA SUCIA:", err);
    }
  }

  // Devolver el objeto soberano sin modificar
  return mia;
}
