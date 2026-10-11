"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site, telHref } from "@/lib/site";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { phoneLinkClass } from "./navStyles";
import { useActiveNav } from "./useActiveNav";

// The selected page is marked with a short bronze rule before its name.
const drawerLinkClass =
  "block border-b border-line py-4 text-lg leading-[26px] font-medium text-ink no-underline " +
  "aria-[current]:font-semibold aria-[current]:text-bronze-strong aria-[current]:before:mr-3 aria-[current]:before:inline-block aria-[current]:before:h-0.5 aria-[current]:before:w-4 aria-[current]:before:rounded-[2px] aria-[current]:before:bg-bronze aria-[current]:before:align-middle";

export function MobileMenu() {
  const pathname = usePathname();
  const { active, select, onHome } = useActiveNav();
  // Remember which path the menu was opened on, so navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  // The drawer hangs from the header's bottom edge, which moves when the announcement bar is showing.
  const [top, setTop] = useState<number>();
  const setOpen = (next: boolean | ((v: boolean) => boolean)) => {
    const willOpen = typeof next === "function" ? next(open) : next;
    if (willOpen) setTop(document.querySelector("[data-site-header]")?.getBoundingClientRect().bottom);
    setOpenOn(willOpen ? pathname : null);
  };

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-transparent text-ink lg:hidden"
        aria-expanded={open}
        aria-controls="ow-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="scrim"
              className="fixed inset-x-0 top-(--nav-height) bottom-0 z-48 bg-[rgba(19,20,23,0.5)]"
              style={{ top }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <m.nav
              key="drawer"
              id="ow-mobile-menu"
              aria-label="Mobile"
              className="fixed inset-x-0 top-(--nav-height) z-49 border-b border-line bg-charcoal-deep px-(--gutter) pt-4 pb-8 shadow-float"
              style={{ top }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ul>
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={drawerLinkClass}
                      aria-current={l.label === active ? (onHome && l.label !== "Home" ? "location" : "page") : undefined}
                      onClick={() => {
                        select(l.label);
                        setOpen(false);
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a className={`${phoneLinkClass} my-6`} href={telHref}>
                <Icon name="phone" className="text-bronze" />
                {site.phone}
              </a>
              <Button href="/book" size="lg" block>
                Book a ride
              </Button>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
