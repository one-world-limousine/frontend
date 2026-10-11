"use client";

import Link from "next/link";
import { navLinks } from "@/lib/site";
import { useActiveNav } from "./useActiveNav";

// The underline draws in from the left on hover and leaves to the right; it stays under the selected link.
const linkClass =
  "relative inline-block py-1.5 text-sm leading-[26px] font-semibold tracking-[0.12em] whitespace-nowrap text-ink no-underline transition-colors duration-180 " +
  "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-right after:scale-x-0 after:rounded-[2px] after:bg-bronze after:transition-transform after:duration-320 after:ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:text-bronze-strong hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 " +
  "aria-[current]:text-bronze-strong aria-[current]:after:origin-left aria-[current]:after:scale-x-100";

export function NavLinks() {
  const { active, select, onHome } = useActiveNav();
  return (
    <nav aria-label="Primary" className="mx-auto hidden lg:block">
      <ul className="flex gap-4 xl:gap-6">
        {navLinks.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className={linkClass}
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
