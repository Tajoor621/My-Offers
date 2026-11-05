export type Domain = "crop" | "animal";

export type Kind =
  | "fungus"
  | "bacteria"
  | "virus"
  | "pest"
  | "parasite"
  | "metabolic"
  | "nutrient"
  | "management"
  | "toxin";

export type Severity = "watch" | "treat" | "urgent" | "report";

export type GroupId =
  | "field"
  | "leaf"
  | "stem"
  | "fruit"
  | "bug"
  | "root"
  | "body"
  | "eat"
  | "breath"
  | "dung"
  | "milk"
  | "skin"
  | "feet"
  | "repro"
  | "neuro";

export type Symptom = {
  id: string;
  en: string;
  ur: string;
  group: GroupId;
};

export type Species = {
  id: string;
  domain: Domain;
  en: string;
  ur: string;
  symptoms: Symptom[];
};

export type Disease = {
  id: string;
  species: string[];
  en: string;
  ur: string;
  aka: string[];
  reads: string[];
  kind: Kind;
  severity: Severity;
  summaryEn: string;
  summaryUr: string;
  symptomIds: string[];
  keyIds: string[];
  confirmEn: string[];
  confirmUr: string[];
  stepsEn: string[];
  stepsUr: string[];
  drugsEn: string[];
  drugsUr: string[];
  preventEn: string[];
  preventUr: string[];
  referEn: string;
  referUr: string;
  also?: string[];
};

export type Chapter = {
  en: string;
  ur: string;
  bodyEn: string[];
  bodyUr: string[];
};

export type Book = {
  slug: string;
  en: string;
  ur: string;
  minutes: number;
  blurbEn: string;
  blurbUr: string;
  chapters: Chapter[];
};

export type CaseNote = {
  id: string;
  at: number;
  speciesId: string;
  symptomIds: string[];
  diseaseId?: string;
  note: string;
  status: "open" | "improving" | "resolved" | "referred";
};
