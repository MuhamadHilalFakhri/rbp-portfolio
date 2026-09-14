import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return ["/", "/about", "/projects"].map((path) => ({
    url: new URL(path, baseUrl).href,
    changeFrequency: path === "/about" ? "monthly" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
