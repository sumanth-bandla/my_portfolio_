import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FRESNEL_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRESNEL_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0), uPower);
    float alpha = fresnel * uIntensity;
    gl_FragColor = vec4(uColor * (0.55 + fresnel), alpha);
  }
`;

type Props = {
  radius?: number;
  detail?: number;
  color?: string;
  rimColor?: string;
};

type Falsify = {
  uniforms: Record<string, THREE.IUniform>;
  vertexShader: string;
  fragmentShader: string;
  transparent: boolean;
  depthWrite: boolean;
  side: THREE.Side;
  blending: THREE.Blending;
};

const fresnelMaterial = (
  color: THREE.ColorRepresentation,
  intensity: number,
  power: number,
): Falsify => ({
  uniforms: {
    uColor: { value: new THREE.Color(color) },
    uIntensity: { value: intensity },
    uPower: { value: power },
  },
  vertexShader: FRESNEL_VERTEX,
  fragmentShader: FRESNEL_FRAGMENT,
  transparent: true,
  depthWrite: false,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
});

/**
 * The hero "quantum core": a glass-like icosahedron with an additive rim glow
 * and three tilted orbital rings.
 */
export function QuantumCore({
  radius = 1.45,
  detail = 4,
  color = '#0b1a2b',
  rimColor = '#38e1ff',
}: Props) {
  const group = useRef<THREE.Group>(null);
  const nucleus = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  const rim = useMemo(() => fresnelMaterial(rimColor, 1.05, 2.4), [rimColor]);
  const inner = useMemo(() => fresnelMaterial('#8b5cf6', 0.55, 3.2), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    g.rotation.y += delta * 0.12;
    g.rotation.x = Math.sin(t * 0.28) * 0.13;

    // The nucleus breathes, which reads as "compute happening inside".
    if (nucleus.current) {
      const pulse = 1 + Math.sin(t * 1.6) * 0.06;
      nucleus.current.scale.setScalar(0.3 * pulse);
    }

    if (ringA.current) ringA.current.rotation.z += delta * 0.32;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.24;
    if (ringC.current) ringC.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={group}>
      {/* Solid glass body — reads as a physical object, not a flat wireframe. */}
      <mesh>
        <icosahedronGeometry args={[radius, detail]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.12}
          metalness={0.65}
          clearcoat={1}
          clearcoatRoughness={0.15}
          transparent
          opacity={0.5}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Faceted wireframe skin */}
      <mesh scale={1.004}>
        <icosahedronGeometry args={[radius, 2]} />
        <meshBasicMaterial
          color={rimColor}
          wireframe
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Glowing nucleus — gives the object a light source of its own */}
      <mesh ref={nucleus} scale={0.3}>
        <icosahedronGeometry args={[radius, 2]} />
        <meshStandardMaterial
          color="#0b2a3d"
          emissive={rimColor}
          emissiveIntensity={2.6}
          roughness={0.25}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Fresnel rims */}
      <mesh>
        <icosahedronGeometry args={[radius * 1.03, 3]} />
        <shaderMaterial {...rim} />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[radius, 3]} />
        <shaderMaterial {...inner} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[radius * 1.55, 0.008, 8, 96]} />
        <meshBasicMaterial color={rimColor} transparent opacity={0.55} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3.1, Math.PI / 5, 0]}>
        <torusGeometry args={[radius * 1.85, 0.006, 8, 96]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 1.7, 0, Math.PI / 3]}>
        <torusGeometry args={[radius * 2.15, 0.004, 8, 96]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.28} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
