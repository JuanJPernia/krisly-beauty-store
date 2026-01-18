/**
 * About Krisly Page
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Biografía de Krisly Ramirez
 * - Misión y valores de la marca
 * - Galería de imágenes
 * - Testimonios de clientes
 */

import { ChevronLeft, Heart, Sparkles, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <a href="/" className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors">
          <ChevronLeft size={20} />
          Volver al inicio
        </a>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="/images/krisly-portrait.jpg"
                alt="Krisly Ramirez"
                className="w-full max-w-md rounded-3xl shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
                  Conoce a Nuestra Fundadora
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
                  Krisly Ramirez
                </h1>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                Soy Krisly Ramirez, fundadora de Krisly Beauty & Care. Mi pasión por la belleza y el cuidado personal comenzó hace más de 10 años, cuando descubrí que la verdadera belleza viene de sentirse bien con uno mismo.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                A través de años de investigación y experiencia, he seleccionado cuidadosamente cada producto en nuestra colección para garantizar que recibas solo lo mejor. Cada producto ha sido probado y aprobado por mí personalmente.
              </p>

              <div className="flex gap-4 pt-4">
                <a href="/products" className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-semibold transition-colors">
                  Explorar Colección
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
              Nuestra Filosofía
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
              Misión y Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-pink-50 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-pink-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Proporcionar productos de belleza y cuidado personal de la más alta calidad que empoderen a nuestras clientes a sentirse hermosas, confiadas y auténticas.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-pink-50 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mb-6">
                <Award className="text-pink-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Calidad Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada producto es seleccionado y probado personalmente. Solo ofrecemos marcas reconocidas y productos que realmente funcionan y transforman.
              </p>
            </div>

            {/* Authenticity */}
            <div className="bg-pink-50 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="text-pink-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Autenticidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Creemos en la belleza auténtica. No se trata de cambiar quién eres, sino de realzar tu mejor versión y sentirte segura de ti misma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
              Mi Trayectoria
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
              Cómo Comenzó Todo
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Timeline Item 1 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="w-1 h-24 bg-pink-200 mt-4"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">El Comienzo (2014)</h3>
                <p className="text-gray-600">
                  Comencé mi viaje en el mundo de la belleza como una apasionada consumidora, probando y estudiando diferentes productos de belleza de todo el mundo.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="w-1 h-24 bg-pink-200 mt-4"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Experiencia (2017)</h3>
                <p className="text-gray-600">
                  Trabajé con marcas internacionales de belleza, aprendiendo sobre formulaciones, ingredientes y lo que realmente funciona para diferentes tipos de piel.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="w-1 h-24 bg-pink-200 mt-4"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Krisly Beauty & Care (2022)</h3>
                <p className="text-gray-600">
                  Decidí crear mi propia marca para compartir mi conocimiento y pasión. Krisly Beauty & Care nace como una plataforma donde cada producto cuenta una historia de calidad y transformación.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Hoy (2026)</h3>
                <p className="text-gray-600">
                  Continuamos creciendo, ayudando a miles de mujeres a descubrir su belleza natural con productos de calidad premium seleccionados con amor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ¿Listo para descubrir tu belleza perfecta?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explora nuestra colección completa de productos seleccionados especialmente para ti.
          </p>
          <a href="/products" className="inline-block px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-semibold transition-colors">
            Explorar Productos
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
