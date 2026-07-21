'use client';

import React, { useState, useEffect } from 'react';
import { ProductItem } from '@/lib/store';
import { Plus, Edit2, Trash2, Package, Tag, DollarSign, Image as ImageIcon, Sparkles, Check, AlertCircle, Shield } from 'lucide-react';

export default function ProductManager() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct({
      id: '',
      title: '',
      slug: '',
      tagline: '',
      price: 24.99,
      compare_at_price: 39.99,
      is_starter_kit: false,
      image_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW ARRIVAL',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete product:', e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaveStatus('Saving...');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      const json = await res.json();
      if (json.success) {
        setSaveStatus('Saved successfully!');
        setTimeout(() => setSaveStatus(null), 2000);
        setIsModalOpen(false);
        loadProducts();
      } else {
        setSaveStatus(`Error: ${json.error}`);
      }
    } catch (e) {
      setSaveStatus('Failed to save product');
    }
  };

  return (
    <div style={{ color: '#fff' }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            Product Catalog Management
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Add, update prices, modify descriptions & managed starter kits for VSZAPOWER store.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-primary"
          style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Product List Grid */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading products...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {products.map(product => (
            <div key={product.id} className="glass-panel" style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              {product.badge && (
                <span className="badge badge-green" style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '0.7rem' }}>
                  {product.badge}
                </span>
              )}

              <div>
                <div style={{
                  height: '160px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: '#0d121c',
                  border: '1px solid var(--border-color)'
                }}>
                  <img
                    src={product.image_url}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3 }}>
                  {product.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  {product.tagline}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    ${product.price}
                  </span>
                  {product.compare_at_price && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                      ${product.compare_at_price}
                    </span>
                  )}
                  {product.is_starter_kit && (
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem', marginLeft: 'auto' }}>
                      STARTER KIT
                    </span>
                  )}
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '10px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)'
              }}>
                <button
                  onClick={() => handleOpenEdit(product)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && editingProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            borderRadius: '16px',
            position: 'relative',
            background: 'rgba(10, 13, 20, 0.95)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  placeholder="e.g. LIR2032 Fast USB Charger Kit"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Tagline / Short Subtitle</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  placeholder="e.g. Stop throwing away disposable button batteries."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>MSRP / Compare At ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.compare_at_price || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, compare_at_price: parseFloat(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    产品分类 (Product Category)
                  </label>
                  <select
                    value={editingProduct.category || '纽扣电池充电器'}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#121826',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                    }}
                  >
                    <option value="纽扣电池充电器">🔌 纽扣电池充电器 (Coin Cell Chargers)</option>
                    <option value="可充电纽扣电池">🔋 可充电纽扣电池 (Rechargeable Coin Cells)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Badge Label</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    placeholder="e.g. BEST SELLER / SAVE 37%"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.is_starter_kit)}
                    onChange={e => setEditingProduct({ ...editingProduct, is_starter_kit: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)' }}
                  />
                  Flag as Main Starter Kit Bundle
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  产品主封面图片 URL (Main Cover Image URL)
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.image_url || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  产品相册/主图轮播图片列表 (Gallery Images - 每行一个图片 URL)
                </label>
                <textarea
                  rows={3}
                  value={Array.isArray(editingProduct.images) ? editingProduct.images.join('\n') : (editingProduct.image_url || '')}
                  onChange={e => {
                    const lines = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
                    setEditingProduct({
                      ...editingProduct,
                      images: lines,
                      image_url: lines[0] || editingProduct.image_url || '',
                    });
                  }}
                  placeholder="https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              {/* Certifications Manager Section */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={16} /> 产品资质与质量认证管理 (Certifications)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const currentCerts = Array.isArray(editingProduct.certifications) ? [...editingProduct.certifications] : [];
                      currentCerts.push({ name: 'CE 欧盟安全认证', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' });
                      setEditingProduct({ ...editingProduct, certifications: currentCerts });
                    }}
                    className="btn-secondary"
                    style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={14} /> 添加资质
                  </button>
                </div>

                {(!editingProduct.certifications || editingProduct.certifications.length === 0) ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', padding: '10px' }}>
                    暂无配置资质证书，点击“添加资质”按钮新增（如 CE/FCC/RoHS/UN38.3 等）
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {editingProduct.certifications.map((cert, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="资质名称 (例: CE 欧盟安全认证)"
                          value={cert.name}
                          onChange={e => {
                            const newCerts = [...editingProduct.certifications!];
                            newCerts[idx].name = e.target.value;
                            setEditingProduct({ ...editingProduct, certifications: newCerts });
                          }}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-color)',
                            color: '#fff',
                            fontSize: '0.85rem',
                          }}
                        />
                        <input
                          type="url"
                          placeholder="证书图片 URL"
                          value={cert.image_url}
                          onChange={e => {
                            const newCerts = [...editingProduct.certifications!];
                            newCerts[idx].image_url = e.target.value;
                            setEditingProduct({ ...editingProduct, certifications: newCerts });
                          }}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-color)',
                            color: '#fff',
                            fontSize: '0.85rem',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newCerts = editingProduct.certifications!.filter((_, i) => i !== idx);
                            setEditingProduct({ ...editingProduct, certifications: newCerts });
                          }}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444',
                            borderRadius: '6px',
                            padding: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Description</label>
                <textarea
                  rows={4}
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Detailed product specifications, packaging details, warranty..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {saveStatus && (
                <div style={{ color: saveStatus.includes('Error') ? '#ef4444' : 'var(--accent-green)', fontSize: '0.85rem' }}>
                  {saveStatus}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 20px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 24px' }}
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
