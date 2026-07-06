"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Orbits() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!sphereRef.current) return;
    sphereRef.current.rotation.x += delta * 0.06;
    sphereRef.current.rotation.y += delta * 0.09;
    // Autonomous drift — no cursor needed. A slow time-based orbit so
    // the sphere glides on its own.
    const t = state.clock.elapsedTime;
    sphereRef.current.position.x = Math.sin(t * 0.2) * 0.3;
    sphereRef.current.position.y = Math.cos(t * 0.16) * 0.22;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 5]} intensity={2.2} color="#7ea8dc" />
      <pointLight position={[-5, -3, -2]} intensity={1.0} color="#1e4d8b" />

      {/* Main distorted sphere */}
      <Float
        speed={1.2}
        rotationIntensity={0.5}
        floatIntensity={1.0}
        floatingRange={[-0.12, 0.12]}
      >
        <Sphere ref={sphereRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#1e4d8b"
            distort={0.38}
            speed={1.3}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Two thin orbital rings — premium feel */}
      <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.3}>
        <Torus
          args={[2.4, 0.014, 16, 200]}
          rotation={[Math.PI / 3, 0, 0.3]}
        >
          <meshStandardMaterial
            color="#b89968"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.4}
          />
        </Torus>
      </Float>
      <Float speed={0.5} rotationIntensity={0.25} floatIntensity={0.25}>
        <Torus
          args={[2.9, 0.010, 16, 200]}
          rotation={[Math.PI / 4, Math.PI / 5, 0]}
        >
          <meshStandardMaterial
            color="#7ea8dc"
            metalness={0.85}
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </Torus>
      </Float>
    </>
  );
}

/**
 * Background 3D scene for the Services section.
 * — Mounts only when the parent is in view (handled by the consumer
 *   via IntersectionObserver-gated dynamic import).
 * — `paused` stops the render loop while the section is off-screen
 *   (keeps the WebGL context alive; `always` would keep drawing every
 *   frame for the rest of the session and jank mobile scrolling).
 * — `dpr` lets the consumer cap the buffer size (the canvas covers the
 *   whole section, which stacks very tall on mobile).
 * — Throttled DPR + low poly counts for cheap rendering.
 * — Soft radial mask so it fades into the section background.
 */
export function ServicesScene({
  paused = false,
  dpr,
}: {
  paused?: boolean;
  dpr?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      dpr={dpr ?? [1, 1.4]}
      frameloop={paused ? "never" : "always"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Orbits />
      </Suspense>
    </Canvas>
  );
}
