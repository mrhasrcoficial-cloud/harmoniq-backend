// backend/src/types/types.d.ts
// -------------------------------------------------------------
//  DECLARACIONES GLOBALES — País Backend (Constitución 1.3.1)
// -------------------------------------------------------------
//  Este archivo declara módulos externos sin tipos oficiales.
//  No contiene lógica. Solo evita errores de TypeScript.
// -------------------------------------------------------------

// -------------------------------------------------------------
//  tone — Declaración mínima
// -------------------------------------------------------------
declare module "tone" {
  export const Transport: any;
  export const start: () => Promise<void>;

  export class Sampler {
    constructor(options: any);
    toDestination(): Sampler;
    triggerAttackRelease(
      note: string | number,
      duration: number,
      time?: number
    ): void;
  }
}

// -------------------------------------------------------------
//  midi-writer-js — Declaración oficial
// -------------------------------------------------------------
declare module "midi-writer-js" {
  export class NoteEvent {
    constructor(options: any);
  }

  export class Track {
    addEvent(event: any): void;
  }

  export class Writer {
    constructor(tracks: Track[]);
    buildFile(): Uint8Array;
  }
}

// -------------------------------------------------------------
//  file-saver — Declaración oficial
// -------------------------------------------------------------
declare module "file-saver" {
  export function saveAs(
    data: Blob | File | string,
    filename?: string
  ): void;
}

// -------------------------------------------------------------
//  lodash-es — Declaración mínima
// -------------------------------------------------------------
declare module "lodash-es" {
  export function cloneDeep<T>(value: T): T;
  export function uniq<T>(array: T[]): T[];
  export function groupBy<T>(
    array: T[],
    key: any
  ): Record<string, T[]>;
}

// -------------------------------------------------------------
//  midi-player-js — Declaración oficial
// -------------------------------------------------------------
declare module "midi-player-js" {
  export class Player {
    constructor(callback?: (event: any) => void);
    loadDataUri(uri: string): void;
    play(): void;
    stop(): void;
    pause(): void;
  }
}

// -------------------------------------------------------------
//  webmidi — Declaración oficial
// -------------------------------------------------------------
declare module "webmidi" {
  export const WebMidi: any;
}

// -------------------------------------------------------------
//  teoria — Declaración opcional
// -------------------------------------------------------------
declare module "teoria" {
  const teoria: any;
  export default teoria;
}

// -------------------------------------------------------------
//  tonal — Declaración opcional
// -------------------------------------------------------------
declare module "@tonaljs/tonal" {
  export const Note: any;
  export const Scale: any;
  export const Key: any;
}

// -------------------------------------------------------------
//  @tonejs/midi — Declaración mínima (Backend Soberano)
// -------------------------------------------------------------
declare module "@tonejs/midi" {
  export class Midi {
    constructor(data: Uint8Array | ArrayBuffer);

    tracks: Array<{
      notes: Array<{
        midi: number;
        time: number;
        duration: number;
        velocity: number;
      }>;
    }>;
  }

  const MidiPkg: {
    Midi: typeof Midi;
  };

  export default MidiPkg;
}

// -------------------------------------------------------------
//  Marcar este archivo como módulo
// -------------------------------------------------------------
export {};
