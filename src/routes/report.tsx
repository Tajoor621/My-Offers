import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { speciesById } from "@/data/catalog";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";
import { APP_EN, APP_UR } from "@/lib/brand";
import { herdDb, type Animal, type FeedRow, type MedRow, type WeightRow } from "@/lib/herd-db";

export const Route = createFileRoute("/report")({
  component: ReportPage,
});

function stamp(ms: number) {
  return new Date(ms).toISOString().slice(0, 10);
}

function ReportPage() {
  const { t, tx } = useCopy();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [id, setId] = useState("");
  const [weights, setWeights] = useState<WeightRow[]>([]);
  const [meds, setMeds] = useState<MedRow[]>([]);
  const [feeds, setFeeds] = useState<FeedRow[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void herdDb()
      .animals.orderBy("createdAt")
      .reverse()
      .toArray()
      .then((rows) => {
        setAnimals(rows);
        setId(rows[0]?.id ?? "");
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (!id) {
      setWeights([]);
      setMeds([]);
      setFeeds([]);
      return;
    }
    const db = herdDb();
    void Promise.all([
      db.weights.where("animalId").equals(id).sortBy("at"),
      db.meds.where("animalId").equals(id).sortBy("at"),
      db.feeds.where("animalId").equals(id).sortBy("at"),
    ]).then(([w, m, f]) => {
      setWeights(w);
      setMeds(m);
      setFeeds(f);
    });
  }, [id]);

  const animal = animals.find((row) => row.id === id) ?? null;
  const species = animal ? speciesById(animal.species) : undefined;

  async function downloadPdf() {
    if (!animal) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const lines = [
      APP_EN,
      "Field health sheet. Not a prescription. The bottle label wins.",
      `Tag: ${animal.tag}`,
      `Species: ${species?.en ?? animal.species}`,
      `Sex: ${animal.sex}`,
      animal.name ? `Name: ${animal.name}` : "",
      "",
      "Weights",
      ...weights.map((row) => `${stamp(row.at)}  ${row.kg} kg  ${row.source}`),
      "",
      "Medicines",
      ...meds.map((row) => `${stamp(row.at)}  ${row.drug}`),
      "",
      "Feed and milk",
      ...feeds.map((row) => `${stamp(row.at)}  milk ${row.milkL} L  concentrate ${row.concKg} kg  green ${row.greenKg} kg`),
    ].filter((line) => line !== undefined);
    const wrapped = doc.splitTextToSize(lines.join("\n"), 180);
    doc.text(wrapped, 14, 16);
    doc.save(`khet-o-kalyan-${animal.tag || "animal"}.pdf`);
  }

  if (!ready) return <p>{t("common.loading")}</p>;

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("report.title")}</h1>
      <p className="max-w-2xl text-muted">{t("report.latin")}</p>
      {animals.length === 0 ? (
        <p>
          {t("report.empty")}{" "}
          <Link to="/herd" className="text-green">
            {t("nav.herd")}
          </Link>
        </p>
      ) : (
        <>
          <label className="grid max-w-md gap-1">
            <span>{t("report.pick")}</span>
            <select className="field" value={id} onChange={(e) => setId(e.target.value)}>
              {animals.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.tag} · {speciesById(row.species) ? tx(speciesById(row.species)!.en, speciesById(row.species)!.ur) : row.species}
                </option>
              ))}
            </select>
          </label>
          {animal ? (
            <article className="card grid gap-3 p-4" lang="ur" dir="rtl">
              <p className="text-sm text-muted">{APP_UR}</p>
              <h2 className="font-display text-3xl">
                <Ltr>{animal.tag}</Ltr>
              </h2>
              <p>{species ? tx(species.en, species.ur) : animal.species}</p>
              <h3 className="font-display text-xl">{t("herd.weights")}</h3>
              {weights.length === 0 ? <p className="text-muted">{t("common.empty")}</p> : null}
              <ul>
                {weights.map((row) => (
                  <li key={row.id}>
                    <Ltr>
                      {stamp(row.at)} · {row.kg} kg
                    </Ltr>
                  </li>
                ))}
              </ul>
              <h3 className="font-display text-xl">{t("herd.meds")}</h3>
              <ul>
                {meds.map((row) => (
                  <li key={row.id}>
                    {row.drug} · <Ltr>{stamp(row.at)}</Ltr>
                  </li>
                ))}
              </ul>
              <h3 className="font-display text-xl">{t("herd.feed")}</h3>
              <ul>
                {feeds.map((row) => (
                  <li key={row.id}>
                    <Ltr>
                      {stamp(row.at)} · {row.milkL} L · {row.concKg} kg · {row.greenKg} kg
                    </Ltr>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
          <div className="no-print flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>
              {t("common.print")}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => void downloadPdf()} disabled={!animal}>
              {t("report.pdf")}
            </button>
          </div>
        </>
      )}
      <Disclaimer />
    </div>
  );
}
