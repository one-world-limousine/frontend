import Image from "next/image";
import Link from "next/link";
import { addressLine, phones, site } from "@/lib/site";
import logo from "@/public/brand/emblem-logo-gold-dark-bg.png";
import { Icon } from "../ui/Icon";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Airport transfers", href: "/book?mode=airport" },
      { label: "Hourly chauffeur", href: "/book?mode=hourly" },
      { label: "Corporate travel", href: "/book" },
      { label: "Point to point", href: "/book?mode=transfer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our fleet", href: "/#fleet" },
      { label: "Why One World", href: "/#why" },
      { label: "Book a ride", href: "/book" },
      { label: "Blog", href: "/blog" },
      { label: "Drive for us", href: "/drive-for-us" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

const headClass = "mb-4 text-xs leading-4 font-bold tracking-[0.2em] text-bronze uppercase";
const linkClass = "text-[15px] text-ink no-underline transition-colors duration-180 hover:text-bronze-strong";
const contactItem = "flex items-start gap-2 text-[15px] text-ink";
const contactIcon = "mt-[3px] text-bronze";

export function Footer() {
  return (
    // On the dark site the footer sits on the deepest charcoal, set off by a hairline.
    <footer
      className="bg-surface text-ink site-dark:border-t site-dark:border-line site-dark:bg-charcoal-deep"
      data-theme="dark"
      id="contact"
    >
      <div className="wrap pt-16 pb-8">
        <div className="grid grid-cols-1 gap-8 border-b border-line pb-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Image className="mb-4 block h-auto w-50" src={logo} alt={site.name} width={200} sizes="200px" />
            <p className="max-w-[34ch] text-[15px] leading-6 text-ink-muted">
              Chauffeured travel from the United States to the rest of the world. Professional chauffeurs, an immaculate all-black fleet, on time.
            </p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className={headClass}>{c.title}</h2>
              <ul className="flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className={headClass}>Contact</h2>
            <ul className="flex flex-col gap-3">
              {phones.map((p) => (
                <li key={p.number} className={contactItem}>
                  <Icon name="phone" size={18} className={contactIcon} />
                  <span>
                    <a href={p.href} className={linkClass}>{p.number}</a>
                    <span className="block text-[13px] leading-[18px] text-ink-muted">{p.label}</span>
                  </span>
                </li>
              ))}
              <li className={contactItem}>
                <Icon name="mail" size={18} className={contactIcon} />
                <a href={`mailto:${site.email}`} className={linkClass}>{site.email}</a>
              </li>
              <li className={contactItem}>
                <Icon name="map-pin" size={18} className={contactIcon} />
                <address className="max-w-[26ch] text-[15px] leading-6 text-ink not-italic">{addressLine}</address>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 pt-6 text-[13px] text-ink-muted">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
