import { LoginForm } from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Log in</h1>
        <p className="text-muted">We&apos;ll email you a link to log in. No password needed.</p>
      </div>
      {error && (
        <p role="alert" className="rounded-lg border border-danger-border px-4 py-3 text-sm text-danger">
          That login link didn&apos;t work or has expired. Request a new one.
        </p>
      )}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <LoginForm />
      </div>
    </main>
  );
}
