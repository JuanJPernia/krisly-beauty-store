/**
 * Featured Products Section
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Grid flexible de productos
 * - Espacios amplios entre elementos
 * - Tipografía elegante con jerarquía clara
 * - Transiciones suaves en scroll
 */

import ProductCard from './ProductCard';

const featuredProducts = [
  {
    id: '1',
    name: 'Paleta de Sombras Premium Rose Gold',
    category: 'Maquillaje',
    price: 45.99,
    image: '/images/featured-products.jpg',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '2',
    name: 'Sérum Facial Hidratante Luxury',
    category: 'Cuidado Personal',
    price: 52.00,
    image: '/images/skincare-collection.jpg',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Set de Brochas de Maquillaje Premium',
    category: 'Herramientas',
    price: 68.50,
    image: '/images/makeup-brushes.jpg',
    rating: 4.7,
    reviews: 124,
  },
  {
    id: '4',
    name: 'Labial Mate Larga Duración',
    category: 'Maquillaje',
    price: 28.99,
    image: '/images/featured-products.jpg',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: '5',
    name: 'Crema Facial Antienvejecimiento',
    category: 'Cuidado Personal',
    price: 65.00,
    image: '/images/skincare-collection.jpg',
    rating: 4.8,
    reviews: 142,
  },
  {
    id: '6',
    name: 'Base de Maquillaje Full Coverage',
    category: 'Maquillaje',
    price: 38.50,
    image: '/images/featured-products.jpg',
    rating: 4.7,
    reviews: 178,
  },
];

export default function FeaturedProducts() {
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            Ver Todos los Productos
          </button>
        </div>
      </div>
    </section>
  );
}
