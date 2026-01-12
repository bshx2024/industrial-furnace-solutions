import React from 'react';
import { Award, FileText, CheckCircle } from 'lucide-react';

const SocialProof: React.FC = () => {
  return (
    <section id="recognition" className="py-24 bg-industrial-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block">Industry Recognition</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
            Recognized by Leading Steel Industry Bodies
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-furnace-500/30 transition-all group">
              <div className="bg-furnace-600/10 p-4 rounded-xl text-furnace-500 group-hover:bg-furnace-600 group-hover:text-white transition-all">
                <Award size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">T80 Extreme Efficiency Listed</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Listed in the 2024 ‘Extreme Energy Efficiency Technologies (T80)’ of China Iron and Steel Association for full-fiber furnace roof, intelligent reheating, and high-emissivity coatings.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-furnace-500/30 transition-all group">
              <div className="bg-furnace-600/10 p-4 rounded-xl text-furnace-500 group-hover:bg-furnace-600 group-hover:text-white transition-all">
                <CheckCircle size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Jinnan Steel Demonstration Project</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Project launched at JINNAN STEEL GROUP as a ‘green, low-carbon demonstration and high-efficiency resource utilization benchmark’.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 relative">
            <div className="absolute -inset-4 bg-furnace-600/20 blur-3xl rounded-full opacity-50"></div>
            <div className="bg-white/10 rounded-2xl p-2 aspect-[3/4] border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-industrial-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                <span className="text-xs font-bold uppercase tracking-widest px-4 text-center">T80 Extreme Efficiency Technology Catalogue</span>
              </div>
              <img src="/t80-doc.png" alt="T80 Catalogue" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="bg-white/10 rounded-2xl p-2 aspect-[3/4] border border-white/10 relative overflow-hidden group translate-y-8 shadow-2xl">
              <div className="absolute inset-0 bg-industrial-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                <span className="text-xs font-bold uppercase tracking-widest px-4 text-center">Jinnan Steel Demonstration Site</span>
              </div>
              <img src="/jinnan-site.png" alt="Jinnan Steel Site" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;