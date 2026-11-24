-- Full database schema for the parts inventory.
-- Reference for a fresh Supabase project: paste into SQL Editor and Run.
-- (For the project you already built by hand, run fixes-2026-11-24.sql instead.)

create table public.parts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  cost        numeric(10, 2),               -- price per unit in EUR
  image_url   text,                         -- link to an image on the internet
  quantity    integer not null default 1,
  created_at  timestamptz not null default now()
);

create table public.labels (
  id    uuid primary key default gen_random_uuid(),
  name  text not null unique,               -- e.g. screen, sensor, cable
  color text
);

-- Links parts and labels: one part can have many labels, one label many parts.
create table public.part_labels (
  part_id  uuid not null references public.parts(id)  on delete cascade,
  label_id uuid not null references public.labels(id) on delete cascade,
  primary key (part_id, label_id)
);

-- Row-level security: only a logged-in user can read or change anything.
alter table public.parts       enable row level security;
alter table public.labels      enable row level security;
alter table public.part_labels enable row level security;

create policy "Logged-in users manage parts" on public.parts
  for all to authenticated using (true) with check (true);
create policy "Logged-in users manage labels" on public.labels
  for all to authenticated using (true) with check (true);
create policy "Logged-in users manage part labels" on public.part_labels
  for all to authenticated using (true) with check (true);
