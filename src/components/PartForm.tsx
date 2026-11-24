"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { DEFAULT_QUANTITY } from "@/lib/constants";
import type { PartFormErrors } from "@/lib/validation";
import type { PartWithLabels } from "@/lib/types";
import { FormField, INPUT_CLASSES } from "./FormField";
import { LabelPicker } from "./LabelPicker";
import { PartImage } from "./PartImage";

export type PartFormState = {
  errors: PartFormErrors;
  message?: string;
  // What was typed, so a failed save doesn't clear the form.
  values?: Partial<Record<"name" | "description" | "cost" | "quantity", string>>;
};

type PartFormProps = {
  action: (state: PartFormState, formData: FormData) => Promise<PartFormState>;
  existingLabels: string[];
  part?: PartWithLabels;
  submitText: string;
  cancelHref: string;
};

const INITIAL_STATE: PartFormState = { errors: {} };

export function PartForm({ action, existingLabels, part, submitText, cancelHref }: PartFormProps) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_STATE);
  const [imageUrl, setImageUrl] = useState(part?.image_url ?? "");
  const [labels, setLabels] = useState(part?.labels.map((label) => label.name) ?? []);
  const { errors, values } = state;

  return (
    <div className="flex flex-wrap items-start gap-8">
      <form
        action={formAction}
        noValidate
        className="flex min-w-0 flex-[999_1_560px] flex-col gap-5 rounded-2xl border border-border bg-surface p-7"
      >
        <FormField id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={values?.name ?? part?.name}
            aria-invalid={Boolean(errors.name)}
            className={INPUT_CLASSES}
          />
        </FormField>

        <FormField id="description" label="Description" error={errors.description}>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={values?.description ?? part?.description ?? ""}
            aria-invalid={Boolean(errors.description)}
            className={`${INPUT_CLASSES} h-auto resize-y py-3 leading-normal`}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField id="cost" label="Cost per unit (€)" error={errors.cost}>
            <input
              id="cost"
              name="cost"
              type="text"
              inputMode="decimal"
              defaultValue={values?.cost ?? part?.cost ?? ""}
              aria-invalid={Boolean(errors.cost)}
              className={`${INPUT_CLASSES} font-mono`}
            />
          </FormField>
          <FormField id="quantity" label="Quantity" error={errors.quantity}>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={0}
              defaultValue={values?.quantity ?? part?.quantity ?? DEFAULT_QUANTITY}
              aria-invalid={Boolean(errors.quantity)}
              className={`${INPUT_CLASSES} font-mono`}
            />
          </FormField>
        </div>

        <FormField
          id="imageUrl"
          label="Image URL"
          error={errors.imageUrl}
          hint="Paste a link to a photo of the same part from a shop or datasheet."
        >
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://…"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            aria-invalid={Boolean(errors.imageUrl)}
            className={INPUT_CLASSES}
          />
        </FormField>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Labels</span>
          <LabelPicker existingLabels={existingLabels} selected={labels} onChange={setLabels} />
          {errors.labels && <p className="text-sm text-danger">{errors.labels}</p>}
        </div>

        {state.message && (
          <p role="alert" className="text-sm text-danger">
            {state.message}
          </p>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
          <Link
            href={cancelHref}
            className="inline-flex h-11 items-center rounded-lg border border-border-strong px-5 font-semibold hover:border-foreground"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="h-11 rounded-lg bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent-hover disabled:opacity-60"
          >
            {isPending ? "Saving…" : submitText}
          </button>
        </div>
      </form>

      <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
        <h2 className="text-sm font-semibold tracking-wider text-muted uppercase">Image preview</h2>
        <PartImage
          key={imageUrl}
          src={imageUrl.trim() || null}
          alt="Preview of the part image"
          className="aspect-[4/3] rounded-xl border border-border"
        />
      </aside>
    </div>
  );
}
