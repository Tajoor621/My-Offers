export const VOICE_MODELS = [
  {
    id: "Xenova/whisper-tiny",
    bytes: 43_333_141,
    phone: true,
  },
  {
    id: "Xenova/whisper-small",
    bytes: 251_586_225,
    phone: false,
  },
] as const;

export type VoiceProgress = {
  status: string;
  progress?: number;
  file?: string;
};

export async function transcribeUrdu(
  blob: Blob,
  modelId: string,
  onProgress?: (update: VoiceProgress) => void,
) {
  const { pipeline, env } = await import("@huggingface/transformers");
  env.allowLocalModels = false;
  env.useBrowserCache = true;
  const transcriber = await pipeline("automatic-speech-recognition", modelId, {
    dtype: "q8",
    device: "wasm",
    progress_callback: (update: VoiceProgress) => onProgress?.(update),
  });
  const url = URL.createObjectURL(blob);
  try {
    const out = await transcriber(url, { language: "ur", task: "transcribe" });
    if (typeof out === "string") return out.trim();
    if (out && typeof out === "object" && "text" in out) {
      return String((out as { text?: unknown }).text ?? "").trim();
    }
    return "";
  } finally {
    URL.revokeObjectURL(url);
  }
}
