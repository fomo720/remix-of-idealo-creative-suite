// Zonas de impresión compartidas entre el editor 2D y el nuevo escenario de mockup.
// Los valores son los mismos que usaba TextilesEditor2D (no cambia la lógica de recorte).

export type ViewId = "front" | "back" | "sleeve-left" | "sleeve-right";

// Print zones measured from the source vector artworks (% of full view image).
export const PRINT_ZONE: Record<ViewId, { x: number; y: number; w: number; h: number }> = {
  front:         { x: 37.7, y: 30.0, w: 27.1, h: 38.0 },
  back:          { x: 42.0, y: 26.0, w: 22.0, h: 40.0 },
  "sleeve-left": { x: 46.0, y: 28.0, w: 11.0, h: 50.0 },
  "sleeve-right":{ x: 46.0, y: 28.0, w: 11.0, h: 50.0 },
};

// Real-world size of each print zone (cm), measured on a size M garment.
export const ZONE_CM: Record<ViewId, { w: number; h: number }> = {
  front:          { w: 30, h: 38 },
  back:           { w: 32, h: 42 },
  "sleeve-left":  { w: 9,  h: 30 },
  "sleeve-right": { w: 9,  h: 30 },
};

// El área segura es un 92% de la zona total; el resto se considera sangrado.
export const SAFE_RATIO = 0.92;

export const roundHalf = (n: number) => Math.round(n * 2) / 2;
export const cmToIn = (cm: number) => Math.round((cm / 2.54) * 10) / 10;

/** Medida real (cm + pulgadas) de un rectángulo expresado en % de la zona. */
export function measureLabel(view: ViewId, wPct: number, hPct: number) {
  const z = ZONE_CM[view];
  const w = roundHalf((wPct / 100) * z.w);
  const h = roundHalf((hPct / 100) * z.h);
  return `${w} x ${h} cm (${cmToIn(w)}" x ${cmToIn(h)}")`;
}
