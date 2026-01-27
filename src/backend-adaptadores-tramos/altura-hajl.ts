// -------------------------------------------------------------
//  ALTURA HA–JL — Conversor pitch MIDI → código HA–JL
//  Independiente, sin dependencias del backend
// -------------------------------------------------------------

export function pitchToHAJL(pitch: number): string {
  const letras = [
    "HA","HB","HC","HD","HE","HF","HG","HH","HI","HJ","HK","HL",
    "HM","HN","HO","HP","HQ","HR","HS","HT","HU","HV","HW","HX",
    "HY","HZ",
    "IA","IB","IC","ID","IE","IF","IG","IH","II","IJ","IK","IL",
    "IM","IN","IO","IP","IQ","IR","IS","IT","IU","IV","IW","IX",
    "IY","IZ",
    "JA","JB","JC","JD","JE","JF","JG","JH","JI","JJ","JK","JL"
  ];

  const index = pitch - 21; // 21 = A0
  if (index < 0 || index >= letras.length) {
    return "HA"; // fallback constitucional
  }

  return letras[index];
}