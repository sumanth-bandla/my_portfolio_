# Bandla Sumanth — Portfolio

Premium, futuristic 3D portfolio for **Bandla Sumanth** (Data Analyst · Python Developer · Data Science · Quantum Computing learner).

Built with **React + TypeScript + Vite + Tailwind CSS + React Three Fiber (three.js) + Framer Motion + Lucide**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

> Windows PowerShell users: if `npm` is blocked by script policy, use `npm.cmd` instead (`npm.cmd install`).

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

`index.html` references `public/og-image.png` (1200×630 recommended) for link previews.
Add that one PNG when you deploy; nothing else depends on it.

### Domain

`index.html` contains `YOUR_DOMAIN_URL` in the canonical link, Open Graph URL and JSON-LD `url`.
Replace it with your real domain before deploying.

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

- Two `<Canvas>` instances total (hero + skills ecosystem).
- DPR is capped (`[1, 1.75]` desktop, `[1, 1.25]` mobile) and `AdaptiveDpr` lowers it on slow frames.
- Mobile automatically gets the **low** quality preset: fewer particles, lower-poly core, no antialias, `powerPreference: 'low-power'`.
- Rendering pauses when the tab is hidden (`usePageVisible` → `frameloop="never"`).
- `prefers-reduced-motion` disables the 3D layers, tilt, magnetic buttons and long animations.
- three.js is code-split into its own chunk; Framer Motion into another.

## Accessibility

- Lighthouse (production build): **Accessibility 100 · Best Practices 100 · SEO 100**
- Semantic landmarks, one `<h1>`, skip link, visible focus rings, labelled form fields with
  inline error messaging, `aria-label`s on icon-only controls, keyboard-operable carousel
  (arrow keys, buttons, dots).
- All text meets WCAG AA contrast — the certificate reel darkens with a scrim instead of fading
  text with opacity.

## Verified

- No console errors or warnings.
- No horizontal overflow at 320 / 375 / 414 / 768 / 1024 / 1440 px.
- Every nav anchor resolves; every live link is real (no invented URLs).
- `resume.pdf`, `favicon.svg` and `robots.txt` all return `200`.
