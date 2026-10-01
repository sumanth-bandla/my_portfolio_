import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getDotTexture, shellPositions } from './utils';

type Props = {
  count: number;
  radius: number;
  color?: string;
  size?: number;
  speed?: number;
  opacity?: number;
  /** Vertical squash for a subtle disc-like feel. */
  flatten?: number;
};

/** Slowly breathing particle shell. Cheap: one draw call, no per-frame allocation. */
export function ParticleField({
  count,
  radius,
  color = '#38e1ff',
  size = 0.045,
  speed = 0.06,
  opacity = 0.75,
  flatten = 1,
}: Props) {
  const ref = useRef<THREE.Points>(null);
  const texture = useMemo(() => getDotTexture(), []);
  const positions = useMemo(() => shellPositions(count, radius), [count, radius]);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;
    points.rotation.y += delta * speed;
    points.rotation.x += delta * speed * 0.28;
  });

  return (
    <points ref={ref} scale={[1, flatten, 1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
