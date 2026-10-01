import type { HTMLAttributes, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'span' | 'article';
} & HTMLAttributes<HTMLDivElement>;

/** Fade + slide on scroll into view. Respects prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, as = 'div', ...rest }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    return (
      <Comp className={className} {...(rest as Record<string, unknown>)}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Comp>
  );
}
