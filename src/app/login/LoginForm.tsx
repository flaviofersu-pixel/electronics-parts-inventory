"use client";

import { useActionState } from "react";
import { sendMagicLink, type LoginState } from "./actions";

const INITIAL_STATE: LoginState = { status: "idle", message: "" };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(sendMagicLink, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 rounded-lg border border-border-strong bg-surface px-3.5 outline-none focus:border-accent focus:ring-3 focus:ring-accent-ring"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="h-11 rounded-lg bg-accent font-semibold text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send login link"}
      </button>
      {state.message && (
        <p
          role="status"
          className={state.status === "error" ? "text-sm text-danger" : "text-sm text-accent"}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
