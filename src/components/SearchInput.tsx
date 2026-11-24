type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="flex h-11 w-80 max-w-full items-center gap-2 rounded-lg border border-border-strong bg-surface px-3.5 focus-within:border-accent">
      <svg className="h-[18px] w-[18px] shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="sr-only">Search parts</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name…"
        className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-subtle"
      />
    </label>
  );
}
