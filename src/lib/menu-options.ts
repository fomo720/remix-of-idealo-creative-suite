export const menuSizes = ["Carta", "A4", "Oficio", "12 × 18 pulgadas", "Tabloide", "Grande para pared", "Media carta", "Otro tamaño"];
export const menuCuts = ["Rectangular clásico", "Esquinas redondeadas", "Forma personalizada"];
export const menuMaterials = ["Papel bond laminado", "Cartón de agenda con sticker", "PVC rígido", "Cartoncillo grueso completo"];
export const menuBindings = ["Con resorte", "Ojillos metálicos para colgar o argollar"];
export const menuQuantity = (value: number) => Math.max(1, Math.floor(value) || 1);
export type MenuSelection = { size: string; customSize: string; cut: string; customCut: string; material: string; binding: string; quantity: number; notes: string; ownDesign: boolean; hasFile: boolean };
export function menuReady(s: MenuSelection) {
  return menuSizes.includes(s.size) && (s.size !== "Otro tamaño" || !!s.customSize.trim()) && menuCuts.includes(s.cut) && (s.cut !== "Forma personalizada" || !!s.customCut.trim()) && menuMaterials.includes(s.material) && (s.binding === "Sin encuadernación" || menuBindings.includes(s.binding)) && (!s.ownDesign || s.hasFile);
}
export function menuQuoteMessage(s: MenuSelection) {
  return ["Hola Idealo, quiero cotizar menús para restaurantes:", `Diseño: ${s.ownDesign ? "Ya tengo mi diseño listo" : "100% personalizado"}`, `Tamaño: ${s.size}${s.size === "Otro tamaño" ? ` — ${s.customSize}` : ""}`, `Forma o corte: ${s.cut}${s.cut === "Forma personalizada" ? ` — ${s.customCut}` : ""}`, `Material: ${s.material}`, `Encuadernación: ${s.binding}`, `Cantidad: ${menuQuantity(s.quantity)}`, s.notes ? `Notas: ${s.notes}` : "", s.hasFile ? "Adjuntaré el archivo en el chat de WhatsApp." : ""].filter(Boolean).join("\n");
}