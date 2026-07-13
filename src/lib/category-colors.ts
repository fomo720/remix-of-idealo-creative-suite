import type { Category } from "@/data/catalog";

export const colorVar: Record<Category["color"], string> = {
  pink: "var(--brand-pink)",
  yellow: "var(--brand-yellow)",
  blue: "var(--brand-blue)",
  violet: "var(--brand-violet)",
  orange: "var(--brand-orange)",
  green: "var(--brand-green)",
  red: "var(--brand-red)",
  indigo: "var(--brand-indigo)",
};

export const colorSoftBg: Record<Category["color"], string> = {
  pink: "oklch(0.96 0.05 350)",
  yellow: "oklch(0.97 0.05 90)",
  blue: "oklch(0.96 0.04 245)",
  violet: "oklch(0.96 0.05 305)",
  orange: "oklch(0.97 0.05 55)",
  green: "oklch(0.96 0.05 150)",
  red: "oklch(0.96 0.05 25)",
  indigo: "oklch(0.96 0.05 275)",
};
