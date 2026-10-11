import Link from "next/link";
import { readMinutes, type Post } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";
import { cardClass, cardTagClass } from "../ui/ServiceCard";

/** Reading time and similar details under a title. */
export const blogMetaClass = "inline-flex flex-wrap items-center gap-2 text-[13px] leading-[18px] font-semibold text-ink-muted";

type BlogCardProps = { post: Post; featured?: boolean; headingLevel?: "h2" | "h3" };

/** An article teaser. The title link covers the whole card, so anywhere on it opens the post. */
export function BlogCard({ post, featured, headingLevel: H = "h2" }: BlogCardProps) {
  return (
    <article
      className={cn(
        cardClass,
        "group/card relative focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--focus-ring)",
        featured && "lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
      )}
    >
      <Photo
        className={featured ? "aspect-16/10 lg:aspect-auto lg:min-h-95" : "aspect-16/10"}
        src={post.image.src}
        alt={post.image.alt}
        sizes={featured ? "(max-width: 1024px) 100vw, 760px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 460px"}
      />
      <div className={cn("flex flex-1 flex-col gap-3 p-6", featured && "gap-4 lg:justify-center lg:p-12")}>
        <p className={cardTagClass}>{post.category}</p>
        <H
          className={
            featured
              ? "font-display text-[28px] leading-[34px] font-normal text-ink lg:text-[34px] lg:leading-10"
              : "text-xl leading-7 font-semibold text-ink"
          }
        >
          {/* The title link stretches over the whole card, so anywhere on it opens the post. */}
          <Link
            href={`/blog/${post.slug}`}
            className="text-inherit no-underline transition-colors duration-180 group-hover/card:text-bronze-strong after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </H>
        <p className={featured ? "text-[17px] leading-7 text-ink-muted" : "flex-1 text-[15px] leading-6 text-ink-muted"}>{post.excerpt}</p>
        <p className={blogMetaClass}>
          <Icon name="clock" size={16} className="text-bronze" />
          {readMinutes(post)} min read
        </p>
      </div>
    </article>
  );
}
