"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { RotateCw, AlertTriangle } from "lucide-react";
import * as THREE from "three";

interface ModelPreviewProps {
  modelUrl: string | null;
  imageUrl: string | null;
}

// Error boundary component for 3D model loading
function ModelErrorFallback({ error, imageUrl }: { error: string; imageUrl: string | null }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 p-4">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Generated concept"
            className="w-full h-full object-contain absolute inset-0 opacity-50"
          />
          <div className="relative z-10 bg-black/80 rounded-xl p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-amber-400 text-sm font-medium">Error al cargar modelo 3D</p>
            <p className="text-zinc-500 text-xs mt-1">Mostrando imagen de concepto</p>
          </div>
        </>
      ) : (
        <>
          <AlertTriangle className="w-8 h-8 text-amber-400 mb-2" />
          <p className="text-amber-400 text-sm">Error al cargar modelo 3D</p>
          <p className="text-zinc-500 text-xs mt-1">{error}</p>
        </>
      )}
    </div>
  );
}

function Model({ url, onError }: { url: string; onError: (error: string) => void }) {
  const ref = useRef<THREE.Group>(null);

  // useGLTF with error handling
  let scene: THREE.Group | null = null;
  try {
    const gltf = useGLTF(url);
    scene = gltf.scene;
  } catch (err) {
    // This will be caught by the error boundary
    throw err;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  if (!scene) {
    return null;
  }

  return <primitive ref={ref} object={scene} />;
}

// Wrapper component that handles errors
function SafeModel({ url, onError }: { url: string; onError: (error: string) => void }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset error state when URL changes
    setHasError(false);
    setIsLoading(true);

    // Validate URL before attempting to load
    if (!url || url === "null" || url === "undefined") {
      setHasError(true);
      onError("URL del modelo inválida");
      return;
    }

    // Pre-check if the URL is accessible
    fetch(url, { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          setHasError(true);
          onError(`Modelo no encontrado (${response.status})`);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setHasError(true);
        onError("No se pudo acceder al modelo");
      });
  }, [url, onError]);

  if (hasError) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return <Model url={url} onError={onError} />;
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <RotateCw className="w-8 h-8 text-[#04ACC8] animate-spin" />
    </div>
  );
}

function Placeholder() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#04ACC8" wireframe />
    </mesh>
  );
}

export default function ModelPreview({ modelUrl, imageUrl }: ModelPreviewProps) {
  const [modelError, setModelError] = useState<string | null>(null);

  // Reset error when model URL changes
  useEffect(() => {
    setModelError(null);
  }, [modelUrl]);

  if (!modelUrl && !imageUrl) {
    // Show placeholder
    return (
      <div className="relative w-full aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Placeholder />
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-zinc-500 text-sm">
            Tu modelo 3D aparecerá aquí
          </p>
        </div>
      </div>
    );
  }

  if (imageUrl && !modelUrl) {
    // Show 2D image (concept only flow)
    return (
      <div className="relative w-full aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
        <img
          src={imageUrl}
          alt="Concepto generado"
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center">
          <p className="text-zinc-300 text-sm">
            Concepto 2D • El modelo 3D se genera después del pago
          </p>
        </div>
      </div>
    );
  }

  // Show error state if model failed to load
  if (modelError) {
    return (
      <div className="relative w-full aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
        <ModelErrorFallback error={modelError} imageUrl={imageUrl} />
      </div>
    );
  }

  // Show 3D model
  return (
    <div className="relative w-full aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <Stage environment="city" intensity={0.6}>
            {modelUrl && (
              <SafeModel
                url={modelUrl}
                onError={(err) => setModelError(err)}
              />
            )}
          </Stage>
          <OrbitControls
            autoRotate={false}
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={6}
          />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <span className="text-zinc-500 text-xs">Arrastra para rotar • Scroll para zoom</span>
        <span className="text-[#04ACC8] text-xs font-medium">Vista 3D</span>
      </div>
    </div>
  );
}
