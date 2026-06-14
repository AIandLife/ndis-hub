import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ndiscircle.com";

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/providers`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/board`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/ai-advisor`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.6 },
  ];
}
