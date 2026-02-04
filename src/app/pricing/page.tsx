"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Globe, Loader2 } from "lucide-react";
import { getRegionalPricing, RegionalPricing } from "@/lib/api";

// Countries available for shipping
const COUNTRIES = [
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "CA", name: "Canadá", flag: "🇨🇦" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "PE", name: "Perú", flag: "🇵🇪" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "PA", name: "Panamá", flag: "🇵🇦" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
];

const FAQ = [
  {
    q: "¿Cómo funciona la impresión 3D con IA?",
    a: "Simplemente describe lo que quieres crear en lenguaje natural. Nuestra IA genera un concepto 2D único, lo convierte en un modelo 3D, y lo imprimimos y enviamos profesionalmente a tu dirección.",
  },
  {
    q: "¿Por qué varían los precios según el país?",
    a: "Los precios reflejan los costos de producción y envío a cada región. Los envíos a Latinoamérica tienen costos logísticos diferentes que a Estados Unidos y Canadá.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "La producción toma 5-7 días hábiles. El envío internacional toma 7-14 días adicionales dependiendo de tu ubicación.",
  },
  {
    q: "¿Puedo obtener un tamaño personalizado?",
    a: "¡Sí! Contáctanos para pedidos personalizados incluyendo tamaños más grandes o cantidades al mayoreo.",
  },
  {
    q: "¿Qué pasa si no estoy satisfecho?",
    a: "Ofrecemos garantía de satisfacción 100%. Si tu impresión no cumple tus expectativas, la rehacemos o te reembolsamos tu pedido.",
  },
];

export default function PricingPage() {
  const [country, setCountry] = useState("MX");
  const [pricing, setPricing] = useState<RegionalPricing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPricing() {
      setLoading(true);
      try {
        const data = await getRegionalPricing(country);
        setPricing(data);
      } catch (err) {
        console.error("Error loading pricing:", err);
      }
      setLoading(false);
    }
    loadPricing();
  }, [country]);

  const selectedCountryData = COUNTRIES.find(c => c.code === country);

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
      <section className="pt-16 pb-8 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Precios Simples y Transparentes
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
          Sin suscripciones. Sin costos ocultos. Paga por impresión con envío incluido.
        </p>

        {/* Country Selector */}
        <div className="max-w-xs mx-auto">
          <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            Selecciona tu país de envío
          </label>
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#04ACC8] cursor-pointer text-center"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {pricing && (
            <p className="text-xs text-zinc-500 mt-2">
              {pricing.region.key === "latam"
                ? "Precios para Latinoamérica"
                : "Precios para USA y Canadá"}
            </p>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#04ACC8]" />
              <span className="ml-3 text-zinc-400">Cargando precios...</span>
            </div>
          ) : pricing ? (
            <div className="grid md:grid-cols-4 gap-6">
              {pricing.sizes.map((size, index) => (
                <div
                  key={size.key}
                  className={`rounded-2xl border p-6 ${
                    index === 1
                      ? "bg-[#04ACC8]/10 border-[#04ACC8]/30 relative"
                      : "bg-zinc-800/30 border-zinc-700/50"
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#04ACC8] text-black text-xs font-semibold px-3 py-1 rounded-full">
                      Más Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-1">{size.name_es}</h2>
                    <div className="text-4xl font-bold text-[#04ACC8] mb-1">
                      {size.height_mm}mm
                    </div>
                    <p className="text-zinc-500 text-sm">{size.description_es}</p>
                  </div>

                  <div className="bg-zinc-900/50 rounded-xl p-4 mb-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">
                        {size.price_display}
                      </span>
                      <span className="text-zinc-400 ml-1">USD</span>
                    </div>
                    {size.local_currency && (
                      <div className="text-center text-sm text-zinc-400 mt-1">
                        ≈ {size.local_currency.display}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {[
                      "Plástico profesional",
                      "Acabado de alta calidad",
                      "Envío incluido",
                      `Entrega en 10-15 días`,
                    ].map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-zinc-400"
                      >
                        <Check className="w-4 h-4 text-[#04ACC8]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/create"
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
                      index === 1
                        ? "bg-[#04ACC8] hover:bg-[#2BC4DD] text-black"
                        : "bg-zinc-700 hover:bg-zinc-600 text-white"
                    }`}
                  >
                    Crear {size.name_es}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-zinc-500 py-12">
              Error al cargar precios. Intenta nuevamente.
            </div>
          )}
        </div>
      </section>

      {/* Region Info Banner */}
      {pricing && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">{selectedCountryData?.flag}</span>
              <h3 className="text-lg font-semibold">
                Envío a {selectedCountryData?.name}
              </h3>
            </div>
            <p className="text-zinc-400 text-sm">
              {pricing.region.key === "latam" ? (
                <>
                  Los precios incluyen envío internacional desde nuestros centros de producción.
                  Entrega estimada: 10-15 días hábiles. Sin costos adicionales de aduana.
                </>
              ) : (
                <>
                  Envío rápido dentro de USA/Canadá.
                  Entrega estimada: 7-10 días hábiles.
                </>
              )}
            </p>
          </div>
        </section>
      )}

      {/* What's Included */}
      <section className="py-12 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Cada Pedido Incluye</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Generación IA", desc: "Revisiones ilimitadas" },
              { label: "Vista Previa 3D", desc: "Visualiza antes de ordenar" },
              { label: "Envío Incluido", desc: "A cualquier país" },
              { label: "Garantía 100%", desc: "Satisfacción garantizada" },
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
