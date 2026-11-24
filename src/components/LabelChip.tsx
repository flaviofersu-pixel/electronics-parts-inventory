import { getLabelColors } from "@/lib/labels";
import type { Label } from "@/lib/types";

type LabelChipProps = {
  label: Pick<Label, "name" | "color">;
  size?: "sm" | "md";
};

export function LabelChip({ label, size = "sm" }: LabelChipProps) {
  const { background, text } = getLabelColors(label);
  const sizeClasses = size === "sm" ? "h-[22px] px-2 text-xs" : "h-6 px-2.5 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses}`}
      style={{ backgroundColor: background, color: text }}
    >
      {label.name}
    </span>
  );
}
