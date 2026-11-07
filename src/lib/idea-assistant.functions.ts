import { createServerFn } from "@tanstack/react-start";

export type IdeaResult = {
  resumen: string;
  recomendaciones: { titulo: string; detalle: string }[];
  especificaciones: { campo: string; valor: string }[];
  preguntas: string[];
};

export const analyzeIdea = createServerFn({ method: "POST" })
  .inputValidator((input: { producto: "camisa" | "libreta"; idea: string }) => {
    const idea = String(input?.idea ?? "").trim().slice(0, 2000);
    if (idea.length < 5) throw new Error("Describe tu idea con un poco más de detalle.");
    const producto = input?.producto === "libreta" ? "libreta" : "camisa";
    return { producto, idea } as const;
  })
  .handler(async ({ data }): Promise<{ result?: IdeaResult; error?: string }> => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    const catalogo =
      data.producto === "camisa"
        ? "Camisas: tipos Cuello Redondo (tallas unisex S-XXL), Dri Fit (unisex S-XXL), Columbia (Hombre S-XXL, Mujer XS-XL). Técnicas: DTF, vinil textil, sublimación (solo telas claras/poliéster). Diseño frontal y opcional en espalda; posiciones: pecho izquierdo (chico ~10cm), centro del pecho (mediano ~25cm), espalda completa (grande ~30x40cm)."
        : "Libretas: solo portada gruesa. Tamaños en pulgadas: Carta 8.5x11, A4 8.3x11.7, 12x8.5 (panorámica), 8.5x5.5 (media carta), 5.5x4.5 (chiquita). Hojas: blancas, rayadas, puntos, cuadriculadas. Puede convertirse en planificador o agenda si el cliente lo pide.";
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions:
          "Eres asesor de Idealo, imprenta en La Ceiba, Honduras. Responde en español hondureño amable, breve. No menciones precios. Recomienda solo opciones del catálogo. Responde en JSON.",
        input: [
          {
            role: "user",
            content: `Catálogo: ${catalogo}\n\nProducto: ${data.producto}\nIdea del cliente: ${data.idea}\n\nDevuelve JSON con: resumen (1-2 frases), recomendaciones (3-4 opciones de personalización con titulo y detalle), especificaciones (campo/valor del pedido sugerido: tipo, tamaño/tallas, técnica u hojas, cantidad, colores, etc. usa "Por confirmar" si falta), preguntas (1-3 dudas para confirmar).`,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "idea",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["resumen", "recomendaciones", "especificaciones", "preguntas"],
              properties: {
                resumen: { type: "string" },
                recomendaciones: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["titulo", "detalle"],
                    properties: { titulo: { type: "string" }, detalle: { type: "string" } },
                  },
                },
                especificaciones: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["campo", "valor"],
                    properties: { campo: { type: "string" }, valor: { type: "string" } },
                  },
                },
                preguntas: { type: "array", items: { type: "string" } },
              },
            },
          },
        },
      });
      let text = "";
      for (const item of (res as { output?: unknown[] }).output ?? []) {
        const it = item as { type?: string; content?: { type?: string; text?: string }[] };
        if (it.type === "message") for (const c of it.content ?? []) if (c.type === "output_text") text += c.text ?? "";
      }
      return { result: JSON.parse(text) as IdeaResult };
    } catch (e) {
      console.error("analyzeIdea failed", e);
      if (e instanceof GatewayError && e.httpStatus === 429) return { error: "Hay mucha demanda, intentá en un momento." };
      if (e instanceof GatewayError && e.httpStatus === 402) return { error: "El asistente no está disponible ahora mismo." };
      return { error: "No pudimos analizar tu idea. Intentá de nuevo." };
    }
  });
