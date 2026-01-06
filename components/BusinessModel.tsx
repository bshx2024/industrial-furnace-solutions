import React from 'react';
import { Search, PenTool, Wrench, BarChart4, CheckCircle2 } from 'lucide-react';

const ModelStep: React.FC<{ num: string; title: string; desc: string; icon: React.ReactNode }> = ({ num, title, desc, icon }) => (
    <div className="relative p-8 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-furnace-300 transition-colors">
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-industrial-950 text-white flex items-center justify-center font-heading font-black rounded-xl text-xl border-4 border-white">
            {num}
        </div>
        <div className="mb-6 text-furnace-600">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-industrial-900 mb-4">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const BusinessModel: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3">
                        <span className="text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block">Our Model</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-8 leading-tight">
                            The Zero-Risk "Energy Steward" Model
                        </h2>
                        <p className="text-gray-500 text-lg mb-8">
                            Eliminate the fear of ROI failure. We invest 100% of the capital—you only pay from the actual, verified savings we generate.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                                <span className="text-gray-700 font-medium">Cover equipment upgrades, repairs, and spare parts from shared savings.</span>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                                <span className="text-gray-700 font-medium">Align incentives: your savings are our revenue.</span>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                                <span className="text-gray-700 font-medium">Performance guaranteed by T80 benchmarks.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ModelStep
                            num="01"
                            icon={<Search size={40} />}
                            title="Assessment & Collection"
                            desc="Pre-assessment & data collection for reheating furnace and soaking pits baseline establish."
                        />
                        <ModelStep
                            num="02"
                            icon={<PenTool size={40} />}
                            title="Technical Solution"
                            desc="Full-fiber roof, intelligent reheating, non-ceramic coatings, and advanced controls integration."
                        />
                        <ModelStep
                            num="03"
                            icon={<Wrench size={40} />}
                            title="Retrofit & AI Tuning"
                            desc="On-site retrofitting, commissioning, and AI-enabled process optimization for maximum efficiency."
                        />
                        <ModelStep
                            num="04"
                            icon={<BarChart4 size={40} />}
                            title="Long-term Steward"
                            desc="Continuous maintenance and expert services with shared energy savings as compensation."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessModel;
