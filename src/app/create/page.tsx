"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Printer, ArrowLeft, ShoppingCart } from "lucide-react";
import Generator from "@/components/Generator";
import PricingSelector from "@/components/PricingSelector";
import { JobStatus } from "@/lib/api";

// Dynamic import for 3D preview (client-side only)
const ModelPreview = dynamic(() => import("@/components/ModelPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square bg-zinc-900 rounded-2xl border border-zinc-700 flex items-center justify-center">
      <div className="text-zinc-500">Cargando visor 3D...</div>
    </div>
  ),
});

type Step = "generate" | "customize" | "checkout";

export default function CreatePage() {
  const [step, setStep] = useState<Step>("generate");
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>("medium");
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>("pla");
  const [price, setPrice] = useState(49);

  const handleGenerationComplete = (status: JobStatus) => {
    setJobStatus(status);
    setStep("customize");
  };

  const handlePricingSelect = (size: string, material: string, newPrice: number) => {
    setSelectedSize(size);
    setSelectedMaterial(material);
    setPrice(newPrice);
  };

  const handleProceedToCheckout = () => {
    setStep("checkout");
  };

  // Get preview URLs from job status
  const imageUrl = jobStatus?.image_path
    ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${jobStatus.image_path}`
    : null;
  const modelUrl = jobStatus?.mesh_path
    ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${jobStatus.mesh_path}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
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
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                step === "generate" ? "text-[#04ACC8]" : "text-zinc-500"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === "generate"
                    ? "bg-[#04ACC8] text-black"
                    : jobStatus
                    ? "bg-[#04ACC8]/20 text-[#04ACC8]"
                    : "bg-zinc-800"
                }`}
              >
                1
              </span>
              <span className="hidden sm:inline">Generar</span>
            </div>
            <div className="w-12 h-px bg-zinc-700" />
            <div
              className={`flex items-center gap-2 ${
                step === "customize" ? "text-[#04ACC8]" : "text-zinc-500"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === "customize"
                    ? "bg-[#04ACC8] text-black"
                    : step === "checkout"
                    ? "bg-[#04ACC8]/20 text-[#04ACC8]"
                    : "bg-zinc-800"
                }`}
              >
                2
              </span>
              <span className="hidden sm:inline">Personalizar</span>
            </div>
            <div className="w-12 h-px bg-zinc-700" />
            <div
              className={`flex items-center gap-2 ${
                step === "checkout" ? "text-[#04ACC8]" : "text-zinc-500"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === "checkout" ? "bg-[#04ACC8] text-black" : "bg-zinc-800"
                }`}
              >
                3
              </span>
              <span className="hidden sm:inline">Pagar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - 3D Preview */}
          <div className="order-2 lg:order-1">
            <ModelPreview modelUrl={modelUrl} imageUrl={imageUrl} />
            {jobStatus && (
              <div className="mt-4 bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Tu Diseño</h3>
                <p className="text-white">{jobStatus.description}</p>
              </div>
            )}
          </div>

          {/* Right Column - Controls */}
          <div className="order-1 lg:order-2">
            {step === "generate" && (
              <div>
                <h1 className="text-3xl font-bold mb-2">Crea Tu Modelo 3D</h1>
                <p className="text-zinc-400 mb-8">
                  Describe lo que quieres crear, y nuestra IA generará un modelo 3D único para ti.
                </p>
                <Generator onComplete={handleGenerationComplete} />
              </div>
            )}

            {step === "customize" && (
              <div>
                <h1 className="text-3xl font-bold mb-2">Personaliza Tu Impresión</h1>
                <p className="text-zinc-400 mb-8">
                  Elige el tamaño y material para tu impresión 3D.
                </p>
                <PricingSelector
                  onSelect={handlePricingSelect}
                  selectedSize={selectedSize}
                  selectedMaterial={selectedMaterial}
                />
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold py-4 rounded-xl transition"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Proceder al Pago - ${price} USD
                  </button>
                  <button
                    onClick={() => setStep("generate")}
                    className="w-full text-zinc-400 hover:text-white transition py-2"
                  >
                    ← Generar un modelo diferente
                  </button>
                </div>
              </div>
            )}

            {step === "checkout" && (
              <div>
                <h1 className="text-3xl font-bold mb-2">Completa Tu Pedido</h1>
                <p className="text-zinc-400 mb-8">
                  Ingresa tus datos de envío e información de pago.
                </p>
                <CheckoutForm
                  jobId={jobStatus?.id || ""}
                  size={selectedSize || "medium"}
                  material={selectedMaterial || "pla"}
                  price={price}
                  onBack={() => setStep("customize")}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Checkout Form Component
function CheckoutForm({
  jobId,
  size,
  material,
  price,
  onBack,
}: {
  jobId: string;
  size: string;
  material: string;
  price: number;
  onBack: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("MX");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          email,
          size,
          material,
          shipping_address: { name, address, city, state, zip, country },
          provider: "stripe",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la sesión de pago");
      }

      // Redirect to Stripe Checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("No se recibió URL de pago");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el pago");
      setIsProcessing(false);
    }
  };

  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          email,
          size,
          material,
          shipping_address: { name, address, city, state, zip, country },
          provider: "paypal",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear pago con PayPal");
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("No se recibió URL de PayPal");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en pago con PayPal");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleStripeCheckout} className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@correo.com"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
        />
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dirección de Envío</h3>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nombre Completo"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          />
        </div>
        <div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Calle y Número"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="Ciudad"
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          />
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="Estado"
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
            placeholder="Código Postal"
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          >
            <option value="MX">México</option>
            <option value="US">Estados Unidos</option>
            <option value="CA">Canadá</option>
            <option value="CO">Colombia</option>
            <option value="AR">Argentina</option>
            <option value="ES">España</option>
          </select>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
        <h3 className="font-semibold mb-3">Resumen del Pedido</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Impresión 3D ({size}, {material})</span>
            <span>${price} USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Envío</span>
            <span className="text-[#04ACC8]">GRATIS</span>
          </div>
          <div className="border-t border-zinc-700 pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-[#04ACC8]">${price} USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Buttons */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={isProcessing || !email || !name || !address}
          className="w-full flex items-center justify-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesando...
            </>
          ) : (
            `Pagar $${price} USD con Tarjeta`
          )}
        </button>
        <button
          type="button"
          onClick={handlePayPalCheckout}
          disabled={isProcessing || !email || !name || !address}
          className="w-full flex items-center justify-center gap-2 bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pagar con PayPal
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="w-full text-zinc-400 hover:text-white transition py-2 disabled:opacity-50"
        >
          ← Volver a personalización
        </button>
      </div>

      {/* Test Card Info */}
      <div className="text-xs text-zinc-500 text-center">
        <p>Modo prueba: Usa el número de tarjeta 4242 4242 4242 4242</p>
      </div>
    </form>
  );
}
