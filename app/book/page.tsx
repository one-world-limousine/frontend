import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { PrefilledBookingForm } from "@/components/booking/PrefilledBookingForm";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Icon } from "@/components/ui/Icon";
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
      <main id="main" className="bk-page">
        <div className="ow-wrap">
          <SectionHeading
            as="h1"
            eyebrow="Reservations"
            title="Book your chauffeur"
            lead="Tell us where and when. You see an estimated fare as you go, and a reservations agent confirms your chauffeur and final fare by email within 24 hours."
          />
          <div className="bk-grid">
            {/* The static page renders the empty form; trip details from the URL are filled in on the client. */}
            <Suspense fallback={<BookingForm />}>
              <PrefilledBookingForm />
            </Suspense>
            <aside className="bk-aside" aria-label="What is included">
              <div className="bk-card">
                <h2>Every ride includes</h2>
                <ul className="bk-list">
                  {included.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bk-card bk-card-dark" data-theme="dark">
                <h2>Prefer to call?</h2>
                <ul className="bk-list">
                  {phones.map((p) => (
                    <li key={p.number}>
                      <Icon name="phone" />
                      <span>
                        <a href={p.href} style={{ color: "var(--ink)" }}>{p.number}</a>
                        <small>{p.label}</small>
                      </span>
                    </li>
                  ))}
                  <li><Icon name="mail" /><a href={`mailto:${site.email}`} style={{ color: "var(--ink)" }}>{site.email}</a></li>
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
