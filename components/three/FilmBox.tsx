"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createFilmBoxTextures } from "./filmBoxTextures";

const BODY_W = 1.5;
const BODY_H = 0.85;
const BODY_D = 0.95;
const LID_H = 0.22;
const LID_W = BODY_W * 1.02;
const LID_D = BODY_D * 1.02;
const OPEN_ANGLE = -2.15;

export function FilmBox() {
  const textures = useMemo(() => createFilmBoxTextures(), []);

  const bodyMaterials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ map: textures.right, roughness: 0.65 }),
      new THREE.MeshStandardMaterial({ map: textures.left, roughness: 0.65 }),
      new THREE.MeshStandardMaterial({ color: "#120f0a", roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: "#120f0a", roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ map: textures.front, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ map: textures.back, roughness: 0.6 }),
    ],
    [textures]
  );

  const lidMaterials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: "#1a1611", roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: "#1a1611", roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ map: textures.top, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: "#1a1611", roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: "#1a1611", roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: "#1a1611", roughness: 0.7 }),
    ],
    [textures]
  );

  const group = useRef<THREE.Group>(null);
  const lidPivot = useRef<THREE.Group>(null);
  const canister = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const [open, setOpen] = useState(false);
  const progress = useRef(0);

  useFrame((state, delta) => {
    spin.current += delta * 0.28;

    if (group.current) {
      group.current.rotation.y = spin.current;
      const targetX = -state.pointer.y * 0.18 + 0.12;
      const targetZ = state.pointer.x * 0.08;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.06);
    }

    progress.current = THREE.MathUtils.lerp(progress.current, open ? 1 : 0, 0.08);

    if (lidPivot.current) {
      lidPivot.current.rotation.x = OPEN_ANGLE * progress.current;
    }

    if (canister.current) {
      const s = THREE.MathUtils.lerp(0.7, 1, progress.current);
      canister.current.scale.setScalar(s);
      canister.current.visible = progress.current > 0.08;
      canister.current.position.y = THREE.MathUtils.lerp(-0.1, 0.05, progress.current);
    }
  });

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((o) => !o);
      }}
    >
      <mesh position={[0, 0, 0]} material={bodyMaterials} castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
      </mesh>

      <group ref={canister} visible={false} position={[0, -0.1, 0]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.4, 24]} />
          <meshStandardMaterial color="#0d0b08" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 24]} />
          <meshStandardMaterial color="#c0922f" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>

      <group ref={lidPivot} position={[0, BODY_H / 2, -BODY_D / 2]}>
        <mesh position={[0, LID_H / 2, LID_D / 2]} material={lidMaterials} castShadow>
          <boxGeometry args={[LID_W, LID_H, LID_D]} />
        </mesh>
      </group>
    </group>
  );
}
