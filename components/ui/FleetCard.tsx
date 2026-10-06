import type { SiteImage } from "@/lib/images";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

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

export function FleetCard({ vehicleClass, name, passengers, luggage, extra, price, badge, image, href = "/book", ctaLabel = "Reserve" }: FleetCardProps) {
  return (
    <article className="ow-fleet">
      <Photo src={image?.src} alt={image?.alt ?? name} label="Vehicle photo" sizes="(max-width: 900px) 100vw, (max-width: 1100px) 50vw, 400px">
        {badge && <Badge tone="dark">{badge}</Badge>}
      </Photo>
      <div className="ow-fleet-body">
        <div>
          {vehicleClass && <p className="ow-fleet-class">{vehicleClass}</p>}
          <h3 className="ow-fleet-name">{name}</h3>
        </div>
        <ul className="ow-fleet-specs">
          <li><Icon name="users" />Up to {passengers}</li>
          {luggage != null && <li><Icon name="luggage" />{luggage} bags</li>}
          {extra && <li><Icon name="shield-check" />{extra}</li>}
        </ul>
        <div className="ow-fleet-foot">
          {price ? (
            <span className="ow-fleet-price">From<strong>{price}</strong></span>
          ) : (
            <span className="ow-fleet-price">Pricing<strong>On request</strong></span>
          )}
          <Button variant="dark" href={href} aria-label={`${ctaLabel} the ${name}`}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
