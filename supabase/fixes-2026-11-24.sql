-- One-time fixes for the tables created by hand in the Supabase dashboard,
-- so they match supabase/schema.sql. Paste into SQL Editor -> New query -> Run.
-- Safe to run once; each statement only changes settings, never deletes rows.

-- parts: name required with no empty default, money stored exactly,
-- created_at filled in automatically, quantity defaults to 1.
alter table public.parts alter column name drop default;
alter table public.parts alter column name set not null;
alter table public.parts alter column cost type numeric(10, 2);
alter table public.parts alter column created_at set default now();
alter table public.parts alter column quantity type integer;
update public.parts set quantity = 1 where quantity is null;
alter table public.parts alter column quantity set default 1;
alter table public.parts alter column quantity set not null;

-- labels: name required, no empty default, no duplicates.
alter table public.labels alter column name drop default;
alter table public.labels alter column name set not null;
alter table public.labels add constraint labels_name_key unique (name);

-- Row-level security policies: only a logged-in user can read or change data.
alter table public.parts       enable row level security;
alter table public.labels      enable row level security;
alter table public.part_labels enable row level security;

create policy "Logged-in users manage parts" on public.parts
  for all to authenticated using (true) with check (true);
create policy "Logged-in users manage labels" on public.labels
  for all to authenticated using (true) with check (true);
create policy "Logged-in users manage part labels" on public.part_labels
  for all to authenticated using (true) with check (true);
