import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = "https://www.ecoreheating.com";

  const pages = [
    { loc: "", lastmod: new Date().toISOString().split('T')[0] },
    { loc: "/solutions", lastmod: new Date().toISOString().split('T')[0] },
    { loc: "/hero-cases", lastmod: new Date().toISOString().split('T')[0] },
    { loc: "/case-studies", lastmod: new Date().toISOString().split('T')[0] },
    { loc: "/about", lastmod: new Date().toISOString().split('T')[0] },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.loc}/</loc>
    <lastmod>${page.lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.loc}/" />
    <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}/vi${page.loc}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.loc}/" />
  </url>
  <url>
    <loc>${baseUrl}/vi${page.loc}/</loc>
    <lastmod>${page.lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.loc}/" />
    <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}/vi${page.loc}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.loc}/" />
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export default function Sitemap() {
  return null;
}
