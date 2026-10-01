import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useHasHover } from '../../lib/hooks';

type Props = {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the cursor, in px. */
  strength?: number;
};

/**
 * Magnetic hover wrapper: the child drifts toward the cursor with a spring,
 * and settles back on leave. Disabled for touch devices and reduced motion.
 */
export function Magnetic({ children, className, strength = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasHover = useHasHover();
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.35 });

  const enabled = hasHover && !reduce;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x: sx, y: sy } : undefined}
      onPointerMove={(event) => {
        if (!enabled || !ref.current) return;
        if (event.pointerType !== 'mouse') return;
        const rect = ref.current.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        x.set((relX / (rect.width / 2)) * strength);
        y.set((relY / (rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
