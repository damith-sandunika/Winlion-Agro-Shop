import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import { Download } from 'lucide-react';

export default function AdminReports() {
    const [sales, setSales] = useState(null);
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(() => {
        setLoading(true);
        Promise.all([
            axios.get('/api/reports/sales'),
            axios.get('/api/reports/stock')
        ]).then(([rSales, rStock]) => {
            setSales(rSales.data);
            setStock(rStock.data);
        }).catch(() => {}).finally(() => setLoading(false));
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    if (loading) return <AdminLayout><div className="p-6 text-gray-500">Loading reports...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
                    <p className="text-gray-500 text-sm">Sales and Inventory Analytics</p>
                </div>
                <button className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md shadow-green-300/50 hover:opacity-90 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}>
                    <Download size={16} /> Export PDF
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 border-b pb-4 mb-4">Sales Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-xl">
                            <p className="text-sm text-green-700 font-semibold mb-1">Total Revenue</p>
                            <h4 className="text-2xl font-black text-gray-800">Rs.{Number(sales?.totalRevenue || 0).toLocaleString()}</h4>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-blue-700 font-semibold mb-1">Total Orders</p>
                            <h4 className="text-2xl font-black text-gray-800">{sales?.totalOrders || 0}</h4>
                        </div>
                    </div>
                </div>

                {/* Top Selling Products */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 border-b pb-4 mb-4">Top Selling Products</h3>
                    <div className="space-y-3">
                        {sales?.topProducts?.length > 0 ? sales.topProducts.map((p, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium">{p.product_name}</span>
                                <div className="text-right">
                                    <span className="block font-bold text-gray-800">{p.total_sold} units</span>
                                    <span className="text-xs text-brand-green">Rs.{Number(p.revenue).toLocaleString()}</span>
                                </div>
                            </div>
                        )) : <p className="text-gray-400 text-sm">No sales data yet.</p>}
                    </div>
                </div>

                {/* Low Stock & Expiring */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
                    <h3 className="font-bold text-gray-800 border-b pb-4 mb-4">Inventory Alerts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2">⚠️ Low Stock Alerts</h4>
                            {stock?.lowStock?.length > 0 ? (
                                <ul className="space-y-2">
                                    {stock.lowStock.map(p => (
                                        <li key={p.id} className="flex justify-between text-sm p-2 bg-red-50 rounded-lg">
                                            <span className="text-gray-700">{p.name}</span>
                                            <span className="font-bold text-red-600">{p.current_stock} left</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-xs text-gray-500">All stock levels are healthy.</p>}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-orange-600 mb-3 flex items-center gap-2">⏳ Expiring Soon (30 Days)</h4>
                            {stock?.expiring?.length > 0 ? (
                                <ul className="space-y-2">
                                    {stock.expiring.map(p => (
                                        <li key={p.id} className="flex justify-between text-sm p-2 bg-orange-50 rounded-lg">
                                            <span className="text-gray-700">{p.name}</span>
                                            <span className="font-bold text-orange-600">{new Date(p.expiry_date).toLocaleDateString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-xs text-gray-500">No products expiring soon.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
