"use client";

import Link from "next/link";
import { navLinks } from "@/lib/site";
import { useActiveNav } from "./useActiveNav";

export function NavLinks() {
  const { active, select, onHome } = useActiveNav();
  return (
    <nav aria-label="Primary" className="ow-nav-primary">
      <ul className="ow-nav-links">
        {navLinks.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              aria-current={l.label === active ? (onHome && l.label !== "Home" ? "location" : "page") : undefined}
              onClick={() => select(l.label)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
