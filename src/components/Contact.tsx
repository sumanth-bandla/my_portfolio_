import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Loader2, Send } from 'lucide-react';
import { CONTACT, LINKS, PROFILE, isPlaceholder } from '../data/site';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { SocialLinks } from './SocialLinks';
import { Magnetic } from './ui/Magnetic';

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autocomplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', autocomplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autocomplete: 'off' },
] as const;

type Status = 'idle' | 'sending' | 'sent';

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const emailReady = !isPlaceholder(LINKS.email);

  const update = (key: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.subject.trim()) next.subject = 'Please add a subject.';
    if (values.message.trim().length < 12) next.message = 'A little more detail helps (12+ characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    if (!emailReady) {
      setErrors({ form: 'Add your email address in src/data/site.ts to enable sending.' });
      return;
    }

    setStatus('sending');
    const subject = encodeURIComponent(values.subject.trim());
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\nFrom: ${values.name.trim()}\nEmail: ${values.email.trim()}`,
    );
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setStatus('sent'), 900);
  };

  const copyEmail = async () => {
    if (!emailReady) return;
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-slate-100 placeholder:text-slate-600 transition-all duration-300 focus:border-neon-cyan/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-neon-cyan/25';

  return (
    <Section id="contact" tint="violet">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
          {/* -------------------------------- left ------------------------------- */}
          <div>
            <Reveal>
              <SectionHeading eyebrow="Contact" title={CONTACT.heading} description={CONTACT.text} />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-9 flex flex-col gap-4">
                <div className="glass glass-hover flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-400">Email</p>
                    <p className="mt-1 truncate text-[14px] text-slate-200">
                      {emailReady ? LINKS.email : 'YOUR_EMAIL_ADDRESS'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    disabled={!emailReady}
                    aria-label="Copy email address"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.03] text-slate-300 transition-colors enabled:hover:border-neon-cyan/40 enabled:hover:text-neon-cyan disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
                  </button>
                </div>

                <div className="glass flex items-center gap-4 p-4">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <p className="text-[13.5px] text-slate-300">{PROFILE.availability}</p>
                </div>

                <SocialLinks size={17} withLabels className="mt-1" />
              </div>
            </Reveal>
          </div>

          {/* -------------------------------- form ------------------------------- */}
          <Reveal delay={0.12}>
            <form onSubmit={onSubmit} noValidate className="glass p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {FIELDS.map((field) => (
                  <div key={field.name} className={field.name === 'subject' ? 'sm:col-span-2' : ''}>
                    <label htmlFor={field.name} className="mb-2 block text-[12px] font-medium text-slate-400">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autocomplete}
                      value={values[field.name]}
                      onChange={(e) => update(field.name, e.target.value)}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                      className={`${inputClass} ${errors[field.name] ? 'border-red-400/50' : ''}`}
                      placeholder={field.name === 'subject' ? 'Project collaboration, internship…' : undefined}
                    />
                    {errors[field.name] ? (
                      <p id={`${field.name}-error`} className="mt-1.5 text-[12px] text-red-300">
                        {errors[field.name]}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-2 block text-[12px] font-medium text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClass} resize-y ${errors.message ? 'border-red-400/50' : ''}`}
                  placeholder="Tell me about the project, role or idea…"
                />
                {errors.message ? (
                  <p id="message-error" className="mt-1.5 text-[12px] text-red-300">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {errors.form ? <p className="mt-4 text-[12.5px] text-amber-300">{errors.form}</p> : null}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Magnetic strength={10}>
                  <button type="submit" className="btn-primary group w-full sm:w-auto" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <Loader2 size={16} className="animate-spin" aria-hidden />
                    ) : status === 'sent' ? (
                      <Check size={16} aria-hidden />
                    ) : (
                      <Send size={16} aria-hidden />
                    )}
                    {status === 'sent' ? 'Opening your mail app' : 'Send Message'}
                  </button>
                </Magnetic>

                <p className="text-[12px] leading-relaxed text-slate-400">
                  {emailReady
                    ? 'Sending opens your default email app with the message pre-filled.'
                    : 'Connect your email in src/data/site.ts to enable sending.'}
                </p>
              </div>

              <motion.p
                aria-live="polite"
                className="sr-only"
                initial={false}
                animate={{ opacity: 1 }}
              >
                {status === 'sent' ? 'Message ready — your email app should have opened.' : ''}
              </motion.p>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
