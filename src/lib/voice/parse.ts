import { guessDialect, type DialectGuess } from "./dialect.ts";

export type ParsedEntry = {
  speciesId?: string;
  tag?: string;
  weightKg?: number;
  medicine?: string;
  paddock?: string;
  when: number;
  confidence: "ok" | "low";
  reasons: string[];
  dialect: DialectGuess;
};

const SPECIES: { id: string; keys: string[] }[] = [
  { id: "cattle", keys: ["gaye", "gayi", "gaaye", "gae", "gai", "gaay", "cow", "گائے", "گایے"] },
  { id: "buffalo", keys: ["bhains", "bhens", "bhaens", "bhainsa", "majh", "buffalo", "بھینس", "مجھ"] },
  { id: "goat", keys: ["bakri", "bakra", "chheli", "goat", "بکری", "بکرا"] },
  { id: "sheep", keys: ["bhed", "bhair", "bher", "sheep", "بھیڑ"] },
  { id: "poultry", keys: ["murghi", "murgha", "murgi", "chicken", "مرغی", "مرغا"] },
  { id: "camel", keys: ["oont", "unt", "dachi", "camel", "اونٹ"] },
  { id: "horse", keys: ["ghora", "ghori", "horse", "گھوڑا"] },
];

const ONES: Record<string, number> = {
  ek: 1,
  aik: 1,
  ik: 1,
  hik: 1,
  yaw: 1,
  ایک: 1,
  do: 2,
  dou: 2,
  dwa: 2,
  دو: 2,
  teen: 3,
  tin: 3,
  dre: 3,
  تین: 3,
  char: 4,
  chaar: 4,
  tsalor: 4,
  چار: 4,
  panch: 5,
  paanch: 5,
  panj: 5,
  pinza: 5,
  پانچ: 5,
  che: 6,
  chhe: 6,
  chhay: 6,
  shpag: 6,
  چھ: 6,
  saat: 7,
  sat: 7,
  owa: 7,
  سات: 7,
  aath: 8,
  ath: 8,
  ata: 8,
  آٹھ: 8,
  nau: 9,
  nah: 9,
  نو: 9,
  das: 10,
  las: 10,
  دس: 10,
  gyarah: 11,
  gyara: 11,
  گیارہ: 11,
  barah: 12,
  bara: 12,
  بارہ: 12,
  terah: 13,
  تیرہ: 13,
  chaudah: 14,
  چودہ: 14,
  pandrah: 15,
  پندرہ: 15,
  solah: 16,
  سولہ: 16,
  satrah: 17,
  سترہ: 17,
  atharah: 18,
  اٹھارہ: 18,
  unnis: 19,
  unnees: 19,
  انیس: 19,
  bees: 20,
  بیس: 20,
  tees: 30,
  تیس: 30,
  chalis: 40,
  chalees: 40,
  چالیس: 40,
  pachas: 50,
  pacas: 50,
  پچاس: 50,
  saath: 60,
  sath: 60,
  ساٹھ: 60,
  sattar: 70,
  ستر: 70,
  assi: 80,
  اسی: 80,
  nabbe: 90,
  navve: 90,
  نوے: 90,
};

const SAU = new Set(["sau", "so", "sou", "sel", "سو"]);
const HAZAR = new Set(["hazar", "hazaar", "ہزار"]);
const STOP = new Set([
  "ka",
  "ki",
  "ke",
  "کا",
  "کی",
  "کے",
  "wazan",
  "weight",
  "وزن",
  "kilo",
  "kg",
  "کلو",
  "dawa",
  "dawai",
  "دوا",
  "دوائی",
  "khet",
  "کھیت",
]);

const TAG_MARK = new Set(["number", "num", "no", "tag", "نمبر", "نمبر۔", "ٹیگ"]);
const WEIGHT_MARK = new Set(["wazan", "wazan.", "weight", "وزن"]);
const KILO = new Set(["kilo", "kg", "kilogram", "کلو"]);
const MED_MARK = new Set(["dawa", "dawai", "medicine", "injection", "دوا", "دوائی", "ٹیکہ"]);
const PAD_MARK = new Set(["khet", "paddock", "plot", "کھیت", "پلاٹ"]);

