/**
 * Footer Component
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Fondo blanco con detalles en rosa pastel
 * - Información organizada y clara
 * - Enlaces accesibles
 * - Espacios generosos
 */

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-pink-100">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-pink-200 flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Krisly</h3>
                <p className="text-xs text-pink-400">Beauty & Care</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Productos de belleza premium seleccionados con cuidado para realzar tu belleza natural.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Productos', href: '/products' },
                { label: 'Sobre Krisly', href: '/about' },
                { label: 'Blog', href: '#' },
                { label: 'Contacto', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 hover:text-pink-500 transition-colors duration-300 text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Servicio al Cliente</h4>
            <ul className="space-y-2">
              {['Preguntas Frecuentes', 'Envíos', 'Devoluciones', 'Garantía', 'Política de Privacidad'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-pink-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@krislybeauty.com" className="text-gray-600 hover:text-pink-500 transition-colors duration-300 text-sm">
                  info@krislybeauty.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-pink-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-pink-500 transition-colors duration-300 text-sm">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-pink-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm">
                  123 Beauty Street<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pink-100 my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} Krisly Ramirez Beauty & Care. Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <Twitter size={20} />
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Métodos de pago:</span>
            <div className="flex gap-2">
              {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                <div key={method} className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
