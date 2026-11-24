import { DEFAULT_QUANTITY } from "./constants";
import { normalizeLabelName } from "./labels";
import type { PartDraft } from "./types";

type ImportResult = { ok: true; draft: PartDraft } | { ok: false; error: string };

const CODE_FENCE_PATTERN = /^```(?:json)?\s*|\s*```$/g;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number") {
    return String(value);
  }
  return "";
}

function readLabels(value: unknown): string[] {
  const rawLabels = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  const labels = rawLabels.map((label) => normalizeLabelName(readString(label))).filter(Boolean);
  return [...new Set(labels)];
}

// Turns JSON pasted from an AI chat into values for the part form.
// Accepts snake_case or camelCase keys and tolerates a ```json code fence.
export function parseImportedPart(text: string): ImportResult {
  const cleanedText = text.trim().replace(CODE_FENCE_PATTERN, "");
  if (!cleanedText) {
    return { ok: false, error: "Paste the JSON first." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanedText);
  } catch {
    return { ok: false, error: "That isn't valid JSON. Copy the whole block, including { and }." };
  }

  const data = Array.isArray(parsed) ? parsed[0] : parsed;
  if (!isRecord(data)) {
    return { ok: false, error: "Expected one part as a JSON object." };
  }

  const name = readString(data.name);
  if (!name) {
    return { ok: false, error: "The JSON has no \"name\" for the part." };
  }

  return {
    ok: true,
    draft: {
      name,
      description: readString(data.description),
      cost: readString(data.cost),
      quantity: readString(data.quantity) || String(DEFAULT_QUANTITY),
      imageUrl: readString(data.image_url ?? data.imageUrl),
      labels: readLabels(data.labels),
    },
  };
}
