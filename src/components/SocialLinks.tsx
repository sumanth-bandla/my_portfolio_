import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LINKS, PROFILE, isPlaceholder } from '../data/site';

type Props = {
  size?: number;
  className?: string;
  /** Adds a hover tooltip with the network name (used in contact / footer). */
  withLabels?: boolean;
};

type SocialItem = {
  key: string;
  href: string;
  Icon: LucideIcon;
  mailto?: boolean;
};

const ITEMS: SocialItem[] = [
  { key: 'GitHub', href: LINKS.github, Icon: Github },
  { key: 'LinkedIn', href: LINKS.linkedin, Icon: Linkedin },
  { key: 'Instagram', href: LINKS.instagram, Icon: Instagram },
  { key: 'Email', href: LINKS.email, Icon: Mail, mailto: true },
];

export function SocialLinks({ size = 18, className = '', withLabels = false }: Props) {
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {ITEMS.map(({ key, href, Icon, mailto }) => {
        const pending = isPlaceholder(href);
        const finalHref = mailto && !pending ? `mailto:${href}` : href;
        const shell =
          'group relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-neon-cyan/45 hover:bg-neon-cyan/[0.07] hover:text-neon-cyan';

        return (
          <li key={key}>
            {pending ? (
              <span
                aria-disabled="true"
                title={`Add your ${key} address in src/data/site.ts`}
                className={`${shell} cursor-not-allowed opacity-50`}
              >
                <Icon size={size} aria-hidden />
              </span>
            ) : mailto ? (
              <a href={finalHref} className={shell} aria-label={`Email ${PROFILE.name}`}>
                <Icon size={size} aria-hidden />
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-neon-cyan/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
              </a>
            ) : (
              <a
                href={finalHref}
                target="_blank"
                rel="noreferrer noopener"
                className={shell}
                aria-label={`${PROFILE.name} on ${key}`}
              >
                <Icon size={size} aria-hidden />
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-neon-cyan/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
              </a>
            )}

            {withLabels && !pending ? (
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-ink-850/95 px-2 py-1 text-[11px] text-slate-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {key}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
