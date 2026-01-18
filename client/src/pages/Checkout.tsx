/**
 * Checkout Page
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Resumen de orden
 * - Información de envío
 * - Información de facturación
 * - Botón para proceder al pago
 */

import { useState } from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Agrega productos antes de proceder al pago</p>
          <a href="/products">
            <Button className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-8">
              Ir a Productos
            </Button>
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    // Validate form
    if (!formData.email || !formData.firstName || !formData.address) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsLoading(true);
    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          metadata: {
            customer_email: formData.email,
            customer_name: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode,
            country: formData.country,
          },
        }),
      });

      // Verificar si la respuesta es válida
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        toast.error('Error del servidor. Por favor, intenta de nuevo.');
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.checkoutUrl) {
        clearCart();
        window.open(data.checkoutUrl, '_blank');
        toast.success('Redirigiendo a Stripe para completar el pago...');
      } else if (data.error) {
        toast.error(data.error);
      } else {
        toast.error('Error al crear la sesión de pago');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
                />
              </div>

              {/* Shipping Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Envío</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="Estado"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Código Postal"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="País"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  El pago será procesado de forma segura a través de Stripe. No almacenamos información de tarjetas de crédito.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de Orden</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-semibold py-3 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 size={20} className="animate-spin" />}
                {isLoading ? 'Procesando...' : 'Proceder al Pago'}
              </Button>

              <a href="/products" className="block mt-4">
                <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300">
                  Continuar Comprando
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
