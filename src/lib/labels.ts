import { LABEL_COLOR_PALETTE } from "./constants";
import type { Label } from "./types";

type LabelColors = {
  background: string;
  text: string;
};

// Same label name always gets the same colour, so chips stay consistent.
function pickPaletteColor(name: string): LabelColors {
  let hash = 0;
  for (const char of name.toLowerCase()) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return LABEL_COLOR_PALETTE[hash % LABEL_COLOR_PALETTE.length];
}

export function getLabelColors(label: Pick<Label, "name" | "color">): LabelColors {
  if (label.color) {
    return { background: label.color, text: "#0f1115" };
  }
  return pickPaletteColor(label.name);
}

export function normalizeLabelName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}
