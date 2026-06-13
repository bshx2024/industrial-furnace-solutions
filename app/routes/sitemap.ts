import type { LoaderFunctionArgs } from "react-router";
import { getAllPosts } from "../utils/blog.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = "https://www.ecoreheating.com";
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const staticRoutes = [
    { en: "/", vi: "/vi", id: "/id", "pt-br": "/pt-br", priority: "1.0", changefreq: "weekly" },
    { en: "/solutions", vi: "/vi/solutions", id: "/id/solutions", "pt-br": "/pt-br/solutions", priority: "0.9", changefreq: "monthly" },
    { en: "/hero-cases", vi: "/vi/hero-cases", id: "/id/hero-cases", "pt-br": "/pt-br/hero-cases", priority: "0.8", changefreq: "monthly" },
    { en: "/case-studies", vi: "/vi/case-studies", id: "/id/case-studies", "pt-br": "/pt-br/case-studies", priority: "0.8", changefreq: "monthly" },
    { en: "/about", vi: "/vi/about", id: "/id/about", "pt-br": "/pt-br/about", priority: "0.7", changefreq: "monthly" },
    { en: "/blog", vi: "/vi/blog", id: "/id/blog", "pt-br": "/pt-br/blog", priority: "0.8", changefreq: "daily" },
    { en: "/vi/lp/cbam-steel-vietnam", vi: "/vi/lp/cbam-steel-vietnam", id: null, "pt-br": null, priority: "0.8", changefreq: "weekly" }, // LP has no EN/ID/PT-BR version, mapping to itself for simple logic
  ];

  const enPosts = await getAllPosts("en");
  const viPosts = await getAllPosts("vi");
  const idPosts = await getAllPosts("id");
  const ptBrPosts = await getAllPosts("pt-br");

  // Create a map of slugs to check availability in all languages
  const enSlugs = new Set(enPosts.map(p => p.slug));
  const viSlugs = new Set(viPosts.map(p => p.slug));
  const idSlugs = new Set(idPosts.map(p => p.slug));
  const ptBrSlugs = new Set(ptBrPosts.map(p => p.slug));

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Static Routes
  staticRoutes.forEach(route => {
    const locales = ["en", "vi", "id", "pt-br"] as const;
    
    locales.forEach(loc => {
      const locPath = (route as any)[loc];
      if (!locPath) return; // Skip if this locale is not supported for this route
      
      xmlContent += `
  <url>
    <loc>${baseUrl}${locPath}</loc>`;
      
      // Add alternates
      locales.forEach(altLoc => {
        const altPath = (route as any)[altLoc];
        if (altPath) {
          xmlContent += `
    <xhtml:link rel="alternate" hreflang="${altLoc}" href="${baseUrl}${altPath}" />`;
        }
      });
      // x-default alternates mapping to English version if it exists
      if (route.en) {
        xmlContent += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${route.en}" />`;
      }
      
      xmlContent += `
    <lastmod>${today}</lastmod>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
  </url>`;
    });
  });

  // Blog Posts
  const postGroups = [
    { lang: "en", posts: enPosts, slugs: enSlugs },
    { lang: "vi", posts: viPosts, slugs: viSlugs },
    { lang: "id", posts: idPosts, slugs: idSlugs },
    { lang: "pt-br", posts: ptBrPosts, slugs: ptBrSlugs },
  ];

  postGroups.forEach(group => {
    group.posts.forEach(post => {
      const lastmod = post.date || today;
      const urlPrefix = group.lang === "en" ? "/blog" : `/${group.lang}/blog`;
      
      xmlContent += `
  <url>
    <loc>${baseUrl}${urlPrefix}/${post.slug}</loc>`;
      
      // Add alternate links for other languages if they have the same post slug
      postGroups.forEach(altGroup => {
        if (altGroup.slugs.has(post.slug)) {
          const altPrefix = altGroup.lang === "en" ? "/blog" : `/${altGroup.lang}/blog`;
          xmlContent += `
    <xhtml:link rel="alternate" hreflang="${altGroup.lang}" href="${baseUrl}${altPrefix}/${post.slug}" />`;
        }
      });
      // x-default alternates mapping to English version if it exists
      if (enSlugs.has(post.slug)) {
        xmlContent += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/blog/${post.slug}" />`;
      }
      
      xmlContent += `
    <lastmod>${lastmod}</lastmod>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>`;
    });
  });

  xmlContent += `
</urlset>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600", // Cache 1 hour
    },
  });
}
