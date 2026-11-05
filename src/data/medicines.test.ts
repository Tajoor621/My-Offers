import assert from "node:assert/strict";
import test from "node:test";
import { searchMedicines } from "./medicines.ts";

test("finds albendazole by English and Urdu", () => {
  assert.equal(searchMedicines("albendazole")[0]?.id, "albendazole");
  assert.equal(searchMedicines("البینڈازول")[0]?.id, "albendazole");
});

test("finds a crop spray by a common alias", () => {
  assert.equal(searchMedicines("tilt")[0]?.id, "propiconazole");
  assert.equal(searchMedicines("dithane")[0]?.id, "mancozeb");
});

test("does not invent a match for a short or unknown name", () => {
  assert.equal(searchMedicines("a").length, 0);
  assert.equal(searchMedicines("unicorn spray").length, 0);
});
