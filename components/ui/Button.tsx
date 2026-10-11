import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "dark" | "secondary" | "link";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  /** Trailing icon; `null` removes the default arrow on link buttons. */
  icon?: IconName | null;
  iconLeft?: IconName;
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common &
  ({ href: string; "aria-label"?: string } | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>));

const base =
  "group/btn inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent px-[22px] font-sans text-[15px] leading-5 font-semibold tracking-[0.01em] whitespace-nowrap no-underline transition-[background-color,color,border-color,transform] duration-180 disabled:cursor-not-allowed disabled:opacity-45";

const sizes: Record<Size, string> = {
  md: "",
  lg: "h-(--control-height) px-7 text-base leading-5",
};

const variants: Record<Variant, string> = {
  primary: "bg-bronze-strong text-on-bronze hover:bg-ink hover:text-surface",
  // Charcoal vanishes on charcoal, so inside dark bands (and the dark site) it flips to light-on-dark.
  dark: "bg-charcoal text-on-charcoal hover:bg-bronze-strong hover:text-on-bronze dark:bg-ink dark:text-surface dark:hover:bg-bronze-strong dark:hover:text-on-bronze",
  secondary: "border-line-strong bg-transparent text-ink hover:border-ink",
  link: "h-auto rounded-none bg-transparent p-0 text-bronze-strong hover:text-ink",
};

/** Button classes, for elements that look like a button but are not one of ours (e.g. a plain <a>). */
export function buttonClass({ variant = "primary", size = "md", block }: { variant?: Variant; size?: Size; block?: boolean } = {}) {
  return cn(base, sizes[size], variants[variant], block && "w-full");
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconLeft, block, className, children } = props;
  const trailing = icon === undefined ? (variant === "link" ? "arrow-right" : null) : icon;
  const cls = cn(buttonClass({ variant, size, block }), className);
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {trailing && (
        <Icon
          name={trailing}
          className={variant === "link" ? "transition-transform duration-180 group-hover/btn:translate-x-[3px]" : undefined}
        />
      )}
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
