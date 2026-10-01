import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, PROFILE } from '../data/site';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      // Keep Tab inside the drawer while it covers the page.
      if (event.key !== 'Tab') return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    // Move focus into the drawer so keyboard and screen-reader users land there.
    const firstLink = drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    firstLink?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Return focus to the trigger whenever the drawer closes (never on mount).
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open && burgerRef.current?.offsetParent) {
      burgerRef.current.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neon-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/10 bg-ink-950/70 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]" aria-label="Primary">
          <a href="#home" className="group flex shrink-0 items-center gap-2.5">
            <span
              aria-hidden
              className="relative grid h-9 w-9 place-items-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 font-display text-[13px] font-bold tracking-tight text-neon-cyan"
            >
              {PROFILE.initials}
              <span className="absolute inset-0 rounded-xl bg-neon-cyan/25 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-white sm:block">
              {PROFILE.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg border border-white/10 bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href={resumeHref} download className="btn-ghost !px-4 !py-2 !text-[13px]">
              Resume
            </a>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/[0.04] text-slate-200 transition-colors hover:border-neon-cyan/40 hover:text-white lg:hidden"
            >
              <span className="relative block h-[14px] w-[18px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-0 block h-px w-full bg-current"
                    animate={
                      open
                        ? i === 0
                          ? { top: 7, rotate: 45 }
                          : i === 1
                            ? { top: 7, opacity: 0 }
                            : { top: 7, rotate: -45 }
                        : { top: i * 5, rotate: 0, opacity: 1 }
                    }
                    transition={{ duration: reduce ? 0 : 0.25, ease: 'easeOut' }}
                  />
                ))}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* `inert` while closed so the hidden links are not tabbable. */}
      <motion.div
        id="mobile-menu"
        ref={drawerRef}
        {...(open ? {} : { inert: '' })}
        initial={false}
        animate={{ clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-16 z-40 origin-top lg:hidden"
      >
        <div className="h-[calc(100dvh-4rem)] border-t border-white/10 bg-ink-950/95 px-5 pb-10 pt-6 backdrop-blur-2xl">
          <ul className="space-y-1.5">
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.id}
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={open && !reduce ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: open ? 0.06 + i * 0.045 : 0, duration: 0.35 }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3.5 font-display text-lg transition-colors ${
                    active === link.id
                      ? 'border-neon-cyan/30 bg-neon-cyan/[0.07] text-white'
                      : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="num text-[11px] text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                </a>
              </motion.li>
            ))}
          </ul>

          <a href={resumeHref} download onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">
            Download Resume
          </a>

          <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Available for</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.55)]" />
            <span className="text-sm text-slate-300">Internships &amp; analytics work</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
