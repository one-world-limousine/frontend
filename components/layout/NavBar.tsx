import Image from "next/image";
import Link from "next/link";
import { site, telHref } from "@/lib/site";
import markDark from "@/public/brand/mark-gold-dark-bg.png";
import markLight from "@/public/brand/mark-bronze-light-bg.png";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  return (
    <>
      {/* Above the sticky header: it scrolls away while the header stays. */}
      <AnnouncementBar />
      <header className="ow-nav">
        <div className="ow-nav-in">
          <Link href="/" className="ow-nav-home" aria-label={`${site.name}, home`}>
            {/* Both marks are tiny; CSS shows the one for the current theme. Eager: above the fold on every page. */}
            <Image className="ow-nav-logo ow-on-light" src={markLight} alt={site.name} height={52} loading="eager" fetchPriority="high" />
            <Image className="ow-nav-logo ow-on-dark" src={markDark} alt="" height={52} loading="eager" />
          </Link>
          <NavLinks />
          <div className="ow-nav-tail">
            <a className="ow-nav-phone" href={telHref}>
              <Icon name="phone" />
              {site.phone}
            </a>
            <ThemeToggle />
            <Button href="/book" className="ow-nav-cta">
              Book a ride
            </Button>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
