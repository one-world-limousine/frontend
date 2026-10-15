import { fleet } from "./content";
import type { Place } from "./places";

/** What the browser sends to start a Square checkout. The server recalculates the fare from it. */
export type PaymentRequest = {
  reference: string;
  vehicle: string;
  time: string; // HH:mm
  /** Pick-up, stops and drop-off, in order. */
  points: { label: string; lat: number; lon: number }[];
  email?: string;
};

const coord = (v: unknown, max: number) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= max;

/** Checks a payment request on the server; returns it cleaned, or null if anything is missing or malformed. */
export function parsePaymentRequest(body: unknown): PaymentRequest | null {
  const b = (body ?? {}) as Record<string, unknown>;
  if (typeof b.reference !== "string" || !/^[A-Z0-9-]{3,40}$/.test(b.reference)) return null;
  if (typeof b.vehicle !== "string" || !fleet.some((f) => f.id === b.vehicle)) return null;
  if (typeof b.time !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(b.time)) return null;
  if (!Array.isArray(b.points) || b.points.length < 2 || b.points.length > 5) return null;
  const points = b.points.map((p: Record<string, unknown>) => ({ label: String(p?.label ?? "").slice(0, 200), lat: p?.lat, lon: p?.lon }));
  if (!points.every((p) => coord(p.lat, 90) && coord(p.lon, 180))) return null;
  const email = typeof b.email === "string" && b.email.length <= 200 ? b.email : undefined;
  return { reference: b.reference, vehicle: b.vehicle, time: b.time, points: points as PaymentRequest["points"], email };
}

/** A routable Place from a request point, for places.route(). */
export const toPlace = (p: PaymentRequest["points"][number]): Place => ({
  id: p.label, label: p.label, name: p.label, detail: "", lat: p.lat, lon: p.lon, kind: "place",
});

/**
 * Opens Square's hosted checkout for a booking in a new tab (see app/api/payments).
 * Call it straight from a click: the tab is opened before the request so popup blockers allow it.
 */
export async function openSquareCheckout(request: PaymentRequest): Promise<void> {
  const tab = window.open("", "_blank");
  tab?.document.write('<p style="font:16px sans-serif;margin:40px">Opening secure Square checkout…</p>');
  try {
    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error(`Checkout failed (${res.status})`);
    const { url }: { url: string } = await res.json();
    if (tab) {
      tab.opener = null;
      tab.location.href = url;
    } else {
      window.location.href = url; // Popup blocked: go there in this tab instead.
    }
  } catch (err) {
    tab?.close();
    throw err;
  }
}
