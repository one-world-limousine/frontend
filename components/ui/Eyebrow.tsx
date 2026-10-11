import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase bronze label above a heading, led by a short rule (and trailed by one when centred). */
export function Eyebrow({ center, className, children }: { center?: boolean; className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-sans text-xs leading-4 font-bold tracking-[0.24em] text-bronze-strong uppercase",
        "before:h-px before:w-6 before:flex-none before:bg-bronze",
        center && "after:h-px after:w-6 after:flex-none after:bg-bronze",
        className,
      )}
    >
      {children}
    </p>
  );
}
