# electronics-parts-inventory

A small web app to keep track of electronic parts and cables: add, edit and delete parts,
tag them with labels (screen, sensor, cable…) and filter by label.

**Stack:** Next.js (App Router, TypeScript) + Tailwind CSS, Supabase (Postgres + Auth), hosted on Vercel.

## Features

- Dark theme, works on phone and desktop
- Parts grid with search by name and filter by label
- Part detail page with image, cost, stock and description
- Add, edit and delete parts, with a label picker
- Import from AI: paste the JSON an AI chat gives you for a photo of a part, and the form fills itself in
- Email and password login: only your own account can see and change the inventory

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with your Supabase project values (Project Settings → API Keys):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-or-publishable-key
   ```
3. Run `supabase/schema.sql` in the Supabase SQL Editor (skip if the tables already exist).
4. In Supabase → Authentication:
   - **Users → Add user → Create new user**: enter your email and a password and tick
     "Auto Confirm User". That is the account you log in with; the app has no sign-up page.
5. Start the dev server and open http://localhost:3000:
   ```bash
   npm run dev
   ```

## Import a part from an AI chat

1. Open **Add part** and expand **Import from AI**.
2. Click **Copy prompt** and send it, together with a photo of your part, to any AI chat.
3. Paste the JSON it answers with and click **Fill form**.
4. Check the values, add the cost and save.

The expected JSON looks like this:

```json
{
  "name": "SSD1306 OLED display 0.96\"",
  "description": "Small 128x64 monochrome OLED screen that talks over I2C.",
  "labels": ["screen", "I2C"],
  "cost": null,
  "quantity": 1,
  "image_url": ""
}
```

## Project structure

| Path | What it holds |
| --- | --- |
| `src/app` | Pages: parts grid, part detail, add/edit form, login |
| `src/app/parts/actions.ts` | Server actions to create, update and delete parts |
| `src/components` | UI components (part card, label chip, filters, form) |
| `src/lib` | Supabase clients, data loading, validation, constants |
| `src/middleware.ts` | Keeps the session fresh and sends logged-out visitors to `/login` |

## Database

- `supabase/schema.sql` — the full schema (tables, links, row-level security).

## Data model

| Table | What it holds |
| --- | --- |
| `parts` | name, description, cost (EUR), image URL, quantity, created_at |
| `labels` | label name (unique) and optional color |
| `part_labels` | which labels belong to which part |
