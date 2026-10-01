# Bandla Sumanth — Portfolio

Premium, futuristic 3D portfolio for **Bandla Sumanth** (Data Analyst · Python Developer · Data Science · Quantum Computing learner).

Built with **React + TypeScript + Vite + Tailwind CSS + React Three Fiber (three.js) + Framer Motion + Lucide**.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run verify     # lint + typecheck + production build (use this before pushing)
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally on :4173
```

> Windows PowerShell users: if `npm` is blocked by script policy, use `npm.cmd` instead (`npm.cmd install`).

Requires **Node.js 20+** (`.nvmrc` / `engines` field). There are **no environment variables** — the site is
fully static, so `npm run build` is all Vercel needs.

---

## Deploy

**Repository:** https://github.com/sumanth-bandla/portfolio

### Push

```bash
git push -u origin main
```

> The remote already contains a single `Initial commit` (a README) created when the repo was
> made. If Git rejects the push as non-fast-forward, run `git push --force-with-lease -u origin main`.

### Vercel (recommended)

1. Import the repo at https://vercel.com/new
2. Framework Preset: **Vite** (detected automatically)
3. `vercel.json` already pins build command, output directory and cache headers — no manual config needed
4. Deploy → your URL will look like `https://portfolio-<your-username>.vercel.app`
5. Put that URL into `index.html` (`YOUR_DOMAIN_URL`, canonical + Open Graph) and `PROFILE` if you want it shown

Netlify / GitHub Pages / Cloudflare Pages all work too — any static host that serves `dist/`.

---

## Certifications

Ten real credential PDFs live in [`public/certificates/`](public/certificates/) and are opened by
the "View Certificate" buttons (≈5 MB total, fetched only on click, never on page load):

| Certificate | Issuer |
| --- | --- |
| Python for Data Science | IBM |
| Getting Started with Data | IBM SkillsBuild |
| Data Literacy | IBM SkillsBuild |
| Explore Emerging Tech | IBM SkillsBuild |
| Data Analytics Job Simulation | Forage · Deloitte |
| GenAI Powered Data Analytics Job Simulation | Forage |
| Data Visualisation: Empowering Business with Effective Insights | Forage |
| TCS iON Career Edge — AI Foundation | TCS iON |
| Communication Skills | TCS iON |
| TCS MasterCraft™ DataPlus — Overview | TCS MasterCraft Academy |

The **TCS iON NQT score card** is shown separately as an assessment result with section-wise
percentages. Its download button enables once you export it to
`public/certificates/tcs-ion-nqt-score-card.pdf` and set `SCORE_CARD.link` in `src/data/site.ts`.

`tools/extract-cert-text.mjs` was used to read the issuer/date text out of each PDF, so the card
labels match the documents exactly.

---

## Where to edit content (single source of truth)

**Everything you will want to change lives in [`src/data/site.ts`](src/data/site.ts).**

| What | Where |
| --- | --- |
| GitHub / LinkedIn / Instagram / email / resume path | `LINKS` |
| Name, headline, tagline, degree, location, about text | `PROFILE` |
| Nav menu items | `NAV_LINKS` |
| Skills + focus meters | `SKILL_CATEGORIES` |
| Projects | `PROJECTS` |
| Internships | `EXPERIENCES` |
| Certifications | `CERTIFICATIONS` |
| Education | `EDUCATION` |
| Contact heading / text | `CONTACT` |

### Placeholders (no fake links, ever)

These values are intentionally unfilled:

```
PROJECT_GITHUB_URL
PROJECT_DEMO_URL
CERTIFICATE_URL        ← only the TCS iON NQT score-card PDF is still missing
```

Any link matching `YOUR_*` or `*_URL` / `*_LINK` is detected by `isPlaceholder()` and rendered as a
**disabled "link pending" control** instead of a live `href`. That means:

- no broken links,
- no invented URLs,
- no 404s for recruiters.

Replace the string and the control instantly becomes a real button.

### Already wired

- GitHub → `https://github.com/sumanth-bandla`
- LinkedIn → `https://www.linkedin.com/in/sumanth-bandla-7b7189292/`
- Instagram → `https://www.instagram.com/_mr_.sumanth/`
- Email → `sumanthbandla9490@gmail.com` (contact form hands off to your mail client)

### Resume

Drop your PDF at **`public/resume.pdf`** (same filename) and every "Download Resume" button
(nav, hero, footer, mobile menu) updates automatically. A clearly-marked placeholder PDF ships in
`public/resume.pdf` so the button never 404s while you are still writing it.
Regenerate it with `node tools/make-placeholder-resume.mjs`.

### Social preview image

`public/og-image.jpg` (1200×630) is generated and wired into the Open Graph / Twitter meta tags,
so link previews on LinkedIn, X and WhatsApp render correctly out of the box.

### Domain — one value to change

`site.config.ts` holds the production URL in a single place. The Vite plugin
(`plugins/siteMeta.ts`) injects it into the canonical link, Open Graph / Twitter tags and the
JSON-LD `Person` schema at build time, and generates `sitemap.xml` + `robots.txt` for the same host:

```ts
// site.config.ts
export const SITE = { url: 'https://your-domain.com', /* … */ };
```

Change `url`, run `npm run build`, and every reference updates together — the site never points at
two domains. While the placeholder is still in place, no sitemap is emitted (so no fake URL is
published).

---

## Structure

