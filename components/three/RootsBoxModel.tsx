"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/kodak-gold-box.glb";

const INTRO_HOLD = 0.12;
const INTRO_DURATION = 1.3;
const INTRO_SCALE_FROM = 1.6;

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export function RootsBoxModel() {
  const { scene } = useGLTF(MODEL_URL);

  // The model is a single fused, photo-reconstructed mesh (no separate lid) —
  // clone it once so repeated mounts don't share transforms.
  const box = useMemo(() => scene.clone(true), [scene]);

  const group = useRef<THREE.Group>(null);
  const introDone = useRef(false);
  const spin = useRef(0);

  useEffect(() => {
    box.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if ((mesh as THREE.Mesh).isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [box]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;

    spin.current += delta * 0.4;
    const targetX = -state.pointer.y * 0.12 + 0.05;
    group.current.rotation.y = spin.current;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06);

    if (!introDone.current) {
      const elapsed = t - INTRO_HOLD;
      if (elapsed <= 0) {
        group.current.scale.setScalar(INTRO_SCALE_FROM);
      } else {
        const raw = Math.min(elapsed / INTRO_DURATION, 1);
        const eased = easeOutCubic(raw);
        group.current.scale.setScalar(THREE.MathUtils.lerp(INTRO_SCALE_FROM, 1, eased));
        if (raw >= 1) introDone.current = true;
      }
    }
  });

  return (
    <group ref={group}>
      <primitive object={box} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
