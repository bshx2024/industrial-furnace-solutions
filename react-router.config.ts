import type { Config } from "@react-router/dev/config";

export default {
    ssr: false, // Set to false for full static site generation (SSG)
    async prerender() {
        return ["/", "/solutions", "/hero-cases", "/case-studies", "/about"];
    },
} satisfies Config;
