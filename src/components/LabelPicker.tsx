"use client";

import { useState, type KeyboardEvent } from "react";
import { MAX_LABEL_LENGTH } from "@/lib/constants";
import { normalizeLabelName } from "@/lib/labels";

type LabelPickerProps = {
  existingLabels: string[];
  selected: string[];
  onChange: (labels: string[]) => void;
};

export function LabelPicker({ existingLabels, selected, onChange }: LabelPickerProps) {
  const [draft, setDraft] = useState("");

  const addLabel = (name: string) => {
    const label = normalizeLabelName(name);
    if (label && !selected.includes(label)) {
      onChange([...selected, label]);
    }
    setDraft("");
  };

  const removeLabel = (name: string) => {
    onChange(selected.filter((label) => label !== name));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addLabel(draft);
    }
  };

  const suggestions = existingLabels.filter((label) => !selected.includes(label));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-8 flex-wrap items-center gap-2">
        {selected.length === 0 && <span className="text-sm text-muted">No labels yet</span>}
        {selected.map((label) => (
          <span
            key={label}
            className="inline-flex h-8 items-center gap-1 rounded-full bg-accent pr-1.5 pl-3 text-sm font-medium text-accent-foreground"
          >
            {label}
            <button
              type="button"
              onClick={() => removeLabel(label)}
              aria-label={`Remove label ${label}`}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/15"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <input type="hidden" name="labels" value={label} />
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          maxLength={MAX_LABEL_LENGTH}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a new label, e.g. motor"
          aria-label="New label"
          className="h-11 min-w-0 flex-1 rounded-lg border border-border-strong bg-surface px-3.5 outline-none focus:border-accent focus:ring-3 focus:ring-accent-ring"
        />
        <button
          type="button"
          onClick={() => addLabel(draft)}
          className="h-11 rounded-lg border border-accent px-4 text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground"
        >
          Add label
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Existing:</span>
          {suggestions.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => addLabel(label)}
              className="h-8 rounded-full border border-dashed border-border-strong px-3 text-sm font-medium text-muted hover:border-accent hover:text-accent"
            >
              + {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
