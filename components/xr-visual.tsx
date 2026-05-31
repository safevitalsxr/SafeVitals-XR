"use client";

import { Float, Line, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function PatientTwin() {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.22;
      group.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.92, 0]}>
        <sphereGeometry args={[0.28, 48, 48]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.62} emissive="#00e5ff" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.34, 1.15, 8, 32]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.34} roughness={0.25} metalness={0.15} />
      </mesh>
      <mesh position={[-0.46, 0.25, 0]} rotation={[0, 0, -0.24]}>
        <capsuleGeometry args={[0.08, 0.9, 8, 20]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.26} />
      </mesh>
      <mesh position={[0.46, 0.25, 0]} rotation={[0, 0, 0.24]}>
        <capsuleGeometry args={[0.08, 0.9, 8, 20]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.26} />
      </mesh>
      <mesh position={[-0.18, -0.85, 0]} rotation={[0, 0, 0.08]}>
        <capsuleGeometry args={[0.1, 1.05, 8, 20]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.26} />
      </mesh>
      <mesh position={[0.18, -0.85, 0]} rotation={[0, 0, -0.08]}>
        <capsuleGeometry args={[0.1, 1.05, 8, 20]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.26} />
      </mesh>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.16}>
        <Sphere args={[0.13, 32, 32]} position={[0.08, 0.26, 0.26]}>
          <meshStandardMaterial color="#ff3b5c" emissive="#ff3b5c" emissiveIntensity={1.8} />
        </Sphere>
        <Sphere args={[0.09, 32, 32]} position={[-0.12, 0.12, 0.28]}>
          <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.3} />
        </Sphere>
      </Float>
      <Line
        points={[[-1.1, 0.25, 0], [-0.15, 0.25, 0], [0, 0.42, 0], [0.15, 0.05, 0], [1.1, 0.05, 0]]}
        color="#00ff9d"
        lineWidth={2}
      />
    </group>
  );
}

export function XrVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded border border-white/10 bg-[#07111f] ${compact ? "h-[360px]" : "h-[560px]"}`}>
      <Canvas camera={{ position: [0, 0.25, 4.2], fov: 42 }} dpr={[1, 1.6]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[2.4, 2.2, 3]} intensity={3} color="#00e5ff" />
          <pointLight position={[-2.2, -1, 2]} intensity={2.2} color="#7c3aed" />
          <PatientTwin />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]}>
            <ringGeometry args={[1.1, 1.12, 96]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.55} />
          </mesh>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent,rgba(5,8,22,.74)_76%)]" />
      <div className="absolute left-4 top-4 rounded border border-cyan/25 bg-void/70 px-3 py-2 font-mono text-xs text-cyan backdrop-blur">
        LIVE TWIN 03
      </div>
      <div className="absolute bottom-4 right-4 grid gap-2 rounded border border-white/10 bg-void/70 p-3 font-mono text-xs text-white backdrop-blur">
        <span>HR 82 BPM</span>
        <span className="text-mint">SpO2 98%</span>
        <span className="text-amber">Sepsis risk 12%</span>
      </div>
    </div>
  );
}
