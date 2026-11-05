import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mic, PawPrint, Pill, Siren, Sprout } from "lucide-react";
import { useEffect, useState } from "react";
import { EMERGENCIES } from "@/data/emergency";
import { MONTHS, YEAR } from "@/data/seasons";
import { Disclaimer, useCopy } from "@/components/bits";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t, tx } = useCopy();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [month, setMonth] = useState<number | null>(null);
  useEffect(() => setMonth(new Date().getMonth()), []);
  const plan = month == null ? null : YEAR[month];

  return (
    <div className="grid gap-4">
      <p className="text-sm font-semibold text-green">{t("home.kicker")}</p>
      <h1 className="max-w-xl font-display text-4xl">{t("home.lede")}</h1>
      <form
        className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          void navigate({ to: "/diseases", search: { q } });
        }}
      >
        <input
          className="field"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("home.placeholder")}
          aria-label={t("common.search")}
        />
        <button className="btn btn-primary" type="submit">
          {t("home.read")}
        </button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/diagnose" search={{ domain: "crop", species: "" }} className="card flex gap-3 p-4">
          <Sprout className="mt-1 size-6 text-green" aria-hidden />
          <span>
            <span className="block font-display text-2xl">{t("home.crops")}</span>
            <span className="text-muted">{t("home.cropsHint")}</span>
          </span>
        </Link>
        <Link to="/diagnose" search={{ domain: "animal", species: "" }} className="card flex gap-3 p-4">
          <PawPrint className="mt-1 size-6 text-clay" aria-hidden />
          <span>
            <span className="block font-display text-2xl">{t("home.animals")}</span>
            <span className="text-muted">{t("home.animalsHint")}</span>
          </span>
        </Link>
      </div>
      {plan && month != null ? (
        <section className="card p-4">
          <h2 className="font-display text-2xl">
            {t("home.season")} · {tx(MONTHS[month].en, MONTHS[month].ur)}
          </h2>
          <ul className="mt-2 grid gap-2">
            {(tx(plan.cropEn.join("\n"), plan.cropUr.join("\n"))).split("\n").map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {EMERGENCIES.map((item) => (
          <Link
            key={item.id}
            to="/emergency"
            hash={item.id}
            className="btn btn-clay shrink-0"
          >
            <Siren className="size-4" aria-hidden />
            {tx(item.en, item.ur)}
          </Link>
        ))}
      </div>
      <Link to="/medicines" search={{ q: "", id: "" }} className="card flex items-center gap-3 p-4">
        <Pill className="size-6 text-clay" aria-hidden />
        <span>
          <span className="block font-display text-2xl">{t("home.medicine")}</span>
          <span className="text-muted">{t("medicine.photoHint")}</span>
        </span>
      </Link>
      <Link to="/voice" className="card flex items-center gap-3 p-4">
        <Mic className="size-6 text-green" aria-hidden />
        <span>
          <span className="block font-display text-2xl">{t("home.voice")}</span>
          <span className="text-muted">{t("home.voiceHint")}</span>
        </span>
      </Link>
      <Disclaimer />
    </div>
  );
}
