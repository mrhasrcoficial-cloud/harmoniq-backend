// backend/src/dev/desempaquetador-mia-sucia.ts
// -------------------------------------------------------------
//  DESEMPAQUETADOR MIA SUCIA — Versión constitucional 1.4.1
// -------------------------------------------------------------

import { readFileSync } from "node:fs";
import type { MiaSucia } from "../contracts/mia-sucia.contract.js";
import { validarMiaSucia } from "./validar-mia-sucia.js";

export interface DesempaquetadoMiaSucia {
  mia: MiaSucia;
}

export function desempaquetarMiaSucia(path: string): DesempaquetadoMiaSucia | null {
  let raw: string;

  try {
    raw = readFileSync(path, "utf8");
  } catch (err) {
    console.error("❌ No se pudo leer el archivo .mia:", err);
    return null;
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    console.error("❌ El archivo no contiene JSON válido.");
    return null;
  }

  if (!validarMiaSucia(json)) {
    console.error("❌ Archivo MIA SUCIA inválido según el contrato.");
    return null;
  }

  const mia = json as MiaSucia;

  return { mia };
}