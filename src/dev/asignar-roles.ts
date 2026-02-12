// backend/src/departamentoia/asignar-roles.ts
// -------------------------------------------------------------
//  asignarRoles — Adaptador inicial (NO clasifica)
//  Constitución 2.1 (NO produce MiaSuciaNote)
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaNotaRol
} from "./types/backend.types.js";

// ⭐ Este módulo NO debe devolver MiaSuciaNote
// ⭐ Solo devuelve BackendMidiNote enriquecido superficialmente
export function asignarRoles(
  notes: BackendMidiNote[]
): (BackendMidiNote & {
  role: MiaNotaRol;
  inScale: boolean;
  valid: boolean;
  tags: string[];
})[] {
  return notes.map(n => {
    return {
      ...n,               // ⭐ preserva channel, pitch, velocity, etc.

      // Rol superficial placeholder (el real lo asigna IAbrow)
      role: "acompanamiento",

      // Se recalibrará después por noiseFilter + IAEvaluator + IAbrow
      inScale: true,
      valid: true,
      tags: []
    };
  });
}