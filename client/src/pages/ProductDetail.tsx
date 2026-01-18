/**
 * Product Detail Page
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Imagen grande del producto
 * - Información detallada
 * - Opciones de compra
 * - Reseñas reales de clientes
 * - Productos relacionados
 */

import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import { useRoute } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  sales_count: number;
  is_featured: boolean;
  created_at: string;
}

export default function ProductDetail() {
  const [route, params] = useRoute('/product/:id');
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    loadProduct();
  }, [params?.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params?.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        
        // Cargar productos relacionados
        const relatedResponse = await fetch(`/api/products?category=${data.category}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedProducts(relatedData.filter((p: Product) => p.id !== data.id).slice(0, 3));
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addItem({
        name: product.name,
        price: product.price,
        image: product.image,
        product_id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
      });
      toast.success(`${product.name} agregado al carrito`);
    } catch (error) {
      toast.error('Error al agregar al carrito');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Producto no encontrado</p>
      </div>
    );
  }

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
                {product.rating.toFixed(1)} (Basado en reseñas reales)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold">En Stock ({product.stock} disponibles)</p>
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
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
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

        {/* Reviews Section */}
        <div className="border-t border-gray-200 pt-16 mb-16">
          <ReviewsSection productId={typeof product.id === 'string' ? parseInt(product.id) : product.id} onReviewAdded={loadProduct} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} id={p.id.toString()} name={p.name} category={p.category} price={p.price} image={p.image} rating={p.rating} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
