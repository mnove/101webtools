import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";
import { toolsData } from "@/lib/tools-data";

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string =>
    new URL(path, siteConfig.url).toString();

  return [
    {
      url: url("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...Object.values(toolsData).map((tool) => ({
      url: url(tool.url),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
