/**
 * Categories Section
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Categorías con imágenes de fondo
 * - Texto elegante y legible
 * - Transiciones suaves al hover
 * - Espacios amplios
 * - Carga dinámica desde base de datos
 */

import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/productApi';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const allProducts = await getProducts();
      
      // Agrupar productos por categoría y contar
      const categoryMap = new Map<string, { count: number; image: string }>();
      
      // Imágenes por defecto para cada categoría
      const categoryImages: Record<string, string> = {
        'Maquillaje': '/images/featured-products.jpg',
        'Cuidado Personal': '/images/skincare-collection.jpg',
        'Herramientas': '/images/makeup-brushes.jpg',
      };

      const categoryDescriptions: Record<string, string> = {
        'Maquillaje': 'Colección completa de maquillaje premium',
        'Cuidado Personal': 'Productos de skincare y cuidado corporal',
        'Herramientas': 'Brochas y accesorios de maquillaje',
      };

      // Contar productos por categoría
      allProducts.forEach((product: Product) => {
        const category = product.category || 'Maquillaje';
        if (!categoryMap.has(category)) {
          categoryMap.set(category, {
            count: 0,
            image: categoryImages[category] || '/images/featured-products.jpg',
          });
        }
        const current = categoryMap.get(category)!;
        current.count += 1;
      });

      // Convertir a array de categorías
      const loadedCategories: Category[] = Array.from(categoryMap.entries()).map(
        ([name, data], index) => ({
          id: String(index + 1),
          name,
          description: categoryDescriptions[name] || `Categoría de ${name}`,
          image: data.image,
          itemCount: data.count,
        })
      );

      setCategories(loadedCategories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    window.location.href = `/products?category=${encodeURIComponent(categoryName)}`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
            Explora Nuestras Categorías
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
            Encuentra lo que Buscas
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-pink-300">
                      {category.itemCount} productos
                    </span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay categorías disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}
