import Link from "next/link";
import Image from "next/image";
import { Sparkles, Printer, Truck, ArrowRight, Users, Layers, Cpu, Box, Instagram, Youtube, Facebook } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Image
                src="/images/possible-logo.png"
                alt="POSSIBLE Logo"
                width={40}
                height={34}
                className="object-contain"
                priority
              />
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
              <Link href="/contact" className="text-zinc-300 hover:text-white transition">
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#04ACC8]/10 border border-[#04ACC8]/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#04ACC8]" />
            <span className="text-[#04ACC8] text-sm font-medium">IA + Impresión 3D</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Toma Tus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04ACC8] to-[#9AC32E]">
              IDEAS
            </span>{" "}
            En Serio
          </h1>
          <p className="text-xl text-zinc-400 mb-4 max-w-2xl mx-auto">
            Tomamos tu idea y le damos forma
          </p>
          <p className="text-lg text-zinc-500 mb-8 max-w-2xl mx-auto">
            Describe lo que quieres, nuestra IA crea un modelo 3D impresionante,
            lo imprimimos y lo enviamos directamente a tu puerta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Crear tu Modelo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Ver Precios
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pruébalo Ahora</h2>
            <p className="text-zinc-400">Ingresa una descripción y mira cómo la IA genera tu modelo 3D</p>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Un búho steampunk con engranajes de latón y ojos brillantes..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
              />
              <Link
                href="/create"
                className="bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-8 py-4 rounded-xl transition whitespace-nowrap"
              >
                Generar Modelo 3D
              </Link>
            </div>
            <p className="text-zinc-500 text-sm mt-4 text-center">
              Vista previa gratis • Sin cuenta requerida • Impresiones desde $29 USD
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - PossibleID Style */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-zinc-400">Desarrollo de Producto & Prototipado Rápido</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Development */}
            <div className="bg-gradient-to-br from-[#04ACC8]/10 to-transparent border border-[#04ACC8]/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mb-6">
                <Layers className="w-8 h-8 text-[#04ACC8]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Desarrollo de Producto</h3>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#04ACC8] rounded-full"></span>
                  Diseño Industrial
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#04ACC8] rounded-full"></span>
                  Modelado 3D
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#04ACC8] rounded-full"></span>
                  Renderizado Fotorrealista
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#04ACC8] rounded-full"></span>
                  Animación 3D
                </li>
              </ul>
            </div>

            {/* Rapid Prototyping */}
            <div className="bg-gradient-to-br from-[#9AC32E]/10 to-transparent border border-[#9AC32E]/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-[#9AC32E]/10 rounded-full flex items-center justify-center mb-6">
                <Cpu className="w-8 h-8 text-[#9AC32E]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Prototipado Rápido</h3>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  Impresión 3D (FDM, SLA, SLS)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  CNC Milling
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  Corte Láser
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  Moldes de Silicón
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - AI Service */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#9AC32E]/10 border border-[#9AC32E]/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#9AC32E]" />
              <span className="text-[#9AC32E] text-sm font-medium">Servicio IA</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
            <p className="text-zinc-400">De tu idea a tu puerta en 3 simples pasos</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[#04ACC8]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Describe</h3>
              <p className="text-zinc-400">
                Escribe lo que quieres crear. Nuestra IA entiende lenguaje natural y genera un modelo 3D único.
              </p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Box className="w-8 h-8 text-[#04ACC8]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Personaliza y Ordena</h3>
              <p className="text-zinc-400">
                Visualiza tu modelo en 3D, elige tamaño y material, luego paga de forma segura con Stripe o PayPal.
              </p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-[#04ACC8]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Recibe</h3>
              <p className="text-zinc-400">
                Imprimimos tu modelo con calidad profesional y lo enviamos directamente a ti. Rastrea tu pedido en línea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Artists Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#04ACC8]/10 to-[#9AC32E]/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#9AC32E]/10 border border-[#9AC32E]/20 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4 text-[#9AC32E]" />
                <span className="text-[#9AC32E] text-sm font-medium">Para Artistas y Creadores</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Consultoría de Impresión 3D
              </h2>
              <p className="text-zinc-400 mb-6 text-lg">
                ¿Eres artista y quieres llevar tus diseños 2D al mundo físico?
                Ofrecemos consultoría personalizada para perfeccionar tus modelos 3D.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  Extrae modelos 3D de tu arte 2D
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  Optimiza modelos para impresión profesional
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  Recomendaciones de material y acabado
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                  Soporte para producción en pequeñas series
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-black font-semibold px-6 py-3 rounded-full transition"
              >
                Agenda una Consulta
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Lo que dicen nuestros clientes</h3>
              <blockquote className="text-zinc-400 italic mb-4">
                &quot;Me ayudaron a convertir mi ilustración en una figura coleccionable impresionante.
                La atención al detalle fue increíble.&quot;
              </blockquote>
              <p className="text-zinc-500">— Cliente Artista de Guadalajara</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Precios Simples y Transparentes</h2>
            <p className="text-zinc-400">Sin suscripciones. Paga por impresión.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-zinc-400 mb-2">Pequeño</h3>
              <div className="text-4xl font-bold mb-2">$29 <span className="text-lg font-normal text-zinc-500">USD</span></div>
              <p className="text-zinc-500 mb-6">50mm altura • PLA plástico</p>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>Perfecto para figuras de escritorio</li>
                <li>Impresión de alta definición</li>
                <li>Envío en 5-7 días</li>
              </ul>
            </div>
            <div className="bg-[#04ACC8]/10 border border-[#04ACC8]/30 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#04ACC8] text-black text-xs font-semibold px-3 py-1 rounded-full">
                Más Popular
              </div>
              <h3 className="text-lg font-semibold text-[#04ACC8] mb-2">Mediano</h3>
              <div className="text-4xl font-bold mb-2">$49 <span className="text-lg font-normal text-zinc-500">USD</span></div>
              <p className="text-zinc-500 mb-6">75mm altura • PLA plástico</p>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>Ideal para coleccionables</li>
                <li>Detalle premium</li>
                <li>Envío en 5-7 días</li>
              </ul>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-zinc-400 mb-2">Grande</h3>
              <div className="text-4xl font-bold mb-2">$69 <span className="text-lg font-normal text-zinc-500">USD</span></div>
              <p className="text-zinc-500 mb-6">100mm altura • PLA plástico</p>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>Piezas de exhibición</li>
                <li>Máximo detalle</li>
                <li>Envío en 7-10 días</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-[#04ACC8] hover:text-[#2BC4DD] transition">
              Ver todos los materiales y tamaños →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#04ACC8]/20 to-[#9AC32E]/20 border border-[#04ACC8]/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">¿Listo para Crear?</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Convierte tu imaginación en un objeto físico. Solo toma unos minutos.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-8 py-4 rounded-full text-lg transition"
          >
            Comenzar Ahora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/possible-logo.png"
                  alt="POSSIBLE Logo"
                  width={32}
                  height={27}
                  className="object-contain"
                />
                <span className="text-lg font-bold">POSSIBLE</span>
              </div>
              <p className="text-zinc-500 text-sm mb-4">
                Tomamos tu idea y le damos forma.
              </p>
              <p className="text-zinc-500 text-sm">
                📍 Guadalajara, Jalisco, México
              </p>
              <p className="text-zinc-500 text-sm">
                ✉️ possibleidgdl@gmail.com
              </p>
              {/* Social Media */}
              <div className="flex gap-4 mt-4">
                <a href="https://www.youtube.com/channel/UC8wHbw-EKEYKpRjf8QVA9FA" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#04ACC8] transition">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/possibleidgdl/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#04ACC8] transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/possibleidgdl/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#04ACC8] transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><Link href="/create" className="hover:text-white transition">Crear</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Precios</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><Link href="/artists" className="hover:text-white transition">Para Artistas</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Consultoría</Link></li>
                <li><Link href="/about" className="hover:text-white transition">Nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><Link href="/contact" className="hover:text-white transition">Contacto</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">Centro de Ayuda</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
            © 2026 Possible Ideas. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
