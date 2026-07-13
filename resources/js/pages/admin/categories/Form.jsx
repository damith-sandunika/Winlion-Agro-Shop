import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const EMPTY = { name: '', description: '', status: 1 };

export default function CategoryForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            axios.get(`/api/categories/${id}`)
                .then(res => setForm(res.data))
                .catch(() => setError('Category not found'))
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (isEdit) {
                await axios.put(`/api/categories/${id}`, form);
            } else {
                await axios.post('/api/categories', form);
            }
            navigate('/admin/categories');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving category');
            setSaving(false);
        }
    };

    const inp = "w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm";
    const label = "block text-[13px] font-black text-gray-700 mb-2 uppercase tracking-wide";

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link to="/admin/categories" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors mb-2">
                            <ArrowLeft size={16} /> Back to Categories
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                            {isEdit ? 'Edit Category' : 'Create Category'}
                        </h1>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <form onSubmit={save} className="p-8 space-y-6">
                        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>}
                        
                        {loading ? (
                            <div className="h-40 flex items-center justify-center text-gray-400 font-bold">Loading...</div>
                        ) : (
                            <>
                                <div>
                                    <label className={label}>Category Name <span className="text-red-500">*</span></label>
                                    <input 
                                        required 
                                        autoFocus
                                        value={form.name} 
                                        onChange={e => setForm({...form, name: e.target.value})} 
                                        className={inp} 
                                        placeholder="e.g. Vegetables"
                                    />
                                </div>
                                
                                <div>
                                    <label className={label}>Description</label>
                                    <textarea 
                                        rows={4} 
                                        value={form.description || ''} 
                                        onChange={e => setForm({...form, description: e.target.value})} 
                                        className={`${inp} resize-none`} 
                                        placeholder="Optional details about this category..."
                                    />
                                </div>

                                <div>
                                    <label className={label}>Status</label>
                                    <select 
                                        value={form.status} 
                                        onChange={e => setForm({...form, status: Number(e.target.value)})} 
                                        className={inp}
                                    >
                                        <option value={1}>Active (Visible to customers)</option>
                                        <option value={0}>Inactive (Hidden)</option>
                                    </select>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                                    <Link to="/admin/categories" className="px-6 py-3 rounded-xl text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={saving} 
                                        className="px-8 py-3 rounded-xl text-white text-sm font-bold shadow-lg shadow-green-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100" 
                                        style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}
                                    >
                                        <Save size={18} strokeWidth={2.5} /> {saving ? 'Saving...' : 'Save Category'}
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
