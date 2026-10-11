import type { SiteImage } from "@/lib/images";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { cardClass } from "./ServiceCard";

type FleetCardProps = {
  vehicleClass?: string;
  name: string;
  passengers: number;
  luggage?: number;
  extra?: string;
  price?: string;
  badge?: string;
  image?: SiteImage;
  href?: string;
  ctaLabel?: string;
};

const spec = "inline-flex items-center gap-2 text-sm leading-5 font-medium text-ink-muted";
const specIcon = "text-bronze";

export function FleetCard({ vehicleClass, name, passengers, luggage, extra, price, badge, image, href = "/book", ctaLabel = "Reserve" }: FleetCardProps) {
  return (
    <article className={cardClass}>
      <Photo
        className="aspect-16/10"
        src={image?.src}
        alt={image?.alt ?? name}
        label="Vehicle photo"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 460px"
      >
        {badge && (
          <Badge tone="dark" className="absolute top-4 left-4">
            {badge}
          </Badge>
        )}
      </Photo>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          {vehicleClass && (
            <p className="mb-1 text-xs leading-4 font-bold tracking-[0.16em] text-ink-muted uppercase">{vehicleClass}</p>
          )}
          <h3 className="font-display text-[28px] leading-[34px] font-normal text-ink">{name}</h3>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 border-y border-line py-4">
          <li className={spec}><Icon name="users" size={18} className={specIcon} />Up to {passengers}</li>
          {luggage != null && <li className={spec}><Icon name="luggage" size={18} className={specIcon} />{luggage} bags</li>}
          {extra && <li className={spec}><Icon name="shield-check" size={18} className={specIcon} />{extra}</li>}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="text-sm leading-5 text-ink-muted">
            {price ? "From" : "Pricing"}
            <strong className="block text-[22px] leading-7 font-bold text-ink">{price ?? "On request"}</strong>
          </span>
          <Button variant="dark" href={href} aria-label={`${ctaLabel} the ${name}`}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
