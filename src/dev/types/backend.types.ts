// ============================================================
//  backend/src/dev/types/backend.types.ts
//  Tipos oficiales del país Backend (Constitución 1.4.1)
//  (Alineado al contrato SUPREMO)
// ============================================================

// ─────────────────────────────────────────────
// 1. Nota MIDI cruda (ingesta física)
// ─────────────────────────────────────────────
export interface BackendMidiNote {
  id: string;
  trackIndex: number;
  pitch: number;
  startTime: number;
  duration: number;
  velocity: number;
  pitchClass: number;
}

// ─────────────────────────────────────────────
// 2. Rol superficial IA‑MIA
// ─────────────────────────────────────────────
export type MiaNotaRol =
  | "base"
  | "acompanamiento"
  | "ruido";

// ─────────────────────────────────────────────
// 3. Nota MIA SUCIA (clasificada superficialmente)
// ─────────────────────────────────────────────
export interface MiaSuciaNote extends BackendMidiNote {
  role: MiaNotaRol;

  // Etiquetas heurísticas superficiales (permitidas)
  tags?: string[];

  // Indicadores superficiales (NO cognitivos)
  inScale: boolean;
  valid: boolean;
}

// ─────────────────────────────────────────────
// 4. Capas superficiales previas al cubo
// ─────────────────────────────────────────────
export interface MiaSuciaCapas {
  base: MiaSuciaNote[];
  acompanamiento: MiaSuciaNote[];
  ruido: MiaSuciaNote[];
}