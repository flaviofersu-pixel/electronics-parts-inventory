import { PartCard } from "@/components/PartCard";
import { getParts } from "@/lib/parts";

export default async function HomePage() {
  const parts = await getParts();

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-8 pb-16">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-semibold tracking-tight">My parts</h1>
        <p className="text-muted">{parts.length} parts</p>
      </div>

      {parts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center text-muted">
          No parts yet. Add your first one to get started.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </main>
  );
}
