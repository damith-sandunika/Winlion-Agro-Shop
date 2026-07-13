import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(i => i.id !== productId));
    };

    const updateQty = (productId, quantity) => {
        if (quantity < 1) { removeFromCart(productId); return; }
        setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
    };

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(i => i.id === product.id);
            return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
        });
    };

    const isWishlisted = (productId) => wishlist.some(i => i.id === productId);

    const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, wishlist, cartCount, cartTotal, addToCart, removeFromCart, updateQty, toggleWishlist, isWishlisted }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
