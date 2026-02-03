import Link from "next/link";
import { Printer, ArrowRight, Check } from "lucide-react";

const PRICING_DATA = [
  {
    size: "Pequeño",
    height: "50mm",
    description: "Perfecto para figuras de escritorio",
    materials: [
      { name: "Plástico PLA", price: 29, features: ["Duradero", "Acabado mate", "Envío en 5-7 días"] },
      { name: "Resina Premium", price: 39, features: ["Alto detalle", "Acabado liso", "Envío en 7-10 días"] },
    ],
  },
  {
    size: "Mediano",
    height: "75mm",
    description: "Ideal para coleccionables",
    popular: true,
    materials: [
      { name: "Plástico PLA", price: 49, features: ["Duradero", "Acabado mate", "Envío en 5-7 días"] },
      { name: "Resina Premium", price: 59, features: ["Alto detalle", "Acabado liso", "Envío en 7-10 días"] },
    ],
  },
  {
    size: "Grande",
    height: "100mm",
    description: "Piezas de exhibición",
    materials: [
      { name: "Plástico PLA", price: 69, features: ["Duradero", "Acabado mate", "Envío en 7-10 días"] },
      { name: "Resina Premium", price: 89, features: ["Alto detalle", "Acabado liso", "Envío en 10-14 días"] },
    ],
  },
];

const FAQ = [
  {
    q: "¿Cómo funciona la impresión 3D con IA?",
    a: "Simplemente describe lo que quieres crear en lenguaje natural. Nuestra IA genera un concepto 2D único, lo convierte en un modelo 3D, y lo imprimimos y enviamos profesionalmente a tu dirección.",
  },
  {
    q: "¿Qué materiales utilizan?",
    a: "Ofrecemos plástico PLA para impresiones duraderas y económicas, y resina premium para piezas de alto detalle con acabados lisos. Ambos son seguros y duraderos.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "La producción toma 3-5 días hábiles. El envío es gratuito en México y toma 5-7 días adicionales. Envíos internacionales disponibles al finalizar la compra.",
  },
  {
    q: "¿Puedo obtener un tamaño o material personalizado?",
    a: "¡Sí! Contáctanos para pedidos personalizados incluyendo tamaños más grandes, materiales especiales, o cantidades al mayoreo. También ofrecemos consultoría para artistas.",
  },
  {
    q: "¿Qué pasa si no estoy satisfecho?",
    a: "Ofrecemos garantía de satisfacción 100%. Si tu impresión no cumple tus expectativas, la rehacemos o te reembolsamos tu pedido.",
  },
];

export default function PricingPage() {
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
              <Link href="/pricing" className="text-[#04ACC8] font-medium">
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
      <section className="pt-16 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Precios Simples y Transparentes
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Sin suscripciones. Sin costos ocultos. Paga por impresión con envío gratis incluido.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_DATA.map((tier) => (
              <div
                key={tier.size}
                className={`rounded-2xl border p-6 ${
                  tier.popular
                    ? "bg-[#04ACC8]/10 border-[#04ACC8]/30 relative"
                    : "bg-zinc-800/30 border-zinc-700/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#04ACC8] text-black text-xs font-semibold px-3 py-1 rounded-full">
                    Más Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-1">{tier.size}</h2>
                  <div className="text-4xl font-bold text-[#04ACC8] mb-1">
                    {tier.height}
                  </div>
                  <p className="text-zinc-500">{tier.description}</p>
                </div>

                <div className="space-y-4">
                  {tier.materials.map((material) => (
                    <div
                      key={material.name}
                      className="bg-zinc-900/50 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{material.name}</span>
                        <span className="text-2xl font-bold">${material.price} USD</span>
                      </div>
                      <ul className="space-y-1">
                        {material.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-zinc-400"
                          >
                            <Check className="w-4 h-4 text-[#04ACC8]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <Link
                  href="/create"
                  className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
                    tier.popular
                      ? "bg-[#04ACC8] hover:bg-[#2BC4DD] text-black"
                      : "bg-zinc-700 hover:bg-zinc-600 text-white"
                  }`}
                >
                  Crear Impresión {tier.size}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Cada Pedido Incluye</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Generación IA", desc: "Revisiones ilimitadas" },
              { label: "Vista Previa 3D", desc: "Visualiza antes de ordenar" },
              { label: "Envío Gratis", desc: "Pedidos en México" },
              { label: "Garantía de Satisfacción", desc: "100% devolución" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-12 h-12 bg-[#04ACC8]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-[#04ACC8]" />
                </div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-zinc-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                <p className="text-zinc-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#04ACC8]/20 to-[#9AC32E]/20 border border-[#04ACC8]/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Crear?</h2>
          <p className="text-zinc-400 mb-8">
            Convierte tu imaginación en realidad. Vista previa gratis, sin compromiso.
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
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-zinc-500 text-sm">
          © 2026 Possible Ideas. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
