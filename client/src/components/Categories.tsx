/**
 * Categories Section
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Categorías con imágenes de fondo
 * - Texto elegante y legible
 * - Transiciones suaves al hover
 * - Espacios amplios
 */

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Maquillaje',
    description: 'Colección completa de maquillaje premium',
    image: '/images/featured-products.jpg',
    itemCount: 45,
  },
  {
    id: '2',
    name: 'Cuidado Personal',
    description: 'Productos de skincare y cuidado corporal',
    image: '/images/skincare-collection.jpg',
    itemCount: 32,
  },
  {
    id: '3',
    name: 'Herramientas',
    description: 'Brochas y accesorios de maquillaje',
    image: '/images/makeup-brushes.jpg',
    itemCount: 18,
  },
];

export default function Categories() {
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
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
      </div>
    </section>
  );
}
