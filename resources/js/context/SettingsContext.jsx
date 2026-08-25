import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        shop_name: 'WinLion Agro',
        shop_phone: '+94 71 359 9229',
        shop_email: 'Winlionagro@gmail.com',
        shop_address: 'No 53/8, YSS Road, Thimbirigolla, Damana, Ampara.',
        delivery_charge: '350',
        free_delivery_above: '2000',
        bank_account_number: 'Bank: Commercial Bank\nBranch: Colombo\nAcc Name: Win Lion Agro\nAcc No: 1234567890'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/public/settings')
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setSettings(prev => ({...prev, ...res.data}));
                }
            })
            .catch(err => console.error('Error fetching settings:', err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
