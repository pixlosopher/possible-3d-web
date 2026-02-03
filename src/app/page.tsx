"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Printer, Truck, ArrowRight, Users, Layers, Cpu, Box, Instagram, Youtube, Facebook, ArrowUpRight, Terminal, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Describe",
    description: "Escribe lo que quieres crear. Nuestra IA entiende lenguaje natural.",
    icon: Terminal,
    color: "cyan",
  },
  {
    num: "02",
    title: "Personaliza",
    description: "Visualiza tu modelo en 3D, elige tamaño y material.",
    icon: Box,
    color: "green",
  },
  {
    num: "03",
    title: "Recibe",
    description: "Imprimimos y enviamos directo a tu puerta.",
    icon: Truck,
    color: "cyan",
  },
];

const SERVICES = [
  { title: "Diseño Industrial", icon: "◆" },
  { title: "Modelado 3D", icon: "◇" },
  { title: "Renderizado", icon: "△" },
  { title: "Animación 3D", icon: "○" },
  { title: "Impresión 3D", icon: "▣" },
  { title: "CNC Milling", icon: "⬡" },
  { title: "Corte Láser", icon: "⬢" },
  { title: "Moldes Silicón", icon: "◎" },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Un búho steampunk con engranajes de latón...";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Grid pattern background */}
      <div className="fixed inset-0 grid-pattern grid-animated pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition group">
              <Image
                src="/images/possible-logo.png"
                alt="POSSIBLE Logo"
                width={44}
                height={37}
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
              <span className="text-xl font-semibold tracking-tight">POSSIBLE</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {["Crear", "Precios", "Artistas", "Contacto"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-zinc-400 hover:text-white transition relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#04ACC8] transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            <Link
              href="/create"
              className="group relative bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-6 py-2.5 transition-all duration-300 btn-cut-corners"
            >
              <span className="flex items-center gap-2">
                Comenzar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center pt-20">
        {/* Background effects */}
        <div
          className="absolute top-40 left-1/4 w-96 h-96 bg-[#04ACC8]/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#9AC32E]/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <div className="animate-fade-in-up opacity-0 inline-flex items-center gap-3 border border-[#04ACC8]/30 bg-[#04ACC8]/5 px-4 py-2">
                <Zap className="w-4 h-4 text-[#04ACC8]" />
                <span className="text-sm font-mono text-[#04ACC8] tracking-wider">IA + IMPRESIÓN 3D</span>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="animate-fade-in-up opacity-0 delay-100 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                  Toma Tus
                </h1>
                <h1 className="animate-fade-in-up opacity-0 delay-200 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight gradient-text text-glow-cyan">
                  IDEAS
                </h1>
                <h1 className="animate-fade-in-up opacity-0 delay-300 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                  En Serio
                </h1>
              </div>

              {/* Description */}
              <p className="animate-fade-in-up opacity-0 delay-400 text-xl text-zinc-400 max-w-lg leading-relaxed">
                Describe lo que quieres, nuestra IA crea un modelo 3D impresionante,
                lo imprimimos y lo enviamos a tu puerta.
              </p>

              {/* CTA Buttons */}
              <div className="animate-fade-in-up opacity-0 delay-500 flex flex-wrap gap-4 pt-4">
                <Link
                  href="/create"
                  className="group inline-flex items-center gap-3 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-8 py-4 text-lg transition-all duration-300 glow-cyan hover:glow-cyan btn-cut-corners"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Crear Modelo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-3 border border-zinc-700 hover:border-[#04ACC8] text-white font-semibold px-8 py-4 text-lg transition-all duration-300"
                >
                  Ver Precios
                </Link>
              </div>

              {/* Stats inline */}
              <div className="animate-fade-in-up opacity-0 delay-600 flex gap-8 pt-8 border-t border-zinc-800">
                <div>
                  <span className="text-3xl font-bold text-[#04ACC8]">12+</span>
                  <p className="text-sm text-zinc-500 mt-1">Años exp.</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-[#9AC32E]">500+</span>
                  <p className="text-sm text-zinc-500 mt-1">Proyectos</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-[#04ACC8]">$29</span>
                  <p className="text-sm text-zinc-500 mt-1">Desde USD</p>
                </div>
              </div>
            </div>

            {/* Right - Terminal/Demo */}
            <div className="lg:col-span-5 animate-slide-in-right opacity-0 delay-300">
              <div className="relative">
                {/* Terminal window */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs text-zinc-500 font-mono">possible_ai</span>
                  </div>

                  {/* Terminal content */}
                  <div className="p-6 font-mono text-sm">
                    <div className="flex items-center gap-2 text-zinc-500 mb-4">
                      <span className="text-[#9AC32E]">→</span>
                      <span>possible generate --prompt</span>
                    </div>

                    <div className="bg-zinc-800/50 rounded p-4 mb-4 border border-zinc-700">
                      <span className="text-[#04ACC8]">&quot;</span>
                      <span className="text-white">{typedText}</span>
                      <span className="terminal-cursor" />
                      <span className="text-[#04ACC8]">&quot;</span>
                    </div>

                    <div className="space-y-2 text-zinc-400">
                      <p><span className="text-[#9AC32E]">✓</span> Generando imagen con IA...</p>
                      <p><span className="text-[#9AC32E]">✓</span> Convirtiendo a modelo 3D...</p>
                      <p><span className="text-[#04ACC8]">⟳</span> Preparando vista previa...</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#04ACC8]/20 rounded-lg -z-10" />
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#04ACC8]" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#9AC32E]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Marquee */}
      <section className="py-6 border-y border-zinc-800 overflow-hidden bg-zinc-900/50">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {SERVICES.map((service) => (
                <div key={service.title} className="flex items-center gap-3">
                  <span className="text-[#04ACC8]">{service.icon}</span>
                  <span className="text-lg text-zinc-400">{service.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 border border-[#9AC32E]/30 bg-[#9AC32E]/5 text-[#9AC32E] text-sm font-mono tracking-wider mb-6">
              PROCESO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cómo <span className="gradient-text">Funciona</span>?
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              De tu idea a tu puerta en 3 simples pasos
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="group relative bg-zinc-900/50 border border-zinc-800 p-8 hover:border-[#04ACC8]/50 transition-all duration-300 card-industrial"
              >
                {/* Number */}
                <span className="absolute top-4 right-4 text-6xl font-bold text-zinc-800 group-hover:text-[#04ACC8]/20 transition-colors">
                  {step.num}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 flex items-center justify-center mb-6 ${
                  step.color === "cyan" ? "bg-[#04ACC8]/10 text-[#04ACC8]" : "bg-[#9AC32E]/10 text-[#9AC32E]"
                }`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#04ACC8] transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Services Section */}
      <section className="py-32 px-6 lg:px-12 bg-zinc-900/30 border-y border-zinc-800 diagonal-stripes">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Development */}
            <div className="group bg-black border border-zinc-800 p-10 hover:border-[#04ACC8] transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-[#04ACC8]/10 flex items-center justify-center">
                  <Layers className="w-8 h-8 text-[#04ACC8]" />
                </div>
                <ArrowUpRight className="w-6 h-6 text-zinc-600 group-hover:text-[#04ACC8] transition-colors" />
              </div>

              <h3 className="text-2xl font-bold mb-4">Desarrollo de Producto</h3>

              <ul className="space-y-3 text-zinc-400 mb-8">
                {["Diseño Industrial", "Modelado 3D", "Renderizado Fotorrealista", "Animación 3D"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#04ACC8]" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="text-[#04ACC8] hover:text-[#2BC4DD] font-medium inline-flex items-center gap-2 group/link">
                Consultar
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Rapid Prototyping */}
            <div className="group bg-black border border-zinc-800 p-10 hover:border-[#9AC32E] transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-[#9AC32E]/10 flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-[#9AC32E]" />
                </div>
                <ArrowUpRight className="w-6 h-6 text-zinc-600 group-hover:text-[#9AC32E] transition-colors" />
              </div>

              <h3 className="text-2xl font-bold mb-4">Prototipado Rápido</h3>

              <ul className="space-y-3 text-zinc-400 mb-8">
                {["Impresión 3D (FDM, SLA, SLS)", "CNC Milling", "Corte Láser", "Moldes de Silicón"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#9AC32E]" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/create" className="text-[#9AC32E] hover:text-[#BCDC6C] font-medium inline-flex items-center gap-2 group/link">
                Crear ahora
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 border border-[#04ACC8]/30 bg-[#04ACC8]/5 text-[#04ACC8] text-sm font-mono tracking-wider mb-6">
              PRECIOS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple y <span className="gradient-text">Transparente</span>
            </h2>
            <p className="text-zinc-400 text-lg">Sin suscripciones. Paga por impresión.</p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Pequeño", price: "$29", size: "50mm", popular: false },
              { name: "Mediano", price: "$49", size: "75mm", popular: true },
              { name: "Grande", price: "$69", size: "100mm", popular: false },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 border ${
                  plan.popular
                    ? "bg-[#04ACC8]/5 border-[#04ACC8] glow-cyan"
                    : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#04ACC8] text-black text-xs font-bold tracking-wider">
                    POPULAR
                  </div>
                )}

                <div className="font-mono text-xs text-zinc-500 mb-2">// {plan.size} altura</div>
                <h3 className={`text-xl font-semibold mb-1 ${plan.popular ? "text-[#04ACC8]" : ""}`}>
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold mb-1">
                  {plan.price}
                  <span className="text-lg font-normal text-zinc-500"> USD</span>
                </div>
                <p className="text-zinc-500 text-sm mb-6">PLA plástico</p>

                <ul className="space-y-2 text-sm text-zinc-400 mb-8">
                  <li>• Impresión alta definición</li>
                  <li>• Envío 5-7 días</li>
                  <li>• Garantía de calidad</li>
                </ul>

                <Link
                  href="/create"
                  className={`block text-center py-3 font-semibold transition-all ${
                    plan.popular
                      ? "bg-[#04ACC8] text-black hover:bg-[#2BC4DD]"
                      : "border border-zinc-700 hover:border-[#04ACC8] hover:text-[#04ACC8]"
                  }`}
                >
                  Crear
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" className="text-[#04ACC8] hover:text-[#2BC4DD] transition inline-flex items-center gap-2">
              Ver todos los materiales y tamaños
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* For Artists */}
      <section className="py-32 px-6 lg:px-12 border-y border-zinc-800 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04ACC8]/5 via-transparent to-[#9AC32E]/5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 border border-[#9AC32E]/30 bg-[#9AC32E]/5 text-[#9AC32E] text-sm font-mono tracking-wider mb-6">
                PARA ARTISTAS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Consultoría de<br />
                <span className="text-[#9AC32E]">Impresión 3D</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                ¿Eres artista y quieres llevar tus diseños 2D al mundo físico?
                Ofrecemos consultoría personalizada para perfeccionar tus modelos 3D.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Extrae modelos 3D de tu arte 2D",
                  "Optimiza modelos para impresión profesional",
                  "Recomendaciones de material y acabado",
                  "Soporte para producción en series",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-300">
                    <span className="w-2 h-2 bg-[#9AC32E]" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-[#9AC32E] hover:bg-[#BCDC6C] text-black font-semibold px-8 py-4 transition-all duration-300"
              >
                Agenda una Consulta
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quote card */}
            <div className="bg-zinc-900 border border-zinc-800 p-10">
              <div className="text-6xl text-[#9AC32E]/20 mb-4">&ldquo;</div>
              <blockquote className="text-xl text-zinc-300 italic mb-6 leading-relaxed">
                Me ayudaron a convertir mi ilustración en una figura coleccionable impresionante.
                La atención al detalle fue increíble.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#9AC32E]/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#9AC32E]" />
                </div>
                <div>
                  <p className="font-medium">Cliente Artista</p>
                  <p className="text-zinc-500 text-sm">Guadalajara, México</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 md:p-20 border border-[#04ACC8]/30 bg-gradient-to-br from-[#04ACC8]/5 to-[#9AC32E]/5">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#04ACC8]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#04ACC8]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#9AC32E]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#9AC32E]" />

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Listo para <span className="gradient-text">Crear</span>?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              Convierte tu imaginación en un objeto físico. Solo toma unos minutos.
            </p>
            <Link
              href="/create"
              className="group inline-flex items-center gap-3 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-bold px-10 py-5 text-lg transition-all duration-300 glow-cyan animate-pulse-glow"
            >
              <Sparkles className="w-6 h-6" />
              Comenzar Ahora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/possible-logo.png"
                  alt="POSSIBLE Logo"
                  width={36}
                  height={30}
                  className="object-contain"
                />
                <span className="text-xl font-semibold">POSSIBLE</span>
              </div>
              <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
                Tomamos tu idea y le damos forma. Desde 2013.
              </p>
              <p className="text-zinc-600 text-sm font-mono">
                📍 Guadalajara, MX
              </p>

              {/* Social */}
              <div className="flex gap-4 mt-6">
                <a href="https://www.youtube.com/channel/UC8wHbw-EKEYKpRjf8QVA9FA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-[#04ACC8] hover:border-[#04ACC8] transition">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/possibleidgdl/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-[#04ACC8] hover:border-[#04ACC8] transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/possibleidgdl/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-[#04ACC8] hover:border-[#04ACC8] transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Producto", links: ["Crear", "Precios", "FAQ"] },
              { title: "Servicios", links: ["Para Artistas", "Consultoría", "Nosotros"] },
              { title: "Soporte", links: ["Contacto", "Centro de Ayuda"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-6 text-zinc-300">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href={`/${link.toLowerCase().replace(/ /g, "-")}`} className="text-zinc-500 hover:text-white transition text-sm">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-sm font-mono">
              © 2026 POSSIBLE IDEAS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-2 text-zinc-600 text-sm">
              <span className="w-2 h-2 bg-[#04ACC8] animate-pulse" />
              <span className="font-mono">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
