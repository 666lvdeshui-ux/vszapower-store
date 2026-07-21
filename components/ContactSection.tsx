'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, ShieldCheck, X } from 'lucide-react';

interface ContactSectionProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  prefilledProduct?: string;
}

export default function ContactSection({ isOpenModal = false, onCloseModal, prefilledProduct = '' }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    product: prefilledProduct || 'General Inquiry / Bulk Order',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        if (onCloseModal) onCloseModal();
      }, 4000);
    } catch (err) {
      alert('提交异常，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const formContent = (
    <div style={{ color: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge badge-green" style={{ marginBottom: '12px' }}>
          DIRECT CONTACT & INQUIRY
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800 }}>
          联系我们 <span className="gradient-text">(Contact Us)</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
          Have questions about LIR rechargeable battery compatibility, bulk orders, or custom specs? Reach out directly!
        </p>
      </div>

      {submitted ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--accent-green)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
        }}>
          <CheckCircle2 size={48} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            咨询已成功提交！(Inquiry Sent)
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            系统已自动发送邮件通知至管理员邮箱（<code>666lvdeshui@gmail.com</code>），我们的团队将在24小时内联系您。
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isOpenModal ? '1fr' : '1fr 1fr',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Contact Details Card */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
              Direct Channels
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color="var(--accent-green)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Inquiries</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>sales@vszapower.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} color="var(--accent-cyan)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WhatsApp / Direct Call</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>+86 188 2032 8899</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(229, 169, 104, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} color="var(--kraft-gold)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Response Time</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>Within 2 Hours (Mon-Sat)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Your Name / 联系人</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe / 张先生"
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email or WhatsApp / 邮箱或微信</label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                placeholder="john@example.com / +86 138..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Product of Interest / 咨询产品</label>
              <input
                type="text"
                value={formData.product}
                onChange={e => setFormData({ ...formData, product: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Your Message / 需求说明</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us your questions, required quantity, or target device models..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', fontFamily: 'inherit' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Send size={18} /> 发送咨询 (Send Message)
            </button>
          </form>
        </div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          borderRadius: '24px',
          position: 'relative',
          background: 'rgba(10, 13, 20, 0.95)',
          border: '1px solid var(--border-color)',
        }}>
          {onCloseModal && (
            <button
              onClick={onCloseModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
          )}
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <section id="contact" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {formContent}
    </section>
  );
}
