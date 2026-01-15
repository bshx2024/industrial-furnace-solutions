import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

const Solutions: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="pt-40 pb-20 bg-industrial-950 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Integrated Energy-Saving Solutions</h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Integrated energy-saving solution for reheating furnaces and soaking pits in steel rolling mills, built around the ‘energy steward’ model pioneered with Jinnan Steel.
                    </p>
                </div>
            </section>

            {/* Scope Section */}
            <section className="py-20 border-b border-slate-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-6">Process Scope</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Our solutions address the entire thermal journey of the steel product, ensuring consistency and efficiency from start to finish.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Continuous caster exit",
                                    "Soaking pits integration",
                                    "Walking beam reheating furnaces",
                                    "Walking hearth reheating furnaces",
                                    "Rolling mill entry synchronization"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-center text-gray-700">
                                        <CheckCircle2 size={18} className="text-furnace-500" />
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 bg-slate-50 p-8 rounded-2xl border border-slate-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-furnace-600 font-black text-6xl mb-2">T80</div>
                                <div className="text-industrial-900 font-bold uppercase tracking-widest text-sm">Extreme Efficiency Standards</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-12 text-center">Pain Points & Solution Strategy</h2>
                    <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-industrial-950 text-white">
                                    <th className="p-6 font-heading uppercase tracking-widest text-sm">Pain Point</th>
                                    <th className="p-6 font-heading uppercase tracking-widest text-sm">Solution Module</th>
                                    <th className="p-6 font-heading uppercase tracking-widest text-sm">Expected Direction</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> High fuel consumption
                                        </div>
                                        <p className="text-xs text-gray-500">Inefficient insulation and unoptimized burner control leading to excessive gas/fuel bills.</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> Full-fiber roof + combustion optimization
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">Fuel consumption: {'>'}10% reduction target (Full Fiber Roof)</div>
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">Fuel consumption: {'>'}5% reduction (Smart Combustion)</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">Combined modernization targets to achieve T80 extreme efficiency benchmarks.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> High oxidation scale loss
                                        </div>
                                        <p className="text-xs text-gray-500">Excessive furnace atmosphere leading to metal surface loss.</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> Non-ceramic coatings + intelligent reheating
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">Oxidation Loss: 0.1%–0.5% reduction target</div>
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">Yield: +0.1–0.5 percentage points improvement</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">Domestic leading levels achievement based on T80-validated intelligent reheating and functional coatings.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> Unstable furnace temp
                                        </div>
                                        <p className="text-xs text-gray-500">Inconsistent heating quality affecting the subsequent rolling stage.</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> Intelligent reheating control (AI)
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">Exit temperature hit rate: {'>'}95% design target</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">AI-supported intelligent reheating aims to keep reheating furnace exit temperature within tight bands, reducing downstream quality deviations.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> Frequent maintenance
                                        </div>
                                        <p className="text-xs text-gray-500">Short lifespan of traditional furnace linings under extreme thermal cycling.</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> Enhanced linings & coatings
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">Maintenance intervals: extended by one major shutdown cycle (target)</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">Full-fiber roof and non-ceramic functional coatings are designed to reduce lining wear and unplanned shutdowns; actual intervals depend on your operation profile.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 text-center px-4 max-w-4xl mx-auto">
                        <p className="text-xs text-gray-400 italic font-medium">
                            All target ranges are based on China Iron and Steel Association's T80 extreme energy efficiency benchmarks and similar reheating furnace retrofit cases. Actual performance will be determined after baseline assessment at your plant.
                        </p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-16">How it Works</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">01</div>
                            <div className="text-blue-900 font-bold text-sm">Data Collection</div>
                        </div>
                        <div className="hidden md:block text-slate-300">→</div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">02</div>
                            <div className="text-blue-900 font-bold text-sm">Process Simulation</div>
                        </div>
                        <div className="hidden md:block text-slate-300">→</div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">03</div>
                            <div className="text-blue-900 font-bold text-sm">Modernization</div>
                        </div>
                        <div className="hidden md:block text-slate-300">→</div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">04</div>
                            <div className="text-blue-900 font-bold text-sm">Online Optimization</div>
                        </div>
                        <div className="hidden md:block text-slate-300">→</div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">05</div>
                            <div className="text-blue-900 font-bold text-sm">Long-term Steward</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Solutions;
