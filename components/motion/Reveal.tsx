"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type RevealProps = { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" };

/** Fades and lifts its content into view once, as it scrolls into the viewport. Use below the fold only. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = as === "li" ? m.li : m.div;
  return (
    <Tag
      className={className}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

/** A grid whose children (wrap each in <RevealItem>) rise in one after another. */
export function RevealGroup({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={item}>
      {children}
    </m.div>
  );
}
