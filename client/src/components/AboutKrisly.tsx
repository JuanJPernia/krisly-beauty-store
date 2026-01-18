/**
 * About Krisly Section
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Imagen de Krisly como protagonista
 * - Texto elegante y personal
 * - Asimetría visual con espacios generosos
 * - Transiciones suaves
 */

import { CheckCircle } from 'lucide-react';

export default function AboutKrisly() {
  const highlights = [
    'Experta en belleza con 10+ años de experiencia',
    'Productos seleccionados personalmente',
    'Garantía de calidad premium',
    'Asesoramiento personalizado',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative animate-in fade-in slide-in-from-left duration-700">
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/krisly-portrait.jpg"
                alt="Krisly Ramirez"
                className="w-full h-full object-cover"
              />
              {/* Decorative Element */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-200 rounded-full opacity-50 blur-3xl"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
            {/* Header */}
            <div className="space-y-4">
              <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
                Conoce a Nuestra Fundadora
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                Krisly Ramirez
              </h2>
              <p className="text-lg text-pink-400 font-semibold">
                Experta en Belleza & Cuidado Personal
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              Con más de una década de experiencia en la industria de la belleza, Krisly ha dedicado su carrera a ayudar a mujeres de todo el mundo a descubrir y potenciar su belleza natural. Su pasión por la calidad y la excelencia se refleja en cada producto que selecciona para esta colección.
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 group"
                >
                  <CheckCircle className="text-pink-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" size={24} />
                  <span className="text-gray-700 text-lg">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Descubre su Historia Completa
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
