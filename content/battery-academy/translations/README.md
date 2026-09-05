# Article translation backfill

Completed and verified against the production API on 2026-09-05: 31 articles × 13 non-English locales = 403 translations. Every record includes title, summary, category, tags and body. All original article fields, including English content and publication dates, remained unchanged. `verification.json` records per-locale checksums from the final production readback.

The 2026-09-05 source snapshot contains 31 public articles and eight unique bodies.
`zh-CN-phrases.json` contains 401 translated and revised text fragments. The two files named `vsz-zh-CN.docx` and `translation-paragraphs.docx` supplied during review contained unchanged English input; the original Chinese DOCX omitted parameters and damaged formatting. Publication JSON is reconstructed against the source Markdown, not imported directly from those files.

The other locale files contain browser-assisted machine translations with targeted corrections for omitted parameters, model identifiers, ISO dates and untranslated categories. Hong Kong Chinese derives from Traditional Chinese with regional terminology adjustments. Numeric differences caused by decimal punctuation, translated number words and Japanese AA/AAA naming were reviewed. This is not a full native-speaker editorial review.

For a future readback, save the public `/api/posts` response locally and run `node scripts/verify_article_translation_backfill.mjs <response.json>`. The script requires exact equality with all archived translations and original source fields. A newly published article or intentional source edit requires a new baseline, not bypassing the assertions. The live article page was also checked in all 14 available languages, including English; titles and bodies switched without the missing-translation notice.

Run `python3 scripts/assemble_article_translations.py zh-CN` to rebuild and check the Simplified Chinese fragments. The assembled `<locale>.json` files are the final archived publication data for all locales. Run `python3 scripts/build_translation_import.py` to generate all guarded import transactions. The SQL aborts on missing/changed source articles or different existing translations and merges only the requested locale. Production already contains these translations; re-importing is unnecessary.

During final verification, JavaScript string replacement was found to collapse double-dollar formula delimiters in one article across 12 locales. A guarded correction restored the exact prepared Markdown. The final API checksums include that correction. When constructing SQL in JavaScript, insert JSON through concatenation or a replacement callback, not a replacement string.

Translation preserves original claims. This is not an independent engineering validation. The source still requires review for unsupported device-compatibility claims, cycle-life guarantees, the use of “trickle” for lithium charging, an LIR2016 voltage-cell typo, and malformed formula delimiters. These source issues are not silently changed by this backfill.

The current article template also has pre-existing untranslated interface labels and incomplete rendering of Markdown tables, links and formulas. This data backfill does not change that renderer.
