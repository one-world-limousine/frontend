import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
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
      <main id="main" className="pt-16">
        <div className="wrap">
          <SectionHeading
            as="h1"
            eyebrow="Our blog"
            title="Notes from the road"
            lead="Tips for smoother airport runs, business travel and the occasions that call for a chauffeur, from the team behind every One World ride."
          />

          <div className="mt-12">
            <BlogCard post={featured} featured />
          </div>

          <RevealGroup className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <BlogCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <CtaBand
          id="bl-cta-title"
          className="pt-(--section-y)"
          title="Ready when you are."
          text="Book online in a few minutes, or call and we will plan the ride with you."
        >
          <Button href="/book" size="lg">
            Book your ride
          </Button>
          <Button href={telHref} size="lg" variant="secondary" iconLeft="phone" icon={null}>
            Call us
          </Button>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
