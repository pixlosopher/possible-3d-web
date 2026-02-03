"use client";

import { useState } from "react";
import Link from "next/link";
import { Printer, Mail, MessageSquare, Send, Check, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#04ACC8]" />
          </div>
          <h1 className="text-3xl font-bold mb-4">¡Mensaje Enviado!</h1>
          <p className="text-zinc-400 mb-8">
            Gracias por contactarnos. Te responderemos dentro de las próximas 24 horas.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-6 py-3 rounded-full transition"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#04ACC8] to-[#9AC32E] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold">POSSIBLE</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/create" className="text-zinc-300 hover:text-white transition">
                Crear
              </Link>
              <Link href="/pricing" className="text-zinc-300 hover:text-white transition">
                Precios
              </Link>
              <Link href="/artists" className="text-zinc-300 hover:text-white transition">
                Para Artistas
              </Link>
              <Link href="/contact" className="text-[#04ACC8] font-medium">
                Contacto
              </Link>
            </div>
            <Link
              href="/create"
              className="bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-4 py-2 rounded-full transition"
            >
              Comenzar
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
            <p className="text-xl text-zinc-400">
              ¿Tienes una pregunta o quieres discutir un proyecto personalizado? Nos encantaría saber de ti.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#04ACC8]" />
              </div>
              <h3 className="font-semibold mb-2">Escríbenos</h3>
              <p className="text-zinc-400 text-sm">possibleidgdl@gmail.com</p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#04ACC8]" />
              </div>
              <h3 className="font-semibold mb-2">Ubicación</h3>
              <p className="text-zinc-400 text-sm">Guadalajara, Jalisco, México</p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-[#9AC32E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-[#9AC32E]" />
              </div>
              <h3 className="font-semibold mb-2">Tiempo de Respuesta</h3>
              <p className="text-zinc-400 text-sm">Dentro de 24 horas</p>
            </div>
          </div>

          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="Juan Pérez"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    placeholder="tu@correo.com"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  ¿En qué podemos ayudarte?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: "general", label: "Pregunta General" },
                    { value: "order", label: "Soporte de Pedido" },
                    { value: "artist", label: "Consultoría Artista" },
                    { value: "custom", label: "Proyecto Personalizado" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, type: option.value })
                      }
                      className={`p-3 rounded-xl border text-sm font-medium transition ${
                        formData.type === option.value
                          ? "border-[#04ACC8] bg-[#04ACC8]/10 text-[#04ACC8]"
                          : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  placeholder="Cuéntanos más sobre tu consulta..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold py-4 rounded-xl transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center text-zinc-500 text-sm">
          © 2026 Possible Ideas. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
