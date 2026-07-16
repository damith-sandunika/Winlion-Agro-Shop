import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

export default function AdminSettings() {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [waStatus, setWaStatus] = useState('INITIALIZING');
    const [waQr, setWaQr] = useState(null);
    const [activeTab, setActiveTab] = useState('General');

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('http://localhost:3005/status')
                .then(res => {
                    setWaStatus(res.data.status);
                    setWaQr(res.data.qr);
                }).catch(() => setWaStatus('DISCONNECTED'));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchSettings = useCallback(() => {
        axios.get('/api/settings')
            .then(res => setSettings(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { fetchSettings(); }, [fetchSettings]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            await axios.post('/api/settings', settings);
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error saving settings.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const inp = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-sm';
    
    // Helper to render whatsapp template preview
    const WAMessageBox = ({ label, settingKey, tags }) => (
        <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-black text-green-900">{label}</label>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md shadow-green-500/30">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.384 0 12.03c0 2.128.553 4.195 1.604 6.01L.226 23.367l5.474-1.436c1.745.96 3.714 1.467 5.727 1.467 6.643 0 12.029-5.385 12.029-12.031C23.456 5.384 18.072 0 12.031 0zm.002 21.464c-1.802 0-3.568-.485-5.116-1.403l-.367-.217-3.805.998.983-3.712-.238-.378a9.928 9.928 0 01-1.52-5.32c0-5.502 4.478-9.98 9.98-9.98s9.98 4.478 9.98 9.98-4.477 9.98-9.98 9.98zm5.48-7.464c-.3-.15-1.776-.877-2.052-.978-.276-.1-.477-.15-.678.15-.2.3-.778.977-.954 1.177-.176.2-.352.226-.653.076-.301-.15-1.267-.467-2.414-1.492-.892-.797-1.496-1.782-1.672-2.083-.176-.302-.019-.465.132-.615.136-.136.301-.352.452-.527.151-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.631-.929-2.233-.245-.588-.495-.508-.678-.518-.176-.008-.377-.01-.578-.01-.2 0-.527.076-.803.377-.276.301-1.055 1.03-1.055 2.511 0 1.481 1.079 2.913 1.23 3.113.151.201 2.122 3.238 5.139 4.538.718.31 1.278.495 1.716.634.721.23 1.378.197 1.895.12.576-.086 1.776-.727 2.027-1.431.251-.703.251-1.306.176-1.431-.076-.126-.276-.201-.578-.352z"/></svg>
                </div>
            </div>
            <textarea 
                rows={6} 
                value={settings[settingKey] || ''} 
                onChange={e => handleChange(settingKey, e.target.value)} 
                className="w-full bg-white px-4 py-3 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl rounded-tl-sm border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none flex-1 shadow-sm leading-relaxed" 
            />
            {tags && <p className="text-[10px] font-bold text-green-700/60 mt-3">{tags}</p>}
        </div>
    );

    if (loading) return <AdminLayout><div className="p-6 text-gray-500">Loading settings...</div></AdminLayout>;

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-4 sm:mb-6 bg-white rounded-md p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none opacity-60">
                    <div className="w-24 h-24 bg-blue-50 rotate-45 translate-x-12 rounded-lg"></div>
                    <div className="w-36 h-36 bg-blue-100 rotate-45 translate-x-6 -ml-8 rounded-xl"></div>
                    <div className="w-48 h-48 bg-blue-200 rotate-45 -ml-12 rounded-2xl"></div>
                    <div className="w-32 h-32 bg-blue-300 rotate-45 -ml-16 rounded-lg"></div>
                </div>
                <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Settings</h2>
                    <p className="text-slate-400 text-[9px] sm:text-[11px] font-medium uppercase tracking-widest mt-1">Configure your store</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="relative z-10 bg-[#1933C6] hover:bg-[#090087] text-white px-5 py-2.5 rounded-md text-[11px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2 justify-center w-full sm:w-auto">
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            {message && <div className={`mb-6 px-4 py-3 rounded-md text-sm font-medium shadow-sm ${message.includes('Error') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>{message}</div>}

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 flex overflow-x-auto custom-scrollbar">
                {['General', 'Delivery & Payment', 'WhatsApp'].map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                            activeTab === tab 
                            ? 'border-[#1933C6] text-[#1933C6]' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                
                {activeTab === 'General' && (
                    <div className="space-y-5 animate-in fade-in duration-300">
                        <h3 className="font-black text-gray-800 text-lg mb-2 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">🏢</span>
                            Shop Information
                        </h3>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Shop Name</label>
                            <input value={settings.shop_name || ''} onChange={e => handleChange('shop_name', e.target.value)} className={inp} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                                <input value={settings.shop_email || ''} onChange={e => handleChange('shop_email', e.target.value)} className={inp} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                                <input value={settings.shop_phone || ''} onChange={e => handleChange('shop_phone', e.target.value)} className={inp} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Physical Address</label>
                            <textarea rows={3} value={settings.shop_address || ''} onChange={e => handleChange('shop_address', e.target.value)} className={`${inp} resize-none`} />
                        </div>
                    </div>
                )}

                {activeTab === 'Delivery & Payment' && (
                    <div className="space-y-5 animate-in fade-in duration-300">
                        <h3 className="font-black text-gray-800 text-lg mb-2 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">🚚</span>
                            Delivery Settings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Delivery Charge (Rs.)</label>
                                <input type="number" value={settings.delivery_charge || ''} onChange={e => handleChange('delivery_charge', e.target.value)} className={inp} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Free Delivery Above (Rs.)</label>
                                <input type="number" value={settings.free_delivery_above || ''} onChange={e => handleChange('free_delivery_above', e.target.value)} className={inp} />
                            </div>
                        </div>
                        <h3 className="font-black text-gray-800 text-lg mb-2 mt-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">💳</span>
                            Payment Details
                        </h3>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Bank Account (For Transfers)</label>
                            <textarea rows={4} placeholder="Bank: Commercial Bank&#10;Branch: Colombo&#10;Acc No: 123456" value={settings.bank_account_number || ''} onChange={e => handleChange('bank_account_number', e.target.value)} className={`${inp} resize-none`} />
                        </div>
                    </div>
                )}

                {activeTab === 'WhatsApp' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                            <div>
                                <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">💬</span>
                                    WhatsApp Integration
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Configure automated messaging for your store.</p>
                            </div>
                            <span className={`text-xs px-4 py-1.5 rounded-full font-black shadow-sm flex items-center gap-2 ${
                                waStatus === 'READY' || waStatus === 'AUTHENTICATED' ? 'bg-green-100 text-green-700 border border-green-200' :
                                waStatus === 'QR_READY' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                                <span className={`w-2 h-2 rounded-full ${waStatus === 'READY' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                {waStatus === 'READY' ? 'Connected' : waStatus.replace('_', ' ')}
                            </span>
                        </div>
                        
                        {waStatus === 'QR_READY' && waQr && (
                            <div className="flex flex-col items-center bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-300">
                                <h4 className="font-bold text-gray-800 mb-2">Connect Your WhatsApp</h4>
                                <p className="text-sm text-gray-500 mb-6 text-center max-w-sm">Open WhatsApp on your phone, go to Linked Devices, and scan this QR code.</p>
                                <img src={waQr} alt="WhatsApp QR Code" className="w-64 h-64 border-8 border-white shadow-xl rounded-2xl" />
                            </div>
                        )}
                        
                        {waStatus === 'READY' && (
                            <div className="flex justify-between items-center bg-green-50 p-5 rounded-2xl border border-green-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-200 text-green-700 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-900 font-black">WhatsApp is Connected</p>
                                        <p className="text-xs text-green-700 font-medium">Automatic messages will be sent to customers.</p>
                                    </div>
                                </div>
                                <button onClick={() => axios.post('http://localhost:3005/logout')} className="text-xs bg-white border border-green-200 px-4 py-2 rounded-xl text-green-700 hover:bg-green-100 font-bold shadow-sm transition-colors">Disconnect</button>
                            </div>
                        )}

                        <div className="max-w-md">
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Admin WhatsApp Number</label>
                            <input value={settings.whatsapp_number || ''} onChange={e => handleChange('whatsapp_number', e.target.value)} className={inp} placeholder="e.g. 0771234567" />
                            <p className="text-[11px] text-gray-400 font-medium mt-1">Receive admin alerts on this number (Optional).</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-4">Message Templates</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <WAMessageBox 
                                    label="Order Placed" 
                                    settingKey="wa_order_template" 
                                    tags="Tags: {{customer_name}}, {{invoice}}, {{total}}, {{address}}" 
                                />
                                <WAMessageBox 
                                    label="Order Confirmed" 
                                    settingKey="wa_confirm_template" 
                                />
                                <WAMessageBox 
                                    label="Order Delivered" 
                                    settingKey="wa_delivery_template" 
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
