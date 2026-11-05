export type FertCrop = {
  id: string;
  en: string;
  ur: string;
  n: number;
  p: number;
  k: number;
  splitEn: string;
  splitUr: string;
};

/** Typical irrigated rates, kg nutrient per acre. A soil test wins. */
export const FERT_CROPS: FertCrop[] = [
  { id: "wheat", en: "Wheat", ur: "گندم", n: 52, p: 34, k: 25, splitEn: "All DAP and potash at sowing, plus one third of the urea. Rest of the urea at tillering and booting.", splitUr: "ساری ڈی اے پی اور پوٹاش بوائی پر، یوریا کا تیسرا حصہ ساتھ۔ باقی یوریا ٹیلرنگ اور بوٹنگ پر۔" },
  { id: "rice", en: "Rice", ur: "دھان", n: 54, p: 34, k: 25, splitEn: "DAP and potash before puddling. Split urea across tillering.", splitUr: "ڈی اے پی اور پوٹاش کیچڑ سے پہلے، یوریا ٹیلرنگ پر بانٹیں۔" },
  { id: "cotton", en: "Cotton", ur: "کپاس", n: 60, p: 34, k: 25, splitEn: "DAP at sowing. Urea in three doses, stop late nitrogen that feeds whitefly.", splitUr: "ڈی اے پی بوائی پر۔ یوریا تین بار، دیر کی نائٹروجن سفید مکھی کو نہ کھلائیں۔" },
  { id: "maize", en: "Maize", ur: "مکئی", n: 70, p: 34, k: 25, splitEn: "Half nitrogen at sowing, half at knee height.", splitUr: "آدھی نائٹروجن بوائی پر، آدھی گھٹنے کی اونچائی پر۔" },
  { id: "sugarcane", en: "Sugarcane", ur: "گنا", n: 90, p: 46, k: 50, splitEn: "Potash and phosphorus in the furrow. Nitrogen split through the early growth.", splitUr: "پوٹاش اور فاسفورس نال میں۔ نائٹروجن شروع کی بڑھوتری میں بانٹیں۔" },
  { id: "potato", en: "Potato", ur: "آلو", n: 60, p: 46, k: 50, splitEn: "Most fertilizer in the ridge at planting.", splitUr: "زیادہ کھاد بوائی کی کھیلی میں۔" },
  { id: "berseem", en: "Berseem", ur: "برسیم", n: 12, p: 46, k: 0, splitEn: "Phosphorus at sowing. A little nitrogen only if the field is weak.", splitUr: "فاسفورس بوائی پر۔ نائٹروجن تھوڑی، صرف کمزور کھیت میں۔" },
];

export const AREA_UNITS = [
  { id: "acre", en: "Acre", ur: "ایکڑ", toAcre: 1 },
  { id: "kanal", en: "Kanal (8 / acre)", ur: "کنال (8 فی ایکڑ)", toAcre: 1 / 8 },
  { id: "marla", en: "Marla (160 / acre)", ur: "مرلہ (160 فی ایکڑ)", toAcre: 1 / 160 },
  { id: "hectare", en: "Hectare", ur: "ہیکٹر", toAcre: 2.47105 },
] as const;

export function fertilizerPlan(crop: FertCrop, area: number, unitToAcre: number) {
  const acres = Math.max(0, area) * unitToAcre;
  const n = crop.n * acres;
  const p = crop.p * acres;
  const k = crop.k * acres;
  const dap = p / 23;
  const nFromDap = dap * 9;
  const urea = Math.max(0, n - nFromDap) / 23;
  const sop = k / 25;
  const mop = k / 30;
  return { acres, n, p, k, dap, urea, sop, mop };
}

export type DrugPreset = {
  id: string;
  en: string;
  ur: string;
  mgPerKg: number;
  strengths: { en: string; ur: string; mgPerMl: number }[];
  milkDays: number;
  meatDays: number;
  noteEn: string;
  noteUr: string;
};

