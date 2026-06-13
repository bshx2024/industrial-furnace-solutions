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
    const lang = location.pathname.startsWith('/vi') ? 'vi' : 'en';
    const t = translations[lang];

    return [
        { title: `${t['seo.home.title']} | EcoReheating` },
        { name: "description", content: t['seo.home.desc'] },
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
