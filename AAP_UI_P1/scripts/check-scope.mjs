import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = join(projectRoot, 'src');
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);
const blockedPatterns = [
  { label: 'Supabase package/import/reference', pattern: /@supabase\/|supabase-js|supabase\.from\s*\(/i },
  { label: 'direct client network call', pattern: /\bfetch\s*\(|\bXMLHttpRequest\b|\baxios\s*\(/i },
];

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(path)));
    } else if (entry.isFile() && sourceExtensions.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

const files = await collectSourceFiles(sourceRoot);
const findings = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  for (const blocked of blockedPatterns) {
    if (blocked.pattern.test(content)) {
      findings.push(`${relative(projectRoot, file)}: ${blocked.label}`);
    }
  }
}

if (findings.length > 0) {
  console.error('FAIL: disallowed backend/network patterns found in UI source:');
  for (const finding of findings) console.error(`- ${finding}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: scanned ${files.length} source files; no Supabase reference/import or direct client network call patterns found.`);
  console.log('Scope note: this static check is a boundary guard, not a security audit.');
}
