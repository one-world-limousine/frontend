import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
};

/** Section title sizes, shared with headings that are not inside a SectionHeading. */
export const headingSizes = {
  lg: "font-display text-4xl leading-[42px] font-normal tracking-[-0.005em] text-ink lg:text-5xl lg:leading-[54px]",
  md: "font-display text-4xl leading-[42px] font-normal tracking-[-0.005em] text-ink",
};

export const leadClass = "max-w-[60ch] text-lg leading-7 text-ink-muted";

export function SectionHeading({ eyebrow, title, lead, align = "left", size = "lg", as: Tag = "h2", id, className, titleClassName, children }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("flex max-w-180 flex-col gap-4", center && "mx-auto items-center text-center", className)}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <Tag className={cn(headingSizes[size], titleClassName)} id={id}>
        {title}
      </Tag>
      {lead && <p className={leadClass}>{lead}</p>}
      {children}
    </div>
  );
}
