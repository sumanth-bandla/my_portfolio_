import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { EASE } from '../lib/motion';
import { useIsMobile, usePageVisible } from '../lib/hooks';
import { PROFILE } from '../data/site';
import { Magnetic } from './ui/Magnetic';
import { SocialLinks } from './SocialLinks';

/**
 * three.js is the heaviest dependency in the app, so the hero scene is loaded
 * as a separate chunk. The page paints (text, CTAs, layout) first and the
 * scene fades in when it is ready.
 */
const HeroCanvas = lazy(() => import('./three/HeroCanvas').then((m) => ({ default: m.HeroCanvas })));

const fade = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, delay: 0.12 + i * 0.09, ease: EASE },
  }),
};

export function Hero() {
  const isMobile = useIsMobile();
  const pageVisible = usePageVisible();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const quality = isMobile ? 'low' : 'high';
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;
  const initial = reduce ? false : 'hidden';

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pb-16 pt-24 sm:pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:py-28"
    >
      {/* ------------------------------- ambience ------------------------------ */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(56,225,255,0.10),transparent_60%),radial-gradient(90%_70%_at_85%_20%,rgba(139,92,246,0.14),transparent_65%)]" />
        <div className="absolute inset-0 bg-grid-fade bg-[size:56px_56px] opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-x relative grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        {/* -------------------------------- 3D core ---------------------------- */}
        <div className="order-1 h-[268px] w-full sm:h-[340px] lg:order-2 lg:h-[min(58vh,540px)]">
          <div className="relative h-full w-full">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.18),transparent_68%)] blur-xl"
            />
            <Suspense
              fallback={
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.05]"
                />
              }
            >
              <HeroCanvas quality={quality} paused={!pageVisible || !mounted} />
            </Suspense>
          </div>
        </div>

        {/* -------------------------------- content --------------------------- */}
        <div className="order-2 lg:order-1">
          <div className="max-w-2xl">
            <motion.div
              variants={fade}
              custom={0}
              initial={initial}
              animate={mounted ? 'show' : undefined}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12.5px] font-medium text-slate-300">Open to internships &amp; analytics work</span>
            </motion.div>

            <h1 className="font-display font-bold tracking-[-0.03em]">
              <motion.span
                variants={fade}
                custom={1}
                initial={initial}
                animate={mounted ? 'show' : undefined}
                className="block text-lg font-medium text-slate-400 sm:text-xl"
              >
                {PROFILE.name}
              </motion.span>

              <span className="mt-2.5 block text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.15rem] lg:leading-[1.1]">
                {PROFILE.headline.map((word, i) => (
                  <motion.span
                    key={word}
                    variants={fade}
                    custom={2 + i}
                    initial={initial}
                    animate={mounted ? 'show' : undefined}
                    className={`mr-3 inline-block will-transform ${
                      i === 0
                        ? 'text-gradient'
                        : i === 1
                          ? 'text-gradient-soft'
                          : 'bg-gradient-to-r from-neon-violet via-neon-pink to-neon-mint bg-clip-text text-transparent'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              variants={fade}
              custom={5}
              initial={initial}
              animate={mounted ? 'show' : undefined}
              className="mt-6 max-w-xl text-[13.5px] font-medium uppercase leading-relaxed tracking-[0.08em] text-neon-cyan/90 sm:text-sm"
            >
              Data Analyst <span className="text-slate-600">|</span> Python Developer{' '}
              <span className="text-slate-600">|</span> Data Science Enthusiast{' '}
              <span className="text-slate-600">|</span> Quantum Computing Learner
            </motion.p>

            <motion.p
              variants={fade}
              custom={6}
              initial={initial}
              animate={mounted ? 'show' : undefined}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base"
            >
              {PROFILE.tagline}
            </motion.p>

            <motion.div
              variants={fade}
              custom={7}
              initial={initial}
              animate={mounted ? 'show' : undefined}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={isMobile ? 0 : 10}>
                <a href="#projects" className="btn-primary group">
                  View Projects
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </Magnetic>

              <Magnetic strength={isMobile ? 0 : 8}>
                <a href={resumeHref} download className="btn-ghost group">
                  <Download size={16} aria-hidden />
                  Download Resume
                </a>
              </Magnetic>

              <Magnetic strength={isMobile ? 0 : 8}>
                <a href="#contact" className="btn-ghost group">
                  <Mail size={16} aria-hidden />
                  Contact Me
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={fade}
              custom={8}
              initial={initial}
              animate={mounted ? 'show' : undefined}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              <SocialLinks size={17} />
              <div className="hidden h-8 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-2 text-[13px] text-slate-400">
                <MapPin size={14} className="text-neon-cyan/70" aria-hidden />
                {PROFILE.location}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ------------------------------- scroll cue ----------------------------- */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : undefined}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors hover:text-neon-cyan lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
