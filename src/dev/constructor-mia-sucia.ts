// backend/src/dev/constructor-mia-sucia.ts
// -------------------------------------------------------------
//  CONSTRUCTOR MIA SUCIA — Constitución 1.0 (Alineado a SUPREMO)
// -------------------------------------------------------------

import type {
  MiaCubo,
  PMSmiaTramo,
  PMSmiaCapa
} from "./types/mia.types.js";

import type {
  MiaSuciaCapas,
  MiaSuciaNote
} from "./types/backend.types.js";

import { crearPlantillaMia } from "./templates/mia.plantilla.js";
import { pitchToAltura } from "./utils/pitch-to-altura.js";

// -------------------------------------------------------------
//  Conversión superficial de MiaSuciaNote → PMSmiaTramo
//  ⭐ NO incluye tags, tipo, estabilidad, importancia
//  ⭐ NO incluye channel
//  ⭐ Conversión física mínima para SUPREMO
// -------------------------------------------------------------
function convertirNotaATramo(
  n: MiaSuciaNote,
  capa: PMSmiaCapa
): PMSmiaTramo {
  return {
    altura: pitchToAltura(n.pitch),
    inicio: n.startTime,
    fin: n.startTime + n.duration,
    capa
  };
}

// -------------------------------------------------------------
//  Constructor oficial del cubo MIA SUCIA v1.0
// -------------------------------------------------------------
export function construirMiaSucia(capas: MiaSuciaCapas): MiaCubo {
  const cubo = crearPlantillaMia();

  // BASE
  for (const n of capas.BASE) {
    cubo.capas.BASE.tramos.push(convertirNotaATramo(n, "BASE"));
  }

  // ACOMPANAMIENTO
  for (const n of capas.ACOMPANAMIENTO) {
    cubo.capas.ACOMPANAMIENTO.tramos.push(
      convertirNotaATramo(n, "ACOMPANAMIENTO")
    );
  }

  // RUIDO
  for (const n of capas.RUIDO) {
    cubo.capas.RUIDO.tramos.push(convertirNotaATramo(n, "RUIDO"));
  }

  // ⭐ Ordenar tramos por inicio (estabilidad constitucional)
  for (const capa of Object.values(cubo.capas)) {
    capa.tramos.sort((a, b) => a.inicio - b.inicio);
  }

  return cubo;
}