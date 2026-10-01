import * as THREE from 'three';

/** Soft round sprite for particle systems (generated once, cached). */
let cachedTexture: THREE.Texture | null = null;

export function getDotTexture(): THREE.Texture {
  if (cachedTexture) return cachedTexture;

  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.85)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  cachedTexture = new THREE.CanvasTexture(canvas);
  cachedTexture.needsUpdate = true;
  return cachedTexture;
}

/** Evenly distributed points on a spherical shell (Fibonacci sphere + jitter). */
export function shellPositions(count: number, radius: number, depth = 0.35): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const r = radius * (1 - depth * Math.random());
    positions[i * 3] = Math.cos(theta) * ringRadius * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = Math.sin(theta) * ringRadius * r;
  }

  return positions;
}
