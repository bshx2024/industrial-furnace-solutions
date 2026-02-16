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

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const lang = url.pathname.startsWith("/vi") ? "vi" : "en";
    const canonical = `https://www.ecoreheating.com${url.pathname === "/" ? "" : url.pathname}`;

    return { lang, canonical };
}

export function Layout({ children }: { children: React.ReactNode }) {
    const data = useLoaderData() as { lang: string; canonical: string } | undefined;
    const lang = data?.lang || "en";
    const canonical = data?.canonical || "https://www.ecoreheating.com";

    return (
        <html lang={lang}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* SEO Metadata alternates */}
                <link rel="alternate" hrefLang="en" href="https://www.ecoreheating.com/" />
                <link rel="alternate" hrefLang="vi" href="https://www.ecoreheating.com/vi/" />
                <link rel="alternate" hrefLang="x-default" href="https://www.ecoreheating.com/" />
                <link rel="canonical" href={canonical} />

                <Meta />
                <Links />

                {/* Performance: Preload hero background poster */}
                <link rel="preload" as="image" href="/hero-bg.png" />

                {/* Global Data Layer Initialization */}
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        window.gtag = gtag;
                    `
                }} />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Oswald:wght@500;700&display=swap&subset=vietnamese" rel="stylesheet" />
            </head>
            <body className="antialiased font-sans">
                <LanguageProvider initialLanguage={lang as "en" | "vi"}>
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
