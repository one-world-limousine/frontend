"use client";

import { AnimatePresence, m } from "framer-motion";
import { estimateFare, isLateNight, pricing, type FareClass } from "@/lib/pricing";
import { phones } from "@/lib/site";
import { Icon } from "../ui/Icon";
import type { RouteState } from "./useTripEstimate";

type TripEstimateProps = { route: RouteState; fareClass?: FareClass; time?: string; hourly?: boolean };

/** "Estimated trip" panel: route distance and time, and the fare from lib/pricing.ts. */
export function TripEstimate({ route, fareClass, time, hourly }: TripEstimateProps) {
  const fare = route.status === "ready" && fareClass && !hourly ? estimateFare(fareClass, route.miles, time) : null;

  return (
    <AnimatePresence initial={false}>
      {route.status !== "idle" && (
        <m.div
          className="bk-estimate"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bk-estimate-in" data-theme="dark">
            <p className="bk-estimate-eyebrow">Estimated trip</p>
            {route.status === "loading" && <p className="bk-estimate-route">Calculating your route…</p>}
            {route.status === "error" && (
              <p className="bk-estimate-route">We could not map this route. Your agent will confirm distance and fare.</p>
            )}
            {route.status === "ready" && (
              <>
                <p className="bk-estimate-route">
                  <span><Icon name="route" />{route.miles} miles</span>
                  <span><Icon name="clock" />{route.minutes} min</span>
                </p>
                <div className="bk-estimate-fare">
                  {hourly ? (
                    <span>Hourly fares are confirmed by email.</span>
                  ) : fare?.kind === "price" ? (
                    <>
                      <span>Estimated fare</span>
                      <strong>${fare.amount}</strong>
                    </>
                  ) : fare?.kind === "call" ? (
                    <>
                      <span>Estimated fare</span>
                      <strong>
                        Call for pricing · <a href={phones[0].href}>{phones[0].number}</a>
                      </strong>
                    </>
                  ) : null}
                </div>
                {fare?.kind === "price" && isLateNight(time) && (
                  <p className="bk-estimate-note">Includes the ${pricing.lateNight.fee} late-night pick-up fee (11:00 PM to 5:30 AM).</p>
                )}
              </>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
