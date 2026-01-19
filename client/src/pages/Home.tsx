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

import { useAuth } from '@/_core/hooks/useAuth';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutKrisly from '@/components/AboutKrisly';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

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
