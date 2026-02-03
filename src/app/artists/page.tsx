import Link from "next/link";
import Image from "next/image";
import { Printer, Users, Palette, Lightbulb, Package, ArrowRight, Check } from "lucide-react";

const SERVICES = [
  {
    icon: Palette,
    title: "Conversión 2D a 3D",
    description:
      "Transformamos tu arte 2D, ilustraciones o diseños en modelos 3D completamente realizados y optimizados para impresión.",
  },
  {
    icon: Lightbulb,
    title: "Consultoría de Diseño",
    description:
      "Orientación experta para hacer tus diseños imprimibles, incluyendo selección de materiales, integridad estructural y opciones de acabado.",
  },
  {
    icon: Package,
    title: "Soporte de Producción",
    description:
      "Desde prototipado hasta producción en lotes pequeños, manejamos todo el proceso de impresión 3D para que tú puedas concentrarte en crear.",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Comparte Tu Visión",
    description: "Envíanos tu arte, bocetos o ideas. Discutiremos tus objetivos y requerimientos.",
  },
  {
    step: 2,
    title: "Desarrollo 3D",
    description: "Nuestro equipo crea un modelo 3D detallado, iterando contigo hasta que sea perfecto.",
  },
  {
    step: 3,
    title: "Prototipo y Refinamiento",
    description: "Imprimimos un prototipo para tu revisión y hacemos los ajustes necesarios.",
  },
  {
    step: 4,
    title: "Producción",
    description: "Una vez aprobado, producimos tus piezas finales con calidad profesional.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Convirtieron mi ilustración de personaje en una figura coleccionable impresionante. La atención al detalle fue increíble.",
    author: "María G.",
    role: "Ilustradora",
  },
  {
    quote: "Como alguien sin experiencia en 3D, su consultoría hizo posible que lanzara mi propia línea de figuras.",
    author: "Jaime T.",
    role: "Artista de Cómic",
  },
  {
    quote: "Profesionales, pacientes, y realmente entendieron mi visión artística. Muy recomendados para cualquier artista.",
    author: "Sara K.",
    role: "Escultora",
  },
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Image
                src="/images/possible-logo.png"
                alt="POSSIBLE Logo"
                width={32}
                height={27}
                className="object-contain"
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
              <Link href="/artists" className="text-[#9AC32E] font-medium">
                Para Artistas
              </Link>
              <Link href="/contact" className="text-zinc-300 hover:text-white transition">
                Contacto
              </Link>
            </div>
            <Link
              href="/contact"
              className="bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-4 py-2 rounded-full transition"
            >
              Obtener Consultoría
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#9AC32E]/10 border border-[#9AC32E]/20 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-[#9AC32E]" />
            <span className="text-[#9AC32E] text-sm font-medium">Para Artistas y Creadores</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Da Vida a Tu Arte{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04ACC8] to-[#9AC32E]">
              en 3D
            </span>
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Consultoría personalizada para artistas que quieren transformar sus creaciones 2D
            en impresionantes coleccionables 3D, figuras y piezas de arte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Agenda una Consulta
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#process"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Conoce Más
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lo Que Ofrecemos</h2>
            <p className="text-zinc-400">Soporte integral para artistas en cada etapa</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-[#9AC32E]/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-[#9AC32E]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-zinc-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
            <p className="text-zinc-400">Un proceso colaborativo desde el concepto hasta la creación</p>
          </div>
          <div className="space-y-6">
            {PROCESS.map((item, index) => (
              <div
                key={item.step}
                className="flex gap-6 items-start bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#9AC32E] rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
                {index < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute left-6 top-full w-0.5 h-6 bg-[#9AC32E]/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lo Que Dicen Los Artistas</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6"
              >
                <p className="text-zinc-300 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-[#9AC32E]">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#04ACC8]/20 to-[#9AC32E]/20 border border-[#9AC32E]/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              El Paquete de Consultoría Incluye
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Llamada de consulta inicial",
                "Análisis de viabilidad del diseño",
                "Desarrollo de modelo 3D",
                "Revisiones ilimitadas",
                "Impresión de prototipo",
                "Recomendaciones de material",
                "Guía de producción",
                "Soporte continuo",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#9AC32E] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-zinc-400 mb-4">
                El precio varía según la complejidad del proyecto. Contáctanos para una cotización personalizada.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-8 py-4 rounded-full transition"
              >
                Comenzar
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Transformar Tu Arte?</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Hablemos de tu visión y creemos algo increíble juntos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Agenda Consulta
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Probar Autoservicio Primero
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-zinc-500 text-sm">
          © 2026 Possible Ideas. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
