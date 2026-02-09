// backend/src/departamentoia/IAbrow.ts
// -------------------------------------------------------------
//  IAbrow — IA‑MIA (Clasificación superficial con evaluación)
//  Constitución 2.0 (usa IAEvaluator para rol coherente)
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
    if (tipo === "fantasma" || tipo === "micro") return "ruido";
    if (tipo === "aislada" && imp < 0.25) return "ruido";

    // 1) BASE superficial
    if (tipo === "estructural" && est >= 0.8 && imp >= 0.4) return "base";
    if (tipo === "guia" && est >= 0.7 && imp >= 0.5) return "base";

    // 2) ACOMPANAMIENTO
    if (tipo === "paso") return "acompanamiento";
    if (tipo === "relleno") return "acompanamiento";
    if (tipo === "tension") return "acompanamiento";
    if (tipo === "resolucion") return "acompanamiento";

    // 3) Notas débiles pero válidas → acompañamiento suave
    if (imp >= 0.2) return "acompanamiento";

    // 4) Todo lo demás → ruido superficial
    return "ruido";
  }

  // Convertir BackendMidiNote → MiaSuciaNote usando evaluación
  private etiquetar(notes: BackendMidiNote[]): MiaSuciaNote[] {
    const evaluadas = evaluarNotas(notes);

    return evaluadas.map<MiaSuciaNote>(n => {
      const role = this.clasificarNota(n);

      return {
        ...n,
        role,
        inScale: role !== "ruido",
        valid: role !== "ruido",
        tags: [n.tipo] // ⭐ ahora cada nota lleva su tipo
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
    BASE: notes.filter(n => n.role === "base"),
    ACOMPANAMIENTO: notes.filter(n => n.role === "acompanamiento"),
    RUIDO: notes.filter(n => n.role === "ruido")
  };
}