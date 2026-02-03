"use client";

import { useState, useCallback } from "react";
import { Sparkles, Loader2, Check, AlertCircle } from "lucide-react";
import { generateModel, pollJobStatus, JobStatus } from "@/lib/api";

interface GeneratorProps {
  onComplete: (jobStatus: JobStatus) => void;
}

const STYLE_OPTIONS = [
  { value: "figurine", label: "Figura", description: "Perfecta para coleccionables" },
  { value: "sculpture", label: "Escultura", description: "Piezas artísticas" },
  { value: "character", label: "Personaje", description: "Figuras de cuerpo completo" },
  { value: "object", label: "Objeto", description: "Productos y props" },
];

const EXAMPLE_PROMPTS = [
  "Un búho steampunk con engranajes de latón y ojos brillantes de ámbar",
  "Un robot lindo con un panel de corazón en el pecho",
  "Un dragón enrollado alrededor de un orbe de cristal",
  "Un gato mago con túnica de estrellas sosteniendo una varita",
  "Una mariposa mecánica con patrones de alas intrincados",
];

export default function Generator({ onComplete }: GeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("figurine");
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setStatus(null);

    try {
      const response = await generateModel(prompt, style);

      // Start polling for status
      pollJobStatus(
        response.job_id,
        (jobStatus) => {
          setStatus(jobStatus);
        },
        (jobStatus) => {
          setIsGenerating(false);
          onComplete(jobStatus);
        },
        (err) => {
          setIsGenerating(false);
          setError(err.message);
        }
      );
    } catch (err) {
      setIsGenerating(false);
      setError(err instanceof Error ? err.message : "Error al iniciar la generación");
    }
  }, [prompt, style, onComplete]);

  const getProgressPercentage = () => {
    if (!status) return 0;
    switch (status.status) {
      case "pending":
        return 10;
      case "generating_image":
        return 40;
      case "converting_3d":
        return 70;
      case "estimating_cost":
        return 90;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusMessage = () => {
    if (!status) return "Iniciando...";
    switch (status.status) {
      case "pending":
        return "Preparando tu solicitud...";
      case "generating_image":
        return "Creando concepto 2D...";
      case "converting_3d":
        return "Convirtiendo a modelo 3D...";
      case "estimating_cost":
        return "Calculando precio...";
      case "completed":
        return "¡Completado!";
      case "failed":
        return "La generación falló";
      default:
        return "Procesando...";
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Describe lo que quieres crear
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Un búho steampunk con engranajes de latón y ojos brillantes de ámbar..."
          className="w-full h-32 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#04ACC8] resize-none"
          disabled={isGenerating}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.slice(0, 3).map((example) => (
            <button
              key={example}
              onClick={() => setPrompt(example)}
              className="text-xs text-zinc-500 hover:text-[#04ACC8] transition"
              disabled={isGenerating}
            >
              {example.slice(0, 40)}...
            </button>
          ))}
        </div>
      </div>

      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Estilo
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STYLE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setStyle(option.value)}
              disabled={isGenerating}
              className={`p-3 rounded-xl border transition text-left ${
                style === option.value
                  ? "border-[#04ACC8] bg-[#04ACC8]/10 text-white"
                  : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-zinc-500">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {/* Progress Display */}
      {isGenerating && status && (
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-zinc-400">{getStatusMessage()}</span>
            <span className="text-sm text-[#04ACC8]">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#04ACC8] to-[#9AC32E] h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          {status.image_path && (
            <div className="mt-4 text-sm text-zinc-500">
              <Check className="w-4 h-4 inline mr-2 text-[#04ACC8]" />
              Concepto 2D generado
            </div>
          )}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-lg transition ${
          isGenerating || !prompt.trim()
            ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
            : "bg-[#04ACC8] hover:bg-[#2BC4DD] text-black"
        }`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generar Modelo 3D
          </>
        )}
      </button>

      <p className="text-center text-zinc-500 text-sm">
        Vista previa gratis • Paga solo cuando ordenes una impresión
      </p>
    </div>
  );
}
