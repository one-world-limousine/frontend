import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { PrefilledBookingForm } from "@/components/booking/PrefilledBookingForm";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Icon } from "@/components/ui/Icon";
import {
  asideClass,
  darkSidePanelClass,
  formGridClass,
  formPageClass,
  iconListClass,
  sidePanelClass,
  sideTitleClass,
} from "@/components/ui/panels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { phones, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a chauffeur",
  description:
    "Reserve an airport transfer, hourly chauffeur or point-to-point ride. Choose your vehicle, see an estimated fare and we confirm your booking within 24 hours.",
  alternates: { canonical: "/book" },
  openGraph: { url: "/book", title: `Book a chauffeur | ${site.name}` },
};

const included = [
  "First 20 minutes of waiting free at airport arrivals",
  "Complimentary reminders and notifications for pre-booked trips",
  "An estimated fare before you book, confirmed by our team",
  "A vehicle cleaned and disinfected daily",
];

export default function BookPage() {
  return (
    <>
      <NavBar />
      <main id="main" className={formPageClass}>
        <div className="wrap">
          <SectionHeading
            as="h1"
            eyebrow="Reservations"
            title="Book your chauffeur"
            lead="Tell us where and when. You see an estimated fare as you go, and a reservations agent confirms your chauffeur and final fare by email within 24 hours."
          />
          <div className={formGridClass}>
            {/* The static page renders the empty form; trip details from the URL are filled in on the client. */}
            <Suspense fallback={<BookingForm />}>
              <PrefilledBookingForm />
            </Suspense>
            <aside className={asideClass} aria-label="What is included">
              <div className={sidePanelClass}>
                <h2 className={sideTitleClass}>Every ride includes</h2>
                <ul className={iconListClass}>
                  {included.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={darkSidePanelClass} data-theme="dark">
                <h2 className={sideTitleClass}>Prefer to call?</h2>
                <ul className={iconListClass}>
                  {phones.map((p) => (
                    <li key={p.number}>
                      <Icon name="phone" />
                      <span>
                        <a href={p.href} className="text-ink">{p.number}</a>
                        <small>{p.label}</small>
                      </span>
                    </li>
                  ))}
                  <li><Icon name="mail" /><a href={`mailto:${site.email}`} className="text-ink">{site.email}</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
