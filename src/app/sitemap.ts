import type { MetadataRoute } from "next";

const SITE_URL = "https://jianhuihome.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/products", "/inquiry"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
