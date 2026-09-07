import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  pubMonth?: string;
  abstract: string;
  publicationTypes: string[];
  pubmedUrl: string;
}

export interface PubMedCachePayload {
  generatedAt: string | null;
  query: string;
  pmidCount: number;
  includedCount: number;
  excludedCount: number;
  /** PMIDs excluded in pubmed-config.json (applied at build for public lists). */
  excludedPmids?: string[];
  /** All articles from the last PubMed search (before optional admin exclusions). */
  articles: PubMedArticle[];
}

/** Articles shown on public pages (e.g. peer-reviewed list) after config exclusions. */
export function getPublicArticles(cache: PubMedCachePayload): PubMedArticle[] {
  const ex = new Set((cache.excludedPmids ?? []).map(String));
  return cache.articles.filter((a) => !ex.has(String(a.pmid)));
}

export function loadPubMedCache(): PubMedCachePayload | null {
  const p = join(process.cwd(), "content/publications/pubmed-cache.json");
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf-8")) as PubMedCachePayload;
  } catch {
    return null;
  }
}
