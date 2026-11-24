import "server-only";
import { LABELS_TABLE, PARTS_TABLE } from "./constants";
import { createClient } from "./supabase/server";
import type { Label, PartWithLabels } from "./types";

// Supabase follows the part_labels link table to embed each part's labels.
const PART_WITH_LABELS_COLUMNS = "*, labels(*)";

export async function getParts(): Promise<PartWithLabels[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(PARTS_TABLE)
    .select(PART_WITH_LABELS_COLUMNS)
    .order("name");

  if (error) {
    throw new Error(`Could not load parts: ${error.message}`);
  }
  return data as PartWithLabels[];
}

export async function getPart(id: string): Promise<PartWithLabels | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(PARTS_TABLE)
    .select(PART_WITH_LABELS_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load part: ${error.message}`);
  }
  return data as PartWithLabels | null;
}

export async function getLabels(): Promise<Label[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from(LABELS_TABLE).select("*").order("name");

  if (error) {
    throw new Error(`Could not load labels: ${error.message}`);
  }
  return data as Label[];
}
