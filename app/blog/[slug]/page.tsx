import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPost, posts, readMinutes } from "@/lib/blog";
import { site, telHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only the posts in lib/blog.ts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      images: [{ url: post.image.src.src, alt: post.image.alt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  // The next posts in order, wrapping round, so every article links to three others.
  const i = posts.indexOf(post);
  const more = [1, 2, 3].map((n) => posts[(i + n) % posts.length]).filter((p) => p !== post);

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image.src.src}`,
    url: `${site.url}/blog/${post.slug}`,
    articleSection: post.category,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <NavBar />
      <main id="main" className="bl-page">
        <article className="ow-wrap bl-post">
          <header className="bl-post-head">
            <Link href="/blog" className="bl-back">
              <Icon name="arrow-right" />
              All articles
            </Link>
            <SectionHeading as="h1" eyebrow={post.category} title={post.title} lead={post.excerpt} />
            <p className="bl-meta">
              <Icon name="clock" />
              {readMinutes(post)} min read
              <span aria-hidden="true">·</span>
              {site.name}
            </p>
          </header>

          <Photo
            className="bl-post-photo"
            src={post.image.src}
            alt={post.image.alt}
            sizes="(max-width: 1240px) 100vw, 1192px"
            preload
          />

          <div className="bl-prose">
            {post.body.map((b, n) =>
              "h2" in b ? (
                <h2 key={n}>{b.h2}</h2>
              ) : "list" in b ? (
                <ul key={n}>
                  {b.list.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={n}>{b.p}</p>
              ),
            )}
            <div className="ow-row bl-post-actions">
              <Button href="/book" size="lg">
                Book your ride
              </Button>
              <Button href={telHref} size="lg" variant="secondary" iconLeft="phone" icon={null}>
                {site.phone}
              </Button>
            </div>
          </div>
        </article>

        <section className="hp-sec hp-alt bl-more" aria-labelledby="bl-more-title">
          <div className="ow-wrap">
            <Reveal className="hp-head">
              <SectionHeading id="bl-more-title" eyebrow="Keep reading" title="More from the blog" size="md" />
              <Button variant="link" href="/blog">
                All articles
              </Button>
            </Reveal>
            <RevealGroup className="hp-grid3 bl-grid">
              {more.map((p) => (
                <RevealItem key={p.slug}>
                  <BlogCard post={p} headingLevel="h3" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
