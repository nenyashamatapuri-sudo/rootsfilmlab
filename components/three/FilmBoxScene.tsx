"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { RootsBoxModel } from "./RootsBoxModel";

function Loading() {
  return (
    <mesh rotation={[0, 0.4, 0]}>
      <boxGeometry args={[1.1, 1.4, 0.1]} />
      <meshStandardMaterial color="#e8a33d" wireframe opacity={0.5} transparent />
    </mesh>
  );
}

export default function FilmBoxScene() {
  return (
    <div className="h-full w-full cursor-pointer">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 4.4], fov: 34 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[2.5, 3.5, 3]} intensity={1.8} color="#e8a33d" castShadow />
        <directionalLight position={[-2.5, 1, -2]} intensity={0.8} color="#7fae5a" />
        <pointLight position={[0, 0.5, 2.8]} intensity={0.9} color="#c2285e" distance={7} />
        <pointLight position={[1.6, 1.6, 1.8]} intensity={0.7} color="#ffffff" distance={6} />
        <Environment preset="studio" environmentIntensity={0.9} />
        <Suspense fallback={<Loading />}>
          <RootsBoxModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
