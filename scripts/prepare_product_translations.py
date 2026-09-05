"""Extract public product copy and stable spec keys for the translation backfill."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'content/products/translations'
source = json.loads(Path('/private/tmp/vszapower-products-before.json').read_text())['data']
fields = ['title', 'tagline', 'description', 'category', 'badge', 'specs']
copy = [{ 'id': p['id'], **{k: p.get(k) for k in fields}} for p in source]
(ROOT / 'source.json').write_text(json.dumps(copy, ensure_ascii=False, indent=2) + '\n')
ui = {
 'catalog': 'VSZAPOWER Product Catalog', 'loading': 'Loading product catalog...',
 'empty': 'No products in this category. Please select another category.',
 'product': 'Product', 'chargerKit': 'Charger Kit', 'reviews': 'Verified Reviews',
 'moq': 'Minimum order: 100 pieces', 'wholesaleOem': 'Wholesale & OEM Quote',
 'techSpecs': 'Technical Specifications', 'quote': 'Request Wholesale Quote',
 'close': 'Close product details', 'zoom': 'View full-size image',
 'previous': 'Previous image', 'next': 'Next image', 'oem': 'OEM / ODM Custom Branding Available',
 'overview': 'Product Overview & Details', 'noDescription': 'Contact us for detailed product information.',
 'noSpecs': 'Contact us for product specifications.', 'certifications': 'Qualifications & Certifications',
 'certificationHelp': 'Contact us for the available product certification documents.',
 'input_power': 'Input Power', 'output_power': 'Output Power', 'voltage': 'Input / Output Voltage',
 'supported': 'Supported Battery Models', 'safety': 'Safety Protections', 'packaging': 'Packaging',
 'warranty': 'Warranty & Service', 'charging_speed': 'Charging Time', 'battery_model': 'Battery Model',
 'dimensions': 'Dimensions', 'chemistry': 'Electrochemical System',
 'replaces_disposable': 'Corresponding Disposable Models', 'recharge_cycles': 'Recharge Cycle Life',
 'certificationSpec': 'Certifications',
}
entries, refs, by_source = [], {}, {}
def ref(text):
 text = str(text or '')
 if text not in by_source:
  key = 'VSZPROD' + str(len(entries)).zfill(4)
  by_source[text] = key
  entries.append({'key': key, 'source': text})
 return by_source[text]
for p in copy:
 refs[p['id']] = {k: [ref(line) for line in (p[k] or '').split('\n')] for k in fields if k != 'specs'}
 refs[p['id']]['specs'] = {k: ref(v) for k, v in (p['specs'] or {}).items()}
ui_refs = {k: ref(v) for k, v in ui.items()}
manifest = {'entries': entries, 'refs': refs, 'ui': ui_refs}
(ROOT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(len(entries), 'phrases,', sum(len(e['source']) for e in entries), 'characters')
print(json.dumps(entries, ensure_ascii=False, separators=(',', ':')))
