import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const text = "I left that spot of dog poop. Last time, my app said 'whole-home coverage.' So did the insurance claim.";
const length = [...text].length;

if (length < 1 || length > 120 || text.trim().length === 0 || /[\r\n]/u.test(text)) {
  console.error('Entry must be one nonblank line of 1–120 Unicode code points.');
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
try {
  mkdirSync(outputDir, { recursive: true });
  // Omit a trailing newline so the artifact contains only the validated text.
  writeFileSync(join(outputDir, 'entry.txt'), text, 'utf8');
} catch {
  console.error('Could not write entry.txt in the output directory.');
  process.exit(1);
}
