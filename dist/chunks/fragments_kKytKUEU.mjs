import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const recoveredDir = join(process.cwd(), "content", "recovered");
function loadFragment(basename) {
  const p = join(recoveredDir, `${basename}.html.fragment`);
  if (!existsSync(p)) return null;
  let s = readFileSync(p, "utf-8");
  s = s.replaceAll('href="/research-areas/', 'href="/research/');
  return s;
}

export { loadFragment as l };
