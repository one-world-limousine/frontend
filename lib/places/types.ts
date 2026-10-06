/** A location the visitor picked from the suggestions. Coordinates make it routable. */
export type Place = {
  id: string;
  /** Full single-line address shown in the field. */
  label: string;
  /** Short name (hotel, airport, street) for the first line of a suggestion. */
  name: string;
  /** Rest of the address for the second line of a suggestion. */
  detail: string;
  lat: number;
  lon: number;
  kind: "airport" | "address" | "place";
};

export type Route = { miles: number; minutes: number };

/**
 * What the booking forms need from a maps provider. OpenStreetMap implements it today;
 * a Google Places + Directions version only has to implement the same two functions.
 */
export interface PlacesProvider {
  /** Optional matches available without a network call, shown while `suggest` loads. */
  instant?(query: string): Place[];
  suggest(query: string, signal?: AbortSignal): Promise<Place[]>;
  /** Driving route through the points in order (pick-up, stops, drop-off). Null if none was found. */
  route(points: Place[], signal?: AbortSignal): Promise<Route | null>;
}
