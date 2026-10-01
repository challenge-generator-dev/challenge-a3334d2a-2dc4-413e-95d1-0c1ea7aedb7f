# Desarrollo de una API REST en el dominio de gestión de préstamos

El sistema de gestión de préstamos necesita una API REST para administrar las solicitudes de préstamos de los clientes. Los actores involucrados son el 'originador de créditos', el 'motor antifraude' y el 'buró de riesgos'. La API debe registrar las solicitudes de préstamos con los siguientes campos: nombre del cliente, monto del préstamo, fecha de solicitud y estado de la solicitud. La API debe validar que el monto del préstamo sea mayor a cero y que la fecha de solicitud sea válida. En caso de error en la validación, la API debe devolver un mensaje de error descriptivo. La API debe ser idempotente respecto a la clave del préstamo, asegurando que dos solicitudes con la misma clave no generen duplicados.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Node.js Express |
| **Nivel** | junior-l1 |
| **Tipo** | practical |
| **Tiempo estimado** | 4 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Registro de solicitudes de préstamos

**Objetivo:** Implementar la funcionalidad básica para registrar solicitudes de préstamos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identificar los campos necesarios para una solicitud de préstamo.
- Definir las reglas de validación para cada campo.
- Implementar la persistencia de las solicitudes en la base de datos.
- Asegurar la idempotencia de las solicitudes mediante una clave única.

**Entregable:** API REST que acepta y persiste solicitudes de préstamos con validación de campos y garantía de idempotencia.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar errores de validación.
- Piensa en cómo asegurar que la API sea idempotente.

</details>

### Fase 2: Integración con motor antifraude y buró de riesgos

**Objetivo:** Integrar la API con el motor antifraude y el buró de riesgos para validar las solicitudes de préstamos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Definir la integración con el motor antifraude y el buró de riesgos.
- Implementar la lógica para enviar las solicitudes a estos servicios y recibir sus respuestas.
- Actualizar el estado de la solicitud en la base de datos según las respuestas recibidas.

**Entregable:** API REST integrada con el motor antifraude y el buró de riesgos, que actualiza el estado de las solicitudes según las respuestas recibidas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar las respuestas asíncronas de los servicios externos.
- Piensa en cómo garantizar la consistencia de los datos entre la API y los servicios externos.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una solicitud de préstamo y cuáles son sus campos necesarios?
- **paraQueSirve**: ¿Para qué sirve validar las solicitudes de préstamos con el motor antifraude y el buró de riesgos?
- **comoSeUsa**: ¿Cómo se usa la API para registrar y validar solicitudes de préstamos?
- **erroresComunes**: ¿Cuáles son los errores comunes al registrar solicitudes de préstamos y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la integración con servicios externos y cómo se toman?

## Criterios de Evaluacion

- Implementar la funcionalidad básica para registrar solicitudes de préstamos.
- Asegurar la validación de campos y la idempotencia de las solicitudes.
- Integrar la API con el motor antifraude y el buró de riesgos.
- Actualizar el estado de las solicitudes según las respuestas recibidas.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
