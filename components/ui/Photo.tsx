import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PhotoProps = {
  src?: string | StaticImageData;
  alt?: string;
  /** Placeholder caption describing the photo that belongs here. */
  label?: string;
  dark?: boolean;
  className?: string;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  /** Set on the above-the-fold hero image only. */
  preload?: boolean;
  children?: ReactNode;
};

// Rounded image frame. Without `src` it draws the bronze swoosh from the logo with a caption.
export function Photo({ src, alt = "", label = "Photo", dark, className, sizes = "100vw", preload, children }: PhotoProps) {
  return (
    <div className={cn("relative flex items-end overflow-hidden bg-surface-alt", dark && "bg-charcoal", className)}>
      {src ? (
        // Imported images carry a tiny blurred preview, shown while the full photo loads.
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={typeof src === "string" ? "empty" : "blur"}
          className="object-cover"
        />
      ) : (
        <>
          <svg className="absolute inset-0 size-full" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M-20 250 C 80 300, 260 170, 430 40"
              fill="none"
              className="stroke-bronze opacity-55"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className={cn(
              "relative m-4 text-xs leading-4 font-semibold tracking-[0.08em] text-ink-muted uppercase",
              dark && "text-on-charcoal opacity-80",
            )}
          >
            {label}
          </span>
        </>
      )}
      {children}
    </div>
  );
}
