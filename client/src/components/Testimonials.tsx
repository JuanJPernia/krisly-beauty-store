/**
 * Testimonials Section
 * 
 * Design Philosophy: Elegancia Minimalista Pastel
 * - Tarjetas con sombra suave
 * - Testimonios auténticos
 * - Espacios generosos
 * - Transiciones suaves
 */

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    role: 'Influencer de Belleza',
    content: 'Los productos de Krisly han transformado completamente mi rutina de belleza. La calidad es excepcional y los resultados son visibles desde el primer uso.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Laura Martínez',
    role: 'Profesional de Maquillaje',
    content: 'Como maquilladora profesional, recomiendo estos productos a todas mis clientas. Son confiables, duraderos y ofrecen un acabado impecable.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sofia Rodríguez',
    role: 'Empresaria',
    content: 'Krisly entiende realmente lo que las mujeres necesitan. Su selección de productos es perfecta y el servicio al cliente es excepcional.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <span className="text-pink-500 font-semibold text-sm tracking-widest uppercase">
            Lo Que Dicen Nuestras Clientes
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
            Testimonios Reales
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-pink-500 font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
