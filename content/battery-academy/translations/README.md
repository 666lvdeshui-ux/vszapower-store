# Article translation backfill

The 2026-09-05 source snapshot contains 31 public articles and eight unique bodies.
`zh-CN-phrases.json` contains 401 translated and revised text fragments. The two files named `vsz-zh-CN.docx` and `translation-paragraphs.docx` supplied during review contained unchanged English input; the original Chinese DOCX omitted parameters and damaged formatting. Publication JSON is reconstructed against the source Markdown, not imported directly from those files.

Run `python3 scripts/assemble_article_translations.py zh-CN` to check numeric values, model identifiers, links, headings, table rows and formulas, then `python3 scripts/build_translation_import.py zh-CN` to generate the guarded transaction. The SQL aborts on missing/changed source articles or different existing translations and merges only the requested locale.

Translation preserves original claims. This is not an independent engineering validation. The source still requires review for unsupported device-compatibility claims, cycle-life guarantees, the use of “trickle” for lithium charging, an LIR2016 voltage-cell typo, and malformed formula delimiters. These source issues are not silently changed by this backfill.
