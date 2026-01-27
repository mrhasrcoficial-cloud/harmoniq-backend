// backend/src/departamentoia/IAbrow.ts
// -------------------------------------------------------------
//  IAbrow — IA‑MIA (Clasificación superficial)
//  Versión constitucional 1.4.1
// -------------------------------------------------------------
// -------------------------------------------------------------
//  Clase IA — Clasificación superficial
// -------------------------------------------------------------
export class IAbrow {
    // Regla superficial de rol
    clasificarNota(n) {
        const pc = n.pitchClass;
        if (n.pitch < 20 || n.pitch > 115)
            return "ruido";
        if (n.duration < 0.05)
            return "ruido";
        if (pc === 0 || pc === 5 || pc === 7)
            return "base";
        return "acompanamiento";
    }
    // Convertir BackendMidiNote → MiaSuciaNote
    etiquetar(notes) {
        return notes.map(n => {
            const role = this.clasificarNota(n);
            return {
                ...n,
                role,
                inScale: role !== "ruido",
                valid: role !== "ruido",
                tags: []
            };
        });
    }
    // API interna
    procesar(notes) {
        return this.etiquetar(notes);
    }
}
// -------------------------------------------------------------
//  API oficial: clasificar notas superficialmente
// -------------------------------------------------------------
export function IAbrow_clasificarNotas(notes) {
    const ia = new IAbrow();
    return ia.procesar(notes);
}
// -------------------------------------------------------------
//  API oficial: clasificar capas (requiere MiaSuciaNote[])
// -------------------------------------------------------------
export function IAbrow_clasificarCapas(notes) {
    return {
        base: notes.filter(n => n.role === "base"),
        acompanamiento: notes.filter(n => n.role === "acompanamiento"),
        ruido: notes.filter(n => n.role === "ruido")
    };
}
