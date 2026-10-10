import Link from "next/link";
import { readMinutes, type Post } from "@/lib/blog";
import { Icon } from "../ui/Icon";
import { Photo } from "../ui/Photo";

type BlogCardProps = { post: Post; featured?: boolean; headingLevel?: "h2" | "h3" };

/** An article teaser. The title link covers the whole card, so anywhere on it opens the post. */
export function BlogCard({ post, featured, headingLevel: H = "h2" }: BlogCardProps) {
  return (
    <article className={featured ? "bl-card bl-card-featured" : "bl-card"}>
      <Photo
        src={post.image.src}
        alt={post.image.alt}
        sizes={featured ? "(max-width: 900px) 100vw, 640px" : "(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 400px"}
      />
      <div className="bl-card-body">
        <p className="ow-svc-tag">{post.category}</p>
        <H className="bl-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </H>
        <p className="bl-card-text">{post.excerpt}</p>
        <p className="bl-meta">
          <Icon name="clock" />
          {readMinutes(post)} min read
        </p>
      </div>
    </article>
  );
}
