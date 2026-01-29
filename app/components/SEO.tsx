 import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
}

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
    const location = useLocation();
    const baseUrl = 'https://www.ecoreheating.com';

    useEffect(() => {
        // Update Title
        document.title = `${title} | ecoreheating.com`;

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        // Update Canonical URL
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute('href', canonical || `${baseUrl}${location.pathname}`);

        // Update Open Graph (Basic)
        const setMetaTag = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMetaTag('og:title', title);
        setMetaTag('og:description', description);
        setMetaTag('og:url', canonical || `${baseUrl}${location.pathname}`);
        setMetaTag('og:type', 'website');

        // --- Structured Data (Schema.org) ---
        const schemaId = 'seo-schema-data';
        let scriptElement = document.getElementById(schemaId) as HTMLScriptElement;

        if (!scriptElement) {
            scriptElement = document.createElement('script');
            scriptElement.id = schemaId;
            scriptElement.type = 'application/ld+json';
            document.head.appendChild(scriptElement);
        }

        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EcoReheating",
            "url": "https://www.ecoreheating.com",
            "logo": "https://www.ecoreheating.com/og-image.jpg",
            "description": "Leader in industrial furnace energy efficiency solutions and Zero CAPEX optimization."
        };

        const serviceSchema = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Industrial Furnace Optimization",
            "image": "https://www.ecoreheating.com/hero-bg.png",
            "description": "Reduce fuel consumption by 7-15% with CISA T80 verified technology.",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "CN"
            },
            "url": "https://www.ecoreheating.com/solutions"
        };

        scriptElement.text = JSON.stringify([organizationSchema, serviceSchema]);

        // --- Google Analytics Pageview Tracking ---
        if (typeof window.gtag === 'function') {
            window.gtag('config', 'G-7FKDBWSQJ7', {
                page_path: location.pathname + location.search,
            });
        }

    }, [title, description, canonical, location.pathname, location.search]);

    return null;
};

export default SEO;

