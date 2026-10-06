import type { BookingMode } from "./content";
import { decodePlace, encodePlace, type Place } from "./places";

/** Trip details carried from the home-page booking bar (or a link) to /book. */
export type Trip = {
  mode?: BookingMode;
  pickup?: Place;
  dropoff?: Place;
  duration?: string;
  date?: string; // YYYY-MM-DD
  time?: string; // HH:mm
  vehicle?: string;
};

const TEXT_KEYS = ["mode", "duration", "date", "time", "vehicle"] as const;

export function tripToSearch(trip: Trip) {
  const params = new URLSearchParams();
  for (const k of TEXT_KEYS) if (trip[k]) params.set(k, trip[k]!);
  if (trip.pickup) params.set("pickup", encodePlace(trip.pickup));
  if (trip.dropoff) params.set("dropoff", encodePlace(trip.dropoff));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function tripFromSearch(params: URLSearchParams): Trip {
  const trip: Trip = {};
  for (const k of TEXT_KEYS) {
    const v = params.get(k);
    if (v) (trip as Record<string, string>)[k] = v;
  }
  trip.pickup = decodePlace(params.get("pickup"));
  trip.dropoff = decodePlace(params.get("dropoff"));
  return trip;
}

export type BookingRequest = {
  mode: BookingMode;
  pickup: Place;
  stops: Place[];
  dropoff?: Place;
  duration?: string;
  date: string;
  time: string;
  vehicle: string;
  passengers: number;
  luggage?: number;
  flight?: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  /** Route and fare shown to the visitor when they submitted, if one was calculated. */
  estimate?: { miles: number; minutes: number; fare: number | "call" };
};

/**
 * Sends a reservation request. Posts to `${NEXT_PUBLIC_API_URL}/bookings` when that env var is set;
 * otherwise it resolves after a short delay so the flow can be tried before the backend exists.
 */
export async function submitBooking(request: BookingRequest): Promise<{ reference: string }> {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (api) {
    const res = await fetch(`${api.replace(/\/$/, "")}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error(`Booking failed (${res.status})`);
    return res.json();
  }
  await new Promise((r) => setTimeout(r, 900));
  return { reference: `OW-${Math.random().toString(36).slice(2, 8).toUpperCase()}` };
}
