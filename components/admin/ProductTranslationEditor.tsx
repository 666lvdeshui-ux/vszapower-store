'use client';

import { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { normalizeProductTranslations, ProductTranslation } from '@/lib/productI18n';

interface Props {
  value?: Record<string, ProductTranslation>;
  specs?: Record<string, string>;
  onChange: (value: Record<string, ProductTranslation>) => void;
}

export default function ProductTranslationEditor({ value, specs, onChange }: Props) {
  const [locale, setLocale] = useState('zh-CN');
  const translations = normalizeProductTranslations(value);
  const selected = translations[locale] || {};
  const update = (patch: ProductTranslation) => onChange({ ...translations, [locale]: { ...selected, ...patch } });
  const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', fontFamily: 'inherit' };
  const fields = { title: '商品标题', tagline: '商品简介', description: '详情正文', category: '分类名称', badge: '商品角标' } as const;
  return (
    <fieldset style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', display: 'grid', gap: '12px' }}>
      <legend>多语言商品内容</legend>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>请填写完整译文。切换网站语言时会显示对应内容；留空的字段使用原文。原文修改后，请同步检查各语言译文。</p>
      <label>
        编辑语言
        <select value={locale} onChange={e => setLocale(e.target.value)} style={inputStyle}>
          {SUPPORTED_LANGUAGES.map(language => <option key={language.code} value={language.code}>{language.nativeName}{translations[language.code]?.description?.trim() ? ' ✓' : ''}</option>)}
        </select>
      </label>
      {Object.entries(fields).map(([key, label]) => {
        const field = key as keyof typeof fields;
        return <label key={field}>{label}
          <textarea rows={field === 'description' ? 7 : 2} value={selected[field] || ''} onChange={e => update({ [field]: e.target.value })} style={inputStyle} />
        </label>;
      })}
      {Object.entries(specs || {}).map(([key, original]) => <label key={key}>
        参数：{key} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>（原文：{original}）</span>
        <input value={selected.specs?.[key] || ''} onChange={e => update({ specs: { ...selected.specs, [key]: e.target.value } })} style={inputStyle} />
      </label>)}
    </fieldset>
  );
}
