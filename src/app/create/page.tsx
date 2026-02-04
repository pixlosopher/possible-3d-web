"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowLeft, ShoppingCart, AlertCircle, Info } from "lucide-react";
import Generator from "@/components/Generator";
import PricingSelector from "@/components/PricingSelector";
import { JobStatus, createCheckout, getImageUrl } from "@/lib/api";

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
  const [selectedSize, setSelectedSize] = useState<string>("medium");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("plastic_white");
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState(52); // Default price for plastic_white + medium

  const handleGenerationComplete = (status: JobStatus) => {
    setJobStatus(status);
    setStep("customize");
  };

  const handlePricingSelect = (
    size: string,
    material: string,
    color: string | undefined,
    newPrice: number
  ) => {
    setSelectedSize(size);
    setSelectedMaterial(material);
    setSelectedColor(color);
    setPrice(Math.round(newPrice / 100)); // Convert cents to dollars
  };

  const handleProceedToCheckout = () => {
    setStep("checkout");
  };

  // Get preview URLs from job status
  const imageUrl = jobStatus?.image_path ? getImageUrl(jobStatus.image_path) : null;
  const modelUrl = jobStatus?.mesh_path ? getImageUrl(jobStatus.mesh_path) : null;

  // Check if this is a concept-only job (no 3D yet)
  const isConceptOnly = jobStatus?.concept_only || jobStatus?.status === "concept_ready";

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
          {/* Left Column - Preview */}
          <div className="order-2 lg:order-1">
            {isConceptOnly ? (
              // Show 2D concept image for concept-only jobs
              <div className="w-full aspect-square bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Concepto generado"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500">
                    Vista previa del concepto
                  </div>
                )}
              </div>
            ) : (
              // Show 3D model preview for full jobs
              <ModelPreview modelUrl={modelUrl} imageUrl={imageUrl} />
            )}

            {jobStatus && (
              <div className="mt-4 bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Tu Diseno</h3>
                <p className="text-white">{jobStatus.description || "Modelo generado"}</p>
                {isConceptOnly && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-amber-400/80 bg-amber-500/10 rounded-lg p-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Este es un concepto 2D. El modelo 3D final se generara despues de confirmar tu compra.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Controls */}
          <div className="order-1 lg:order-2">
            {step === "generate" && (
              <div>
                <h1 className="text-3xl font-bold mb-2">Crea Tu Modelo 3D</h1>
                <p className="text-zinc-400 mb-8">
                  Describe lo que quieres crear, y nuestra IA generara un concepto unico para ti.
                </p>
                <Generator onComplete={handleGenerationComplete} />
              </div>
            )}

            {step === "customize" && (
              <div>
                <h1 className="text-3xl font-bold mb-2">Personaliza Tu Impresion</h1>
                <p className="text-zinc-400 mb-8">
                  Elige el tamano, material y color para tu impresion 3D.
                </p>
                <PricingSelector
                  onSelect={handlePricingSelect}
                  selectedSize={selectedSize}
                  selectedMaterial={selectedMaterial}
                  selectedColor={selectedColor || null}
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
                    Generar un modelo diferente
                  </button>
                </div>
              </div>
            )}

            {step === "checkout" && (
              <div>
                <h1 className="text-3xl font-bold mb-2">Completa Tu Pedido</h1>
                <p className="text-zinc-400 mb-8">
                  Ingresa tus datos de envio e informacion de pago.
                </p>
                <CheckoutForm
                  jobId={jobStatus?.id || ""}
                  size={selectedSize}
                  material={selectedMaterial}
                  color={selectedColor}
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
  color,
  price,
  onBack,
}: {
  jobId: string;
  size: string;
  material: string;
  color?: string;
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
      const data = await createCheckout(
        jobId,
        email,
        size,
        material,
        color,
        "detailed", // mesh_style
        { name, address, city, state, zip, country }
      );

      // Redirect to Stripe Checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("No se recibio URL de pago");
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
          color,
          mesh_style: "detailed",
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
        throw new Error("No se recibio URL de PayPal");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en pago con PayPal");
      setIsProcessing(false);
    }
  };

  // Format material name for display
  const getMaterialName = (key: string) => {
    const names: Record<string, string> = {
      plastic_white: "Plastico Blanco",
      plastic_color: "Plastico Color",
      resin_premium: "Resina Premium",
      full_color: "Full Color",
      metal_steel: "Acero Inoxidable",
    };
    return names[key] || key;
  };

  // Format size name for display
  const getSizeName = (key: string) => {
    const names: Record<string, string> = {
      mini: "Mini (50mm)",
      small: "Pequeno (80mm)",
      medium: "Mediano (120mm)",
      large: "Grande (180mm)",
      xl: "XL (250mm)",
    };
    return names[key] || key;
  };

  return (
    <form onSubmit={handleStripeCheckout} className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Correo Electronico
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
        <h3 className="text-lg font-semibold">Direccion de Envio</h3>
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
            placeholder="Calle y Numero"
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
            placeholder="Codigo Postal"
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#04ACC8]"
          >
            <option value="MX">Mexico</option>
            <option value="US">Estados Unidos</option>
            <option value="CA">Canada</option>
            <option value="CO">Colombia</option>
            <option value="AR">Argentina</option>
            <option value="CL">Chile</option>
            <option value="BR">Brasil</option>
            <option value="ES">Espana</option>
            <option value="DE">Alemania</option>
            <option value="FR">Francia</option>
            <option value="GB">Reino Unido</option>
            <option value="IT">Italia</option>
            <option value="JP">Japon</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
        <h3 className="font-semibold mb-3">Resumen del Pedido</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Tamano</span>
            <span>{getSizeName(size)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Material</span>
            <span>{getMaterialName(material)}</span>
          </div>
          {color && (
            <div className="flex justify-between">
              <span className="text-zinc-400">Color</span>
              <span className="capitalize">{color}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-zinc-400">Envio Internacional</span>
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

      {/* Info about 3D generation */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm text-blue-300">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Al completar el pago, generaremos tu modelo 3D personalizado y lo enviaremos a produccion.
            Recibiras actualizaciones por correo electronico.
          </span>
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
          Volver a personalizacion
        </button>
      </div>

      {/* Test Card Info */}
      <div className="text-xs text-zinc-500 text-center">
        <p>Modo prueba: Usa el numero de tarjeta 4242 4242 4242 4242</p>
      </div>
    </form>
  );
}
