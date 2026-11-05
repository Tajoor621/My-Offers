import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SPECIES } from "@/data/catalog";
import { DISEASES } from "@/data/diseases";
import { Disclaimer, SeverityBadge, useCopy } from "@/components/bits";
import { readComplaint } from "@/lib/rank";

type Search = { q: string };

export const Route = createFileRoute("/diseases/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: DiseaseIndex,
});

function DiseaseIndex() {
  const { q } = Route.useSearch();
  const { t, tx } = useCopy();
  const [filter, setFilter] = useState("");
  const [speciesId, setSpeciesId] = useState("");
  const read = useMemo(() => readComplaint(q || filter), [q, filter]);
  const text = (q || filter).trim().toLowerCase();
  const list = DISEASES.filter((d) => {
    if (speciesId && !d.species.includes(speciesId)) return false;
    if (!text) return true;
    const hay = [d.en, d.ur, d.summaryEn, d.summaryUr, ...d.aka, ...d.reads].join("\n").toLowerCase();
    return hay.includes(text);
  });

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("nav.diseases")}</h1>
      <input className="field" value={filter || q} onChange={(e) => setFilter(e.target.value)} placeholder={t("home.placeholder")} />
      <div className="flex gap-2 overflow-x-auto">
        <button type="button" className={`btn ${speciesId === "" ? "btn-primary" : "btn-ghost"}`} onClick={() => setSpeciesId("")}>
          {t("common.all")}
        </button>
        {SPECIES.map((s) => (
          <button key={s.id} type="button" className={`btn shrink-0 ${speciesId === s.id ? "btn-primary" : "btn-ghost"}`} onClick={() => setSpeciesId(s.id)}>
            {tx(s.en, s.ur)}
          </button>
        ))}
      </div>
      {read.length > 0 ? (
        <section className="grid gap-2">
          <h2 className="font-display text-2xl">{t("common.results")}</h2>
          {read.map((row) => (
            <Link key={row.disease.id} to="/diseases/$id" params={{ id: row.disease.id }} className="card block p-4">
              <SeverityBadge severity={row.disease.severity} />
              <span className="mt-2 block font-display text-2xl">{tx(row.disease.en, row.disease.ur)}</span>
              <span className="text-muted">{tx(row.disease.summaryEn, row.disease.summaryUr)}</span>
            </Link>
          ))}
        </section>
      ) : null}
      <div className="grid gap-2">
        {list.map((d) => (
          <Link key={d.id} to="/diseases/$id" params={{ id: d.id }} className="card flex items-center justify-between gap-3 px-4 py-3">
            <span>
              <span className="block font-display text-xl">{tx(d.en, d.ur)}</span>
              <span className="text-sm text-muted">{t(`kind.${d.kind}`)}</span>
            </span>
            <SeverityBadge severity={d.severity} />
          </Link>
        ))}
      </div>
      <Disclaimer />
    </div>
  );
}
