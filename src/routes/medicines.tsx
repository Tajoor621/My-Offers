import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DRUGS, doseMl } from "@/data/calc";
import { MEDICINES, medicineById, searchMedicines } from "@/data/medicines";
import { diseaseById } from "@/lib/rank";
import { readLabel } from "@/lib/label-photo";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";

type Search = { q: string; id: string };

export const Route = createFileRoute("/medicines")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
    id: typeof search.id === "string" ? search.id : "",
  }),
  component: MedicinesPage,
});

function MedicinesPage() {
  const { q, id } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t, tx } = useCopy();
  const [text, setText] = useState(q);
  const [photoName, setPhotoName] = useState("");
  const [reading, setReading] = useState(false);
  const [photoNote, setPhotoNote] = useState("");
  const [kg, setKg] = useState("");
  const [strength, setStrength] = useState(0);
  const selected = medicineById(id);
  const hits = searchMedicines(text);

  function open(nextId: string, nextQ = text) {
    void navigate({ to: "/medicines", search: { q: nextQ, id: nextId } });
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    setPhotoName(file.name);
    setReading(true);
    setPhotoNote("");
    try {
      const words = await readLabel(file);
      setText(words);
      const found = searchMedicines(words);
      setPhotoNote(words ? t("medicine.read") : t("medicine.unreadable"));
      if (found[0]) open(found[0].id, words);
      else open("", words);
    } catch {
      setPhotoNote(t("medicine.photoFail"));
    } finally {
      setReading(false);
    }
  }

  const dose = selected?.doseId ? DRUGS.find((item) => item.id === selected.doseId) : undefined;
  const bottle = dose?.strengths[strength] ?? dose?.strengths[0];
  const ml = dose && bottle ? doseMl(Number(kg) || 0, dose.mgPerKg, bottle.mgPerMl) : 0;

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("medicine.title")}</h1>
      <p>{t("medicine.lede")}</p>
      <form
        className="grid gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const found = searchMedicines(text);
          open(found[0]?.id ?? "", text);
        }}
      >
        <label className="grid gap-1">
          <span>{t("medicine.name")}</span>
          <input className="field" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("medicine.placeholder")} />
        </label>
        <button className="btn btn-primary" type="submit">
          {t("common.search")}
        </button>
      </form>
      <label className="card grid gap-2 p-4">
        <span className="font-display text-2xl">{t("medicine.photo")}</span>
        <span className="text-muted">{t("medicine.photoHint")}</span>
        <input
          className="field"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => void onPhoto(e.target.files?.[0])}
        />
        {photoName ? <span className="text-sm text-muted">{photoName}</span> : null}
        {reading ? <span>{t("medicine.reading")}</span> : null}
        {photoNote ? <span>{photoNote}</span> : null}
      </label>

      {hits.length > 0 ? (
        <div className="grid gap-2">
          {hits.map((item) => (
            <button key={item.id} type="button" className="card px-4 py-3 text-start" onClick={() => open(item.id)}>
              <span className="block font-display text-xl">{tx(item.en, item.ur)}</span>
              <span className="text-sm text-muted">{tx(item.formEn, item.formUr)}</span>
            </button>
          ))}
        </div>
      ) : text.trim().length > 1 ? (
        <p>{t("medicine.none")}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {MEDICINES.map((item) => (
            <button key={item.id} type="button" className="btn btn-ghost" onClick={() => open(item.id, item.en)}>
              {tx(item.en, item.ur)}
            </button>
          ))}
        </div>
      )}

      {selected ? (
        <article className="grid gap-3">
          <h2 className="font-display text-3xl">{tx(selected.en, selected.ur)}</h2>
          <p className="text-muted">{tx(selected.formEn, selected.formUr)}</p>
          <section className="card p-4">
            <h3 className="font-display text-2xl">{t("medicine.useful")}</h3>
            <ul className="mt-2 grid gap-2">
              {(tx(selected.useEn.join("\n"), selected.useUr.join("\n"))).split("\n").map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section className="card p-4">
            <h3 className="font-display text-2xl">{t("medicine.not")}</h3>
            <ul className="mt-2 grid gap-2">
              {(tx(selected.notEn.join("\n"), selected.notUr.join("\n"))).split("\n").map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section className="card p-4">
            <h3 className="font-display text-2xl">{t("medicine.care")}</h3>
            <ul className="mt-2 grid gap-2">
              {(tx(selected.careEn.join("\n"), selected.careUr.join("\n"))).split("\n").map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          {dose && bottle ? (
            <section className="card grid gap-2 p-4">
              <h3 className="font-display text-2xl">{t("medicine.card")}</h3>
              <label className="grid gap-1">
                <span>{t("tools.body")}</span>
                <input className="field" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} />
              </label>
              <label className="grid gap-1">
                <span>{t("tools.strength")}</span>
                <select className="field" value={strength} onChange={(e) => setStrength(Number(e.target.value))}>
                  {dose.strengths.map((item, index) => (
                    <option key={item.en} value={index}>
                      {tx(item.en, item.ur)}
                    </option>
                  ))}
                </select>
              </label>
              <p>
                <Ltr>{ml.toFixed(1)} ml</Ltr>
              </p>
              <p className="text-muted">{tx(dose.noteEn, dose.noteUr)}</p>
              <p>
                {t("tools.milkDays")} <Ltr>{dose.milkDays}</Ltr> · {t("tools.meatDays")} <Ltr>{dose.meatDays}</Ltr>
              </p>
            </section>
          ) : (
            <p className="card p-4">{t("medicine.noRate")}</p>
          )}
          <section className="grid gap-2">
            <h3 className="font-display text-2xl">{t("medicine.seen")}</h3>
            {selected.diseases.map((diseaseId) => {
              const disease = diseaseById(diseaseId);
              if (!disease) return null;
              return (
                <Link key={diseaseId} to="/diseases/$id" params={{ id: diseaseId }} className="card block px-4 py-3">
                  {tx(disease.en, disease.ur)}
                </Link>
              );
            })}
          </section>
        </article>
      ) : null}
      <Disclaimer />
    </div>
  );
}
