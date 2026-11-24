import { DEFAULT_QUANTITY } from "./constants";
import type { PartDraft, PartWithLabels } from "./types";

export const EMPTY_PART_DRAFT: PartDraft = {
  name: "",
  description: "",
  cost: "",
  quantity: String(DEFAULT_QUANTITY),
  imageUrl: "",
  labels: [],
};

export function partToDraft(part: PartWithLabels): PartDraft {
  return {
    name: part.name,
    description: part.description ?? "",
    cost: part.cost === null ? "" : String(part.cost),
    quantity: String(part.quantity),
    imageUrl: part.image_url ?? "",
    labels: part.labels.map((label) => label.name),
  };
}
