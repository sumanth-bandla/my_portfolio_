import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionTemplate, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useHasHover } from '../../lib/hooks';

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the card's corners. */
  max?: number;
  /** Scales the card very slightly on hover. */
  zoom?: number;
  /** Radial highlight that follows the cursor. */
  spotlight?: boolean;
};

/**
 * 3D tilt card with a cursor-tracking specular highlight.
 * Falls back to a plain div on touch devices / reduced motion.
 */
export function TiltCard({ children, className = '', max = 9, zoom = 1.012, spotlight = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasHover = useHasHover();
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 170, damping: 18, mass: 0.4 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 170, damping: 18, mass: 0.4 });
  const s = useSpring(useMotionValue(1), { stiffness: 170, damping: 20 });

  // Hooks are always called; the template is simply unused when disabled.
  const spotlightX = useTransform(px, (v) => `${v * 100}%`);
  const spotlightY = useTransform(py, (v) => `${v * 100}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(520px circle at ${spotlightX} ${spotlightY}, rgba(56,225,255,0.13), rgba(139,92,246,0.07) 38%, transparent 68%)`;

  const enabled = hasHover && !reduce;

  if (!enabled) {
    return (
      <div className={`group relative ${className}`}>
        {spotlight ? (
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(420px_circle_at_50%_0%,rgba(56,225,255,0.10),transparent_70%)]" />
        ) : null}
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      style={{ rotateX: rx, rotateY: ry, scale: s, transformStyle: 'preserve-3d', perspective: 1000 }}
      onPointerMove={(event) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
        s.set(zoom);
      }}
      onPointerEnter={() => s.set(zoom)}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        s.set(1);
      }}
    >
      {spotlight ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />
      ) : null}
      <div style={{ transform: 'translateZ(24px)' }}>{children}</div>
    </motion.div>
  );
}