function normalize(raw: string) {
  return raw
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .toLowerCase()
    .replace(/[.,،!?؟:;]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordsToNumber(tokens: string[]): number | null {
  if (tokens.length === 0) return null;
  if (tokens.length === 1 && /^\d+(\.\d+)?$/.test(tokens[0])) return Number(tokens[0]);
  let total = 0;
  let current = 0;
  let seen = false;
  for (const raw of tokens) {
    const t = raw.toLowerCase();
    if (SAU.has(t)) {
      seen = true;
      current = (current || 1) * 100;
      continue;
    }
    if (HAZAR.has(t)) {
      seen = true;
      current = (current || 1) * 1000;
      total += current;
      current = 0;
      continue;
    }
    if (t in ONES) {
      seen = true;
      current += ONES[t];
      continue;
    }
    return null;
  }
  if (!seen) return null;
  return total + current;
}

function takeNumber(tokens: string[], start: number, limit = 4) {
  const buf: string[] = [];
  for (let i = start; i < tokens.length && buf.length < limit; i += 1) {
    const t = tokens[i];
    if (STOP.has(t) || TAG_MARK.has(t) || WEIGHT_MARK.has(t) || MED_MARK.has(t) || PAD_MARK.has(t)) {
      break;
    }
    if (/^\d+(\.\d+)?$/.test(t) || t in ONES || SAU.has(t) || HAZAR.has(t)) {
      buf.push(t);
      continue;
    }
    break;
  }
  const value = wordsToNumber(buf);
  return { value, used: buf.length };
}

function findSpecies(tokens: string[]) {
  for (const token of tokens) {
    const hit = SPECIES.find((s) => s.keys.includes(token));
    if (hit) return hit.id;
  }
  return undefined;
}

function dayStart(offset: number) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d.getTime();
}

export function parseFarmSpeech(text: string, now = Date.now()): ParsedEntry {
  const dialect = guessDialect(text);
  const tokens = normalize(text).split(" ").filter(Boolean);
  const reasons: string[] = [];
  const speciesId = findSpecies(tokens);
  if (!speciesId) reasons.push("species");

  let tag: string | undefined;
  for (let i = 0; i < tokens.length; i += 1) {
    if (!TAG_MARK.has(tokens[i])) continue;
    const n = takeNumber(tokens, i + 1);
    if (n.value != null) {
      tag = String(n.value);
      break;
    }
  }
  if (!tag) reasons.push("tag");

  let weightKg: number | undefined;
  for (let i = 0; i < tokens.length; i += 1) {
    if (!KILO.has(tokens[i])) continue;
    const prev: string[] = [];
    for (let j = i - 1; j >= 0 && prev.length < 4; j -= 1) {
      const t = tokens[j];
      if (STOP.has(t) && !SAU.has(t) && !(t in ONES) && !/^\d/.test(t)) break;
      if (TAG_MARK.has(t) || WEIGHT_MARK.has(t) || MED_MARK.has(t)) break;
      prev.unshift(t);
    }
    const value = wordsToNumber(prev);
    if (value != null) {
      weightKg = value;
      break;
    }
  }
  if (weightKg == null) {
    for (let i = 0; i < tokens.length; i += 1) {
      if (!WEIGHT_MARK.has(tokens[i])) continue;
      const n = takeNumber(tokens, i + 1);
      if (n.value != null) {
        weightKg = n.value;
        break;
      }
    }
  }

  let medicine: string | undefined;
  for (let i = 0; i < tokens.length; i += 1) {
    if (!MED_MARK.has(tokens[i])) continue;
    const rest: string[] = [];
    for (let j = i + 1; j < tokens.length; j += 1) {
      if (TAG_MARK.has(tokens[j]) || WEIGHT_MARK.has(tokens[j]) || PAD_MARK.has(tokens[j]) || KILO.has(tokens[j])) {
        break;
      }
      rest.push(tokens[j]);
    }
    if (rest.length) medicine = rest.join(" ");
  }

  let paddock: string | undefined;
  for (let i = 0; i < tokens.length; i += 1) {
    if (!PAD_MARK.has(tokens[i])) continue;
    const rest: string[] = [];
    for (let j = i + 1; j < tokens.length && rest.length < 4; j += 1) {
      if (TAG_MARK.has(tokens[j]) || WEIGHT_MARK.has(tokens[j]) || MED_MARK.has(tokens[j])) break;
      rest.push(tokens[j]);
    }
    if (rest.length) paddock = rest.join(" ");
  }

  let when = dayStart(0);
  if (tokens.includes("parson") || tokens.includes("پرسوں")) when = dayStart(-2);
  else if (tokens.includes("kal") || tokens.includes("کل")) when = dayStart(-1);
  else if (tokens.includes("aaj") || tokens.includes("آج")) when = dayStart(0);
  else when = now;

  const useful = Boolean(speciesId || tag || weightKg != null || medicine || paddock);
  const confidence: "ok" | "low" = useful && reasons.length < 2 ? "ok" : "low";
  if (!useful) reasons.push("empty");

  return { speciesId, tag, weightKg, medicine, paddock, when, confidence, reasons, dialect };
}
