// backend/src/departamentoia/asignar-roles.ts
// -------------------------------------------------------------
//  asignarRoles — Adaptador inicial (NO clasifica)
//  Versión 2.0 (alineado a IAEvaluator + IAbrow)
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaNote
} from "./types/backend.types.js";

export function asignarRoles(notes: BackendMidiNote[]): MiaSuciaNote[] {
  return notes.map(n => {
    return {
      ...n,

      // El rol REAL lo asigna IAbrow v2.0
      role: "acompanamiento",

      // Se llenará después según noiseFilter + IAEvaluator + IAbrow
      inScale: true,
      valid: true,
      tags: []
    };
  });
}