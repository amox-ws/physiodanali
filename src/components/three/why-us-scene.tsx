"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

type Shard = {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  color: string;
  wireframe: boolean;
  opacity: number;
  floatSpeed: number;
  rotationIntensity: number;
};

const SHARDS: Shard[] = [
  // Big centerpieces
  {
    position: [-2.4, 0.4, -0.4],
    scale: 0.85,
    rotation: [0.3, 0.5, 0],
    color: "#1e4d8b",
    wireframe: false,
    opacity: 0.42,
    floatSpeed: 0.6,
    rotationIntensity: 0.5,
  },
  {
    position: [2.6, -0.2, -0.6],
    scale: 0.95,
    rotation: [-0.2, 0.4, 0.2],
    color: "#b89968",
    wireframe: false,
    opacity: 0.5,
    floatSpeed: 0.7,
    rotationIntensity: 0.6,
  },

  // Mid-size accents
  {
    position: [0.4, 1.4, -1.2],
    scale: 0.55,
    rotation: [0.4, 0.2, 0.6],
    color: "#7ea8dc",
    wireframe: true,
    opacity: 0.7,
    floatSpeed: 0.8,
    rotationIntensity: 0.4,
  },
  {
    position: [-0.8, -1.5, -0.2],
    scale: 0.6,
    rotation: [0.1, 0.7, 0.3],
    color: "#1e4d8b",
    wireframe: true,
    opacity: 0.55,
    floatSpeed: 0.5,
    rotationIntensity: 0.5,
  },

  // Small dust
  {
    position: [-3.2, -0.8, -1.4],
    scale: 0.32,
    rotation: [0.5, 0.1, 0.4],
    color: "#c9a96e",
    wireframe: false,
    opacity: 0.35,
    floatSpeed: 0.9,
    rotationIntensity: 0.6,
  },
  {
    position: [3.6, 1.0, -1.6],
    scale: 0.28,
    rotation: [0.2, 0.5, 0.1],
    color: "#7ea8dc",
    wireframe: true,
    opacity: 0.7,
    floatSpeed: 1.0,
    rotationIntensity: 0.5,
  },
  {
    position: [1.6, 1.8, -2.0],
    scale: 0.22,
    rotation: [0.3, 0.4, 0.2],
    color: "#1e4d8b",
    wireframe: false,
    opacity: 0.30,
    floatSpeed: 0.75,
    rotationIntensity: 0.5,
  },
];

function ShardMesh({ shard }: { shard: Shard }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.07 * shard.rotationIntensity;
    ref.current.rotation.y += delta * 0.09 * shard.rotationIntensity;
  });
  return (
    <Float
      speed={shard.floatSpeed}
      rotationIntensity={shard.rotationIntensity}
      floatIntensity={0.6}
      floatingRange={[-0.18, 0.18]}
    >
      <mesh
        ref={ref}
        position={shard.position}
        rotation={shard.rotation}
        scale={shard.scale}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={shard.color}
          wireframe={shard.wireframe}
          transparent
          opacity={shard.opacity}
          metalness={shard.wireframe ? 0 : 0.7}
          roughness={0.35}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Autonomous gentle sway — no cursor needed. Drives a slow tilt
    // from elapsed time so the whole group breathes on its own.
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.16;
    groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.1;
  });

  const shards = useMemo(() => SHARDS, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 4, 6]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-4, -3, -2]} intensity={0.9} color="#7ea8dc" />
      <pointLight position={[4, 5, 2]} intensity={0.7} color="#b89968" />
      <group ref={groupRef}>
        {shards.map((s, i) => (
          <ShardMesh key={i} shard={s} />
        ))}
      </group>
    </>
  );
}

export function WhyUsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.4]}
      frameloop="always"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
