// Site photography. Stand-in photos from Unsplash (free for commercial use under the Unsplash License,
// no attribution required); swap in the company's own photos of its fleet when they exist.
// Originals: https://images.unsplash.com/photo-<id>. Files are pre-cropped to each slot's shape.
import cabin from "@/public/images/cabin.jpg"; // 1787510026653-832390809296
import fleetSedan from "@/public/images/fleet-sedan.jpg"; // 1764090317825-9b76e437c8d8
import fleetSuv from "@/public/images/fleet-suv.jpg"; // 1735620731955-b047a7122892
import fleetVan from "@/public/images/fleet-van.jpg"; // 1765461734605-34657fa04db2
import hero from "@/public/images/hero.jpg"; // 1730800328198-f9efbf9db53f
import serviceAirport from "@/public/images/service-airport.jpg"; // 1687992176093-6417a93fa3d0
import serviceCorporate from "@/public/images/service-corporate.jpg"; // 1698840059740-ba83e510733b
import serviceHourly from "@/public/images/service-hourly.jpg"; // 1596032457104-baa1f5f9372a
import servicePoint from "@/public/images/service-point-to-point.jpg"; // 1609521247503-8de40462e427
import type { StaticImageData } from "next/image";

export type SiteImage = { src: StaticImageData; alt: string };

export const images = {
  hero: { src: hero, alt: "A chauffeur in a dark suit opening the rear door of a black van outside a hotel entrance" },
  cabin: { src: cabin, alt: "Cream leather rear cabin of a luxury car with a centre console and glassware" },
  services: {
    airport: { src: serviceAirport, alt: "Two travellers walking through a bright airport terminal towards the gates" },
    hourly: { src: serviceHourly, alt: "A chauffeur driving, seen from the rear passenger seat" },
    corporate: { src: serviceCorporate, alt: "A smiling passenger in business attire stepping out of a black car" },
    point: { src: servicePoint, alt: "A black Mercedes-Benz S-Class parked outside a brick office building" },
  },
  fleet: {
    sedan: { src: fleetSedan, alt: "Black Mercedes-Benz S-Class sedan, side view" },
    suv: { src: fleetSuv, alt: "Black full-size luxury SUV, front three-quarter view" },
    van: { src: fleetVan, alt: "Black Mercedes-Benz passenger van with its headlights on" },
  },
} satisfies Record<string, SiteImage | Record<string, SiteImage>>;
