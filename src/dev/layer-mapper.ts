// backend/src/dev/layer-mapper.ts
// -------------------------------------------------------------
//  LayerMapper — calibración fina de capas MIA SUCIA
//  Versión 1.7 (sin channel, sin inventar nada)
// -------------------------------------------------------------

import type {
  MiaSuciaNote,
  MiaSuciaCapas,
  MiaNotaRol
} from "../dev/types/backend.types.js";

// -------------------------------------------------------------
//  Heurísticas musicales reales (no inventan nada)
// -------------------------------------------------------------
function esRuidoFisico(n: MiaSuciaNote): boolean {
  // 1) Duración extremadamente corta (micro-notas)
  if (n.duration < 0.04) return true;

  // 2) Velocity muy bajo (golpes, artefactos)
  if (n.velocity < 18) return true;

  // 3) Pitch fuera del rango musical típico
  if (n.pitch < 21 || n.pitch > 108) return true;

  return false;
}

// -------------------------------------------------------------
//  Heurística musical contextual (sin inventar nada)
// -------------------------------------------------------------
function esRuidoContextual(n: MiaSuciaNote, notes: MiaSuciaNote[]): boolean {
  const vecinos = notes.filter(
    (m) =>
      m !== n &&
      Math.abs(m.startTime - n.startTime) < 0.08 &&
      Math.abs(m.pitch - n.pitch) < 2
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

    // 2) Ruido físico (micro-notas, velocity bajo, pitch raro)
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