import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site, telHref } from "@/lib/site";
import logo from "@/public/brand/emblem-logo-gold-dark-bg.png";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { phoneLinkClass } from "./navStyles";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  return (
    <>
      {/* Above the sticky header: it scrolls away while the header stays. */}
      <AnnouncementBar />
      {/* Always a charcoal band, whatever the page theme, so the gold mark stands out. */}
      <header
        data-site-header
        data-theme="dark"
        className="sticky top-0 z-50 h-(--nav-height) border-b border-bronze/45 bg-charcoal-deep shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
      >
        <div className="wrap flex h-full items-center gap-6">
          <Link href="/" className="group/home block flex-none" aria-label={`${site.name}, home`}>
            {/* Eager: above the fold on every page. */}
            <Image
              className="block h-(--nav-logo) w-auto transition-transform duration-250 group-hover/home:scale-104"
              src={logo}
              alt={site.name}
              height={80}
              loading="eager"
              fetchPriority="high"
            />
          </Link>
          <NavLinks />
          {/* Below xl the phone number gives way to the links (it stays in the drawer and footer);
              below lg the links and button move into the menu drawer. */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-6">
            <a className={cn(phoneLinkClass, "hidden xl:inline-flex")} href={telHref}>
              <Icon name="phone" className="text-bronze" />
              {site.phone}
            </a>
            <ThemeToggle />
            <Button href="/book" className="hidden lg:inline-flex">
              Book a ride
            </Button>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
