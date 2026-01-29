import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import "./index.css";
import AppLayout from "./Layout";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* SEO Metadata */}
                <Meta />
                <Links />

                {/* Industrial Design System - Re-integrated */}
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Oswald:wght@500;700&display=swap" rel="stylesheet" />

                <script dangerouslySetInnerHTML={{
                    __html: `
                        tailwind.config = {
                            theme: {
                                extend: {
                                    colors: {
                                        industrial: {
                                            950: '#020617',
                                            900: '#0f172a',
                                            800: '#1e293b',
                                            700: '#334155',
                                        },
                                        furnace: {
                                            500: '#f97316',
                                            600: '#ea580c',
                                            700: '#c2410c',
                                            950: '#431407',
                                        }
                                    },
                                    fontFamily: {
                                        sans: ['Inter', 'sans-serif'],
                                        heading: ['Oswald', 'sans-serif'],
                                    }
                                }
                            }
                        }
                    `
                }} />

                <style dangerouslySetInnerHTML={{
                    __html: `
                        html { scroll-behavior: smooth; }
                        body { font-family: 'Inter', sans-serif; }
                        h1, h2, h3, h4, h5, h6 { font-family: 'Oswald', sans-serif; }
                        
                        /* Core Animations */
                        @keyframes industrial-zoom { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
                        @keyframes industrial-heat { 0% { filter: brightness(1) contrast(1); opacity: 0.6; } 50% { filter: brightness(1.3) contrast(1.2); opacity: 0.8; } 100% { filter: brightness(1) contrast(1); opacity: 0.6; } }
                        @keyframes industrial-scan { 0% { top: -20%; opacity: 0; } 50% { opacity: 0.4; } 100% { top: 120%; opacity: 0; } }
                        
                        .engine-bg-animate { animation: industrial-zoom 30s ease-in-out infinite !important; will-change: transform; }
                        .engine-shimmer-animate { animation: industrial-heat 4s ease-in-out infinite !important; will-change: filter, opacity; }
                        .engine-scan-animate { position: absolute; width: 100%; height: 12rem; left: 0; background: linear-gradient(to bottom, transparent, rgba(249, 115, 22, 0.25), transparent); animation: industrial-scan 7s linear infinite !important; pointer-events: none; z-index: 10; }
                    `
                }} />
            </head>
            <body className="antialiased">
                <AppLayout>
                    {children}
                </AppLayout>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
