/**
 * Productos del Catálogo
 * 
 * Base de datos de productos para la tienda de belleza de Krisly Ramirez
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

export const products: Product[] = [
  // Maquillaje
  {
    id: 'makeup-001',
    name: 'Paleta de Sombras Premium Rose Gold',
    category: 'Maquillaje',
    price: 45.99,
    originalPrice: 54.99,
    image: '/images/featured-products.jpg',
    description: 'Paleta de sombras de 12 colores con tonos rose gold y neutros. Textura suave y pigmentación intensa.',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    tags: ['sombras', 'rose-gold', 'paleta'],
  },
  {
    id: 'makeup-002',
    name: 'Labial Mate Larga Duración',
    category: 'Maquillaje',
    price: 28.99,
    originalPrice: 34.99,
    image: '/images/featured-products.jpg',
    description: 'Labial mate con fórmula de larga duración. 24 colores disponibles. Acabado impecable todo el día.',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    tags: ['labial', 'mate', 'larga-duración'],
  },
  {
    id: 'makeup-003',
    name: 'Base de Maquillaje Full Coverage',
    category: 'Maquillaje',
    price: 38.50,
    originalPrice: 45.00,
    image: '/images/featured-products.jpg',
    description: 'Base de cobertura completa con acabado natural. Resistente al agua y larga duración.',
    rating: 4.7,
    reviews: 178,
    inStock: true,
    tags: ['base', 'full-coverage', 'resistente-agua'],
  },
  {
    id: 'makeup-004',
    name: 'Delineador Líquido Precision',
    category: 'Maquillaje',
    price: 22.99,
    originalPrice: 28.00,
    image: '/images/featured-products.jpg',
    description: 'Delineador líquido con punta ultra fina. Fórmula resistente al agua y de larga duración.',
    rating: 4.8,
    reviews: 142,
    inStock: true,
    tags: ['delineador', 'líquido', 'precision'],
  },
  {
    id: 'makeup-005',
    name: 'Máscara de Pestañas Volumen Extremo',
    category: 'Maquillaje',
    price: 32.99,
    originalPrice: 39.99,
    image: '/images/featured-products.jpg',
    description: 'Máscara que proporciona volumen extremo y separación. Fórmula enriquecida con vitaminas.',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    tags: ['máscara', 'volumen', 'pestañas'],
  },
  {
    id: 'makeup-006',
    name: 'Rubor en Polvo Luminoso',
    category: 'Maquillaje',
    price: 26.99,
    originalPrice: 32.00,
    image: '/images/featured-products.jpg',
    description: 'Rubor en polvo con acabado luminoso. 8 tonos disponibles. Textura suave y fácil de aplicar.',
    rating: 4.7,
    reviews: 124,
    inStock: true,
    tags: ['rubor', 'polvo', 'luminoso'],
  },

  // Cuidado Personal
  {
    id: 'skincare-001',
    name: 'Sérum Facial Hidratante Luxury',
    category: 'Cuidado Personal',
    price: 52.00,
    originalPrice: 62.00,
    image: '/images/skincare-collection.jpg',
    description: 'Sérum facial con ácido hialurónico y vitamina E. Hidratación profunda y duradera.',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    tags: ['sérum', 'hidratante', 'vitamina-e'],
  },
  {
    id: 'skincare-002',
    name: 'Crema Facial Antienvejecimiento',
    category: 'Cuidado Personal',
    price: 65.00,
    originalPrice: 78.00,
    image: '/images/skincare-collection.jpg',
    description: 'Crema antienvejecimiento con retinol y péptidos. Reduce líneas de expresión y arrugas.',
    rating: 4.8,
    reviews: 142,
    inStock: true,
    tags: ['crema', 'antienvejecimiento', 'retinol'],
  },
  {
    id: 'skincare-003',
    name: 'Limpiador Facial Suave',
    category: 'Cuidado Personal',
    price: 24.99,
    originalPrice: 29.99,
    image: '/images/skincare-collection.jpg',
    description: 'Limpiador facial suave que respeta el pH natural de la piel. Apto para todo tipo de piel.',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    tags: ['limpiador', 'suave', 'facial'],
  },
  {
    id: 'skincare-004',
    name: 'Mascarilla Facial Purificante',
    category: 'Cuidado Personal',
    price: 38.99,
    originalPrice: 46.00,
    image: '/images/skincare-collection.jpg',
    description: 'Mascarilla purificante con carbón activado. Limpia profundamente los poros.',
    rating: 4.6,
    reviews: 98,
    inStock: true,
    tags: ['mascarilla', 'purificante', 'carbón'],
  },
  {
    id: 'skincare-005',
    name: 'Tónico Equilibrante',
    category: 'Cuidado Personal',
    price: 28.50,
    originalPrice: 34.00,
    image: '/images/skincare-collection.jpg',
    description: 'Tónico equilibrante que prepara la piel para los tratamientos posteriores.',
    rating: 4.7,
    reviews: 112,
    inStock: true,
    tags: ['tónico', 'equilibrante', 'preparador'],
  },
  {
    id: 'skincare-006',
    name: 'Contorno de Ojos Revitalizante',
    category: 'Cuidado Personal',
    price: 42.99,
    originalPrice: 51.00,
    image: '/images/skincare-collection.jpg',
    description: 'Contorno de ojos que reduce ojeras y bolsas. Fórmula delicada para el área sensible.',
    rating: 4.8,
    reviews: 134,
    inStock: true,
    tags: ['contorno-ojos', 'revitalizante', 'ojeras'],
  },

  // Herramientas
  {
    id: 'tools-001',
    name: 'Set de Brochas de Maquillaje Premium',
    category: 'Herramientas',
    price: 68.50,
    originalPrice: 82.00,
    image: '/images/makeup-brushes.jpg',
    description: 'Set de 12 brochas de maquillaje con cerdas sintéticas de alta calidad. Estuche incluido.',
    rating: 4.7,
    reviews: 124,
    inStock: true,
    tags: ['brochas', 'set', 'maquillaje'],
  },
  {
    id: 'tools-002',
    name: 'Esponja de Maquillaje Beauty Blender',
    category: 'Herramientas',
    price: 18.99,
    originalPrice: 22.00,
    image: '/images/makeup-brushes.jpg',
    description: 'Esponja de maquillaje suave y esponjosa. Perfecta para aplicar base y corrector.',
    rating: 4.8,
    reviews: 267,
    inStock: true,
    tags: ['esponja', 'beauty-blender', 'aplicador'],
  },
  {
    id: 'tools-003',
    name: 'Rizador de Pestañas Profesional',
    category: 'Herramientas',
    price: 32.99,
    originalPrice: 39.99,
    image: '/images/makeup-brushes.jpg',
    description: 'Rizador de pestañas profesional con almohadillas de silicona. Rizado perfecto sin dañar.',
    rating: 4.9,
    reviews: 189,
    inStock: true,
    tags: ['rizador', 'pestañas', 'profesional'],
  },
  {
    id: 'tools-004',
    name: 'Espejo de Maquillaje LED',
    category: 'Herramientas',
    price: 55.99,
    originalPrice: 69.99,
    image: '/images/makeup-brushes.jpg',
    description: 'Espejo de maquillaje con luz LED ajustable. Aumentos 1x y 10x. Alimentación USB.',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    tags: ['espejo', 'led', 'maquillaje'],
  },
  {
    id: 'tools-005',
    name: 'Pinzas de Precisión para Cejas',
    category: 'Herramientas',
    price: 16.99,
    originalPrice: 20.00,
    image: '/images/makeup-brushes.jpg',
    description: 'Pinzas de precisión de acero inoxidable. Perfectas para depilar cejas con exactitud.',
    rating: 4.7,
    reviews: 98,
    inStock: true,
    tags: ['pinzas', 'cejas', 'precisión'],
  },
  {
    id: 'tools-006',
    name: 'Organizador de Maquillaje Premium',
    category: 'Herramientas',
    price: 44.99,
    originalPrice: 54.00,
    image: '/images/makeup-brushes.jpg',
    description: 'Organizador de maquillaje con múltiples compartimentos. Acrílico de alta calidad.',
    rating: 4.6,
    reviews: 112,
    inStock: true,
    tags: ['organizador', 'almacenamiento', 'acrílico'],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.includes(lowerQuery))
  );
}
