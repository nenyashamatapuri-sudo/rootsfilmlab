"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GriotBoxModel } from "./GriotBoxModel";

function Loading() {
  return (
    <mesh rotation={[0, 0.4, 0]}>
      <boxGeometry args={[1.1, 1.4, 0.1]} />
      <meshStandardMaterial color="#4b3fa0" wireframe opacity={0.5} transparent />
    </mesh>
  );
}

export default function FilmBoxScene() {
  return (
    <div className="h-full w-full cursor-pointer">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 4.6], fov: 32 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 3]} intensity={1.2} castShadow />
        <directionalLight position={[-2, 1, -1]} intensity={0.3} color="#8e6fd6" />
        <Suspense fallback={<Loading />}>
          <GriotBoxModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
