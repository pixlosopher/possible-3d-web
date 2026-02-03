"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface PricingSelectorProps {
  onSelect: (size: string, material: string, price: number) => void;
  selectedSize: string | null;
  selectedMaterial: string | null;
}

const SIZES = [
  { id: "small", label: "Small", height: "50mm", description: "Desk figurine" },
  { id: "medium", label: "Medium", height: "75mm", description: "Collectible size" },
  { id: "large", label: "Large", height: "100mm", description: "Statement piece" },
];

const MATERIALS = [
  { id: "pla", label: "PLA Plastic", description: "Durable & affordable", color: "text-blue-400" },
  { id: "resin", label: "Premium Resin", description: "High detail finish", color: "text-purple-400" },
];

const PRICING: Record<string, Record<string, number>> = {
  small: { pla: 29, resin: 39 },
  medium: { pla: 49, resin: 59 },
  large: { pla: 69, resin: 89 },
};

export default function PricingSelector({
  onSelect,
  selectedSize,
  selectedMaterial,
}: PricingSelectorProps) {
  const [size, setSize] = useState(selectedSize || "medium");
  const [material, setMaterial] = useState(selectedMaterial || "pla");

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
    onSelect(newSize, material, PRICING[newSize][material]);
  };

  const handleMaterialChange = (newMaterial: string) => {
    setMaterial(newMaterial);
    onSelect(size, newMaterial, PRICING[size][newMaterial]);
  };

  const currentPrice = PRICING[size][material];

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-3">
          Select Size
        </label>
        <div className="grid grid-cols-3 gap-3">
          {SIZES.map((sizeOption) => (
            <button
              key={sizeOption.id}
              onClick={() => handleSizeChange(sizeOption.id)}
              className={`relative p-4 rounded-xl border transition text-center ${
                size === sizeOption.id
                  ? "border-[#04ACC8] bg-[#04ACC8]/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              {size === sizeOption.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-[#04ACC8]" />
                </div>
              )}
              <div className="text-2xl font-bold text-white mb-1">
                {sizeOption.height}
              </div>
              <div className="text-sm font-medium text-zinc-300">
                {sizeOption.label}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {sizeOption.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-3">
          Select Material
        </label>
        <div className="grid grid-cols-2 gap-3">
          {MATERIALS.map((materialOption) => (
            <button
              key={materialOption.id}
              onClick={() => handleMaterialChange(materialOption.id)}
              className={`relative p-4 rounded-xl border transition text-left ${
                material === materialOption.id
                  ? "border-[#04ACC8] bg-[#04ACC8]/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              {material === materialOption.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-[#04ACC8]" />
                </div>
              )}
              <div className={`text-lg font-semibold ${materialOption.color}`}>
                {materialOption.label}
              </div>
              <div className="text-sm text-zinc-500 mt-1">
                {materialOption.description}
              </div>
              <div className="text-lg font-bold text-white mt-2">
                ${PRICING[size][materialOption.id]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-zinc-400 text-sm">Your Selection</div>
            <div className="text-white font-medium">
              {SIZES.find((s) => s.id === size)?.label} ({SIZES.find((s) => s.id === size)?.height}) •{" "}
              {MATERIALS.find((m) => m.id === material)?.label}
            </div>
          </div>
          <div className="text-right">
            <div className="text-zinc-400 text-sm">Total</div>
            <div className="text-3xl font-bold text-[#04ACC8]">
              ${currentPrice}
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-zinc-700 text-xs text-zinc-500">
          Includes free shipping • Delivered in 5-10 business days
        </div>
      </div>
    </div>
  );
}
