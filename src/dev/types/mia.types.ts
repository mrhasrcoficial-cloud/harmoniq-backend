// ============================================================
//  backend/src/dev/types/mia.types.ts
//  Marco geográfico oficial de MIA SUCIA v1.0 (Alineado a SUPREMO)
// ============================================================

// 64 alturas oficiales (HA–JL)
export type PMSmiaAltura =
  | "HA" | "HB" | "HC" | "HD" | "HE" | "HF" | "HG" | "HH" | "HI" | "HJ" | "HK" | "HL"
  | "HM" | "HN" | "HO" | "HP" | "HQ" | "HR" | "HS" | "HT" | "HU" | "HV" | "HW" | "HX"
  | "HY" | "HZ"
  | "IA" | "IB" | "IC" | "ID" | "IE" | "IF" | "IG" | "IH" | "II" | "IJ" | "IK" | "IL"
  | "IM" | "IN" | "IO" | "IP" | "IQ" | "IR" | "IS" | "IT" | "IU" | "IV" | "IW" | "IX"
  | "IY" | "IZ"
  | "JA" | "JB" | "JC" | "JD" | "JE" | "JF" | "JG" | "JH" | "JI" | "JJ" | "JK" | "JL";

// Capas soberanas del país Backend (alineadas con UI y PMSmia)
export type PMSmiaCapa =
  | "BASE"   // Melodía / voz principal
  | "ACMP"   // Acompañamiento
  | "TRSH"   // Ruido / notas descartadas
  | "SEP1"
  | "SEP2"
  | "SEP3";

// Tramo fundamental del cubo PMSmia
export type PMSmiaTramo = {
  altura: PMSmiaAltura;
  inicio: number;
  fin: number;
  capa: PMSmiaCapa;
};

// Capa geográfica dentro del cubo MIA SUCIA v1.0
export type MiaCapaNombre = "BASE" | "ACMP" | "TRSH";

export type MiaCapa = {
  nombre: MiaCapaNombre;
  tramos: PMSmiaTramo[];
};

// Cubo geográfico completo MIA SUCIA v1.0
// ⭐ Limpio: solo capas soberanas, sin metadata ni lenguaje
export type MiaCubo = {
  version: "1.0";

  capas: {
    BASE: MiaCapa;
    ACMP: MiaCapa;
    TRSH: MiaCapa;
  };
};