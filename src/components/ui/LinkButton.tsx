import type { ReactNode } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { isPlaceholder } from '../../data/site';

type Props = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
  download?: boolean;
  /** Shown when the href is still a placeholder (keeps the UI honest). */
  pendingLabel?: string;
};

/**
 * Anchor that degrades gracefully: placeholder hrefs render as a disabled
 * control labelled "link pending" instead of a broken / fake link.
 */
export function LinkButton({
  href,
  children,
  icon,
  variant = 'ghost',
  className = '',
  download = false,
  pendingLabel = 'Link pending',
}: Props) {
  const base =
    variant === 'primary'
      ? 'btn-primary'
      : 'btn-ghost';

  if (isPlaceholder(href)) {
    return (
      <span
        aria-disabled="true"
        title={`Replace this placeholder in src/data/site.ts — currently "${href}"`}
        className={`${base} cursor-not-allowed gap-2 opacity-55 ${className}`}
      >
        {icon ?? <ExternalLink size={15} aria-hidden />}
        <span>{children}</span>
        <span className="rounded-md border border-white/15 bg-black/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
          {pendingLabel}
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={`${base} ${className}`}
      {...(download ? { download: true } : { target: '_blank', rel: 'noreferrer noopener' })}
    >
      {icon ?? (download ? <Download size={15} aria-hidden /> : <ExternalLink size={15} aria-hidden />)}
      <span>{children}</span>
    </a>
  );
}
