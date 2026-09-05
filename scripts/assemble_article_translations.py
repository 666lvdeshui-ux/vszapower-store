"""Assemble explicitly reviewed phrase translations; preserve the source Markdown."""
import json,re,sys,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]/'content/battery-academy/translations'
locale=sys.argv[1]
manifest=json.loads((ROOT/'paragraph-map.json').read_text())
values=json.loads((ROOT/(locale+'-phrases.json')).read_text())
assert set(values)=={e['key'] for e in manifest['entries']},'Missing or unexpected phrases'
for e in manifest['entries']:
 assert values[e['key']].strip(),e['key']
 nums=lambda x:sorted(re.findall(r'\d+(?:[.,]\d+)*',x))
 # Reviewed localization: English 1-click becomes Chinese 一键 / 一鍵.
 if e['key']!='VSZSEG00240':assert nums(e['source'])==nums(values[e['key']]),e['key']+' numeric mismatch'
 assert sorted(re.findall(r'(?:LIR|ML|CR)\d+',e['source']))==sorted(re.findall(r'(?:LIR|ML|CR)\d+',values[e['key']])),e['key']+' model mismatch'
def restore(parts):return ''.join(p['literal'] if 'literal' in p else values[p['ref']] for p in parts)
posts=json.loads((ROOT/'source-posts.json').read_text())['data'];out=[]
for p in posts:
 ref=manifest['refs'][p['id']]
 t={f:restore(ref[f]) for f in ['title','summary','category','content']};t['tags']=[restore(r) for r in ref['tags']]
 if locale=='zh-CN':t['content']=t['content'].replace('$725 in recurring battery expenses','$725 的重复购电池费用')
 assert t['content']!=p['content']
 for pattern in [r'\]\([^\n)]+\)',r'^#{1,6} ',r'^\|.*?$',r'\$\$[\s\S]*?\$\$']:
  if pattern==r'^\|.*?$':assert len(re.findall(pattern,t['content'],re.M))==len(re.findall(pattern,p['content'],re.M))
  else:assert re.findall(pattern,t['content'],re.M)==re.findall(pattern,p['content'],re.M)
 out.append({'id':p['id'],'source_md5':hashlib.md5(p['content'].encode()).hexdigest(),'translation':t})
(ROOT/(locale+'.json')).write_text(json.dumps(out,ensure_ascii=False,indent=2))
print(json.dumps({'locale':locale,'posts':len(out),'phrases':len(values),'models_numbers_links_tables_formulas':'verified'}))
