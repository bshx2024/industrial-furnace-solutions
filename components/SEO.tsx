import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    const baseUrl = 'https://www.ecoreheating.com'; // Replace with actual domain if known, or keeps as placeholder

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
