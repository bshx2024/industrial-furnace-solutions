import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

const PerformanceList: React.FC = () => {
    const sections = [
        {
            title: "Strip Steel (带钢)",
            projects: [
                { client: "Qian'an Jiujiang Wire Rod", detail: "1250 mm Strip 220t/h Reheating Furnace" },
                { client: "Shanxi Gaoyi Iron & Steel", detail: "1250 mm Strip 210t/h Cold Charging" },
                { client: "Tangshan Guotang Steel", detail: "1100 mm Strip 200t/h Reheating Furnace" },
                { client: "Shanxi Gaoyi", detail: "1000mm Strip 180t/h Reheating Furnace" },
                { client: "Guangxi Liugang Zhongjin", detail: "850 mm Stainless Strip 150t/h" },
                { client: "Guangdong Fogang Jincheng", detail: "650 mm Strip 180t/h & 120t/h" },
            ]
        },
        {
            title: "Bar & Wire (棒线材)",
            projects: [
                { client: "Bangladesh KSRM Steel", detail: "150t/h Side Charge/Discharge Furnace", isInternational: true },
                { client: "Vietnam Shengli (Thang Long)", detail: "120t/h Cold Charging Furnace", isInternational: true },
                { client: "Indonesia DCP Steel", detail: "100t/h Dual Fuel (Gas/Natural Gas)", isInternational: true },
                { client: "Malaysia Ann Joo Steel", detail: "90t/h Dual Fuel Reheating Furnace", isInternational: true },
                { client: "Ethiopia Steel Plant", detail: "50t/h Oil/Gas Dual Fuel Furnace", isInternational: true },
                { client: "Binxin Steel", detail: "250t/h Regenerative Walking Beam Furnace" },
                { client: "Dazhou Steel Group", detail: "240t/h & 220t/h BFG Regenerative Furnaces" },
            ]
        },
        {
            title: "Section Steel (型材)",
            projects: [
                { client: "Guangxi Chiji Steel", detail: "Section Steel Production Line" },
                { client: "Shanxi Jinnan Steel", detail: "Strategic Energy Steward Project" },
                { client: "Shanxi Jinniu Steel", detail: "Section Steel Energy Optimization" },
            ]
        }
    ];

    return (
        <div className="bg-white">
            <section className="pt-40 pb-20 bg-industrial-950 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Global Performance Portfolio</h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Proven track record across <span className="text-furnace-500 font-bold">nearly 100 production lines</span> globally, delivering extreme energy efficiency to leading steel producers.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="space-y-20">
                        {sections.map((section, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px flex-grow bg-slate-200 group-hover:bg-furnace-300 transition-colors"></div>
                                    <h2 className="text-2xl font-heading font-black text-industrial-900 uppercase tracking-widest px-4">
                                        {section.title}
                                    </h2>
                                    <div className="h-px flex-grow bg-slate-200 group-hover:bg-furnace-300 transition-colors"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {section.projects.map((project, pIdx) => (
                                        <div key={pIdx} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-furnace-200 transition-all group/card">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-bold text-industrial-950 group-hover/card:text-furnace-600 transition-colors">
                                                    {project.client}
                                                </h4>
                                                {project.isInternational && (
                                                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                                        <Globe size={10} /> International
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">
                                                {project.detail}
                                            </p>
                                            <div className="flex items-center gap-1 text-furnace-600 font-bold text-xs group/link cursor-pointer">
                                                View Technical Docs <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PerformanceList;
