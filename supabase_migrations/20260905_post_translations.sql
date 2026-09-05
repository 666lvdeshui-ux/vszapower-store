-- Persist full translations keyed by canonical locale (e.g. zh-CN).
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}'::jsonb;
