import { MetadataRoute } from "next";
import { getChildPages } from "@/app/_services/api";

type Locale = "es" | "en";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://klarq.eu";

  const languages: Locale[] = ["es", "en"];

  const staticRoutes = [
    { route: "/architecture", priority: 0.7 },
    { route: "/contact", priority: 0.7 },
    { route: "/decor", priority: 0.7 },
    { route: "/development", priority: 0.7 },
    { route: "/publications", priority: 0.7 },
  ];

  const allStaticRoutes = languages.flatMap((lang) =>
    staticRoutes.map(({ route, priority }) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "daily" as const,
      priority,
    }))
  );

  const homeRoutes = languages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  const allProjectRoutes = [];

  for (const lang of languages) {
    const parentSlug = lang === "es" ? "spanish-pages" : "english-pages";

    try {
      const architecturePages = await getChildPages(
        "architecture",
        lang,
        parentSlug
      );
      for (const project of architecturePages) {
        allProjectRoutes.push({
          url: `${baseUrl}/${lang}/architecture/${project.slug}`,
          lastModified: new Date().toISOString().split("T")[0],
          changeFrequency: "daily" as const,
          priority: 0.6,
        });
      }

      const developmentPages = await getChildPages(
        "development",
        lang,
        parentSlug
      );
      for (const project of developmentPages) {
        allProjectRoutes.push({
          url: `${baseUrl}/${lang}/development/${project.slug}`,
          lastModified: new Date().toISOString().split("T")[0],
          changeFrequency: "daily" as const,
          priority: 0.6,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return [...allStaticRoutes, ...homeRoutes, ...allProjectRoutes];
}
