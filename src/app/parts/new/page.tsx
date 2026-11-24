import { BackLink } from "@/components/BackLink";
import { NewPartForm } from "@/components/NewPartForm";
import { getLabels } from "@/lib/parts";
import { createPart } from "../actions";

export default async function NewPartPage() {
  const labels = await getLabels();

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-6 pb-16">
      <BackLink href="/">All parts</BackLink>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Add a part</h1>
      <NewPartForm action={createPart} existingLabels={labels.map((label) => label.name)} />
    </main>
  );
}
