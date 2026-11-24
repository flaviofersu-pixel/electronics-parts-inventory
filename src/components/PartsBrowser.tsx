"use client";

import { useMemo, useState } from "react";
import { filterParts } from "@/lib/filterParts";
import type { Label, PartWithLabels } from "@/lib/types";
import { LabelFilter } from "./LabelFilter";
import { PartCard } from "./PartCard";
import { SearchInput } from "./SearchInput";

type PartsBrowserProps = {
  parts: PartWithLabels[];
  labels: Label[];
};

export function PartsBrowser({ parts, labels }: PartsBrowserProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);

  const visibleParts = useMemo(
    () => filterParts(parts, searchText, selectedLabelIds),
    [parts, searchText, selectedLabelIds],
  );

  const toggleLabel = (labelId: string) => {
    setSelectedLabelIds((current) =>
      current.includes(labelId) ? current.filter((id) => id !== labelId) : [...current, labelId],
    );
  };

  const countText =
    visibleParts.length === parts.length
      ? `${parts.length} parts`
      : `${visibleParts.length} of ${parts.length} parts`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight">My parts</h1>
          <p className="text-muted">{countText}</p>
        </div>
        <SearchInput value={searchText} onChange={setSearchText} />
      </div>

      <LabelFilter
        labels={labels}
        selectedIds={selectedLabelIds}
        onToggle={toggleLabel}
        onClear={() => setSelectedLabelIds([])}
      />

      {parts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center text-muted">
          No parts yet. Add your first one to get started.
        </p>
      ) : visibleParts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center text-muted">
          No parts match. Try another label or search term.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {visibleParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </>
  );
}
