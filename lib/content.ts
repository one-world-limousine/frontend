import type { IconName } from "@/components/ui/Icon";
import { images, type SiteImage } from "./images";
import { startingFare, type FareClass } from "./pricing";

export type BookingMode = "transfer" | "hourly" | "airport";

export const bookingModes: { id: BookingMode; label: string; icon: IconName }[] = [
  { id: "transfer", label: "Point to point", icon: "route" },
  { id: "hourly", label: "By the hour", icon: "clock" },
  { id: "airport", label: "Airport", icon: "plane" },
];

export const durations = ["2 hours (minimum)", "3 hours", "4 hours", "6 hours", "8 hours", "Full day"];

export const services = [
  {
    number: "01",
    title: "Airport transfers",
    tagline: "Offered at short notice",
    text: "Flight tracking, meet-and-greet at arrivals and a chauffeur who waits when you are delayed.",
    mode: "airport",
    image: images.services.airport,
  },
  {
    number: "02",
    title: "Hourly chauffeur",
    tagline: "At your request",
    text: "A car and chauffeur for as long as the day needs: meetings, shopping or an evening out.",
    mode: "hourly",
    image: images.services.hourly,
  },
  {
    number: "03",
    title: "Corporate travel",
    tagline: "Easily arranged",
    text: "Account billing, roadshows and executive transport with one point of contact.",
    mode: "transfer",
    image: images.services.corporate,
  },
  {
    number: "04",
    title: "Point to point",
    tagline: "You will arrive on time",
    text: "Door to door across the city or between cities, priced up front.",
    mode: "transfer",
    image: images.services.point,
  },
] as const;

/** Messages that scroll in the announcement bar above the header. */
export const announcements: { icon: IconName; text: string; href?: string }[] = [
  { icon: "phone", text: "Riding today? Call +1 (314) 800-8319 for last-minute bookings", href: "tel:+13148008319" },
  { icon: "plane", text: "Flight tracking and free waiting on every airport pick-up" },
  { icon: "calendar", text: "Weekly packages for pre-booked clients", href: "/contact" },
  { icon: "map-pin", text: "Chauffeured across Greater St. Louis, to STL and beyond" },
  { icon: "route", text: "Book online in two minutes and see your fare estimate", href: "/book" },
];

export const points: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield-check", title: "Professional chauffeurs", text: "Vetted, suited and trained, with more than ten years on the road." },
  { icon: "car", title: "An all-black fleet", text: "Late-model sedans, SUVs and vans, cleaned and disinfected before every ride." },
  { icon: "clock", title: "On time, every time", text: "We track your flight and your traffic so the car is waiting, not you." },
  { icon: "globe", title: "One booking, worldwide", text: "Book in the US and ride with the same standard in cities around the world." },
];

// `fareClass` links each vehicle to its rates in lib/pricing.ts.
const vehicles = [
  { id: "s-class", vehicleClass: "Executive sedan", name: "Mercedes-Benz S-Class", passengers: 3, luggage: 3, fareClass: "sedan", badge: "Most booked", image: images.fleet.sedan },
  { id: "yukon-denali", vehicleClass: "Premium SUV", name: "GMC Yukon Denali", passengers: 7, luggage: 6, fareClass: "suv", image: images.fleet.suv },
  { id: "sprinter", vehicleClass: "Group van", name: "Mercedes-Benz Sprinter", passengers: 14, luggage: 12, fareClass: "sprinter", image: images.fleet.van },
] as const satisfies readonly {
  id: string;
  vehicleClass: string;
  name: string;
  passengers: number;
  luggage: number;
  fareClass: FareClass;
  badge?: string;
  image: SiteImage;
}[];

/** Fleet with its starting fare ("$66"), or no price for vehicles quoted by phone. */
export const fleet = vehicles.map((v) => {
  const from = startingFare(v.fareClass);
  return { ...v, price: from === null ? undefined : `$${from}` };
});

export type FleetId = (typeof vehicles)[number]["id"];
