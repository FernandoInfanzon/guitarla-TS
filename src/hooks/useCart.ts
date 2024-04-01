import { useEffect, useState, useMemo } from 'react';
import {db} from '../data/db.ts';
import type { Guitar, CartItem } from '../types';


export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addCart = (item : Guitar)  => {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if(itemExist !== -1) {
            increaseQuantity(item.id);
        } else {
            const newItem : CartItem = {...item, quantity: 1}
            setCart( (prevCart) => [...prevCart, newItem]);
        }
    }

    function removeCart(id:Guitar['id']) {
        const updatedCart = cart.filter(guitar => guitar.id !== id);
        setCart(updatedCart);
    }

    function increaseQuantity(id:Guitar['id']) {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(guitar => guitar.id === id);
        if (updatedCart[itemIndex].quantity < MAX_ITEMS) {
            updatedCart[itemIndex].quantity++;
        }
        setCart(updatedCart);
    }

    function decreaseQuantity(id:Guitar['id']) {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(guitar => guitar.id === id);
        if(updatedCart[itemIndex].quantity > MIN_ITEMS) {
            updatedCart[itemIndex].quantity--;
            setCart(updatedCart);
        } else {
            removeCart(id);
        }
    }

    function clearCart(){
        setCart([]);
    }

    const isEmpty = useMemo( () => {
        return cart.length === 0
    }, [cart]);

    const cartTotal = useMemo( () => {
       return cart.reduce(
        (total, item) => total + (item.quantity * item.price), 0)
    }, [cart]);


    return {
        data,
        cart,
        addCart,
        removeCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    };
}
 