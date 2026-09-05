"""Build idempotent per-locale SQL imports with source and existing-translation guards.
Only translation dictionaries are modified; article content and publication dates remain intact.
"""
import json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]/'content/battery-academy/translations'
LOCALES=['de','ja','es','ko','he','ar','fr','pt','ru','vi','zh-HK','zh-CN','zh-TW']
for locale in sys.argv[1:] or LOCALES:
 path=ROOT/(locale+'.json')
 if not path.exists():continue
 rows=json.loads(path.read_text());payload=json.dumps(rows,ensure_ascii=False,separators=(',',':'))
 if '$vszdata$' in payload:raise ValueError('SQL delimiter collision')
 sql=f"""BEGIN;
CREATE TEMP TABLE vsz_translation_import ON COMMIT DROP AS
SELECT * FROM jsonb_to_recordset($vszdata${payload}$vszdata$::jsonb)
AS x(id text, source_md5 text, translation jsonb);
DO $vszcheck$
BEGIN
 IF (SELECT count(*) FROM vsz_translation_import) <> 31 THEN RAISE EXCEPTION 'Expected 31 translation records'; END IF;
 IF EXISTS (SELECT 1 FROM vsz_translation_import i LEFT JOIN public.posts p ON p.id=i.id WHERE p.id IS NULL OR md5(p.content) <> i.source_md5) THEN
  RAISE EXCEPTION 'Source article changed; refresh translation before importing';
 END IF;
 IF EXISTS (SELECT 1 FROM vsz_translation_import WHERE coalesce(length(translation->>'content'),0)=0 OR coalesce(length(translation->>'title'),0)=0) THEN
  RAISE EXCEPTION 'Incomplete translation';
 END IF;
 IF (SELECT count(DISTINCT id) FROM vsz_translation_import) <> 31 THEN RAISE EXCEPTION 'Duplicate article IDs'; END IF;
 IF EXISTS (SELECT 1 FROM vsz_translation_import i JOIN public.posts p ON p.id=i.id WHERE coalesce(p.translations->'{locale}'->>'content','') NOT IN ('',p.content) AND p.translations->'{locale}' IS DISTINCT FROM i.translation) THEN
  RAISE EXCEPTION 'Existing translation differs; review before overwriting';
 END IF;
END $vszcheck$;
UPDATE public.posts p SET translations = coalesce(p.translations, '{{}}'::jsonb) || jsonb_build_object('{locale}',i.translation)
FROM vsz_translation_import i WHERE p.id=i.id;
COMMIT;
SELECT '{locale}' AS locale, count(*) AS translated_articles FROM public.posts WHERE length(translations->'{locale}'->>'content')>0;
"""
 (ROOT/(locale+'-import.sql')).write_text(sql)
 print(locale,len(rows),'posts',len(sql.encode()),'bytes')
