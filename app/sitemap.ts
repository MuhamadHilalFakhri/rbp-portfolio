import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    {
      url: new URL("/", baseUrl).href,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
