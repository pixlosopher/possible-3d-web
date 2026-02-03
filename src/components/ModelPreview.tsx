"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { RotateCw } from "lucide-react";
import * as THREE from "three";

interface ModelPreviewProps {
  modelUrl: string | null;
  imageUrl: string | null;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <RotateCw className="w-8 h-8 text-emerald-400 animate-spin" />
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
      <meshStandardMaterial color="#10b981" wireframe />
    </mesh>
  );
}

export default function ModelPreview({ modelUrl, imageUrl }: ModelPreviewProps) {
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
            Your 3D model will appear here
          </p>
        </div>
      </div>
    );
  }

  if (imageUrl && !modelUrl) {
    // Show 2D image while 3D is being generated
    return (
      <div className="relative w-full aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
        <img
          src={imageUrl}
          alt="Generated concept"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center">
          <p className="text-zinc-300 text-sm">
            Converting to 3D model...
          </p>
        </div>
      </div>
    );
  }

  // Show 3D model
  return (
    <div className="relative w-full aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <Stage environment="city" intensity={0.6}>
            {modelUrl && <Model url={modelUrl} />}
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
        <span className="text-zinc-500 text-xs">Drag to rotate • Scroll to zoom</span>
        <span className="text-emerald-400 text-xs font-medium">3D Preview</span>
      </div>
    </div>
  );
}
