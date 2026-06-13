import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    type LoaderFunctionArgs,
} from "react-router";

import "./index.css";
import AppLayout from "./Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { postExists } from "./utils/blog.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    let pathname = url.pathname;
    if (pathname.endsWith("/") && pathname !== "/") {
        pathname = pathname.slice(0, -1);
    }
    
    let lang = "en";
    if (pathname.startsWith("/vi")) lang = "vi";
    else if (pathname.startsWith("/id")) lang = "id";
    else if (pathname.startsWith("/pt-br")) lang = "pt-br";

    const canonical = `https://www.ecoreheating.com${pathname === "/" ? "" : pathname}`;

    const cleanPath = pathname
      .replace(/^\/vi(\/|$)/, "$1")
      .replace(/^\/id(\/|$)/, "$1")
      .replace(/^\/pt-br(\/|$)/, "$1");

    const enUrl = `https://www.ecoreheating.com${cleanPath === "/" ? "" : cleanPath}`;
    const viUrl = `https://www.ecoreheating.com/vi${cleanPath === "/" ? "" : cleanPath}`;
    const idUrl = `https://www.ecoreheating.com/id${cleanPath === "/" ? "" : cleanPath}`;
    const ptBrUrl = `https://www.ecoreheating.com/pt-br${cleanPath === "/" ? "" : cleanPath}`;

    let showEn = true;
    let showVi = true;
    let showId = true;
    let showPtBr = true;

    const blogMatch = cleanPath.match(/^\/blog\/([^\/]+)$/);
    if (blogMatch) {
        const slug = blogMatch[1];
        showEn = postExists(slug, "en");
        showVi = postExists(slug, "vi");
        showId = postExists(slug, "id");
        showPtBr = postExists(slug, "pt-br");
    }

    return { lang, canonical, enUrl, viUrl, idUrl, ptBrUrl, showEn, showVi, showId, showPtBr };
}

export function Layout({ children }: { children: React.ReactNode }) {
    const data = useLoaderData() as { 
        lang: string; 
        canonical: string; 
        enUrl: string; 
        viUrl: string; 
        idUrl: string; 
        ptBrUrl: string; 
        showEn: boolean;
        showVi: boolean;
        showId: boolean;
        showPtBr: boolean;
    } | undefined;
    const lang = data?.lang || "en";
    const canonical = data?.canonical || "https://www.ecoreheating.com";
    const enUrl = data?.enUrl || "https://www.ecoreheating.com";
    const viUrl = data?.viUrl || "https://www.ecoreheating.com/vi";
    const idUrl = data?.idUrl || "https://www.ecoreheating.com/id";
    const ptBrUrl = data?.ptBrUrl || "https://www.ecoreheating.com/pt-br";
    const showEn = data?.showEn !== false;
    const showVi = data?.showVi !== false;
    const showId = data?.showId !== false;
    const showPtBr = data?.showPtBr !== false;

    return (
        <html lang={lang}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

                {/* SEO Metadata alternates */}
                {showEn && <link rel="alternate" hrefLang="en" href={enUrl} />}
                {showVi && <link rel="alternate" hrefLang="vi" href={viUrl} />}
                {showId && <link rel="alternate" hrefLang="id" href={idUrl} />}
                {showPtBr && <link rel="alternate" hrefLang="pt-br" href={ptBrUrl} />}
                {showEn && <link rel="alternate" hrefLang="x-default" href={enUrl} />}
                <link rel="canonical" href={canonical} />

                <Meta />
                <Links />

                {/* Performance: Preload hero background poster */}
                <link rel="preload" as="image" href="/hero-bg.png" />

                {/* Google tag (gtag.js) */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-7FKDBWSQJ7"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-7FKDBWSQJ7');
                        window.gtag = gtag;
                    `
                }} />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Oswald:wght@500;700&display=swap&subset=vietnamese" rel="stylesheet" />
            </head>
            <body className="antialiased font-sans">
                <LanguageProvider initialLanguage={lang as any}>
                    <AppLayout>
                        {children}
                    </AppLayout>
                </LanguageProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
