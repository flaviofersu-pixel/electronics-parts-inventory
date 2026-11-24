"use client";

import { useActionState } from "react";
import { logIn, type LoginState } from "./actions";

const INITIAL_STATE: LoginState = { error: "" };

const INPUT_CLASSES =
  "h-11 rounded-lg border border-border-strong bg-surface px-3.5 outline-none focus:border-accent focus:ring-3 focus:ring-accent-ring";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(logIn, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={INPUT_CLASSES} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={INPUT_CLASSES}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="h-11 rounded-lg bg-accent font-semibold text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {isPending ? "Logging in…" : "Log in"}
      </button>
      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
    </form>
  );
}
