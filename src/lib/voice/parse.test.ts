import assert from "node:assert/strict";
import test from "node:test";
import { parseFarmSpeech, wordsToNumber } from "./parse.ts";

test("do sau pachas is 250", () => {
  assert.equal(wordsToNumber(["do", "sau", "pachas"]), 250);
  assert.equal(wordsToNumber(["tees"]), 30);
  assert.equal(wordsToNumber(["12"]), 12);
});

test("roman weight sentence", () => {
  const hit = parseFarmSpeech("gaye number teen ka wazan do sau pachas kilo", 1_700_000_000_000);
  assert.equal(hit.speciesId, "cattle");
  assert.equal(hit.tag, "3");
  assert.equal(hit.weightKg, 250);
  assert.equal(hit.confidence, "ok");
});

test("spelling variants", () => {
  const a = parseFarmSpeech("gai number 12 weight 180 kg");
  const b = parseFarmSpeech("gae number barah ka wazan ek sau assi kilo");
  assert.equal(a.speciesId, "cattle");
  assert.equal(a.tag, "12");
  assert.equal(a.weightKg, 180);
  assert.equal(b.speciesId, "cattle");
  assert.equal(b.tag, "12");
  assert.equal(b.weightKg, 180);
});

test("urdu script weight sentence", () => {
  const hit = parseFarmSpeech("گائے نمبر تین کا وزن دو سو پچاس کلو");
  assert.equal(hit.speciesId, "cattle");
  assert.equal(hit.tag, "3");
  assert.equal(hit.weightKg, 250);
});

test("buffalo medicine and goat weight", () => {
  const med = parseFarmSpeech("bhains number do ki dawai albendazole");
  assert.equal(med.speciesId, "buffalo");
  assert.equal(med.tag, "2");
  assert.equal(med.medicine, "albendazole");
  const goat = parseFarmSpeech("bakri number paanch ka wazan tees kilo");
  assert.equal(goat.speciesId, "goat");
  assert.equal(goat.tag, "5");
  assert.equal(goat.weightKg, 30);
});

test("low confidence on empty speech", () => {
  const hit = parseFarmSpeech("hmm");
  assert.equal(hit.confidence, "low");
});

test("punjabi markers label the transcript, they do not judge the person", () => {
  const hit = parseFarmSpeech("pind vich gaye number aik da wazan pachas kilo");
  assert.equal(hit.dialect.label, "punjabi");
  assert.equal(hit.dialect.confidence, "ok");
  assert.equal(hit.speciesId, "cattle");
  assert.equal(hit.tag, "1");
  assert.equal(hit.weightKg, 50);
});
