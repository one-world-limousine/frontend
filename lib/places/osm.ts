import { matchAirports } from "./airports";
import type { Place, PlacesProvider, Route } from "./types";

// OpenStreetMap services, free and keyless:
// - Photon (komoot) for type-ahead search. Nominatim's policy forbids autocomplete, Photon is built for it.
// - OSRM for driving routes.
// Both public servers are fair-use; for heavy traffic, self-host them or switch to Google (see ./index.ts).
const PHOTON = "https://photon.komoot.io/api/";
const OSRM = "https://router.project-osrm.org/route/v1/driving/";

// Rank results near the St. Charles, MO base first, without excluding anywhere else.
const BIAS = { lat: 38.7881, lon: -90.4974 };

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    osm_type?: string;
    osm_id?: number;
    osm_key?: string;
    osm_value?: string;
    type?: string;
    name?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    district?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    countrycode?: string;
  };
};

const join = (parts: (string | undefined)[], sep = ", ") => parts.filter(Boolean).join(sep);

function toPlace(f: PhotonFeature): Place {
  const p = f.properties;
  const [lon, lat] = f.geometry.coordinates;
  const street = join([p.housenumber, p.street], " ");
  const name = p.name || street || p.city || p.county || p.state || "Unnamed place";
  // US addresses read "St. Charles, MO 63303"; elsewhere "London, United Kingdom".
  const locality = p.countrycode === "US" ? join([p.city || p.county, join([p.state, p.postcode], " ")]) : join([p.city || p.county, p.country]);
  const detail = join([p.name && street !== p.name ? street : undefined, locality]);
  const kind: Place["kind"] =
    p.osm_key === "aeroway" ? "airport" : p.type === "house" || p.type === "street" || !p.name ? "address" : "place";
  return {
    id: `osm:${p.osm_type ?? ""}${p.osm_id ?? `${lat},${lon}`}`,
    label: join([name, detail]),
    name,
    detail,
    lat,
    lon,
    kind,
  };
}

/**
 * Many US buildings have no house number in OpenStreetMap, so "2394 Upper Bottom Rd" only finds the street.
 * Keep the number the visitor typed so the chauffeur gets the full address; the route uses the street's position.
 */
function withHouseNumber(place: Place, f: PhotonFeature, typed?: string): Place {
  const p = f.properties;
  if (!typed || p.housenumber || p.type !== "street" || !p.name) return place;
  const name = `${typed} ${p.name}`;
  return { ...place, id: `${place.id}#${typed}`, name, label: join([name, place.detail]), kind: "address" };
}

// Photon matches "Upper Bottom Road" but not "2394 Upper Bottom Rd", so spell out common US street
// abbreviations. ("St" is left alone: it is as often "Saint" as "Street".)
const ABBREVIATIONS: Record<string, string> = {
  rd: "Road", ave: "Avenue", av: "Avenue", blvd: "Boulevard", dr: "Drive", ln: "Lane", ct: "Court",
  hwy: "Highway", pkwy: "Parkway", pl: "Place", cir: "Circle", ter: "Terrace", trl: "Trail", sq: "Square",
};
const expand = (q: string) => q.replace(/\b([a-z]+)\.?(?=\s|,|$)/gi, (w, word: string) => ABBREVIATIONS[word.toLowerCase()] ?? w);

async function photon(q: string, signal?: AbortSignal): Promise<PhotonFeature[]> {
  const url = new URL(PHOTON);
  url.searchParams.set("q", q);
  url.searchParams.set("limit", "8");
  url.searchParams.set("lang", "en");
  url.searchParams.set("lat", String(BIAS.lat));
  url.searchParams.set("lon", String(BIAS.lon));
  const res = await fetch(url, { signal: withTimeout(signal, 6000) });
  if (!res.ok) throw new Error(`Place search failed (${res.status})`);
  return ((await res.json()) as { features: PhotonFeature[] }).features;
}

// Give up on a slow public server rather than leaving the field "Searching" indefinitely.
function withTimeout(signal: AbortSignal | undefined, ms: number) {
  const timeout = AbortSignal.timeout(ms);
  return signal && "any" in AbortSignal ? AbortSignal.any([signal, timeout]) : (signal ?? timeout);
}

// "St. Louis Lambert International Airport (STL)" -> "st louis lambert international airport"
const simple = (s: string) => s.toLowerCase().replace(/\([a-z]{3}\)/, "").replace(/[^a-z0-9]+/g, " ").trim();

export const osmProvider: PlacesProvider = {
  instant: (query) => matchAirports(query),

  async suggest(query, signal) {
    const airports = matchAirports(query);
    const q = expand(query.trim());
    const houseNumber = q.match(/^(\d+[a-z]?)\s+\S/i)?.[1];
    let features = await photon(q, signal);
    // House number unknown to OSM: search the street alone; withHouseNumber() puts the number back.
    if (!features.length && houseNumber) features = await photon(q.slice(houseNumber.length).trim(), signal);
    // Drop duplicates: the same building often appears as several OSM objects, and OSM's copy of an
    // airport that is already listed from the local airport list.
    const seen = new Set(airports.map((a) => a.label));
    const airportNames = airports.map((a) => simple(a.name));
    const found = features
      .map((f) => withHouseNumber(toPlace(f), f, houseNumber))
      .filter((pl) => !(pl.kind === "airport" && airportNames.includes(simple(pl.name))))
      .filter((pl) => (seen.has(pl.label) ? false : (seen.add(pl.label), true)));
    return [...airports, ...found].slice(0, 6);
  },

  async route(points, signal): Promise<Route | null> {
    if (points.length < 2) return null;
    const coords = points.map((p) => `${p.lon},${p.lat}`).join(";");
    const res = await fetch(`${OSRM}${coords}?overview=false&alternatives=false`, { signal: withTimeout(signal, 8000) });
    if (!res.ok) return null;
    const data: { code: string; routes?: { distance: number; duration: number }[] } = await res.json();
    const best = data.code === "Ok" ? data.routes?.[0] : undefined;
    if (!best) return null;
    return {
      miles: Math.round((best.distance / 1609.34) * 10) / 10,
      minutes: Math.max(1, Math.round(best.duration / 60)),
    };
  },
};
