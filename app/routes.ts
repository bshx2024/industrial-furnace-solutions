import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/Home.tsx"),
    route("solutions", "pages/Solutions.tsx"),
    route("hero-cases", "pages/HeroCases.tsx"),
    route("case-studies", "pages/CaseStudies.tsx"),
    route("about", "pages/AboutContact.tsx"),

    // Vietnamese routes with /vi prefix - mapped directly to avoid double layout (root.tsx already provides AppLayout)
    route("vi", "pages/Home.tsx", { id: "vi-home" }),
    route("vi/solutions", "pages/Solutions.tsx", { id: "vi-solutions" }),
    route("vi/hero-cases", "pages/HeroCases.tsx", { id: "vi-hero-cases" }),
    route("vi/case-studies", "pages/CaseStudies.tsx", { id: "vi-case-studies" }),
    route("vi/about", "pages/AboutContact.tsx", { id: "vi-about" }),
    route("sitemap.xml", "routes/sitemap.xml.ts"),
] satisfies RouteConfig;
