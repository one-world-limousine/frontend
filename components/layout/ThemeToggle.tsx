"use client";

import { useEffect, type MouseEvent } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { Icon } from "../ui/Icon";

const current = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

function swap(theme: Theme) {
  const root = document.documentElement;
  // Suppress every transition so the whole page swaps at once.
  root.classList.add("ow-theme-switching");
  root.setAttribute("data-theme", theme);
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("ow-theme-switching")));
}

/**
 * Switches theme. Given an origin point, the new theme is revealed as a circle growing from it
 * (View Transitions API); browsers without it, and reduced-motion visitors, get an instant swap.
 */
function apply(theme: Theme, origin?: { x: number; y: number }) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!origin || reduce || typeof document.startViewTransition !== "function") return swap(theme);

  const root = document.documentElement;
  const { x, y } = origin;
  // Radius that reaches the farthest corner of the viewport from the origin.
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  root.classList.add("ow-theme-switching");
  const transition = document.startViewTransition(() => root.setAttribute("data-theme", theme));
  transition.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      ),
    )
    .catch(() => {});
  transition.finished.finally(() => root.classList.remove("ow-theme-switching"));
}

/** Light/dark switch. Both icons are rendered and CSS shows the right one, so the server HTML always matches. */
export function ThemeToggle() {
  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {}
      apply(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    // Grow from the button's centre (also correct for keyboard presses, where the click has no pointer position).
    const r = e.currentTarget.getBoundingClientRect();
    apply(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button type="button" className="ow-theme-toggle" onClick={toggle} aria-label="Switch between light and dark theme">
      <Icon name="moon" className="ow-theme-moon" />
      <Icon name="sun" className="ow-theme-sun" />
    </button>
  );
}
