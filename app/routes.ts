import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/Home.tsx"),
    route("solutions", "pages/Solutions.tsx"),
    route("hero-cases", "pages/HeroCases.tsx"),
    route("case-studies", "pages/CaseStudies.tsx"),
    route("about", "pages/AboutContact.tsx"),

    // Blog routes
    route("blog", "routes/blog-list.tsx"),
    route("blog/:slug", "routes/blog-detail.tsx"),

    // Vietnamese routes with /vi prefix
    route("vi", "pages/Home.tsx", { id: "vi-home" }),
    route("vi/solutions", "pages/Solutions.tsx", { id: "vi-solutions" }),
    route("vi/hero-cases", "pages/HeroCases.tsx", { id: "vi-hero-cases" }),
    route("vi/case-studies", "pages/CaseStudies.tsx", { id: "vi-case-studies" }),
    route("vi/about", "pages/AboutContact.tsx", { id: "vi-about" }),

    // Vietnamese Blog routes
    route("vi/blog", "routes/blog-list.tsx", { id: "vi-blog-list" }),
    route("vi/blog/:slug", "routes/blog-detail.tsx", { id: "vi-blog-detail" }),

    route("sitemap.xml", "routes/sitemap.ts"),
] satisfies RouteConfig;
