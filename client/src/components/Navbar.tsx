/**
 * Navbar Component
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Navegación limpia y sofisticada
 * - Rosa pastel como color primario
 * - Espacios generosos y tipografía elegante
 * - Transiciones suaves en interacciones
 */

import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '#' },
    { label: 'Maquillaje', href: '#' },
    { label: 'Cuidado Personal', href: '#' },
    { label: 'Sobre Krisly', href: '#' },
    { label: 'Contacto', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-pink-200 flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">Krisly</h1>
              <p className="text-xs text-pink-400">Beauty & Care</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-pink-500 transition-colors duration-300 font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors duration-300">
              <ShoppingCart size={24} />
              <span className="absolute top-1 right-1 bg-pink-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-pink-500 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in duration-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
