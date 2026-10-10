import Image from "next/image";
import Link from "next/link";
import { site, telHref } from "@/lib/site";
import logo from "@/public/brand/emblem-logo-gold-dark-bg.png";
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
      {/* Always a charcoal band, whatever the page theme, so the gold mark stands out. */}
      <header className="ow-nav" data-theme="dark">
        <div className="ow-nav-in">
          <Link
            href="/"
            className="ow-nav-home"
            aria-label={`${site.name}, home`}
          >
            {/* Eager: above the fold on every page. */}
            <Image
              className="ow-nav-logo"
              src={logo}
              alt={site.name}
              height={80}
              loading="eager"
              fetchPriority="high"
            />
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
