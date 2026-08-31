// src/lib/temporal-polyfill.ts
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";

if (typeof globalThis.Temporal === "undefined") {
  (globalThis as { Temporal?: unknown }).Temporal = TemporalPolyfill;
}