/**
 * Cart Context
 * 
 * Gestiona el estado global del carrito de compras
 * Con fallback a localStorage si el backend no está disponible
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
  backendAvailable: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState(false);
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
      setBackendAvailable(true);
      localStorage.setItem('cart', JSON.stringify(transformedItems));
    } catch (err) {
      console.error('Error loading cart from backend:', err);
      setBackendAvailable(false);
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
      
      let transformedItems: CartItem[];

      if (backendAvailable) {
        try {
          const response = await apiPost<any>(
            API_ENDPOINTS.CART_ADD_ITEM(userId),
            {
              product_id: item.product_id,
              quantity: 1,
            }
          );
          
          transformedItems = response.items.map((i: any) => ({
            id: i.id.toString(),
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.image,
            product_id: i.product_id,
          }));
        } catch (backendErr) {
          console.warn('Backend failed, using localStorage:', backendErr);
          setBackendAvailable(false);
          // Fallback a localStorage
          transformedItems = [...items];
          const existingItem = transformedItems.find(i => i.product_id === item.product_id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            transformedItems.push({
              id: `local_${Date.now()}`,
              ...item,
              quantity: 1,
            });
          }
        }
      } else {
        // Usar localStorage directamente
        transformedItems = [...items];
        const existingItem = transformedItems.find(i => i.product_id === item.product_id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          transformedItems.push({
            id: `local_${Date.now()}`,
            ...item,
            quantity: 1,
          });
        }
      }
      
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
      
      let transformedItems: CartItem[];

      if (backendAvailable) {
        try {
          const response = await apiDelete<any>(
            API_ENDPOINTS.CART_REMOVE_ITEM(userId, parseInt(id))
          );
          
          transformedItems = response.items.map((i: any) => ({
            id: i.id.toString(),
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.image,
            product_id: i.product_id,
          }));
        } catch (backendErr) {
          console.warn('Backend failed, using localStorage:', backendErr);
          setBackendAvailable(false);
          transformedItems = items.filter(item => item.id !== id);
        }
      } else {
        transformedItems = items.filter(item => item.id !== id);
      }
      
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
      
      let transformedItems: CartItem[];

      if (backendAvailable) {
        try {
          const response = await apiPut<any>(
            API_ENDPOINTS.CART_UPDATE_ITEM(userId, parseInt(id)),
            { quantity }
          );
          
          transformedItems = response.items.map((i: any) => ({
            id: i.id.toString(),
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.image,
            product_id: i.product_id,
          }));
        } catch (backendErr) {
          console.warn('Backend failed, using localStorage:', backendErr);
          setBackendAvailable(false);
          transformedItems = items.map(item =>
            item.id === id ? { ...item, quantity } : item
          );
        }
      } else {
        transformedItems = items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
      }
      
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
      
      if (backendAvailable) {
        try {
          await apiDelete(API_ENDPOINTS.CART_CLEAR(userId));
        } catch (backendErr) {
          console.warn('Backend failed, using localStorage:', backendErr);
          setBackendAvailable(false);
        }
      }
      
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
        backendAvailable,
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
