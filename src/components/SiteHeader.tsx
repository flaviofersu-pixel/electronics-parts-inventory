import Link from "next/link";
import { ChipIcon } from "./ChipIcon";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <ChipIcon className="h-7 w-7 text-accent" />
          <span className="font-display text-xl font-bold tracking-tight">
            Parts Inventory
          </span>
        </Link>
      </div>
    </header>
  );
}
