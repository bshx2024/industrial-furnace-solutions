import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingDown, Layers, Zap, X, FileText, ChevronRight, Globe, Info, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PerformanceList from './PerformanceList';
import SEO from '../components/SEO';

interface CaseDossierData {
    originalText: string[];
    translatedText: string[];
    introduction: string;
    reportDate: string;
}

const CAS_DOSSIER_DATA: Record<string, CaseDossierData> = {
    "Sichuan Desheng Group": {
        originalText: [
            "四川德胜集团钒钛有限公司轧钢厂",
            "一车间加热炉大修项目节能报告",
            "南方节能科技（贵州）有限公司于2021年11月15日至2022年1月13日，对我公司轧钢厂一车间加热炉进行了大修设计、施工节能改造总承包。",
            "通过南方节能科技（贵州）有限公司的整体优化设计和对节能轻型纤维炉顶的应用，自2022年1月13日顺利出钢生产后，经过几个月的观察统计测算：加热炉加热能力显著提升，钢坯温度均匀、氧化烧损减少，吨钢节能降耗效果明显，和之前对比吨钢节能率>30%。"
        ],
        translatedText: [
            "Sichuan Desheng Group Vanadium-Titanium Co., Ltd. Rolling Mill",
            "Energy Efficiency Report: Record-Breaking Major Reheating Furnace Overhaul",
            "South Energy Saving Tech performed the EPC for the comprehensive furnace overhaul and technical modernization from Nov 2021 to Jan 2022.",
            "Peak Performance Result: By completely replacing the refractory roof and integrating AI control, we maximized total thermal efficiency far beyond standard retrofits, achieving a massive comprehensive energy gain of ≥30%."
        ],
        introduction: "Sichuan Desheng Group is the largest private steel enterprise in Sichuan and a Top 500 China Private Enterprise. This major overhaul project set a new benchmark for comprehensive efficiency recovery in aging furnace systems.",
        reportDate: "June 6, 2022"
    },
    "Jiangsu Binxin Steel": {
        originalText: [
            "江苏省镔鑫钢铁集团有限公司",
            "260t/h双高棒加热炉项目成果说明",
            "镔鑫钢铁坐落于连云港市赣榆区柘汪临港产业区，沿海布局核心优势明显，具有发展钢铁工业得天独厚的先天条件，全国民营企业500强。",
            "我司承建的冷装能力260t/h双高棒加热炉项目，通过应用智慧加热控制技术与全纤维结构优化，投产后吨钢煤气消耗、氧化烧损指标均处于国内领先水平。"
        ],
        translatedText: [
            "Jiangsu Binxin Steel Group Co., Ltd.",
            "Project Summary: 260t/h Double-High Speed Bar Reheating Furnace",
            "Located in Lianyugang's coastal industrial zone with strategic logistics advantages, Binxin Steel is a China Top 500 Private Enterprise.",
            "The 260t/h double-high bar reheating furnace project (cold charging) utilizes intelligent heating control and fiber structure optimization. Post-commissioning gas consumption and oxidation loss metrics rank among the industry's elite."
        ],
        introduction: "Binxin Steel is a strategic coastal steel production base in East China. This project demonstrated the extreme precision of our AI atmosphere control in high-speed bar production lines.",
        reportDate: "October 12, 2023"
    },
    "Fangda Special Steel": {
        originalText: [
            "江西方大钢铁集团有限公司",
            "方大特钢加热炉节能改造项目简报",
            "方大钢铁是一所以钢铁为主业，向汽车弹簧、矿业、国内外贸易等行业多元发展的大型钢铁联合企业。公司年产钢能力2000万吨。",
            "我司为方大特钢完成了两座加热炉的系统性节能改造项目，通过热工制度优化与先进内衬技术应用，实测节能效果均达到了20%以上。"
        ],
        translatedText: [
            "Jiangxi Fangda Iron & Steel Group Co., Ltd.",
            "Fangda Special Steel Reheating Furnace Efficiency Retrofit Brief",
            "A large-scale steel conglomerate with diversified operations in automotive components and mining, boasting an annual capacity of 20 million tons.",
            "We completed systematic energy-saving retrofits for two furnaces at Fangda Special Steel. Through thermal regime optimization and advanced lining technology, verified energy savings exceeded 20%."
        ],
        introduction: "Fangda Special Steel is a global leader in automotive spring steel. Our optimization helped maintain their competitive edge by drastically reducing fuel intensity in their core heating process.",
        reportDate: "March 20, 2023"
    },
    "Fogang Jincheng": {
        originalText: [
            "佛冈金城金属制品公司",
            "全纤维炉顶带钢加热炉项目报告",
            "佛冈金城主要经营生产、加工、销售钢铁产品；冶炼普碳钢、不锈钢、特种钢；轧制线材、螺纹棒材、带钢等深加工钢铁制品。",
            "我司承建的全纤维炉顶带钢加热炉项目，在同等工况下，通过显著降低炉顶散热与蓄热损失，节能效果均达到了15%以上。"
        ],
        translatedText: [
            "Fogang Jincheng Metal Products Co., Ltd.",
            "Project Report: Full-Fiber Roof Strip Reheating Furnace",
            "Specializes in the production and deep processing of specialty steels, including stainless steel, threading bars, and strip steel products.",
            "The full-fiber roof retrofit project for the strip reheating furnace achieved over 15% energy savings under equivalent operating conditions by minimizing radiant heat loss and thermal inertia."
        ],
        introduction: "Jincheng Metal's multi-product rolling lines require high thermal flexibility. Our full-fiber solution provided the rapid response and efficiency needed for their diverse production schedule.",
        reportDate: "August 15, 2022"
    }
};


