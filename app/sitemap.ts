import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/book`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
