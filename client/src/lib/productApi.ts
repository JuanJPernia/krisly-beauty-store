/**
 * Product API
 * 
 * Funciones para obtener productos desde el backend
 */

import { API_ENDPOINTS, apiGet } from './api';

export interface Product {
  id: string;
  name: string;
  category: 'Maquillaje' | 'Cuidado Personal' | 'Herramientas';
  price: number;
  image: string;
  description: string;
  stock: number;
  rating?: number;
  reviews?: number;
  sales_count?: number;
  is_featured?: boolean;
  created_at?: string;
}

/**
 * Obtener todos los productos desde el backend
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiGet<any>(API_ENDPOINTS.PRODUCTS);
    
    // Transformar datos del backend al formato del frontend
    return response.map((item: any) => ({
      id: String(item.id),
      name: item.name,
      category: item.category || 'Maquillaje',
      price: item.price,
      image: item.image,
      description: item.description,
      stock: item.stock,
      rating: item.rating || 4.9,
      reviews: 0,
      sales_count: item.sales_count || 0,
      is_featured: item.is_featured || false,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Retornar array vacío si hay error
    return [];
  }
}

/**
 * Obtener un producto por ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await apiGet<any>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    
    return {
      id: String(response.id),
      name: response.name,
      category: response.category || 'Maquillaje',
      price: response.price,
      image: response.image,
      description: response.description,
      stock: response.stock,
      rating: response.rating || 4.9,
      reviews: 0,
      sales_count: response.sales_count || 0,
      is_featured: response.is_featured || false,
      created_at: response.created_at,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Obtener productos por categoría
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const allProducts = await getProducts();
    return allProducts.filter(product => product.category === category);
  } catch (error) {
    console.error('Error filtering products:', error);
    return [];
  }
}

/**
 * Obtener productos destacados según criterio
 * @param criteria - 'featured' | 'rating' | 'sales'
 * @param limit - Número máximo de productos a retornar
 */
export async function getFeaturedProducts(
  criteria: 'featured' | 'rating' | 'sales' = 'featured',
  limit: number = 6
): Promise<Product[]> {
  try {
    const response = await apiGet<any>(
      `${API_ENDPOINTS.PRODUCTS}/featured/by-criteria?criteria=${criteria}&limit=${limit}`
    );
    
    // Transformar datos del backend al formato del frontend
    return response.map((item: any) => ({
      id: String(item.id),
      name: item.name,
      category: item.category || 'Maquillaje',
      price: item.price,
      image: item.image,
      description: item.description,
      stock: item.stock,
      rating: item.rating || 4.9,
      reviews: 0,
      sales_count: item.sales_count || 0,
      is_featured: item.is_featured || false,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Si falla, retornar los primeros 6 productos normales
    const allProducts = await getProducts();
    return allProducts.slice(0, limit);
  }
}
