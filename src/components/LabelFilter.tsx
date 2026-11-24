import type { Label } from "@/lib/types";

type LabelFilterProps = {
  labels: Label[];
  selectedIds: string[];
  onToggle: (labelId: string) => void;
  onClear: () => void;
};

export function LabelFilter({ labels, selectedIds, onToggle, onClear }: LabelFilterProps) {
  if (labels.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted">Filter by label</span>
      {labels.map((label) => {
        const isSelected = selectedIds.includes(label.id);
        return (
          <button
            key={label.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(label.id)}
            className={`h-9 rounded-full border px-3.5 text-sm font-medium transition-colors ${
              isSelected
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border-strong bg-surface hover:border-accent"
            }`}
          >
            {label.name}
          </button>
        );
      })}
      {selectedIds.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="h-9 px-2.5 text-sm font-medium text-accent underline hover:text-accent-hover"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
