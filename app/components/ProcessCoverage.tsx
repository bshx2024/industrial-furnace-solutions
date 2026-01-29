import React from 'react';

import { ArrowRightCircle, MoveDown, Layers, Construction, Zap } from 'lucide-react';



const ProcessStep: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (

    <div className="flex flex-col items-center group">

        <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-furnace-50 group-hover:border-furnace-200 transition-all">

            {icon}

        </div>

        <span className="text-gray-700 font-bold text-center text-sm md:text-base">{label}</span>

    </div>

);



const ProcessCoverage: React.FC = () => {

    return (

        <section className="py-24 bg-industrial-950 text-white relative overflow-hidden">

            {/* Decorative patterns */}

            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-furnace-600/5 to-transparent pointer-events-none"></div>



            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">

                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">From Continuous Caster to Furnace Discharge</h2>

                    <p className="text-gray-400 text-lg">

                        Unlocking Hidden Efficiency across the entire reheating process, not just single equipment retrofits. We optimize the complete thermal flow.

                    </p>

                </div>



                <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto relative px-10">

                    {/* Connector line for desktop */}

                    <div className="absolute top-10 left-32 right-32 h-[2px] bg-gradient-to-r from-furnace-500/20 via-furnace-500 to-furnace-500/20 hidden md:block"></div>



                    <ProcessStep icon={<ArrowRightCircle className="text-furnace-500" size={32} />} label="Continuous Casting Exit" />



                    <ProcessStep icon={<Layers className="text-furnace-500" size={32} />} label="Soaking Pits" />



                    <ProcessStep icon={<Construction className="text-furnace-500" size={32} />} label="Reheating Furnace" />



                    <ProcessStep icon={<Zap className="text-furnace-500" size={32} />} label="Rolling Mill Entry" />

                </div>



                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">

                        <h4 className="text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs">Phase 1</h4>

                        <p className="text-sm text-gray-300">Synchronized temperature management at the caster exit to preserve latent heat.</p>

                    </div>

                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">

                        <h4 className="text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs">Phase 2</h4>

                        <p className="text-sm text-gray-300">Advanced soaking pit energy saving project integration.</p>

                    </div>

                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">

                        <h4 className="text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs">Phase 3</h4>

                        <p className="text-sm text-gray-300">T80-listed retrofits for the main reheating furnace body.</p>

                    </div>

                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">

                        <h4 className="text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs">Phase 4</h4>

                        <p className="text-sm text-gray-300">Intelligent mill-pacing integration for optimized entry temperature.</p>

                    </div>

                </div>

            </div>

        </section>

    );

};



export default ProcessCoverage;

