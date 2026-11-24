"use client";

import { useState } from "react";
import { EMPTY_PART_DRAFT } from "@/lib/partDraft";
import type { PartDraft } from "@/lib/types";
import { ImportPanel } from "./ImportPanel";
import { PartForm, type PartFormState } from "./PartForm";

type NewPartFormProps = {
  action: (state: PartFormState, formData: FormData) => Promise<PartFormState>;
  existingLabels: string[];
};

export function NewPartForm({ action, existingLabels }: NewPartFormProps) {
  const [draft, setDraft] = useState<PartDraft>(EMPTY_PART_DRAFT);
  // A new key remounts the form so it picks up the imported values.
  const [formKey, setFormKey] = useState(0);

  const handleImport = (importedDraft: PartDraft) => {
    setDraft(importedDraft);
    setFormKey((key) => key + 1);
  };

  return (
    <>
      <ImportPanel onImport={handleImport} />
      <PartForm
        key={formKey}
        action={action}
        existingLabels={existingLabels}
        initialValues={draft}
        submitText="Save part"
        cancelHref="/"
      />
    </>
  );
}
