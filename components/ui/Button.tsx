import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Common = {
  variant?: "primary" | "dark" | "secondary" | "link";
  size?: "md" | "lg";
  /** Trailing icon; `null` removes the default arrow on link buttons. */
  icon?: IconName | null;
  iconLeft?: IconName;
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common &
  ({ href: string; "aria-label"?: string } | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>));

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconLeft, block, className, children } = props;
  const trailing = icon === undefined ? (variant === "link" ? "arrow-right" : null) : icon;
  const cls = ["ow-btn", `ow-btn-${variant}`, size === "lg" && "ow-btn-lg", block && "ow-btn-block", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {trailing && <Icon name={trailing} />}
    </>
  );

  if (props.href !== undefined) {
    const { href } = props;
    // Phone, mail and external links are plain anchors; site routes use client-side navigation.
    if (/^(tel:|mailto:|https?:)/.test(href)) {
      return <a className={cls} href={href} aria-label={props["aria-label"]}>{content}</a>;
    }
    return <Link className={cls} href={href} aria-label={props["aria-label"]}>{content}</Link>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, icon: _i, iconLeft: _l, block: _b, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button type="button" {...rest} className={cls}>
      {content}
    </button>
  );
}
