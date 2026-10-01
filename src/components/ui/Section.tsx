import type { ReactNode } from 'react';

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Adds a soft tinted wash behind the section. */
  tint?: 'none' | 'cyan' | 'violet';
};

const TINTS: Record<string, string> = {
  none: '',
  cyan: 'before:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,225,255,0.09),transparent_70%)]',
  violet: 'before:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(139,92,246,0.10),transparent_70%)]',
};

/** Consistent section shell with scroll offset for the sticky nav. */
export function Section({ id, children, className = '', tint = 'none' }: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-20 sm:py-24 lg:py-32 ${TINTS[tint]} before:pointer-events-none before:absolute before:inset-0 before:content-[''] ${className}`}
    >
      {children}
    </section>
  );
}
