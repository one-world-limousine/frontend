import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogMetaClass, BlogCard } from "@/components/blog/BlogCard";
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
      <main id="main" className="pt-16">
        <article className="wrap">
          <header className="mx-auto flex max-w-190 flex-col gap-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-ink-muted no-underline transition-colors duration-180 hover:text-bronze-strong"
            >
              <Icon name="arrow-right" size={18} className="rotate-180 text-bronze" />
              All articles
            </Link>
            <SectionHeading as="h1" eyebrow={post.category} title={post.title} lead={post.excerpt} />
            <p className={blogMetaClass}>
              <Icon name="clock" size={16} className="text-bronze" />
              {readMinutes(post)} min read
              <span aria-hidden="true">·</span>
              {site.name}
            </p>
          </header>

          <Photo
            className="my-8 aspect-4/3 rounded-lg md:my-12 md:aspect-21/9 md:rounded-xl"
            src={post.image.src}
            alt={post.image.alt}
            sizes="(max-width: 1440px) 100vw, 1376px"
            preload
          />

          <div className="mx-auto max-w-190">
            {post.body.map((b, n) =>
              "h2" in b ? (
                <h2
                  key={n}
                  className="mt-8 mb-4 font-display text-[26px] leading-8 font-normal text-ink md:mt-12 md:text-[30px] md:leading-9"
                >
                  {b.h2}
                </h2>
              ) : "list" in b ? (
                <ul key={n} className="mb-6 flex flex-col gap-3">
                  {b.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[17px] leading-7 text-ink-muted">
                      <Icon name="check" className="mt-1 text-bronze" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                // The opening paragraph is set larger, in full ink.
                <p
                  key={n}
                  className={
                    n === 0
                      ? "mb-6 text-[17px] leading-7 text-ink md:text-xl md:leading-8"
                      : "mb-6 text-[17px] leading-7 text-ink-muted md:text-lg md:leading-[30px]"
                  }
                >
                  {b.p}
                </p>
              ),
            )}
            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
              <Button href="/book" size="lg">
                Book your ride
              </Button>
              <Button href={telHref} size="lg" variant="secondary" iconLeft="phone" icon={null}>
                {site.phone}
              </Button>
            </div>
          </div>
        </article>

        <section className="mt-(--section-y) bg-surface-alt py-(--section-y)" aria-labelledby="bl-more-title">
          <div className="wrap">
            <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
              <SectionHeading id="bl-more-title" eyebrow="Keep reading" title="More from the blog" size="md" />
              <Button variant="link" href="/blog">
                All articles
              </Button>
            </Reveal>
            <RevealGroup className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
