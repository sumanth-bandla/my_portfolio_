import { motion } from 'framer-motion';
import { Award, MapPin } from 'lucide-react';
import { EDUCATION, PROFILE } from '../data/site';
import { EASE } from '../lib/motion';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

export function Education() {
  return (
    <Section id="education" tint="cyan">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Education"
              title="Academic foundation."
              description="Computer Science & Engineering with a Data Science specialisation, plus the fundamentals I lean on when working with data."
            />

            <div className="mt-8 space-y-3">
              <div className="glass flex items-center gap-3 p-4">
                <Award size={16} className="shrink-0 text-neon-cyan" aria-hidden />
                <p className="text-[13px] text-slate-300">
                  Expected graduation <span className="num font-semibold text-white">{PROFILE.graduation}</span>
                </p>
              </div>
              <div className="glass flex items-center gap-3 p-4">
                <MapPin size={16} className="shrink-0 text-neon-violet" aria-hidden />
                <p className="text-[13px] text-slate-300">{PROFILE.location}</p>
              </div>
            </div>
          </Reveal>

          <div className="relative pl-8">
            <span aria-hidden className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent" />

            <ol className="space-y-8">
              {EDUCATION.map((entry, index) => (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative"
                >
                  <span
                    aria-hidden
                    className="absolute -left-8 top-2 h-[11px] w-[11px] rounded-full border border-neon-cyan/60 bg-ink-950 shadow-[0_0_12px_1px_rgba(56,225,255,0.45)]"
                  />
                  <article className="glass glass-hover p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="num text-[11.5px] tracking-wider text-neon-cyan/85">{entry.duration}</span>
                      <span className="chip font-mono text-[10px] uppercase tracking-[0.14em]">
                        {index === 0 ? 'Undergraduate' : 'Higher Secondary'}
                      </span>
                    </div>
                    <h3 className="mt-3.5 text-base font-semibold leading-snug text-white">{entry.school}</h3>
                    <p className="mt-1.5 text-[13.5px] text-neon-violet/90">{entry.degree}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{entry.detail}</p>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
