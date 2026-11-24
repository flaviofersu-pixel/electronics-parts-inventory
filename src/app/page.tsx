import { PartsBrowser } from "@/components/PartsBrowser";
import { getLabels, getParts } from "@/lib/parts";

export default async function HomePage() {
  const [parts, labels] = await Promise.all([getParts(), getLabels()]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-8 pb-16">
      <PartsBrowser parts={parts} labels={labels} />
    </main>
  );
}
