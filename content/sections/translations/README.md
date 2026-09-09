# OEM, factory and certification UI translations

`messages.json` contains 247 complete messages for each of the 14 supported locales. `en.json` records the same source message inventory. These static sections resolve text through `lib/sectionI18n.ts` on each language render, including the OEM hero, header certification badges, certification cards, buyer FAQ, card data, form options, placeholders, inquiry summaries, footer certification copy and the OEM inquiry form. Compliance links preserve the selected language and battery-documentation anchors.

Translations were authored directly or prepared using the Google Translate browser UI, then reviewed for packaging quantities, battery terminology, production capacity, brand names, technical ratings and certification identifiers. Hong Kong copy is derived from reviewed Traditional Chinese with local terminology. These are translations of existing website claims, not independent certification verification.

When adding or changing copy, update every locale and the English inventory. Run `node --test tests/section-i18n.test.mjs` and the existing article/product localization tests. The section checks reject untranslated JSX prose and render the actual cards, hero, factory, FAQ and navigation in all 14 languages. Form values and certificate selections store source identifiers so changing language does not reset a selection.

The September 9 repair adds 46 messages per locale for content introduced during the evidence-page redesign. These translations preserve the existing report scope and do not establish new certifications. Detailed English evidence pages retain their existing route policy; the localized Compliance Center is available in all 14 languages.
