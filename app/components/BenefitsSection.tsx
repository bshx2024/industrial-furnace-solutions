import React from 'react';

import { Percent, TrendingDown, Clock, BarChart3 } from 'lucide-react';



const BenefitCard: React.FC<{ icon: React.ReactNode; range: string; label: string; description: string }> = ({ icon, range, label, description }) => (

    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center group">

        <div className="mb-6 p-4 rounded-full bg-slate-50 text-furnace-600 group-hover:bg-furnace-600 group-hover:text-white transition-colors">

            {icon}

        </div>

        <div className="text-4xl font-heading font-black text-industrial-950 mb-2">

            {range}

        </div>

        <div className="text-furnace-600 font-bold uppercase tracking-widest text-xs mb-4">

            {label}

        </div>

        <p className="text-gray-500 leading-relaxed text-sm">

            {description}

        </p>

    </div>

);



const BenefitsSection: React.FC = () => {

    return (

        <section className="py-24 bg-white">

            <div className="container mx-auto px-4 md:px-6">

                <div className="text-center max-w-3xl mx-auto mb-20">

                    <span className="text-furnace-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Proven Performance</span>

                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-8">

                        Typical Results from T80-level Reheating Furnace Upgrades

                    </h2>

                    <p className="text-gray-500 text-lg">

                        Our benchmarks are based on the China Iron and Steel Association T80 extreme efficiency list and real-world results from the Jinnan Steel project.

                    </p>

                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <BenefitCard

                        icon={<TrendingDown size={32} />}

                        range="7-15%"

                        label="Fuel Consumption"

                        description="Typical reduction range in fuel used per ton of steel after comprehensive upgrade."

                    />

                    <BenefitCard

                        icon={<Percent size={32} />}

                        range="5-15%"

                        label="Oxidation Scale"

                        description="Significant reduction in surface oxidation loss during the reheating process."

                    />

                    <BenefitCard

                        icon={<BarChart3 size={32} />}

                        range="0.1-0.3%"

                        label="Yield Improvement"

                        description="Overall increase in saleable product through optimized thermal management."

                    />

                    <BenefitCard

                        icon={<Clock size={32} />}

                        range="1-2 Years"

                        label="Payback Period"

                        description="Typical ROI timeframe under performance-based energy steward contracts."

                    />

                </div>



                <div className="mt-16 p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="max-w-xl">

                        <h3 className="text-2xl font-heading font-bold mb-4 italic">The exact performance depends on each plant's baseline and process, but our projects are engineered to achieve T80-level benchmarks.</h3>

                    </div>

                    <div className="shrink-0">

                        <div className="bg-furnace-600 text-xs font-bold px-4 py-2 rounded-sm border border-furnace-500 mb-2">EXTREME EFFICIENCY LIST</div>

                        <div className="text-gray-400 text-xs">CISA T80 STANDARDS COMPLIANT</div>

                    </div>

                </div>

            </div>

        </section>

    );

};



export default BenefitsSection;

