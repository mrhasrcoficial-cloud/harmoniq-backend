// backend/src/departamentoia/construirCapas.ts
// -------------------------------------------------------------
//  CONSTRUCTOR DE CAPAS — Constitución 2.0
//  Separación pura según rol final:
//      BASE / ACOMPANAMIENTO / RUIDO
// -------------------------------------------------------------

import type { MiaSuciaNote, MiaSuciaCapas } from "./types/backend.types.js";

export function construirCapas(notasConRol: MiaSuciaNote[]): MiaSuciaCapas {
  const BASE: MiaSuciaNote[] = [];
  const ACOMPANAMIENTO: MiaSuciaNote[] = [];
  const RUIDO: MiaSuciaNote[] = [];

  for (const n of notasConRol) {
    // ⭐ NO reinterpretamos valid
    // ⭐ NO reinterpretamos tags
    // ⭐ NO reinterpretamos tipo
    // ⭐ NO reinterpretamos ruido físico/contextual
    // El rol final YA VIENE DECIDIDO por IAbrow + layerMapper

    switch (n.role) {
      case "base":
        BASE.push(n);
        break;

      case "acompanamiento":
        ACOMPANAMIENTO.push(n);
        break;

      case "ruido":
      default:
        RUIDO.push(n);
        break;
    }
  }

  return { BASE, ACOMPANAMIENTO, RUIDO };
}