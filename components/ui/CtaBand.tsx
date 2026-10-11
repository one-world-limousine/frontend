import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type CtaBandProps = { id: string; title: ReactNode; text: ReactNode; className?: string; children: ReactNode };

/** Closing charcoal band: a heading and line of copy beside a row of buttons. */
export function CtaBand({ id, title, text, className, children }: CtaBandProps) {
  return (
    <section className={cn("wrap pb-(--section-y)", className)} aria-labelledby={id}>
      <Reveal>
        {/* On the dark site a charcoal band would melt into the page, so it gets its own ground. */}
        <div
          data-theme="dark"
          className="flex flex-col items-start justify-between gap-8 rounded-xl bg-surface px-8 py-12 site-dark:bg-surface-alt lg:flex-row lg:items-center lg:p-16"
        >
          <div>
            <h2 id={id} className="mb-3 font-display text-[30px] leading-9 text-ink md:text-[40px] md:leading-[46px]">
              {title}
            </h2>
            <p className="text-[17px] text-ink-muted">{text}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">{children}</div>
        </div>
      </Reveal>
    </section>
  );
}
