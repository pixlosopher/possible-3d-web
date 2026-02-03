import Link from "next/link";
import { Printer, Users, Palette, Lightbulb, Package, ArrowRight, Check } from "lucide-react";

const SERVICES = [
  {
    icon: Palette,
    title: "2D to 3D Conversion",
    description:
      "We transform your 2D artwork, illustrations, or designs into fully realized 3D models optimized for printing.",
  },
  {
    icon: Lightbulb,
    title: "Design Consulting",
    description:
      "Expert guidance on making your designs printable, including material selection, structural integrity, and finish options.",
  },
  {
    icon: Package,
    title: "Production Support",
    description:
      "From prototyping to small batch production, we handle the entire 3D printing process so you can focus on creating.",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Share Your Vision",
    description: "Send us your artwork, sketches, or ideas. We'll discuss your goals and requirements.",
  },
  {
    step: 2,
    title: "3D Development",
    description: "Our team creates a detailed 3D model, iterating with you until it's perfect.",
  },
  {
    step: 3,
    title: "Prototype & Refine",
    description: "We print a prototype for your review and make any necessary adjustments.",
  },
  {
    step: 4,
    title: "Production",
    description: "Once approved, we produce your final pieces with professional quality.",
  },
];

const TESTIMONIALS = [
  {
    quote: "They turned my character illustration into a stunning collectible figure. The attention to detail was incredible.",
    author: "Maria G.",
    role: "Illustrator",
  },
  {
    quote: "As someone with no 3D experience, their consulting made it possible for me to launch my own figure line.",
    author: "James T.",
    role: "Comic Artist",
  },
  {
    quote: "Professional, patient, and truly understood my artistic vision. Highly recommend for any artist.",
    author: "Sarah K.",
    role: "Sculptor",
  },
];

export default function ArtistsPage() {
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
                Create
              </Link>
              <Link href="/pricing" className="text-zinc-300 hover:text-white transition">
                Pricing
              </Link>
              <Link href="/artists" className="text-[#9AC32E] font-medium">
                For Artists
              </Link>
              <Link href="/contact" className="text-zinc-300 hover:text-white transition">
                Contact
              </Link>
            </div>
            <Link
              href="/contact"
              className="bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-4 py-2 rounded-full transition"
            >
              Get Consulting
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#9AC32E]/10 border border-[#9AC32E]/20 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-[#9AC32E]" />
            <span className="text-[#9AC32E] text-sm font-medium">For Artists & Creators</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bring Your Art to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04ACC8] to-[#9AC32E]">
              Life in 3D
            </span>
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Personalized consulting for artists who want to transform their 2D creations
            into stunning 3D printed collectibles, figures, and art pieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#process"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-zinc-400">Comprehensive support for artists at every stage</p>
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
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-zinc-400">A collaborative process from concept to creation</p>
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
            <h2 className="text-3xl font-bold mb-4">What Artists Say</h2>
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
              Consulting Package Includes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Initial consultation call",
                "Design feasibility analysis",
                "3D model development",
                "Unlimited revisions",
                "Prototype printing",
                "Material recommendations",
                "Production guidance",
                "Ongoing support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#9AC32E] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-zinc-400 mb-4">
                Pricing varies based on project complexity. Contact us for a custom quote.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-8 py-4 rounded-full transition"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Art?</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Let&apos;s discuss your vision and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#9AC32E] hover:bg-[#BCDC6C] text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition"
            >
              Try Self-Service First
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
