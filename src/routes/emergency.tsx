import { createFileRoute } from "@tanstack/react-router";
import { EMERGENCIES } from "@/data/emergency";
import { Disclaimer, useCopy } from "@/components/bits";

export const Route = createFileRoute("/emergency")({
  component: EmergencyPage,
});

function EmergencyPage() {
  const { t, tx } = useCopy();
  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("emergency.title")}</h1>
      {EMERGENCIES.map((item) => (
        <article key={item.id} id={item.id} className="card scroll-mt-4 p-4">
          <h2 className="font-display text-3xl">{tx(item.en, item.ur)}</h2>
          <p className="mt-2">{tx(item.seeEn, item.seeUr)}</p>
          <h3 className="mt-3 font-semibold text-green">{t("emergency.do")}</h3>
          <ul className="grid gap-2">
            {tx(item.doEn.join("\n"), item.doUr.join("\n")).split("\n").map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <h3 className="mt-3 font-semibold text-clay">{t("emergency.dont")}</h3>
          <ul className="grid gap-2">
            {tx(item.dontEn.join("\n"), item.dontUr.join("\n")).split("\n").map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
      <Disclaimer />
    </div>
  );
}
