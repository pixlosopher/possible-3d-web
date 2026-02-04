"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Printer,
  CheckCircle,
  Clock,
  Package,
  Truck,
  XCircle,
  Download,
  RotateCw,
  CreditCard,
  Box,
  Sparkles,
} from "lucide-react";

// Stage type for order status tracking
type Stage = "loading" | "awaiting_payment" | "paid" | "generating_3d" | "model_ready" | "printing" | "shipped" | "delivered" | "failed";

// Dynamically import ModelViewer to avoid SSR issues with Three.js
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-zinc-800 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#04ACC8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-zinc-400">Cargando visor 3D...</p>
      </div>
    </div>
  ),
});

interface OrderDetails {
  id: string;
  job_id: string;
  customer_email: string;
  size: string;
  material: string;
  color: string | null;
  price_cents: number;
  price_display: string;
  status: string;
  created_at: string;
  paid_at: string | null;
  shipped_at: string | null;
  tracking_number: string | null;
  shipping_address: {
    name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
}

interface JobDetails {
  id: string;
  status: string;
  progress: number;
  description: string;
  image_path: string | null;
  image_url: string | null;
  mesh_path: string | null;
  mesh_url: string | null;
  error_message: string | null;
  concept_only: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Job status to display info mapping
const jobStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Iniciando...", color: "text-yellow-400" },
  generating_image: { label: "Generando concepto 2D...", color: "text-blue-400" },
  concept_ready: { label: "Concepto listo", color: "text-green-400" },
  converting_3d: { label: "Generando modelo 3D...", color: "text-purple-400" },
  completed: { label: "Modelo 3D listo", color: "text-[#04ACC8]" },
  failed: { label: "Error en generación", color: "text-red-400" },
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order details
  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/order/${orderId}`);
      if (!response.ok) throw new Error("Pedido no encontrado");
      const data = await response.json();
      setOrder(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el pedido");
      return null;
    }
  }, [orderId]);

  // Fetch job details
  const fetchJobDetails = useCallback(async (jobId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/jobs/${jobId}`);
      if (!response.ok) return null;
      const data = await response.json();
      setJob(data);
      return data;
    } catch {
      return null;
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (orderId) {
      const loadData = async () => {
        const orderData = await fetchOrderDetails();
        if (orderData?.job_id) {
          await fetchJobDetails(orderData.job_id);
        }
        setLoading(false);
      };
      loadData();
    }
  }, [orderId, fetchOrderDetails, fetchJobDetails]);

  // Poll for updates when job is in progress
  useEffect(() => {
    if (!job || !order) return;

    const isInProgress = ["pending", "generating_image", "converting_3d"].includes(job.status);

    if (isInProgress) {
      const interval = setInterval(async () => {
        await fetchJobDetails(order.job_id);
      }, 3000); // Poll every 3 seconds

      return () => clearInterval(interval);
    }
  }, [job, order, fetchJobDetails]);

  // Determine what stage we're in
  const getStage = (): Stage => {
    if (!order || !job) return "loading";
    if (order.status === "pending") return "awaiting_payment";
    if (job.status === "converting_3d") return "generating_3d";
    if (job.status === "completed" && job.mesh_path) return "model_ready";
    if (job.status === "failed") return "failed";
    if (order.status === "processing") return "printing";
    if (order.status === "shipped") return "shipped";
    if (order.status === "delivered") return "delivered";
    return "paid";
  };

  const stage: Stage = getStage();

  // Build mesh URL for viewer - prioritize local path to avoid CORS issues
  const getMeshUrl = () => {
    if (job?.mesh_path) return `${API_URL}${job.mesh_path}`;
    if (job?.mesh_url) return job.mesh_url;
    return null;
  };

  const meshUrl = getMeshUrl();

  // Build image URL
  const getImageUrl = () => {
    if (job?.image_url) return job.image_url;
    if (job?.image_path) return `${API_URL}${job.image_path}`;
    return null;
  };

  const imageUrl = getImageUrl();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#04ACC8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Cargando tu pedido...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Pedido No Encontrado</h1>
          <p className="text-zinc-400 mb-8">{error}</p>
          <Link href="/" className="text-[#04ACC8] hover:text-emerald-300">
            Volver al inicio
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Pedido #{order.id}</h1>
          <p className="text-zinc-400">
            {order.customer_email}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Viewer/Image */}
          <div className="space-y-6">
            {/* 3D Viewer or Image Preview */}
            {stage === "generating_3d" ? (
              <GeneratingProgress job={job} />
            ) : stage === "model_ready" && meshUrl ? (
              <div className="space-y-4">
                <div className="h-[400px] rounded-2xl overflow-hidden border border-zinc-700">
                  <ModelViewer modelUrl={meshUrl} />
                </div>
                <div className="flex gap-3">
                  <a
                    href={meshUrl}
                    download
                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 py-3 rounded-xl transition"
                  >
                    <Download className="w-5 h-5" />
                    <span>Descargar GLB</span>
                  </a>
                </div>
              </div>
            ) : imageUrl ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-700">
                <Image
                  src={imageUrl}
                  alt="Concepto 2D"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Box className="w-16 h-16 text-zinc-600" />
              </div>
            )}
          </div>

          {/* Right Column - Status & Details */}
          <div className="space-y-6">
            {/* Current Status Card */}
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#04ACC8]" />
                Estado Actual
              </h2>
              <CurrentStatus stage={stage} job={job} order={order} />
            </div>

            {/* Order Timeline */}
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Progreso del Pedido</h2>
              <OrderTimeline stage={stage} order={order} job={job} />
            </div>

            {/* Order Details */}
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Detalles</h2>
              <div className="space-y-3 text-sm">
                <DetailRow label="Tamaño" value={order.size} />
                <DetailRow label="Material" value={order.material.replace("_", " ")} />
                {order.color && <DetailRow label="Color" value={order.color} />}
                <DetailRow
                  label="Fecha"
                  value={new Date(order.created_at).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />
                {order.tracking_number && (
                  <DetailRow
                    label="Rastreo"
                    value={order.tracking_number}
                    highlight
                  />
                )}
                <div className="border-t border-zinc-700 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#04ACC8]">{order.price_display}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shipping_address && (
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Dirección de Envío
                </h2>
                <div className="text-sm text-zinc-300">
                  <p className="font-medium">{order.shipping_address.name}</p>
                  <p>{order.shipping_address.address_line1}</p>
                  {order.shipping_address.address_line2 && (
                    <p>{order.shipping_address.address_line2}</p>
                  )}
                  <p>
                    {order.shipping_address.city}, {order.shipping_address.state}{" "}
                    {order.shipping_address.postal_code}
                  </p>
                  <p>{order.shipping_address.country}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/create"
            className="flex items-center justify-center gap-2 bg-[#04ACC8] hover:bg-[#2BC4DD] text-black font-semibold py-4 px-8 rounded-xl transition"
          >
            <Sparkles className="w-5 h-5" />
            Crear Otro Modelo
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-zinc-600 hover:border-zinc-500 py-4 px-8 rounded-xl transition text-zinc-300 hover:text-white"
          >
            Volver al Inicio
          </Link>
        </div>
      </main>
    </div>
  );
}

