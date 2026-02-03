"use client";

import { useState, useCallback } from "react";
import { Sparkles, Loader2, Check, AlertCircle, Image as ImageIcon } from "lucide-react";
import { generateConcept, pollJobStatus, getImageUrl, JobStatus } from "@/lib/api";

interface GeneratorProps {
  onComplete: (jobStatus: JobStatus) => void;
}

const STYLE_OPTIONS = [
  { value: "figurine", label: "Figura", description: "Perfecta para coleccionables" },
  { value: "sculpture", label: "Escultura", description: "Piezas artisticas" },
  { value: "character", label: "Personaje", description: "Figuras de cuerpo completo" },
  { value: "object", label: "Objeto", description: "Productos y props" },
];

const EXAMPLE_PROMPTS = [
  "Un buho steampunk con engranajes de laton y ojos brillantes de ambar",
  "Un robot lindo con un panel de corazon en el pecho",
  "Un dragon enrollado alrededor de un orbe de cristal",
  "Un gato mago con tunica de estrellas sosteniendo una varita",
  "Una mariposa mecanica con patrones de alas intrincados",
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
      // Use new generateConcept (2D only)
      const response = await generateConcept(prompt, style);

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
      setError(err instanceof Error ? err.message : "Error al iniciar la generacion");
    }
  }, [prompt, style, onComplete]);

  const getProgressPercentage = () => {
    if (!status) return 0;
    // New flow: concept_ready is the end state for initial generation
    switch (status.status) {
      case "pending":
        return 10;
      case "generating_image":
        return status.progress || 50;
      case "concept_ready":
        return 100;
      case "converting_3d":
        return 70;
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
        return "Creando concepto 2D con IA...";
      case "concept_ready":
        return "Concepto listo!";
      case "converting_3d":
        return "Convirtiendo a modelo 3D...";
      case "completed":
        return "Completado!";
      case "failed":
        return "La generacion fallo";
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
          placeholder="Un buho steampunk con engranajes de laton y ojos brillantes de ambar..."
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
            <div className="mt-4">
              <div className="flex items-center text-sm text-zinc-400 mb-2">
                <Check className="w-4 h-4 mr-2 text-[#04ACC8]" />
                Concepto 2D generado
              </div>
              {/* Preview the concept image */}
              <div className="mt-3 rounded-lg overflow-hidden border border-zinc-700">
                <img
                  src={getImageUrl(status.image_path) || ""}
                  alt="Concepto generado"
                  className="w-full h-48 object-contain bg-zinc-900"
                />
              </div>
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
            Generando Concepto...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generar Concepto 2D
          </>
        )}
      </button>

      {/* Info about the new flow */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <ImageIcon className="w-5 h-5 text-[#04ACC8] mt-0.5" />
          <div>
            <p className="text-sm text-zinc-300 font-medium">
              Nuevo flujo optimizado
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Primero generamos un concepto 2D para que lo revises.
              El modelo 3D final se genera solo despues de confirmar tu compra,
              asegurando que recibas exactamente lo que esperas.
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-zinc-500 text-sm">
        Vista previa gratis • Paga solo cuando ordenes una impresion
      </p>
    </div>
  );
}
