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
    <div
      className="relative mb-6 flex w-full max-w-full gap-1 overflow-x-auto rounded-full bg-surface-alt p-1 [scrollbar-width:none] md:inline-flex md:w-auto"
      role="tablist"
      aria-label={label}
    >
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
            className="group/tab relative inline-flex h-[38px] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border-0 bg-transparent px-2 text-[13px] font-semibold whitespace-nowrap text-ink-muted transition-colors duration-200 hover:text-ink aria-selected:text-ink md:flex-none md:gap-2 md:px-[18px] md:text-sm"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(mode.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {selected && (
              // Shared layoutId: Framer Motion animates this one pill from the old tab to the new one.
              <m.span
                layoutId={layoutId}
                className="absolute inset-0 z-0 rounded-full border border-line bg-surface-raised shadow-[0_1px_2px_rgba(43,45,49,0.08),0_4px_12px_rgba(43,45,49,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.3)]"
                aria-hidden="true"
                transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.9 }}
              />
            )}
            {/* Icon and label sit above the sliding pill. */}
            <Icon
              name={mode.icon}
              size={16}
              className="relative z-1 transition-colors duration-200 group-aria-selected/tab:text-bronze-strong"
            />
            <span className="relative z-1">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
