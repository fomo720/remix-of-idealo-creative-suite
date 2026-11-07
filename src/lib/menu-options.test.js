import { describe, expect, test } from "bun:test";
import {
  menuMaterials,
  menuBindings,
  menuRules,
  menuSizes,
  menuQuoteMessage,
} from "./menu-options.ts";

const baseSelection = {
  material: "bond",
  binding: "suelto",
  pages: 1,
  finish: "mate",
  shape: "rectangular",
  shapeNotes: "",
  size: "carta",
  customSize: "",
  customSizeNotes: "",
  sides: "dos",
  quantity: 25,
  designMode: "propio",
  hasDesignFile: false,
  restaurant: "",
  brandColors: "",
  dishes: "",
  styleRef: "",
  designNotes: "",
  hasLogo: false,
  hasDishPhotos: false,
  hasMenuFile: false,
  hasStyleImage: false,
  contactName: "María",
  contactPhone: "9999-8888",
  deliveryDate: "2026-11-20",
};

describe("Menu compatibility rules", () => {
  test("resorte solo aplica a bond, opalina y cartón de agenda", () => {
    for (const m of menuMaterials) {
      const allows = menuRules.bindingsByMaterial[m.id].includes("resorte");
      expect(allows).toBe(["bond", "opalina", "agenda"].includes(m.id));
    }
  });

  test("PVC y coroplast son pieza rígida única (sin resorte ni ojillos) y sin laminado", () => {
    for (const id of ["pvc", "coroplast"]) {
      expect(menuRules.bindingsByMaterial[id]).toEqual(["suelto"]);
      expect(menuRules.laminadoMaterials.includes(id)).toBe(false);
    }
  });

  test("todo material tiene al menos una encuadernación válida", () => {
    for (const m of menuMaterials) {
      const valid = menuRules.bindingsByMaterial[m.id];
      expect(valid.length).toBeGreaterThan(0);
      for (const b of valid) {
        expect(menuBindings.map((x) => x.id)).toContain(b);
      }
    }
  });
});

describe("Menu WhatsApp message", () => {
  test("incluye material, tamaño, caras, cantidad, contacto y fecha", () => {
    const msg = menuQuoteMessage(baseSelection);
    expect(msg).toContain("Material: Papel bond + laminado");
    expect(msg).toContain("Tamaño: Carta (8.5 × 11 in)");
    expect(msg).toContain("Impresión: Dos caras");
    expect(msg).toContain("Cantidad de menús: 25");
    expect(msg).toContain("Contacto: María");
    expect(msg).toContain("Teléfono: 9999-8888");
    expect(msg).toContain("Fecha deseada de entrega: 2026-11-20");
    expect(msg).not.toContain("Hojas por menú");
  });

  test("con resorte incluye hojas por menú", () => {
    const msg = menuQuoteMessage({ ...baseSelection, binding: "resorte", pages: 12 });
    expect(msg).toContain("Encuadernación: Con resorte (espiral)");
    expect(msg).toContain("Hojas por menú: 12");
  });

  test("sin laminado en PVC no muestra acabado", () => {
    const msg = menuQuoteMessage({ ...baseSelection, material: "pvc", finish: "" });
    expect(msg).toContain("Material: PVC (rígido)");
    expect(msg).not.toContain("Acabado:");
  });

  test("tamaño 'otro' usa el texto personalizado y sus notas", () => {
    const msg = menuQuoteMessage({
      ...baseSelection,
      size: "otro",
      customSize: "20 × 30 cm",
      customSizeNotes: "Es para colgar en la pared",
    });
    expect(msg).toContain("Tamaño: Otro — 20 × 30 cm");
    expect(msg).toContain("Detalle del tamaño: Es para colgar en la pared");
  });

  test("corte especial incluye la explicación del cliente", () => {
    const msg = menuQuoteMessage({
      ...baseSelection,
      shape: "corte-especial",
      shapeNotes: "Esquinas redondeadas como el de Palma's",
    });
    expect(msg).toContain("Forma: Corte especial");
    expect(msg).toContain("Detalle del corte: Esquinas redondeadas como el de Palma's");
  });

  test("modo 'ya tengo mi diseño' menciona el archivo adjunto", () => {
    const msg = menuQuoteMessage({ ...baseSelection, designMode: "propio", hasDesignFile: true });
    expect(msg).toContain("Diseño: Ya tengo mi diseño listo");
    expect(msg).toContain("Archivo de diseño: lo adjunto en este chat");
  });

  test("modo 'diséñenlo ustedes' incluye restaurante, colores, platos y adjuntos", () => {
    const msg = menuQuoteMessage({
      ...baseSelection,
      designMode: "idealo",
      restaurant: "La Casa de las Parrilladas",
      brandColors: "Negro y dorado",
      dishes: "Parrillada L.350, Tacos L.160",
      styleRef: "https://instagram.com/ejemplo",
      hasLogo: true,
      hasDishPhotos: true,
    });
    expect(msg).toContain("Diseño: Quiero que Idealo lo diseñe 100%");
    expect(msg).toContain("Restaurante: La Casa de las Parrilladas");
    expect(msg).toContain("Colores de marca: Negro y dorado");
    expect(msg).toContain("Platos y precios: Parrillada L.350, Tacos L.160");
    expect(msg).toContain("Estilo de referencia: https://instagram.com/ejemplo");
    expect(msg).toContain("Logo: lo adjunto en este chat");
    expect(msg).toContain("Fotos de platos: las adjunto en este chat");
  });

  test("los 8 tamaños del brief están disponibles", () => {
    expect(menuSizes.map((s) => s.id)).toEqual([
      "media-carta", "carta", "a4", "oficio", "12x18", "tabloide", "grande", "otro",
    ]);
  });
});
