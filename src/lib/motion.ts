import type { Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard scroll-reveal: fades up with a short, calm slide. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Staggered container — keeps child reveals short and sequential. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
