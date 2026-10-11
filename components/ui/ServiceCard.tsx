import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/images";
import { Button } from "./Button";
import { Photo } from "./Photo";

type ServiceCardProps = {
  title: string;
  tagline?: string;
  image?: SiteImage;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
};

/** Small uppercase label used on cards (service taglines, blog categories). */
export const cardTagClass = "text-xs leading-4 font-bold tracking-[0.16em] text-bronze-strong uppercase";

/** Raised, bordered card that lifts on hover. */
export const cardClass =
  "flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface-raised transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-card";

export function ServiceCard({ title, tagline, image, href = "/book", linkLabel = "Book this service", children }: ServiceCardProps) {
  return (
    <article className={cardClass}>
      <Photo
        className="aspect-4/3"
        src={image?.src}
        alt={image?.alt}
        label={`Photo · ${title.toLowerCase()}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
      />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="mt-2 text-xl leading-7 font-semibold text-ink">{title}</h3>
        {tagline && <p className={cardTagClass}>{tagline}</p>}
        <p className="flex-1 text-[15px] leading-6 text-ink-muted">{children}</p>
        <Button variant="link" href={href} aria-label={`${linkLabel}: ${title}`} className="mt-3 self-start">
          {linkLabel}
        </Button>
      </div>
    </article>
  );
}
