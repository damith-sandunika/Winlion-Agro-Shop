import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import { Printer } from 'lucide-react';

const tabs = ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'];

const statusColors = {
    Pending:    'bg-yellow-100 text-yellow-700',
    Processing: 'bg-blue-100 text-blue-700',
    Shipped:    'bg-purple-100 text-purple-700',
    Delivered:  'bg-green-100 text-green-700',
    Cancelled:  'bg-red-100 text-red-700',
};

export default function AdminOrders() {
    const [activeTab, setActiveTab] = useState('All');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    const fetchOrders = useCallback(() => {
        setLoading(true);
        axios.get('/api/orders')
            .then(res => setOrders(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const updateStatus = async (orderId, field, value) => {
        setUpdating(orderId);
        try {
            await axios.put(`/api/orders/${orderId}`, { [field]: value });
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, [field]: value } : o));
        } catch (_) {}
        setUpdating(null);
    };

    const printInvoice = (order) => {
        const win = window.open('', '_blank');
        win.document.write(`
            <html>
            <head>
                <title>Invoice - ${order.invoice_number}</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; color: #333; }
                    .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                    .details { margin-bottom: 30px; display: flex; justify-content: space-between; }
                    table { w-full; width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
                    th { background: #f9f9f9; }
                    .total { text-align: right; font-size: 1.2em; font-weight: bold; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>WinLion Agro</h1>
                    <p>Official Invoice</p>
                </div>
                <div class="details">
                    <div>
                        <strong>Invoice:</strong> ${order.invoice_number}<br>
                        <strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}<br>
                        <strong>Payment Method:</strong> ${order.payment_method}
                    </div>
                    <div style="text-align: right;">
                        <strong>Customer:</strong> ${order.customer_name}<br>
                        <strong>WhatsApp:</strong> ${order.whatsapp_number}<br>
                        <strong>Address:</strong> ${order.delivery_address}
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(i => `
                            <tr>
                                <td>${i.product_name}</td>
                                <td>${i.quantity}</td>
                                <td>Rs. ${Number(i.unit_price).toLocaleString()}</td>
                                <td>Rs. ${Number(i.total_price).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="total">
                    Subtotal: Rs. ${Number(order.sub_total).toLocaleString()}<br>
                    Delivery: Rs. ${Number(order.delivery_charge).toLocaleString()}<br>
                    Grand Total: Rs. ${Number(order.grand_total).toLocaleString()}
                </div>
            </body>
            </html>
        `);
        win.document.close();
        win.setTimeout(() => {
            win.print();
        }, 500);
    };

    const filtered = activeTab === 'All' ? orders : orders.filter(o => o.delivery_status === activeTab);

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                <p className="text-gray-500 text-sm">Manage all customer orders</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                            activeTab === tab ? 'bg-green-600 text-white shadow-md shadow-green-300/50' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-600'
                        }`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Invoice</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Customer</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">WhatsApp</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Total</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Payment</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Delivery</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Date</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan="7" className="px-5 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-16 text-gray-400">No orders found for "{activeTab}"</td></tr>
                            ) : filtered.map(order => (
                                <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${updating === order.id ? 'opacity-60' : ''}`}>
                                    <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{order.invoice_number}</td>
                                    <td className="px-5 py-3.5 font-medium text-gray-800">{order.customer_name}</td>
                                    <td className="px-5 py-3.5 text-gray-600">{order.whatsapp_number}</td>
                                    <td className="px-5 py-3.5 font-bold text-green-600">Rs.{Number(order.grand_total).toLocaleString()}</td>
                                    <td className="px-5 py-3.5">
                                        <select
                                            value={order.payment_status || 'Pending'}
                                            onChange={e => updateStatus(order.id, 'payment_status', e.target.value)}
                                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-400 bg-white"
                                        >
                                            {['Pending', 'Paid', 'Failed', 'Refunded'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <select
                                            value={order.delivery_status || 'Pending'}
                                            onChange={e => updateStatus(order.id, 'delivery_status', e.target.value)}
                                            className={`text-xs border rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-400 font-semibold ${statusColors[order.delivery_status] || 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-500 text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-5 py-3.5">
                                        <button onClick={() => printInvoice(order)} className="p-1.5 bg-gray-100 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Print Invoice">
                                            <Printer size={16} />
                                        </button>
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
