// Shapes of the rows in the Supabase tables (see supabase/schema.sql).

export type Label = {
  id: string;
  name: string;
  color: string | null;
};

export type Part = {
  id: string;
  name: string;
  description: string | null;
  cost: number | null;
  image_url: string | null;
  quantity: number;
  created_at: string;
};

// A part together with its labels, as the parts grid shows it.
export type PartWithLabels = Part & { labels: Label[] };

// The values the part form starts with: empty, from an existing part, or from an import.
export type PartDraft = {
  name: string;
  description: string;
  cost: string;
  quantity: string;
  imageUrl: string;
  labels: string[];
};
