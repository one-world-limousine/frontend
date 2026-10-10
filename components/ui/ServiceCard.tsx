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

export function ServiceCard({ title, tagline, image, href = "/book", linkLabel = "Book this service", children }: ServiceCardProps) {
  return (
    <article className="ow-svc">
      <Photo src={image?.src} alt={image?.alt} label={`Photo · ${title.toLowerCase()}`} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 300px" />
      <div className="ow-svc-body">
        <h3 className="ow-svc-title">{title}</h3>
        {tagline && <p className="ow-svc-tag">{tagline}</p>}
        <p className="ow-svc-text">{children}</p>
        <Button variant="link" href={href} aria-label={`${linkLabel}: ${title}`}>
          {linkLabel}
        </Button>
      </div>
    </article>
  );
}
