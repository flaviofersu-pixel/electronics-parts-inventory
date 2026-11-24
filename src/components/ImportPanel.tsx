"use client";

import { useState } from "react";
import { parseImportedPart } from "@/lib/importPart";
import { IMPORT_PROMPT } from "@/lib/importPrompt";
import type { PartDraft } from "@/lib/types";

type ImportPanelProps = {
  onImport: (draft: PartDraft) => void;
};

const COPIED_MESSAGE_DURATION_MS = 2000;

export function ImportPanel({ onImport }: ImportPanelProps) {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [importedName, setImportedName] = useState("");

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(IMPORT_PROMPT);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), COPIED_MESSAGE_DURATION_MS);
  };

  const importJson = () => {
    const result = parseImportedPart(jsonText);
    if (!result.ok) {
      setError(result.error);
      setImportedName("");
      return;
    }
    setError("");
    setImportedName(result.draft.name);
    setJsonText("");
    onImport(result.draft);
  };

  return (
    <details className="group rounded-2xl border border-border bg-surface">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 font-semibold">
        <span>Import from AI</span>
        <span className="text-sm font-normal text-muted group-open:hidden">
          Fill the form from an AI chat&apos;s JSON
        </span>
      </summary>

      <div className="flex flex-col gap-5 border-t border-border px-6 pt-5 pb-6">
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm text-muted">
          <li>Copy the prompt and send it with a photo of your part to an AI chat.</li>
          <li>Paste the JSON it answers with below and click &quot;Fill form&quot;.</li>
          <li>Check the form, add the cost, and save.</li>
        </ol>

        <button
          type="button"
          onClick={copyPrompt}
          className="h-11 self-start rounded-lg border border-accent px-4 text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground"
        >
          {isCopied ? "Prompt copied" : "Copy prompt"}
        </button>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="import-json" className="text-sm font-semibold">
            JSON from the AI
          </label>
          <textarea
            id="import-json"
            rows={6}
            value={jsonText}
            onChange={(event) => setJsonText(event.target.value)}
            placeholder='{ "name": "…", "description": "…", "labels": ["…"] }'
            spellCheck={false}
            className="resize-y rounded-lg border border-border-strong bg-background px-3.5 py-3 font-mono text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent-ring"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={importJson}
            className="h-11 rounded-lg bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent-hover"
          >
            Fill form
          </button>
          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}
          {importedName && !error && (
            <p role="status" className="text-sm text-accent">
              Filled in &quot;{importedName}&quot;. Check it below and save.
            </p>
          )}
        </div>
      </div>
    </details>
  );
}
