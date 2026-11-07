// Opciones y reglas del wizard de Menús de restaurante.
// Editá este archivo para cambiar materiales, tamaños o reglas de compatibilidad
// sin tocar los componentes.

import menuLaCasa from "@/assets/menu-la-casa-parrilladas.jpg.asset.json";
import menuParrilleros from "@/assets/menu-parrilleros.jpg.asset.json";

export const menuMaterials = [
  { id: "bond", label: "Papel bond + laminado", hint: "La opción económica, protegida para uso diario." },
  { id: "opalina", label: "Papel opalina + laminado", hint: "Colores más vivos y acabado premium." },
  { id: "cartoncillo", label: "Cartoncillo (grueso, completo)", hint: "Rígido y firme, no necesita resorte." },
  { id: "agenda", label: "Cartón de agenda con sticker", hint: "Portada gruesa, perfecta para menú con resorte.", image: menuLaCasa.url },
  { id: "pvc", label: "PVC (rígido)", hint: "Ideal para menús que se limpian a diario.", image: menuParrilleros.url },
  { id: "coroplast", label: "Coroplast", hint: "Ligero e impermeable, para exteriores o autoservicio." },
] as const;

export type MenuMaterialId = (typeof menuMaterials)[number]["id"];

export const menuBindings = [
  { id: "suelto", label: "Sin resorte (hoja suelta)", hint: "Una pieza lista para usar o colgar." },
  { id: "resorte", label: "Con resorte (espiral)", hint: "Varias hojas unidas tipo libreta." },
  { id: "ojillos", label: "Con ojillos metálicos", hint: "Para colgar o argollar el menú." },
] as const;

export type MenuBindingId = (typeof menuBindings)[number]["id"];

// Reglas de compatibilidad: el resorte solo aplica a bond, opalina y cartón de
// agenda; PVC y coroplast son pieza rígida única. El laminado no se ofrece en
// PVC ni coroplast.
export const menuRules: {
  bindingsByMaterial: Record<MenuMaterialId, MenuBindingId[]>;
  laminadoMaterials: MenuMaterialId[];
} = {
  bindingsByMaterial: {
    bond: ["suelto", "resorte", "ojillos"],
    opalina: ["suelto", "resorte", "ojillos"],
    cartoncillo: ["suelto", "ojillos"],
    agenda: ["resorte", "ojillos"],
    pvc: ["suelto"],
    coroplast: ["suelto"],
  },
  laminadoMaterials: ["bond", "opalina", "cartoncillo", "agenda"],
};

export const menuFinishes = [
  { id: "mate", label: "Laminado mate", hint: "Elegante, sin reflejos de luz." },
  { id: "brillante", label: "Laminado brillante", hint: "Colores intensos y fácil de limpiar." },
  { id: "sin-laminar", label: "Sin laminar", hint: "Acabado natural del papel." },
] as const;

export const menuShapes = [
  { id: "rectangular", label: "Rectangular estándar", hint: "La forma clásica de siempre." },
  { id: "corte-especial", label: "Corte especial", hint: "Esquinas redondeadas o forma personalizada." },
] as const;

export const menuSizes = [
  { id: "media-carta", label: "Media carta", dims: "5.5 × 8.5 in", hint: "Compacto, ideal para mesas pequeñas." },
  { id: "carta", label: "Carta", dims: "8.5 × 11 in", hint: "El tamaño más usado en restaurantes." },
  { id: "a4", label: "A4", dims: "21 × 29.7 cm", hint: "Formato internacional." },
  { id: "oficio", label: "Oficio", dims: "8.5 × 14 in", hint: "Más largo, cabe más contenido." },
  { id: "12x18", label: "12 × 18 in", dims: "12 × 18 in", hint: "Grande, tipo cartel de mesa." },
  { id: "tabloide", label: "Tabloide", dims: "11 × 17 in", hint: "Amplio, para menús con muchas secciones." },
  { id: "grande", label: "Grande / autoservicio", dims: "A medida", hint: "Para pared o pantalla de autoservicio." },
  { id: "otro", label: "Otro tamaño", dims: "Personalizado", hint: "Decinos el ancho × alto que necesitás." },
] as const;

export const menuSides = [
  { id: "una", label: "Una cara" },
  { id: "dos", label: "Dos caras" },
] as const;

