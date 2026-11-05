import { DISEASES } from "@/data/diseases";
import type { Disease } from "@/data/types";

export type Ranked = {
  disease: Disease;
  score: number;
  hits: string[];
};

export function rankDiseases(speciesId: string, selected: string[]): Ranked[] {
  const set = new Set(selected);
  return DISEASES.map((disease) => {
    if (!disease.species.includes(speciesId)) return null;
    const hits = disease.symptomIds.filter((id) => set.has(id));
    if (hits.length === 0) return null;
    const keyHits = disease.keyIds.filter((id) => set.has(id));
    let score = hits.length / disease.symptomIds.length;
    if (disease.keyIds.length > 0 && keyHits.length === 0) score = Math.min(score, 0.34);
    if (keyHits.length > 0) score = Math.min(1, score + 0.12 * keyHits.length);
    const extras = selected.filter((id) => !disease.symptomIds.includes(id)).length;
    score = Math.max(0, score - extras * 0.04);
    return { disease, score, hits };
  })
    .filter((row): row is Ranked => row != null && row.score >= 0.2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export function readComplaint(query: string): Ranked[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  const tokens = q
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
  return DISEASES.map((disease) => {
    const hay = [
      disease.en,
      disease.ur,
      disease.summaryEn,
      disease.summaryUr,
      ...disease.aka,
      ...disease.reads,
    ]
      .join("\n")
      .toLowerCase();
    let score = 0;
    for (const phrase of disease.reads) {
      const p = phrase.toLowerCase();
      if (p.length >= 4 && q.includes(p)) score += 5;
    }
    for (const token of tokens) {
      if (hay.includes(token)) score += 1;
    }
    return { disease, score, hits: [] as string[] };
  })
    .filter((row) => row.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

export function diseaseById(id: string) {
  return DISEASES.find((d) => d.id === id);
}
