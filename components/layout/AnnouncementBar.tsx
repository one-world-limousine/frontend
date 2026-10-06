"use client";

import { Alert } from "antd";
import Link from "next/link";
import { useState } from "react";
import { announcements } from "@/lib/content";
import { ANNOUNCE_STORAGE_KEY, ANNOUNCE_VERSION } from "@/lib/theme";
import { Icon } from "../ui/Icon";

function Items({ hidden }: { hidden?: boolean }) {
  return (
    // The second copy only exists to make the loop seamless, so screen readers and Tab skip it.
    <ul className="ow-announce-items" aria-hidden={hidden || undefined}>
      {announcements.map((a) => (
        <li key={a.text}>
          <Icon name={a.icon} />
          {a.href ? (
            a.href.startsWith("/") ? (
              <Link href={a.href} tabIndex={hidden ? -1 : undefined}>{a.text}</Link>
            ) : (
              <a href={a.href} tabIndex={hidden ? -1 : undefined}>{a.text}</a>
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
export function AnnouncementBar() {
  const [paused, setPaused] = useState(false);

  const dismiss = () => {
    try {
      localStorage.setItem(ANNOUNCE_STORAGE_KEY, ANNOUNCE_VERSION);
    } catch {}
  };

  return (
    <div className="ow-announce" data-theme="dark" role="region" aria-label="Announcements">
      <Alert
        banner
        showIcon={false}
        className="ow-announce-alert"
        title={
          <div className={paused ? "ow-marquee is-paused" : "ow-marquee"}>
            <div className="ow-marquee-track">
              <Items />
              <Items hidden />
            </div>
          </div>
        }
        action={
          <button
            type="button"
            className="ow-announce-btn"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play announcements" : "Pause announcements"}
            aria-pressed={paused}
          >
            <Icon name={paused ? "play" : "pause"} />
          </button>
        }
        closable={{
          closeIcon: <Icon name="close" />,
          "aria-label": "Dismiss announcements",
          onClose: dismiss,
        }}
      />
    </div>
  );
}
