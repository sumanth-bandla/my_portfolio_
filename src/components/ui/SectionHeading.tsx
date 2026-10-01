import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  icon?: ReactNode;
};

/** Consistent section header: small eyebrow, large title, muted description. */
export function SectionHeading({ eyebrow, title, description, align = 'left', icon }: Props) {
  const center = align === 'center';
  return (
    <header className={`flex flex-col gap-4 ${center ? 'items-center text-center' : 'items-start'}`}>
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-neon-cyan/85">
          {eyebrow}
        </span>
        <span aria-hidden className="h-px w-10 bg-gradient-to-r from-neon-cyan/60 to-transparent" />
      </div>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-gradient-soft sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-[15px] leading-relaxed text-slate-400 ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
