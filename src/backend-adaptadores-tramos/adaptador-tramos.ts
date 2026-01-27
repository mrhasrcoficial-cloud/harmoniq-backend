// -------------------------------------------------------------
//  ADAPTADOR DE TRAMOS — Módulo puente para el backend
//  Recibe MiaSuciaCapas, devuelve capas con tramos HA–JL
// -------------------------------------------------------------

import type { MiaSuciaCapas } from "../../src/dev/types/backend.types.js";
import type { MiaCapasTramos } from "./construir-tramos.js";
import { construirTramosDesdeCapas } from "./construir-tramos.js";

export function adaptarCapasATramos(capasClasificadas: MiaSuciaCapas): MiaCapasTramos {
  return construirTramosDesdeCapas(capasClasificadas);
}