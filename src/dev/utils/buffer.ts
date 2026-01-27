// backend/dev/utils/buffer.ts
// -------------------------------------------------------------
//  UTILS — Normalización de buffers
// -------------------------------------------------------------
//  Asegura que siempre trabajamos con ArrayBuffer real.
// -------------------------------------------------------------

export function toRealArrayBuffer(input: ArrayBuffer | Uint8Array): ArrayBuffer {
  if (input instanceof ArrayBuffer) {
    return input;
  }

  const realBuffer = new ArrayBuffer(input.length);
  new Uint8Array(realBuffer).set(input);
  return realBuffer;
}
