import { describe, expect, test } from "bun:test";
import { menuSizes, menuCuts, menuMaterials, menuBindings, menuQuantity, menuReady, menuQuoteMessage } from "./menu-options.ts";
const selection = { size: "Carta", customSize: "", cut: "Rectangular clásico", customCut: "", material: "PVC rígido", binding: "Sin encuadernación", quantity: 1, notes: "", ownDesign: false, hasFile: false };
describe("Restaurant menu rules", () => {
  test("offers requested sizes without autoservicio", () => expect(menuSizes).toEqual(["Carta", "A4", "Oficio", "12 × 18 pulgadas", "Tabloide", "Grande para pared", "Media carta", "Otro tamaño"]));
  test("offers three cuts", () => expect(menuCuts).toEqual(["Rectangular clásico", "Esquinas redondeadas", "Forma personalizada"]));
  test("offers four materials", () => expect(menuMaterials).toEqual(["Papel bond laminado", "Cartón de agenda con sticker", "PVC rígido", "Cartoncillo grueso completo"]));
  test("binding is optional with two finishing options", () => { expect(menuReady(selection)).toBe(true); expect(menuBindings).toEqual(["Con resorte", "Ojillos metálicos para colgar o argollar"]); });
  test("quantity starts at one and advances in single units", () => { expect(menuQuantity(0)).toBe(1); expect(menuQuantity(1 + 1)).toBe(2); expect(menuQuantity(4 + 1)).toBe(5); });
  test("custom dimensions and shape are included", () => { const s = { ...selection, size: "Otro tamaño", customSize: "10 × 15 pulgadas", cut: "Forma personalizada", customCut: "Silueta de pez", binding: menuBindings[1], quantity: 5 }; expect(menuReady(s)).toBe(true); expect(menuQuoteMessage(s)).toContain("10 × 15 pulgadas"); expect(menuQuoteMessage(s)).toContain("Silueta de pez"); expect(menuQuoteMessage(s)).toContain("Cantidad: 5"); expect(menuQuoteMessage(s)).toContain(menuBindings[1]); });
  test("custom options require details", () => { expect(menuReady({ ...selection, size: "Otro tamaño" })).toBe(false); expect(menuReady({ ...selection, cut: "Forma personalizada" })).toBe(false); });
  test("own design requires file but personalized design does not", () => { expect(menuReady({ ...selection, ownDesign: true })).toBe(false); expect(menuReady({ ...selection, ownDesign: true, hasFile: true })).toBe(true); });
});