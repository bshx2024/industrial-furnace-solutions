import React from 'react';

import { Target, TrendingUp, Shield } from 'lucide-react';



const ProjectPositioning: React.FC = () => {

    return (

        <section className="py-24 bg-slate-50">

            <div className="container mx-auto px-4 md:px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-8 leading-tight">

                            Why Choose the <span className="text-furnace-600">Energy Steward Solution</span>?

                        </h2>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">

                            <span className="text-industrial-950 font-bold">EcoReheating</span> provides Zero CAPEX reheating furnace optimization using <span className="text-industrial-950 font-bold">CISA T80 verified technologies</span> like narrow window temperature control and full-fiber roofs, helping steel mills reduce fuel consumption by <span className="text-furnace-600 font-bold">7-15%</span>.

                        </p>

                        <p className="text-lg text-gray-500 mb-8">

                            Developed by South Technology, this industry-defining solution — now a national benchmark — optimizes the entire thermal journey from <span className="font-semibold italic">continuous caster exit</span> to <span className="font-semibold italic">reheating furnace exit</span>.

                        </p>

                    </div>



                    <div className="space-y-6">

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6">

                            <div className="bg-furnace-100 p-4 rounded-lg h-fit">

                                <Target className="text-furnace-600" size={32} />

                            </div>

                            <div>

                                <h3 className="text-xl font-bold text-industrial-900 mb-2">Maximize Heating Capacity</h3>

                                <p className="text-gray-500">Eliminate bottlenecks in the reheating process to ensure peak production throughput.</p>

                            </div>

                        </div>



                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6">

                            <div className="bg-furnace-100 p-4 rounded-lg h-fit">

                                <TrendingUp className="text-furnace-600" size={32} />

                            </div>

                            <div>

                                <h3 className="text-xl font-bold text-industrial-900 mb-2">Optimize Reheating Process</h3>

                                <p className="text-gray-500">Advanced AI and process simulation to achieve precise thermal curves and minimum fuel usage.</p>

                            </div>

                        </div>



                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6">

                            <div className="bg-furnace-100 p-4 rounded-lg h-fit">

                                <Shield className="text-furnace-600" size={32} />

                            </div>

                            <div>

                                <h3 className="text-xl font-bold text-industrial-900 mb-2">Zero-Downtime Reliability</h3>

                                <p className="text-gray-500">Long-term expert steward service ensuring equipment longevity and consistent performance.</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};



export default ProjectPositioning;

