"use client";

import { useTransition } from "react";
import { deletePart } from "@/app/parts/actions";

type DeletePartButtonProps = {
  partId: string;
  partName: string;
};

export function DeletePartButton({ partId, partName }: DeletePartButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!window.confirm(`Delete "${partName}"? This can't be undone.`)) {
      return;
    }
    startTransition(() => deletePart(partId));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-danger-border px-5 font-semibold text-danger hover:bg-danger-border/40 disabled:opacity-60"
    >
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
      </svg>
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
