/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ---------------------------------------------------------------------------
 * Every placeholder link below is intentionally marked. Replace the literal
 * strings (e.g. `YOUR_GITHUB_URL`) with your real URLs and nothing else needs
 * to change anywhere in the app.
 *
 * Any link whose value starts with `YOUR_` is treated as "not configured yet"
 * by the UI (rendered as a disabled/marked button instead of a live href), so
 * there are never broken or fake links in the built site.
 * ---------------------------------------------------------------------------
 */

export const LINKS = {
  github: 'https://github.com/sumanth-bandla',
  linkedin: 'https://www.linkedin.com/in/sumanth-bandla-7b7189292/',
  instagram: 'https://www.instagram.com/_mr_.sumanth/',
  email: 'sumanthbandla9490@gmail.com',
  resume: '/resume.pdf', // drop your PDF at public/resume.pdf (or change this path)
  /** Optional: a mailto-based fallback for the contact form (e.g. Formspree) */
  formEndpoint: 'YOUR_FORM_ENDPOINT',
} as const;

/**
 * Anything matching these shapes is treated as "not configured yet":
 *   YOUR_GITHUB_URL, YOUR_EMAIL_ADDRESS, PROJECT_GITHUB_URL, CERTIFICATE_URL …
 * The UI then renders a disabled control instead of a broken link.
 */
const PLACEHOLDER_PATTERN = /^(YOUR_[A-Z0-9_]*|[A-Z0-9_]+_(URL|LINK))$/;

export const isPlaceholder = (value: string) => PLACEHOLDER_PATTERN.test(value);

/* ------------------------------------------------------------------ profile */

