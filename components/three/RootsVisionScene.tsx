"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { RootsVisionModel } from "./RootsVisionModel";

function Loading() {
  return (
    <mesh rotation={[0, 0.4, 0]}>
      <boxGeometry args={[1.4, 1.1, 0.1]} />
      <meshStandardMaterial color="#c9a227" wireframe opacity={0.4} transparent />
    </mesh>
  );
}

export default function RootsVisionScene() {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.1, 3], fov: 38 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[2.2, 3, 2.6]} intensity={1.6} color="#e8a33d" castShadow />
        <directionalLight position={[-2.2, 1, -1.8]} intensity={0.7} color="#7fae5a" />
        <pointLight position={[0, 0.4, 2.4]} intensity={0.8} color="#c2285e" distance={6} />
        <Environment preset="studio" environmentIntensity={0.9} />
        <Suspense fallback={<Loading />}>
          <RootsVisionModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
