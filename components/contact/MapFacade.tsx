"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Icon } from "../ui/Icon";

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
    <div className="ct-map">
      <AnimatePresence initial={false}>
        {open ? (
          <m.iframe
            key="map"
            className="ct-map-frame"
            src={src}
            title={`Map of ${label}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <m.div key="facade" className="ct-map-facade" exit={{ opacity: 0 }}>
            <svg className="ct-map-art" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-10 170 C 90 150, 140 60, 240 80 S 380 40, 420 20" />
              <path d="M-10 60 C 80 90, 160 200, 260 170 S 380 190, 420 150" />
              <path d="M120 -10 C 140 80, 110 150, 150 230" />
              <path d="M300 -10 C 280 70, 320 140, 290 230" />
            </svg>
            <span className="ct-map-pin" aria-hidden="true"><Icon name="map-pin" /></span>
            <div className="ct-map-actions">
              <button type="button" className="ow-btn ow-btn-dark" onClick={() => setOpen(true)}>
                <Icon name="globe" />
                <span>Show map</span>
              </button>
              <a className="ow-btn ow-btn-secondary" href={directionsHref} target="_blank" rel="noopener noreferrer">
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
