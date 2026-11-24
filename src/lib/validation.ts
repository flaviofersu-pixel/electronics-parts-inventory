import {
  DEFAULT_QUANTITY,
  MAX_DESCRIPTION_LENGTH,
  MAX_LABEL_LENGTH,
  MAX_LABELS_PER_PART,
  MAX_NAME_LENGTH,
} from "./constants";
import { normalizeLabelName } from "./labels";

export type PartInput = {
  name: string;
  description: string | null;
  cost: number | null;
  imageUrl: string | null;
  quantity: number;
  labelNames: string[];
};

export type PartField = "name" | "description" | "cost" | "imageUrl" | "quantity" | "labels";

export type PartFormErrors = Partial<Record<PartField, string>>;

type ParseResult = { ok: true; data: PartInput } | { ok: false; errors: PartFormErrors };

function readText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function parsePartForm(formData: FormData): ParseResult {
  const errors: PartFormErrors = {};

  const name = readText(formData, "name");
  if (!name) {
    errors.name = "Give the part a name.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Keep the name under ${MAX_NAME_LENGTH} characters.`;
  }

  const description = readText(formData, "description");
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Keep the description under ${MAX_DESCRIPTION_LENGTH} characters.`;
  }

  // Accept both 4.50 and 4,50 as a price.
  const costText = readText(formData, "cost").replace(",", ".");
  const cost = costText ? Number(costText) : null;
  if (cost !== null && (Number.isNaN(cost) || cost < 0)) {
    errors.cost = "Enter a price like 4.50, or leave it empty.";
  }

  const quantityText = readText(formData, "quantity");
  const quantity = quantityText ? Number(quantityText) : DEFAULT_QUANTITY;
  if (!Number.isInteger(quantity) || quantity < 0) {
    errors.quantity = "Enter a whole number of 0 or more.";
  }

  const imageUrl = readText(formData, "imageUrl");
  if (imageUrl && !isValidUrl(imageUrl)) {
    errors.imageUrl = "Paste a full link starting with https://";
  }

  const labelNames = [
    ...new Set(formData.getAll("labels").map((value) => normalizeLabelName(String(value)))),
  ].filter(Boolean);
  if (labelNames.length > MAX_LABELS_PER_PART) {
    errors.labels = `Use at most ${MAX_LABELS_PER_PART} labels.`;
  } else if (labelNames.some((label) => label.length > MAX_LABEL_LENGTH)) {
    errors.labels = `Keep each label under ${MAX_LABEL_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      description: description || null,
      cost,
      imageUrl: imageUrl || null,
      quantity,
      labelNames,
    },
  };
}