export const PROFILE = {
  name: 'Bandla Sumanth',
  initials: 'BS',
  roleLine:
    'Data Analyst | Data Science Enthusiast | Python Developer | Quantum Computing Learner',
  headline: ['Data.', 'Technology.', 'Quantum.'],
  tagline:
    'I build data-driven solutions, interactive dashboards and practical technology projects while exploring the future of quantum computing.',
  degree: 'B.Tech — Computer Science & Engineering (Data Science)',
  college: 'RK College of Engineering, Vijayawada',
  graduation: '2027',
  location: 'Nellore, Andhra Pradesh, India',
  email: LINKS.email,
  availability: 'Open to internships, freelance analytics work and collaborations',
  about:
    'I am a B.Tech CSE (Data Science) student focused on building practical skills in Python, SQL, Data Analytics, visualization and modern technology. I enjoy transforming raw data into meaningful insights and building projects that solve real-world problems. Alongside data and software development, I am exploring quantum computing and Qiskit.',
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

/* ------------------------------------------------------------------ skills */

export type SkillCategory = {
  id: string;
  title: string;
  caption: string;
  /** 0–100, used only as a visual "focus meter" — not a claim of expertise. */
  level: number;
  accent: 'cyan' | 'violet' | 'blue' | 'mint' | 'pink';
  items: string[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    caption: 'Core languages used to build and query data solutions',
    level: 72,
    accent: 'cyan',
    items: ['Python', 'SQL', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'data',
    title: 'Data',
    caption: 'Cleaning, transforming and understanding datasets',
    level: 70,
    accent: 'violet',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Data Analytics', 'Data Cleaning', 'Exploratory Data Analysis'],
  },
  {
    id: 'visualization',
    title: 'Visualization',
    caption: 'Turning analysis into clear, decision-ready visuals',
    level: 68,
    accent: 'blue',
    items: ['Tableau', 'Power BI', 'Excel'],
  },
  {
    id: 'tools',
    title: 'Tools',
    caption: 'Version control, local databases and daily workflow',
    level: 65,
    accent: 'mint',
    items: ['Git', 'GitHub', 'VS Code', 'MySQL'],
  },
  {
    id: 'quantum',
    title: 'Quantum',
    caption: 'Foundational / learning-level — currently studying',
    level: 32,
    accent: 'pink',
    items: [
      'Quantum Computing',
      'Qiskit',
      'Qubits',
      'Superposition',
      'Entanglement',
      'Quantum Circuits',
    ],
  },
];

/* ---------------------------------------------------------------- projects */

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  kind: 'analytics' | 'eda' | 'app' | 'dashboard' | 'concept' | 'quantum';
  status: 'Completed' | 'Ongoing';
  github: string;
  demo: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'global-superstore',
    title: 'Global Superstore Analytics',
    description:
      'Analyzed a large retail dataset to identify sales, profit, category and regional performance patterns.',
    tech: ['Excel', 'Python', 'Pandas', 'Power BI'],
    kind: 'analytics',
    status: 'Completed',
    github: 'PROJECT_GITHUB_URL',
    demo: 'PROJECT_DEMO_URL',
  },
  {
    id: 'titanic-eda',
    title: 'Titanic Exploratory Data Analysis',
    description:
      'Performed exploratory data analysis on the Titanic dataset to understand passenger demographics, survival patterns and relationships between variables.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    kind: 'eda',
    status: 'Completed',
    github: 'PROJECT_GITHUB_URL',
    demo: 'PROJECT_DEMO_URL',
  },
  {
    id: 'product-performance',
    title: 'Product Performance Analytics',
    description:
      'Built a data-driven web application for analyzing product performance and business metrics.',
    tech: ['Python', 'FastAPI', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    kind: 'app',
    status: 'Completed',
    github: 'PROJECT_GITHUB_URL',
    demo: 'PROJECT_DEMO_URL',
  },
  {
    id: 'hr-analytics',
    title: 'HR Analytics Dashboard',
    description:
      'Created an interactive HR analytics dashboard to explore employee and workforce metrics.',
    tech: ['Excel', 'Power BI', 'Data Analytics'],
    kind: 'dashboard',
    status: 'Completed',
    github: 'PROJECT_GITHUB_URL',
    demo: 'PROJECT_DEMO_URL',
  },
  {
    id: 'traffic-analytics',
    title: 'Traffic Analytics Dashboard',
    description:
      'Designed a dashboard concept for analyzing traffic patterns and transportation data.',
    tech: ['Python', 'Data Analytics', 'Visualization'],
    kind: 'concept',
    status: 'Completed',
    github: 'PROJECT_GITHUB_URL',
    demo: 'PROJECT_DEMO_URL',
  },
  {
    id: 'quantum-learning',
    title: 'Quantum Computing Learning Projects',
    description:
      'Exploring quantum computing fundamentals including qubits, superposition, measurement, quantum gates and quantum circuits.',
    tech: ['Python', 'Qiskit'],
    kind: 'quantum',
    status: 'Ongoing',
    github: 'PROJECT_GITHUB_URL',
    demo: 'PROJECT_DEMO_URL',
  },
];

/* ------------------------------------------------------------- experience */

export type Experience = {
  id: string;
  org: string;
  role: string;
  duration: string;
  type: string;
  summary: string;
  outcomes: string[];
  tech: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'codealpha',
    org: 'CodeAlpha',
    role: 'Frontend Development Intern',
    duration: 'July 2026 – August 2026',
    type: 'Internship',
    summary:
      'Worked on front-end development tasks, building responsive interfaces and translating designs into clean, maintainable UI code.',
    outcomes: [
      'Built responsive, component-based web interfaces',
      'Practiced HTML, CSS, JavaScript layout and interaction patterns',
      'Improved attention to UI detail, structure and accessibility basics',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
  },
  {
    id: 'codsoft',
    org: 'CodSoft',
    role: 'Data Analytics Intern',
    duration: 'August 2026',
    type: 'Internship',
    summary:
      'Applied data analytics workflows to real datasets, focusing on cleaning, exploration and communicating findings.',
    outcomes: [
      'Cleaned and prepared datasets for analysis',
      'Created summaries and visualizations of key metrics',
      'Strengthened SQL and spreadsheet-based reporting habits',
    ],
    tech: ['Python', 'SQL', 'Excel', 'Data Analytics'],
  },
];

/* --------------------------------------------------------- certifications */

/**
 * Every entry below is backed by a real credential PDF in
 * `public/certificates/`. Replace `link` with your own hosted PDF or leave it
 * as-is — swapping the files in that folder is enough.
 */
export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  /** Short description of what the credential covers. */
  note: string;
  /** PDF in public/certificates, or an external verification URL. */
  link: string;
  /** Optional issuer verification page (e.g. Credly badge). */
  verify?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'python-for-data-science',
    title: 'Python for Data Science',
    issuer: 'IBM',
    year: '2025',
    note: 'Python workflow for data analysis',
    link: '/certificates/python-for-data-science.pdf',
    verify: 'https://www.credly.com/badges/f4aa6e9e-73c0-4182-a7fb-fe316995c651',
  },
  {
    id: 'tcs-ion-career-edge-ai',
    title: 'TCS iON Career Edge — AI Foundation',
    issuer: 'TCS iON',
    year: '2026',
    note: 'Generative AI, prompt engineering and responsible AI',
    link: '/certificates/tcs-ion-career-edge-ai-foundation.pdf',
  },
  {
    id: 'tcs-mastercraft-dataplus',
    title: 'TCS MasterCraft™ DataPlus — Overview',
    issuer: 'TCS MasterCraft Academy',
    year: '2026',
    note: 'DataPlus platform foundations',
    link: '/certificates/tcs-mastercraft-dataplus-overview.pdf',
  },
  {
    id: 'data-analytics-simulation',
    title: 'Data Analytics Job Simulation',
    issuer: 'Forage · Deloitte',
    year: '2026',
    note: 'Data analysis and forensic technology tasks',
    link: '/certificates/data-analytics-job-simulation.pdf',
  },
  {
    id: 'genai-data-analytics-simulation',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Forage',
    year: '2026',
    note: 'EDA, risk profiling and AI-driven strategy',
    link: '/certificates/genai-powered-data-analytics-job-simulation.pdf',
  },
  {
    id: 'data-visualisation',
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'Forage',
    year: '2026',
    note: 'Choosing, building and communicating visuals',
    link: '/certificates/data-visualisation.pdf',
  },
  {
    id: 'data-literacy',
    title: 'Data Literacy',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    note: 'Data literacy badge',
    link: '/certificates/data-literacy-badge.pdf',
    verify: 'https://www.credly.com/go/rTlKsNAY',
  },
  {
    id: 'explore-emerging-tech',
    title: 'Explore Emerging Tech',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    note: 'Emerging technology fundamentals',
    link: '/certificates/explore-emerging-tech.pdf',
    verify: 'https://www.credly.com/go/FH1RsKMa',
  },
  {
    id: 'getting-started-with-data',
    title: 'Getting Started with Data',
    issuer: 'IBM SkillsBuild',
    year: '2025',
    note: 'Introductory data track',
    link: '/certificates/getting-started-with-data.pdf',
    verify: 'https://www.credly.com/badges/48d7186b-881d-4e7e-802a-d791118e5657',
  },
  {
    id: 'communication-skills',
    title: 'Communication Skills',
    issuer: 'TCS iON',
    year: '2026',
    note: 'Verbal, non-verbal and effective communication',
    link: '/certificates/communication-skills.pdf',
  },
];

