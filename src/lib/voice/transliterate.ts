/** Rule-based Urdu script → Roman Urdu. Farm words use one canonical spelling. */
const WORDS: Record<string, string> = {
  گائے: "gaye",
  گاے: "gaye",
  بھینس: "bhains",
  بکری: "bakri",
  بکرا: "bakra",
  بھیڑ: "bhed",
  مرغی: "murghi",
  اونٹ: "oont",
  گھوڑا: "ghora",
  نمبر: "number",
  ٹیگ: "tag",
  وزن: "wazan",
  کلو: "kilo",
  دوا: "dawa",
  دوائ: "dawa",
  دوائی: "dawai",
  کھیت: "khet",
  آج: "aaj",
  کل: "kal",
  پرسوں: "parson",
  ایک: "ek",
  دو: "do",
  تین: "teen",
  چار: "char",
  پانچ: "panch",
  چھ: "che",
  سات: "saat",
  آٹھ: "aath",
  نو: "nau",
  دس: "das",
  گیارہ: "gyarah",
  بارہ: "barah",
  بیس: "bees",
  تیس: "tees",
  چالیس: "chalees",
  پچاس: "pachas",
  ساٹھ: "saath",
  ستر: "sattar",
  اسی: "assi",
  نوے: "nabbe",
  سو: "sau",
  ہزار: "hazaar",
  کا: "ka",
  کی: "ki",
  کے: "ke",
};

const LETTERS: [string, string][] = [
  ["کھ", "kh"],
  ["گھ", "gh"],
  ["چھ", "chh"],
  ["چ", "ch"],
  ["ش", "sh"],
  ["ژ", "zh"],
  ["خ", "kh"],
  ["غ", "gh"],
  ["ڑ", "r"],
  ["ڈ", "d"],
  ["ٹ", "t"],
  ["آ", "aa"],
  ["ا", "a"],
  ["ب", "b"],
  ["پ", "p"],
  ["ت", "t"],
  ["ث", "s"],
  ["ج", "j"],
  ["ح", "h"],
  ["د", "d"],
  ["ذ", "z"],
  ["ر", "r"],
  ["ز", "z"],
  ["س", "s"],
  ["ص", "s"],
  ["ض", "z"],
  ["ط", "t"],
  ["ظ", "z"],
  ["ع", "a"],
  ["ف", "f"],
  ["ق", "q"],
  ["ک", "k"],
  ["گ", "g"],
  ["ل", "l"],
  ["م", "m"],
  ["ن", "n"],
  ["ں", "n"],
  ["و", "w"],
  ["ہ", "h"],
  ["ھ", "h"],
  ["ء", ""],
  ["ی", "y"],
  ["ے", "e"],
  ["ئ", "y"],
  ["ؤ", "o"],
  ["َ", "a"],
  ["ِ", "i"],
  ["ُ", "u"],
  ["ً", ""],
  ["ّ", ""],
  ["ْ", ""],
  [" ", " "],
];

function lettersToRoman(token: string) {
  let out = "";
  let i = 0;
  while (i < token.length) {
    let hit = false;
    for (const [src, roman] of LETTERS) {
      if (token.startsWith(src, i)) {
        out += roman;
        i += src.length;
        hit = true;
        break;
      }
    }
    if (!hit) {
      out += token[i];
      i += 1;
    }
  }
  return out.replace(/([a-z])\1{2,}/g, "$1$1");
}

export function hasUrduScript(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

/** One canonical Roman form for display. Parser still accepts spelling variants. */
export function toRomanUrdu(text: string) {
  if (!hasUrduScript(text)) return text.trim().replace(/\s+/g, " ");
  return text
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return " ";
      return WORDS[part] ?? lettersToRoman(part);
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}
