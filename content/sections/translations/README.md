# OEM, factory and certification UI translations

`messages.json` contains 152 complete messages for each of the 14 supported locales. `en.json` records the source message inventory. These static sections resolve text through `lib/sectionI18n.ts` on each language render, including the OEM hero, header certification badges, card data, form options, placeholders, the inquiry summary and certificate previews.

Translations were authored directly or prepared using the Google Translate browser UI, then reviewed for packaging quantities, battery terminology, production capacity, brand names, technical ratings and certification identifiers. Hong Kong copy is derived from reviewed Traditional Chinese with local terminology. These are translations of existing website claims, not independent certification verification.

When adding or changing copy, update every locale. Run `node --experimental-strip-types --test tests/section-i18n.test.mjs` and the existing article/product localization tests. Form values and certificate selections store source identifiers so changing language does not reset a selection.
