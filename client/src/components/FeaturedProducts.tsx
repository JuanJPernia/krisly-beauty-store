/**
 * Featured Products Section
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Grid flexible de productos
 * - Espacios amplios entre elementos
 * - Tipografía elegante con jerarquía clara
 * - Transiciones suaves en scroll
 * - Carga dinámica desde base de datos
 * - Selector de criterio para mostrar productos destacados
 */

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getFeaturedProducts, Product } from '@/lib/productApi';

type FeaturedCriteria = 'featured' | 'rating' | 'sales';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState<FeaturedCriteria>('featured');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const featuredProducts = await getFeaturedProducts(criteria, 6);
      setProducts(featuredProducts);
      setLoading(false);
    };

    loadProducts();
  }, [criteria]);

  const handleViewAll = () => {
    window.location.href = '/products';
  };

  const getCriteriaLabel = (crit: FeaturedCriteria): string => {
    switch (crit) {
      case 'featured':
        return 'Destacados';
      case 'rating':
        return 'Mejor Calificación';
      case 'sales':
        return 'Más Vendidos';
      default:
        return 'Destacados';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
            Nuestros Favoritos
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Selección cuidada de los mejores productos de belleza y cuidado personal, elegidos por Krisly Ramirez para garantizar calidad y resultados excepcionales.
          </p>
        </div>

        {/* Criteria Selector */}
        <div className="mb-12 flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom duration-700">
          <button
            onClick={() => setCriteria('featured')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              criteria === 'featured'
                ? 'bg-pink-400 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-pink-200 hover:border-pink-400'
            }`}
          >
            {getCriteriaLabel('featured')}
          </button>
          <button
            onClick={() => setCriteria('rating')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              criteria === 'rating'
                ? 'bg-pink-400 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-pink-200 hover:border-pink-400'
            }`}
          >
            {getCriteriaLabel('rating')}
          </button>
          <button
            onClick={() => setCriteria('sales')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              criteria === 'sales'
                ? 'bg-pink-400 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-pink-200 hover:border-pink-400'
            }`}
          >
            {getCriteriaLabel('sales')}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay productos disponibles con este criterio.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={handleViewAll}
            className="px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Ver Todos los Productos
          </button>
        </div>
      </div>
    </section>
  );
}
