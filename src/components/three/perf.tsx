import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

type DprProps = {
  /** Upper bound, normally the device pixel ratio cap for this quality tier. */
  max?: number;
  /** Lower bound — never drop below this or the scene turns to mush. */
  min?: number;
};

/**
 * Adaptive pixel ratio: when the measured frame rate sags, DPR steps down; when
 * it recovers, it steps back up. Replaces a heavyweight helper dependency with
 * ~20 lines and no extra bundle weight.
 */
export function AdaptiveDpr({ max = 1.5, min = 0.75 }: DprProps) {
  const setDpr = useThree((state) => state.setDpr);
  const current = useRef(max);
  const samples = useRef<number[]>([]);

  useFrame((_, delta) => {
    const buffer = samples.current;
    buffer.push(delta);
    if (buffer.length < 45) return;

    const average = buffer.reduce((total, value) => total + value, 0) / buffer.length;
    buffer.length = 0;
    const fps = 1 / average;

    let next = current.current;
    if (fps < 40 && next > min) next = Math.max(min, next - 0.25);
    else if (fps > 55 && next < max) next = Math.min(max, next + 0.25);

    if (next !== current.current) {
      current.current = next;
      setDpr(next);
    }
  });

  return null;
}

/**
 * Compiles every shader up front so the first interactive frame is not blocked
 * by on-demand program compilation (the usual cause of a 3D "stutter on load").
 */
export function CompileScene() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    gl.compile(scene, camera);
  }, [gl, scene, camera]);

  return null;
}
