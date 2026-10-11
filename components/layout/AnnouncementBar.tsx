"use client";

import { Alert } from "antd";
import Link from "next/link";
import { useState } from "react";
import { announcements } from "@/lib/content";
import { ANNOUNCE_STORAGE_KEY, ANNOUNCE_VERSION } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";

const linkClass =
  "border-b border-transparent text-ink no-underline transition-colors duration-180 hover:border-bronze hover:text-bronze-strong";

function Items({ hidden }: { hidden?: boolean }) {
  return (
    // The second copy only exists to make the loop seamless, so screen readers and Tab skip it.
    // Reduced motion: no scrolling, so the copy is not needed at all.
    <ul className={hidden ? "flex motion-reduce:hidden" : "flex"} aria-hidden={hidden || undefined}>
      {announcements.map((a) => (
        <li
          key={a.text}
          className="inline-flex items-center gap-2 py-[11px] font-medium tracking-[0.01em] whitespace-nowrap after:mx-8 after:size-1 after:rounded-full after:bg-bronze after:opacity-70"
        >
          <Icon name={a.icon} size={15} className="text-bronze" />
          {a.href ? (
            a.href.startsWith("/") ? (
              <Link href={a.href} className={linkClass} tabIndex={hidden ? -1 : undefined}>{a.text}</Link>
            ) : (
              <a href={a.href} className={linkClass} tabIndex={hidden ? -1 : undefined}>{a.text}</a>
            )
          ) : (
            <span>{a.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Scrolling announcement strip above the header (antd Alert in banner mode, themed charcoal and bronze).
 * It pauses on hover and focus, has a pause button (moving content must be stoppable), stays still for
 * reduced-motion visitors, and remembers being dismissed.
 */
// Matches antd's close button (styled in globals.css); hidden for reduced motion, where nothing moves.
const controlClass =
  "inline-grid size-7 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-ink-muted transition-colors duration-180 hover:bg-hover hover:text-bronze motion-reduce:hidden";

export function AnnouncementBar() {
  const [paused, setPaused] = useState(false);

  const dismiss = () => {
    try {
      localStorage.setItem(ANNOUNCE_STORAGE_KEY, ANNOUNCE_VERSION);
    } catch {}
  };

  return (
    <div
      className="border-b border-line bg-charcoal-deep text-ink site-dark:bg-surface-alt in-data-[announce=off]:hidden"
      data-theme="dark"
      role="region"
      aria-label="Announcements"
    >
      <Alert
        banner
        showIcon={false}
        className="ow-announce-alert"
        title={
          // The track holds the list twice and slides by one copy, so the loop has no visible seam.
          // Reduced motion: it stays still and can be swiped sideways instead.
          <div className="group/marquee overflow-hidden mask-[linear-gradient(90deg,transparent,#000_32px,#000_calc(100%-32px),transparent)] motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]">
            <div
              className={cn(
                "flex w-max animate-marquee group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none",
                paused && "[animation-play-state:paused]",
              )}
            >
              <Items />
              <Items hidden />
            </div>
          </div>
        }
        action={
          <button
            type="button"
            className={controlClass}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play announcements" : "Pause announcements"}
            aria-pressed={paused}
          >
            <Icon name={paused ? "play" : "pause"} size={16} />
          </button>
        }
        closable={{
          closeIcon: <Icon name="close" size={16} />,
          "aria-label": "Dismiss announcements",
          onClose: dismiss,
        }}
      />
    </div>
  );
}
