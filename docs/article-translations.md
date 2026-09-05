# Article translations

## Deployment order

1. Run `supabase_migrations/20260905_post_translations.sql` in the production Supabase SQL editor before deploying the application. The migration adds a JSONB column without deleting article data.
2. Deploy the application. Article writes now report database errors instead of claiming success after losing translations.
3. In Admin → Articles, edit an article and enter translated title, summary, category and full Markdown content for each language. Save and reload the article to verify persistence.
4. Verify the homepage cards, Academy list and detail page in English, simplified/traditional Chinese and one RTL language. Missing body translations must show the original-content notice.

## Daily publication contract

Each post can carry `translations` keyed by canonical locale: en, de, ja, es, ko, he, ar, fr, pt, ru, vi, zh-CN, zh-HK, zh-TW. Legacy underscore keys are normalized on save and read.

Generate and review full Markdown translations after finalizing the source. Preserve battery model identifiers, numerical values, units, formulas, links and Markdown structure. Submit translations with the post to the authenticated `/api/posts` endpoint. Verify the saved record and public rendering after publication. When editing source text, review and update its translations in the same publication change.

Keyword replacement is not a substitute for full article translation. Historic records containing copies of source content in every language must be replaced with actual translations. Existing records with only translated titles/summaries will continue to display the original body with a notice until completed.

No translation-provider credentials or production database credentials are present in this workspace. This change does not provision an external translation service or retroactively translate all historic bodies. Locale-specific SEO URLs remain a separate routing migration.

## Validation

- `node --experimental-strip-types --test tests/post-i18n.test.mjs` (Node 22)
- `npx tsc --noEmit`
- `npm run build`
