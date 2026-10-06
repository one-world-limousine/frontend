"use client";

import { m } from "framer-motion";
import { useId, useRef, type KeyboardEvent } from "react";
import { bookingModes, type BookingMode } from "@/lib/content";
import { Icon } from "../ui/Icon";

type ModeTabsProps = { value: BookingMode; onChange: (mode: BookingMode) => void; label?: string };

/** Pill tabs for the ride mode; the white pill slides between tabs. Arrow keys move between tabs. */
export function ModeTabs({ value, onChange, label = "Ride type" }: ModeTabsProps) {
  const layoutId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + bookingModes.length) % bookingModes.length;
    onChange(bookingModes[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className="ow-book-tabs" role="tablist" aria-label={label}>
      {bookingModes.map((mode, i) => {
        const selected = mode.id === value;
        return (
          <button
            key={mode.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            className="ow-book-tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(mode.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {selected && (
              // Shared layoutId: Framer Motion animates this one pill from the old tab to the new one.
              <m.span
                layoutId={layoutId}
                className="ow-book-tab-pill"
                aria-hidden="true"
                transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.9 }}
              />
            )}
            <Icon name={mode.icon} />
            <span className="ow-book-tab-label">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
