'use client';

import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, Clock, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ContactSectionProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  prefilledProduct?: string;
}

export default function ContactSection({ isOpenModal = false, onCloseModal, prefilledProduct = '' }: ContactSectionProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
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
      const senderEmail = (formData.contact && formData.contact.includes('@')) ? formData.contact : '666lvdeshui@gmail.com';
      fetch('https://formsubmit.co/ajax/666lvdeshui@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `【VSZAPOWER 网站新询价】来自 ${formData.name} 的产品咨询`,
          _captcha: 'false',
          _template: 'table',
          email: senderEmail,
          _replyto: senderEmail,
          '客户姓名 Name': formData.name,
          '所属国家 Country': formData.country || '未填写 (Not Specified)',
          '联系方式 Contact': formData.contact,
          '意向产品 Product': formData.product,
          '留言内容 Message': formData.message,
          '提交时间 Time': new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
        }),
      }).catch(err => console.warn('Browser FormSubmit email dispatch error:', err));

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
          DIRECT CONTACT &amp; INQUIRY
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800 }}>
          {t('contact_title')}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
          {t('contact_subtitle')}
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
            {t('contact_success')}
          </h3>
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
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>666lvdeshui@gmail.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} color="var(--accent-cyan)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WhatsApp / Direct Call</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>+8618879620636</div>
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
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{t('contact_name')}</label>
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
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{t('contact_country')}</label>
              <input
                type="text"
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. United States / 中国 / Germany"
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{t('contact_email')}</label>
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
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{t('contact_product')}</label>
              <input
                type="text"
                value={formData.product}
                onChange={e => setFormData({ ...formData, product: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{t('contact_message')}</label>
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
              <Send size={18} /> {t('btn_send_inquiry')}
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
