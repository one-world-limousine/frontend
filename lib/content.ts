import type { IconName } from "@/components/ui/Icon";
import { images, type SiteImage } from "./images";
import { startingFare, type FareClass } from "./pricing";

export type BookingMode = "transfer" | "hourly" | "airport";

export const bookingModes: {
  id: BookingMode;
  label: string;
  icon: IconName;
}[] = [
  { id: "transfer", label: "Point to point", icon: "route" },
  { id: "hourly", label: "By the hour", icon: "clock" },
  { id: "airport", label: "Airport", icon: "plane" },
];

export const durations = [
  "2 hours",
  "3 hours",
  "4 hours",
  "6 hours",
  "8 hours",
  "Full day",
];

export const services = [
  {
    title: "Airport transfers",
    tagline: "Offered at short notice",
    text: "Commercial and private airports, for travellers, pilots and jet passengers. The first 20 minutes of waiting at arrivals are free.",
    mode: "airport",
    image: images.services.airport,
  },
  {
    title: "Hourly chauffeur",
    tagline: "At your request",
    text: "A car and chauffeur for as long as the day needs: meetings, a city tour, a wedding or an evening out.",
    mode: "hourly",
    image: images.services.hourly,
  },
  {
    title: "Corporate travel",
    tagline: "Easily arranged",
    text: "Airport runs, meetings and events for your executives, with packages tailored to your company.",
    mode: "transfer",
    image: images.services.corporate,
  },
  {
    title: "Point to point",
    tagline: "You will arrive on time",
    text: "Dinner, a museum, a wine tasting or across town, door to door and quoted before you ride.",
    mode: "transfer",
    image: images.services.point,
  },
] as const;

/** Messages that scroll in the announcement bar above the header. */
export const announcements: { icon: IconName; text: string; href?: string }[] =
  [
    {
      icon: "phone",
      text: "Riding today? Call +1 (314) 800-8319 for last-minute bookings",
      href: "tel:+13148008319",
    },
    {
      icon: "plane",
      text: "First 20 minutes of waiting free on airport arrivals",
    },
    {
      icon: "clock",
      text: "Need a car soon? Book as little as 30 minutes before pick-up",
      href: "/book",
    },
    {
      icon: "calendar",
      text: "Weekly packages for pre-booked clients",
      href: "/contact",
    },
    {
      icon: "map-pin",
      text: "Chauffeured across Greater St. Louis, to STL and beyond",
    },
    {
      icon: "route",
      text: "Book online in two minutes and see your fare estimate",
      href: "/book",
    },
  ];

export const points: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "calendar",
    title: "Over 10 years of experience",
    text: "More than a decade of chauffeured travel, built on reliability, courtesy and care.",
  },
  {
    icon: "shield-check",
    title: "Professional chauffeurs",
    text: "Experienced chauffeurs trained in safety and customer care.",
  },
  {
    icon: "car",
    title: "An all-black luxury fleet",
    text: "Immaculate sedans, SUVs and Sprinter vans, mechanically inspected on a regular schedule.",
  },
  {
    icon: "clock",
    title: "On-time, reliable service",
    text: "Your chauffeur arrives on time, so you arrive on time.",
  },
  {
    icon: "check",
    title: "Cleaned and disinfected daily",
    text: "Every vehicle is disinfected daily and cleaned inside and out.",
  },
  {
    icon: "building",
    title: "Trusted by corporate and private clients",
    text: "Executives, families and frequent travellers trust us with their rides.",
  },
  {
    icon: "user",
    title: "Personalized service for every ride",
    text: "Stops on the way, trip reminders and packages for weekly clients, arranged around you.",
  },
  {
    icon: "globe",
    title: "One booking, worldwide",
    text: "Book in the US and ride with the same standard in cities around the world.",
  },
];

// `fareClass` links each vehicle to its rates in lib/pricing.ts.
const vehicles = [
  {
    id: "s-class",
    vehicleClass: "Executive sedan",
    name: "Mercedes-Benz S-Class",
    passengers: 3,
    luggage: 3,
    fareClass: "sedan",
    badge: "Most booked",
    image: images.fleet.sedan,
  },
  {
    id: "yukon-denali",
    vehicleClass: "Premium SUV",
    name: "GMC Yukon Denali",
    passengers: 7,
    luggage: 6,
    fareClass: "suv",
    image: images.fleet.suv,
  },
  {
    id: "sprinter",
    vehicleClass: "Group van",
    name: "Mercedes-Benz Sprinter",
    passengers: 14,
    luggage: 12,
    fareClass: "sprinter",
    image: images.fleet.van,
  },
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