export type MenuQuoteSelection = {
  material: MenuMaterialId;
  binding: MenuBindingId;
  /** Hojas por menú (solo cuando binding es "resorte"). */
  pages: number;
  /** Id de menuFinishes; vacío cuando el material no lleva laminado. */
  finish: string;
  shape: string;
  /** Explicación del corte especial (opcional). */
  shapeNotes: string;
  size: string;
  /** Ancho × alto y unidad cuando size es "otro". */
  customSize: string;
  customSizeNotes: string;
  sides: string;
  quantity: number;
  designMode: "propio" | "idealo";
  hasDesignFile: boolean;
  restaurant: string;
  brandColors: string;
  dishes: string;
  styleRef: string;
  designNotes: string;
  hasLogo: boolean;
  hasDishPhotos: boolean;
  hasMenuFile: boolean;
  hasStyleImage: boolean;
  contactName: string;
  contactPhone: string;
  deliveryDate: string;
};

const byId = <T extends { id: string }>(list: readonly T[], id: string) =>
  list.find((o) => o.id === id);

export function menuQuoteMessage(sel: MenuQuoteSelection): string {
  const material = byId(menuMaterials, sel.material);
  const binding = byId(menuBindings, sel.binding);
  const finish = byId(menuFinishes, sel.finish);
  const shape = byId(menuShapes, sel.shape);
  const size = byId(menuSizes, sel.size);
  const sides = byId(menuSides, sel.sides);

  const lines: (string | false | null | undefined)[] = [
    "Hola Idealo, quiero cotizar menús de restaurante:",
    "",
    `Material: ${material?.label ?? sel.material}`,
    `Encuadernación: ${binding?.label ?? sel.binding}`,
    sel.binding === "resorte" && `Hojas por menú: ${sel.pages}`,
    finish && `Acabado: ${finish.label}`,
    `Forma: ${shape?.label ?? sel.shape}`,
    sel.shape === "corte-especial" && sel.shapeNotes.trim() && `Detalle del corte: ${sel.shapeNotes.trim()}`,
    sel.size === "otro"
      ? `Tamaño: Otro — ${sel.customSize.trim() || "a definir"}`
      : `Tamaño: ${size?.label ?? sel.size}${size?.dims ? ` (${size.dims})` : ""}`,
    sel.size === "otro" && sel.customSizeNotes.trim() && `Detalle del tamaño: ${sel.customSizeNotes.trim()}`,
    `Impresión: ${sides?.label ?? sel.sides}`,
    `Cantidad de menús: ${sel.quantity}`,
    "",
  ];

  if (sel.designMode === "propio") {
    lines.push(
      "Diseño: Ya tengo mi diseño listo",
      sel.hasDesignFile
        ? "Archivo de diseño: lo adjunto en este chat 📎"
        : "Archivo de diseño: lo envío por este chat",
    );
  } else {
    lines.push(
      "Diseño: Quiero que Idealo lo diseñe 100%",
      sel.restaurant.trim() && `Restaurante: ${sel.restaurant.trim()}`,
      sel.brandColors.trim() && `Colores de marca: ${sel.brandColors.trim()}`,
      sel.dishes.trim() && `Platos y precios: ${sel.dishes.trim()}`,
      sel.styleRef.trim() && `Estilo de referencia: ${sel.styleRef.trim()}`,
      sel.designNotes.trim() && `Comentarios: ${sel.designNotes.trim()}`,
      sel.hasLogo && "Logo: lo adjunto en este chat 📎",
      sel.hasDishPhotos && "Fotos de platos: las adjunto en este chat 📎",
      sel.hasMenuFile && "Menú actual: lo adjunto en este chat 📎",
      sel.hasStyleImage && "Imagen de referencia: la adjunto en este chat 📎",
    );
  }

  lines.push(
    "",
    sel.contactName.trim() && `Contacto: ${sel.contactName.trim()}`,
    sel.contactPhone.trim() && `Teléfono: ${sel.contactPhone.trim()}`,
    sel.deliveryDate.trim() && `Fecha deseada de entrega: ${sel.deliveryDate.trim()}`,
    "Solicito una cotización, gracias 🙌",
  );

  return lines.filter(Boolean).join("\n");
}
