import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { diseaseById } from "@/lib/rank";
import { pick } from "@/lib/text";
import type { Severity } from "@/data/types";

export function useCopy() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? i18n.language ?? "ur";
  return {
    t,
    i18n,
    lang,
    en: lang.startsWith("en"),
    tx: (en: string, ur: string) => pick(lang, en, ur),
  };
}

export function Ltr({ children }: { children: ReactNode }) {
  return (
    <bdi dir="ltr" className="num">
      {children}
    </bdi>
  );
}

export function Disclaimer() {
  const { t } = useTranslation();
  return <p className="mt-8 text-sm text-muted">{t("common.disclaimer")}</p>;
}

const SEV: Record<Severity, string> = {
  watch: "bg-paper-deep text-ink",
  treat: "bg-green-soft text-green-deep",
  urgent: "bg-clay-soft text-clay",
  report: "bg-clay text-on-green",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const { t } = useTranslation();
  return (
    <span className={`inline-flex min-h-8 items-center rounded-full px-3 text-sm font-semibold ${SEV[severity]}`}>
      {t(`severity.${severity}`)}
    </span>
  );
}

export function DiseaseLink({ id }: { id: string }) {
  const { tx } = useCopy();
  const disease = diseaseById(id);
  if (!disease) return null;
  return (
    <Link
      to="/diseases/$id"
      params={{ id }}
      className="card block px-4 py-3 transition hover:border-green"
    >
      <span className="font-display text-lg">{tx(disease.en, disease.ur)}</span>
    </Link>
  );
}
