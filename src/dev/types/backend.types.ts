// ============================================================
//  backend/src/dev/types/backend.types.ts
//  Tipos oficiales del país Backend (Constitución 2.1)
//  Alineado al contrato SUPREMO y al backend real
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

  // ⭐ Restaurado: channel sí existe en la arquitectura 2.0
  channel: number;
}

// ─────────────────────────────────────────────
// 2. Rol superficial IA‑MIA (SOBERANO)
// ─────────────────────────────────────────────
// ⭐ Alineado a SUPREMO: nombres constitucionales
export type MiaNotaRol =
  | "BASE"
  | "ACOMPANAMIENTO"
  | "RUIDO";

// ─────────────────────────────────────────────
// 3. Nota MIA SUCIA (clasificada superficialmente)
// ─────────────────────────────────────────────
export interface MiaSuciaNote extends BackendMidiNote {
  role: MiaNotaRol;
  tags: string[];
  inScale: boolean;
  valid: boolean;

  // ⭐ Campos internos del pipeline IA (opcionales)
  tipo?: string;
  estabilidad?: number;
  importancia?: number;
  vecinos?: number;
}

// ─────────────────────────────────────────────
// 4. Capas superficiales previas al cubo
// ─────────────────────────────────────────────
export interface MiaSuciaCapas {
  BASE: MiaSuciaNote[];
  ACOMPANAMIENTO: MiaSuciaNote[];
  RUIDO: MiaSuciaNote[];
}