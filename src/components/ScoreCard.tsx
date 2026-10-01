import { Gauge } from 'lucide-react';
import { SCORE_CARD } from '../data/site';
import { Reveal } from './ui/Reveal';
import { LinkButton } from './ui/LinkButton';

/**
 * TCS iON NQT score card — presented as an assessment result (not a
 * certificate). Percentages come straight from the official score card.
 */
export function ScoreCard() {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - SCORE_CARD.overall / 100);

  return (
    <Reveal>
      <article className="glass glass-hover mt-12 overflow-hidden p-6 sm:p-7">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          {/* overall */}
          <div className="flex items-center gap-5">
            <div className="relative h-[86px] w-[86px] shrink-0">
              <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden>
                <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  fill="none"
                  stroke="url(#score-grad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
                <defs>
                  <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7ee9ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="num absolute inset-0 grid place-items-center text-[17px] font-semibold text-white">
                {SCORE_CARD.overall}%
              </span>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neon-cyan/85">
                <Gauge size={13} aria-hidden />
                Assessment
              </span>
              <h3 className="mt-2 text-lg font-semibold text-white">{SCORE_CARD.exam} — Score Card</h3>
              <p className="mt-1 text-[12.5px] text-slate-400">{SCORE_CARD.detail}</p>
              <p className="num mt-1 text-[12px] text-slate-500">Exam date {SCORE_CARD.date}</p>
            </div>
          </div>

          {/* sections */}
          <div>
            <ul className="space-y-2.5">
              {SCORE_CARD.sections.map((section) => (
                <li key={section.label}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="text-slate-300">{section.label}</span>
                    <span className="num text-slate-200">{section.score.toFixed(2)}%</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan/80 to-neon-violet/70"
                      style={{ width: `${section.score}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
              <LinkButton href={SCORE_CARD.link} pendingLabel="PDF pending">
                View Score Card
              </LinkButton>
              <p className="text-[11.5px] leading-relaxed text-slate-500">
                Add the exported PDF to <span className="num">public/certificates/</span> to enable this button.
              </p>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
