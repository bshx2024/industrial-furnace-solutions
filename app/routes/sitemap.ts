import type { LoaderFunctionArgs } from "react-router";
import { getAllPosts } from "../utils/blog.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = "https://www.ecoreheating.com";
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const staticRoutes = [
    { en: "/", vi: "/vi/", priority: "1.0", changefreq: "weekly" },
    { en: "/solutions", vi: "/vi/solutions", priority: "0.9", changefreq: "monthly" },
    { en: "/hero-cases", vi: "/vi/hero-cases", priority: "0.8", changefreq: "monthly" },
    { en: "/case-studies", vi: "/vi/case-studies", priority: "0.8", changefreq: "monthly" },
    { en: "/about", vi: "/vi/about", priority: "0.7", changefreq: "monthly" },
    { en: "/blog", vi: "/vi/blog", priority: "0.8", changefreq: "daily" },
  ];

  const enPosts = await getAllPosts("en");
  const viPosts = await getAllPosts("vi");

  // Create a map of slugs to check availability in both languages
  const viSlugs = new Set(viPosts.map(p => p.slug));
  const enSlugs = new Set(enPosts.map(p => p.slug));

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Static Routes
  staticRoutes.forEach(route => {
    // EN version
    xmlContent += `
  <url>
    <loc>${baseUrl}${route.en}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${route.en}" />
    <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}${route.vi}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${route.en}" />
    <lastmod>${today}</lastmod>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
  </url>`;
    // VI version
    xmlContent += `
  <url>
    <loc>${baseUrl}${route.vi}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${route.en}" />
    <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}${route.vi}" />
    <lastmod>${today}</lastmod>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
  </url>`;
  });

  // Blog Posts - EN
  enPosts.forEach(post => {
    const hasVi = viSlugs.has(post.slug);
    const lastmod = post.date || today;
    xmlContent += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/blog/${post.slug}" />
    ${hasVi ? `<xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}/vi/blog/${post.slug}" />` : ""}
    <lastmod>${lastmod}</lastmod>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // Blog Posts - VI
  viPosts.forEach(post => {
    const hasEn = enSlugs.has(post.slug);
    const lastmod = post.date || today;
    xmlContent += `
  <url>
    <loc>${baseUrl}/vi/blog/${post.slug}</loc>
    <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}/vi/blog/${post.slug}" />
    ${hasEn ? `<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/blog/${post.slug}" />` : ""}
    <lastmod>${lastmod}</lastmod>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>`;
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
