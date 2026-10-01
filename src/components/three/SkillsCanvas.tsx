import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { getDotTexture } from './utils';
import { SKILL_CATEGORIES } from '../../data/site';
import { usePageVisible } from '../../lib/hooks';

const ACCENTS: Record<string, string> = {
  cyan: '#38e1ff',
  violet: '#a78bfa',
  blue: '#60a5fa',
  mint: '#5eead4',
  pink: '#f472b6',
};

type Network = {
  pointPositions: Float32Array;
  pointColors: Float32Array;
  linePositions: Float32Array;
  lineColors: Float32Array;
};

/**
 * Builds five colour-coded clusters (one per skill category), each linked by
 * short intra-cluster edges. Runs once at mount.
 */
function buildNetwork(): Network {
  const points: THREE.Vector3[] = [];
  const colors: THREE.Color[] = [];
  const clusters: THREE.Vector3[][] = [];

  SKILL_CATEGORIES.forEach((category, index) => {
    const angle = (index / SKILL_CATEGORIES.length) * Math.PI * 2;
    const center = new THREE.Vector3(Math.cos(angle) * 2.15, Math.sin(angle) * 1.05, (index % 2 ? 0.5 : -0.5));
    const color = new THREE.Color(ACCENTS[category.accent] ?? '#38e1ff');
    const cluster: THREE.Vector3[] = [];

    category.items.forEach(() => {
      const shell = 0.72 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const point = new THREE.Vector3(
        center.x + shell * Math.sin(phi) * Math.cos(theta),
        center.y + shell * Math.cos(phi) * 0.7,
        center.z + shell * Math.sin(phi) * Math.sin(theta),
      );
      cluster.push(point);
      points.push(point);
      colors.push(color);
    });

    clusters.push(cluster);
  });

  const pointPositions = new Float32Array(points.length * 3);
  const pointColors = new Float32Array(points.length * 3);
  points.forEach((p, i) => {
    pointPositions[i * 3] = p.x;
    pointPositions[i * 3 + 1] = p.y;
    pointPositions[i * 3 + 2] = p.z;
    const c = colors[i];
    pointColors[i * 3] = c.r;
    pointColors[i * 3 + 1] = c.g;
    pointColors[i * 3 + 2] = c.b;
  });

  const linePositions: number[] = [];
  const lineColors: number[] = [];
  const seen = new Set<string>();

  clusters.forEach((cluster, clusterIndex) => {
    const color = new THREE.Color(ACCENTS[SKILL_CATEGORIES[clusterIndex].accent] ?? '#38e1ff');
    cluster.forEach((a, i) => {
      const neighbours = cluster
        .map((b, j) => ({ j, d: a.distanceTo(b) }))
        .filter((n) => n.j !== i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);

      neighbours.forEach(({ j, d }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key) || d > 1.6) return;
        seen.add(key);
        const b = cluster[j];
        linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        lineColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      });
    });
  });

  return {
    pointPositions,
    pointColors,
    linePositions: new Float32Array(linePositions),
    lineColors: new Float32Array(lineColors),
  };
}

function Network3D() {
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(() => getDotTexture(), []);
  const network = useMemo(buildNetwork, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y += delta * 0.06;
    g.rotation.x = Math.sin(t * 0.22) * 0.16 + state.pointer.y * 0.12;
    g.rotation.z = Math.cos(t * 0.18) * 0.05;
    g.position.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[network.lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.pointPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[network.pointColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          vertexColors
          size={0.13}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

type Props = { quality?: 'high' | 'low' };

/** Ambient 3D backdrop for the Skills section — the "skills ecosystem". */
export function SkillsCanvas({ quality = 'high' }: Props) {
  const visible = usePageVisible();

  return (
    <Canvas
      dpr={quality === 'high' ? [1, 1.5] : 1}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6.6], fov: 46, near: 0.1, far: 40 }}
      frameloop={visible ? 'always' : 'never'}
      style={{ pointerEvents: 'none' }}
      aria-hidden
    >
      <Network3D />
      <AdaptiveDpr pixelated />
      <Preload all />
    </Canvas>
  );
}
