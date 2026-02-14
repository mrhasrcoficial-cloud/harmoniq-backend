export const CONSTITUCION_BACKEND_VERSION = "2.2";
export const CONSTITUCION_BACKEND_TEXTO = `
🔥 CONSTITUCIÓN DEL PAÍS BACKEND
Versión 2.2 — Edición Soberana MIA SUCIA v1.0
Ratificada por Ransa, Guardián Supremo del Backend

PREÁMBULO
El país Backend es la frontera oficial del organismo Harmoniq.
Su misión es recibir MIDI físico, convertirlo en notas reales,
ejecutar el pipeline IAOrchestrator, construir el cubo geográfico
MIA SUCIA v1.0 y entregar un contrato soberano, estable y verificable.

Backend no corrige, no interpreta, no genera cognición, no produce
tonalidad, no produce armonía, no produce ARKLIM ni CRUZ.
Backend no altera pitch, duración, velocity ni posición.

Backend ejecuta el pipeline constitucional:
MIDI → ingestMidi → IAOrchestrator → capas → tramos → cubo → MIA SUCIA

✔ Backend separa exclusivamente en las capas soberanas:
- BASE
- ACOMPANAMIENTO
- RUIDO

✔ Backend construye exclusivamente:
- El cubo geográfico MIA SUCIA v1.0
- Con tramos reales (pitch MIDI real)
- Con inicio/fin en segundos
- Con capas soberanas BASE / ACOMPANAMIENTO / RUIDO

TÍTULO I — PROPÓSITO DEL BACKEND
Artículo 1 — Rol fundamental
Backend es el país del servidor, la ingesta física y la construcción
del cubo geográfico MIA SUCIA v1.0.

Artículo 2 — IA‑MIA Soberana
La IAOrchestrator realiza:
- Clasificación constitucional
- División en capas soberanas
- Etiquetado superficial
- Sin cognición

TÍTULO II — GEOGRAFÍA OFICIAL DEL PAÍS BACKEND
backend/
  CONSTITUCION_BACKEND.ts
  package.json
  tsconfig.json

  src/
    server.ts
    index.ts (punto de compilación oficial)
    teletransportador-A.ts

    aduana/
      aduana-mia-sucia.ts (control profundo opcional)

    departamentoia/
      IAOrchestrator.ts

    dev/
      procesar-y-empaquetar-mia.ts
      constructor-mia-sucia.ts
      desempaquetador-mia-sucia.ts
      empaquetador-mia-sucia.ts
      validar-mia-sucia.ts (validador constitucional)
      midi-ingestor.ts

      types/
        backend.types.ts
        mia.types.ts

    backend-adaptadores-tramos/
      adaptador-tramos.ts

    contracts/
      mia-sucia.contract.ts

  dist/
    (versión compilada)

TÍTULO III — MÓDULOS SOBERANOS

Artículo 4 — Ingesta MIDI
Archivo:
- midi-ingestor.ts
Función:
- Convertir MIDI físico → notas reales
- No alterar datos

Artículo 5 — IA‑MIA (departamentoia/)
Archivo:
- IAOrchestrator.ts
Función:
- Clasificación constitucional
- División en BASE / ACOMPANAMIENTO / RUIDO
- Sin cognición

Artículo 6 — MIA Builder (dev/)
Archivos:
- constructor-mia-sucia.ts
- procesar-y-empaquetar-mia.ts
- desempaquetador-mia-sucia.ts
- empaquetador-mia-sucia.ts
- validar-mia-sucia.ts
Función:
- Construir el cubo geográfico MIA SUCIA v1.0
- Validar superficialmente
- No corregir
- No interpretar

Artículo 7 — Adaptador de Tramos
Archivo:
- adaptador-tramos.ts
Función:
- Convertir capas → tramos reales
- pitch MIDI real
- inicio/fin reales

Artículo 8 — Contratos oficiales
Archivo:
- mia-sucia.contract.ts
Función:
- Definir el contrato diplomático MIA SUCIA v1.0

Artículo 9 — Aduana Backend
Archivo:
- aduana-mia-sucia.ts
Función:
- Control profundo opcional
- No define identidad
- No reemplaza al validador constitucional

Artículo 10 — Transportador diplomático
Archivo:
- teletransportador-A.ts
Función:
- Mover MIA SUCIA fuera del país Backend
- No modificar

TÍTULO IV — RUTAS SOBERANAS
Artículo 11 — Reglas de importación
- Toda importación interna debe comenzar en backend/src/
- Prohibido importar desde SRC, ARKLIM o CRUZ
- Prohibido incluir transformadores cognitivos

TÍTULO V — PROHIBICIONES CONSTITUCIONALES
Backend tiene prohibido:
- Modificar el MIDI original
- Alterar pitch, duración, velocity o posición
- Incluir ARKLIM cognitivo
- Incluir CRUZ perceptivo
- Generar tonalidad, armonía o estructura
- Usar transformadores cognitivos

TÍTULO VI — PROCESO OFICIAL MIA SUCIA (2.2)

1. Entrada
- Express recibe MIDI físico
- Se convierte a Uint8Array

2. IA‑MIA
- ingestMidi → notas reales
- IAOrchestrator → capas soberanas

3. MIA Builder
- adaptarCapasATramos → tramos reales
- construirMiaSucia → cubo geográfico
- validarMiaSucia → validación constitucional
- empaquetador → opcional

4. Salida
- Se devuelve MIA SUCIA v1.0
- + análisis musical superficial
- Sin cognición

TÍTULO VII — DISPOSICIONES FINALES
Artículo 12 — Vigencia
Esta Constitución entra en vigor al ser incluida en el repositorio.

Artículo 13 — Guardián Supremo
El guardián del país Backend es Ransa.

✔ Constitución Backend 2.2 — Edición Definitiva
✔ Lista para compilación oficial
✔ Lista para gobernar el país Backend
`;
export const CONSTITUCION_BACKEND = {
    version: CONSTITUCION_BACKEND_VERSION,
    texto: CONSTITUCION_BACKEND_TEXTO,
};
