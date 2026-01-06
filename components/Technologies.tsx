import React from 'react';
import { TechCardProps } from '../types';
import { Settings, Cpu, Factory } from 'lucide-react';

const TechCard: React.FC<TechCardProps> = ({ title, description, keywords, imageSrc, isReversed }) => (
  <div className={`flex flex-col lg:flex-row items-center gap-12 py-16 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
    <div className="w-full lg:w-1/2 relative group">
      <div className="absolute inset-0 bg-furnace-600 rounded-lg transform translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
      <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video bg-gray-200">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/60 to-transparent"></div>
      </div>
    </div>

    <div className="w-full lg:w-1/2">
      <h3 className="text-3xl font-heading font-bold text-industrial-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed mb-6 border-l-4 border-furnace-500 pl-4">
        {description}
      </p>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-industrial-700 uppercase tracking-wide mb-3">Key Technologies:</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, idx) => (
            <span key={idx} className="bg-slate-100 text-industrial-800 px-3 py-1 rounded text-sm font-medium border border-slate-200">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Technologies: React.FC = () => {
  return (
    <section id="technologies" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-furnace-600 font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900">
            Core Technologies for <br />Furnace Conservation
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          <TechCard
            title="Full-fiber Furnace Roof"
            description="T80-listed full-fiber furnace roof technology to minimize heat loss and thermal inertia of the reheating furnace, enabling faster response times and significant fuel savings."
            keywords={['T80 Listed', 'Low Thermal Inertia', 'Energy Saving Refractory', 'Fast Startup']}
            imageSrc="/tech-roof.png"
          />

          <TechCard
            title="Intelligent Reheating (Smart Steel Burning)"
            description="AI-supported intelligent reheating system to stabilize steel temperature from caster to reheating furnace and optimize furnace curves for maximum yield and minimum waste."
            keywords={['AI Control', 'Temperature Stabilization', 'Curve Optimization', 'Smart Production']}
            imageSrc="/tech-ai.png"
            isReversed={true}
          />

          <TechCard
            title="Non-ceramic Functional Coatings"
            description="Non-ceramic functional coatings to enhance furnace lining protection, reduce oxidation scale, and extend maintenance intervals while improving heat radiation efficiency."
            keywords={['Anti-Oxidation', 'Lining Protection', 'Heat Radiation', 'Durability']}
            imageSrc="/tech-coating.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Technologies;