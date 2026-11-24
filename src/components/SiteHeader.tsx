import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { ChipIcon } from "./ChipIcon";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <ChipIcon className="h-7 w-7 text-accent" />
          <span className="font-display text-xl font-bold tracking-tight">
            Parts Inventory
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-2">
            <form action={signOut}>
              <button
                type="submit"
                className="h-11 rounded-lg px-3.5 text-sm font-medium text-muted hover:text-foreground"
              >
                Sign out
              </button>
            </form>
            <Link
              href="/parts/new"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-4.5 font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add part
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
