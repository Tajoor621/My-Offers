import { createFileRoute, Link } from "@tanstack/react-router";
import { speciesById } from "@/data/catalog";
import { Disclaimer, DiseaseLink, SeverityBadge, useCopy } from "@/components/bits";
import { diseaseById } from "@/lib/rank";

export const Route = createFileRoute("/diseases/$id")({
  component: DiseasePage,
});

function Block({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section className="card p-4">
      <h2 className="font-display text-2xl">{title}</h2>
      <ul className="mt-2 grid gap-2">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

function DiseasePage() {
  const { id } = Route.useParams();
  const { t, tx } = useCopy();
  const disease = diseaseById(id);
  if (!disease) return <p>{t("common.notFound")}</p>;
  const names = disease.species
    .map((sid) => speciesById(sid))
    .filter((s) => s != null)
    .map((s) => tx(s.en, s.ur));

  return (
    <article className="grid gap-4">
      <Link to="/diseases" search={{ q: "" }} className="text-green">
        {t("common.back")}
      </Link>
      <div className="flex flex-wrap gap-2">
        <SeverityBadge severity={disease.severity} />
        <span className="inline-flex min-h-8 items-center rounded-full bg-paper-deep px-3 text-sm">{t(`kind.${disease.kind}`)}</span>
      </div>
      <h1 className="font-display text-4xl">{tx(disease.en, disease.ur)}</h1>
      <p className="text-muted">{names.join(" · ")}</p>
      <p className="text-lg">{tx(disease.summaryEn, disease.summaryUr)}</p>
      <Block title={t("disease.confirm")} lines={tx(disease.confirmEn.join("\n"), disease.confirmUr.join("\n")).split("\n")} />
      <Block title={t("disease.steps")} lines={tx(disease.stepsEn.join("\n"), disease.stepsUr.join("\n")).split("\n")} />
      <Block title={t("disease.drugs")} lines={tx(disease.drugsEn.join("\n"), disease.drugsUr.join("\n")).split("\n")} />
      <Block title={t("disease.prevent")} lines={tx(disease.preventEn.join("\n"), disease.preventUr.join("\n")).split("\n")} />
      <section className="card border-clay bg-clay-soft p-4">
        <h2 className="font-display text-2xl">{t("disease.refer")}</h2>
        <p className="mt-2">{tx(disease.referEn, disease.referUr)}</p>
      </section>
      {disease.also && disease.also.length > 0 ? (
        <section className="grid gap-2">
          <h2 className="font-display text-2xl">{t("disease.also")}</h2>
          {disease.also.map((other) => (
            <DiseaseLink key={other} id={other} />
          ))}
        </section>
      ) : null}
      <Disclaimer />
    </article>
  );
}
