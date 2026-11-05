import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { speciesById } from "@/data/catalog";
import { Disclaimer, useCopy } from "@/components/bits";
import { herdDb, type CaseRow } from "@/lib/herd-db";
import { diseaseById } from "@/lib/rank";

export const Route = createFileRoute("/cases")({
  component: CasesPage,
});

const STATUSES = ["open", "improving", "resolved", "referred"] as const;

function CasesPage() {
  const { t, tx } = useCopy();
  const [rows, setRows] = useState<CaseRow[] | null>(null);
  async function load() {
    const all = await herdDb().cases.orderBy("at").reverse().toArray();
    setRows(all);
  }
  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("cases.title")}</h1>
      {rows == null ? <p>{t("common.loading")}</p> : null}
      {rows?.length === 0 ? <p className="text-muted">{t("cases.empty")}</p> : null}
      {rows?.map((row) => {
        const species = speciesById(row.speciesId);
        const disease = row.diseaseId ? diseaseById(row.diseaseId) : undefined;
        return (
          <article key={row.id} className="card p-4">
            <p className="text-sm text-muted">
              <bdi dir="ltr" className="num">{new Date(row.at).toLocaleDateString()}</bdi>
              {" · "}
              {species ? tx(species.en, species.ur) : row.speciesId}
            </p>
            {disease ? (
              <Link to="/diseases/$id" params={{ id: disease.id }} className="font-display text-2xl text-green-deep">
                {tx(disease.en, disease.ur)}
              </Link>
            ) : null}
            {row.note ? <p className="mt-2">{row.note}</p> : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`btn ${row.status === status ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => {
                    void herdDb().cases.update(row.id, { status }).then(load);
                  }}
                >
                  {t(`cases.${status}`)}
                </button>
              ))}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  void herdDb().cases.delete(row.id).then(load);
                }}
              >
                {t("common.delete")}
              </button>
            </div>
          </article>
        );
      })}
      <Disclaimer />
    </div>
  );
}
