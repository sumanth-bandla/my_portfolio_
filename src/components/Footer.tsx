import { ArrowUp, Download } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../data/site';
import { Magnetic } from './ui/Magnetic';
import { Reveal } from './ui/Reveal';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;
  const year = 2026;

  return (
    <footer className="relative mt-8 border-t border-white/10 bg-ink-900/40">
      {/* CTA band */}
      <div className="container-x py-20 sm:py-24">
        <Reveal>
          <div className="glass relative overflow-hidden p-8 text-center sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(56,225,255,0.14),transparent_70%)]"
            />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan/85">
                Open to work
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-gradient-soft sm:text-4xl">
                Want to see the details behind the dashboards?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-slate-400">
                My resume covers coursework, projects, certifications and the tools I work with day to day.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Magnetic strength={10}>
                  <a href={resumeHref} download className="btn-primary group">
                    <Download size={16} aria-hidden />
                    Download Resume
                  </a>
                </Magnetic>
                <Magnetic strength={8}>
                  <a href="#contact" className="btn-ghost">
                    Get in touch
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Footer bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
          <p className="text-center text-[12.5px] text-slate-400 sm:text-left">
            © {year} {PROFILE.name}. Built with curiosity, code and data.
          </p>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.slice(1).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-[12.5px] text-slate-400 transition-colors hover:text-neon-cyan"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SocialLinks size={15} />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              <ArrowUp size={15} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
