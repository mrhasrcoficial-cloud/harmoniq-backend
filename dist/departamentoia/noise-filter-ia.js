// backend/src/departamentoia/noise-filter-ia.ts
// -------------------------------------------------------------
// NoiseFilter-IA — Filtro superficiale costituzionale
// -------------------------------------------------------------
// Funzioni:
//   - Rimuovere note fantasma
//   - Rimuovere note troppo corte
//   - Rimuovere note fuori range
//   - Rimuovere duplicati
//   - Applicare etichette ARKLIM superficiali
//   - Usare un dizionario IA interno
//
// NON usa:
//   - Chasky
//   - LIMBoard
//   - allowedNotes / forbiddenNotes
//   - energia, tensione, intenzione
//   - analisi cognitiva
// -------------------------------------------------------------
// -------------------------------------------------------------
// Dizionario ARKLIM superficiale (consentito)
// -------------------------------------------------------------
const IA_DICTIONARY = {
    tags: {
        SHORT: "ARK-SHORT",
        GHOST: "ARK-GHOST",
        LOW_VELOCITY: "ARK-LOWVEL",
        DUPLICATE: "ARK-DUP",
        OUT_OF_RANGE: "ARK-OOR",
        CLEAN: "ARK-CLEAN"
    }
};
export const DEFAULT_NOISE_FILTER_CONFIG = {
    minDuration: 0.05,
    minVelocity: 20,
    minPitch: 20,
    maxPitch: 115
};
// -------------------------------------------------------------
// Funzione principale
// -------------------------------------------------------------
export function noiseFilterIA(notes, config = DEFAULT_NOISE_FILTER_CONFIG) {
    const result = [];
    const seen = new Set();
    for (const n of notes) {
        const tags = [];
        let valid = true;
        if (n.pitch < config.minPitch || n.pitch > config.maxPitch) {
            tags.push(IA_DICTIONARY.tags.OUT_OF_RANGE);
            valid = false;
        }
        if (n.duration < config.minDuration) {
            tags.push(IA_DICTIONARY.tags.SHORT);
            valid = false;
        }
        if (n.velocity < config.minVelocity) {
            tags.push(IA_DICTIONARY.tags.LOW_VELOCITY);
            valid = false;
        }
        const key = `${n.pitch}-${n.startTime.toFixed(4)}`;
        if (seen.has(key)) {
            tags.push(IA_DICTIONARY.tags.DUPLICATE);
            valid = false;
        }
        else {
            seen.add(key);
        }
        if (valid) {
            tags.push(IA_DICTIONARY.tags.CLEAN);
        }
        const role = valid ? inferRole(n) : "ruido";
        result.push({
            ...n,
            role,
            inScale: role !== "ruido",
            valid,
            tags
        });
    }
    return result;
}
// -------------------------------------------------------------
// Inferenza superficiale del ruolo (non cognitiva)
// -------------------------------------------------------------
function inferRole(n) {
    const pc = n.pitchClass;
    if (pc === 0 || pc === 5 || pc === 7)
        return "base";
    if (n.pitch >= 40 && n.pitch <= 90)
        return "acompanamiento";
    return "ruido";
}
