import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://safevitals.in",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://safevitals.in/platform",
      lastModified: new Date(),
    },
    {
      url: "https://safevitals.in/about",
      lastModified: new Date(),
    },
    {
      url: "https://safevitals.in/contact",
      lastModified: new Date(),
    },
    {
      url: "https://safevitals.in/reserve",
      lastModified: new Date(),
    },
  ];
}
