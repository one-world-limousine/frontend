import type { Metadata } from "next";
import { DriverForm } from "@/components/careers/DriverForm";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  asideClass,
  contactLinkClass,
  darkSidePanelClass,
  formGridClass,
  formPageClass,
  iconListClass,
  sidePanelClass,
  sideTitleClass,
} from "@/components/ui/panels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { driverRequirements } from "@/lib/careers";
import { phones, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Drive for us",
  description: `Join the ${site.name} on-call chauffeur team in St. Louis. Bring your own black car, MTC license and commercial insurance, and apply online in a few minutes.`,
  alternates: { canonical: "/drive-for-us" },
  openGraph: { url: "/drive-for-us", title: `Drive for us | ${site.name}` },
};

const perks: { icon: IconName; title: string; text: string }[] = [
  { icon: "clock", title: "On-call work", text: "Join our professional on-call team and take rides as they come in." },
  { icon: "users", title: "Repeat clients", text: "Many of our clients pre-book weekly, from airport runs to the daily commute." },
  { icon: "route", title: "Rides across St. Louis", text: "Airports, offices, events and family pickups across the metro area." },
  { icon: "shield-check", title: "Bookings handled", text: "Our reservations team takes every booking and confirms each ride for you." },
];

export default function DriveForUsPage() {
  return (
    <>
      <NavBar />
      <main id="main" className={formPageClass}>
        <div className="wrap">
          <SectionHeading
            as="h1"
            eyebrow="Drive for us"
            title="Join our chauffeur team"
            lead="We are growing our professional on-call team in St. Louis. If you drive your own black car and hold the right licenses, we would like to hear from you."
          />

          <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <li key={p.title}>
                <Icon name={p.icon} size={28} className="text-bronze" />
                <h2 className="mt-3 mb-1 text-lg leading-[26px] font-semibold text-ink">{p.title}</h2>
                <p className="text-[15px] leading-6 text-ink-muted">{p.text}</p>
              </li>
            ))}
          </ul>

          <div className={formGridClass}>
            <DriverForm />

            <aside className={asideClass} aria-label="Before you apply">
              <div className={sidePanelClass}>
                <h2 className={sideTitleClass}>What you need</h2>
                <ul className={iconListClass}>
                  {driverRequirements.map((r) => (
                    <li key={r}>
                      <Icon name="check" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={darkSidePanelClass} data-theme="dark">
                <h2 className={sideTitleClass}>Questions?</h2>
                <ul className={iconListClass}>
                  {phones.map((p) => (
                    <li key={p.number}>
                      <Icon name="phone" />
                      <span>
                        <a className={contactLinkClass} href={p.href}>
                          {p.number}
                        </a>
                        <small>{p.label}</small>
                      </span>
                    </li>
                  ))}
                  <li>
                    <Icon name="mail" />
                    <span>
                      <a className={contactLinkClass} href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                      <small>Replies within {site.replyTime}</small>
                    </span>
                  </li>
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
