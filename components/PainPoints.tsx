import React from 'react';
import { TrendingUp, ShieldAlert, ThermometerSun } from 'lucide-react';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded border border-gray-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-furnace-500/30 transition-all duration-300 group">
    <div className="w-14 h-14 bg-industrial-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-furnace-600 transition-colors">
      <Icon size={32} className="text-white" />
    </div>
    <h3 className="text-2xl font-heading font-bold text-industrial-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const PainPoints: React.FC = () => {
  return (
    <section id="solutions" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-furnace-600 font-bold tracking-widest uppercase text-sm mb-2 block">The Challenge</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-4">
            Overcoming Inefficiency in <br />Steel Rolling Heating Processes
          </h2>
          <p className="text-gray-600">
            Is your furnace eating into your profit margins? We address the critical issues facing modern rolling mills.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={TrendingUp}
            title="High Fuel Costs"
            description="Struggling with rising natural gas or oil prices? Our regenerative burner technology maximizes heat recovery from exhaust gases, drastically cutting fuel bills."
          />
          <FeatureCard 
            icon={ShieldAlert}
            title="Scale Loss & Oxidation"
            description="Excessive scale formation eats away your yield. We implement precise air-fuel ratio control and atmosphere management to minimize oxidation in billet reheating furnaces."
          />
          <FeatureCard 
            icon={ThermometerSun}
            title="Uneven Heating"
            description="Temperature skid marks causing rolling defects? Ensure uniform temperature distribution in walking beam furnaces for superior product quality and reduced rejection rates."
          />
        </div>
      </div>
    </section>
  );
};

export default PainPoints;