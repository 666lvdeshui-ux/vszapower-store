# Product translation backfill — 2026-09-05

Eight public products have 14 locale records each: 104 non-English translations plus English copy with normalized categories and mixed-language specifications. Title, tagline, description, category, badge and every specification value are covered. Specification keys, source fields, images and prices are unchanged.

`source.json` preserves the public source copy. `manifest.json` records 118 deduplicated phrases including interface labels. `products.json` contains the final production translations; `ui.json` contains 34 reviewed interface labels per language. `verification.json` records the full production readback checksum. `import.sql` is a guarded, idempotent backup; it has already been applied and does not need re-running.

Translations were generated through the Google Translate text UI and corrected for model transliterations, incomplete Traditional Chinese titles, untranslated Hebrew phrases, mixed-language specifications and business terminology in the interface. Simplified/Traditional Chinese and Hong Kong terminology received targeted corrections. Numerals, model tokens and spec keys were checked; the Japanese translation of “two batteries” uses the numeral 2. This is not full native-speaker review or independent validation of original technical or commercial claims.

The product UI now resolves cards, modal descriptions, spec values, image titles and inquiry names through one stored-translation helper. Admin editing includes all language fields and stable specification keys. Product saves persist translations and surface database failures, while older clients that omit translations retain existing ones. Missing source specifications no longer receive generic assumed specifications.
