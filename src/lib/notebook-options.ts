export const notebookQuoteSizes = [
  { id: "carta", label: "Carta", width: 8.5, height: 11, hint: "Estándar · vertical" },
  { id: "a4", label: "A4", width: 8.27, height: 11.69, hint: "Formato internacional · vertical" },
  { id: "5.5x4.5", label: "5.5 × 4.5", width: 5.5, height: 4.5, hint: "Muy pequeño · de bolsillo" },
  { id: "12x8.5", label: "12 × 8.5", width: 12, height: 8.5, hint: "Grande · horizontal" },
  { id: "8.5x5.5", label: "8.5 × 5.5", width: 8.5, height: 5.5, hint: "Mediano · media carta horizontal" },
] as const;

export const notebookPaperTypes = [
  { id: "blank", label: "Blancas" },
  { id: "ruled", label: "Rayadas" },
  { id: "dotted", label: "Puntos" },
  { id: "grid", label: "Cuadriculadas" },
] as const;

export function notebookQuoteMessage(options: {
  sizeIndex: number; paper: string; pages: number; quantity: number; notes: string; hasReference: boolean;
}) {
  const size = notebookQuoteSizes[options.sizeIndex] ?? notebookQuoteSizes[0];
  const paper = notebookPaperTypes.find((p) => p.id === options.paper) ?? notebookPaperTypes[0];
  return [
    "Hola Idealo, quiero cotizar libretas:",
    "Producto: Libreta personalizada · Portada gruesa",
    "Diseño: Quiero que Idealo lo diseñe",
    `Tamaño: ${size.label} (${size.width} × ${size.height} pulgadas)`,
    `Tipo de hojas: ${paper.label}`,
    `Cantidad de páginas: ${options.pages}`,
    `Cantidad de libretas: ${options.quantity}`,
    options.notes.trim() ? `Instrucciones especiales: ${options.notes.trim()}` : "",
    options.hasReference ? "Referencia: Tengo un diseño de referencia para adjuntar en este chat." : "",
    "Solicito una cotización, gracias 🙌",
  ].filter(Boolean).join("\n");
}