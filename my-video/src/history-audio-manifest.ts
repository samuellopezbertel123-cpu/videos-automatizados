import type { HistoryCaption } from "./history-series-data";
export type HistoryAudioInfo = { playbackRate: number; captions: HistoryCaption[]; durationSeconds: number };
/**
 * Generado opcionalmente por "npm run voices:history".
 * Mientras no haya voces disponibles, los tres vídeos siguen siendo previsualizables.
 * No edites este archivo manualmente: la sincronización sale de ElevenLabs.
 */
export const historyAudioManifest: Record<string, HistoryAudioInfo> = {};
