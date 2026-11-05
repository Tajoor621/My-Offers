import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AREA_UNITS,
  DRUGS,
  FERT_CROPS,
  SEED_RATES,
  VITALS,
  cattleKgFromTape,
  dairyRation,
  doseMl,
  fertilizerPlan,
  goatKgFromTape,
  sprayMl,
} from "@/data/calc";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";

export const Route = createFileRoute("/tools")({
  component: ToolsPage,
});

function n(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function show(value: number) {
  if (!Number.isFinite(value)) return "0";
  return value >= 10 ? value.toFixed(1) : value.toFixed(2);
}

function ToolsPage() {
  const { t, tx } = useCopy();
  const [cropId, setCropId] = useState(FERT_CROPS[0].id);
  const [area, setArea] = useState("1");
  const [unitId, setUnitId] = useState<(typeof AREA_UNITS)[number]["id"]>("acre");
  const [drugId, setDrugId] = useState(DRUGS[0].id);
  const [strength, setStrength] = useState(0);
  const [doseKg, setDoseKg] = useState("");
  const [customKg, setCustomKg] = useState("");
  const [mgkg, setMgkg] = useState("");
  const [mgml, setMgml] = useState("");
  const [body, setBody] = useState("");
  const [milk, setMilk] = useState("");
  const [buffalo, setBuffalo] = useState(false);
  const [girth, setGirth] = useState("");
  const [length, setLength] = useState("");
  const [small, setSmall] = useState(false);
  const [tank, setTank] = useState("");
  const [rate, setRate] = useState("");

  const crop = FERT_CROPS.find((item) => item.id === cropId) ?? FERT_CROPS[0];
  const unit = AREA_UNITS.find((item) => item.id === unitId) ?? AREA_UNITS[0];
  const plan = useMemo(() => fertilizerPlan(crop, n(area), unit.toAcre), [crop, area, unit]);
  const drug = DRUGS.find((item) => item.id === drugId) ?? DRUGS[0];
  const bottle = drug.strengths[strength] ?? drug.strengths[0];
  const ml = doseMl(n(doseKg), drug.mgPerKg, bottle.mgPerMl);
  const customMl = doseMl(n(customKg), n(mgkg), n(mgml));
  const ration = dairyRation(n(body), n(milk), buffalo);
  const tape = small ? goatKgFromTape(n(girth), n(length)) : cattleKgFromTape(n(girth), n(length));
  const spray = sprayMl(n(tank), n(rate));

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("tools.title")}</h1>

      <section className="card grid gap-3 p-4">
        <h2 className="font-display text-2xl">{t("tools.fertilizer")}</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <label className="grid gap-1">
            <span>{t("tools.crop")}</span>
            <select className="field" value={cropId} onChange={(e) => setCropId(e.target.value)}>
              {FERT_CROPS.map((item) => (
                <option key={item.id} value={item.id}>
                  {tx(item.en, item.ur)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span>{t("tools.area")}</span>
            <input className="field num" dir="ltr" inputMode="decimal" value={area} onChange={(e) => setArea(e.target.value)} />
          </label>
          <label className="grid gap-1">
            <span>{t("tools.unit")}</span>
            <select
              className="field"
              value={unitId}
              onChange={(e) => setUnitId(e.target.value as (typeof AREA_UNITS)[number]["id"])}
            >
              {AREA_UNITS.map((item) => (
                <option key={item.id} value={item.id}>
                  {tx(item.en, item.ur)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-muted">{tx(crop.splitEn, crop.splitUr)}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <p>
            {t("tools.dap")}: <Ltr>{show(plan.dap)}</Ltr> {t("tools.bags")}
          </p>
          <p>
            {t("tools.urea")}: <Ltr>{show(plan.urea)}</Ltr> {t("tools.bags")}
          </p>
          <p>
            {t("tools.sop")}: <Ltr>{show(plan.sop)}</Ltr> {t("tools.bags")}
          </p>
          <p>
            {t("tools.mop")}: <Ltr>{show(plan.mop)}</Ltr> {t("tools.bags")}
          </p>
        </div>
        <p className="text-sm text-muted">{t("tools.either")}</p>
      </section>

      <section className="card grid gap-3 p-4">
        <h2 className="font-display text-2xl">{t("tools.dose")}</h2>
        <p className="text-sm text-clay">{t("tools.label")}</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <label className="grid gap-1">
            <span>{t("common.medicine")}</span>
            <select
              className="field"
              value={drugId}
              onChange={(e) => {
                setDrugId(e.target.value);
                setStrength(0);
              }}
            >
              {DRUGS.map((item) => (
                <option key={item.id} value={item.id}>
                  {tx(item.en, item.ur)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span>{t("tools.strength")}</span>
            <select className="field" value={strength} onChange={(e) => setStrength(Number(e.target.value))}>
              {drug.strengths.map((item, index) => (
                <option key={item.en} value={index}>
                  {tx(item.en, item.ur)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span>{t("tools.body")}</span>
            <input className="field num" dir="ltr" inputMode="decimal" value={doseKg} onChange={(e) => setDoseKg(e.target.value)} placeholder={t("common.kg")} />
          </label>
        </div>
        <p className="font-display text-4xl">
          <Ltr>{show(ml)}</Ltr> <span className="text-2xl">{t("tools.result")}</span>
        </p>
        <p className="text-muted">{tx(drug.noteEn, drug.noteUr)}</p>
        <p>
          {t("tools.withdrawal")}: {t("tools.milkDays")} <Ltr>{drug.milkDays}</Ltr> · {t("tools.meatDays")}{" "}
          <Ltr>{drug.meatDays}</Ltr>
        </p>
      </section>

      <section className="card grid gap-3 bg-clay-soft p-4">
        <h2 className="font-display text-2xl">{t("tools.custom")}</h2>
        <p>{t("tools.customHint")}</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <input className="field num" dir="ltr" inputMode="decimal" value={customKg} onChange={(e) => setCustomKg(e.target.value)} placeholder={t("tools.body")} />
          <input className="field num" dir="ltr" inputMode="decimal" value={mgkg} onChange={(e) => setMgkg(e.target.value)} placeholder={t("tools.mgkg")} />
          <input className="field num" dir="ltr" inputMode="decimal" value={mgml} onChange={(e) => setMgml(e.target.value)} placeholder={t("tools.mgml")} />
        </div>
        <p className="font-display text-3xl">
          <Ltr>{show(customMl)}</Ltr> {t("tools.result")}
        </p>
      </section>

      <section className="card grid gap-3 p-4">
        <h2 className="font-display text-2xl">{t("tools.ration")}</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <input className="field num" dir="ltr" inputMode="decimal" value={body} onChange={(e) => setBody(e.target.value)} placeholder={t("tools.body")} />
          <input className="field num" dir="ltr" inputMode="decimal" value={milk} onChange={(e) => setMilk(e.target.value)} placeholder={t("tools.litres")} />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={buffalo} onChange={(e) => setBuffalo(e.target.checked)} />
            {t("tools.buffalo")}
          </label>
        </div>
        <p>
          {t("tools.green")}: <Ltr>{show(ration.green)} kg</Ltr>
        </p>
        <p>
          {t("tools.straw")}: <Ltr>{show(ration.straw)} kg</Ltr>
        </p>
        <p>
          {t("tools.conc")}: <Ltr>{show(ration.conc)} kg</Ltr>
        </p>
      </section>

      <section className="card grid gap-3 p-4">
        <h2 className="font-display text-2xl">{t("tools.tape")}</h2>
        <div className="flex gap-3">
          <label className="flex items-center gap-2">
            <input type="radio" checked={!small} onChange={() => setSmall(false)} />
            {t("tools.large")}
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={small} onChange={() => setSmall(true)} />
            {t("tools.small")}
          </label>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <input className="field num" dir="ltr" inputMode="decimal" value={girth} onChange={(e) => setGirth(e.target.value)} placeholder={t("tools.girth")} />
          <input className="field num" dir="ltr" inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)} placeholder={t("tools.length")} />
        </div>
        <p className="font-display text-4xl">
          <Ltr>{show(tape)}</Ltr> {t("common.kg")}
        </p>
        <p className="text-sm text-muted">{t("tools.estimate")}</p>
      </section>

      <section className="card grid gap-3 p-4">
        <h2 className="font-display text-2xl">{t("tools.spray")}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <input className="field num" dir="ltr" inputMode="decimal" value={tank} onChange={(e) => setTank(e.target.value)} placeholder={t("tools.tank")} />
          <input className="field num" dir="ltr" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} placeholder={t("tools.rate")} />
        </div>
        <p>
          {t("tools.product")}: <Ltr>{show(spray)} ml</Ltr>
        </p>
        <p className="text-sm text-clay">{t("tools.label")}</p>
      </section>

      <section className="card p-4">
        <h2 className="font-display text-2xl">{t("tools.seed")}</h2>
        <ul className="mt-2 grid gap-2">
          {SEED_RATES.map((row) => (
            <li key={row.en} className="flex items-baseline justify-between gap-3">
              <span>{tx(row.en, row.ur)}</span>
              <Ltr>{row.kgPerAcre}</Ltr>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-4">
        <h2 className="font-display text-2xl">{t("tools.vitals")}</h2>
        <ul className="mt-2 grid gap-3">
          {VITALS.map((row) => (
            <li key={row.en}>
              <span className="font-semibold">{tx(row.en, row.ur)}</span>
              <span className="mt-1 block text-muted">
                {t("tools.temp")} <Ltr>{row.temp}</Ltr> · {t("tools.breath")} <Ltr>{row.breath}</Ltr>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <Disclaimer />
    </div>
  );
}
