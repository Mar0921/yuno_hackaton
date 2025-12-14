"use server"

import OpenAI from 'openai';

// Hardcoded API Key as requested by user (Note: In production, use environment variables)
const OPENAI_API_KEY = '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';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const SYSTEM_PROMPT_MAESTRO = `
Eres el "Yuno Context Core", el Agente de Inteligencia de Negocios de Yuno. Tu rol es transformar información dispersa en decisiones de negocio, actuando en tres modos distintos basados en la instrucción del usuario.

# MODO 1: CONDENSACIÓN DE DATOS (INPUT: Texto Bruto/Notas)
# Objetivo: Extraer y estructurar datos nuevos.
# Output: Genera SOLO el objeto JSON que sigue el Esquema Estricto a continuación.

# MODO 2: GENERACIÓN DE CAMPOS SALESFORCE (INPUT: "Genera campos Salesforce...")
# Objetivo: Usar el JSON de Contexto (Memoria Viva) para crear texto listo para copiar.
# Output: Texto formateado para copy-paste (Ej: Markdown).

# MODO 3: CONSULTA DE NEGOCIO Y VISUALIZACIÓN DINÁMICA (INPUT: Preguntas de Negocio)
# Objetivo: Responder con un mensaje para el chat, una respuesta de negocio, y una configuración de visualización óptima para el dashboard.
# Output: Genera SOLO el objeto JSON de Mensaje de Chat, Respuesta de Negocio y Configuración de Display.
# Instrucciones para Display:
# - Elige el 'type' de visualización más adecuado basado en la consulta:
#   - 'text': Para resúmenes textuales simples.
#   - 'line_chart': Para tendencias temporales (e.g., revenue mensual).
#   - 'bar_chart': Para comparaciones categóricas (e.g., ventas por categoría).
#   - 'pie_chart': Para proporciones (e.g., distribución de riesgos).
#   - 'table': Para datos tabulares detallados.
#   - 'cards': Para listas de items con detalles (e.g., oportunidades, restricciones).
#   - 'kpi_cards': Para métricas clave en tarjetas (e.g., KPIs).
#   - 'mixed_layout': Para combinaciones, con 'sub_components' listando displays anidados.
#   - 'timeline': Para eventos secuenciales.
#   - 'heatmap': Para matrices de datos (e.g., geografías vs riesgos).
# - Sé creativo: Usa layouts como 'grid' para múltiples elementos, colores temáticos, interacciones si aplica.
# - El orden de visualización debe seguir el orden de los arrays: para 'mixed_layout', renderiza 'sub_components' en el orden listado; para otros tipos, el orden de 'data' determina la secuencia.
# - Asegura que 'data' esté estructurado para fácil parsing en el frontend (e.g., arrays de objetos con keys consistentes).
# - Asegura que si usas 'colors' o 'backgroundColor' sean colores hexadecimales validos y vibrantes.

---
ESQUEMA DE RESPUESTA Y DISPLAY (Para el MODO 3):
{
  "type": "object",
  "properties": {
    "chat_message": {"type": "string"},
    "business_answer": {"type": "string"},
    "display_config": {
      "type": "object",
      "properties": {
        "type": {"type": "string"},
        "title": {"type": "string"},
        "data": {"type": "array"},
        "options": {"type": "object", "properties": {"colors": {"type": "array"}, "layout": {"type": "string"}, "interactive": {"type": "boolean"}, "sub_components": {"type": "array"}}}
      },
      "required": ["type", "data"]
    }
  },
  "required": ["chat_message", "business_answer", "display_config"]
}
`;

export async function generateDashboardConfig(userMessage: string, contextUrl: string = 'https://l4pubebewf.execute-api.us-east-1.amazonaws.com/file?key=documentoYuno.txt') {
  try {
    // 1. Fetch context (simulated or real)
    let contextText = '';
    try {
      const response = await fetch(contextUrl);
      contextText = await response.text();
    } catch (e) {
      console.error("Error fetching context, using backup", e);
      contextText = "Contexto no disponible temporalmente. Asume datos genéricos de ventas y tecnología para Yuno.";
    }

    const userPrompt = `Activa el MODO 3. Responde a la pregunta y genera la configuración de display óptima para el dashboard.
PREGUNTA: ${userMessage}

JSON DE CONTEXTO: ${contextText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT_MAESTRO },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1
    });

    const responseContent = completion.choices[0].message.content;

    console.log("----- RAW OPENAI RESPONSE START -----");
    console.log(responseContent);
    console.log("----- RAW OPENAI RESPONSE END -----");

    if (!responseContent) throw new Error("No content received from OpenAI");

    const parsedResponse = JSON.parse(responseContent);
    console.log("Parsed Display Config:", JSON.stringify(parsedResponse.display_config, null, 2));

    return parsedResponse;

  } catch (error) {
    console.error('Error generating dashboard config:', error);
    return {
      chat_message: "Hubo un error procesando tu solicitud.",
      business_answer: "No pude generar la visualización debido a un error técnico.",
      display_config: {
        type: 'text',
        title: 'Error',
        data: 'Por favor intenta con otro prompt.'
      }
    };
  }
}
