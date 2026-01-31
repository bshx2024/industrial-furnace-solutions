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
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <SEO
                title={t('seo.home.title')}
                description={t('seo.home.desc')}
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
