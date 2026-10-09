// Business details used across the site, metadata and structured data.
// Contacts and address from eapremiumtransportation.com (same business).
const tel = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, "")}`;

export const phones = [
  { label: "Reservations", number: "+1 (636) 450-9220" },
  { label: "Office", number: "+1 (314) 243-7118" },
  { label: "Last-minute bookings", number: "+1 (314) 800-8319" },
].map((p) => ({ ...p, href: tel(p.number) }));

export const site = {
  name: "One World Limousine",
  shortName: "One World",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Professional. Reliable. Luxury-focused.",
  description:
    "Chauffeured airport transfers, hourly chauffeurs, corporate travel and point-to-point rides from the United States to cities worldwide. Professional chauffeurs, an all-black fleet, over 10 years of experience.",
  phone: phones[0].number,
  email: "info@eapremiumtransportation.com",
  address: {
    street: "2394 Upper Bottom Rd",
    city: "St. Charles",
    region: "MO",
    postalCode: "63303",
    country: "US",
  },
  geo: { lat: 38.73869, lon: -90.53776 },
  /** Number that takes text messages (the reference site's "Send an SMS"). */
  smsPhone: "+1 (314) 243-7118",
  replyTime: "24 hours",
  keywords: [
    "limousine service",
    "chauffeur service",
    "airport transfer",
    "airport limo",
    "hourly chauffeur",
    "corporate car service",
    "black car service",
    "worldwide chauffeur",
    "executive transportation",
  ],
} as const;

export const telHref = phones[0].href;
export const addressLine = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Why us", href: "/#why" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Contact", href: "/contact" },
] as const;
