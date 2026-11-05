import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CITIES, type City } from "@/data/cities";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";
import { PLACE_KEY } from "@/lib/brand";
import { herdDb } from "@/lib/herd-db";

export const Route = createFileRoute("/weather")({
  component: WeatherPage,
});

type Forecast = {
  current?: { temperature_2m?: number; precipitation?: number };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_sum?: number[];
  };
};

type Climate = {
  properties?: {
    parameter?: {
      T2M?: Record<string, number>;
      PRECTOTCORR?: Record<string, number>;
    };
  };
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

function placeKey(lat: number, lon: number) {
  return `${lat.toFixed(2)},${lon.toFixed(2)}`;
}

function WeatherPage() {
  const { t, tx, en } = useCopy();
  const [cityId, setCityId] = useState("lhr");
  const [point, setPoint] = useState<{ lat: number; lon: number } | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [climate, setClimate] = useState<Climate | null>(null);
  const [cachedForecast, setCachedForecast] = useState(false);
  const [cachedClimate, setCachedClimate] = useState(false);
  const [failForecast, setFailForecast] = useState(false);
  const [failClimate, setFailClimate] = useState(false);
  const [busy, setBusy] = useState<"weather" | "climate" | null>(null);

  const city = CITIES.find((item) => item.id === cityId) ?? CITIES[0];
  const here = point ?? { lat: city.lat, lon: city.lon };

  useEffect(() => {
    const saved = localStorage.getItem(PLACE_KEY);
    if (saved && CITIES.some((item) => item.id === saved)) setCityId(saved);
  }, []);

  function remember(id: string) {
    setCityId(id);
    setPoint(null);
    localStorage.setItem(PLACE_KEY, id);
    setForecast(null);
    setClimate(null);
    setFailForecast(false);
    setFailClimate(false);
  }

  async function loadCached(kind: "forecast" | "climate", lat: number, lon: number) {
    const row = await herdDb().cache.get(`${kind}:${placeKey(lat, lon)}`);
    if (!row) return null;
    return JSON.parse(row.json) as Forecast & Climate;
  }

  async function fetchForecast() {
    setBusy("weather");
    setFailForecast(false);
    const key = `forecast:${placeKey(here.lat, here.lon)}`;
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${here.lat}&longitude=${here.lon}` +
      `&current=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("forecast");
      const json = (await res.json()) as Forecast;
      await herdDb().cache.put({ id: key, json: JSON.stringify(json), at: Date.now() });
      setForecast(json);
      setCachedForecast(false);
    } catch {
      const cached = await loadCached("forecast", here.lat, here.lon);
      if (cached) {
        setForecast(cached);
        setCachedForecast(true);
      } else {
        setForecast(null);
        setFailForecast(true);
      }
    } finally {
      setBusy(null);
    }
  }

  async function fetchClimate() {
    setBusy("climate");
    setFailClimate(false);
    const key = `climate:${placeKey(here.lat, here.lon)}`;
    const url =
      `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M,PRECTOTCORR` +
      `&community=AG&longitude=${here.lon}&latitude=${here.lat}&format=JSON`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("climate");
      const json = (await res.json()) as Climate;
      await herdDb().cache.put({ id: key, json: JSON.stringify(json), at: Date.now() });
      setClimate(json);
      setCachedClimate(false);
    } catch {
      const cached = await loadCached("climate", here.lat, here.lon);
      if (cached) {
        setClimate(cached);
        setCachedClimate(true);
      } else {
        setClimate(null);
        setFailClimate(true);
      }
    } finally {
      setBusy(null);
    }
  }

  function locate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setPoint({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      setCityId("");
      localStorage.setItem(PLACE_KEY, `gps:${pos.coords.latitude.toFixed(3)},${pos.coords.longitude.toFixed(3)}`);
      setForecast(null);
      setClimate(null);
    });
  }

  const days = forecast?.daily?.time ?? [];
  const temps = climate?.properties?.parameter?.T2M;
  const rains = climate?.properties?.parameter?.PRECTOTCORR;

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("weather.title")}</h1>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="grid gap-1">
          <span>{t("weather.city")}</span>
          <select className="field" value={cityId} onChange={(e) => remember(e.target.value)}>
            {point ? <option value="">{t("weather.locate")}</option> : null}
            {CITIES.map((item: City) => (
              <option key={item.id} value={item.id}>
                {tx(item.en, item.ur)}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="btn btn-ghost self-end" onClick={locate}>
          {t("weather.locate")}
        </button>
      </div>
      <p className="text-sm text-muted">
        <Ltr>
          {here.lat.toFixed(2)}, {here.lon.toFixed(2)}
        </Ltr>
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" disabled={busy != null} onClick={() => void fetchForecast()}>
          {t("weather.load")}
        </button>
        <button type="button" className="btn btn-ghost" disabled={busy != null} onClick={() => void fetchClimate()}>
          {t("weather.climate")}
        </button>
      </div>
      <p className="text-sm text-muted">{t("weather.pasture")}</p>

      {failForecast ? <p className="text-clay">{t("weather.fail")}</p> : null}
      {forecast ? (
        <section className="card p-4">
          <h2 className="font-display text-2xl">{t("weather.now")}</h2>
          {cachedForecast ? <p className="text-sm text-muted">{t("weather.cached")}</p> : null}
          <p className="mt-2 font-display text-4xl">
            <Ltr>{forecast.current?.temperature_2m ?? "—"}°C</Ltr>
          </p>
          <p>
            {t("weather.rain")}: <Ltr>{forecast.current?.precipitation ?? 0} mm</Ltr>
          </p>
          <h3 className="mt-4 font-display text-xl">{t("weather.week")}</h3>
          <ul className="mt-2 grid gap-2">
            {days.map((day, index) => (
              <li key={day} className="flex flex-wrap justify-between gap-2">
                <Ltr>{day}</Ltr>
                <span>
                  <Ltr>
                    {forecast.daily?.temperature_2m_min?.[index] ?? "—"}–{forecast.daily?.temperature_2m_max?.[index] ?? "—"}°C
                  </Ltr>
                  {" · "}
                  <Ltr>{forecast.daily?.precipitation_sum?.[index] ?? 0} mm</Ltr>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {failClimate ? <p className="text-clay">{t("weather.fail")}</p> : null}
      {temps ? (
        <section className="card p-4">
          <h2 className="font-display text-2xl">{t("weather.climate")}</h2>
          {cachedClimate ? <p className="text-sm text-muted">{t("weather.cached")}</p> : null}
          <ul className="mt-2 grid gap-2">
            {MONTHS.map((code, index) => (
              <li key={code} className="flex justify-between gap-3">
                <span>{new Date(2020, index, 1).toLocaleString(en ? "en" : "ur-PK", { month: "long" })}</span>
                <Ltr>
                  {temps[code]?.toFixed(1) ?? "—"}°C · {rains?.[code]?.toFixed(0) ?? "—"} mm
                </Ltr>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <Disclaimer />
    </div>
  );
}
