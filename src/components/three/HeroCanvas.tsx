import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitNodes } from './OrbitNodes';
import { ParticleField } from './ParticleField';
import { QuantumCore } from './QuantumCore';
import { AdaptiveDpr, CompileScene } from './perf';

type SceneProps = {
  quality: 'high' | 'low';
  /** Drives the pointer-reactive parallax. */
  intensity?: number;
};

/**
 * Scene rig: everything floats in one group whose orientation eases toward the
 * pointer, producing depth without any per-frame allocations.
 */
function Scene({ quality, intensity = 1 }: SceneProps) {
  const rig = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2());
  const current = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    const g = rig.current;
    if (!g) return;

    target.current.set(state.pointer.x * 0.32 * intensity, state.pointer.y * 0.24 * intensity);
    // Frame-rate independent easing.
    const t = 1 - Math.pow(0.0015, delta);
    current.current.lerp(target.current, t);

    g.rotation.y = current.current.x;
    g.rotation.x = -current.current.y * 0.75;
    g.position.x = current.current.x * 0.22;
    g.position.y = current.current.y * 0.22 + Math.sin(state.clock.elapsedTime * 0.5) * 0.07;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#9fd8ff" />
      <pointLight position={[-5, -3, 4]} intensity={22} distance={22} color="#8b5cf6" />
      <pointLight position={[4, 2, -4]} intensity={16} distance={20} color="#38e1ff" />

      <group ref={rig}>
        <QuantumCore detail={quality === 'high' ? 4 : 2} radius={quality === 'high' ? 1.45 : 1.3} />
        <OrbitNodes count={quality === 'high' ? 15 : 8} seedRadius={2.55} speed={quality === 'high' ? 1 : 0.6} />
        <ParticleField
          count={quality === 'high' ? 1300 : 380}
          radius={quality === 'high' ? 6.4 : 5.6}
          size={quality === 'high' ? 0.05 : 0.07}
          opacity={quality === 'high' ? 0.7 : 0.55}
          speed={0.05}
        />
      </group>
    </>
  );
}

type Props = {
  quality?: 'high' | 'low';
  /** Suspends rendering entirely (e.g. tab hidden or section off-screen). */
  paused?: boolean;
};

export function HeroCanvas({ quality = 'high', paused = false }: Props) {
  return (
    <Canvas
      dpr={quality === 'high' ? [1, 1.75] : [1, 1.25]}
      gl={{
        antialias: quality === 'high',
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 7.4], fov: 42, near: 0.1, far: 60 }}
      frameloop={paused ? 'never' : 'always'}
      style={{ pointerEvents: 'none' }}
      aria-hidden
    >
      <Scene quality={quality} />
      <AdaptiveDpr max={quality === 'high' ? 1.75 : 1.25} min={quality === 'high' ? 1 : 0.8} />
      <CompileScene />
    </Canvas>
  );
}
