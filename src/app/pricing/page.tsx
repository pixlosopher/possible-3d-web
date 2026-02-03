import Link from "next/link";
import { Printer, ArrowRight, Check } from "lucide-react";

const PRICING_DATA = [
  {
    size: "Small",
    height: "50mm",
    description: "Perfect for desk figurines",
    materials: [
      { name: "PLA Plastic", price: 29, features: ["Durable", "Matte finish", "Ships in 5-7 days"] },
      { name: "Premium Resin", price: 39, features: ["High detail", "Smooth finish", "Ships in 7-10 days"] },
    ],
  },
  {
    size: "Medium",
    height: "75mm",
    description: "Ideal for collectibles",
    popular: true,
    materials: [
      { name: "PLA Plastic", price: 49, features: ["Durable", "Matte finish", "Ships in 5-7 days"] },
      { name: "Premium Resin", price: 59, features: ["High detail", "Smooth finish", "Ships in 7-10 days"] },
    ],
  },
  {
    size: "Large",
    height: "100mm",
    description: "Statement pieces",
    materials: [
      { name: "PLA Plastic", price: 69, features: ["Durable", "Matte finish", "Ships in 7-10 days"] },
      { name: "Premium Resin", price: 89, features: ["High detail", "Smooth finish", "Ships in 10-14 days"] },
    ],
  },
];

const FAQ = [
  {
    q: "How does AI-generated 3D printing work?",
    a: "Simply describe what you want to create in plain English. Our AI generates a unique 2D concept, converts it to a 3D model, and we professionally print and ship it to you.",
  },
  {
    q: "What materials do you use?",
    a: "We offer PLA plastic for durable, affordable prints, and premium resin for high-detail pieces with smooth finishes. Both are safe and long-lasting.",
  },
  {
    q: "How long does shipping take?",
    a: "Production takes 3-5 business days. Shipping is free and takes 5-7 additional days within the US. International shipping is available at checkout.",
  },
  {
    q: "Can I get a custom size or material?",
    a: "Yes! Contact us for custom orders including larger sizes, special materials, or bulk quantities. We also offer consulting for artists.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "We offer a 100% satisfaction guarantee. If your print doesn't meet expectations, we'll remake it or refund your order.",
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
                Create
              </Link>
              <Link href="/pricing" className="text-[#04ACC8] font-medium">
                Pricing
              </Link>
              <Link href="/artists" className="text-zinc-300 hover:text-white transition">
                For Artists
              </Link>
              <Link href="/contact" className="text-zinc-300 hover:text-white transition">
                Contact
              </Link>
            </div>
            <Link
              href="/create"
              className="bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-4 py-2 rounded-full transition"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          No subscriptions. No hidden fees. Pay per print with free shipping included.
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
                    Most Popular
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
                        <span className="text-2xl font-bold">${material.price}</span>
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
                  Create {tier.size} Print
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
          <h2 className="text-3xl font-bold mb-8">Every Order Includes</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "AI Generation", desc: "Unlimited revisions" },
              { label: "3D Preview", desc: "View before ordering" },
              { label: "Free Shipping", desc: "US orders" },
              { label: "Satisfaction Guarantee", desc: "100% money back" },
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
            Frequently Asked Questions
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
          <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-zinc-400 mb-8">
            Turn your imagination into reality. Free preview, no commitment.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold px-8 py-4 rounded-full text-lg transition"
          >
            Start Creating Now
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
