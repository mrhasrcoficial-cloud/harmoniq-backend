// backend/src/dev/layer-mapper.ts
// -------------------------------------------------------------
//  LayerMapper — calibración fina de capas MIA SUCIA
//  Versión 2.0 (suave, estable, sin channel)
// -------------------------------------------------------------

import type {
  MiaSuciaNote,
  MiaSuciaCapas,
  MiaNotaRol
} from "../dev/types/backend.types.js";

// -------------------------------------------------------------
//  Ruido físico (suave, no agresivo)
// -------------------------------------------------------------
function esRuidoFisico(n: MiaSuciaNote): boolean {
  // micro-notas reales
  if (n.duration < 0.02) return true;

  // velocity extremadamente baja
  if (n.velocity < 10) return true;

  // pitch fuera del rango musical real
  if (n.pitch < 15 || n.pitch > 120) return true;

  return false;
}

// -------------------------------------------------------------
//  Ruido contextual (ventana más amplia y musical)
// -------------------------------------------------------------
function esRuidoContextual(n: MiaSuciaNote, notes: MiaSuciaNote[]): boolean {
  const vecinos = notes.filter(
    (m) =>
      m !== n &&
      Math.abs(m.startTime - n.startTime) < 0.25 &&   // ⭐ ventana ampliada
      Math.abs(m.pitch - n.pitch) < 3                 // ⭐ tolerancia musical
  );

  // Nota completamente aislada → ruido contextual
  if (vecinos.length === 0) return true;

  return false;
}

// -------------------------------------------------------------
//  Ministerio de Capas — Función oficial
// -------------------------------------------------------------
export function layerMapper(notes: MiaSuciaNote[]): MiaSuciaCapas {
  const BASE: MiaSuciaNote[] = [];
  const ACOMPANAMIENTO: MiaSuciaNote[] = [];
  const RUIDO: MiaSuciaNote[] = [];

  for (const n of notes) {
    const role: MiaNotaRol = n.role;

    // 1) Si el modelo ya dice "ruido", respetamos soberanía
    if (role === "ruido") {
      RUIDO.push(n);
      continue;
    }

    // 2) Ruido físico (micro-notas, velocity muy baja, pitch raro)
    if (esRuidoFisico(n)) {
      RUIDO.push(n);
      continue;
    }

    // 3) Ruido contextual (nota aislada)
    if (esRuidoContextual(n, notes)) {
      RUIDO.push(n);
      continue;
    }

    // 4) Clasificación oficial del modelo
    switch (role) {
      case "base":
        BASE.push(n);
        break;

      case "acompanamiento":
        ACOMPANAMIENTO.push(n);
        break;

      default:
        RUIDO.push(n);
        break;
    }
  }

  return { BASE, ACOMPANAMIENTO, RUIDO };
}