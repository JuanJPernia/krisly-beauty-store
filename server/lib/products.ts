/**
 * Product Prices Mapping
 * 
 * Mapeo de IDs de productos locales a precios de Stripe
 * IMPORTANTE: Estos son precios de PRUEBA. Debes crear los productos en Stripe
 * y reemplazar estos IDs con los IDs reales de Stripe.
 */

export interface ProductPrice {
  priceId: string;
  name: string;
  amount: number; // Precio en centavos (ej: 4599 = $45.99)
}

export const productPrices: Record<string, ProductPrice> = {
  // Maquillaje
  'makeup-001': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg0', // Reemplazar con ID real de Stripe
    name: 'Paleta de Sombras Premium Rose Gold',
    amount: 4599,
  },
  'makeup-002': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg1',
    name: 'Labial Mate Larga Duración',
    amount: 2899,
  },
  'makeup-003': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg2',
    name: 'Base de Maquillaje Full Coverage',
    amount: 3850,
  },
  'makeup-004': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg3',
    name: 'Delineador Líquido Precision',
    amount: 2299,
  },
  'makeup-005': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg4',
    name: 'Máscara de Pestañas Volumen Extremo',
    amount: 3299,
  },
  'makeup-006': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg5',
    name: 'Rubor en Polvo Luminoso',
    amount: 2699,
  },

  // Cuidado Personal
  'skincare-001': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg6',
    name: 'Sérum Facial Hidratante Luxury',
    amount: 5200,
  },
  'skincare-002': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg7',
    name: 'Crema Facial Antienvejecimiento',
    amount: 6500,
  },
  'skincare-003': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg8',
    name: 'Limpiador Facial Suave',
    amount: 2499,
  },
  'skincare-004': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg9',
    name: 'Mascarilla Facial Purificante',
    amount: 3899,
  },
  'skincare-005': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgA',
    name: 'Tónico Equilibrante',
    amount: 2850,
  },
  'skincare-006': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgB',
    name: 'Contorno de Ojos Revitalizante',
    amount: 4299,
  },

  // Herramientas
  'tools-001': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgC',
    name: 'Set de Brochas de Maquillaje Premium',
    amount: 6850,
  },
  'tools-002': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgD',
    name: 'Esponja de Maquillaje Beauty Blender',
    amount: 1899,
  },
  'tools-003': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgE',
    name: 'Rizador de Pestañas Profesional',
    amount: 3299,
  },
  'tools-004': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgF',
    name: 'Espejo de Maquillaje LED',
    amount: 5599,
  },
  'tools-005': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgG',
    name: 'Pinzas de Precisión para Cejas',
    amount: 1699,
  },
  'tools-006': {
    priceId: 'price_1QvYzKH68NclpcQ1aBcDeFgH',
    name: 'Organizador de Maquillaje Premium',
    amount: 4499,
  },
};

export function getProductPrice(productId: string): ProductPrice | null {
  return productPrices[productId] || null;
}

export function getAllProducts(): Record<string, ProductPrice> {
  return productPrices;
}
