# electronics-parts-inventory

A small web app to keep track of electronic parts and cables: add, edit and delete parts,
tag them with labels (screen, sensor, cable…) and filter by label.

**Stack:** Next.js (App Router, TypeScript) + Tailwind CSS, Supabase (Postgres + Auth), hosted on Vercel.

## Database

- `supabase/schema.sql` — the full schema (tables, links, row-level security).
- `supabase/fixes-2026-11-24.sql` — one-time fixes for the tables first created by hand.

## Data model

| Table | What it holds |
| --- | --- |
| `parts` | name, description, cost (EUR), image URL, quantity, created_at |
| `labels` | label name (unique) and optional color |
| `part_labels` | which labels belong to which part |
