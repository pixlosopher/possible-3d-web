"use client";

import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { getOptions, calculatePrice, Size, Material, Color, OptionsResponse, PriceBreakdown } from "@/lib/api";

interface PricingSelectorProps {
  onSelect: (size: string, material: string, color: string | undefined, price: number) => void;
  selectedSize: string | null;
  selectedMaterial: string | null;
  selectedColor: string | null;
}

export default function PricingSelector({
  onSelect,
  selectedSize,
  selectedMaterial,
  selectedColor,
}: PricingSelectorProps) {
  const [options, setOptions] = useState<OptionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [size, setSize] = useState(selectedSize || "medium");
  const [material, setMaterial] = useState(selectedMaterial || "plastic_white");
  const [color, setColor] = useState<string | undefined>(selectedColor || undefined);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // Load options on mount
  useEffect(() => {
    async function loadOptions() {
      try {
        const data = await getOptions();
        setOptions(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar opciones");
        setLoading(false);
      }
    }
    loadOptions();
  }, []);

  // Update price when selection changes
  useEffect(() => {
    async function updatePrice() {
      if (!options) return;

      const selectedMat = options.materials[material];
      const needsColor = selectedMat && selectedMat.colors && selectedMat.colors.length > 0 && !selectedMat.supports_full_color;

      // If material needs color but none selected, don't calculate
      if (needsColor && !color) {
        setPriceBreakdown(null);
        return;
      }

      setPriceLoading(true);
      try {
        const breakdown = await calculatePrice(material, size, color);
        setPriceBreakdown(breakdown);
        onSelect(size, material, color, breakdown.total_cents);
      } catch (err) {
        console.error("Price calculation error:", err);
      }
      setPriceLoading(false);
    }
    updatePrice();
  }, [size, material, color, options, onSelect]);

  // Reset color when material changes (if material doesn't support current color)
  useEffect(() => {
    if (!options) return;
    const selectedMat = options.materials[material];
    if (selectedMat) {
      if (!selectedMat.colors || selectedMat.colors.length === 0 || selectedMat.supports_full_color) {
        setColor(undefined);
      } else if (color && !selectedMat.colors.find(c => c.key === color)) {
        setColor(selectedMat.colors[0]?.key);
      } else if (!color && selectedMat.colors && selectedMat.colors.length > 0) {
        setColor(selectedMat.colors[0]?.key);
      }
    }
  }, [material, options]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#04ACC8]" />
        <span className="ml-3 text-zinc-400">Cargando opciones...</span>
      </div>
    );
  }

  if (error || !options) {
    return (
      <div className="text-red-400 text-center py-8">
        {error || "Error al cargar opciones"}
      </div>
    );
  }

  const sizes = Object.values(options.sizes).sort((a, b) => a.height_mm - b.height_mm);
  const materials = Object.values(options.materials);
  const selectedMat = options.materials[material];
  const availableColors = selectedMat?.colors || [];
  const needsColorSelection = availableColors.length > 0 && !selectedMat?.supports_full_color;

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-3">
          Selecciona Tamano
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {sizes.map((sizeOption) => (
            <button
              key={sizeOption.key}
              onClick={() => setSize(sizeOption.key)}
              className={`relative p-4 rounded-xl border transition text-center ${
                size === sizeOption.key
                  ? "border-[#04ACC8] bg-[#04ACC8]/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              {size === sizeOption.key && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-[#04ACC8]" />
                </div>
              )}
              <div className="text-2xl font-bold text-white mb-1">
                {sizeOption.height_mm}mm
              </div>
              <div className="text-sm font-medium text-zinc-300">
                {sizeOption.name_es}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {sizeOption.description_es}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-3">
          Selecciona Material
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {materials.map((materialOption) => {
            // Get price for this material at current size
            const priceRow = options.price_matrix.find(
              (row) => row.material.key === materialOption.key
            );
            const priceAtSize = priceRow?.prices[size];

            return (
              <button
                key={materialOption.key}
                onClick={() => setMaterial(materialOption.key)}
                className={`relative p-4 rounded-xl border transition text-left ${
                  material === materialOption.key
                    ? "border-[#04ACC8] bg-[#04ACC8]/10"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                }`}
              >
                {material === materialOption.key && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-[#04ACC8]" />
                  </div>
                )}
                <div className="text-lg font-semibold text-white">
                  {materialOption.name_es}
                </div>
                <div className="text-sm text-zinc-500 mt-1">
                  {materialOption.description_es}
                </div>
                <div className="text-lg font-bold text-[#04ACC8] mt-2">
                  {priceAtSize?.display || `$${(materialOption.base_price_cents / 100).toFixed(0)}`}
                </div>
                {materialOption.supports_full_color && (
                  <span className="inline-block mt-2 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                    Full Color
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selection (if material requires it) */}
      {needsColorSelection && (
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-3">
            Selecciona Color
          </label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((colorOption) => (
              <button
                key={colorOption.key}
                onClick={() => setColor(colorOption.key)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border transition ${
                  color === colorOption.key
                    ? "border-[#04ACC8] bg-[#04ACC8]/10"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                }`}
              >
                {color === colorOption.key && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-[#04ACC8]" />
                  </div>
                )}
                <div
                  className="w-6 h-6 rounded-full border border-zinc-600"
                  style={{ backgroundColor: colorOption.hex }}
                />
                <span className="text-zinc-300">{colorOption.name_es}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Summary */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-zinc-400 text-sm">Tu Seleccion</div>
            <div className="text-white font-medium">
              {options.sizes[size]?.name_es} ({options.sizes[size]?.height_mm}mm) •{" "}
              {options.materials[material]?.name_es}
              {color && availableColors.find(c => c.key === color) && (
                <> • {availableColors.find(c => c.key === color)?.name_es}</>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-zinc-400 text-sm">Total</div>
            {priceLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-[#04ACC8]" />
            ) : priceBreakdown ? (
              <div className="text-3xl font-bold text-[#04ACC8]">
                {priceBreakdown.total_display}
              </div>
            ) : needsColorSelection && !color ? (
              <div className="text-lg text-zinc-500">
                Selecciona un color
              </div>
            ) : (
              <div className="text-lg text-zinc-500">
                Calculando...
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-zinc-700 text-xs text-zinc-500">
          Incluye envio internacional • Entrega en 10-15 dias habiles
        </div>
      </div>
    </div>
  );
}
