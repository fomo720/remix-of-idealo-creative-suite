import { describe, expect, test } from "bun:test";
import { notebookQuoteMessage, notebookQuoteSizes, notebookPaperTypes } from "./notebook-options.ts";

describe("Notebook quote rules", () => {
  test("offers only the requested five sizes in inches", () => {
    expect(notebookQuoteSizes.map((s) => [s.id, s.width, s.height])).toEqual([
      ["carta", 8.5, 11], ["a4", 8.27, 11.69], ["5.5x4.5", 5.5, 4.5], ["12x8.5", 12, 8.5], ["8.5x5.5", 8.5, 5.5],
    ]);
  });
  test("offers blank, ruled, dotted and grid paper only", () => {
    expect(notebookPaperTypes.map((p) => p.id)).toEqual(["blank", "ruled", "dotted", "grid"]);
  });
  for (const paper of notebookPaperTypes) {
    test(`includes ${paper.id} paper, pages and handwritten requests in WhatsApp`, () => {
      const message = notebookQuoteMessage({ sizeIndex: 2, paper: paper.id, pages: 150, quantity: 25, notes: "Quiero convertirla en una agenda", hasReference: false });
      expect(message).toContain(`Tipo de hojas: ${paper.label}`);
      expect(message).toContain("Cantidad de páginas: 150");
      expect(message).toContain("Cantidad de libretas: 25");
      expect(message).toContain("5.5 × 4.5 pulgadas");
      expect(message).toContain("Quiero convertirla en una agenda");
      expect(message).toContain("Portada gruesa");
      expect(message).not.toContain("Referencia:");
    });
  }
  test("reference is optional and included only when supplied", () => {
    const options = { sizeIndex: 0, paper: "blank", pages: 80, quantity: 1, notes: "" };
    expect(notebookQuoteMessage({ ...options, hasReference: true })).toContain("Referencia:");
    expect(notebookQuoteMessage({ ...options, hasReference: false })).not.toContain("Referencia:");
  });
});