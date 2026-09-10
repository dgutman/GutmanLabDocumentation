import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function loadPubMedCache() {
  const p = join(process.cwd(), "content/publications/pubmed-cache.json");
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf-8"));
  } catch {
    return null;
  }
}

export { loadPubMedCache as l };
