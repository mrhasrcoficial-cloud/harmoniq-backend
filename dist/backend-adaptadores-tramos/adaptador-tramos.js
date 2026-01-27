// -------------------------------------------------------------
//  ADAPTADOR DE TRAMOS — Módulo puente para el backend
//  Recibe MiaSuciaCapas, devuelve capas con tramos HA–JL
// -------------------------------------------------------------
import { construirTramosDesdeCapas } from "./construir-tramos.js";
export function adaptarCapasATramos(capasClasificadas) {
    return construirTramosDesdeCapas(capasClasificadas);
}
