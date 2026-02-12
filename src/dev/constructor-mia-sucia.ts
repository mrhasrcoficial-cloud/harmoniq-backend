// backend/src/dev/constructor-mia-sucia.ts
// -------------------------------------------------------------
//  CONSTRUCTOR MIA SUCIA — Constitución 2.1 (Alineado a SUPREMO)
// -------------------------------------------------------------
//
//  Corrección fundamental:
//    - Recibe TRAMOS reales (MiaCapasTramos), no notas
//    - No convierte notas → tramos (ya vienen convertidos)
//    - Totalmente alineado con PMSmiaTramo 2.0
//
// -------------------------------------------------------------

import type {
  MiaCubo,
  PMSmiaTramo,
  PMSmiaCapa
} from "../dev/types/mia.types.js";

import type {
  MiaCapasTramos
} from "../backend-adaptadores-tramos/adaptador-tramos.js";

import { crearPlantillaMia } from "./templates/mia.plantilla.js";

// -------------------------------------------------------------
//  Constructor oficial del cubo MIA SUCIA v1.0
//  (Recibe TRAMOS reales, no notas)
// -------------------------------------------------------------
export function construirMiaSucia(capas: MiaCapasTramos): MiaCubo {
  const cubo = crearPlantillaMia();

  // BASE
  cubo.capas.BASE.tramos = capas.BASE.tramos;

  // ACOMPANAMIENTO
  cubo.capas.ACOMPANAMIENTO.tramos = capas.ACOMPANAMIENTO.tramos;

  // RUIDO
  cubo.capas.RUIDO.tramos = capas.RUIDO.tramos;

  // ⭐ Ordenar tramos por inicio
  for (const capa of Object.values(cubo.capas)) {
    capa.tramos.sort((a, b) => a.inicio - b.inicio);
  }

  return cubo;
}