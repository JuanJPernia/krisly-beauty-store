/**
 * Home Page
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Navegación limpia en la parte superior
 * - Hero section con imagen de fondo
 * - Secciones de productos destacados
 * - Información sobre Krisly
 * - Testimonios de clientes
 * - Footer completo
 */

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutKrisly from '@/components/AboutKrisly';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <Categories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Krisly */}
      <AboutKrisly />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
