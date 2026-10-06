"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GriotBoxModel } from "./GriotBoxModel";

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
        camera={{ position: [0, 0.2, 3.6], fov: 32 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 3]} intensity={1.3} color="#e8a33d" castShadow />
        <directionalLight position={[-2, 0.5, -1.5]} intensity={0.5} color="#46c2c8" />
        <pointLight position={[0, 0.3, 2]} intensity={0.6} color="#c2285e" distance={6} />
        <Suspense fallback={<Loading />}>
          <GriotBoxModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
