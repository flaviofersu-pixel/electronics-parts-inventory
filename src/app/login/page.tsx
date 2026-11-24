import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Log in</h1>
        <p className="text-muted">Log in with the account you created in Supabase.</p>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-6">
        <LoginForm />
      </div>
    </main>
  );
}
