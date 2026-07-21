'use client';

import React, { useState } from 'react';
import { MOCK_COMPATIBILITY } from '@/lib/supabase';
import { Cpu, Zap, Info, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import Link from 'next/link';

export default function BatteryMatcher() {
  const [selectedModel, setSelectedModel] = useState('CR2032');

  const currentMatch = MOCK_COMPATIBILITY.find(
    (item) => item.standard_model === selectedModel
  ) || MOCK_COMPATIBILITY[0];

  return (
    <section id="matcher" style={{
      padding: '80px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-green" style={{ marginBottom: '12px' }}>
          VISUAL COMPATIBILITY MATCH TOOL
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
        }}>
          Not sure which model to buy? <br />
          <span className="gradient-text">Look at what’s printed on your battery!</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 0' }}>
          Click your current disposable button battery model below to see the exact rechargeable equivalent, safe voltage parameters, and device support.
        </p>
      </div>

      {/* Model Selector Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '40px',
      }}>
        {MOCK_COMPATIBILITY.map((item) => {
          const isActive = item.standard_model === selectedModel;
          return (
            <button
              key={item.standard_model}
              onClick={() => setSelectedModel(item.standard_model)}
              style={{
                background: isActive ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#041410' : 'var(--text-main)',
                border: isActive ? 'none' : '1px solid var(--border-color)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '12px 24px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? 'var(--accent-glow)' : 'none',
              }}
            >
              {item.standard_model}
            </button>
          );
        })}
      </div>

      {/* Match Result Display Card */}
      <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
        }} className="matcher-grid">

          {/* Left Side: Battery Spec Breakdown */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Disposable:</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 10px', borderRadius: '6px', fontWeight: 700 }}>
                {currentMatch.standard_model}
              </span>
              <ArrowRight size={18} color="var(--accent-green)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>Rechargeable:</span>
              <span style={{ background: 'var(--accent-green)', color: '#041410', padding: '2px 10px', borderRadius: '6px', fontWeight: 800 }}>
                {currentMatch.rechargeable_model}
              </span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              fontWeight: 800,
              marginBottom: '16px',
            }}>
              Rechargeable Match: <span className="gradient-text">{currentMatch.rechargeable_model}</span>
            </h3>

            {/* Spec Matrix */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Operating Voltage</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-green)' }}>{currentMatch.voltage}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cell Capacity</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{currentMatch.capacity}</div>
              </div>
            </div>

            {/* Safety & Voltage Notes */}
            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              borderLeft: '4px solid var(--accent-cyan)',
              padding: '16px',
              borderRadius: '0 10px 10px 0',
              marginBottom: '24px',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '4px' }}>
                <Info size={16} /> Voltage Compatibility Guard
              </div>
              {currentMatch.notes}
            </div>

            <Link href="/#starter-kit" className="btn-primary">
              <Zap size={18} /> Buy {currentMatch.rechargeable_model} Charger Kit
            </Link>
          </div>

          {/* Right Side: Common Compatible Devices Grid */}
          <div style={{
            background: 'rgba(10, 13, 20, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-color)',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Cpu size={18} color="var(--accent-green)" />
              Tested Compatible Devices for {currentMatch.standard_model}
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentMatch.common_devices.map((device, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.95rem',
                }}>
                  <ShieldCheck size={18} color="var(--accent-green)" />
                  {device}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.matcher-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
