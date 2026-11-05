import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SPECIES } from "@/data/catalog";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";
import { herdDb, type Animal } from "@/lib/herd-db";
import { uid } from "@/lib/text";

export const Route = createFileRoute("/herd/")({
  component: HerdPage,
});

function HerdPage() {
  const { t, tx } = useCopy();
  const [rows, setRows] = useState<Animal[] | null>(null);
  const [tag, setTag] = useState("");
  const [species, setSpecies] = useState("cattle");
  const [sex, setSex] = useState<Animal["sex"]>("female");
  const [name, setName] = useState("");

  async function load() {
    setRows(await herdDb().animals.orderBy("createdAt").reverse().toArray());
  }
  useEffect(() => {
    void load();
  }, []);

  const animals = SPECIES.filter((s) => s.domain === "animal");

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-4xl">{t("herd.title")}</h1>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            void (async () => {
              const list = await herdDb().animals.toArray();
              const Papa = (await import("papaparse")).default;
              const csv = Papa.unparse(
                list.map((a) => ({
                  tag: a.tag,
                  species: a.species,
                  sex: a.sex,
                  name: a.name,
                  note: a.note,
                })),
              );
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "khet-o-kalyan-herd.csv";
              link.click();
              URL.revokeObjectURL(url);
            })();
          }}
        >
          {t("herd.csv")}
        </button>
      </div>
      <form
        className="card grid gap-3 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!tag.trim()) return;
          const row: Animal = {
            id: uid(),
            tag: tag.trim(),
            species,
            sex,
            name: name.trim(),
            note: "",
            createdAt: Date.now(),
          };
          void herdDb().animals.add(row).then(() => {
            setTag("");
            setName("");
            return load();
          });
        }}
      >
        <h2 className="font-display text-2xl">{t("herd.add")}</h2>
        <label className="grid gap-1">
          <span>{t("common.tag")}</span>
          <input className="field num" dir="ltr" value={tag} onChange={(e) => setTag(e.target.value)} inputMode="numeric" />
        </label>
        <label className="grid gap-1">
          <span>{t("common.species")}</span>
          <select className="field" value={species} onChange={(e) => setSpecies(e.target.value)}>
            {animals.map((s) => (
              <option key={s.id} value={s.id}>
                {tx(s.en, s.ur)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          <span>{t("herd.sex")}</span>
          <select className="field" value={sex} onChange={(e) => setSex(e.target.value as Animal["sex"])}>
            <option value="female">{t("herd.female")}</option>
            <option value="male">{t("herd.male")}</option>
            <option value="unknown">{t("herd.unknown")}</option>
          </select>
        </label>
        <label className="grid gap-1">
          <span>{t("herd.name")}</span>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">
          {t("common.add")}
        </button>
      </form>
      {rows?.length === 0 ? <p className="text-muted">{t("herd.empty")}</p> : null}
      <div className="grid gap-2">
        {rows?.map((animal) => (
          <Link key={animal.id} to="/herd/$id" params={{ id: animal.id }} className="card flex items-center justify-between px-4 py-3">
            <span className="font-display text-2xl">
              <Ltr>{animal.tag}</Ltr>
              {animal.name ? ` · ${animal.name}` : ""}
            </span>
            <span className="text-muted">{tx(animals.find((s) => s.id === animal.species)?.en ?? animal.species, animals.find((s) => s.id === animal.species)?.ur ?? animal.species)}</span>
          </Link>
        ))}
      </div>
      <Disclaimer />
    </div>
  );
}
