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

    // Indonesian routes with /id prefix
    route("id", "pages/Home.tsx", { id: "id-home" }),
    route("id/solutions", "pages/Solutions.tsx", { id: "id-solutions" }),
    route("id/hero-cases", "pages/HeroCases.tsx", { id: "id-hero-cases" }),
    route("id/case-studies", "pages/CaseStudies.tsx", { id: "id-case-studies" }),
    route("id/about", "pages/AboutContact.tsx", { id: "id-about" }),
    route("id/blog", "routes/blog-list.tsx", { id: "id-blog-list" }),
    route("id/blog/:slug", "routes/blog-detail.tsx", { id: "id-blog-detail" }),

    // Portuguese (Brazil) routes with /pt-br prefix
    route("pt-br", "pages/Home.tsx", { id: "pt-br-home" }),
    route("pt-br/solutions", "pages/Solutions.tsx", { id: "pt-br-solutions" }),
    route("pt-br/hero-cases", "pages/HeroCases.tsx", { id: "pt-br-hero-cases" }),
    route("pt-br/case-studies", "pages/CaseStudies.tsx", { id: "pt-br-case-studies" }),
    route("pt-br/about", "pages/AboutContact.tsx", { id: "pt-br-about" }),
    route("pt-br/blog", "routes/blog-list.tsx", { id: "pt-br-blog-list" }),
    route("pt-br/blog/:slug", "routes/blog-detail.tsx", { id: "pt-br-blog-detail" }),

    route("sitemap.xml", "routes/sitemap.ts"),
    route("vi/lp/cbam-steel-vietnam", "pages/VietnamSteelLP.tsx", { id: "vi-lp-vietnam-steel" }),
] satisfies RouteConfig;
