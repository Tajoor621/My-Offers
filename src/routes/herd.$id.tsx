import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { speciesById } from "@/data/catalog";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";
import { herdDb, type Animal, type FeedRow, type MedRow, type WeightRow } from "@/lib/herd-db";
import { uid } from "@/lib/text";

export const Route = createFileRoute("/herd/$id")({
  component: AnimalPage,
});

function AnimalPage() {
  const { id } = Route.useParams();
  const { t, tx } = useCopy();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [weights, setWeights] = useState<WeightRow[]>([]);
  const [meds, setMeds] = useState<MedRow[]>([]);
  const [feeds, setFeeds] = useState<FeedRow[]>([]);
  const [kg, setKg] = useState("");
  const [drug, setDrug] = useState("");
  const [milk, setMilk] = useState("");
  const [conc, setConc] = useState("");
  const [green, setGreen] = useState("");
  const [ready, setReady] = useState(false);

  async function load() {
    const db = herdDb();
    const found = await db.animals.get(id);
    setAnimal(found ?? null);
    setWeights(await db.weights.where("animalId").equals(id).sortBy("at"));
    setMeds(await db.meds.where("animalId").equals(id).reverse().sortBy("at"));
    setFeeds(await db.feeds.where("animalId").equals(id).sortBy("at"));
    setReady(true);
  }
  useEffect(() => {
    void load();
  }, [id]);

  if (!ready) return <p>{t("common.loading")}</p>;
  if (!animal) return <p>{t("common.notFound")}</p>;
  const species = speciesById(animal.species);
  const chart = weights.map((w) => ({
    day: new Date(w.at).toLocaleDateString(),
    kg: w.kg,
  }));

  return (
    <div className="grid gap-4">
      <Link to="/herd" className="text-green">
        {t("common.back")}
      </Link>
      <h1 className="font-display text-4xl">
        <Ltr>{animal.tag}</Ltr>
      </h1>
      <p className="text-muted">{species ? tx(species.en, species.ur) : animal.species}</p>
      <section className="card p-4">
        <h2 className="font-display text-2xl">{t("herd.weights")}</h2>
        {chart.length > 0 ? (
          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart}>
                <CartesianGrid stroke="#ddd4c3" />
                <XAxis dataKey="day" stroke="#5c6656" />
                <YAxis stroke="#5c6656" />
                <Tooltip />
                <Line type="monotone" dataKey="kg" stroke="#1f6b3a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-muted">{t("common.empty")}</p>
        )}
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const value = Number(kg);
            if (!value) return;
            void herdDb()
              .weights.add({ id: uid(), animalId: id, kg: value, at: Date.now(), source: "typed" })
              .then(() => {
                setKg("");
                return load();
              });
          }}
        >
          <input className="field num" dir="ltr" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} placeholder={t("common.kg")} />
          <button className="btn btn-primary" type="submit">
            {t("common.add")}
          </button>
        </form>
      </section>
      <section className="card p-4">
        <h2 className="font-display text-2xl">{t("herd.meds")}</h2>
        <ul className="mt-2 grid gap-2">
          {meds.map((med) => (
            <li key={med.id}>
              {med.drug} · <Ltr>{new Date(med.at).toLocaleDateString()}</Ltr>
            </li>
          ))}
        </ul>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!drug.trim()) return;
            void herdDb()
              .meds.add({
                id: uid(),
                animalId: id,
                drug: drug.trim(),
                note: "",
                at: Date.now(),
                milkDays: 0,
                meatDays: 0,
              })
              .then(() => {
                setDrug("");
                return load();
              });
          }}
        >
          <input className="field" value={drug} onChange={(e) => setDrug(e.target.value)} placeholder={t("common.medicine")} />
          <button className="btn btn-primary" type="submit">
            {t("common.add")}
          </button>
        </form>
      </section>
      <section className="card p-4">
        <h2 className="font-display text-2xl">{t("herd.feed")}</h2>
        <ul className="mt-2 grid gap-2">
          {feeds.map((feed) => (
            <li key={feed.id}>
              <Ltr>
                {feed.milkL} L · {feed.concKg} kg · {feed.greenKg} kg
              </Ltr>
            </li>
          ))}
        </ul>
        <form
          className="mt-3 grid gap-2 sm:grid-cols-4"
          onSubmit={(e) => {
            e.preventDefault();
            void herdDb()
              .feeds.add({
                id: uid(),
                animalId: id,
                at: Date.now(),
                milkL: Number(milk) || 0,
                concKg: Number(conc) || 0,
                greenKg: Number(green) || 0,
              })
              .then(() => {
                setMilk("");
                setConc("");
                setGreen("");
                return load();
              });
          }}
        >
          <input className="field num" dir="ltr" inputMode="decimal" value={milk} onChange={(e) => setMilk(e.target.value)} placeholder={t("herd.milk")} />
          <input className="field num" dir="ltr" inputMode="decimal" value={conc} onChange={(e) => setConc(e.target.value)} placeholder={t("herd.conc")} />
          <input className="field num" dir="ltr" inputMode="decimal" value={green} onChange={(e) => setGreen(e.target.value)} placeholder={t("herd.green")} />
          <button className="btn btn-primary" type="submit">
            {t("common.add")}
          </button>
        </form>
      </section>
      <Link to="/report" className="btn btn-ghost w-fit">
        {t("nav.report")}
      </Link>
      <Disclaimer />
    </div>
  );
}
