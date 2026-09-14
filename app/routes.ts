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

    // Active Vietnamese routes with /vi prefix
    route("vi", "pages/Home.tsx", { id: "vi-home" }),
    route("vi/solutions", "pages/Solutions.tsx", { id: "vi-solutions" }),
    route("vi/hero-cases", "pages/HeroCases.tsx", { id: "vi-hero-cases" }),
    route("vi/about", "pages/AboutContact.tsx", { id: "vi-about" }),
    route("vi/blog", "routes/blog-list.tsx", { id: "vi-blog-list" }),
    route("vi/blog/:slug", "routes/blog-detail.tsx", { id: "vi-blog-detail" }),
    route("vi/lp/cbam-steel-vietnam", "pages/VietnamSteelLP.tsx", { id: "vi-lp-vietnam-steel" }),
    route("vi/calculators", "pages/CalculatorsHub.tsx", { id: "vi-calculators" }),
    route("vi/calculators/walking-beam-furnace-efficiency-calculator", "pages/WalkingBeamCalc.tsx", { id: "vi-walking-beam-calc" }),
    route("vi/calculators/reheating-furnace-heat-balance", "pages/HeatBalanceCalc.tsx", { id: "vi-heat-balance-calc" }),
    route("vi/optimization/furnace-efficiency-upgrades", "pages/FurnaceUpgrades.tsx", { id: "vi-furnace-upgrades" }),
    route("vi/resources/reheating-furnace-shutdown-maintenance-checklist", "pages/ShutdownChecklist.tsx", { id: "vi-shutdown-checklist" }),

    // Active Indonesian routes with /id prefix
    route("id", "pages/Home.tsx", { id: "id-home" }),
    route("id/solutions", "pages/Solutions.tsx", { id: "id-solutions" }),
    route("id/blog", "routes/blog-list.tsx", { id: "id-blog-list" }),
    route("id/blog/:slug", "routes/blog-detail.tsx", { id: "id-blog-detail" }),
    route("id/calculators", "pages/CalculatorsHub.tsx", { id: "id-calculators" }),
    route("id/calculators/walking-beam-furnace-efficiency-calculator", "pages/WalkingBeamCalc.tsx", { id: "id-walking-beam-calc" }),
    route("id/optimization/furnace-efficiency-upgrades", "pages/FurnaceUpgrades.tsx", { id: "id-furnace-upgrades" }),

    // B2B Technical Routes (English)
    route("calculators", "pages/CalculatorsHub.tsx"),
    route("calculators/walking-beam-furnace-efficiency-calculator", "pages/WalkingBeamCalc.tsx"),
    route("calculators/reheating-furnace-heat-balance", "pages/HeatBalanceCalc.tsx"),
    route("furnaces/walking-beam-reheating-furnace", "pages/WalkingBeamGuide.tsx"),
    route("optimization/furnace-efficiency-upgrades", "pages/FurnaceUpgrades.tsx"),
    route("resources/reheating-furnace-shutdown-maintenance-checklist", "pages/ShutdownChecklist.tsx"),

    // 301 Permanent Redirects for Pruned Zero-Impression URLs (Prevents 404s in GSC)
    route("vi/case-studies", "routes/redirect.ts", { id: "vi-case-studies-redirect" }),
    route("vi/furnaces/walking-beam-reheating-furnace", "routes/redirect.ts", { id: "vi-walking-beam-guide-redirect" }),
    route("id/about", "routes/redirect.ts", { id: "id-about-redirect" }),
    route("id/hero-cases", "routes/redirect.ts", { id: "id-hero-cases-redirect" }),
    route("id/case-studies", "routes/redirect.ts", { id: "id-case-studies-redirect" }),
    route("id/calculators/reheating-furnace-heat-balance", "routes/redirect.ts", { id: "id-heat-balance-calc-redirect" }),
    route("id/furnaces/walking-beam-reheating-furnace", "routes/redirect.ts", { id: "id-walking-beam-guide-redirect" }),
    route("id/resources/reheating-furnace-shutdown-maintenance-checklist", "routes/redirect.ts", { id: "id-shutdown-checklist-redirect" }),
    route("pt-br", "routes/redirect.ts", { id: "pt-br-root-redirect" }),
    route("pt-br/*", "routes/redirect.ts", { id: "pt-br-wildcard-redirect" }),

    route("sitemap.xml", "routes/sitemap.ts"),
] satisfies RouteConfig;
