import type { MiaSuciaCapas } from "../../src/dev/types/backend.types.js";
import type { PMSmiaTramo, PMSmiaCapa, PMSmiaAltura } from "../../src/dev/types/mia.types.js";
import { pitchToHAJL } from "./altura-hajl.js";

// ⭐ Interfaz exportada correctamente
export interface MiaCapasTramos {
  BASE: {
    nombre: string;
    tramos: PMSmiaTramo[];
  };
  ACMP: {
    nombre: string;
    tramos: PMSmiaTramo[];
  };
  TRSH: {
    nombre: string;
    tramos: PMSmiaTramo[];
  };
}

function convertirListaANTramos(lista: any[], capa: PMSmiaCapa): PMSmiaTramo[] {
  return lista.map(n => {
    const altura = pitchToHAJL(n.pitch) as PMSmiaAltura;
    const inicio = Number(n.startTime) || 0;
    const dur = Number(n.duration) || 0;
    const fin = Math.max(inicio + dur, inicio + 0.01);

    return {
      capa,
      altura,
      inicio,
      fin
    };
  });
}

export function construirTramosDesdeCapas(capas: MiaSuciaCapas): MiaCapasTramos {
  const baseTramos = convertirListaANTramos(capas.base ?? [], "BASE");
  const acompTramos = convertirListaANTramos(capas.acompanamiento ?? [], "ACMP");
  const ruidoTramos = convertirListaANTramos(capas.ruido ?? [], "TRSH");

  return {
    BASE: { nombre: "BASE", tramos: baseTramos },
    ACMP: { nombre: "ACMP", tramos: acompTramos },
    TRSH: { nombre: "TRSH", tramos: ruidoTramos }
  };
}