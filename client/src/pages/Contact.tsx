/**
 * Contact Page
 * 
 * Página de contacto con formulario para que los clientes se comuniquen
 * Diseño elegante en tonos pasteles
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);

    try {
      // Simular envío del formulario
      // En producción, esto se enviaría a un backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      {/* Header */}
      <div className="pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-4 font-display">
          Contáctanos
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          ¿Tienes preguntas o sugerencias? Nos encantaría escucharte. Completa el formulario y nos pondremos en contacto pronto.
        </p>
      </div>

      <div className="container max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Información de contacto */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Email */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">krisly@beautycare.com</p>
                    <p className="text-sm text-slate-500 mt-1">Responderemos en 24 horas</p>
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Teléfono</h3>
                    <p className="text-slate-600">+58 (414) 123-4567</p>
                    <p className="text-sm text-slate-500 mt-1">Lunes a Viernes 9AM - 6PM</p>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Ubicación</h3>
                    <p className="text-slate-600">Caracas, Venezuela</p>
                    <p className="text-sm text-slate-500 mt-1">Disponible para envíos nacionales</p>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-6 border border-pink-200">
                <h3 className="font-semibold text-slate-900 mb-4">Síguenos</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
                    title="Instagram"
                  >
                    <span className="text-lg">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
                    title="Facebook"
                  >
                    <span className="text-lg">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
                    title="WhatsApp"
                  >
                    <span className="text-lg">💬</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all bg-pink-50/30"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all bg-pink-50/30"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                    Asunto (Opcional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="¿De qué se trata?"
                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all bg-pink-50/30"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos tu mensaje..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all bg-pink-50/30 resize-none"
                  />
                </div>

                {/* Botón de envío */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Nos comprometemos a proteger tu privacidad. Lee nuestra política de privacidad.
                </p>
              </form>
            </div>

            {/* Mapa o imagen decorativa */}
            <div className="mt-8 bg-gradient-to-br from-pink-100 to-pink-50 rounded-3xl p-8 border border-pink-200">
              <div className="aspect-video bg-white rounded-2xl flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <p>Ubicación en mapa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
