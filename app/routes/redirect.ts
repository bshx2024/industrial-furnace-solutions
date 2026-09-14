import { redirect, type LoaderFunctionArgs } from "react-router";

const redirectMap: Record<string, string> = {
  // Portuguese (Brazil) complete phase-out -> 301 to English equivalents
  "/pt-br": "/",
  "/pt-br/solutions": "/solutions",
  "/pt-br/hero-cases": "/hero-cases",
  "/pt-br/case-studies": "/case-studies",
  "/pt-br/about": "/about",
  "/pt-br/blog": "/blog",
  "/pt-br/calculators": "/calculators",
  "/pt-br/calculators/walking-beam-furnace-efficiency-calculator": "/calculators/walking-beam-furnace-efficiency-calculator",
  "/pt-br/calculators/reheating-furnace-heat-balance": "/calculators/reheating-furnace-heat-balance",
  "/pt-br/furnaces/walking-beam-reheating-furnace": "/furnaces/walking-beam-reheating-furnace",
  "/pt-br/optimization/furnace-efficiency-upgrades": "/optimization/furnace-efficiency-upgrades",
  "/pt-br/resources/reheating-furnace-shutdown-maintenance-checklist": "/resources/reheating-furnace-shutdown-maintenance-checklist",

  // Vietnamese pruned zero-impression pages -> 301 to active Vietnamese hub
  "/vi/case-studies": "/vi",
  "/vi/furnaces/walking-beam-reheating-furnace": "/vi",
  "/vi/blog/evn-decision-963-reheating-furnace-load-shifting": "/vi/blog",

  // Indonesian pruned zero-impression pages -> 301 to active Indonesian hub
  "/id/about": "/id",
  "/id/hero-cases": "/id",
  "/id/case-studies": "/id",
  "/id/calculators/reheating-furnace-heat-balance": "/id/calculators",
  "/id/furnaces/walking-beam-reheating-furnace": "/id/optimization/furnace-efficiency-upgrades",
  "/id/resources/reheating-furnace-shutdown-maintenance-checklist": "/id/calculators",
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, "");
  
  if (redirectMap[pathname]) {
    return redirect(redirectMap[pathname], 301);
  }

  // Any other pt-br path
  if (pathname.startsWith("/pt-br")) {
    const fallback = pathname.replace(/^\/pt-br/, "") || "/";
    return redirect(fallback, 301);
  }

  // Fallback
  return redirect("/", 301);
}

export default function RedirectRoute() {
  return null;
}
