import React from 'react';
import Hero from '../components/Hero';
import ProjectPositioning from '../components/ProjectPositioning';
import Technologies from '../components/Technologies';
import ProcessCoverage from '../components/ProcessCoverage';
import BenefitsSection from '../components/BenefitsSection';
import BusinessModel from '../components/BusinessModel';
import SocialProof from '../components/SocialProof';
import ContactForm from '../components/ContactForm';

const Home: React.FC = () => {
    return (
        <div className="bg-white">
            <Hero />
            <ProjectPositioning />
            <Technologies />
            <ProcessCoverage />
            <BenefitsSection />
            <BusinessModel />
            <SocialProof />
            <ContactForm />
        </div>
    );
};

export default Home;
