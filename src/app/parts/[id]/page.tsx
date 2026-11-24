import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { LabelChip } from "@/components/LabelChip";
import { PartImage } from "@/components/PartImage";
import { formatCost } from "@/lib/format";
import { getPart } from "@/lib/parts";

type PartPageProps = {
  params: Promise<{ id: string }>;
};

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
      <span className="text-sm text-muted">{label}</span>
      <span className="font-mono text-2xl font-medium">{value}</span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold tracking-wider text-muted uppercase">{children}</h2>
  );
}

export default async function PartPage({ params }: PartPageProps) {
  const { id } = await params;
  const part = await getPart(id);

  if (!part) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-6 pb-16">
      <BackLink href="/">All parts</BackLink>

      <div className="flex flex-wrap items-start gap-10">
        <PartImage
          src={part.image_url}
          alt={part.name}
          className="aspect-[4/3] min-w-0 flex-[1_1_420px] rounded-2xl border border-border"
        />

        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          {part.labels.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {part.labels.map((label) => (
                <LabelChip key={label.id} label={label} size="md" />
              ))}
            </div>
          )}
          <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight">
            {part.name}
          </h1>

          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Cost per unit" value={formatCost(part.cost)} />
            <StatTile label="In stock" value={String(part.quantity)} />
          </div>

          {part.description && (
            <section className="flex flex-col gap-1.5">
              <SectionHeading>Description</SectionHeading>
              <p className="leading-relaxed whitespace-pre-line">{part.description}</p>
            </section>
          )}

          {part.image_url && (
            <section className="flex flex-col gap-1.5">
              <SectionHeading>Image source</SectionHeading>
              <a
                href={part.image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm break-all text-accent hover:text-accent-hover"
              >
                {part.image_url}
              </a>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
