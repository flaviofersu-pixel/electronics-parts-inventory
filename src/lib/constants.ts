export const PARTS_TABLE = "parts";
export const LABELS_TABLE = "labels";
export const PART_LABELS_TABLE = "part_labels";

export const DEFAULT_QUANTITY = 1;
export const MAX_NAME_LENGTH = 120;
export const MAX_DESCRIPTION_LENGTH = 1000;
export const MAX_LABEL_LENGTH = 30;
export const MAX_LABELS_PER_PART = 10;

export const CURRENCY_CODE = "EUR";
export const LOCALE = "nl-NL";

// Background and text colour pairs for label chips, readable on the dark theme.
export const LABEL_COLOR_PALETTE = [
  { background: "#1e2b45", text: "#93b4f8" },
  { background: "#3a2614", text: "#f5b576" },
  { background: "#2d2342", text: "#c4a5f5" },
  { background: "#12332f", text: "#5eddd2" },
  { background: "#3a1f2a", text: "#f4a3c0" },
  { background: "#2f3315", text: "#d4dc7a" },
  { background: "#2a2e37", text: "#c9cbc4" },
] as const;
