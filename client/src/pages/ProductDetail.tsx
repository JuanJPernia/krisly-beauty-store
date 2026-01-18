/**
 * Product Detail Page
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Imagen grande del producto
 * - Información detallada
 * - Opciones de compra
 * - Productos relacionados
 */

import { useState } from 'react';
import { ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products, getProductsByCategory } from '@/lib/products';
import { useRoute } from 'wouter';

export default function ProductDetail() {
  const [route, params] = useRoute('/product/:id');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get product from URL params (in a real app, this would be from the URL)
  const product = products[0]; // Default to first product for demo

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Producto no encontrado</p>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <a href="/products" className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors">
          <ChevronLeft size={20} />
          Volver a Productos
        </a>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Category & Title */}
            <div>
              <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-pink-500 font-semibold">
                  Ahorra ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.inStock ? (
                <p className="text-green-600 font-semibold">En Stock</p>
              ) : (
                <p className="text-red-600 font-semibold">Agotado</p>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-900">Cantidad:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Agregar al Carrito
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-pink-400 transition-colors duration-300"
                >
                  <Heart
                    size={20}
                    className={isFavorite ? 'fill-pink-400 text-pink-400' : 'text-gray-400'}
                  />
                </button>
                <button className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-pink-400 transition-colors duration-300">
                  <Share2 size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-bold text-gray-900 mb-4">Características</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Producto original y auténtico</li>
                <li>✓ Garantía de satisfacción</li>
                <li>✓ Envío rápido y seguro</li>
                <li>✓ Devolución fácil en 30 días</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
