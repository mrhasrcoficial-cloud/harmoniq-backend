# Conectar adaptador de tramos al backend (sin cambiar versión)

Este módulo permite que el backend genere un `MiaCubo` con **tramos reales**
a partir de las capas clasificadas por `IAbrow`, sin modificar la versión 1.4.1
ni la constitución del backend.

---

## 1. Importar el adaptador en `backend/src/Index.ts`

Agregar al inicio del archivo:

```ts
import { adaptarCapasATramos } from "../../backend-adaptadores-tramos/adaptador-tramos.js";