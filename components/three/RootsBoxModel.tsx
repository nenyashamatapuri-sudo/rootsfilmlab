"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/kodak-gold-box.glb";

const INTRO_HOLD = 0.12;
const INTRO_DURATION = 1.3;
const INTRO_SCALE_FROM = 2.6;
const AUTO_REVEAL_DURATION = 0.85;

function easeOutBack(x: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export function RootsBoxModel() {
  const { scene } = useGLTF(MODEL_URL);

  // The model is a single fused, photo-reconstructed mesh (no separate lid) —
  // clone it once so repeated mounts don't share transforms.
  const box = useMemo(() => scene.clone(true), [scene]);

  const group = useRef<THREE.Group>(null);
  const boxRef = useRef<THREE.Group>(null);
  const canister = useRef<THREE.Group>(null);
  const [revealed, setRevealed] = useState(false);
  const progress = useRef(0);

  const autoPhaseDone = useRef(false);
  const introDone = useRef(false);
  const revealStart = useRef<number | null>(null);
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

    if (group.current) {
      spin.current += delta * 0.4;
      const targetX = -state.pointer.y * 0.12 + 0.05;
      group.current.rotation.y = spin.current;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06);
    }

    if (!autoPhaseDone.current) {
      if (!introDone.current && group.current) {
        const elapsed = t - INTRO_HOLD;
        if (elapsed <= 0) {
          group.current.scale.setScalar(INTRO_SCALE_FROM);
        } else {
          const raw = Math.min(elapsed / INTRO_DURATION, 1);
          const eased = easeOutCubic(raw);
          group.current.scale.setScalar(THREE.MathUtils.lerp(INTRO_SCALE_FROM, 1, eased));
          if (raw >= 1) {
            introDone.current = true;
            revealStart.current = t;
          }
        }
      }

      if (revealStart.current !== null) {
        const raw = (t - revealStart.current) / AUTO_REVEAL_DURATION;
        const clamped = Math.min(raw, 1);
        const eased = easeOutBack(clamped);

        if (canister.current) {
          canister.current.visible = clamped > 0.1;
          const s = THREE.MathUtils.lerp(0.5, 1, Math.min(eased, 1));
          canister.current.scale.setScalar(Math.max(s, 0.01));
          canister.current.position.y = THREE.MathUtils.lerp(0.75, 1.15, Math.min(eased, 1));
        }
        if (boxRef.current) {
          const pop = 1 + Math.max(0, 1 - Math.abs(clamped - 0.35) * 3) * 0.06;
          boxRef.current.scale.setScalar(pop);
        }

        if (clamped >= 1) {
          autoPhaseDone.current = true;
          progress.current = 1;
          setRevealed(true);
        }
      }
      return;
    }

    progress.current = THREE.MathUtils.lerp(progress.current, revealed ? 1 : 0, 0.1);
    if (canister.current) {
      canister.current.visible = progress.current > 0.08;
      const s = THREE.MathUtils.lerp(0.6, 1, progress.current);
      canister.current.scale.setScalar(s);
      canister.current.position.y = THREE.MathUtils.lerp(0.75, 1.15, progress.current);
    }
  });

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation();
        if (autoPhaseDone.current) setRevealed((r) => !r);
      }}
    >
      <group ref={boxRef}>
        <primitive object={box} />
      </group>

      <group ref={canister} visible={false} position={[0, 0.75, 0.25]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.36, 24]} />
          <meshStandardMaterial color="#0d0b08" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.06, 24]} />
          <meshStandardMaterial color="#e8a33d" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
