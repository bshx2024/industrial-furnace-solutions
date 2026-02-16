import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.ecoreheating.com/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.ecoreheating.com/" />
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://www.ecoreheating.com/vi/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/" />
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://www.ecoreheating.com/solutions</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/solutions" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/solutions" />
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.ecoreheating.com/vi/solutions</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/solutions" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/solutions" />
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.ecoreheating.com/hero-cases</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/hero-cases" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/hero-cases" />
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.ecoreheating.com/vi/hero-cases</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/hero-cases" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/hero-cases" />
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.ecoreheating.com/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/about" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/about" />
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.ecoreheating.com/vi/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/about" />
    <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/about" />
    <priority>0.7</priority>
  </url>
</urlset>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