// Header Component
function Header() {
  return (
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
  );
}

// Generating Progress Component
function GeneratingProgress({ job }: { job: JobDetails | null }) {
  const progress = job?.progress || 0;
  const statusInfo = job ? jobStatusConfig[job.status] : null;

  return (
    <div className="aspect-square rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center p-8">
      <div className="text-center w-full max-w-xs">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-zinc-700"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="text-[#04ACC8]"
              strokeDasharray={`${progress * 3.52} 352`}
            />
          </svg>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Box className="w-12 h-12 text-[#04ACC8] animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{progress}%</h3>
        <p className={`font-medium ${statusInfo?.color || "text-zinc-400"}`}>
          {statusInfo?.label || "Procesando..."}
        </p>
        <p className="text-sm text-zinc-500 mt-2">
          Esto puede tomar 1-3 minutos
        </p>
      </div>
    </div>
  );
}

// Current Status Component
function CurrentStatus({
  stage,
  job,
  order,
}: {
  stage: string;
  job: JobDetails | null;
  order: OrderDetails;
}) {
  const configs: Record<string, { icon: React.ReactNode; title: string; description: string; color: string }> = {
    loading: {
      icon: <Clock className="w-8 h-8" />,
      title: "Cargando...",
      description: "Obteniendo información del pedido",
      color: "text-zinc-400",
    },
    awaiting_payment: {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Esperando Pago",
      description: "Completa el pago para iniciar la producción",
      color: "text-yellow-400",
    },
    paid: {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Pago Confirmado",
      description: "Tu modelo está en cola para generación 3D",
      color: "text-green-400",
    },
    generating_3d: {
      icon: <RotateCw className="w-8 h-8 animate-spin" />,
      title: "Generando Modelo 3D",
      description: `Progreso: ${job?.progress || 0}%`,
      color: "text-purple-400",
    },
    model_ready: {
      icon: <Box className="w-8 h-8" />,
      title: "Modelo 3D Listo",
      description: "Puedes ver y descargar tu modelo",
      color: "text-[#04ACC8]",
    },
    printing: {
      icon: <Printer className="w-8 h-8" />,
      title: "Imprimiendo",
      description: "Tu modelo está siendo impreso (2-5 días)",
      color: "text-blue-400",
    },
    shipped: {
      icon: <Truck className="w-8 h-8" />,
      title: "Enviado",
      description: order.tracking_number
        ? `Rastreo: ${order.tracking_number}`
        : "En camino a tu dirección",
      color: "text-purple-400",
    },
    delivered: {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Entregado",
      description: "Tu pedido ha sido entregado",
      color: "text-[#04ACC8]",
    },
    failed: {
      icon: <XCircle className="w-8 h-8" />,
      title: "Error",
      description: job?.error_message || "Hubo un problema con tu pedido",
      color: "text-red-400",
    },
  };

  const config = configs[stage] || configs.loading;

  return (
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full bg-zinc-700/50 ${config.color}`}>
        {config.icon}
      </div>
      <div>
        <h3 className={`font-bold text-lg ${config.color}`}>{config.title}</h3>
        <p className="text-sm text-zinc-400">{config.description}</p>
      </div>
    </div>
  );
}

// Order Timeline Component
function OrderTimeline({
  stage,
  order,
  job,
}: {
  stage: string;
  order: OrderDetails;
  job: JobDetails | null;
}) {
  const stages = [
    { key: "paid", label: "Pago Confirmado", icon: CreditCard },
    { key: "generating_3d", label: "Modelo 3D Generado", icon: Box },
    { key: "printing", label: "Imprimiendo", icon: Printer },
    { key: "shipped", label: "Enviado", icon: Truck },
    { key: "delivered", label: "Entregado", icon: CheckCircle },
  ];

  const stageOrder = ["awaiting_payment", "paid", "generating_3d", "model_ready", "printing", "shipped", "delivered"];
  const currentIndex = stageOrder.indexOf(stage);

  const isCompleted = (stageKey: string) => {
    const keyIndex = stageOrder.indexOf(stageKey);
    // model_ready counts as generating_3d completed
    if (stageKey === "generating_3d" && (stage === "model_ready" || currentIndex > stageOrder.indexOf("model_ready"))) {
      return true;
    }
    return currentIndex > keyIndex;
  };

  const isCurrent = (stageKey: string) => {
    if (stageKey === "generating_3d" && stage === "model_ready") return false;
    if (stageKey === "generating_3d" && stage === "generating_3d") return true;
    return stage === stageKey;
  };

  return (
    <div className="space-y-4">
      {stages.map((s, index) => {
        const Icon = s.icon;
        const completed = isCompleted(s.key);
        const current = isCurrent(s.key);

        return (
          <div key={s.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  completed
                    ? "bg-[#04ACC8] text-black"
                    : current
                    ? "bg-purple-500 text-white"
                    : "bg-zinc-700 text-zinc-400"
                }`}
              >
                {current && s.key === "generating_3d" ? (
                  <RotateCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`w-0.5 h-8 ${
                    completed ? "bg-[#04ACC8]" : "bg-zinc-700"
                  }`}
                />
              )}
            </div>
            <div className="pt-2">
              <p
                className={`font-medium ${
                  completed || current ? "text-white" : "text-zinc-500"
                }`}
              >
                {s.label}
              </p>
              {current && s.key === "generating_3d" && job && (
                <p className="text-sm text-purple-400">{job.progress}% completado</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Detail Row Component
function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className={`capitalize ${highlight ? "text-[#04ACC8] font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}
