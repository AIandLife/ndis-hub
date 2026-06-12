import { MetadataRoute } from "next";
import { PROVIDERS } from "@/lib/providers-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ndis-hub-ten.vercel.app";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/board`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/ai-advisor`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/journey`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/providers`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.6 },
  ];

  const providerPages = PROVIDERS.map((p) => ({
    url: `${baseUrl}/providers/${p.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...providerPages];
}
