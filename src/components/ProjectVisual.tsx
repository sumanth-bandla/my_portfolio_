import { motion } from 'framer-motion';
import type { Project } from '../data/site';

type Props = { kind: Project['kind']; title: string };

const ACCENTS: Record<Project['kind'], [string, string]> = {
  analytics: ['#38e1ff', '#3b82f6'],
  eda: ['#a78bfa', '#38e1ff'],
  app: ['#5eead4', '#38e1ff'],
  dashboard: ['#60a5fa', '#a78bfa'],
  concept: ['#f472b6', '#a78bfa'],
  quantum: ['#c084fc', '#38e1ff'],
};

/**
 * Generated project artwork — deterministic SVG per project type.
 * No stock photography, no external assets, nothing to 404.
 */
export function ProjectVisual({ kind, title }: Props) {
  const [from, to] = ACCENTS[kind];
  const gid = `grad-${kind}`;

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.1, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4, delay: 0.15 + i * 0.08 } },
    }),
  };

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900/70 sm:h-44">
      <svg
        viewBox="0 0 400 180"
        className="h-full w-full"
        role="img"
        aria-label={`${title} — abstract visualisation placeholder`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} stopOpacity="0.22" />
            <stop offset="100%" stopColor={to} stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id={`${gid}-line`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <pattern id={`${gid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="400" height="180" fill={`url(#${gid})`} />
        <rect width="400" height="180" fill={`url(#${gid}-grid)`} />

        {kind === 'analytics' ? (
          <g>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const h = [70, 112, 54, 132, 96, 148][i];
              return (
                <motion.rect
                  key={i}
                  x={44 + i * 46}
                  y={150 - h}
                  width="20"
                  height={h}
                  rx="5"
                  fill={`url(#${gid}-line)`}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 0.9 }}
                  viewport={{ once: true }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
            <motion.path
              d="M44 96 L136 74 L182 104 L274 58 L320 40"
              fill="none"
              stroke={from}
              strokeWidth="2"
              strokeLinecap="round"
              variants={draw}
              custom={4}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            />
          </g>
        ) : null}

        {kind === 'eda' ? (
          <g>
            {Array.from({ length: 26 }, (_, i) => {
              const x = 40 + ((i * 53) % 320);
              const y = 30 + ((i * 97) % 120);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={3.2}
                  fill={i % 4 === 0 ? to : from}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.85 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.025 }}
                />
              );
            })}
            <motion.path
              d="M40 140 C 110 120, 150 70, 230 62 S 330 46, 366 38"
              fill="none"
              stroke={to}
              strokeWidth="1.6"
              strokeDasharray="4 4"
              variants={draw}
              custom={6}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            />
          </g>
        ) : null}

        {kind === 'app' ? (
          <g>
            <rect x="34" y="34" width="332" height="112" rx="10" fill="#02030a" stroke="#ffffff" strokeOpacity="0.12" />
            <circle cx="50" cy="48" r="3" fill={from} />
            <circle cx="60" cy="48" r="3" fill={to} opacity="0.6" />
            <rect x="34" y="58" width="332" height="1" fill="#ffffff" fillOpacity="0.1" />
            <rect x="46" y="70" width="120" height="62" rx="7" fill={`url(#${gid}-line)`} opacity="0.35" />
            {[0, 1, 2].map((i) => (
              <motion.rect
                key={i}
                x={180}
                y={72 + i * 20}
                width={[150, 128, 96][i]}
                height="9"
                rx="4.5"
                fill="#ffffff"
                fillOpacity="0.22"
                initial={{ opacity: 0, x: 186 }}
                whileInView={{ opacity: 1, x: 180 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.09 }}
              />
            ))}
          </g>
        ) : null}

        {kind === 'dashboard' ? (
          <g>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={34 + i * 114} y="34" width="102" height="44" rx="8" fill={`url(#${gid}-line)`} opacity="0.3" />
                <text x={46 + i * 114} y="62" fill="#ffffff" fillOpacity="0.75" fontSize="17" fontFamily="monospace">
                  {['82%', '4.7k', '96%'][i]}
                </text>
              </g>
            ))}
            {Array.from({ length: 12 }, (_, i) => {
              const h = 18 + ((i * 37) % 62);
              return (
                <motion.rect
                  key={i}
                  x={38 + i * 28}
                  y={146 - h}
                  width="13"
                  height={h}
                  rx="3.5"
                  fill={i % 3 === 0 ? to : from}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 0.75 }}
                  viewport={{ once: true }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.045 }}
                />
              );
            })}
          </g>
        ) : null}

        {kind === 'concept' ? (
          <g>
            <path d="M20 150 C 90 120, 110 60, 190 74 S 300 130, 380 46" fill="none" stroke={from} strokeWidth="1.4" opacity="0.45" />
            <path d="M20 96 C 96 130, 150 100, 214 46 S 320 40, 380 96" fill="none" stroke={to} strokeWidth="1.4" opacity="0.4" />
            {Array.from({ length: 9 }, (_, i) => {
              const x = 50 + i * 38;
              const y = 46 + ((i * 61) % 92);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill={i % 2 ? from : to}
                  initial={{ r: 1, opacity: 0 }}
                  whileInView={{ r: 4.5, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.06 + i * 0.05 }}
                />
              );
            })}
          </g>
        ) : null}

        {kind === 'quantum' ? (
          <g>
            <circle cx="110" cy="90" r="52" fill="none" stroke={from} strokeOpacity="0.5" />
            <circle cx="110" cy="90" r="34" fill={`url(#${gid}-line)`} opacity="0.18" />
            <motion.ellipse
              cx="110"
              cy="90"
              rx="52"
              ry="18"
              fill="none"
              stroke={to}
              strokeOpacity="0.75"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '110px 90px' }}
            />
            {[0, 1, 2].map((i) => (
              <motion.g
                key={i}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.9 }}
              >
                <circle cx={236 + i * 44} cy={70 + (i % 2) * 40} r="7" fill={i === 1 ? to : from} />
                <path
                  d={`M236 ${70 + (i % 2) * 40} H${280 + i * 44}`}
                  stroke="#ffffff"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                />
              </motion.g>
            ))}
            <rect x="236" y="126" width="150" height="16" rx="8" fill="#ffffff" fillOpacity="0.12" />
          </g>
        ) : null}
      </svg>

      {/* glass sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </div>
  );
}
