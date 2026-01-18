/**
 * Payment Success Page
 * 
 * Página de confirmación después de un pago exitoso
 */

import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Success() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Pago Exitoso!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tu orden ha sido confirmada. Recibirás un correo de confirmación con los detalles de tu compra.
          </p>

          {/* Details */}
          <div className="bg-pink-50 rounded-2xl p-6 mb-8 border border-pink-200">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Número de orden:</span> #KR-2024-001
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Tiempo de entrega estimado:</span> 3-5 días hábiles
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <a href="/">
              <Button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full py-3 font-semibold">
                Volver a Inicio
              </Button>
            </a>
            <a href="/products">
              <button className="w-full px-6 py-3 border-2 border-pink-400 text-pink-600 rounded-full font-semibold hover:bg-pink-50 transition-colors duration-300">
                Continuar Comprando
              </button>
            </a>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-600 mt-8">
            ¿Tienes preguntas? Contáctanos en{' '}
            <a href="mailto:info@krislybeauty.com" className="text-pink-500 hover:text-pink-600 font-semibold">
              info@krislybeauty.com
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
