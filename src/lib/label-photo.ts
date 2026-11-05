type WorkerLike = {
  recognize: (image: Blob) => Promise<{ data?: { text?: string } }>;
  terminate: () => Promise<void>;
};

type TesseractModule = {
  createWorker: (lang: string) => Promise<WorkerLike>;
};

/** Read the printed words on a label photo. The picture is not a chemical test. */
export async function readLabel(file: Blob): Promise<string> {
  const mod = (await import(
    /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/+esm"
  )) as TesseractModule;
  const worker = await mod.createWorker("eng");
  try {
    const result = await worker.recognize(file);
    return String(result.data?.text ?? "")
      .replace(/\s+/g, " ")
      .trim();
  } finally {
    await worker.terminate();
  }
}
