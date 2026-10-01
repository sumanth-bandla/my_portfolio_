import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CERTIFICATIONS } from '../data/site';
import { useIsMobile } from '../lib/hooks';
import { LinkButton } from './ui/LinkButton';
import { ScoreCard } from './ScoreCard';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

/** Border/glow colour plus a lighter, contrast-safe text tint per card. */
const ACCENTS = [
  { base: '#38e1ff', text: '#a5ecff' },
  { base: '#a78bfa', text: '#d6c9ff' },
  { base: '#60a5fa', text: '#bcd6ff' },
  { base: '#5eead4', text: '#b6f2e6' },
  { base: '#f472b6', text: '#fbc9e2' },
];

const PERSPECTIVE = 1700;
/** Cards further than this angle from the front are hidden entirely. */
const VISIBLE_ARC = 42;

export function Certifications() {
  const count = CERTIFICATIONS.length;
  const isMobile = useIsMobile(640);
  const reduce = useReducedMotion();

  const step = 360 / count; // degrees between neighbours

  // --- Geometry -------------------------------------------------------------
  // The reel is a circle in 3D, but we want *screen* spacing between cards, so
  // the world radius is solved from the desired on-screen offset and the CSS
  // perspective, then cards are pre-scaled back to their natural size.
  const cardWidth = isMobile ? 188 : 250;
  const cardHeight = isMobile ? 258 : 290;
  const gap = isMobile ? 16 : 26;

  const neighbourOffset = cardWidth + gap; // on-screen px from centre to neighbour
  const visualRadius = neighbourOffset / Math.sin((Math.PI * step) / 180);
  const worldRadius = (visualRadius * PERSPECTIVE) / (PERSPECTIVE + visualRadius);
  const cardScale = 1 - worldRadius / PERSPECTIVE;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  // Gentle auto-rotation; pauses on hover, focus and reduced-motion.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 4200);
    return () => window.clearInterval(id);
  }, [reduce, paused, count]);

  return (
    <Section id="certifications">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Certifications"
              title="Verified learning, not decoration."
              description="Foundations across data, cloud, AI and quantum-adjacent topics. Credential links unlock once uploaded."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous certification"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.03] text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-white"
              >
                <ChevronLeft size={17} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next certification"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.03] text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-white"
              >
                <ChevronRight size={17} aria-hidden />
              </button>
            </div>
          </Reveal>
        </div>

        <ScoreCard />

        <div
          className="relative mt-10 overflow-hidden"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={(event) => {
            pointerStart.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (pointerStart.current === null) return;
            const delta = event.clientX - pointerStart.current;
            pointerStart.current = null;
            if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
          }}
        >
          {/*
            Keyboard users browse with the Previous / Next buttons and the
            pagination dots below; the reel itself is only a pointer affordance,
            so it stays out of the tab order.
          */}
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Certifications"
            className="relative mx-auto w-full"
            style={{ height: cardHeight + 56, perspective: `${PERSPECTIVE}px` }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-0 w-0 will-transform"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: reduce ? 0 : -index * step }}
              transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 0.6 }}
            >
              {CERTIFICATIONS.map((cert, i) => {
                const rel = (((i - index) * step + 540) % 360) - 180;
                const distance = Math.abs(rel);
                const inView = distance <= VISIBLE_ARC;
                // Depth uses a darkening scrim (not opacity) so text contrast
                // stays WCAG AA on every card.
                const scrim = Math.min(0.42, (distance / VISIBLE_ARC) * 0.42);
                const scale = cardScale * (1 - Math.min(0.05, (distance / VISIBLE_ARC) * 0.05));
                const accent = ACCENTS[i % ACCENTS.length].base;
                const accentText = ACCENTS[i % ACCENTS.length].text;

                return (
                  <div
                    key={cert.id}
                    aria-hidden={!inView}
                    {...(inView ? {} : { inert: '' })}
                    className="absolute left-0 top-0"
                    style={{
                      width: cardWidth,
                      transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${worldRadius}px) scale(${scale})`,
                      transformStyle: 'preserve-3d',
                      visibility: inView ? 'visible' : 'hidden',
                      pointerEvents: distance < 20 ? 'auto' : 'none',
                      zIndex: 100 - Math.round(distance),
                    }}
                  >
                    <article
                      className="glass glass-hover relative flex flex-col justify-between p-5"
                      style={{ height: cardHeight }}
                    >
                      {scrim > 0.02 ? (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-2xl bg-ink-950"
                          style={{ opacity: scrim }}
                        />
                      ) : null}

                      <div className="relative">
                        <div className="flex items-start justify-between">
                          <span
                            className="grid h-11 w-11 place-items-center rounded-xl border text-sm font-bold"
                            style={{
                              borderColor: `${accent}44`,
                              background: `${accent}14`,
                              color: accentText,
                            }}
                          >
                            {cert.issuer.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="num text-[11px] text-slate-400">{cert.year}</span>
                        </div>

                        <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-400">
                          {cert.issuer}
                        </p>
                        <h3 className="mt-2 text-[15px] font-semibold leading-snug text-white">{cert.title}</h3>
                        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-slate-400">{cert.note}</p>
                      </div>

                      <div className="relative">
                        <div className="mb-4 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
                        <LinkButton
                          href={cert.link}
                          className="w-full !px-3 !py-2.5 !text-[13px]"
                          pendingLabel="Pending"
                        >
                          View Certificate
                        </LinkButton>
                        {cert.verify ? (
                          <a
                            href={cert.verify}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="mt-2 block py-1 text-center text-[11px] text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-neon-cyan"
                          >
                            Verify on {cert.issuer}
                          </a>
                        ) : null}
                      </div>
                    </article>
                  </div>
                );
              })}
            </motion.div>

            {/* floor glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-14 w-[62%] max-w-2xl rounded-[100%] bg-neon-cyan/10 blur-3xl"
            />
          </div>

          {/* progress dots — 24px hit areas around small visual dots */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-1">
            {CERTIFICATIONS.map((cert, i) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${cert.issuer} — ${cert.title}`}
                aria-current={i === index}
                className="grid h-6 w-6 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-6 bg-neon-cyan' : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
