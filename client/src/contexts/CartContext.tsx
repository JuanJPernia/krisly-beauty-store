/**
 * Cart Context
 * 
 * Gestiona el estado global del carrito de compras
 * Ahora conectado con el backend FastAPI
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS, apiGet, apiPost, apiPut, apiDelete, getUserId } from '@/lib/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  product_id?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity' | 'id'> & { product_id: number }) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = getUserId();

  // Cargar carrito del backend al montar el componente
  useEffect(() => {
    loadCartFromBackend();
  }, []);

  const loadCartFromBackend = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiGet<any>(API_ENDPOINTS.CART(userId));
      
      // Transformar datos del backend al formato del frontend
      const transformedItems = response.items.map((item: any) => ({
        id: item.id.toString(),
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        product_id: item.product_id,
      }));
      
      setItems(transformedItems);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Error al cargar el carrito');
      // Si hay error, cargar desde localStorage como fallback
      loadCartFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading cart from localStorage:', err);
    }
  };

  const addItem = async (item: Omit<CartItem, 'quantity' | 'id'> & { product_id: number }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiPost<any>(
        API_ENDPOINTS.CART_ADD_ITEM(userId),
        {
          product_id: item.product_id,
          quantity: 1,
        }
      );
      
      // Actualizar estado local
      const transformedItems = response.items.map((i: any) => ({
        id: i.id.toString(),
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
        product_id: i.product_id,
      }));
      
      setItems(transformedItems);
      localStorage.setItem('cart', JSON.stringify(transformedItems));
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Error al agregar producto al carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiDelete<any>(
        API_ENDPOINTS.CART_REMOVE_ITEM(userId, parseInt(id))
      );
      
      // Actualizar estado local
      const transformedItems = response.items.map((i: any) => ({
        id: i.id.toString(),
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
        product_id: i.product_id,
      }));
      
      setItems(transformedItems);
      localStorage.setItem('cart', JSON.stringify(transformedItems));
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Error al eliminar producto del carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      
      if (quantity <= 0) {
        await removeItem(id);
        return;
      }
      
      const response = await apiPut<any>(
        API_ENDPOINTS.CART_UPDATE_ITEM(userId, parseInt(id)),
        { quantity }
      );
      
      // Actualizar estado local
      const transformedItems = response.items.map((i: any) => ({
        id: i.id.toString(),
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
        product_id: i.product_id,
      }));
      
      setItems(transformedItems);
      localStorage.setItem('cart', JSON.stringify(transformedItems));
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Error al actualizar cantidad');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await apiDelete(API_ENDPOINTS.CART_CLEAR(userId));
      
      setItems([]);
      localStorage.removeItem('cart');
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Error al vaciar el carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
