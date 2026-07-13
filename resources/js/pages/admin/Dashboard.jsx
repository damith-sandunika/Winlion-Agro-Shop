import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import { DollarSign, ShoppingCart, Users, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin User' };

    useEffect(() => {
        axios.get('/api/dashboard')
            .then(res => setStats(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    // Mock data for chart until API provides it
    const chartData = [
        { name: 'Feb 2026', gross: 4000, net: 2400 },
        { name: 'Mar 2026', gross: 3000, net: 1398 },
        { name: 'Apr 2026', gross: 2000, net: 9800 },
        { name: 'May 2026', gross: 2780, net: 3908 },
        { name: 'Jun 2026', gross: 1890, net: 4800 },
        { name: 'Jul 2026', gross: 2390, net: 3800 },
    ];

    if (loading) return <AdminLayout><div className="flex h-full items-center justify-center text-gray-500 font-bold">Loading dashboard...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-[1600px] mx-auto">
                {/* Welcome Banner */}
                <div className="bg-white rounded-2xl p-8 mb-8 relative overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex justify-between items-center">
                    <div className="relative z-10">
                        <p className="text-[11px] font-black text-gray-400 tracking-[0.2em] uppercase mb-1">Good Morning</p>
                        <h1 className="text-3xl font-black text-gray-800 tracking-tight">{user.name}</h1>
                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mt-2">ADMIN - FINANCIAL DASHBOARD</p>
                    </div>
                    {/* Decorative shapes resembling the Education Center UI */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none">
                        <div className="absolute right-[-10%] top-[-50%] w-64 h-64 bg-green-50 rotate-45 opacity-70"></div>
                        <div className="absolute right-[10%] top-[-10%] w-48 h-48 bg-[#116A34]/5 rotate-45"></div>
                        <div className="absolute right-[30%] top-[20%] w-32 h-32 bg-blue-50 rotate-45 opacity-50"></div>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white shadow-xl rounded-xl flex items-center justify-center rotate-12">
                            <span className="text-[#116A34] font-black text-2xl -rotate-12">{user.name.charAt(0)}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-l-blue-500 border border-gray-100 flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                            <DollarSign size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-800">Rs. {Number(stats?.totalRevenue || 0).toLocaleString()}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">Total Revenue</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-l-purple-500 border border-gray-100 flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                            <ShoppingCart size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-800">{stats?.totalOrders || 0}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">Total Orders</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-l-red-500 border border-gray-100 flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                            <Users size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-800">{stats?.totalCustomers || 0}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">Total Customers</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-l-[#116A34] border border-gray-100 flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-[#116A34] flex items-center justify-center mb-4">
                            <TrendingUp size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-800">Rs. {Number((stats?.totalRevenue || 0) * 0.7).toLocaleString()}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">Net Profit (Est)</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area: Chart and Side panels */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left: Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                                    <TrendingUp size={16} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm">Revenue & Profit Trend</h3>
                            </div>
                            <span className="text-xs font-bold text-gray-400">Last 6 Months</span>
                        </div>
                        
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                    <Line type="monotone" dataKey="gross" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Gross Revenue" />
                                    <Line type="monotone" dataKey="net" stroke="#116A34" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} name="Net Profit" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-[10px] font-bold text-gray-500">Gross Revenue (Rs.)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#116A34]"></span>
                                <span className="text-[10px] font-bold text-gray-500">Net Profit (Rs.)</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Operations & Recent */}
                    <div className="space-y-6">
                        
                        {/* Active Operations */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                                    <Calendar size={16} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm">Active Operations</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                            <ShoppingCart size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">Pending Orders</span>
                                    </div>
                                    <span className="text-lg font-black text-indigo-600">{stats?.pendingOrders || 0}</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                                            <AlertCircle size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">Low Stock Items</span>
                                    </div>
                                    <span className="text-lg font-black text-orange-600">{stats?.lowStock || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Alerts */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center">
                                    <DollarSign size={16} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm">Recent Activity</h3>
                            </div>
                            <div className="py-8 text-center">
                                <p className="text-xs font-medium text-gray-400">System is running smoothly.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
