"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site, telHref } from "@/lib/site";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { useActiveNav } from "./useActiveNav";

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
    if (willOpen) setTop(document.querySelector(".ow-nav")?.getBoundingClientRect().bottom);
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
        className="ow-nav-toggle"
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
              className="ow-scrim"
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
              className="ow-drawer"
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
              <a className="ow-nav-phone" href={telHref}>
                <Icon name="phone" />
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
