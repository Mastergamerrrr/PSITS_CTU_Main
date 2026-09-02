import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const portraitDirectory = path.resolve('public', 'officers');
const allowedExtensions = new Set(['.avif', '.webp']);
const maximumBytes = 150 * 1024;

let entries;
try {
  entries = await readdir(portraitDirectory, { withFileTypes: true });
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('No officer portrait directory yet; nothing to validate.');
    process.exit(0);
  }
  throw error;
}

const failures = [];
let portraitCount = 0;

for (const entry of entries) {
  if (!entry.isFile() || entry.name.startsWith('.')) continue;

  portraitCount += 1;
  const extension = path.extname(entry.name).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    failures.push(`${entry.name}: use WebP or AVIF`);
    continue;
  }

  const file = await stat(path.join(portraitDirectory, entry.name));
  if (file.size > maximumBytes) {
    failures.push(`${entry.name}: ${(file.size / 1024).toFixed(1)} KB exceeds the 150 KB limit`);
  }
}

if (failures.length) {
  console.error('Officer portrait validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`${portraitCount} officer portrait${portraitCount === 1 ? '' : 's'} validated.`);
