// backend/src/departamentoia/IAbrow.ts
// -------------------------------------------------------------
//  IAbrow — IA‑MIA (Clasificación superficial)
//  Versión constitucional 1.4.2 (calibración fina de rol)
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaNote,
  MiaNotaRol,
  MiaSuciaCapas
} from "../dev/types/backend.types.js";

// -------------------------------------------------------------
//  Clase IA — Clasificación superficial
// -------------------------------------------------------------
export class IAbrow {

  // Regla superficial de rol (calibrada)
  private clasificarNota(n: BackendMidiNote): MiaNotaRol {
    const pc = n.pitchClass;
    const dur = n.duration;
    const vel = n.velocity;
    const pitch = n.pitch;

    // 0) Ruido duro: fuera de rango o micro-notas
    if (pitch < 20 || pitch > 115) return "ruido";
    if (dur < 0.03) return "ruido";
    if (vel < 10) return "ruido";

    // 1) Notas muy cortas pero no extremas → acompañamiento o ruido suave
    if (dur < 0.06 && vel < 25) return "ruido";
    if (dur < 0.08) return "acompanamiento";

    // 2) Notas estructurales (BASE)
    //    - tónica, dominante, subdominante
    //    - duración media o larga
    //    - velocity razonable
    const esGradoBase = (pc === 0 || pc === 5 || pc === 7);
    if (esGradoBase && dur >= 0.12 && vel >= 25) {
      return "base";
    }

    // 3) Notas graves con duración decente → tienden a base
    if (pitch < 48 && dur >= 0.10 && vel >= 20) {
      return "base";
    }

    // 4) Notas medias/altas con duración media → acompañamiento
    if (pitch >= 48 && pitch <= 96 && dur >= 0.06) {
      return "acompanamiento";
    }

    // 5) Todo lo que no encaje bien → acompañamiento suave
    return "acompanamiento";
  }

  // Convertir BackendMidiNote → MiaSuciaNote
  private etiquetar(notes: BackendMidiNote[]): MiaSuciaNote[] {
    return notes.map<MiaSuciaNote>(n => {
      const role = this.clasificarNota(n);

      return {
        ...n,
        role,
        inScale: role !== "ruido",
        valid: role !== "ruido",
        tags: []
      };
    });
  }

  // API interna
  public procesar(notes: BackendMidiNote[]): MiaSuciaNote[] {
    return this.etiquetar(notes);
  }
}

// -------------------------------------------------------------
//  API oficial: clasificar notas superficialmente
// -------------------------------------------------------------
export function IAbrow_clasificarNotas(
  notes: BackendMidiNote[]
): MiaSuciaNote[] {
  const ia = new IAbrow();
  return ia.procesar(notes);
}

// -------------------------------------------------------------
//  API oficial: clasificar capas (requiere MiaSuciaNote[])
// -------------------------------------------------------------
export function IAbrow_clasificarCapas(
  notes: MiaSuciaNote[]
): MiaSuciaCapas {
  return {
    BASE: notes.filter(n => n.role === "base"),
    ACOMPANAMIENTO: notes.filter(n => n.role === "acompanamiento"),
    RUIDO: notes.filter(n => n.role === "ruido")
  };
}