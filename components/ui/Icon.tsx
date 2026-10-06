import type { CSSProperties, ReactElement } from "react";

// Line icons on a 24px grid, 1.5px round stroke. For anything missing use Lucide at stroke-width 1.5.
const ICONS = {
  "arrow-right": <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  "arrow-up-right": <><path d="M7 17L17 7" /><path d="M8 7h9v9" /></>,
  "map-pin": <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 3v4" /><path d="M16 3v4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M21 20c0-2.6-1.6-4.8-4-5.6" /></>,
  luggage: <><rect x="5" y="7" width="14" height="13" rx="2" /><path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7" /><path d="M9 11v5" /><path d="M15 11v5" /><path d="M8 20v1" /><path d="M16 20v1" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  plane: <><path d="M2 21h20" /><path d="M4.5 16.5L3 13l1.5-.6 2.5 1.3 3-1.5-4-5.2 1.8-.7 6 3.8 4.7-2.3a1.8 1.8 0 0 1 1.6 3.2L6.4 16.8a1.6 1.6 0 0 1-1.9-.3z" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1" /><path d="M14 7h1" /><path d="M9 11h1" /><path d="M14 11h1" /><path d="M9 15h1" /><path d="M14 15h1" /><path d="M10 21v-3h4v3" /></>,
  route: <><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h8a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h8" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" /></>,
  "shield-check": <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  check: <path d="M5 12l5 5 9-10" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16h.01" /></>,
  car: <><path d="M5 17h14" /><path d="M3 17v-3.5L5.5 9A2 2 0 0 1 7.3 8h9.4a2 2 0 0 1 1.8 1l2.5 4.5V17" /><circle cx="7.5" cy="17" r="1.8" /><circle cx="16.5" cy="17" r="1.8" /><path d="M3 13.5h18" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  close: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  pause: <><path d="M9 6v12" /><path d="M15 6v12" /></>,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.9 4.9l1.4 1.4" /><path d="M17.7 17.7l1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M4.9 19.1l1.4-1.4" /><path d="M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
} satisfies Record<string, ReactElement>;

export type IconName = keyof typeof ICONS;

type IconProps = { name: IconName; size?: number; label?: string; className?: string; style?: CSSProperties };

export function Icon({ name, size, label, className, style }: IconProps) {
  return (
    <svg
      className={className ? `ow-icon ${className}` : "ow-icon"}
      viewBox="0 0 24 24"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      style={size ? { width: size, height: size, ...style } : style}
    >
      {ICONS[name]}
    </svg>
  );
}
