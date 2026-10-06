"use client";

import { useSearchParams } from "next/navigation";
import { tripFromSearch } from "@/lib/booking";
import { BookingForm } from "./BookingForm";

/** Reads the trip handed over by the home-page booking bar from the URL. */
export function PrefilledBookingForm() {
  const params = useSearchParams();
  // Keyed so the form remounts with fresh initial values if the query changes.
  return <BookingForm key={params.toString()} trip={tripFromSearch(params)} />;
}
