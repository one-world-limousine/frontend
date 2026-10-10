import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/book`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/drive-for-us`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/blog`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
