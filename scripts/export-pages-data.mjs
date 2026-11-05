#!/usr/bin/env node
/**
 * Copy the field data the app already ships into docs/data.json
 * so the GitHub Pages helper uses the same shelf, not a second copy written by hand.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GROUPS, SPECIES } from "../src/data/catalog.ts";
import { AREA_UNITS, DRUGS, FERT_CROPS, SEED_RATES, VITALS } from "../src/data/calc.ts";
import { CITIES } from "../src/data/cities.ts";
import { ANIMAL_DISEASES } from "../src/data/diseases-animal.ts";
import { CROP_DISEASES } from "../src/data/diseases-crop.ts";
import { EMERGENCIES } from "../src/data/emergency.ts";
import { BOOKS } from "../src/data/library.ts";
import { MONTHS, YEAR } from "../src/data/seasons.ts";

const DISEASES = [...CROP_DISEASES, ...ANIMAL_DISEASES];

const root = dirname(fileURLToPath(import.meta.url));
const payload = {
  groups: GROUPS,
  species: SPECIES,
  diseases: DISEASES,
  emergencies: EMERGENCIES,
  months: MONTHS,
  year: YEAR,
  books: BOOKS,
  fert: FERT_CROPS,
  units: AREA_UNITS,
  drugs: DRUGS,
  seed: SEED_RATES,
  vitals: VITALS,
  cities: CITIES,
};

const out = join(root, "../docs/data.json");
writeFileSync(out, JSON.stringify(payload));
console.log(`wrote ${out} (${DISEASES.length} diseases, ${SPECIES.length} species)`);
