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
      { label: "Contact us", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="ow-foot" data-theme="dark" id="contact">
      <div className="ow-foot-in">
        <div className="ow-foot-top">
          <div>
            <Image className="ow-foot-logo" src={logo} alt={site.name} width={200} sizes="200px" />
            <p className="ow-foot-about">
              Chauffeured travel from the United States to the rest of the world. Professional chauffeurs, an immaculate all-black fleet, on time.
            </p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="ow-foot-head">{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="ow-foot-head">Contact</h2>
            <ul className="ow-foot-contact">
              {phones.map((p) => (
                <li key={p.number}>
                  <Icon name="phone" />
                  <span>
                    <a href={p.href}>{p.number}</a>
                    <span className="ow-foot-note">{p.label}</span>
                  </span>
                </li>
              ))}
              <li><Icon name="mail" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Icon name="map-pin" /><address className="ow-foot-address">{addressLine}</address></li>
            </ul>
          </div>
        </div>
        <div className="ow-foot-bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
