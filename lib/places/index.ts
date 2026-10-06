import { osmProvider } from "./osm";
import type { Place, PlacesProvider } from "./types";

export type { Place, Route } from "./types";

// The one place that picks the maps provider. To move to Google, add a `google.ts` implementing
// PlacesProvider (Places Autocomplete + Directions, key in NEXT_PUBLIC_GOOGLE_MAPS_KEY) and export it here.
export const places: PlacesProvider = osmProvider;

/** Compact, URL-safe form of a place, used to carry picked addresses from the home page to /book. */
export function encodePlace(p: Place): string {
  return JSON.stringify([p.label, p.name, p.detail, +p.lat.toFixed(6), +p.lon.toFixed(6), p.kind, p.id]);
}

export function decodePlace(raw: string | null | undefined): Place | undefined {
  if (!raw) return undefined;
  try {
    const [label, name, detail, lat, lon, kind, id] = JSON.parse(raw);
    if (typeof label !== "string" || !Number.isFinite(lat) || !Number.isFinite(lon)) return undefined;
    return { label, name: String(name ?? label), detail: String(detail ?? ""), lat, lon, kind: kind ?? "place", id: String(id ?? label) };
  } catch {
    return undefined;
  }
}
