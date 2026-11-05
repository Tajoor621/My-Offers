import Dexie, { type Table } from "dexie";

export type Animal = {
  id: string;
  tag: string;
  species: string;
  sex: "female" | "male" | "unknown";
  name: string;
  note: string;
  createdAt: number;
};

export type WeightRow = {
  id: string;
  animalId: string;
  kg: number;
  at: number;
  source: "voice" | "typed" | "tape";
};

export type MedRow = {
  id: string;
  animalId: string;
  drug: string;
  note: string;
  at: number;
  milkDays: number;
  meatDays: number;
};

export type FeedRow = {
  id: string;
  animalId: string;
  at: number;
  milkL: number;
  concKg: number;
  greenKg: number;
};

export type Paddock = {
  id: string;
  name: string;
  areaM2: number;
  greenness: number;
  points: [number, number][];
  createdAt: number;
};

export type CaseRow = {
  id: string;
  at: number;
  speciesId: string;
  symptomIds: string[];
  diseaseId?: string;
  note: string;
  status: "open" | "improving" | "resolved" | "referred";
};

export type EntryRow = {
  id: string;
  at: number;
  urdu: string;
  roman: string;
  dialect: string;
  dialectConfidence: "ok" | "low";
  summary: string;
};

export type CacheRow = {
  id: string;
  json: string;
  at: number;
};

class HerdDB extends Dexie {
  animals!: Table<Animal, string>;
  weights!: Table<WeightRow, string>;
  meds!: Table<MedRow, string>;
  feeds!: Table<FeedRow, string>;
  paddocks!: Table<Paddock, string>;
  cases!: Table<CaseRow, string>;
  entries!: Table<EntryRow, string>;
  cache!: Table<CacheRow, string>;

  constructor() {
    super("khet-o-kalyan");
    this.version(1).stores({
      animals: "id, tag, species, createdAt",
      weights: "id, animalId, at",
      meds: "id, animalId, at",
      feeds: "id, animalId, at",
      paddocks: "id, name, createdAt",
      cases: "id, at, speciesId, status",
      entries: "id, at",
      cache: "id",
    });
  }
}

let db: HerdDB | null = null;

export function herdDb() {
  if (typeof indexedDB === "undefined") {
    throw new Error("indexedDB unavailable");
  }
  if (!db) db = new HerdDB();
  return db;
}
