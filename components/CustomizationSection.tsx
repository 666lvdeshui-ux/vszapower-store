'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Package, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  FileDown, 
  ArrowRight, 
  Sliders, 
  RefreshCw,
  Box,
  Tag,
  Award
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { sectionText } from '@/lib/sectionI18n';

interface CustomizationSectionProps {
  onContactClick: (productName?: string) => void;
}

export default function CustomizationSection({ onContactClick }: CustomizationSectionProps) {
  const { lang } = useLanguage();

  // Active Sub-tab state (laser / packaging / compliance)
  const [activeTab, setActiveTab] = useState<'laser' | 'packaging' | 'compliance'>('laser');

  // Customization Form Parameters
  const [brandText, setBrandText] = useState('VSZAPOWER');
  const [selectedModel, setSelectedModel] = useState('LIR2032 3.6V');
  const [batchCode, setBatchCode] = useState('2026.08 QC-01');
  const [finishStyle, setFinishStyle] = useState<'silver' | 'brushed' | 'titanium'>('silver');
  
  // Packaging Parameters
  const [packStyle, setPackStyle] = useState<'1pc' | '2pcs' | '5pcs' | 'tray'>('5pcs');
  const [hasFbaLabel, setHasFbaLabel] = useState(true);

  // MOQ Selector
  const [moqTier, setMoqTier] = useState('1000');

  // Reset parameters
  const handleReset = () => {
    setBrandText('VSZAPOWER');
    setSelectedModel('LIR2032 3.6V');
    setBatchCode('2026.08 QC-01');
    setFinishStyle('silver');
    setPackStyle('5pcs');
    setMoqTier('1000');
    setHasFbaLabel(true);
  };

  // Build spec summary string for inquiry form
  const getCustomSpecSummary = () => {
    const packLabels: Record<string, string> = {
      '1pc': '1-PC Single Card',
      '2pcs': '2-PCS Blister Card',
      '5pcs': '5-PCS Papercard Pack',
      'tray': '100-PCS Industrial Tray',
    };
    return [
      sectionText('OEM Customization Order', lang),
      `${sectionText('Model', lang)}: ${selectedModel}`,
      `${sectionText('Brand', lang)}: "${brandText}"`,
      `${sectionText('Batch Code', lang)}: "${batchCode}"`,
      `${sectionText('Packaging', lang)}: ${sectionText(packLabels[packStyle], lang)}`,
      `${sectionText('Minimum Order Quantity', lang)}: ${moqTier} ${sectionText('pieces', lang)}`,
      hasFbaLabel ? sectionText('FBA Barcode Needed', lang) : '',
    ].filter(Boolean).join(' | ');
  };

  const handleApplyQuote = () => {
    const specSummary = getCustomSpecSummary();
    onContactClick(specSummary);
  };

  return (
    <section 
      id="customization" 
      style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, var(--bg-main) 0%, rgba(0, 230, 153, 0.03) 50%, var(--bg-main) 100%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Tech Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 230, 153, 0.07) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(0, 230, 153, 0.1)',
            border: '1px solid rgba(0, 230, 153, 0.3)',
            color: 'var(--accent-green)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '16px'
          }}>
            <Sparkles size={16} />
            {sectionText('OEM / ODM Brand Customization Hub', lang)}
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: '1.25',
            marginBottom: '16px'
          }}>
            {sectionText('Customize Coin Cell Batteries & Blister Card Packaging', lang)}
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '780px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {sectionText(
              'Discuss branding, packaging and model-specific documentation for your rechargeable battery project.',
              lang
            )}
          </p>
        </div>

        {/* Customization Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('laser')}
            aria-pressed={activeTab === 'laser'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeTab === 'laser' ? 'var(--accent-green)' : 'var(--bg-card)',
              color: activeTab === 'laser' ? '#000' : 'var(--text-main)',
              border: activeTab === 'laser' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
              boxShadow: activeTab === 'laser' ? '0 6px 20px rgba(0, 230, 153, 0.35)' : 'none'
            }}
          >
            <Zap size={18} />
            {sectionText('1. Laser Engraving Simulator', lang)}
          </button>

          <button
            onClick={() => setActiveTab('packaging')}
            aria-pressed={activeTab === 'packaging'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeTab === 'packaging' ? 'var(--accent-green)' : 'var(--bg-card)',
              color: activeTab === 'packaging' ? '#000' : 'var(--text-main)',
              border: activeTab === 'packaging' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
              boxShadow: activeTab === 'packaging' ? '0 6px 20px rgba(0, 230, 153, 0.35)' : 'none'
            }}
          >
            <Package size={18} />
            {sectionText('2. Blister Card Packaging', lang)}
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            aria-pressed={activeTab === 'compliance'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeTab === 'compliance' ? 'var(--accent-green)' : 'var(--bg-card)',
              color: activeTab === 'compliance' ? '#000' : 'var(--text-main)',
              border: activeTab === 'compliance' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
              boxShadow: activeTab === 'compliance' ? '0 6px 20px rgba(0, 230, 153, 0.35)' : 'none'
            }}
          >
            <ShieldCheck size={18} />
            {sectionText('3. Compliance & Fast Sampling', lang)}
          </button>
        </div>

        {/* Tab 1: Laser Engraving Simulator */}
        {activeTab === 'laser' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            background: 'var(--bg-card)',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
          }}>
            {/* Control Form */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sliders size={20} color="var(--accent-green)" />
                  {sectionText('Custom Laser Engraving Parameters', lang)}
                </h3>

                <button 
                  onClick={handleReset}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={14} /> {sectionText('Reset', lang)}
                </button>
              </div>

              {/* Input 1: Brand / Logo Text */}
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="oem-brand" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {sectionText('Brand / Customer Logo Text', lang)}
                </label>
                <input
                  type="text"
                  value={brandText}
                  onChange={(e) => setBrandText(e.target.value.toUpperCase())}
                  maxLength={18}
                  id="oem-brand"
                  placeholder={sectionText('e.g. VSZAPOWER', lang)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '1px'
                  }}
                />
              </div>

              {/* Input 2: Battery Model Selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {sectionText('Coin Cell Battery Model', lang)}
                </label>
                <select
                  id="oem-model"
                  aria-label={sectionText('Coin Cell Battery Model', lang)}
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }}
                >
                  <option value="LIR2032 3.6V">{sectionText('LIR2032 (3.6V 45mAh Rechargeable)', lang)}</option>
                  <option value="LIR2450 3.6V">{sectionText('LIR2450 (3.6V 120mAh Rechargeable)', lang)}</option>
                  <option value="LIR2025 3.6V">{sectionText('LIR2025 (3.6V 30mAh Rechargeable)', lang)}</option>
                  <option value="ML2032 3.0V">{sectionText('ML2032 (3.0V 65mAh Rechargeable)', lang)}</option>
                  <option value="CR2032 3.0V">{sectionText('CR2032 (3.0V Primary Lithium)', lang)}</option>
                </select>
              </div>

              {/* Input 3: Date / QC Batch Code */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="oem-batch" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {sectionText('Batch / Date QC Engraving Code', lang)}
                </label>
                <input
                  type="text"
                  value={batchCode}
                  onChange={(e) => setBatchCode(e.target.value)}
                  maxLength={16}
                  id="oem-batch"
                  placeholder={sectionText('e.g. 2026.08 QC-01', lang)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Finish Metal Style */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {sectionText('Steel Surface Finish', lang)}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { id: 'silver', name: 'Polished Silver' },
                    { id: 'brushed', name: 'Brushed Steel' },
                    { id: 'titanium', name: 'Titanium Grey' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFinishStyle(style.id as any)}
                      aria-pressed={finishStyle === style.id}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: finishStyle === style.id ? 'rgba(0, 230, 153, 0.15)' : 'var(--bg-main)',
                        color: finishStyle === style.id ? 'var(--accent-green)' : 'var(--text-muted)',
                        border: finishStyle === style.id ? '1px solid var(--accent-green)' : '1px solid var(--border-color)'
                      }}
                    >
                      {sectionText(style.name, lang)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive SVG / Canvas Realistic Coin Cell Render */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(0,230,153,0.05) 0%, rgba(0,0,0,0.2) 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '0.82rem',
                color: 'var(--accent-green)',
                fontWeight: 700,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Zap size={15} /> {sectionText('REAL-TIME LASER ENGRAVING PREVIEW', lang)}
              </div>

              {/* Realistic SVG Render of Coin Cell Battery Top Face */}
              <svg width="260" height="260" viewBox="0 0 260 260" style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.35))' }}>
                <defs>
                  {/* Metallic Shimmer Gradient */}
                  <linearGradient id="metalGradSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5f7fa" />
                    <stop offset="25%" stopColor="#c3cfe2" />
                    <stop offset="50%" stopColor="#e2e8f0" />
                    <stop offset="75%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>

                  <linearGradient id="metalGradBrushed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>

                  <linearGradient id="metalGradTitanium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>

                  <radialGradient id="laserGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0, 230, 153, 0.4)" />
                    <stop offset="100%" stopColor="rgba(0, 230, 153, 0)" />
                  </radialGradient>

                  {/* Arc paths for laser text engraving */}
                  <path id="topArc" d="M 40,130 A 90,90 0 0,1 220,130" />
                  <path id="bottomArc" d="M 220,130 A 90,90 0 0,1 40,130" />
                </defs>

                {/* Outer Rim */}
                <circle cx="130" cy="130" r="120" fill="url(#metalGradSilver)" stroke="#475569" strokeWidth="4" />
                <circle 
                  cx="130" 
                  cy="130" 
                  r="114" 
                  fill={
                    finishStyle === 'silver' 
                      ? 'url(#metalGradSilver)' 
                      : finishStyle === 'brushed' 
                      ? 'url(#metalGradBrushed)' 
                      : 'url(#metalGradTitanium)'
                  } 
                  stroke="#64748b" 
                  strokeWidth="2" 
                />

                {/* Concentric Ridge Lines (Authentic Battery Top Surface) */}
                <circle cx="130" cy="130" r="102" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="130" cy="130" r="96" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                <circle cx="130" cy="130" r="65" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                {/* Positive Pole "+" Indicator */}
                <text x="130" y="65" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900" fontFamily="sans-serif">+</text>

                {/* Engraved Brand Name (Center Big Text) */}
                <text 
                  x="130" 
                  y="125" 
                  textAnchor="middle" 
                  fill="#0f172a" 
                  fontSize="19" 
                  fontWeight="900" 
                  fontFamily="Inter, Arial, sans-serif"
                  letterSpacing="2.5"
                  style={{ textShadow: '0.5px 0.5px 1px rgba(255,255,255,0.8)' }}
                >
                  {brandText || sectionText('Brand Logo', lang)}
                </text>

                {/* Battery Model Text (Middle Subtitle) */}
                <text 
                  x="130" 
                  y="150" 
                  textAnchor="middle" 
                  fill="#334155" 
                  fontSize="14" 
                  fontWeight="700" 
                  fontFamily="monospace"
                  letterSpacing="1"
                >
                  {selectedModel}
                </text>

                {/* QC / Date Batch Code (Bottom Curved Text) */}
                <text 
                  x="130" 
                  y="180" 
                  textAnchor="middle" 
                  fill="#475569" 
                  fontSize="11" 
                  fontWeight="600" 
                  fontFamily="monospace"
                >
                  {batchCode}
                </text>

                {/* Laser Engraving Shine Effect */}
                <circle cx="130" cy="130" r="114" fill="url(#laserGlow)" pointerEvents="none" />
              </svg>

              <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                ✓ {sectionText('High-precision Fiber Laser Marking', lang)}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Blister Card Packaging */}
        {activeTab === 'packaging' && (
          <div style={{
            background: 'var(--bg-card)',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={22} color="var(--accent-green)" />
              {sectionText('Blister Card & Retail Packaging Options', lang)}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {[
                { id: '1pc', title: '1-PC Single Card', desc: 'Premium retail single pack card for retail display' },
                { id: '2pcs', title: '2-PCS Blister Card', desc: 'Dual battery pack with tear-off hanging hole' },
                { id: '5pcs', title: '5-PCS Papercard Pack', desc: 'Wholesale value card (FOB +$1.00 USD adjustment)' },
                { id: 'tray', title: '100-PCS Industrial Tray', desc: 'Anti-static ESD bulk trays for SMT assembly lines' },
              ].map((pack) => (
                <div
                  key={pack.id}
                  role="button"
                  tabIndex={0}
                  aria-label={sectionText(pack.title, lang)}
                  aria-pressed={packStyle === pack.id}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setPackStyle(pack.id as any);
                    }
                  }}
                  onClick={() => setPackStyle(pack.id as any)}
                  style={{
                    padding: '24px 20px',
                    borderRadius: '16px',
                    background: packStyle === pack.id ? 'rgba(0, 230, 153, 0.08)' : 'var(--bg-main)',
                    border: packStyle === pack.id ? '2px solid var(--accent-green)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.25 ease',
                    position: 'relative'
                  }}
                >
                  {packStyle === pack.id && (
                    <CheckCircle2 
                      size={20} 
                      color="var(--accent-green)" 
                      style={{ position: 'absolute', top: '16px', right: '16px' }} 
                    />
                  )}
                  <Box size={28} color={packStyle === pack.id ? 'var(--accent-green)' : 'var(--text-muted)'} style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                    {sectionText(pack.title, lang)}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {sectionText(pack.desc, lang)}
                  </p>
                </div>
              ))}
            </div>

            {/* FBA Barcode Check & Download Template Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              borderRadius: '16px',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <input
                  type="checkbox"
                  checked={hasFbaLabel}
                  onChange={(e) => setHasFbaLabel(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)' }}
                />
                <Tag size={18} color="var(--accent-green)" />
                {sectionText('Free Amazon FBA EAN/UPC Barcode Labels on Boxes', lang)}
              </label>

              <button
                onClick={() => onContactClick(sectionText('Request Card Die-cut Vector Template (.AI/.PDF)', lang))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <FileDown size={16} />
                {sectionText('Request Card Die-cut Vector Template (.AI/.PDF)', lang)}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Compliance & Fast Sampling */}
        {activeTab === 'compliance' && (
          <div style={{
            background: 'var(--bg-card)',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={22} color="var(--accent-green)" />
              {sectionText('Export Compliance & Rapid Prototype Sampling', lang)}
            </h3>

            {/* Certifications Badges Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {[
                { name: 'Charger EMC reports', status: 'Identified models and tests' },
                { name: 'Charger RoHS reports', status: 'Tested sample materials' },
                { name: 'Battery documentation', status: 'Specify model and capacity' },
                { name: 'Destination market', status: 'Confirm project requirements' },
                { name: 'Design changes', status: 'Reassess report scope' },
                { name: 'Document requests', status: 'Use our Compliance Center' },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'var(--bg-main)',
                    border: '1px solid rgba(0, 230, 153, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} /> {sectionText(cert.name, lang)}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {sectionText(cert.status, lang)}
                  </div>
                </div>
              ))}
            </div>

            {/* Minimum Order Quantity (MOQ) Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
                {sectionText('Select Preferred OEM Order Tier', lang)}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                {[
                  { tier: '500', label: '500 Pcs (Trial Sampling)' },
                  { tier: '1000', label: '1,000 Pcs (Standard OEM)' },
                  { tier: '5000', label: '5,000 Pcs (Volume Discount)' },
                  { tier: '10000', label: '10,000+ Pcs (Tier-1 Factory)' },
                ].map((item) => (
                  <button
                    key={item.tier}
                    onClick={() => setMoqTier(item.tier)}
                    aria-pressed={moqTier === item.tier}
                    style={{
                      padding: '14px 12px',
                      borderRadius: '12px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: moqTier === item.tier ? 'var(--accent-green)' : 'var(--bg-main)',
                      color: moqTier === item.tier ? '#000' : 'var(--text-main)',
                      border: moqTier === item.tier ? '1px solid var(--accent-green)' : '1px solid var(--border-color)'
                    }}
                  >
                    {sectionText(item.label, lang)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={18} />
              {sectionText('7-Day Lead Time for Custom Branding and Sample Shipment', lang)}
            </div>
          </div>
        )}

        {/* Bottom CTA Action Card */}
        <div style={{
          marginTop: '40px',
          padding: '24px 32px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(0, 230, 153, 0.12) 0%, rgba(0,0,0,0.6) 100%)',
          border: '1px solid rgba(0, 230, 153, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--accent-green)', fontWeight: 800, letterSpacing: '1px', marginBottom: '4px' }}>
              {sectionText('Selected Custom Configuration Summary', lang)}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              {sectionText('Model', lang)}: <span style={{ color: 'var(--accent-green)' }}>{selectedModel}</span> | {sectionText('Brand', lang)}: <span style={{ color: 'var(--accent-green)' }}>"{brandText}"</span> | {sectionText('Minimum Order Quantity', lang)}: <span style={{ color: 'var(--accent-green)' }}>{moqTier} {sectionText('pieces', lang)}</span>
            </div>
          </div>

          <button
            onClick={handleApplyQuote}
            className="btn-primary"
            style={{
              padding: '14px 28px',
              fontSize: '1rem',
              borderRadius: '30px',
              boxShadow: '0 8px 25px rgba(0, 230, 153, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {sectionText('Request a Free Custom Mockup & FOB Quote', lang)}
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
