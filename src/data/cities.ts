export const CITIES = [
  { id: "lhr", en: "Lahore", ur: "لاہور", lat: 31.5204, lon: 74.3587 },
  { id: "fsd", en: "Faisalabad", ur: "فیصل آباد", lat: 31.4504, lon: 73.135 },
  { id: "mux", en: "Multan", ur: "ملتان", lat: 30.1575, lon: 71.5249 },
  { id: "bwp", en: "Bahawalpur", ur: "بہاولپور", lat: 29.3956, lon: 71.6836 },
  { id: "isb", en: "Islamabad", ur: "اسلام آباد", lat: 33.6844, lon: 73.0479 },
  { id: "pew", en: "Peshawar", ur: "پشاور", lat: 34.0151, lon: 71.5249 },
  { id: "qta", en: "Quetta", ur: "کوئٹہ", lat: 30.1798, lon: 66.975 },
  { id: "khi", en: "Karachi", ur: "کراچی", lat: 24.8607, lon: 67.0011 },
  { id: "hyd", en: "Hyderabad", ur: "حیدرآباد", lat: 25.396, lon: 68.3578 },
  { id: "skz", en: "Sukkur", ur: "سکھر", lat: 27.7052, lon: 68.8574 },
] as const;

export type City = (typeof CITIES)[number];
