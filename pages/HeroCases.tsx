import React from 'react';
import { ShieldCheck, TrendingDown, Layers, Zap } from 'lucide-react';

const HeroCase: React.FC<{
    title: string;
    client: string;
    metric: string;
    result: string;
    desc: string;
    image: string;
    isReversed?: boolean;
}> = ({ title, client, metric, result, desc, image, isReversed }) => (
    <div className={`flex flex-col lg:flex-row items-stretch gap-0 rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-100 mb-20 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        <div className="lg:w-1/2 relative group overflow-hidden bg-slate-200 min-h-[400px]">
            <img
                src={image}
                alt={client}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-industrial-950/40 group-hover:bg-industrial-950/20 transition-colors"></div>
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <span className="text-white/80 text-[10px] uppercase tracking-[0.2em] font-black block mb-2">Authenticated Evidence</span>
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-white rounded-lg p-1">
                        <img src={image} className="w-full h-full object-contain" alt="thumbnail" />
                    </div>
                    <p className="text-white text-xs font-medium">Stamped documentation available for technical review.</p>
                </div>
            </div>
        </div>
        <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <span className="text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block">{title}</span>
            <h3 className="text-3xl font-heading font-bold text-industrial-900 mb-6">{client}</h3>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">{metric}</p>
                    <p className="text-4xl font-heading font-black text-industrial-900 tracking-tighter">{result}</p>
                </div>
                <div className="flex items-end pb-1">
                    <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                        <ShieldCheck size={12} /> Verified Data
                    </div>
                </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
                {desc}
            </p>

            <button className="flex items-center gap-2 text-industrial-950 font-bold hover:text-furnace-600 transition-colors group/btn">
                Full Technical Report <TrendingDown size={18} className="group-hover/btn:translate-y-1 transition-transform" />
            </button>
        </div>
    </div>
);

const HeroCases: React.FC = () => {
    return (
        <div className="bg-slate-50">
            <section className="pt-40 pb-20 bg-industrial-950 text-white text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">High-Conversion Case Studies</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Data-driven results from the field, authenticated by client-stamped proof and technical audits.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <HeroCase
                        title="Extreme Energy Optimization"
                        client="Sichuan Desheng Group"
                        metric="Comprehensive Saving"
                        result=">30%"
                        desc="Significant reduction in gas consumption per ton of steel through integrated AI combustion control and full-fiber roof modernization."
                        image="/南方科技公司业绩/四川德胜.png"
                    />

                    <HeroCase
                        title="Surface Quality & Yield"
                        client="Jiangsu Binxin Steel"
                        metric="Oxidation Scale"
                        result="<0.4%"
                        desc="Implementation of intelligent atmosphere control achieving domestic leading levels of oxidation loss reduction and yield improvement."
                        isReversed
                        image="/南方科技公司业绩/江苏镔鑫.png"
                    />

                    <HeroCase
                        title="Efficiency Modernization"
                        client="Fangda Special Steel"
                        metric="Gas Consumption"
                        result="-21.8%"
                        desc="Modernization project drop gas consumption from 228m³/t down to 178.3m³/t through systematic thermal optimization."
                        image="/南方科技公司业绩/江西大方.png"
                    />

                    <HeroCase
                        title="Structural Retrofit"
                        client="Fogang Jincheng"
                        metric="Fuel Saving"
                        result=">15%"
                        desc="Full-fiber furnace roof retrofit demonstration showing rapid ROI and significant reduction in thermal inertia and standby heat loss."
                        isReversed
                        image="/南方科技公司业绩/佛冈金城.png"
                    />
                </div>
            </section>

            <section className="py-20 bg-industrial-900 text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-8">Ready for Your Free ROI Audit?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Connect with our 'Energy Steward' specialists to analyze your current baseline and project potential savings based on these benchmarks.
                    </p>
                    <button className="px-10 py-4 bg-furnace-600 hover:bg-furnace-500 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-furnace-500/20 active:scale-95">
                        Get Free ROI Audit
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HeroCases;