```
portfolio/
├── index.html                 # SEO meta, Open Graph, JSON-LD Person schema
├── public/
│   ├── favicon.svg
│   ├── resume.pdf             # placeholder — replace with your real resume
│   └── robots.txt
├── tools/
│   └── make-placeholder-resume.mjs
└── src/
    ├── App.tsx                # section composition
    ├── data/site.ts           # ← all content + links live here
    ├── index.css              # design tokens, glass/button utilities
    ├── lib/
    │   ├── hooks.ts           # useIsMobile, useHasHover, usePageVisible
    │   └── motion.ts          # shared Framer Motion variants
    ├── components/
    │   ├── Backdrop.tsx       # ambient gradient/grid/particle background
    │   ├── Nav.tsx            # sticky glass nav + mobile drawer
    │   ├── ScrollProgress.tsx
    │   ├── Hero.tsx           # 3D hero
    │   ├── About.tsx          # narrative + animated stat cards
    │   ├── Skills.tsx         # 3D skills ecosystem + category focus
    │   ├── Projects.tsx       # 3D tilt project cards
    │   ├── ProjectVisual.tsx  # generated SVG artwork per project type
    │   ├── Experience.tsx     # animated timeline
    │   ├── Certifications.tsx # 3D rotating certificate reel
    │   ├── Education.tsx      # vertical timeline
    │   ├── Contact.tsx        # validated form (mailto hand-off)
    │   ├── SocialLinks.tsx
    │   ├── Footer.tsx
    │   ├── three/
    │   │   ├── HeroCanvas.tsx     # cursor-reactive scene rig
    │   │   ├── QuantumCore.tsx    # glass icosahedron + fresnel rims + orbital rings
    │   │   ├── OrbitNodes.tsx     # orbiting data nodes
    │   │   ├── ParticleField.tsx  # breathing particle shell
    │   │   ├── SkillsCanvas.tsx   # five colour-coded skill clusters
    │   │   └── utils.ts
    │   └── ui/               # Reveal, Magnetic, TiltCard, Counter, LinkButton, Section…
    └── lib/motion.ts
```

---

## 3D & performance

- Two `<Canvas>` instances total (hero + skills ecosystem), both **lazy-loaded**: the hero scene is a
  dynamic import so the page paints text and CTAs first, and the skills ecosystem only mounts when
  it is ~250 px from the viewport.
- three.js (≈220 KB gzip) is therefore *not* on the critical path — measured at 182 ms after the main
  bundle finishes. Critical path ≈ 120 KB gzip (HTML 1.3 KB + CSS 8.4 KB + JS 111 KB).
- DPR is capped per quality tier, and `src/components/three/perf.tsx` steps it down automatically
  when measured frame rate drops below 40 fps (no heavyweight helper dependency — `@react-three/drei`
  was removed entirely).
- Shaders are compiled up front (`CompileScene`) to avoid a first-frame stutter.
- Mobile gets the **low** preset: fewer particles, lower-poly core, no antialias, `low-power` GPU hint.
- Rendering pauses when the tab is hidden (`usePageVisible` → `frameloop="never"`).
- `prefers-reduced-motion` disables the 3D layers, tilt, magnetic buttons and long animations.
- Framer Motion is code-split into its own chunk; certificate PDFs are fetched only on click
  (≈5 MB of assets, none of it on first load).

## Quality gates

`npm run verify` runs all three gates that CI would:

| Gate | Command | Result |
| --- | --- | --- |
| Lint (ESLint 9 + `react-hooks` + `jsx-a11y`) | `npm run lint` | 0 errors, 0 warnings |
| Types (`strict`, `noUnusedLocals`, `noUnusedParameters`) | `npm run typecheck` | 0 errors |
| Production build | `npm run build` | clean |

## Accessibility

- Lighthouse (production build): **Accessibility 100 · Best Practices 100 · SEO 100**
- Semantic landmarks, one `<h1>`, two skip links, visible focus rings, labelled form fields with
  inline error messaging and `aria-invalid`, `aria-label`s on icon-only controls.
- Mobile drawer: `inert` while closed (hidden links are not tabbable), focus moves in on open,
  Tab is trapped, Escape closes and focus returns to the toggle.
- Certificate carousel: `role="group"` + `aria-roledescription="carousel"`, driven by real buttons
  and 24×24 px pagination targets.
- All text meets WCAG AA contrast — the reel darkens with a scrim instead of fading text with opacity.
- Every interactive target is at least 24×24 px (WCAG 2.5.8).

## Verified

- No console errors or warnings on load, scroll or interaction.
- No horizontal overflow at 320 / 375 / 390 / 414 / 768 / 1024 / 1280 / 1440 / 1920 px, and no element
  escapes the viewport outside a deliberate `overflow-hidden` container.
- Contact form: empty submit → 4 field errors, invalid email → email error, correcting clears errors.
- Every nav anchor resolves; every live link is a real URL (no invented links).
- `og-image.jpg`, `favicon.svg`, `resume.pdf`, `robots.txt` and all 10 certificate PDFs return `200`.
- `npm audit` → 0 vulnerabilities.

## Project structure

```
portfolio/
├── index.html                 # shell; metadata tokens injected at build time
├── site.config.ts             # ← production URL, name, socials (single source)
├── plugins/siteMeta.ts        # injects OG/JSON-LD, emits robots.txt + sitemap.xml
├── vercel.json                # framework, build, output, cache headers
├── .nvmrc / engines           # Node 20+
├── eslint.config.js           # ESLint 9 flat config (+ react-hooks, jsx-a11y)
├── public/
│   ├── favicon.svg · og-image.jpg · robots.txt (generated) · resume.pdf
│   └── certificates/          # 10 real credential PDFs
├── src/
│   ├── App.tsx
│   ├── data/site.ts           # ← all copy, links, projects, experience, certs
│   ├── components/            # sections + three/ (3D) + ui/ (primitives)
│   └── lib/                   # hooks + shared motion variants
└── tools/                     # one-off asset utilities (not part of the build)
```