/**
 * TCS iON NQT score card (B.Tech Computer Science, 2027).
 * Shown as an assessment result rather than a certification.
 * Drop the exported PDF at public/certificates/tcs-ion-nqt-score-card.pdf to
 * enable the download button.
 */
export const SCORE_CARD = {
  exam: 'TCS iON NQT',
  detail: 'B.Tech — Computer Science · Year of Passing 2027',
  date: 'April 2026',
  overall: 55.37,
  sections: [
    { label: 'Cognitive — Numerical', score: 81.37 },
    { label: 'IT Pack — Programming', score: 55.29 },
    { label: 'Advanced Cognitive Ability', score: 53.87 },
    { label: 'Cognitive — Reasoning', score: 43.89 },
    { label: 'Cognitive — Verbal', score: 40.85 },
  ],
  link: 'CERTIFICATE_URL', // becomes public/certificates/tcs-ion-nqt-score-card.pdf
};

/* -------------------------------------------------------------- education */

export const EDUCATION = [
  {
    id: 'rkce',
    school: 'RK College of Engineering, Vijayawada',
    degree: 'B.Tech — Computer Science & Engineering (Data Science)',
    duration: '2023 – 2027',
    detail:
      'Undergraduate coursework with a Data Science specialization, covering programming, databases, statistics and analytics, alongside self-directed study in quantum computing.',
  },
  {
    id: 'rnr',
    school: 'RNR Junior College, Nellore',
    degree: 'Intermediate',
    duration: '2021 – 2023',
    detail: 'Higher secondary studies completed in Nellore, Andhra Pradesh.',
  },
] as const;

/* -------------------------------------------------------------- contact */

export const CONTACT = {
  heading: "Let's Build Something Meaningful",
  text: 'Have a project idea, internship opportunity, collaboration or simply want to connect? Feel free to reach out.',
} as const;
