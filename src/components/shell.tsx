import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  CloudSun,
  Map,
  Mic,
  NotebookPen,
  Siren,
  Sprout,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { APP_EN, APP_UR, LANG_KEY } from "@/lib/brand";
import i18n from "@/lib/i18n";

const MAIN = [
  { to: "/", key: "nav.home", icon: Sprout },
  { to: "/diagnose", key: "nav.read", icon: Stethoscope },
  { to: "/herd", key: "nav.herd", icon: NotebookPen },
  { to: "/voice", key: "nav.voice", icon: Mic },
] as const;

const MORE = [
  { to: "/diseases", key: "nav.diseases", icon: Stethoscope },
  { to: "/library", key: "nav.library", icon: BookOpen },
  { to: "/tools", key: "nav.tools", icon: Wrench },
  { to: "/weather", key: "nav.weather", icon: CloudSun },
  { to: "/paddocks", key: "nav.paddocks", icon: Map },
  { to: "/calendar", key: "nav.calendar", icon: CalendarDays },
  { to: "/emergency", key: "nav.emergency", icon: Siren },
  { to: "/cases", key: "nav.cases", icon: NotebookPen },
  { to: "/report", key: "nav.report", icon: BookOpen },
] as const;

function Item({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Sprout;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex min-h-11 items-center gap-2 rounded-2xl px-3 py-2 ${
        active ? "bg-green-soft text-green-deep" : "text-ink"
      }`}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      <span className="nav-label">{label}</span>
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { t, i18n: live } = useTranslation();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [more, setMore] = useState(false);
  const ur = !live.language.startsWith("en");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "ur") void i18n.changeLanguage(saved);
  }, []);

  function toggleLang() {
    const next = ur ? "en" : "ur";
    localStorage.setItem(LANG_KEY, next);
    void i18n.changeLanguage(next);
  }

  const active = (to: string) => path === to || (to !== "/" && path.startsWith(to));

  return (
    <div dir={ur ? "rtl" : "ltr"} lang={ur ? "ur" : "en"} className="min-h-screen">
      <header className="band no-print text-on-green">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-green text-on-green">
              <Sprout className="size-6" aria-hidden />
            </span>
            <span>
              <span className="block font-display text-2xl leading-none">{ur ? APP_UR : APP_EN}</span>
              <span className="mt-1 block text-sm text-on-green/80">{ur ? APP_EN : APP_UR}</span>
            </span>
          </Link>
          <button type="button" className="btn bg-green text-on-green" onClick={toggleLang}>
            <LtrSpan>{ur ? "EN" : "اردو"}</LtrSpan>
          </button>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl md:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="no-print hidden px-3 py-4 md:block">
          <nav className="grid gap-1">
            {MAIN.map((item) => (
              <Item key={item.to} to={item.to} label={t(item.key)} icon={item.icon} active={active(item.to)} />
            ))}
            {MORE.map((item) => (
              <Item key={item.to} to={item.to} label={t(item.key)} icon={item.icon} active={active(item.to)} />
            ))}
          </nav>
        </aside>
        <main className="min-w-0 px-4 pb-28 pt-4 md:pb-12">{children}</main>
      </div>
      <nav className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card md:hidden">
        <div className="grid grid-cols-5">
          {MAIN.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 ${
                active(item.to) ? "text-green-deep" : "text-muted"
              }`}
            >
              <item.icon className="size-5" aria-hidden />
              <span className="nav-label">{t(item.key)}</span>
            </Link>
          ))}
          <button
            type="button"
            className="flex min-h-16 flex-col items-center justify-center gap-1 text-muted"
            onClick={() => setMore((v) => !v)}
          >
            <Wrench className="size-5" aria-hidden />
            <span className="nav-label">{t("nav.more")}</span>
          </button>
        </div>
      </nav>
      {more ? (
        <div className="no-print fixed inset-0 z-40 bg-ink/40 md:hidden" onClick={() => setMore(false)}>
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-card p-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-2xl">{t("nav.more")}</h2>
              <button type="button" className="btn btn-ghost" onClick={() => setMore(false)}>
                {t("common.close")}
              </button>
            </div>
            <div className="grid gap-1">
              {MORE.map((item) => (
                <span key={item.to} onClick={() => setMore(false)}>
                  <Item to={item.to} label={t(item.key)} icon={item.icon} active={active(item.to)} />
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LtrSpan({ children }: { children: ReactNode }) {
  return (
    <bdi dir="ltr" className="num">
      {children}
    </bdi>
  );
}
