/**
 * Hero Section Component
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Imagen de fondo con productos premium
 * - Texto elegante con jerarquía clara
 * - Botón CTA con efecto hover suave
 * - Espacios amplios y respiración visual
 */

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/hero-banner.jpg)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              {/* Subtitle */}
              <div className="inline-block">
                <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
                  Belleza Premium
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Descubre tu
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                  Belleza Perfecta
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-700 max-w-xl leading-relaxed">
                Productos de maquillaje y cuidado personal de lujo, seleccionados por Krisly Ramirez para realzar tu belleza natural.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
                >
                  Explorar Colección
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8"
                >
                  Conocer a Krisly
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
