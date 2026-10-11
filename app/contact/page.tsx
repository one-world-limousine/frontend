import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapFacade } from "@/components/contact/MapFacade";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import {
  asideClass,
  contactLinkClass,
  formGridClass,
  formPageClass,
  iconListClass,
  sidePanelClass,
  sideTitleClass,
} from "@/components/ui/panels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addressLine, phones, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Call, text or email ${site.name} in St. Charles, MO. Reservations ${phones[0].number}. We reply within ${site.replyTime}.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Contact us | ${site.name}` },
};

const sms = `sms:${site.smsPhone.replace(/[^0-9+]/g, "")}`;
const directions = `https://www.openstreetmap.org/directions?to=${site.geo.lat}%2C${site.geo.lon}`;
const lastMinute = phones[phones.length - 1];

const faqs = [
  {
    q: "How quickly will you reply?",
    a: `Every message gets an answer within ${site.replyTime}, usually much sooner. For a ride today, call ${lastMinute.number} instead of writing.`,
  },
  {
    q: "My plans changed at the last minute. What should I do?",
    a: `Call ${lastMinute.number} straight away so we can attend to you promptly. Changes made by phone reach your chauffeur fastest.`,
  },
  {
    q: "Do you offer packages for regular rides?",
    a: "Yes. Clients who pre-book weekly, such as airport runs or a school or office commute, can ask us for a package rate.",
  },
  {
    q: "Can I get a quote for an event?",
    a: "Weddings, parties, proms and corporate events are quoted individually. Book party vehicles at least 72 hours ahead, and tell us the date, the number of guests and the venues in your message.",
  },
];

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${site.url}/contact`,
  name: `Contact ${site.name}`,
  about: { "@id": `${site.url}/#organization` },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <NavBar />
      <main id="main" className={formPageClass}>
        <div className="wrap">
          <SectionHeading
            as="h1"
            eyebrow="Contact us"
            title="Talk to our reservations team"
            lead={`Questions, quotes or a ride later this week: send us a note and we reply within ${site.replyTime}. Riding today? Call ${lastMinute.number} and we will attend to you promptly.`}
          />

          <div className={formGridClass}>
            <ContactForm />

            <aside
              className={asideClass}
              aria-label="Other ways to reach us"
            >
              <div className={sidePanelClass}>
                <h2 className={sideTitleClass}>Call us</h2>
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
                </ul>
              </div>
              <div className={sidePanelClass}>
                <h2 className={sideTitleClass}>Write to us</h2>
                <ul className={iconListClass}>
                  <li>
                    <Icon name="mail" />
                    <span>
                      <a className={contactLinkClass} href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                      <small>Replies within {site.replyTime}</small>
                    </span>
                  </li>
                  <li>
                    <Icon name="phone" />
                    <span>
                      <a className={contactLinkClass} href={sms}>
                        Send a text message
                      </a>
                      <small>{site.smsPhone}</small>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* Office + map */}
        {/*<section
          className="wrap pt-(--section-y)"
          aria-labelledby="ct-office-title"
        >
          <Reveal className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col gap-6">
              <SectionHeading
                id="ct-office-title"
                eyebrow="Our base"
                title="St. Charles, Missouri"
                size="md"
                titleClassName="text-lg leading-7 text-ink-muted"
              />
              <address className="flex items-start gap-3 text-lg leading-7 font-semibold text-ink-muted not-italic">
                <Icon name="map-pin" size={22} className="mt-[3px] text-bronze" />
                <span>{addressLine}</span>
              </address>
              <p className="max-w-[60ch] text-lg leading-7 text-ink-muted">
                Chauffeured rides across Greater St. Louis, to and from STL and
                the airports beyond it, and onward to cities around the world.
              </p>
            </div>
            <MapFacade
              lat={site.geo.lat}
              lon={site.geo.lon}
              label={addressLine}
              directionsHref={directions}
            />
          </Reveal>
        </section>*/}

        {/* FAQ */}
        <section className="wrap py-(--section-y)" aria-labelledby="ct-faq-title">
          <Reveal>
            <SectionHeading
              id="ct-faq-title"
              eyebrow="Good to know"
              title="Before you write"
              size="md"
            />
          </Reveal>
          <Reveal className="mt-8 max-w-215 border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group/faq border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-lg leading-[26px] font-semibold text-ink hover:text-bronze-strong [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <Icon
                    name="plus"
                    className="text-bronze transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-open/faq:rotate-45"
                  />
                </summary>
                <p className="mb-6 max-w-[70ch] text-base leading-[26px] text-ink-muted">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </section>

        {/* Riding today */}
        <CtaBand
          id="ct-today-title"
          title="Riding today?"
          text="For same-day bookings and last-minute changes, call us directly."
        >
          <Button href={lastMinute.href} size="lg" iconLeft="phone" icon={null}>
            {lastMinute.number}
          </Button>
          <Button href="/book" size="lg" variant="secondary">
            Book online
          </Button>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
