"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Printer, CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";

interface OrderDetails {
  id: string;
  job_id: string;
  customer_email: string;
  size: string;
  material: string;
  price_cents: number;
  status: string;
  created_at: string;
  paid_at: string | null;
  shipped_at: string | null;
  tracking_number: string | null;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: "Pending Payment",
    icon: <Clock className="w-5 h-5" />,
    color: "text-yellow-400",
  },
  paid: {
    label: "Payment Received",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-[#04ACC8]",
  },
  processing: {
    label: "Printing",
    icon: <Package className="w-5 h-5" />,
    color: "text-blue-400",
  },
  shipped: {
    label: "Shipped",
    icon: <Truck className="w-5 h-5" />,
    color: "text-purple-400",
  },
  delivered: {
    label: "Delivered",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-[#04ACC8]",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle className="w-5 h-5" />,
    color: "text-red-400",
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/order/${orderId}`);

      if (!response.ok) {
        throw new Error("Order not found");
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const status = order ? statusConfig[order.status] || statusConfig.pending : null;

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
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
            <p className="text-zinc-400 mb-8">{error}</p>
            <Link href="/" className="text-[#04ACC8] hover:text-emerald-300">
              Return to home
            </Link>
          </div>
        ) : order ? (
          <div>
            {/* Order Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
              <div className={`flex items-center justify-center gap-2 ${status?.color}`}>
                {status?.icon}
                <span className="font-medium">{status?.label}</span>
              </div>
            </div>

            {/* Order Details Card */}
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 mb-8">
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
                <div className="flex justify-between">
                  <span className="text-zinc-400">Order Date</span>
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                {order.tracking_number && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tracking Number</span>
                    <span className="font-mono text-[#04ACC8]">{order.tracking_number}</span>
                  </div>
                )}
                <div className="border-t border-zinc-700 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#04ACC8]">
                      ${(order.price_cents / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
              <div className="space-y-4">
                <TimelineItem
                  completed={true}
                  label="Order Placed"
                  description={new Date(order.created_at).toLocaleString()}
                />
                <TimelineItem
                  completed={!!order.paid_at}
                  label="Payment Confirmed"
                  description={order.paid_at ? new Date(order.paid_at).toLocaleString() : "Pending"}
                />
                <TimelineItem
                  completed={order.status === "processing" || order.status === "shipped" || order.status === "delivered"}
                  label="Printing"
                  description="Your model is being 3D printed"
                />
                <TimelineItem
                  completed={order.status === "shipped" || order.status === "delivered"}
                  label="Shipped"
                  description={order.shipped_at ? new Date(order.shipped_at).toLocaleString() : "Pending"}
                />
                <TimelineItem
                  completed={order.status === "delivered"}
                  label="Delivered"
                  description="Package delivered"
                />
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
        ) : null}
      </main>
    </div>
  );
}

function TimelineItem({
  completed,
  label,
  description,
}: {
  completed: boolean;
  label: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed ? "bg-[#04ACC8]" : "bg-zinc-700"
          }`}
        >
          {completed ? (
            <CheckCircle className="w-5 h-5 text-black" />
          ) : (
            <Clock className="w-5 h-5 text-zinc-400" />
          )}
        </div>
      </div>
      <div>
        <p className={`font-medium ${completed ? "text-white" : "text-zinc-400"}`}>
          {label}
        </p>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
