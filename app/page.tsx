import type { Metadata } from "next";
import Image from "next/image";
import { BookingBar } from "@/components/booking/BookingBar";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FleetCard } from "@/components/ui/FleetCard";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { leadClass, SectionHeading } from "@/components/ui/SectionHeading";
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <NavBar />

      <main id="main">
        {/* Hero: full-bleed photo at least one screen tall below the nav (it grows when the copy needs more
            room, e.g. short laptop screens), copy on a black gradient. The bottom padding leaves room
            for the booking card, which overlaps the hero by 40px. */}
        <section
          aria-labelledby="hero-title"
          data-theme="dark"
          className="relative isolate flex min-h-[calc(100svh-var(--nav-height))] items-center overflow-hidden bg-charcoal-deep pt-16 pb-24 md:pt-20 md:pb-32"
        >
          <Image
            src={images.heroWide.src}
            alt={images.heroWide.alt}
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="-z-20 object-cover object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-black/90 via-black/65 to-black/0 max-md:from-black/85 max-md:via-black/70 max-md:to-black/40"
          />
          <div className="wrap">
            <div className="flex max-w-xl flex-col items-start gap-5 md:gap-6">
              <Eyebrow className="enter-fade">
                Chauffeur services · Worldwide
              </Eyebrow>
              <h1
                id="hero-title"
                className="enter-rise enter-delay-80 font-display text-[34px] leading-9.5 font-normal tracking-[-0.01em] text-ink md:text-[56px] md:leading-15"
              >
                Arrive in style. Anywhere in the world.
              </h1>
              <p className={`${leadClass} enter-rise enter-delay-160`}>
                Professional chauffeurs, an immaculate all-black fleet and
                service that runs on your schedule, from your front door in the
                US to the curb in London, Dubai or Tokyo.
              </p>
              <div className="enter-fade enter-delay-240 mt-2 flex flex-wrap items-center gap-3">
                <Button href="/book" size="lg">
                  Book your ride
                </Button>
                <Button
                  href="/#fleet"
                  size="lg"
                  variant="secondary"
                  icon={null}
                >
                  View the fleet
                </Button>
              </div>
              <dl className="enter-fade enter-delay-240 mt-4 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 pt-6 text-sm leading-5 text-ink-muted">
                <div>
                  <dt className="font-display text-[22px] leading-7 text-ink">
                    10+ years
                  </dt>
                  <dd>of chauffeured service</dd>
                </div>
                <div>
                  <dt className="font-display text-[22px] leading-7 text-ink">
                    30 min
                  </dt>
                  <dd>last-minute booking</dd>
                </div>
                <div>
                  <dt className="font-display text-[22px] leading-7 text-ink">
                    Daily
                  </dt>
                  <dd>vehicle disinfecting</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Booking bar, overlapping the bottom of the hero */}
        <div className="relative z-10 -mt-10 scroll-mt-28" id="book">
          <div className="wrap enter-fade enter-delay-160">
            <BookingBar />
          </div>
        </div>

        {/* Services */}
        <section
          className="py-(--section-y)"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="wrap">
            <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                id="services-title"
                eyebrow="Our services"
                title="Chauffeured, on your schedule"
              />
              <Button variant="link" href="/book">
                Book a service
              </Button>
            </Reveal>
            <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <RevealItem key={i}>
                  <ServiceCard
                    title={s.title}
                    tagline={s.tagline}
                    image={s.image}
                    href={`/book?mode=${s.mode}`}
                  >
                    {s.text}
                  </ServiceCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Why One World: fills one screen on desktop */}
        <section
          id="why"
          aria-labelledby="why-title"
          className="flex items-center bg-surface-alt py-12 md:py-16 lg:min-h-[calc(100svh-var(--nav-height))]"
        >
          <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <Photo
                className="aspect-4/3 rounded-xl lg:aspect-auto lg:h-[min(calc(100svh-var(--nav-height)-8rem),720px)]"
                src={images.cabin.src}
                alt={images.cabin.alt}
                sizes="(max-width: 1024px) 100vw, 700px"
              />
            </Reveal>
            <div>
              <Reveal>
                <SectionHeading
                  id="why-title"
                  eyebrow="Why One World"
                  title="Professional. Reliable. Luxury-focused."
                  size="md"
                />
              </Reveal>
              <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2">
                {points.map((p) => (
                  <RevealItem key={p.title} className="flex gap-3">
                    <Icon name={p.icon} size={26} className="text-bronze" />
                    <div>
                      <h3 className="text-base leading-6 font-semibold text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-[15px] leading-6 text-ink-muted">
                        {p.text}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section
          className="py-(--section-y)"
          id="fleet"
          aria-labelledby="fleet-title"
        >
          <div className="wrap">
            <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                id="fleet-title"
                eyebrow="The fleet"
                title="Choose your vehicle"
              />
              <Button variant="link" href="/book">
                Reserve a vehicle
              </Button>
            </Reveal>
            <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <CtaBand
          id="cta-title"
          title="Wherever you land, your car is waiting."
          text={
            <>
              For questions, quotes or custom travel packages, we&rsquo;re here
              to help. We reply within 24 hours.
            </>
          }
        >
          <Button href="/book" size="lg">
            Book your ride
          </Button>
          <Button
            href={telHref}
            size="lg"
            variant="secondary"
            iconLeft="phone"
            icon={null}
          >
            Call us
          </Button>
        </CtaBand>
      </main>

      <Footer />
    </>
  );
}
