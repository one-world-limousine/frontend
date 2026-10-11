import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Tone = "bronze" | "neutral" | "success" | "dark";
type BadgeProps = { tone?: Tone; icon?: IconName; className?: string; children: ReactNode };

const tones: Record<Tone, string> = {
  bronze: "bg-bronze-tint text-bronze-strong",
  neutral: "bg-surface-alt text-ink-muted",
  success: "bg-surface-alt text-success",
  dark: "bg-charcoal text-on-charcoal",
};

export function Badge({ tone = "bronze", icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2.5 py-1.5 text-xs leading-4 font-bold tracking-[0.06em]",
        tones[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}
