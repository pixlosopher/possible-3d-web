"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
  modelUrl: string;
  autoRotate?: boolean;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  // Auto-rotate the model slowly
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} scale={1} />
      </group>
    </Center>
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-[#04ACC8] border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm">Cargando modelo 3D...</p>
      </div>
    </Html>
  );
}

export default function ModelViewer({ modelUrl, autoRotate = true }: ModelViewerProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />

          {/* Environment for reflections */}
          <Environment preset="studio" />

          {/* The 3D Model */}
          <Model url={modelUrl} />

          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
