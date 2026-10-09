"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/roots-vision-box.glb";

export function RootsVisionModel() {
  const { scene } = useGLTF(MODEL_URL);
  const box = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    box.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if ((mesh as THREE.Mesh).isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [box]);

  // A slow side-to-side sway and a gentle vertical bob — enough parallax to
  // read as a real 3D object sitting there, short of a full spin.
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.45) * 0.42;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.05 + 0.04;
    group.current.position.y = Math.sin(t * 0.6) * 0.06;
  });

  return (
    <group ref={group}>
      <primitive object={box} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
