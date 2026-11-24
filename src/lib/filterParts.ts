import type { PartWithLabels } from "./types";

// A part matches when its name contains the search text
// and it has every selected label.
export function filterParts(
  parts: PartWithLabels[],
  searchText: string,
  selectedLabelIds: string[],
): PartWithLabels[] {
  const query = searchText.trim().toLowerCase();

  return parts.filter((part) => {
    const matchesSearch = !query || part.name.toLowerCase().includes(query);
    const partLabelIds = part.labels.map((label) => label.id);
    const matchesLabels = selectedLabelIds.every((id) => partLabelIds.includes(id));
    return matchesSearch && matchesLabels;
  });
}
