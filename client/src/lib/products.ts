/**
 * Productos del Catálogo
 * 
 * DEPRECATED: Los productos ahora se cargan desde la base de datos SQLite del backend.
 * Este archivo se mantiene por compatibilidad pero está vacío.
 * 
 * Usar productApi.ts para obtener productos:
 * - getProducts() - Obtener todos los productos
 * - getProductById(id) - Obtener un producto por ID
 * - getProductsByCategory(category) - Obtener productos por categoría
 */

export interface Product {
  id: string;
  name: string;
  category: 'Maquillaje' | 'Cuidado Personal' | 'Herramientas';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
}

export const products: Product[] = [];

export function getProductById(id: string): Product | undefined {
  return undefined;
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return [];
}

export function searchProducts(query: string): Product[] {
  return [];
}
