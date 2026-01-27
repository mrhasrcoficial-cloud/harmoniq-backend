// backend/dev/utils/base64.ts
// -------------------------------------------------------------
//  UTILS — Base64 ↔ ArrayBuffer / Uint8Array / Buffer (Node)
// -------------------------------------------------------------

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = Buffer.from(base64, "base64");
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary[i];
  }

  return buffer;
}

export function arrayBufferToBase64(
  buffer: ArrayBuffer | Uint8Array | Buffer
): string {
  // Caso 1: Buffer (Node)
  if (typeof Buffer !== "undefined" && buffer instanceof Buffer) {
    return buffer.toString("base64");
  }

  // Caso 2: Uint8Array
  if (buffer instanceof Uint8Array) {
    return Buffer.from(buffer).toString("base64");
  }

  // Caso 3: ArrayBuffer
  if (buffer instanceof ArrayBuffer) {
    return Buffer.from(new Uint8Array(buffer)).toString("base64");
  }

  // Fallback imposible (pero evita never)
  throw new Error("Tipo de buffer no soportado");
}
