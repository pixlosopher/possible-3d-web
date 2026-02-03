"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Printer, CheckCircle, Package, Truck, Mail } from "lucide-react";

interface OrderDetails {
  id: string;
  job_id: string;
  customer_email: string;
  size: string;
  material: string;
  price_cents: number;
  status: string;
  created_at: string;
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#04ACC8] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-zinc-400">Loading...</p>
      </div>
    </div>
  );
}

// Inner component that uses useSearchParams
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/order/${orderId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order");
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
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#04ACC8] to-[#9AC32E] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold">POSSIBLE</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-[#04ACC8] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-zinc-400">Loading order details...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="text-red-400 mb-4">{error}</div>
            <Link href="/" className="text-[#04ACC8] hover:text-emerald-300">
              Return to home
            </Link>
          </div>
        ) : (
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#04ACC8]/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-[#04ACC8]" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-zinc-400 text-lg mb-8">
              Thank you for your order. We&apos;ve received your payment and will start
              processing your 3D print right away.
            </p>

            {/* Order Details Card */}
            {order && (
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 text-left mb-8">
                <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Order ID</span>
                    <span className="font-mono">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Size</span>
                    <span className="capitalize">{order.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Material</span>
                    <span className="uppercase">{order.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Email</span>
                    <span>{order.customer_email}</span>
                  </div>
                  <div className="border-t border-zinc-700 pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total Paid</span>
                      <span className="text-[#04ACC8]">
                        ${(order.price_cents / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 text-left mb-8">
              <h2 className="text-lg font-semibold mb-4">What&apos;s Next?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#04ACC8] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-black" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-zinc-400">Your payment has been processed</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-zinc-400" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-400">Printing</p>
                    <p className="text-sm text-zinc-500">Your model is being 3D printed (2-5 days)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-zinc-400" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-400">Shipping</p>
                    <p className="text-sm text-zinc-500">Shipped to your address (3-7 days)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-zinc-400" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-400">Updates</p>
                    <p className="text-sm text-zinc-500">We&apos;ll email you with tracking info</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/create"
                className="block w-full bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold py-4 rounded-xl transition text-center"
              >
                Create Another Model
              </Link>
              <Link
                href="/"
                className="block w-full text-zinc-400 hover:text-white transition py-2 text-center"
              >
                Return to Home
              </Link>
            </div>
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
