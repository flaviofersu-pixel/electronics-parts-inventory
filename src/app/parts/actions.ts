"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PartFormState } from "@/components/PartForm";
import { LABELS_TABLE, PART_LABELS_TABLE, PARTS_TABLE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { parsePartForm, type PartInput } from "@/lib/validation";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

const SAVE_FAILED_MESSAGE = "Saving failed. Check your connection and try again.";

function readFormValues(formData: FormData): PartFormState["values"] {
  return {
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    cost: String(formData.get("cost") ?? ""),
    quantity: String(formData.get("quantity") ?? ""),
  };
}

function toPartRow(input: PartInput) {
  return {
    name: input.name,
    description: input.description,
    cost: input.cost,
    image_url: input.imageUrl,
    quantity: input.quantity,
  };
}

// Creates any new labels, then replaces the part's links with the given labels.
async function setPartLabels(
  supabase: SupabaseClient,
  partId: string,
  labelNames: string[],
): Promise<boolean> {
  const { error: unlinkError } = await supabase
    .from(PART_LABELS_TABLE)
    .delete()
    .eq("part_id", partId);
  if (unlinkError) {
    return false;
  }

  if (labelNames.length === 0) {
    return true;
  }

  const { data: labels, error: labelError } = await supabase
    .from(LABELS_TABLE)
    .upsert(
      labelNames.map((name) => ({ name })),
      { onConflict: "name" },
    )
    .select("id");
  if (labelError || !labels) {
    return false;
  }

  const { error: linkError } = await supabase
    .from(PART_LABELS_TABLE)
    .insert(labels.map((label) => ({ part_id: partId, label_id: label.id })));
  return !linkError;
}

export async function createPart(
  _previousState: PartFormState,
  formData: FormData,
): Promise<PartFormState> {
  const result = parsePartForm(formData);
  if (!result.ok) {
    return { errors: result.errors, values: readFormValues(formData) };
  }

  const supabase = await createClient();
  const { data: part, error } = await supabase
    .from(PARTS_TABLE)
    .insert(toPartRow(result.data))
    .select("id")
    .single();

  if (error || !part) {
    return { errors: {}, message: SAVE_FAILED_MESSAGE, values: readFormValues(formData) };
  }

  const labelsSaved = await setPartLabels(supabase, part.id, result.data.labelNames);
  if (!labelsSaved) {
    return { errors: {}, message: "The part was saved, but its labels were not.", values: readFormValues(formData) };
  }

  revalidatePath("/");
  redirect(`/parts/${part.id}`);
}

export async function updatePart(
  partId: string,
  _previousState: PartFormState,
  formData: FormData,
): Promise<PartFormState> {
  const result = parsePartForm(formData);
  if (!result.ok) {
    return { errors: result.errors, values: readFormValues(formData) };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from(PARTS_TABLE)
    .update(toPartRow(result.data))
    .eq("id", partId);

  if (error) {
    return { errors: {}, message: SAVE_FAILED_MESSAGE, values: readFormValues(formData) };
  }

  const labelsSaved = await setPartLabels(supabase, partId, result.data.labelNames);
  if (!labelsSaved) {
    return { errors: {}, message: "The part was saved, but its labels were not.", values: readFormValues(formData) };
  }

  revalidatePath("/");
  revalidatePath(`/parts/${partId}`);
  redirect(`/parts/${partId}`);
}
