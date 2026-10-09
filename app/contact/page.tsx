import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapFacade } from "@/components/contact/MapFacade";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addressLine, phones, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Call, text or email ${site.name} in St. Charles, MO. Reservations ${phones[0].number}, last-minute bookings ${phones[2].number}. We reply within ${site.replyTime}.`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c") }} />
      <NavBar />
      <main id="main" className="bk-page">
        <div className="ow-wrap">
          <SectionHeading
            as="h1"
            eyebrow="Contact us"
            title="Talk to our reservations team"
            lead={`Questions, quotes or a ride later this week: send us a note and we reply within ${site.replyTime}. Riding today? Call ${lastMinute.number} and we will attend to you promptly.`}
          />

          <div className="bk-grid">
            <ContactForm />

            <aside className="bk-aside ct-aside" aria-label="Other ways to reach us">
              <div className="bk-card">
                <h2>Call us</h2>
                <ul className="bk-list">
                  {phones.map((p) => (
                    <li key={p.number}>
                      <Icon name="phone" />
                      <span>
                        <a className="ct-link" href={p.href}>{p.number}</a>
                        <small>{p.label}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bk-card">
                <h2>Write to us</h2>
                <ul className="bk-list">
                  <li>
                    <Icon name="mail" />
                    <span>
                      <a className="ct-link" href={`mailto:${site.email}`}>{site.email}</a>
                      <small>Replies within {site.replyTime}</small>
                    </span>
                  </li>
                  <li>
                    <Icon name="phone" />
                    <span>
                      <a className="ct-link" href={sms}>Send a text message</a>
                      <small>{site.smsPhone}</small>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* Office + map */}
        <section className="ow-wrap ct-office" aria-labelledby="ct-office-title">
          <Reveal className="ct-office-grid">
            <div className="ct-office-copy">
              <SectionHeading id="ct-office-title" eyebrow="Our base" title="St. Charles, Missouri" size="md" />
              <address className="ct-address">
                <Icon name="map-pin" />
                <span>{addressLine}</span>
              </address>
              <p className="ow-sh-lead">
                Chauffeured rides across Greater St. Louis, to and from STL and the airports beyond it, and onward to cities around the world.
              </p>
            </div>
            <MapFacade lat={site.geo.lat} lon={site.geo.lon} label={addressLine} directionsHref={directions} />
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="ow-wrap ct-faq" aria-labelledby="ct-faq-title">
          <Reveal>
            <SectionHeading id="ct-faq-title" eyebrow="Good to know" title="Before you write" size="md" />
          </Reveal>
          <Reveal className="ct-faq-list">
            {faqs.map((f) => (
              <details key={f.q} className="ct-faq-item">
                <summary>
                  <span>{f.q}</span>
                  <Icon name="plus" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
        </section>

        {/* Riding today */}
        <section className="ow-wrap hp-cta-wrap" aria-labelledby="ct-today-title">
          <Reveal>
            <div className="hp-cta" data-theme="dark">
              <div>
                <h2 id="ct-today-title">Riding today?</h2>
                <p>For same-day bookings and last-minute changes, call us directly.</p>
              </div>
              <div className="ow-row">
                <Button href={lastMinute.href} size="lg" iconLeft="phone" icon={null}>
                  {lastMinute.number}
                </Button>
                <Button href="/book" size="lg" variant="secondary">
                  Book online
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
