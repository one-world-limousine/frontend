import type { Metadata } from "next";
import { BookingBar } from "@/components/booking/BookingBar";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FleetCard } from "@/components/ui/FleetCard";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { fleet, points, services } from "@/lib/content";
import { images } from "@/lib/images";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Chauffeur services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.text,
      serviceType: "Chauffeur service",
      areaServed: "Worldwide",
      provider: { "@id": `${site.url}/#organization` },
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c") }}
      />
      <NavBar />

      <main id="main">
        {/* Hero + booking bar */}
        <section className="ow-wrap" aria-labelledby="hero-title">
          <div className="hp-hero">
            <div>
              <p className="ow-eyebrow ow-enter-fade">Chauffeur services · Worldwide</p>
              <h1 id="hero-title" className="ow-enter ow-delay-1">
                Arrive composed. Anywhere in the world.
              </h1>
              <p className="ow-sh-lead ow-enter ow-delay-2">
                Professional chauffeurs, an immaculate all-black fleet and service that runs on your schedule, from your front door in the US to the
                curb in London, Dubai or Tokyo.
              </p>
              <div className="ow-row ow-enter-fade ow-delay-3">
                <Button href="/book" size="lg">
                  Book your ride
                </Button>
                <Button href="/#fleet" size="lg" variant="secondary" icon={null}>
                  View the fleet
                </Button>
              </div>
              <dl className="hp-trust ow-enter-fade ow-delay-3">
                <div><dt>10+ years</dt><dd>of chauffeured service</dd></div>
                <div><dt>30 min</dt><dd>last-minute booking</dd></div>
                <div><dt>Daily</dt><dd>vehicle disinfecting</dd></div>
              </dl>
            </div>
            <Photo
              className="hp-hero-photo ow-enter ow-delay-1"
              src={images.hero.src}
              alt={images.hero.alt}
              sizes="(max-width: 900px) 100vw, 620px"
              preload
            />
          </div>
          <div className="hp-book ow-enter-fade ow-delay-2" id="book">
            <BookingBar />
          </div>
        </section>

        {/* Services */}
        <section className="hp-sec" id="services" aria-labelledby="services-title">
          <div className="ow-wrap">
            <Reveal className="hp-head">
              <SectionHeading id="services-title" eyebrow="Our services" title="Chauffeured, on your schedule" />
              <Button variant="link" href="/book">
                Book a service
              </Button>
            </Reveal>
            <RevealGroup className="hp-grid4">
              {services.map((s) => (
                <RevealItem key={s.number}>
                  <ServiceCard number={s.number} title={s.title} tagline={s.tagline} image={s.image} href={`/book?mode=${s.mode}`}>
                    {s.text}
                  </ServiceCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Why One World */}
        <section className="hp-sec hp-alt" id="why" aria-labelledby="why-title">
          <div className="ow-wrap hp-why">
            <Reveal>
              <Photo className="hp-why-photo" src={images.cabin.src} alt={images.cabin.alt} sizes="(max-width: 900px) 100vw, 600px" />
            </Reveal>
            <div>
              <Reveal>
                <SectionHeading id="why-title" eyebrow="Why One World" title="Professional. Reliable. Luxury-focused." size="md" />
              </Reveal>
              <RevealGroup className="hp-points">
                {points.map((p) => (
                  <RevealItem key={p.title} className="hp-point">
                    <Icon name={p.icon} />
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section className="hp-sec" id="fleet" aria-labelledby="fleet-title">
          <div className="ow-wrap">
            <Reveal className="hp-head">
              <SectionHeading id="fleet-title" eyebrow="The fleet" title="Choose your vehicle" />
              <Button variant="link" href="/book">
                Reserve a vehicle
              </Button>
            </Reveal>
            <RevealGroup className="hp-grid3">
              {fleet.map((f) => (
                <RevealItem key={f.id}>
                  <FleetCard
                    vehicleClass={f.vehicleClass}
                    name={f.name}
                    passengers={f.passengers}
                    luggage={f.luggage}
                    price={f.price}
                    badge={"badge" in f ? f.badge : undefined}
                    image={f.image}
                    href={`/book?vehicle=${f.id}`}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="ow-wrap hp-cta-wrap" aria-labelledby="cta-title">
          <Reveal>
            <div className="hp-cta" data-theme="dark">
              <div>
                <h2 id="cta-title">Wherever you land, your car is waiting.</h2>
                <p>For questions, quotes or custom travel packages, we&rsquo;re here to help. We reply within 24 hours.</p>
              </div>
              <div className="ow-row">
                <Button href="/book" size="lg">
                  Book your ride
                </Button>
                <Button href={telHref} size="lg" variant="secondary" iconLeft="phone" icon={null}>
                  Call us
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
