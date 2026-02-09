// backend/src/dev/validar-mia-sucia.ts
// -------------------------------------------------------------
//  Validador MIA SUCIA — Constitución 1.4.1 (Alineado a SUPREMO)
// -------------------------------------------------------------

import type { MiaSucia } from "../contracts/mia-sucia.contract.js";

export function validarMiaSucia(obj: any): obj is MiaSucia {
  if (!obj || typeof obj !== "object") return false;

  // Versión constitucional
  if (obj.version !== "1.0") return false;

  // Metadata física
  if (typeof obj.bpmDetectado !== "number") return false;
  if (typeof obj.ppq !== "number") return false;
  if (typeof obj.duracion !== "number") return false;

  // Cubo geográfico
  const cubo = obj.cubo;
  if (!cubo || typeof cubo !== "object") return false;
  if (cubo.version !== "1.0") return false;

  const capas = cubo.capas;
  if (!capas || typeof capas !== "object") return false;

  // Nombres constitucionales
  const nombres = ["BASE", "ACOMPANAMIENTO", "RUIDO"] as const;

  for (const nombre of nombres) {
    const capa = capas[nombre];
    if (!capa || typeof capa !== "object") return false;
    if (capa.nombre !== nombre) return false;
    if (!Array.isArray(capa.tramos)) return false;

    for (const t of capa.tramos) {
      // Altura MIA (string no vacío)
      if (typeof t.altura !== "string" || t.altura.length === 0) return false;

      // Inicio/fin numéricos
      if (typeof t.inicio !== "number") return false;
      if (typeof t.fin !== "number") return false;

      // Inicio < fin (tramo válido)
      if (t.inicio >= t.fin) return false;

      // Capa constitucional
      if (t.capa !== nombre) return false;
    }
  }

  return true;
}