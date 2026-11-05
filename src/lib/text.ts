export function pick(lang: string, en: string, ur: string) {
  return lang.startsWith("en") ? en : ur;
}

export function uid() {
  return crypto.randomUUID();
}

export function formatMb(bytes: number) {
  return `${Math.round(bytes / 1_000_000)} MB`;
}
