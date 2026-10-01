/**
 * Single source of truth for everything that must agree on "one domain".
 *
 * After deploying to Vercel, set `url` to your production URL (for example
 * `https://sumanthbandla.dev`) and rebuild — the canonical link, Open Graph
 * tags, JSON-LD, sitemap.xml and robots.txt all update from this one value.
 */
export const SITE = {
  /** No trailing slash. Keep the placeholder until the domain is live. */
  url: 'https://YOUR_DOMAIN_URL',
  name: 'Bandla Sumanth',
  role: 'Data Analyst | Python Developer | Data Science | Quantum Computing Learner',
  title: 'Bandla Sumanth | Data Analyst | Python | Data Science',
  description:
    'Portfolio of Bandla Sumanth — B.Tech CSE Data Science student exploring data analytics, Python, visualization and quantum computing.',
  image: '/og-image.jpg',
  themeColor: '#05070f',
  locale: 'en_IN',
  github: 'https://github.com/sumanth-bandla',
  linkedin: 'https://www.linkedin.com/in/sumanth-bandla-7b7189292/',
  instagram: 'https://www.instagram.com/_mr_.sumanth/',
  email: 'sumanthbandla9490@gmail.com',
  college: 'RK College of Engineering, Vijayawada',
} as const;

/** True while `SITE.url` is still the placeholder, so we never emit fake URLs. */
export const isPlaceholderUrl = SITE.url.includes('YOUR_');

export const personJsonLd = () =>
  JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE.name,
      jobTitle: SITE.role,
      description: SITE.description,
      url: `${SITE.url}/`,
      image: `${SITE.url}${SITE.image}`,
      email: `mailto:${SITE.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nellore',
        addressRegion: 'Andhra Pradesh',
        addressCountry: 'IN',
      },
      alumniOf: { '@type': 'CollegeOrUniversity', name: SITE.college },
      knowsAbout: [
        'Data Analytics',
        'Python',
        'SQL',
        'Data Visualization',
        'Quantum Computing',
        'Qiskit',
      ],
      sameAs: [SITE.github, SITE.linkedin, SITE.instagram],
    },
    null,
    2,
  );
