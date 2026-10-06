import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type BadgeProps = { tone?: "bronze" | "neutral" | "success" | "dark"; icon?: IconName; children: ReactNode };

export function Badge({ tone = "bronze", icon, children }: BadgeProps) {
  return (
    <span className={tone === "bronze" ? "ow-badge" : `ow-badge ow-badge-${tone}`}>
      {icon && <Icon name={icon} />}
      {children}
    </span>
  );
}
