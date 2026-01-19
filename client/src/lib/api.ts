/**
 * API Configuration
 * Configuración para comunicarse con el backend FastAPI
 */

// URL base del backend
// En desarrollo: Vite proxy redirige /api a localhost:8000
// En producción: usa la URL de Render
const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://krisly-beauty-store.onrender.com'
  : '';

export const API_ENDPOINTS = {
  // Productos
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT: (id: number) => `${API_BASE_URL}/api/products/${id}`,
  
  // Carrito
  CART: (userId: string) => `${API_BASE_URL}/api/cart/${userId}`,
  CART_ADD_ITEM: (userId: string) => `${API_BASE_URL}/api/cart/${userId}/items`,
  CART_UPDATE_ITEM: (userId: string, itemId: number) => `${API_BASE_URL}/api/cart/${userId}/items/${itemId}`,
  CART_REMOVE_ITEM: (userId: string, itemId: number) => `${API_BASE_URL}/api/cart/${userId}/items/${itemId}`,
  CART_CLEAR: (userId: string) => `${API_BASE_URL}/api/cart/${userId}/clear`,
};

/**
 * Headers comunes para todas las peticiones
 */
const commonHeaders = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': '69420',
  'User-Agent': 'Mozilla/5.0',
};

/**
 * Función para hacer peticiones GET
 */
export async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: commonHeaders,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Función para hacer peticiones POST
 */
export async function apiPost<T>(url: string, data: any): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Función para hacer peticiones PUT
 */
export async function apiPut<T>(url: string, data: any): Promise<T> {
  const response = await fetch(url, {
    method: 'PUT',
    headers: commonHeaders,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Función para hacer peticiones DELETE
 */
export async function apiDelete<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: commonHeaders,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Generar o obtener un ID único para el usuario
 */
export function getUserId(): string {
  if (typeof window === 'undefined') {
    return 'server-user';
  }
  
  let userId = localStorage.getItem('userId');
  
  if (!userId) {
    // Generar un ID único si no existe
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  
  return userId;
}
