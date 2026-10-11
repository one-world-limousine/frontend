"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { buttonClass } from "../ui/Button";
import { Icon } from "../ui/Icon";

// Stylised roads drawn behind the pin until the real map is loaded.
const ROADS = [
  "M-10 170 C 90 150, 140 60, 240 80 S 380 40, 420 20",
  "M-10 60 C 80 90, 160 200, 260 170 S 380 190, 420 150",
  "M120 -10 C 140 80, 110 150, 150 230",
  "M300 -10 C 280 70, 320 140, 290 230",
];

type MapFacadeProps = { lat: number; lon: number; label: string; directionsHref: string };

/**
 * The office map. A map embed costs hundreds of KB and third-party requests, so it only loads when
 * asked for; until then this shows a styled panel with the address and a directions link.
 */
export function MapFacade({ lat, lon, label, directionsHref }: MapFacadeProps) {
  const [open, setOpen] = useState(false);
  const d = 0.012;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d * 1.6}%2C${lat - d}%2C${lon + d * 1.6}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-line bg-surface-alt lg:aspect-16/10">
      <AnimatePresence initial={false}>
        {open ? (
          <m.iframe
            key="map"
            className="absolute inset-0 size-full border-0"
            src={src}
            title={`Map of ${label}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <m.div key="facade" className="absolute inset-0 flex flex-col items-center justify-center gap-6" exit={{ opacity: 0 }}>
            <svg
              className="absolute inset-0 size-full fill-none stroke-bronze opacity-45"
              viewBox="0 0 400 220"
              preserveAspectRatio="xMidYMid slice"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              {ROADS.map((d) => (
                <path key={d} d={d} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            <span
              className="relative grid size-16 place-items-center rounded-full bg-surface-raised text-bronze-strong shadow-float"
              aria-hidden="true"
            >
              <Icon name="map-pin" size={28} />
            </span>
            <div className="relative flex flex-wrap justify-center gap-3">
              <button type="button" className={buttonClass({ variant: "dark" })} onClick={() => setOpen(true)}>
                <Icon name="globe" />
                <span>Show map</span>
              </button>
              <a className={cn(buttonClass({ variant: "secondary" }), "bg-surface-raised")} href={directionsHref} target="_blank" rel="noopener noreferrer">
                <span>Get directions</span>
                <Icon name="arrow-up-right" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
