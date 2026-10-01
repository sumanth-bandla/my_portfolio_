/**
 * One-off helper: extracts the first lines of each certificate PDF so the
 * issuer / title / date can be transcribed accurately into src/data/site.ts.
 *
 * Run from the workspace root (where `unpdf` is installed):
 *   node portfolio/tools/extract-cert-text.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { extractText, getDocumentProxy } from 'unpdf';

const dir = process.argv[2] ?? 'E:\\certificates';

const files = readdirSync(dir)
  .filter((f) => extname(f).toLowerCase() === '.pdf')
  .filter((f) => statSync(join(dir, f)).size > 0);

for (const file of files) {
  try {
    const bytes = new Uint8Array(readFileSync(join(dir, file)));
    const pdf = await getDocumentProxy(bytes);
    const { text } = await extractText(pdf, { mergePages: true });
    const flat = text
      .split('\n')
      .map((l) => l.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 22);
    console.log(`\n=== ${file} ===`);
    console.log(flat.join('\n'));
  } catch (error) {
    console.log(`\n=== ${file} ===\nERROR: ${error?.message ?? error}`);
  }
}
