import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SPECIES } from "@/data/catalog";
import { Disclaimer, Ltr, useCopy } from "@/components/bits";
import { MODEL_KEY } from "@/lib/brand";
import { herdDb } from "@/lib/herd-db";
import { formatMb, uid } from "@/lib/text";
import { parseFarmSpeech } from "@/lib/voice/parse";
import { VOICE_MODELS, transcribeUrdu, type VoiceProgress } from "@/lib/voice/transcribe";
import { hasUrduScript, toRomanUrdu } from "@/lib/voice/transliterate";

export const Route = createFileRoute("/voice")({
  component: VoicePage,
});

type Draft = {
  line: string;
  roman: string;
  speciesId: string;
  tag: string;
  weightKg: string;
  medicine: string;
  paddock: string;
  when: string;
  dialect: string;
  dialectConfidence: "ok" | "low";
  confidence: "ok" | "low";
  ready: boolean;
};

const EMPTY: Draft = {
  line: "",
  roman: "",
  speciesId: "",
  tag: "",
  weightKg: "",
  medicine: "",
  paddock: "",
  when: "",
  dialect: "unspecified",
  dialectConfidence: "low",
  confidence: "low",
  ready: false,
};

function dayInput(ms: number) {
  const d = new Date(ms);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function readAck(): Record<string, boolean> {
  try {
    const raw = JSON.parse(localStorage.getItem(MODEL_KEY) || "{}") as Record<string, boolean>;
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

function draftFromLine(line: string): Draft {
  const roman = toRomanUrdu(line);
  const parsed = parseFarmSpeech(hasUrduScript(line) ? `${line} ${roman}` : line);
  return {
    line,
    roman,
    speciesId: parsed.speciesId ?? "",
    tag: parsed.tag ?? "",
    weightKg: parsed.weightKg != null ? String(parsed.weightKg) : "",
    medicine: parsed.medicine ?? "",
    paddock: parsed.paddock ?? "",
    when: dayInput(parsed.when),
    dialect: parsed.dialect.label,
    dialectConfidence: parsed.dialect.confidence,
    confidence: parsed.confidence,
    ready: true,
  };
}

function VoicePage() {
  const { t, tx } = useCopy();
  const animals = SPECIES.filter((s) => s.domain === "animal");
  const [modelId, setModelId] = useState<(typeof VOICE_MODELS)[number]["id"]>(VOICE_MODELS[0].id);
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [needsDownload, setNeedsDownload] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [working, setWorking] = useState(false);
  const [micError, setMicError] = useState(false);
  const [runError, setRunError] = useState(false);
  const [typed, setTyped] = useState("");
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [saved, setSaved] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const model = VOICE_MODELS.find((m) => m.id === modelId) ?? VOICE_MODELS[0];
  const low = draft.ready && (draft.confidence === "low" || draft.dialectConfidence === "low" || !draft.line.trim());

  const canSave = useMemo(() => {
    return Boolean(
      draft.line.trim() || draft.tag.trim() || draft.weightKg || draft.medicine.trim() || draft.paddock.trim(),
    );
  }, [draft]);

  function applyLine(line: string) {
    setSaved(false);
    setDraft(draftFromLine(line));
  }

  async function run(audio: Blob) {
    setWorking(true);
    setRunError(false);
    setNeedsDownload(false);
    setProgress(0);
    try {
      const text = await transcribeUrdu(audio, modelId, (update: VoiceProgress) => {
        if (typeof update.progress === "number") setProgress(Math.round(update.progress));
      });
      const line = text.trim();
      setTyped(line);
      applyLine(line);
    } catch {
      setRunError(true);
    } finally {
      setWorking(false);
      setProgress(null);
    }
  }

  async function start() {
    setMicError(false);
    setRunError(false);
    setSaved(false);
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: Blob[] = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const next = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
        setBlob(next);
        const known = readAck()[modelId];
        if (known) void run(next);
        else setNeedsDownload(true);
      };
      rec.start();
      setRecorder(rec);
      setRecording(true);
      setBlob(null);
      setNeedsDownload(false);
    } catch {
      setMicError(true);
    }
  }

  function stop() {
    recorder?.stop();
    setRecording(false);
    setRecorder(null);
  }

  function acceptModel() {
    const ack = readAck();
    ack[modelId] = true;
    localStorage.setItem(MODEL_KEY, JSON.stringify(ack));
    if (blob) void run(blob);
  }

  function discardAudio() {
    setBlob(null);
    setNeedsDownload(false);
  }

  function exportAudio() {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ext = blob.type.includes("mp4") ? "m4a" : "webm";
    a.href = url;
    a.download = `khet-o-kalyan-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function confirm() {
    if (!canSave) return;
    const db = herdDb();
    const at = draft.when ? new Date(`${draft.when}T12:00:00`).getTime() : Date.now();
    let animalId = "";
    if (draft.tag.trim() && draft.speciesId) {
      const existing = (await db.animals.toArray()).find(
        (animal) => animal.tag === draft.tag.trim() && animal.species === draft.speciesId,
      );
      if (existing) animalId = existing.id;
      else {
        animalId = uid();
        await db.animals.add({
          id: animalId,
          tag: draft.tag.trim(),
          species: draft.speciesId,
          sex: "unknown",
          name: "",
          note: "",
          createdAt: Date.now(),
        });
      }
    }
    const kg = Number(draft.weightKg);
    if (animalId && kg > 0) {
      await db.weights.add({ id: uid(), animalId, kg, at, source: "voice" });
    }
    if (animalId && draft.medicine.trim()) {
      await db.meds.add({
        id: uid(),
        animalId,
        drug: draft.medicine.trim(),
        note: draft.roman || draft.line,
        at,
        milkDays: 0,
        meatDays: 0,
      });
    }
    if (draft.paddock.trim()) {
      const name = draft.paddock.trim();
      const pads = await db.paddocks.toArray();
      if (!pads.some((pad) => pad.name === name)) {
        await db.paddocks.add({
          id: uid(),
          name,
          areaM2: 0,
          greenness: 0,
          points: [],
          createdAt: Date.now(),
        });
      }
    }
    await db.entries.add({
      id: uid(),
      at,
      urdu: hasUrduScript(draft.line) ? draft.line : draft.roman,
      roman: draft.roman || toRomanUrdu(draft.line),
      dialect: draft.dialect,
      dialectConfidence: draft.dialectConfidence,
      summary: [draft.speciesId, draft.tag, draft.weightKg && `${draft.weightKg} kg`, draft.medicine, draft.paddock]
        .filter(Boolean)
        .join(" · "),
    });
    setBlob(null);
    setNeedsDownload(false);
    setSaved(true);
  }

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">{t("voice.title")}</h1>
      <p className="max-w-2xl text-muted">{t("voice.lede")}</p>
      <p className="text-sm text-muted">{t("voice.oneSpeaker")}</p>
      <p className="text-sm text-muted">{t("voice.never")}</p>

      <section className="card grid gap-3 p-4">
        <p className="font-semibold">{t("voice.needModel")}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {VOICE_MODELS.map((item) => (
            <label key={item.id} className="card flex cursor-pointer items-start gap-3 p-3">
              <input
                type="radio"
                name="voice-model"
                className="mt-2"
                checked={modelId === item.id}
                onChange={() => {
                  setModelId(item.id);
                  setNeedsDownload(Boolean(blob) && !readAck()[item.id]);
                }}
              />
              <span>
                <span className="block font-semibold">{item.phone ? t("voice.modelPhone") : t("voice.modelField")}</span>
                <span className="text-muted">
                  {t("voice.size")} <Ltr>{formatMb(item.bytes)}</Ltr>
                </span>
              </span>
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {recording ? (
            <button type="button" className="btn btn-clay" onClick={stop}>
              {t("voice.stop")}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => void start()} disabled={working}>
              {t("voice.record")}
            </button>
          )}
          {blob ? (
            <>
              <button type="button" className="btn btn-ghost" onClick={exportAudio}>
                {t("voice.exportAudio")}
              </button>
              <button type="button" className="btn btn-ghost" onClick={discardAudio}>
                {t("voice.discard")}
              </button>
            </>
          ) : null}
        </div>
        {micError ? <p className="text-clay">{t("voice.noMic")}</p> : null}
        {needsDownload && blob ? (
          <button type="button" className="btn btn-primary w-fit" onClick={acceptModel} disabled={working}>
            {t("voice.download")} · <Ltr>{formatMb(model.bytes)}</Ltr>
          </button>
        ) : null}
        {working ? (
          <p>
            {t("voice.working")}{" "}
            {progress != null ? (
              <Ltr>
                {progress}%
              </Ltr>
            ) : null}
          </p>
        ) : null}
        {runError ? <p className="text-clay">{t("voice.err")}</p> : null}
      </section>

      <section className="card grid gap-3 p-4">
        <label className="grid gap-1">
          <span className="font-semibold">{t("voice.typed")}</span>
          <textarea
            className="field min-h-28"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={t("voice.lede")}
          />
        </label>
        <button
          type="button"
          className="btn btn-ghost w-fit"
          onClick={() => applyLine(typed)}
        >
          {t("voice.readText")}
        </button>
      </section>

      {draft.ready ? (
        <section className="card grid gap-3 p-4">
          <h2 className="font-display text-2xl">{t("voice.fields")}</h2>
          {low ? <p className="rounded-2xl bg-clay-soft px-3 py-2 text-clay">{t("voice.low")}</p> : null}
          <p className="text-sm text-muted">{t("voice.dialectNote")}</p>
          <label className="grid gap-1">
            <span>{t("voice.transcript")}</span>
            <textarea className="field min-h-20" value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} />
          </label>
          <p>
            {t("voice.roman")}: <Ltr>{draft.roman || "—"}</Ltr>
          </p>
          <p>
            {t("voice.dialect")}: {t(`dialect.${draft.dialect}`)}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="grid gap-1">
              <span>{t("common.species")}</span>
              <select
                className="field"
                value={draft.speciesId}
                onChange={(e) => setDraft({ ...draft, speciesId: e.target.value })}
              >
                <option value="">{t("common.all")}</option>
                {animals.map((species) => (
                  <option key={species.id} value={species.id}>
                    {tx(species.en, species.ur)}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span>{t("common.tag")}</span>
              <input className="field num" dir="ltr" value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} />
            </label>
            <label className="grid gap-1">
              <span>{t("common.weight")}</span>
              <input
                className="field num"
                dir="ltr"
                inputMode="decimal"
                value={draft.weightKg}
                onChange={(e) => setDraft({ ...draft, weightKg: e.target.value })}
              />
            </label>
            <label className="grid gap-1">
              <span>{t("common.date")}</span>
              <input
                className="field num"
                dir="ltr"
                type="date"
                value={draft.when}
                onChange={(e) => setDraft({ ...draft, when: e.target.value })}
              />
            </label>
            <label className="grid gap-1">
              <span>{t("common.medicine")}</span>
              <input className="field" value={draft.medicine} onChange={(e) => setDraft({ ...draft, medicine: e.target.value })} />
            </label>
            <label className="grid gap-1">
              <span>{t("common.paddock")}</span>
              <input className="field" value={draft.paddock} onChange={(e) => setDraft({ ...draft, paddock: e.target.value })} />
            </label>
          </div>
          <button type="button" className="btn btn-primary w-fit" disabled={!canSave} onClick={() => void confirm()}>
            {t("common.confirm")}
          </button>
          {saved ? <p className="text-green-deep">{t("common.saved")}</p> : null}
        </section>
      ) : null}
      <Disclaimer />
    </div>
  );
}
