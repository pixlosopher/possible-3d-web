import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Lightbulb, Users, Palette, Cpu, Calendar } from "lucide-react";

const TIMELINE = [
  {
    year: "2013",
    title: "Fundación",
    description: "Nace Possible Ideas como laboratorio de innovación en Guadalajara, enfocado en I+D para biomedicina y diseño industrial.",
    icon: Lightbulb,
    color: "text-[#04ACC8]",
  },
  {
    year: "2013-2019",
    title: "Era de Investigación",
    description: "Desarrollamos proyectos con recursos públicos y privados. Desde dispositivos médicos hasta productos de consumo.",
    icon: Cpu,
    color: "text-[#9AC32E]",
  },
  {
    year: "2020",
    title: "El Pivote",
    description: "La pandemia nos obligó a reinventarnos. Nos especializamos en arte e impresión 3D, operando con un equipo lean.",
    icon: Users,
    color: "text-[#04ACC8]",
  },
  {
    year: "2024",
    title: "Casa Orbe",
    description: "Transformamos nuestra sede en un centro de arte, cultura y tecnología. Inauguramos con la exposición de Blobb.",
    icon: Building2,
    color: "text-[#9AC32E]",
  },
  {
    year: "2025-26",
    title: "IA + Impresión 3D",
    description: "Lanzamos nuestro pipeline de inteligencia artificial para democratizar el acceso a la impresión 3D.",
    icon: Palette,
    color: "text-[#04ACC8]",
  },
];

const CAPABILITIES = [
  "Diseño Industrial",
  "Modelado 3D",
  "Prototipado Rápido",
  "Impresión 3D (FDM, SLA, SLS)",
  "CNC Milling",
  "Corte Láser",
  "Moldes de Silicón",
  "Renderizado Fotorrealista",
  "Animación 3D",
  "Consultoría Técnica",
];

export default function AboutPage() {
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

      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#04ACC8]/10 border border-[#04ACC8]/20 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-[#04ACC8]" />
            <span className="text-[#04ACC8] text-sm font-medium">Desde 2013</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nuestra{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04ACC8] to-[#9AC32E]">
              Historia
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Más de una década transformando ideas en realidad. De laboratorio de I+D
            a centro de arte y tecnología.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#04ACC8] to-[#9AC32E] hidden md:block" />

            <div className="space-y-12">
              {TIMELINE.map((item, index) => (
                <div key={item.year} className="relative flex gap-8">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center z-10 ${item.color}`}>
                    <item.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-6">
                    <div className={`text-sm font-bold ${item.color} mb-1`}>{item.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lo Que Hacemos</h2>
            <p className="text-zinc-400">Expertise acumulado en más de 12 años de operación</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CAPABILITIES.map((capability) => (
              <div
                key={capability}
                className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4 text-center hover:border-[#04ACC8]/50 transition"
              >
                <span className="text-sm text-zinc-300">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casa Orbe Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#04ACC8]/20 to-[#9AC32E]/20 border border-[#04ACC8]/30 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#9AC32E]/10 border border-[#9AC32E]/20 rounded-full px-4 py-2 mb-6">
                  <Building2 className="w-4 h-4 text-[#9AC32E]" />
                  <span className="text-[#9AC32E] text-sm font-medium">Nuestro Espacio</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Casa Orbe</h2>
                <p className="text-zinc-400 mb-6">
                  Un centro de arte, cultura y tecnología en el corazón de Guadalajara.
                  Donde la comunidad creativa se encuentra para explorar las fronteras
                  entre el arte tradicional y la fabricación digital.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-zinc-300">
                    <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                    Exposiciones de arte contemporáneo
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                    Talleres de tecnología y fabricación
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                    Residencias para artistas
                  </li>
                  <li className="flex items-center gap-3 text-zinc-300">
                    <span className="w-2 h-2 bg-[#9AC32E] rounded-full"></span>
                    Eventos culturales y networking
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-black font-semibold px-6 py-3 rounded-full transition"
                >
                  Visítanos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-xl font-semibold mb-2">Exposición Actual</h3>
                <p className="text-[#04ACC8] font-medium mb-2">BLOBB</p>
                <p className="text-zinc-500 text-sm">por Proyectos de Aquí</p>
                <div className="mt-6 pt-6 border-t border-zinc-700">
                  <p className="text-zinc-400 text-sm">
                    📍 Centro Histórico, Guadalajara
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#04ACC8] mb-2">12+</div>
              <div className="text-zinc-400">Años de experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#9AC32E] mb-2">500+</div>
              <div className="text-zinc-400">Proyectos realizados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#04ACC8] mb-2">50+</div>
              <div className="text-zinc-400">Artistas colaboradores</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#9AC32E] mb-2">∞</div>
              <div className="text-zinc-400">Ideas posibles</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Tienes una Idea?</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Ya sea arte, un producto, o simplemente curiosidad—nos encantaría ayudarte a hacerla realidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Crear con IA
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Consulta Personalizada
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