export const DRUGS: DrugPreset[] = [
  {
    id: "albendazole",
    en: "Albendazole, roundworms",
    ur: "البینڈازول، گول کیڑے",
    mgPerKg: 7.5,
    strengths: [
      { en: "2.5% drench", ur: "2.5% ڈرنچ", mgPerMl: 25 },
      { en: "10% drench", ur: "10% ڈرنچ", mgPerMl: 100 },
    ],
    milkDays: 3,
    meatDays: 14,
    noteEn: "Liver fluke often needs a higher rate or triclabendazole. Read the bottle.",
    noteUr: "جگر کے کیڑے کو اکثر زیادہ خوراک یا ٹرائی کلابینڈازول چاہیے۔ بوتل پڑھیں۔",
  },
  {
    id: "fenbendazole",
    en: "Fenbendazole",
    ur: "فین بینڈازول",
    mgPerKg: 7.5,
    strengths: [
      { en: "2.5%", ur: "2.5%", mgPerMl: 25 },
      { en: "10%", ur: "10%", mgPerMl: 100 },
    ],
    milkDays: 4,
    meatDays: 14,
    noteEn: "Oral. Do not guess an injection volume.",
    noteUr: "منہ سے۔ انجکشن کا حساب خود سے نہ لگائیں۔",
  },
  {
    id: "ivermectin",
    en: "Ivermectin injection",
    ur: "آئیورمیکٹن انجکشن",
    mgPerKg: 0.2,
    strengths: [{ en: "1% (10 mg/ml)", ur: "1% (10 ملی گرام فی ملی)", mgPerMl: 10 }],
    milkDays: 28,
    meatDays: 35,
    noteEn: "Many brands are not for milking animals. The label wins. Not for poultry.",
    noteUr: "کئی برانڈ دودھ والے جانور کے لیے نہیں۔ لیبل غالب ہے۔ مرغی کے لیے نہیں۔",
  },
];

export function doseMl(weightKg: number, mgPerKg: number, mgPerMl: number) {
  if (weightKg <= 0 || mgPerKg <= 0 || mgPerMl <= 0) return 0;
  return (weightKg * mgPerKg) / mgPerMl;
}

export function cattleKgFromTape(girthCm: number, lengthCm: number) {
  const g = girthCm / 2.54;
  const l = lengthCm / 2.54;
  const lbs = (g * g * l) / 300;
  return lbs * 0.453592;
}

export function goatKgFromTape(girthCm: number, lengthCm: number) {
  return (girthCm * girthCm * lengthCm) / 10450;
}

export function dairyRation(bodyKg: number, milkL: number, buffalo: boolean) {
  const green = bodyKg * 0.08;
  const straw = bodyKg * 0.015;
  const perLitre = buffalo ? 2.5 : 3;
  const conc = 1.25 + milkL / perLitre;
  return { green, straw, conc };
}

export function sprayMl(tankLitres: number, mlPerLitre: number) {
  return Math.max(0, tankLitres) * Math.max(0, mlPerLitre);
}

export const SEED_RATES: { en: string; ur: string; kgPerAcre: string }[] = [
  { en: "Wheat", ur: "گندم", kgPerAcre: "50 kg" },
  { en: "Chickpea", ur: "چنا", kgPerAcre: "30–35 kg" },
  { en: "Cotton, fuzzy", ur: "کپاس، فزی", kgPerAcre: "6–8 kg" },
  { en: "Maize", ur: "مکئی", kgPerAcre: "8–10 kg" },
  { en: "Berseem", ur: "برسیم", kgPerAcre: "8 kg" },
  { en: "Rice nursery", ur: "دھان کی پنیری", kgPerAcre: "8–10 kg, then transplant" },
  { en: "Mustard", ur: "سرسوں", kgPerAcre: "2–2.5 kg" },
];

export const VITALS: { en: string; ur: string; temp: string; breath: string }[] = [
  { en: "Cattle", ur: "گائے", temp: "38.0–39.3°C", breath: "10–30 / min" },
  { en: "Buffalo", ur: "بھینس", temp: "37.5–39.0°C", breath: "10–30 / min" },
  { en: "Goat and sheep", ur: "بکری، بھیڑ", temp: "38.5–40.0°C", breath: "12–20 / min" },
  { en: "Poultry", ur: "مرغی", temp: "40.6–41.7°C", breath: "15–30 / min" },
  { en: "Camel", ur: "اونٹ", temp: "35–40°C, it swings", breath: "5–12 / min" },
  { en: "Horse", ur: "گھوڑا", temp: "37.2–38.5°C", breath: "8–16 / min" },
];
