import { createFileRoute } from "@tanstack/react-router";
import { area } from "@turf/area";
import { polygon } from "@turf/helpers";
import { useEffect, useRef, useState } from "react";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";
import { herdDb, type Paddock } from "@/lib/herd-db";
import { uid } from "@/lib/text";

export const Route = createFileRoute("/paddocks")({
  component: PaddockPage,
});

const ACRE = 4046.8564224;

function measure(points: [number, number][]) {
  if (points.length < 3) return 0;
  const ring = [...points, points[0]].map(([lat, lng]) => [lng, lat] as [number, number]);
  return area(polygon([ring]));
}

function PaddockPage() {
  const { t } = useCopy();
  const host = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const groupRef = useRef<import("leaflet").LayerGroup | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const [ready, setReady] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [name, setName] = useState("");
  const [green, setGreen] = useState(3);
  const [rows, setRows] = useState<Paddock[]>([]);

  async function load() {
    setRows(await herdDb().paddocks.orderBy("createdAt").reverse().toArray());
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let dead = false;
    void (async () => {
      const imported = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (dead) return;
      const L = typeof imported.map === "function" ? imported : imported.default;
      leafletRef.current = L;
      const map = L.map(node, { zoomControl: true }).setView([31.52, 74.36], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      const group = L.layerGroup().addTo(map);
      map.on("click", (event) => {
        const latlng: [number, number] = [event.latlng.lat, event.latlng.lng];
        setPoints((cur) => [...cur, latlng]);
      });
      mapRef.current = map;
      groupRef.current = group;
      setReady(true);
      setTimeout(() => map.invalidateSize(), 0);
    })();
    return () => {
      dead = true;
      mapRef.current?.remove();
      mapRef.current = null;
      groupRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const group = groupRef.current;
    if (!L || !group || !ready) return;
    group.clearLayers();
    points.forEach(([lat, lng]) => {
      L.circleMarker([lat, lng], {
        radius: 7,
        color: "#143d22",
        weight: 2,
        fillColor: "#1f6b3a",
        fillOpacity: 0.95,
      }).addTo(group);
    });
    if (points.length >= 2) {
      L.polyline(points, { color: "#1f6b3a", weight: 3 }).addTo(group);
    }
    if (points.length >= 3) {
      L.polygon(points, { color: "#143d22", weight: 2, fillColor: "#1f6b3a", fillOpacity: 0.18 }).addTo(group);
    }
  }, [points, ready]);

  const metres = measure(points);
  const acres = metres / ACRE;

  async function save() {
    if (!name.trim() || points.length < 3) return;
    await herdDb().paddocks.add({
      id: uid(),
      name: name.trim(),
      areaM2: metres,
      greenness: green,
      points,
      createdAt: Date.now(),
    });
    setName("");
    setPoints([]);
    setGreen(3);
    await load();
  }

  async function remove(id: string) {
    await herdDb().paddocks.delete(id);
    await load();
  }

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("paddock.title")}</h1>
      <p className="max-w-2xl text-muted">{t("paddock.hint")}</p>
      <div ref={host} className="card h-[26rem] overflow-hidden" />
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-ghost" onClick={() => setPoints((cur) => cur.slice(0, -1))} disabled={!points.length}>
          {t("paddock.undo")}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setPoints([])} disabled={!points.length}>
          {t("paddock.clear")}
        </button>
      </div>
      <p>
        {t("paddock.area")}: <Ltr>{acres.toFixed(2)}</Ltr> {t("paddock.acre")} · <Ltr>{(acres * 8).toFixed(1)}</Ltr>{" "}
        {t("paddock.kanal")}
      </p>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_10rem_auto]">
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("paddock.name")} />
        <label className="grid gap-1">
          <span className="text-sm">{t("paddock.green")}</span>
          <input
            className="field num"
            dir="ltr"
            type="number"
            min={1}
            max={5}
            value={green}
            onChange={(e) => setGreen(Math.min(5, Math.max(1, Number(e.target.value) || 1)))}
          />
        </label>
        <button type="button" className="btn btn-primary self-end" disabled={!name.trim() || points.length < 3} onClick={() => void save()}>
          {t("paddock.save")}
        </button>
      </div>
      <section className="grid gap-2">
        <h2 className="font-display text-2xl">{t("paddock.saved")}</h2>
        {rows.length === 0 ? <p className="text-muted">{t("common.empty")}</p> : null}
        {rows.map((row) => (
          <article key={row.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <h3 className="font-display text-xl">{row.name}</h3>
              <p className="text-muted">
                <Ltr>{(row.areaM2 / ACRE).toFixed(2)}</Ltr> {t("paddock.acre")} · {t("paddock.green")}{" "}
                <Ltr>{row.greenness || "—"}</Ltr>
              </p>
            </div>
            <button type="button" className="btn btn-ghost" onClick={() => void remove(row.id)}>
              {t("common.delete")}
            </button>
          </article>
        ))}
      </section>
      <Disclaimer />
    </div>
  );
}
