import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts } from "@/lib/blog";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Travel notes from ${site.name}: airport transfers, business travel, special occasions and what to expect from a chauffeured ride.`,
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: `Blog | ${site.name}` },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  url: `${site.url}/blog`,
  name: `${site.name} blog`,
  publisher: { "@id": `${site.url}/#organization` },
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `${site.url}/blog/${p.slug}`,
  })),
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <NavBar />
      <main id="main" className="bl-page">
        <div className="ow-wrap">
          <SectionHeading
            as="h1"
            eyebrow="Our blog"
            title="Notes from the road"
            lead="Tips for smoother airport runs, business travel and the occasions that call for a chauffeur, from the team behind every One World ride."
          />

          <div className="bl-featured">
            <BlogCard post={featured} featured />
          </div>

          <RevealGroup className="hp-grid3 bl-grid">
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <BlogCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <section className="ow-wrap hp-cta-wrap bl-cta" aria-labelledby="bl-cta-title">
          <Reveal>
            <div className="hp-cta" data-theme="dark">
              <div>
                <h2 id="bl-cta-title">Ready when you are.</h2>
                <p>Book online in a few minutes, or call and we will plan the ride with you.</p>
              </div>
              <div className="ow-row">
                <Button href="/book" size="lg">
                  Book your ride
                </Button>
                <Button href={telHref} size="lg" variant="secondary" iconLeft="phone" icon={null}>
                  Call us
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
