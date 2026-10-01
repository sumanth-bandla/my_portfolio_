// Generates a valid one-page placeholder PDF so the "Download Resume" link is
// never broken. Run: node tools/make-placeholder-resume.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '..', 'public', 'resume.pdf');

const lines = [
  ['F2', 22, 60, 720, 'Bandla Sumanth'],
  ['F1', 12, 60, 694, 'Data Analyst  |  Python Developer  |  Data Science Enthusiast  |  Quantum Computing Learner'],
  ['F1', 11, 60, 668, 'B.Tech CSE (Data Science)  -  RK College of Engineering, Vijayawada  -  Graduating 2027'],
  ['F1', 11, 60, 652, 'Nellore, Andhra Pradesh, India'],
  ['F2', 13, 60, 612, 'Placeholder file'],
  ['F1', 11, 60, 592, 'This PDF is a placeholder so that every button on the site works.'],
  ['F1', 11, 60, 576, 'Replace public/resume.pdf with your own resume PDF and every download link updates automatically.'],
  ['F1', 11, 60, 560, 'sumanthbandla9490@gmail.com  |  github.com/sumanth-bandla  |  linkedin.com/in/sumanth-bandla-7b7189292'],
];

const content = [
  'BT',
  ...lines.map(([font, size, x, y, text]) => {
    const safe = text.replace(/([()\\])/g, '\\$1');
    return `/${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${safe}) Tj`;
  }),
  'ET',
].join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((offset) => {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pdf, 'latin1');
console.log('Wrote', out, `(${Buffer.byteLength(pdf)} bytes)`);
