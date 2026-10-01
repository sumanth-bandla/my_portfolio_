import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient progress indicator fixed under the navigation bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-pink-400"
    />
  );
}
