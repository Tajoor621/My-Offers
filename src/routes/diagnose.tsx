import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GROUPS, SPECIES, speciesById } from "@/data/catalog";
import { Disclaimer, Ltr, SeverityBadge, useCopy } from "@/components/bits";
import { herdDb, type CaseRow } from "@/lib/herd-db";
import { rankDiseases } from "@/lib/rank";
import { uid } from "@/lib/text";

type Search = { domain: string; species: string };

export const Route = createFileRoute("/diagnose")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    domain: search.domain === "animal" ? "animal" : search.domain === "crop" ? "crop" : "",
    species: typeof search.species === "string" ? search.species : "",
  }),
  component: DiagnosePage,
});

function DiagnosePage() {
  const { domain, species: initial } = Route.useSearch();
  const { t, tx } = useCopy();
  const [speciesId, setSpeciesId] = useState(initial);
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const species = speciesById(speciesId);
  const list = SPECIES.filter((s) => !domain || s.domain === domain);
  const ranked = useMemo(
    () => (species ? rankDiseases(species.id, picked) : []),
    [species, picked],
  );

  function toggle(id: string) {
    setSaved(false);
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  async function save(diseaseId?: string) {
    if (!species) return;
    const row: CaseRow = {
      id: uid(),
      at: Date.now(),
      speciesId: species.id,
      symptomIds: picked,
      diseaseId,
      note,
      status: "open",
    };
    await herdDb().cases.add(row);
    setSaved(true);
  }

  const groups = new Map<string, typeof SPECIES[number]["symptoms"]>();
  for (const symptom of species?.symptoms ?? []) {
    const bag = groups.get(symptom.group) ?? [];
    bag.push(symptom);
    groups.set(symptom.group, bag);
  }

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("diagnose.title")}</h1>
      <p className="text-muted">{t("diagnose.pick")}</p>
      <div className="flex flex-wrap gap-2">
        {list.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`btn ${speciesId === item.id ? "btn-primary" : "btn-ghost"}`}
            onClick={() => {
              setSpeciesId(item.id);
              setPicked([]);
              setSaved(false);
            }}
          >
            {tx(item.en, item.ur)}
          </button>
        ))}
      </div>
      {species ? (
        <>
          <p className="card p-4 text-muted">
            <span className="block font-semibold text-ink">
              {species.domain === "crop" ? t("diagnose.examCrop") : t("diagnose.examAnimal")}
            </span>
            {species.domain === "crop" ? t("diagnose.cropSteps") : t("diagnose.animalSteps")}
          </p>
          <h2 className="font-display text-2xl">{t("diagnose.signs")}</h2>
          {[...groups.entries()].map(([group, symptoms]) => (
            <fieldset key={group} className="grid gap-2">
              <legend className="mb-1 font-semibold">{tx(GROUPS[group as keyof typeof GROUPS].en, GROUPS[group as keyof typeof GROUPS].ur)}</legend>
              {symptoms.map((symptom) => (
                <label key={symptom.id} className="card flex min-h-11 items-center gap-3 px-3 py-2 has-[:checked]:border-green has-[:checked]:bg-green-soft">
                  <input
                    type="checkbox"
                    className="size-5 accent-green"
                    checked={picked.includes(symptom.id)}
                    onChange={() => toggle(symptom.id)}
                  />
                  <span>{tx(symptom.en, symptom.ur)}</span>
                </label>
              ))}
            </fieldset>
          ))}
          <h2 className="font-display text-2xl">{t("common.results")}</h2>
          {ranked.length === 0 ? <p className="text-muted">{t("diagnose.none")}</p> : null}
          <div className="grid gap-3">
            {ranked.map((row) => (
              <article key={row.disease.id} className="card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityBadge severity={row.disease.severity} />
                  <Ltr>{Math.round(row.score * 100)}%</Ltr>
                </div>
                <h3 className="mt-2 font-display text-2xl">{tx(row.disease.en, row.disease.ur)}</h3>
                <p className="text-muted">{tx(row.disease.summaryEn, row.disease.summaryUr)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link to="/diseases/$id" params={{ id: row.disease.id }} className="btn btn-primary">
                    {t("diagnose.match")}
                  </Link>
                  <button type="button" className="btn btn-ghost" onClick={() => void save(row.disease.id)}>
                    {t("diagnose.save")}
                  </button>
                </div>
              </article>
            ))}
          </div>
          <label className="grid gap-1">
            <span>{t("common.note")}</span>
            <textarea className="field min-h-24" value={note} onChange={(e) => setNote(e.target.value)} />
          </label>
          {saved ? <p className="text-green">{t("common.saved")}</p> : null}
        </>
      ) : null}
      <Disclaimer />
    </div>
  );
}
