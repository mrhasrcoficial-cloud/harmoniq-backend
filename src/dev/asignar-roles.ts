// backend/src/departamentoia/asignar-roles.ts
// -------------------------------------------------------------
//  asignarRoles — Clasificación superficial inicial
//  Versión 1.7 (más rica, más precisa, sin cognición)
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaNote,
  MiaNotaRol
} from "./types/backend.types.js";

export function asignarRoles(notes: BackendMidiNote[]): MiaSuciaNote[] {
  return notes.map(n => {
    const role: MiaNotaRol = inferRolSuperficial(n);

    return {
      ...n,
      role,
      tags: [],
      inScale: role !== "ruido",
      valid: true
    };
  });
}

// -------------------------------------------------------------
//  Inferencia superficial del rol (NO cognitiva)
// -------------------------------------------------------------
function inferRolSuperficial(n: BackendMidiNote): MiaNotaRol {
  const pc = n.pitchClass;
  const dur = n.duration;
  const vel = n.velocity;
  const pitch = n.pitch;

  // 0) Ruido duro superficial
  if (pitch < 20 || pitch > 115) return "ruido";
  if (dur < 0.03) return "ruido";
  if (vel < 10) return "ruido";

  // 1) BASE superficial
  //    - grados fuertes (0, 5, 7)
  //    - registro grave
  //    - duración decente
  if ((pc === 0 || pc === 5 || pc === 7) && pitch < 60 && dur >= 0.10) {
    return "base";
  }

  // 2) BASE por registro grave estable
  if (pitch < 48 && dur >= 0.08 && vel >= 20) {
    return "base";
  }

  // 3) ACOMPANAMIENTO superficial
  //    - registro medio
  //    - duración media
  if (pitch >= 48 && pitch <= 96 && dur >= 0.05) {
    return "acompanamiento";
  }

  // 4) ACOMPANAMIENTO suave
  if (dur >= 0.04 && vel >= 15) {
    return "acompanamiento";
  }

  // 5) Todo lo demás → ruido superficial
  return "ruido";
}