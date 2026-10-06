import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

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
  const cls = ["ow-photo", dark && "ow-photo-dark", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {src ? (
        // Imported images carry a tiny blurred preview, shown while the full photo loads.
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} placeholder={typeof src === "string" ? "empty" : "blur"} />
      ) : (
        <>
          <svg className="ow-photo-arc" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-20 250 C 80 300, 260 170, 430 40" />
          </svg>
          <span className="ow-photo-label">{label}</span>
        </>
      )}
      {children}
    </div>
  );
}
