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

const Home: React.FC = () => {
    return (
        <div className="bg-white">
            <SEO
                title="Zero CAPEX Reheating Furnace Efficiency"
                description="Zero CAPEX reheating furnace optimization. Reduce fuel consumption by 7-15% with CISA T80 verified technology and our Energy Steward model for guaranteed savings."
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
