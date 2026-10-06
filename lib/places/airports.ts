import type { Place } from "./types";

// OpenStreetMap search is weak on airport codes ("STL", "JFK"), so major airports are matched
// locally first. Home-region airports lead, then major US and international hubs.
// [IATA, name, locality, lat, lon, aliases]
type Row = [string, string, string, number, number, string?];

const AIRPORTS: Row[] = [
  ["STL", "St. Louis Lambert International Airport", "St. Louis, MO", 38.7487, -90.37, "lambert"],
  ["SUS", "Spirit of St. Louis Airport", "Chesterfield, MO", 38.6621, -90.652],
  ["BLV", "MidAmerica St. Louis Airport", "Mascoutah, IL", 38.5452, -89.8352],
  ["MCI", "Kansas City International Airport", "Kansas City, MO", 39.2976, -94.7139],
  ["ORD", "Chicago O'Hare International Airport", "Chicago, IL", 41.9742, -87.9073, "ohare"],
  ["MDW", "Chicago Midway International Airport", "Chicago, IL", 41.7868, -87.7522],
  ["JFK", "John F. Kennedy International Airport", "New York, NY", 40.6413, -73.7781, "kennedy"],
  ["LGA", "LaGuardia Airport", "New York, NY", 40.7769, -73.874, "la guardia"],
  ["EWR", "Newark Liberty International Airport", "Newark, NJ", 40.6895, -74.1745],
  ["LAX", "Los Angeles International Airport", "Los Angeles, CA", 33.9416, -118.4085],
  ["SFO", "San Francisco International Airport", "San Francisco, CA", 37.6213, -122.379],
  ["ATL", "Hartsfield-Jackson Atlanta International Airport", "Atlanta, GA", 33.6407, -84.4277],
  ["DFW", "Dallas/Fort Worth International Airport", "Dallas, TX", 32.8998, -97.0403],
  ["DAL", "Dallas Love Field", "Dallas, TX", 32.8471, -96.8518],
  ["IAH", "George Bush Intercontinental Airport", "Houston, TX", 29.9902, -95.3368],
  ["HOU", "William P. Hobby Airport", "Houston, TX", 29.6454, -95.2789],
  ["DEN", "Denver International Airport", "Denver, CO", 39.8561, -104.6737],
  ["LAS", "Harry Reid International Airport", "Las Vegas, NV", 36.084, -115.1537, "mccarran"],
  ["PHX", "Phoenix Sky Harbor International Airport", "Phoenix, AZ", 33.4342, -112.0116],
  ["SEA", "Seattle-Tacoma International Airport", "Seattle, WA", 47.4502, -122.3088],
  ["MIA", "Miami International Airport", "Miami, FL", 25.7959, -80.287],
  ["FLL", "Fort Lauderdale-Hollywood International Airport", "Fort Lauderdale, FL", 26.0742, -80.1506],
  ["MCO", "Orlando International Airport", "Orlando, FL", 28.4312, -81.3081],
  ["BOS", "Boston Logan International Airport", "Boston, MA", 42.3656, -71.0096],
  ["DCA", "Ronald Reagan Washington National Airport", "Arlington, VA", 38.8512, -77.0402],
  ["IAD", "Washington Dulles International Airport", "Dulles, VA", 38.9531, -77.4565],
  ["BWI", "Baltimore/Washington International Airport", "Baltimore, MD", 39.1774, -76.6684],
  ["PHL", "Philadelphia International Airport", "Philadelphia, PA", 39.8744, -75.2424],
  ["CLT", "Charlotte Douglas International Airport", "Charlotte, NC", 35.2144, -80.9473],
  ["MSP", "Minneapolis-Saint Paul International Airport", "Minneapolis, MN", 44.8848, -93.2223],
  ["DTW", "Detroit Metropolitan Airport", "Detroit, MI", 42.2162, -83.3554],
  ["BNA", "Nashville International Airport", "Nashville, TN", 36.1263, -86.6774],
  ["MSY", "Louis Armstrong New Orleans International Airport", "New Orleans, LA", 29.9934, -90.258],
  ["SAN", "San Diego International Airport", "San Diego, CA", 32.7338, -117.1933],
  ["SLC", "Salt Lake City International Airport", "Salt Lake City, UT", 40.7899, -111.9791],
  ["AUS", "Austin-Bergstrom International Airport", "Austin, TX", 30.1975, -97.6664],
  ["IND", "Indianapolis International Airport", "Indianapolis, IN", 39.7173, -86.2944],
  ["CVG", "Cincinnati/Northern Kentucky International Airport", "Hebron, KY", 39.0489, -84.6678],
  ["MEM", "Memphis International Airport", "Memphis, TN", 35.0421, -89.9792],
  ["SDF", "Louisville Muhammad Ali International Airport", "Louisville, KY", 38.1744, -85.736],
  ["OMA", "Eppley Airfield", "Omaha, NE", 41.3032, -95.8941],
  ["TUL", "Tulsa International Airport", "Tulsa, OK", 36.1984, -95.8881],
  ["HNL", "Daniel K. Inouye International Airport", "Honolulu, HI", 21.3245, -157.9251],
  ["YYZ", "Toronto Pearson International Airport", "Toronto, Canada", 43.6777, -79.6248, "pearson"],
  ["YUL", "Montréal-Trudeau International Airport", "Montréal, Canada", 45.4706, -73.7408, "montreal trudeau"],
  ["MEX", "Mexico City International Airport", "Mexico City, Mexico", 19.4361, -99.0719],
  ["CUN", "Cancún International Airport", "Cancún, Mexico", 21.0365, -86.8771, "cancun"],
  ["LHR", "London Heathrow Airport", "London, United Kingdom", 51.47, -0.4543],
  ["LGW", "London Gatwick Airport", "London, United Kingdom", 51.1537, -0.1821],
  ["CDG", "Paris Charles de Gaulle Airport", "Paris, France", 49.0097, 2.5479],
  ["AMS", "Amsterdam Airport Schiphol", "Amsterdam, Netherlands", 52.3105, 4.7683],
  ["FRA", "Frankfurt Airport", "Frankfurt, Germany", 50.0379, 8.5622],
  ["MUC", "Munich Airport", "Munich, Germany", 48.3537, 11.775],
  ["ZRH", "Zurich Airport", "Zurich, Switzerland", 47.4582, 8.5555],
  ["FCO", "Rome Fiumicino Airport", "Rome, Italy", 41.8003, 12.2389],
  ["MAD", "Adolfo Suárez Madrid-Barajas Airport", "Madrid, Spain", 40.4983, -3.5676, "barajas"],
  ["BCN", "Barcelona-El Prat Airport", "Barcelona, Spain", 41.2974, 2.0833],
  ["IST", "Istanbul Airport", "Istanbul, Türkiye", 41.2753, 28.7519, "turkey"],
  ["DXB", "Dubai International Airport", "Dubai, UAE", 25.2532, 55.3657],
  ["DOH", "Hamad International Airport", "Doha, Qatar", 25.2731, 51.6081],
  ["AUH", "Zayed International Airport", "Abu Dhabi, UAE", 24.433, 54.6511],
  ["SIN", "Singapore Changi Airport", "Singapore", 1.3644, 103.9915],
  ["HKG", "Hong Kong International Airport", "Hong Kong", 22.308, 113.9185],
  ["NRT", "Narita International Airport", "Tokyo, Japan", 35.772, 140.3929],
  ["HND", "Tokyo Haneda Airport", "Tokyo, Japan", 35.5494, 139.7798],
  ["ICN", "Incheon International Airport", "Seoul, South Korea", 37.4602, 126.4407],
  ["SYD", "Sydney Kingsford Smith Airport", "Sydney, Australia", -33.9399, 151.1753],
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ");

const INDEX = AIRPORTS.map(([code, name, locality, lat, lon, aliases]) => ({
  place: {
    id: `iata:${code}`,
    label: `${name} (${code}), ${locality}`,
    name: `${name} (${code})`,
    detail: locality,
    lat,
    lon,
    kind: "airport",
  } satisfies Place,
  code: code.toLowerCase(),
  hay: norm(`${code} ${name} ${aliases ?? ""} airport`),
  // The city only counts when the visitor asks for an airport ("new york airport"), so that
  // typing a city name alone still lists the city first.
  withCity: norm(`${code} ${name} ${locality} ${aliases ?? ""} airport`),
}));

/** Airports whose code, name, city or alias match every word typed. An exact code match ranks first. */
export function matchAirports(query: string, limit = 3): Place[] {
  const words = norm(query).split(" ").filter(Boolean);
  if (!words.length || (words.length === 1 && words[0].length < 3)) return [];
  const exact = INDEX.filter((a) => words.includes(a.code));
  const wantsAirport = words.some((w) => w === "airport" || w === "airports" || w === "intl");
  const rest = INDEX.filter((a) => !exact.includes(a) && words.every((w) => (wantsAirport ? a.withCity : a.hay).includes(w)));
  // A lone generic word ("airport", "international") is not enough to list airports.
  if (!exact.length && words.every((w) => w === "airport" || w === "airports" || w === "international" || w === "intl")) return [];
  return [...exact, ...rest].slice(0, limit).map((a) => a.place);
}
