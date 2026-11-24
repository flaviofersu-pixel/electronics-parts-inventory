import Link from "next/link";
import { formatCost, formatQuantity } from "@/lib/format";
import type { PartWithLabels } from "@/lib/types";
import { LabelChip } from "./LabelChip";
import { PartImage } from "./PartImage";

type PartCardProps = {
  part: PartWithLabels;
};

export function PartCard({ part }: PartCardProps) {
  return (
    <Link
      href={`/parts/${part.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-accent hover:shadow-lg hover:shadow-black/40"
    >
      <PartImage src={part.image_url} alt={part.name} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-2.5 px-4 pt-3.5 pb-4">
        <h2 className="text-[15px] leading-snug font-semibold">{part.name}</h2>
        {part.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {part.labels.map((label) => (
              <LabelChip key={label.id} label={label} />
            ))}
          </div>
        )}
        <div className="mt-auto flex items-baseline justify-between">
          <span className="font-mono text-[15px] font-medium">{formatCost(part.cost)}</span>
          <span className="text-sm text-muted">{formatQuantity(part.quantity)}</span>
        </div>
      </div>
    </Link>
  );
}
