import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

type Props = {
  value: number;
  /** Starting value for the roll-up animation (defaults close to the target). */
  from?: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
};

/** Counts up once, when the element first scrolls into view. */
export function Counter({ value, from, duration = 1.6, className, format }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const start = from ?? (value > 20 ? value - Math.max(6, Math.round(value * 0.06)) : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(start, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, start, duration, reduce]);

  return (
    <span ref={ref} className={`num ${className ?? ''}`}>
      {format ? format(Math.round(display)) : Math.round(display).toLocaleString('en-US')}
    </span>
  );
}
