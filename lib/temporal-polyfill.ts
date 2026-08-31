import { Temporal } from "@js-temporal/polyfill";

if (typeof (globalThis as { Temporal?: unknown }).Temporal === "undefined") {
  Object.defineProperty(globalThis, "Temporal", {
    value: Temporal,
    writable: true,
    configurable: true,
  });
}

export { Temporal };