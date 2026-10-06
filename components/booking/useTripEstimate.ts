"use client";

import { useEffect, useState } from "react";
import { places, type Place, type Route } from "@/lib/places";

export type RouteState = { status: "idle" } | { status: "loading" } | { status: "error" } | ({ status: "ready" } & Route);

/** Driving route through the given points, recalculated (debounced) whenever they change. */
export function useRoute(points: (Place | undefined)[]): RouteState {
  const picked = points.filter((p): p is Place => !!p);
  // Ready to route only when the first and last points (pick-up and drop-off) are both picked.
  const complete = picked.length >= 2 && !!points[0] && !!points[points.length - 1];
  const key = complete ? picked.map((p) => `${p.lat},${p.lon}`).join(";") : "";

  const [state, setState] = useState<{ key: string; route: RouteState }>({ key: "", route: { status: "idle" } });

  useEffect(() => {
    if (!key) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setState({ key, route: { status: "loading" } });
      try {
        const route = await places.route(picked, controller.signal);
        setState({ key, route: route ? { status: "ready", ...route } : { status: "error" } });
      } catch (err) {
        if ((err as Error).name !== "AbortError") setState({ key, route: { status: "error" } });
      }
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // `picked` is derived from `key`; depending on the key avoids refetching on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!key) return { status: "idle" };
  return state.key === key ? state.route : { status: "loading" };
}
