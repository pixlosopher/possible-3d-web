"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";

interface OrderDetails {
  id: string;
  job_id: string;
  customer_email: string;
  size: string;
  material: string;
  price_cents: number;
  status: string;
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#04ACC8] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-zinc-400">Procesando tu pedido...</p>
      </div>
    </div>
  );
}

// Inner component that uses useSearchParams
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const provider = searchParams.get("provider");
  const paymentId = searchParams.get("paymentId");
  const payerId = searchParams.get("PayerID");

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If PayPal redirect, execute payment first
    if (provider === "paypal" && paymentId && payerId) {
      executePayPalPayment();
    } else if (orderId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId, provider, paymentId, payerId]);

  // Execute PayPal payment after user approval
  const executePayPalPayment = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/paypal/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          payerId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al ejecutar pago de PayPal");
      }

      // Payment successful, now fetch order details
      if (data.order_id) {
        const orderResponse = await fetch(`${API_URL}/api/order/${data.order_id}`);
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          setOrder(orderData);
        }
      }
    } catch (err) {
      console.error("PayPal execution error:", err);
      setError(err instanceof Error ? err.message : "Error en pago PayPal");
    } finally {
      setLoading(false);
    }
  };

  // Auto-redirect countdown
  useEffect(() => {
    if (!loading && order && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && (orderId || order?.id)) {
      router.push(`/order/${orderId || order?.id}`);
    }
  }, [countdown, loading, order, orderId, router]);

  const fetchOrderDetails = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/order/${orderId}`);

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del pedido");
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-[#04ACC8] border-t-transparent rounded-full mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">
              {provider === "paypal" ? "Procesando pago de PayPal..." : "Procesando tu pago..."}
            </h2>
            <p className="text-zinc-400">Por favor espera un momento</p>
          </div>
        ) : error ? (
          <div className="text-center">
            {/* Error State */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-red-400">Error en el Pago</h1>
            <p className="text-zinc-400 mb-8">{error}</p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold py-4 px-8 rounded-xl transition"
            >
              Intentar de Nuevo
            </Link>
          </div>
        ) : (
          <div className="text-center">
            {/* Success Animation */}
            <div className="mb-8 relative">
              <div className="w-24 h-24 bg-[#04ACC8]/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle className="w-16 h-16 text-[#04ACC8]" />
              </div>
              {/* Sparkles */}
              <Sparkles className="w-6 h-6 text-yellow-400 absolute top-0 right-1/3 animate-bounce" />
              <Sparkles className="w-4 h-4 text-purple-400 absolute bottom-4 left-1/3 animate-bounce delay-100" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold mb-4">
              ¡Pago Confirmado!
            </h1>
            <p className="text-xl text-zinc-300 mb-2">
              Gracias por tu compra {provider === "paypal" && "con PayPal"}
            </p>
            <p className="text-zinc-400 mb-8">
              Tu modelo 3D está siendo generado ahora mismo
            </p>

            {/* Order Summary */}
            {order && (
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 text-left mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">Pedido</span>
                  <span className="font-mono font-bold text-lg">#{order.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-[#04ACC8] font-bold text-xl">
                    ${(order.price_cents / 100).toFixed(2)} USD
                  </span>
                </div>
              </div>
            )}

            {/* Redirect Notice */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-8">
              <p className="text-purple-300">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Redirigiendo al visor 3D en <span className="font-bold">{countdown}</span> segundos...
              </p>
            </div>

            {/* Manual Navigation */}
            <Link
              href={orderId ? `/order/${orderId}` : "/"}
              className="inline-flex items-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold py-4 px-8 rounded-xl transition"
            >
              Ver Mi Modelo 3D
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

// Main export wrapped in Suspense
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
