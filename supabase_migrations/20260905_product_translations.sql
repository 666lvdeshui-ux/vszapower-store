-- Product titles, descriptions and specification translations must survive saves.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}'::jsonb;
