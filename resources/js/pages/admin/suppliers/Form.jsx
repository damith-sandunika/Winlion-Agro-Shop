import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const EMPTY = { name: '', company: '', phone: '', whatsapp_number: '', email: '', address: '', city: '', notes: '', status: 1 };

export default function SupplierForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            axios.get(`/api/suppliers/${id}`)
                .then(res => setForm(res.data))
                .catch(() => setError('Supplier not found'))
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (isEdit) {
                await axios.put(`/api/suppliers/${id}`, form);
            } else {
                await axios.post('/api/suppliers', form);
            }
            navigate('/admin/suppliers');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving supplier');
            setSaving(false);
        }
    };

    const inp = "w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm";
    const label = "block text-[13px] font-black text-gray-700 mb-2 uppercase tracking-wide";

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link to="/admin/suppliers" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors mb-2">
                            <ArrowLeft size={16} /> Back to Suppliers
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                            {isEdit ? 'Edit Supplier' : 'Add Supplier'}
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={label}>Supplier Name <span className="text-red-500">*</span></label>
                                        <input required autoFocus value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inp} placeholder="Full Name" />
                                    </div>
                                    <div>
                                        <label className={label}>Company</label>
                                        <input value={form.company || ''} onChange={e => setForm({...form, company: e.target.value})} className={inp} placeholder="Company Name" />
                                    </div>
                                    <div>
                                        <label className={label}>Phone Number <span className="text-red-500">*</span></label>
                                        <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inp} placeholder="07XXXXXXXX" />
                                    </div>
                                    <div>
                                        <label className={label}>WhatsApp Number</label>
                                        <input value={form.whatsapp_number || ''} onChange={e => setForm({...form, whatsapp_number: e.target.value})} className={inp} placeholder="Optional" />
                                    </div>
                                    <div>
                                        <label className={label}>Email Address</label>
                                        <input type="email" value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})} className={inp} placeholder="supplier@example.com" />
                                    </div>
                                    <div>
                                        <label className={label}>City</label>
                                        <input value={form.city || ''} onChange={e => setForm({...form, city: e.target.value})} className={inp} placeholder="e.g. Colombo" />
                                    </div>
                                </div>

                                <div>
                                    <label className={label}>Full Address</label>
                                    <textarea rows={2} value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} className={`${inp} resize-none`} />
                                </div>

                                <div>
                                    <label className={label}>Status</label>
                                    <select value={form.status} onChange={e => setForm({...form, status: Number(e.target.value)})} className={inp}>
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                                    <Link to="/admin/suppliers" className="px-6 py-3 rounded-xl text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">Cancel</Link>
                                    <button type="submit" disabled={saving} className="px-8 py-3 rounded-xl text-white text-sm font-bold shadow-lg shadow-green-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}>
                                        <Save size={18} strokeWidth={2.5} /> {saving ? 'Saving...' : 'Save Supplier'}
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
