// backend/src/departamentoia/IAOrchestrator.ts
// -------------------------------------------------------------
//  IAOrchestrator — Orquestador superficial IA‑MIA
//  Constitución Backend 1.7 (alineado a calibración fina)
// -------------------------------------------------------------
//  ✔ NO hace cognición
//  ✔ NO interpreta música
//  ✔ NO transforma MIDI
//  ✔ NO usa ARKLIM ni CRUZ
//  ✔ Orquesta el pipeline superficial completo
// -------------------------------------------------------------
//
//  Produce capas soberanas:
//      BASE / ACOMPANAMIENTO / RUIDO
//
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaCapas,
  MiaSuciaNote
} from "../dev/types/backend.types.js";

import { noiseFilterIA } from "./noise-filter-ia.js";
import { IAbrow_clasificarNotas } from "./IAbrow.js";
import { layerMapper } from "../dev/layer-mapper.js";

export class IAOrchestrator {
  run(notes: BackendMidiNote[]): MiaSuciaCapas {
    // 1. Filtro superficial de ruido físico
    const filtered: BackendMidiNote[] = noiseFilterIA(notes);

    // 2. Clasificación superficial IA‑MIA (roles base/acompa/ruido)
    const classified: MiaSuciaNote[] = IAbrow_clasificarNotas(filtered);

    // 3. Calibración fina de capas (ruido contextual, micro-notas, etc.)
    const capas: MiaSuciaCapas = layerMapper(classified);

    return capas;
  }
}