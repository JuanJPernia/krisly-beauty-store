/**
 * Product Card Component
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Tarjetas con sombra suave y bordes redondeados
 * - Imagen del producto con efecto hover
 * - Información clara y accesible
 * - Transiciones suaves en interacciones
 */

import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
  rating = 4.8,
  reviews = 24,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-md"
        >
          <Heart
            size={20}
            className={`transition-colors duration-300 ${
              isFavorite ? 'fill-pink-400 text-pink-400' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating} ({reviews} reseñas)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${(price * 1.2).toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-lg transition-all duration-300 group/btn"
        >
          <ShoppingCart size={18} className="mr-2" />
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
}
