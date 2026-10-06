"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/site";

type NavLabel = (typeof navLinks)[number]["label"];

// Home-page sections the nav points at, in page order.
const sections = navLinks
  .map((l) => ({ label: l.label, id: l.href.startsWith("/#") ? l.href.slice(2) : null }))
  .filter((s): s is { label: NavLabel; id: string } => s.id !== null);

/**
 * The nav link to show as selected. On the home page it follows clicks immediately and then
 * tracks the section being read as the visitor scrolls; elsewhere it matches the route.
 */
export function useActiveNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [section, setSection] = useState<NavLabel>("Home");
  // While a clicked link's smooth scroll runs, don't let the sections it passes steal the underline.
  const lockUntil = useRef(0);

  useEffect(() => {
    if (!onHome) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let next: NavLabel = "Home";
      if (atBottom) next = sections[sections.length - 1].label;
      else
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) next = s.label;
        }
      setSection(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  const select = (label: NavLabel) => {
    if (!onHome) return;
    lockUntil.current = Date.now() + 1000;
    setSection(label);
  };

  const active: NavLabel | undefined = onHome ? section : navLinks.find((l) => l.href === pathname)?.label;
  return { active, select, onHome };
}
