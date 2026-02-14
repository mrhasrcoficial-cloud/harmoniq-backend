// backend/src/departamentoia/IAbrow.ts
// -------------------------------------------------------------
//  IAbrow — IA‑MIA (Clasificación superficial con evaluación)
//  Constitución 2.1 (corrige channel + coherencia MiaSuciaNote)
//  Alineado a SUPREMO: BASE / ACOMPANAMIENTO / RUIDO (nombres soberanos)
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaNote,
  MiaNotaRol,
  MiaSuciaCapas
} from "../dev/types/backend.types.js";

import type { NotaEvaluada } from "./IAEvaluator.js";
import { evaluarNotas } from "./IAEvaluator.js";

// -------------------------------------------------------------
//  Clase IA — Clasificación superficial basada en evaluación
// -------------------------------------------------------------
export class IAbrow {

  private clasificarNota(n: NotaEvaluada): MiaNotaRol {
    const tipo = n.tipo;
    const est = n.estabilidad;
    const imp = n.importancia;

    // 0) Ruido duro
    if (tipo === "fantasma" || tipo === "micro") return "RUIDO";
    if (tipo === "aislada" && imp < 0.25) return "RUIDO";

    // 1) BASE superficial
    if (tipo === "estructural" && est >= 0.8 && imp >= 0.4) return "BASE";
    if (tipo === "guia" && est >= 0.7 && imp >= 0.5) return "BASE";

    // 2) ACOMPANAMIENTO
    if (tipo === "paso") return "ACOMPANAMIENTO";
    if (tipo === "relleno") return "ACOMPANAMIENTO";
    if (tipo === "tension") return "ACOMPANAMIENTO";
    if (tipo === "resolucion") return "ACOMPANAMIENTO";

    // 3) Notas débiles pero válidas → acompañamiento suave
    if (imp >= 0.2) return "ACOMPANAMIENTO";

    // 4) Todo lo demás → ruido superficial
    return "RUIDO";
  }

  // Convertir BackendMidiNote → MiaSuciaNote usando evaluación
  private etiquetar(notes: BackendMidiNote[]): MiaSuciaNote[] {
    const evaluadas = evaluarNotas(notes);

    return evaluadas.map<MiaSuciaNote>(n => {
      const role = this.clasificarNota(n);

      return {
        ...n,                 // ⭐ incluye channel, pitch, velocity, etc.
        role,
        inScale: role !== "RUIDO",
        valid: role !== "RUIDO",
        tags: [n.tipo]        // ⭐ cada nota lleva su tipo superficial
      };
    });
  }

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
    BASE: notes.filter(n => n.role === "BASE"),
    ACOMPANAMIENTO: notes.filter(n => n.role === "ACOMPANAMIENTO"),
    RUIDO: notes.filter(n => n.role === "RUIDO")
  };
}