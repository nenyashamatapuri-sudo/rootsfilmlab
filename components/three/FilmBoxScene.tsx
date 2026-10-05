"use client";

import { Canvas } from "@react-three/fiber";
import { FilmBox } from "./FilmBox";

export default function FilmBoxScene() {
  return (
    <div className="h-full w-full cursor-pointer">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.95, 2.7], fov: 36 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[2, 3, 2]} intensity={1.1} castShadow />
        <directionalLight position={[-2, 1, -1]} intensity={0.25} color="#1aa3ad" />
        <FilmBox />
      </Canvas>
    </div>
  );
}
