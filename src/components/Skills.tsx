import { lazy, Suspense, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Atom, BarChart3, Code2, Database, LineChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/site';
import { useIsMobile } from '../lib/hooks';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

/** Loaded on demand — only when the section is about to be scrolled into view. */
const SkillsCanvas = lazy(() =>
  import('./three/SkillsCanvas').then((m) => ({ default: m.SkillsCanvas })),
);

const ICONS: Record<string, LucideIcon> = {
  programming: Code2,
  data: Database,
  visualization: LineChart,
  tools: BarChart3,
  quantum: Atom,
};

const ACCENT_TEXT: Record<string, string> = {
  cyan: 'text-neon-cyan',
  violet: 'text-neon-violet',
  blue: 'text-blue-300',
  mint: 'text-mint-400',
  pink: 'text-pink-300',
};

const ACCENT_BAR: Record<string, string> = {
  cyan: 'from-neon-cyan/80 to-neon-cyan/20',
  violet: 'from-neon-violet/80 to-neon-violet/20',
  blue: 'from-blue-400/80 to-blue-400/20',
  mint: 'from-mint-400/80 to-mint-400/20',
  pink: 'from-pink-300/80 to-pink-300/20',
};

const ACCENT_BORDER: Record<string, string> = {
  cyan: 'hover:border-neon-cyan/35',
  violet: 'hover:border-neon-violet/35',
  blue: 'hover:border-blue-400/35',
  mint: 'hover:border-mint-400/35',
  pink: 'hover:border-pink-300/35',
};

export function Skills() {
  const [focused, setFocused] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const backdropRef = useRef<HTMLDivElement>(null);
  const nearViewport = useInView(backdropRef, { once: true, margin: '250px' });

  return (
    <Section id="skills">
      {/* 3D ecosystem backdrop — mounted only when it is nearly on screen */}
      {!reduce ? (
        <div ref={backdropRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-[560px] opacity-60 sm:opacity-80">
            {nearViewport ? (
              <Suspense fallback={null}>
                <SkillsCanvas quality={isMobile ? 'low' : 'high'} />
              </Suspense>
            ) : null}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_20%,transparent,rgba(3,4,10,0.75))]" />
        </div>
      ) : null}

      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="A 3D map of my toolkit."
              description="Hover or focus a category to isolate it in the ecosystem. Meters reflect how actively I use each area right now — quantum is foundational and still being learned."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-400">Focus</span>
              <button
                type="button"
                onClick={() => setFocused(null)}
                className={`chip transition-colors ${focused === null ? 'border-white/25 bg-white/10 text-white' : 'hover:text-white'}`}
              >
                All
              </button>
              {SKILL_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFocused((f) => (f === c.id ? null : c.id))}
                  onMouseEnter={() => setFocused(c.id)}
                  className={`chip transition-colors ${focused === c.id ? 'border-white/25 bg-white/10 text-white' : 'hover:text-white'}`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div
          className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          onMouseLeave={() => setFocused(null)}
        >
          {SKILL_CATEGORIES.map((category, index) => {
            const Icon = ICONS[category.id] ?? Code2;
            const dim = focused !== null && focused !== category.id;

            return (
              <Reveal key={category.id} delay={index * 0.06}>
                <motion.article
                  onMouseEnter={() => setFocused(category.id)}
                  animate={{ opacity: dim ? 0.38 : 1, scale: dim ? 0.985 : 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`glass glass-hover h-full p-6 ${ACCENT_BORDER[category.accent]}`}
                >
                  <header className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] ${ACCENT_TEXT[category.accent]}`}
                      >
                        <Icon size={17} aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-white">{category.title}</h3>
                        <p className="mt-0.5 text-[12px] text-slate-400">{category.items.length} areas</p>
                      </div>
                    </div>
                    {category.id === 'quantum' ? (
                      <span className="shrink-0 rounded-full border border-pink-300/25 bg-pink-300/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-pink-200">
                        Learning
                      </span>
                    ) : null}
                  </header>

                  <p className="mt-4 text-[13px] leading-relaxed text-slate-400">{category.caption}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        Current focus
                      </span>
                      <span className="num text-[11px] text-slate-400">{category.level}%</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${ACCENT_BAR[category.accent]}`}
                        initial={{ width: reduce ? `${category.level}%` : 0 }}
                        whileInView={{ width: `${category.level}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                      />
                    </div>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="chip transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09] hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}

          {/* ecosystem legend keeps the 3D layer meaningful */}
          <Reveal delay={0.3}>
            <article className="glass flex h-full flex-col justify-between p-6">
              <div>
                <h3 className="text-base font-semibold text-white">Ecosystem legend</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-400">
                  Each cluster in the field behind this grid is one skill category. Nodes are individual tools —
                  connected where they are used together.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {SKILL_CATEGORIES.map((category) => (
                  <li key={category.id} className="flex items-center justify-between text-[12.5px]">
                    <span className="flex items-center gap-2.5 text-slate-300">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          category.accent === 'cyan'
                            ? 'bg-neon-cyan'
                            : category.accent === 'violet'
                              ? 'bg-neon-violet'
                              : category.accent === 'blue'
                                ? 'bg-blue-400'
                                : category.accent === 'mint'
                                  ? 'bg-mint-400'
                                  : 'bg-pink-300'
                        }`}
                      />
                      {category.title}
                    </span>
                    <span className="num text-slate-400">{category.items.length}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
