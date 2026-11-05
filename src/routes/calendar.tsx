import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MONTHS, YEAR } from "@/data/seasons";
import { Disclaimer, useCopy } from "@/components/bits";
import { diseaseById } from "@/lib/rank";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const { t, tx } = useCopy();
  const [month, setMonth] = useState(0);
  useEffect(() => setMonth(new Date().getMonth()), []);
  const plan = YEAR[month];
  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("calendar.title")}</h1>
      <div className="flex gap-2 overflow-x-auto">
        {MONTHS.map((item, index) => (
          <button key={item.en} type="button" className={`btn shrink-0 ${month === index ? "btn-primary" : "btn-ghost"}`} onClick={() => setMonth(index)}>
            {tx(item.en, item.ur)}
          </button>
        ))}
      </div>
      <section className="card p-4">
        <h2 className="font-display text-2xl">{t("calendar.crops")}</h2>
        <ul className="mt-2 grid gap-2">
          {tx(plan.cropEn.join("\n"), plan.cropUr.join("\n")).split("\n").map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="card p-4">
        <h2 className="font-display text-2xl">{t("calendar.stock")}</h2>
        <ul className="mt-2 grid gap-2">
          {tx(plan.vaxEn.join("\n"), plan.vaxUr.join("\n")).split("\n").map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="grid gap-2">
        <h2 className="font-display text-2xl">{t("calendar.watch")}</h2>
        {plan.watch.map((id) => {
          const disease = diseaseById(id);
          if (!disease) return null;
          return (
            <Link key={id} to="/diseases/$id" params={{ id }} className="card block px-4 py-3 font-display text-xl">
              {tx(disease.en, disease.ur)}
            </Link>
          );
        })}
      </section>
      <Disclaimer />
    </div>
  );
}
