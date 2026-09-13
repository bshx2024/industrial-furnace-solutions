import React from 'react';
import Hero from '../components/Hero';
import ProjectPositioning from '../components/ProjectPositioning';
import Technologies from '../components/Technologies';
import ProcessCoverage from '../components/ProcessCoverage';
import BenefitsSection from '../components/BenefitsSection';
import BusinessModel from '../components/BusinessModel';
import SocialProof from '../components/SocialProof';
import LogoWall from '../components/LogoWall';
import ContactForm from '../components/ContactForm';
import { translations, useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = ({ location }) => {
    let lang = 'en';
    if (location.pathname.startsWith('/vi')) lang = 'vi';
    else if (location.pathname.startsWith('/id')) lang = 'id';
    else if (location.pathname.startsWith('/pt-br')) lang = 'pt-br';

    const t = translations[lang as keyof typeof translations] || translations.en;
    const pageUrl = `https://www.ecoreheating.com${location.pathname === '/' ? '' : location.pathname}`;
    const title = `${t['seo.home.title']} | EcoReheating`;
    const description = t['seo.home.desc'];
    const imageUrl = "https://www.ecoreheating.com/hero-bg.png";

    return [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        { property: "og:site_name", content: "EcoReheating" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: imageUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: imageUrl },
    ];
};

const Home: React.FC = () => {
    const { language: lang } = useLanguage();
    const t = translations[lang];

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "EcoReheating",
        "url": "https://www.ecoreheating.com",
        "description": "Zero CAPEX reheating furnace optimization using CISA T80 verified technologies",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales",
            "email": "contact@ecoreheating.com"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Shanghai",
            "addressCountry": "CN"
        }
    };

    return (
        <div className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Hero />
            <ProjectPositioning />
            <Technologies />
            <ProcessCoverage />
            <BenefitsSection />
            <BusinessModel />
            <SocialProof />
            <LogoWall />
            <ContactForm />
        </div>
    );
};

export default Home;
