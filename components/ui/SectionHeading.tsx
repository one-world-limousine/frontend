import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
  as?: "h1" | "h2" | "h3";
  id?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, lead, align = "left", size = "lg", as: Tag = "h2", id, children }: SectionHeadingProps) {
  const cls = ["ow-sh", align === "center" && "ow-sh-center", size === "md" && "ow-sh-md"].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {eyebrow && <p className="ow-eyebrow">{eyebrow}</p>}
      <Tag className="ow-sh-title" id={id}>
        {title}
      </Tag>
      {lead && <p className="ow-sh-lead">{lead}</p>}
      {children}
    </div>
  );
}
