import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from 'axios';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierIndex() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchAll = useCallback(() => {
        setLoading(true);
        axios.get('/api/suppliers')
            .then(res => setSuppliers(res.data.data || res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const destroy = async (id) => {
        if (!confirm('Are you sure you want to delete this supplier?')) return;
        try {
            await axios.delete(`/api/suppliers/${id}`);
            fetchAll();
        } catch (err) {
            alert('Cannot delete this supplier.');
        }
    };

    const filtered = suppliers.filter(s => 
        (s.name || '').toLowerCase().includes(search.toLowerCase()) || 
        (s.company || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Suppliers</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 font-medium">
                        <Link to="/admin" className="hover:text-green-600 transition-colors">Dashboard</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-green-600 font-bold">Suppliers</span>
                    </div>
                </div>
                <Link to="/admin/suppliers/create" className="px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg shadow-green-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 justify-center" style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}>
                    <Plus size={18} strokeWidth={3} /> Add Supplier
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in duration-700">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                            <Search size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search suppliers or company..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
                        />
                    </div>
                    <div className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                        Total: <span className="text-green-600">{filtered.length}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-white border-b border-gray-100">
                                <th className="text-left px-6 py-4 font-black text-gray-400 uppercase tracking-wider text-[10px]">Supplier</th>
                                <th className="text-left px-6 py-4 font-black text-gray-400 uppercase tracking-wider text-[10px]">Company</th>
                                <th className="text-left px-6 py-4 font-black text-gray-400 uppercase tracking-wider text-[10px]">Contact</th>
                                <th className="text-left px-6 py-4 font-black text-gray-400 uppercase tracking-wider text-[10px]">Products</th>
                                <th className="text-left px-6 py-4 font-black text-gray-400 uppercase tracking-wider text-[10px]">Status</th>
                                <th className="text-right px-6 py-4 font-black text-gray-400 uppercase tracking-wider text-[10px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i}><td colSpan="6" className="px-6 py-4"><div className="h-6 bg-gray-100 rounded-lg animate-pulse" /></td></tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-20 text-gray-400 font-medium">No suppliers found.</td></tr>
                            ) : filtered.map((s, idx) => (
                                <tr key={s.id} className="hover:bg-green-50/30 transition-colors group" style={{ animationDelay: `${idx * 50}ms` }}>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-base">{s.name}</td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{s.company || '—'}</td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{s.phone}</td>
                                    <td className="px-6 py-4 font-black text-green-600">{s.products_count || 0}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${s.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${s.status ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                            {s.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to={`/admin/suppliers/${s.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                                <Pencil size={18} />
                                            </Link>
                                            <button onClick={() => destroy(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
