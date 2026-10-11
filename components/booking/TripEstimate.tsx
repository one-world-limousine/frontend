"use client";

import { AnimatePresence, m } from "framer-motion";
import { estimateFare, isLateNight, pricing, type FareClass } from "@/lib/pricing";
import { phones } from "@/lib/site";
import { Icon } from "../ui/Icon";
import type { RouteState } from "./useTripEstimate";

type TripEstimateProps = { route: RouteState; fareClass?: FareClass; time?: string; hourly?: boolean };

/** "Estimated trip" panel: route distance and time, and the fare from lib/pricing.ts. */
const routeClass = "flex flex-wrap gap-6 text-base leading-6 font-semibold";
const fareClassName = "text-[22px] leading-7 font-bold text-ink";

export function TripEstimate({ route, fareClass, time, hourly }: TripEstimateProps) {
  const fare = route.status === "ready" && fareClass && !hourly ? estimateFare(fareClass, route.miles, time) : null;

  return (
    <AnimatePresence initial={false}>
      {route.status !== "idle" && (
        <m.div
          className="overflow-hidden"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mt-2 rounded-lg bg-surface px-6 py-4 text-ink site-dark:bg-surface-alt" data-theme="dark">
            <p className="mb-2 text-xs leading-4 font-bold tracking-[0.2em] text-bronze uppercase">Estimated trip</p>
            {route.status === "loading" && <p className={routeClass}>Calculating your route…</p>}
            {route.status === "error" && (
              <p className={routeClass}>We could not map this route. Your agent will confirm distance and fare.</p>
            )}
            {route.status === "ready" && (
              <>
                <p className={routeClass}>
                  <span className="inline-flex items-center gap-2"><Icon name="route" size={18} className="text-bronze" />{route.miles} miles</span>
                  <span className="inline-flex items-center gap-2"><Icon name="clock" size={18} className="text-bronze" />{route.minutes} min</span>
                </p>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-line pt-3 text-sm text-ink-muted">
                  {hourly ? (
                    <span>Hourly fares are confirmed by email.</span>
                  ) : fare?.kind === "price" ? (
                    <>
                      <span>Estimated fare</span>
                      <strong className={fareClassName}>${fare.amount}</strong>
                    </>
                  ) : fare?.kind === "call" ? (
                    <>
                      <span>Estimated fare</span>
                      <strong className={fareClassName}>
                        Call for pricing · <a href={phones[0].href} className="text-bronze-strong">{phones[0].number}</a>
                      </strong>
                    </>
                  ) : null}
                </div>
                {fare?.kind === "price" && isLateNight(time) && (
                  <p className="mt-2 text-[13px] leading-[18px] text-ink-muted">Includes the ${pricing.lateNight.fee} late-night pick-up fee (11:00 PM to 5:30 AM).</p>
                )}
              </>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
