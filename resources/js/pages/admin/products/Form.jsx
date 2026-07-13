import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';

const EMPTY = { name: '', sku: '', category_id: '', regular_price: '', sale_price: '', current_stock: '', unit_type: 'kg', status: 1, short_description: '', description: '', supplier_id: '' };

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    
    const [form, setForm] = useState(EMPTY);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [catRes, supRes] = await Promise.all([
                    axios.get('/api/categories'),
                    axios.get('/api/suppliers')
                ]);
                setCategories(catRes.data.data || catRes.data);
                setSuppliers(supRes.data.data || supRes.data);

                if (isEdit) {
                    const prodRes = await axios.get(`/api/products/${id}`);
                    setForm(prodRes.data);
                }
            } catch (err) {
                setError('Error loading form data');
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [id, isEdit]);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (isEdit) {
                await axios.put(`/api/products/${id}`, form);
            } else {
                await axios.post('/api/products', form);
            }
            navigate('/admin/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving product');
            setSaving(false);
        }
    };

    const inp = "w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm";
    const label = "block text-[13px] font-black text-gray-700 mb-2 uppercase tracking-wide";

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link to="/admin/products" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors mb-2">
                            <ArrowLeft size={16} /> Back to Products
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                            {isEdit ? 'Edit Product' : 'Add Product'}
                        </h1>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <form onSubmit={save} className="p-8 space-y-8">
                        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>}
                        
                        {loading ? (
                            <div className="h-40 flex items-center justify-center text-gray-400 font-bold">Loading...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={label}>Product Name <span className="text-red-500">*</span></label>
                                                <input required autoFocus value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inp} placeholder="e.g. Fresh Tomatoes" />
                                            </div>
                                            <div>
                                                <label className={label}>SKU <span className="text-red-500">*</span></label>
                                                <input required value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} className={inp} placeholder="e.g. TOM-001" />
                                            </div>
                                            <div>
                                                <label className={label}>Category <span className="text-red-500">*</span></label>
                                                <select required value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} className={inp}>
                                                    <option value="">Select Category</option>
                                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={label}>Supplier (Optional)</label>
                                                <select value={form.supplier_id || ''} onChange={e => setForm({...form, supplier_id: e.target.value})} className={inp}>
                                                    <option value="">Select Supplier</option>
                                                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={label}>Short Description</label>
                                            <textarea rows={2} value={form.short_description || ''} onChange={e => setForm({...form, short_description: e.target.value})} className={`${inp} resize-none`} placeholder="Brief summary for catalog view..." />
                                        </div>

                                        <div>
                                            <label className={label}>Full Description</label>
                                            <textarea rows={5} value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className={`${inp} resize-none`} placeholder="Detailed product description..." />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                            <h3 className="font-black text-gray-800 mb-4 border-b border-gray-200 pb-2">Pricing & Stock</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className={label}>Regular Price (Rs.) <span className="text-red-500">*</span></label>
                                                    <input required type="number" value={form.regular_price} onChange={e => setForm({...form, regular_price: e.target.value})} className={inp} />
                                                </div>
                                                <div>
                                                    <label className={label}>Sale Price (Rs.)</label>
                                                    <input type="number" value={form.sale_price || ''} onChange={e => setForm({...form, sale_price: e.target.value})} className={inp} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={label}>Stock Qty <span className="text-red-500">*</span></label>
                                                        <input required type="number" value={form.current_stock} onChange={e => setForm({...form, current_stock: e.target.value})} className={inp} />
                                                    </div>
                                                    <div>
                                                        <label className={label}>Unit</label>
                                                        <select value={form.unit_type} onChange={e => setForm({...form, unit_type: e.target.value})} className={inp}>
                                                            <option value="kg">kg</option>
                                                            <option value="g">g</option>
                                                            <option value="pcs">pcs</option>
                                                            <option value="pack">pack</option>
                                                            <option value="l">l</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={label}>Status</label>
                                                    <select value={form.status} onChange={e => setForm({...form, status: Number(e.target.value)})} className={inp}>
                                                        <option value={1}>Active</option>
                                                        <option value={0}>Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                                    <Link to="/admin/products" className="px-6 py-3 rounded-xl text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">Cancel</Link>
                                    <button type="submit" disabled={saving} className="px-8 py-3 rounded-xl text-white text-sm font-bold shadow-lg shadow-green-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}>
                                        <Save size={18} strokeWidth={2.5} /> {saving ? 'Saving...' : 'Save Product'}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
