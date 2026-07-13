import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const tabs = ['All Customers', 'WhatsApp Verified', 'New'];

export default function AdminCustomers() {
    const [activeTab, setActiveTab] = useState('All Customers');

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                <p className="text-gray-500 text-sm">View and manage customer accounts</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                            activeTab === tab
                                ? 'bg-green-600 text-white shadow-md shadow-green-300/50'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Customer</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">WhatsApp</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Total Orders</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Total Spent</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan="5" className="text-center py-16 text-gray-400">No customers found</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
