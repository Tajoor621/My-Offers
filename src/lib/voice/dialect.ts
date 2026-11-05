export type DialectLabel =
  | "punjabi"
  | "sindhi"
  | "pashto"
  | "peshawar"
  | "karachi"
  | "hyderabadi"
  | "unspecified";

const GROUPS: { label: Exclude<DialectLabel, "unspecified">; markers: string[] }[] = [
  {
    label: "peshawar",
    markers: ["pakhair", "sanga", "kha na", "پخیر", "سنګه", "ستړی"],
  },
  {
    label: "pashto",
    markers: ["manana", "wara", "staaso", "der kha", "مننه", "ښه", "زه"],
  },
  {
    label: "sindhi",
    markers: ["aahe", "ahe", "muhinjo", "hikro", "suhinho", "آهي", "مون", "کيئن"],
  },
  {
    label: "hyderabadi",
    markers: ["nakko", "hau bhai", "kya re", "ich hai", "نکو", "ہوں بھائی"],
  },
  {
    label: "karachi",
    markers: ["scene", "apun", "yar scene", "light scene", "کراچی", "اپن"],
  },
  {
    label: "punjabi",
    markers: [
      "vich",
      "naal",
      "painda",
      "kiven",
      "kiddan",
      "pind",
      "waila",
      "ki haal",
      "hunn",
      "majh",
      "وچ",
      "نال",
      "پیندا",
      "کیویں",
      "پنڈ",
      "ہن",
    ],
  },
];

export type DialectGuess = {
  label: DialectLabel;
  confidence: "ok" | "low";
  hits: string[];
};

/**
 * Lexical hint only — not an acoustic accent test, and not a judgment of the speaker.
 * Needs two separate markers before we trust the label.
 */
export function guessDialect(text: string): DialectGuess {
  const hay = text.toLowerCase();
  const scored = GROUPS.map((group) => {
    const hits = group.markers.filter((m) => hay.includes(m.toLowerCase()));
    return { label: group.label, hits };
  }).sort((a, b) => b.hits.length - a.hits.length);

  const top = scored[0];
  const second = scored[1];
  if (!top || top.hits.length < 2 || top.hits.length === second?.hits.length) {
    return { label: "unspecified", confidence: "low", hits: top?.hits ?? [] };
  }
  return { label: top.label, confidence: "ok", hits: top.hits };
}
