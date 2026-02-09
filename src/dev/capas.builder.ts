// backend/src/departamentoia/construirCapas.ts
// -------------------------------------------------------------
//  CONSTRUCTOR DE CAPAS — Constitución 1.7
//  Alineado a las capas soberanas:
//      BASE / ACOMPANAMIENTO / RUIDO
// -------------------------------------------------------------

import type { MiaSuciaNote, MiaSuciaCapas } from "./types/backend.types.js";

export function construirCapas(notasConRol: MiaSuciaNote[]): MiaSuciaCapas {
  const BASE: MiaSuciaNote[] = [];
  const ACOMPANAMIENTO: MiaSuciaNote[] = [];
  const RUIDO: MiaSuciaNote[] = [];

  for (const n of notasConRol) {
    // 1) Si la nota no es válida → ruido constitucional
    if (!n.valid) {
      RUIDO.push(n);
      continue;
    }

    // 2) Si el rol es ruido → ruido soberano
    if (n.role === "ruido") {
      RUIDO.push(n);
      continue;
    }

    // 3) BASE soberana
    if (n.role === "base") {
      BASE.push(n);
      continue;
    }

    // 4) ACOMPANAMIENTO soberano
    if (n.role === "acompanamiento") {
      ACOMPANAMIENTO.push(n);
      continue;
    }

    // 5) Cualquier rol desconocido → ruido superficial
    RUIDO.push(n);
  }

  return { BASE, ACOMPANAMIENTO, RUIDO };
}