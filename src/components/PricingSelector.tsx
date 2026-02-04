"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Loader2, Globe, Ruler, Sparkles } from "lucide-react";
import { getRegionalPricing, calculateCustomHeightPrice, RegionalPricing, RegionalSize, CustomHeightPrice } from "@/lib/api";

interface PricingSelectorProps {
  onSelect: (size: string, material: string, color: string | undefined, price: number, customHeight?: number) => void;
  selectedSize: string | null;
  selectedMaterial: string | null;
  selectedColor: string | null;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

// Countries available for shipping
const COUNTRIES = [
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "CA", name: "Canadá", flag: "🇨🇦" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "PE", name: "Perú", flag: "🇵🇪" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "PA", name: "Panamá", flag: "🇵🇦" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "DO", name: "Rep. Dominicana", flag: "🇩🇴" },
];

export default function PricingSelector({
  onSelect,
  selectedSize,
  selectedMaterial,
  selectedColor,
  selectedCountry: initialCountry,
  onCountryChange,
}: PricingSelectorProps) {
  const [pricing, setPricing] = useState<RegionalPricing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [country, setCountry] = useState(initialCountry || "MX");
  const [size, setSize] = useState(selectedSize || "small");
  const [isCustom, setIsCustom] = useState(false);
  const [customHeight, setCustomHeight] = useState(75); // Default 75mm
  const [customPrice, setCustomPrice] = useState<CustomHeightPrice | null>(null);
  const [customLoading, setCustomLoading] = useState(false);

  // Material is fixed to standard plastic for now (simplified regional pricing)
  const material = "plastic_white";

  // Memoize the onSelect callback
  const handleSelect = useCallback((sizeKey: string, priceCents: number, customHeightMm?: number) => {
    onSelect(sizeKey, material, undefined, priceCents, customHeightMm);
  }, [onSelect, material]);

  // Load pricing when country changes
  useEffect(() => {
    async function loadPricing() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRegionalPricing(country);
        setPricing(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar precios");
        setLoading(false);
      }
    }
    loadPricing();
  }, [country]);

  // Update price when size changes (for preset sizes)
  useEffect(() => {
    if (!pricing || isCustom) return;

    const selectedSizeData = pricing.sizes.find(s => s.key === size);
    if (selectedSizeData) {
      handleSelect(size, selectedSizeData.price_cents);
    }
  }, [size, pricing, handleSelect, isCustom]);

  // Calculate custom height price with debounce
  useEffect(() => {
    if (!isCustom) return;

    const timer = setTimeout(async () => {
      setCustomLoading(true);
      try {
        const price = await calculateCustomHeightPrice(customHeight, country);
        setCustomPrice(price);
        handleSelect("custom", price.price_cents, customHeight);
      } catch (err) {
        console.error("Error calculating custom price:", err);
      }
      setCustomLoading(false);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [customHeight, country, isCustom, handleSelect]);

  // Notify parent when country changes
  useEffect(() => {
    if (onCountryChange) {
      onCountryChange(country);
    }
  }, [country, onCountryChange]);

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#04ACC8]" />
        <span className="ml-3 text-zinc-400">Cargando precios...</span>
      </div>
    );
  }

  if (error || !pricing) {
    return (
      <div className="text-red-400 text-center py-8">
        {error || "Error al cargar precios"}
      </div>
    );
  }

  const selectedSizeData = pricing.sizes.find(s => s.key === size);
  const selectedCountryData = COUNTRIES.find(c => c.code === country);

  return (
    <div className="space-y-6">
      {/* Country Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          País de Envío
        </label>
        <div className="relative">
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#04ACC8] cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {pricing.region.key === "latam" ? (
          <p className="text-xs text-zinc-500 mt-2">
            Precios para Latinoamérica • Envío internacional incluido
          </p>
        ) : (
          <p className="text-xs text-zinc-500 mt-2">
            Precios para USA y Canadá • Envío incluido
          </p>
        )}
      </div>

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-3">
          Selecciona Tamaño
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pricing.sizes.map((sizeOption) => (
            <button
              key={sizeOption.key}
              onClick={() => {
                setIsCustom(false);
                setSize(sizeOption.key);
              }}
              className={`relative p-4 rounded-xl border transition text-center ${
                !isCustom && size === sizeOption.key
                  ? "border-[#04ACC8] bg-[#04ACC8]/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              {!isCustom && size === sizeOption.key && (
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
              <div className="text-xs text-zinc-500 mt-1 line-clamp-2">
                {sizeOption.description_es}
              </div>
              <div className="mt-3 text-lg font-bold text-[#04ACC8]">
                {sizeOption.price_display}
              </div>
              {sizeOption.local_currency && (
                <div className="text-xs text-zinc-400">
                  ≈ {sizeOption.local_currency.display}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Custom Size Option */}
        <div className="mt-4">
          <button
            onClick={() => setIsCustom(!isCustom)}
            className={`w-full p-4 rounded-xl border transition ${
              isCustom
                ? "border-[#9AC32E] bg-[#9AC32E]/10"
                : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ruler className={`w-5 h-5 ${isCustom ? "text-[#9AC32E]" : "text-zinc-400"}`} />
                <div className="text-left">
                  <div className="font-medium text-white">Tamaño Personalizado</div>
                  <div className="text-xs text-zinc-400">Elige la altura exacta (30-300mm)</div>
                </div>
              </div>
              {isCustom && <Check className="w-5 h-5 text-[#9AC32E]" />}
            </div>
          </button>

          {/* Custom Height Slider */}
          {isCustom && (
            <div className="mt-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400">Altura:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={30}
                    max={300}
                    value={customHeight}
                    onChange={(e) => setCustomHeight(Math.min(300, Math.max(30, parseInt(e.target.value) || 30)))}
                    className="w-20 bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-1 text-white text-center"
                  />
                  <span className="text-zinc-400">mm</span>
                </div>
              </div>
              <input
                type="range"
                min={30}
                max={300}
                step={5}
                value={customHeight}
                onChange={(e) => setCustomHeight(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#9AC32E]"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2">
                <span>30mm</span>
                <span>300mm</span>
              </div>

              {/* Custom Price Display */}
              <div className="mt-4 pt-4 border-t border-zinc-700 flex items-center justify-between">
                <span className="text-zinc-400">Precio:</span>
                {customLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#9AC32E]" />
                ) : customPrice ? (
                  <span className="text-2xl font-bold text-[#9AC32E]">
                    {customPrice.price_display}
                  </span>
                ) : (
                  <span className="text-zinc-500">Calculando...</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-zinc-400 text-sm">Tu Selección</div>
            {isCustom && customPrice ? (
              <div className="text-white font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9AC32E]" />
                <span>Personalizado ({customHeight}mm)</span>
                <span className="text-zinc-500">
                  • {selectedCountryData?.flag} {selectedCountryData?.name}
                </span>
              </div>
            ) : selectedSizeData ? (
              <div className="text-white font-medium">
                {selectedSizeData.name_es} ({selectedSizeData.height_mm}mm)
                <span className="text-zinc-500 ml-2">
                  • {selectedCountryData?.flag} {selectedCountryData?.name}
                </span>
              </div>
            ) : null}
          </div>
          <div className="text-right">
            <div className="text-zinc-400 text-sm">Total</div>
            {isCustom && customPrice ? (
              <div className="text-3xl font-bold text-[#9AC32E]">
                {customPrice.price_display}
              </div>
            ) : selectedSizeData ? (
              <>
                <div className="text-3xl font-bold text-[#04ACC8]">
                  {selectedSizeData.price_display}
                </div>
                {selectedSizeData.local_currency && (
                  <div className="text-sm text-zinc-400">
                    ≈ {selectedSizeData.local_currency.display}
                  </div>
                )}
              </>
            ) : (
              <div className="text-lg text-zinc-500">
                Selecciona un tamaño
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-zinc-700 text-xs text-zinc-500">
          Incluye envío internacional • Entrega en 10-15 días hábiles
        </div>
      </div>
    </div>
  );
}
