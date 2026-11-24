import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { PartForm } from "@/components/PartForm";
import { partToDraft } from "@/lib/partDraft";
import { getLabels, getPart } from "@/lib/parts";
import { updatePart } from "../../actions";

type EditPartPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPartPage({ params }: EditPartPageProps) {
  const { id } = await params;
  const [part, labels] = await Promise.all([getPart(id), getLabels()]);

  if (!part) {
    notFound();
  }

  const partHref = `/parts/${part.id}`;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-6 pb-16">
      <BackLink href={partHref}>Back to part</BackLink>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Edit part</h1>
      <PartForm
        action={updatePart.bind(null, part.id)}
        existingLabels={labels.map((label) => label.name)}
        initialValues={partToDraft(part)}
        submitText="Save changes"
        cancelHref={partHref}
      />
    </main>
  );
}
