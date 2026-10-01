import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { EXPERIENCES } from '../data/site';
import { EASE } from '../lib/motion';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const dotScale = useTransform(scrollYProgress, [0, 0.15, 1], [0.4, 1, 1]);

  return (
    <Section id="experience">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Internships that shaped how I work."
            description="Short, hands-on stints focused on front-end delivery and data analytics practice."
          />
        </Reveal>

        <div ref={trackRef} className="relative mt-14 pl-8 sm:pl-0">
          {/* rail */}
          <div
            aria-hidden
            className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-white/10 sm:left-[calc(50%-0.5px)] sm:w-px"
          >
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-neon-cyan via-neon-violet to-transparent"
              style={{ scaleY: lineScale }}
            />
          </div>

          <ol className="space-y-10 sm:space-y-14">
            {EXPERIENCES.map((experience, index) => {
              const right = index % 2 === 1;
              return (
                <li key={experience.id} className="relative">
                  {/* marker */}
                  <motion.span
                    aria-hidden
                    className="absolute -left-8 top-1.5 grid h-[23px] w-[23px] place-items-center rounded-full border border-neon-cyan/40 bg-ink-950 sm:left-1/2 sm:-translate-x-1/2"
                    style={{ scale: dotScale }}
                  >
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-neon-cyan/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_2px_rgba(56,225,255,0.7)]" />
                  </motion.span>

                  <motion.article
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: EASE }}
                    className={`sm:w-[calc(50%-2.25rem)] ${right ? 'sm:ml-[calc(50%+2.25rem)]' : 'sm:mr-[calc(50%+2.25rem)]'}`}
                  >
                    <div className="glass glass-hover group p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-cyan">
                            {right ? <GraduationCap size={16} aria-hidden /> : <Briefcase size={16} aria-hidden />}
                          </span>
                          <h3 className="text-base font-semibold text-white">{experience.org}</h3>
                        </div>
                        <span className="chip font-mono text-[10px] uppercase tracking-[0.14em]">{experience.type}</span>
                      </div>

                      <p className="mt-4 text-sm font-medium text-neon-cyan/90">{experience.role}</p>
                      <p className="num mt-1 text-[12px] text-slate-400">{experience.duration}</p>

                      <p className="mt-3.5 text-[13.5px] leading-relaxed text-slate-400">{experience.summary}</p>

                      <ul className="mt-4 space-y-2">
                        {experience.outcomes.map((outcome) => (
                          <li key={outcome} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300/85">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neon-violet" aria-hidden />
                            {outcome}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/8 pt-4">
                        {experience.tech.map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
