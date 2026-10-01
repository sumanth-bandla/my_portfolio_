import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

type NodeSpec = { radius: number; size: number; color: string; y: number; tilt: number; shape: 'box' | 'octa' };

type Props = {
  count?: number;
  seedRadius?: number;
  colors?: string[];
  speed?: number;
};

/** Data nodes orbiting the core on tilted rings — reads as a live system. */
export function OrbitNodes({ count = 14, seedRadius = 2.6, colors = ['#38e1ff', '#8b5cf6', '#5eead4'], speed = 1 }: Props) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const bobbers = useRef<THREE.Group>(null);

  const outerNodes = useMemo<NodeSpec[]>(
    () =>
      Array.from({ length: Math.max(3, Math.round(count * 0.65)) }, (_, i) => ({
        radius: seedRadius + (i % 3) * 0.32,
        size: 0.055 + (i % 4) * 0.018,
        color: colors[i % colors.length],
        y: (i % 5) * 0.22 - 0.44,
        tilt: (i / Math.max(1, count * 0.65)) * Math.PI * 2,
        shape: i % 3 === 0 ? 'box' : 'octa',
      })),
    [count, seedRadius, colors],
  );

  const innerNodes = useMemo<NodeSpec[]>(
    () =>
      Array.from({ length: Math.max(2, Math.round(count * 0.35)) }, (_, i) => ({
        radius: seedRadius * 0.62,
        size: 0.04 + (i % 3) * 0.014,
        color: colors[(i + 1) % colors.length],
        y: (i % 3) * 0.3 - 0.3,
        tilt: (i / Math.max(1, count * 0.35)) * Math.PI * 2,
        shape: 'box',
      })),
    [count, seedRadius, colors],
  );

  useFrame((state, delta) => {
    if (outer.current) outer.current.rotation.y += delta * 0.14 * speed;
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.24 * speed;
      inner.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (bobbers.current) bobbers.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.09;
  });

  return (
    <group ref={bobbers}>
      <group ref={outer}>
        {outerNodes.map((n, i) => (
          <mesh key={`o-${i}`} position={[Math.cos(n.tilt) * n.radius, n.y, Math.sin(n.tilt) * n.radius]}>
            {n.shape === 'box' ? <boxGeometry args={[n.size, n.size, n.size]} /> : <octahedronGeometry args={[n.size * 1.5, 0]} />}
            <meshStandardMaterial
              color={n.color}
              emissive={n.color}
              emissiveIntensity={1.5}
              roughness={0.3}
              metalness={0.7}
              transparent
              opacity={0.95}
            />
          </mesh>
        ))}
      </group>

      <group ref={inner}>
        {innerNodes.map((n, i) => (
          <mesh key={`i-${i}`} position={[Math.cos(n.tilt) * n.radius, n.y, Math.sin(n.tilt) * n.radius]}>
            <boxGeometry args={[n.size, n.size, n.size]} />
            <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={1.9} roughness={0.25} metalness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
