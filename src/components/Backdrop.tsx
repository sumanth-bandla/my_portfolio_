import { PROFILE } from '../data/site';

/**
 * Global ambient background: layered gradients, a faint grid and a subtle
 * floating particle drift. Pure CSS + one SVG layer, so it costs nothing.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute -left-[10%] top-[-10%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.10),transparent_65%)] blur-3xl" />
      <div className="absolute -right-[15%] top-[35%] h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.11),transparent_65%)] blur-3xl" />
      <div className="absolute bottom-[-15%] left-[25%] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(5,225,180,0.06),transparent_70%)] blur-3xl" />

      <div className="absolute inset-0 bg-grid-fade bg-[size:64px_64px] opacity-[0.22] [mask-image:radial-gradient(90%_70%_at_50%_30%,black,transparent_78%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden>
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {[
          [8, 22, 1.4],
          [22, 64, 1],
          [38, 12, 1.1],
          [52, 78, 1.3],
          [64, 34, 1],
          [74, 88, 1.2],
          [86, 18, 1.1],
          [93, 58, 1.4],
          [31, 92, 1],
          [47, 48, 0.9],
          [12, 78, 1],
          [81, 6, 1.2],
        ].map(([left, top, delay], i) => (
          <circle
            key={i}
            cx={`${left}%`}
            cy={`${top}%`}
            r="1.6"
            fill="#7dd3fc"
            filter="url(#soft-glow)"
            style={{ animation: `float-slow 9s ease-in-out ${delay * 0.7}s infinite` }}
          />
        ))}
      </svg>

      {/* Vignette + top glow for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.035),transparent_45%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_220px_60px_rgba(3,4,10,0.85)]" />

      {/* Signature: a faint monogram watermark, adds depth without noise */}
      <div className="absolute bottom-[6%] right-[4%] hidden select-none font-display text-[22vw] font-bold leading-none text-white/[0.012] lg:block">
        {PROFILE.initials}
      </div>
    </div>
  );
}
