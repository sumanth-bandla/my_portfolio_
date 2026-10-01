import { motion } from 'framer-motion';
import { Atom, BadgeCheck, BarChart3, Code2, FolderGit2, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CERTIFICATIONS, PROFILE, PROJECTS } from '../data/site';
import { Counter } from './ui/Counter';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { stagger } from '../lib/motion';

type Stat = {
  icon: LucideIcon;
  label: string;
  value?: number;
  from?: number;
  suffix?: string;
  note: string;
  accent: string;
  badge?: string;
};

const STATS: Stat[] = [
  {
    icon: GraduationCap,
    label: 'B.Tech CSE (Data Science)',
    value: 2027,
    from: 2025,
    note: 'RK College of Engineering',
    accent: 'text-neon-cyan',
  },
  {
    icon: BarChart3,
    label: 'Data Analytics',
    note: 'Cleaning · EDA · Reporting',
    accent: 'text-neon-violet',
  },
  {
    icon: Code2,
    label: 'Python & SQL',
    note: 'Scripts, queries and APIs',
    accent: 'text-blue-400',
  },
  {
    icon: Atom,
    label: 'Quantum Computing',
    note: 'Foundational study with Qiskit',
    accent: 'text-pink-300',
    badge: 'Learning',
  },
  {
    icon: FolderGit2,
    label: 'Projects',
    value: PROJECTS.length,
    note: 'Analytics, EDA and web apps',
    accent: 'text-mint-400',
  },
  {
    icon: BadgeCheck,
    label: 'Certifications',
    value: CERTIFICATIONS.length,
    note: 'Data, cloud and AI foundations',
    accent: 'text-amber-300',
  },
];

export function About() {
  return (
    <Section id="about" tint="cyan">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* ------------------------------- narrative --------------------------- */}
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="About"
                title="Turning raw data into insights that matter."
                description="A quick look at how I work and what I am building towards."
              />
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-7 text-[15.5px] leading-[1.85] text-slate-300/90 sm:text-base">{PROFILE.about}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <article className="glass glass-hover p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neon-cyan/80">Education</p>
                  <p className="mt-2.5 text-sm font-semibold text-white">{PROFILE.degree}</p>
                  <p className="mt-1 text-[13px] text-slate-400">
                    {PROFILE.college} · Graduating {PROFILE.graduation}
                  </p>
                </article>

                <article className="glass glass-hover p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neon-violet/85">Currently</p>
                  <ul className="mt-2.5 space-y-1.5 text-[13.5px] text-slate-300">
                    <li className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neon-violet" aria-hidden />
                      Studying quantum computing fundamentals with Qiskit
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neon-violet" aria-hidden />
                      Building dashboards and Python-based data projects
                    </li>
                  </ul>
                </article>
              </div>
            </Reveal>
          </div>

          {/* -------------------------------- stats ------------------------------ */}
          <Reveal delay={0.1}>
            <motion.ul
              variants={stagger(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
            >
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.li
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                    }}
                    className="glass glass-hover group flex flex-col justify-between p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] ${stat.accent}`}
                      >
                        <Icon size={17} aria-hidden />
                      </span>
                      {stat.badge ? (
                        <span className="rounded-full border border-pink-300/25 bg-pink-300/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.15em] text-pink-200">
                          {stat.badge}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5">
                      {stat.value !== undefined ? (
                        <p className="num text-2xl font-semibold tracking-tight text-white">
                          <Counter value={stat.value} from={stat.from} />
                          {stat.suffix ?? ''}
                        </p>
                      ) : null}
                      <p className={`${stat.value !== undefined ? 'mt-1' : 'text-[15px]'} font-medium text-white`}>
                        {stat.label}
                      </p>
                      <p className="mt-1 text-[12.5px] text-slate-400">{stat.note}</p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