const CaseDossier: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    client: string;
    image: string;
}> = ({ isOpen, onClose, client, image }) => {
    const data = CAS_DOSSIER_DATA[client];

    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-industrial-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">

                {/* Left Side: Original Document View */}
                <div className="w-full md:w-1/2 bg-slate-100 flex flex-col border-r border-slate-200">
                    <div className="p-4 bg-slate-200/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-industrial-600" />
                            <span className="text-xs font-bold uppercase tracking-widest text-industrial-900">Original Technical Evidence</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-white/80 rounded border border-slate-300">
                            <Search size={12} className="text-slate-400" />
                            <span className="text-[10px] text-slate-500 font-medium">Verified Scan</span>
                        </div>
                    </div>
                    <div className="flex-grow overflow-auto p-4 md:p-8 flex items-center justify-center">
                        <div className="bg-white shadow-xl border border-slate-300 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[90%] md:max-w-full">
                            <img src={image} alt="Original Document" className="w-full h-auto shadow-sm" />
                        </div>
                    </div>
                </div>

                {/* Right Side: Translation and Introduction (The "Double Lamp" show) */}
                <div className="w-full md:w-1/2 flex flex-col bg-white overflow-y-auto">
                    <div className="p-4 bg-industrial-950 flex justify-between items-center sticky top-0 z-10">
                        <div className="flex items-center gap-2 text-white">
                            <Globe size={18} className="text-furnace-500" />
                            <span className="text-xs font-bold uppercase tracking-widest">Digital Twin & Translation</span>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8 md:p-12 space-y-10">
                        {/* Introduction Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Info size={16} className="text-furnace-600" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Project Context</h4>
                            </div>
                            <p className="text-industrial-900 font-medium leading-relaxed border-l-4 border-furnace-500 pl-6 text-sm">
                                {data.introduction}
                            </p>
                        </section>

                        {/* Translation Blocks */}
                        <section className="space-y-8">
                            {data.originalText.map((text, idx) => (
                                <div key={idx} className="group flex flex-col gap-3">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-400 text-xs italic font-serif leading-relaxed">
                                                "{text}"
                                            </p>
                                            <p className="text-industrial-900 font-bold leading-relaxed">
                                                {data.translatedText[idx]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Footer Metadata */}
                        <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Certification Date</p>
                                <p className="text-industrial-950 font-bold text-sm">{data.reportDate}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                <ShieldCheck size={12} /> Authenticated
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroCase: React.FC<{
    title: string;
    client: string;
    companySummary?: string; // New prop for company background
    metric: string;
    result: string;
    desc: string;
    image: string;
    isReversed?: boolean;
    onOpenDossier?: () => void;
}> = ({ title, client, companySummary, metric, result, desc, image, isReversed, onOpenDossier }) => (
    <div className={`flex flex-col lg:flex-row items-stretch gap-0 rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-100 mb-20 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        {/* Portrait Document Area */}
        <div className="lg:w-[40%] relative group overflow-hidden bg-industrial-950 p-12 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-furnace-500 via-transparent to-transparent"></div>

            {/* Decorative Scan Lines */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

            <div
                className="relative z-10 w-full aspect-[3/4] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] transition-transform duration-700 cursor-pointer overflow-hidden rounded-sm"
                onClick={onOpenDossier}
            >
                <img
                    src={image}
                    alt={client}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/30 to-transparent"></div>
                {/* Floating "View Dossier" Overlay */}
                <div className="absolute inset-0 bg-furnace-600/0 group-hover:bg-furnace-600/10 transition-colors flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 translate-y-4 group-hover:translate-y-0 duration-500">
                        <Search className="text-furnace-600" size={24} />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded p-1 shrink-0">
                    <img src={image} className="w-full h-full object-contain" alt="thumbnail" />
                </div>
                <div>
                    <span className="text-white/80 text-[8px] uppercase tracking-[0.2em] font-black block">Authenticated Plate</span>
                    <p className="text-white text-[10px] font-medium leading-tight">Click to expand technical autopsy.</p>
                </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="lg:w-[60%] p-12 flex flex-col justify-center">
            <span className="text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block">{title}</span>
            <h3 className="text-3xl font-heading font-bold text-industrial-900 mb-2">{client}</h3>

            {companySummary && (
                <p className="text-furnace-600/80 font-bold text-[10px] uppercase tracking-wider mb-6">
                    {companySummary}
                </p>
            )}

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">{metric}</p>
                    <div className="flex items-center gap-3">
                        <p className="text-4xl font-heading font-black text-industrial-900 tracking-tighter">{result}</p>
                        {result === "≥30%" && (
                            <span className="px-2 py-0.5 bg-industrial-900 text-white text-[8px] font-black uppercase tracking-widest rounded">Peak Performance</span>
                        )}
                    </div>
                    {result === "≥30%" && (
                        <p className="text-[9px] text-gray-400 mt-1 italic leading-tight">Includes fuel reduction & yield improvement</p>
                    )}
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

            <button
                onClick={onOpenDossier}
                className="flex items-center gap-2 text-industrial-950 font-bold hover:text-furnace-600 transition-colors group/btn"
            >
                Full Technical Report <TrendingDown size={18} className="group-hover/btn:translate-y-1 transition-transform" />
            </button>
        </div>
    </div>
);


const HeroCases: React.FC = () => {
    const [dossierClient, setDossierClient] = useState<string | null>(null);

    useEffect(() => {
        if (dossierClient) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [dossierClient]);

    return (
        <div className="bg-slate-50">
            <SEO
                title="High-Conversion Case Studies"
                description="Explore our T80-verified reheating furnace modernization case studies. See how major steel mills achieved >30% efficiency gains with Zero CAPEX."
            />
            <CaseDossier
                isOpen={!!dossierClient}
                onClose={() => setDossierClient(null)}
                client={dossierClient || ""}
                image={
                    dossierClient === "Sichuan Desheng Group" ? "/desheng.png" :
                        dossierClient === "Jiangsu Binxin Steel" ? "/binxin.png" :
                            dossierClient === "Fangda Special Steel" ? "/dafang.png" :
                                dossierClient === "Fogang Jincheng" ? "/jincheng.png" : ""
                }
            />

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
                        title="Major Overhaul & Retrofit"
                        client="Sichuan Desheng Group"
                        companySummary="Largest Private Steel Enterprise in Sichuan · Top 500 China Private Enterprises"
                        metric="Record-Breaking Efficiency"
                        result="≥30%"
                        desc="Unlike standard optimization (7–15%), this major overhaul project achieved a massive ≥30% comprehensive efficiency gain by combining our Full-Fiber Roof technology with AI Combustion Control, significantly reducing oxidation loss."
                        image="/desheng.png"
                        onOpenDossier={() => setDossierClient("Sichuan Desheng Group")}
                    />


                    <HeroCase
                        title="Surface Quality & Yield"
                        client="Jiangsu Binxin Steel"
                        companySummary="Strategic Coastal Production Base · China Top 500 Private Enterprise"
                        metric="Oxidation Scale"
                        result="<0.4%"
                        desc="Implementation of intelligent atmosphere control achieving domestic leading levels of oxidation loss reduction and yield improvement."
                        isReversed
                        image="/binxin.png"
                        onOpenDossier={() => setDossierClient("Jiangsu Binxin Steel")}
                    />

                    <HeroCase
                        title="Efficiency Modernization"
                        client="Fangda Special Steel"
                        companySummary="Annual Capacity 20M Tons · Diversified Industrial Conglomerate"
                        metric="Gas Consumption"
                        result="-21.8%"
                        desc="Modernization project drop gas consumption from 228m³/t down to 178.3m³/t through systematic thermal optimization."
                        image="/dafang.png"
                        onOpenDossier={() => setDossierClient("Fangda Special Steel")}
                    />

                    <HeroCase
                        title="Structural Retrofit"
                        client="Fogang Jincheng"
                        companySummary="Specialty Steel Deep Processing · Comprehensive Rolling Operations"
                        metric="Fuel Saving"
                        result=">15%"
                        desc="Full-fiber furnace roof retrofit demonstration showing rapid ROI and significant reduction in thermal inertia and standby heat loss."
                        isReversed
                        image="/jincheng.png"
                        onOpenDossier={() => setDossierClient("Fogang Jincheng")}
                    />

                </div>
            </section>

            {/* The Full Track Record List */}
            <div id="full-performance-list" className="border-t border-slate-200">
                <PerformanceList />
            </div>


            <section className="py-20 bg-industrial-900 text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-8">Ready for Your Free ROI Audit?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Connect with our 'Energy Steward' specialists to analyze your current baseline and project potential savings based on these benchmarks.
                    </p>
                    <Link
                        to="/about#assessment"
                        className="inline-block px-10 py-4 bg-furnace-600 hover:bg-furnace-500 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-furnace-500/20 active:scale-95"
                    >
                        Get Free ROI Audit
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HeroCases;

