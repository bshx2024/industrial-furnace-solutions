import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingDown, Layers, Zap, X, FileText, ChevronRight, Globe, Info, Search } from 'lucide-react';
import { Link } from 'react-router';
import PerformanceList from './PerformanceList';
import { useLanguage, translations } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = ({ location }) => {
    const lang = location.pathname.startsWith('/vi') ? 'vi' : 'en';
    const t = translations[lang];
    return [
        { title: `${t['nav.heroCases']} | EcoReheating` },
        { name: "description", content: t['cases.subtitle'] },
    ];
};

interface CaseDossierData {
    translatedKeys: string[];
    introKey: string;
    dateKey: string;
}

const CAS_DOSSIER_DATA: Record<string, CaseDossierData> = {
    "Sichuan Desheng Group": {
        translatedKeys: [
            'cases.desheng.trans1',
            'cases.desheng.trans2',
            'cases.desheng.trans3',
            'cases.desheng.trans4'
        ],
        introKey: 'cases.desheng.intro',
        dateKey: 'cases.desheng.reportDate'
    },
    "Jiangsu Binxin Steel": {
        translatedKeys: [
            'cases.binxin.trans1',
            'cases.binxin.trans2',
            'cases.binxin.trans3',
            'cases.binxin.trans4'
        ],
        introKey: 'cases.binxin.intro',
        dateKey: 'cases.binxin.reportDate'
    },
    "Fangda Special Steel": {
        translatedKeys: [
            'cases.fangda.trans1',
            'cases.fangda.trans2',
            'cases.fangda.trans3',
            'cases.fangda.trans4'
        ],
        introKey: 'cases.fangda.intro',
        dateKey: 'cases.fangda.reportDate'
    },
    "Fogang Jincheng": {
        translatedKeys: [
            'cases.jincheng.trans1',
            'cases.jincheng.trans2',
            'cases.jincheng.trans3',
            'cases.jincheng.trans4'
        ],
        introKey: 'cases.jincheng.intro',
        dateKey: 'cases.jincheng.reportDate'
    }
};

const CaseDossier: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    client: string;
    image: string;
}> = ({ isOpen, onClose, client, image }) => {
    const { t } = useLanguage();
    const data = CAS_DOSSIER_DATA[client];

    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-industrial-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
                {/* Left Side: Original Document View */}
                <div className="w-full md:w-1/2 bg-slate-100 flex flex-col border-r border-slate-200">
                    <div className="p-4 bg-slate-200/50 flex justify-between items-center text-left">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-industrial-600" />
                            <span className="text-xs font-bold uppercase tracking-widest text-industrial-900">{t('cases.dossierOriginal')}</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-white/80 rounded border border-slate-300">
                            <Search size={12} className="text-slate-400" />
                            <span className="text-[10px] text-slate-500 font-medium">{t('cases.dossierVerified')}</span>
                        </div>
                    </div>
                    <div className="flex-grow overflow-auto p-4 md:p-8 flex items-center justify-center">
                        <div className="bg-white shadow-xl border border-slate-300 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[90%] md:max-w-full">
                            <img src={image} alt={`Official signed verification report for ${client}`} className="w-full h-auto shadow-sm" />
                        </div>
                    </div>
                </div>

                {/* Right Side: Translation and Introduction */}
                <div className="w-full md:w-1/2 flex flex-col bg-white overflow-y-auto">
                    <div className="p-4 bg-industrial-950 flex justify-between items-center sticky top-0 z-10">
                        <div className="flex items-center gap-2 text-white">
                            <Globe size={18} className="text-furnace-500" />
                            <span className="text-xs font-bold uppercase tracking-widest">{t('cases.dossierTwin')}</span>
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
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{t('cases.dossierContext')}</h4>
                            </div>
                            <p className="text-industrial-900 font-medium leading-relaxed border-l-4 border-furnace-500 pl-6 text-sm text-left">
                                {t(data.introKey)}
                            </p>
                        </section>

                        {/* Translation Blocks */}
                        <section className="space-y-8">
                            {data.translatedKeys.map((key, idx) => (
                                <div key={idx} className="group flex flex-col gap-3">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <p className="text-industrial-900 font-bold leading-relaxed">
                                                {t(key)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Footer Metadata */}
                        <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                            <div className="text-left">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{t('cases.dossierDate')}</p>
                                <p className="text-industrial-950 font-bold text-sm">{t(data.dateKey)}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                <ShieldCheck size={12} /> {t('cases.dossierAuth')}
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
    companySummary?: string;
    metric: string;
    result: string;
    desc: string;
    image: string;
    isReversed?: boolean;
    onOpenDossier?: () => void;
}> = ({ title, client, companySummary, metric, result, desc, image, isReversed, onOpenDossier }) => {
    const { t } = useLanguage();
    return (
        <div className={`flex flex-col lg:flex-row items-stretch gap-0 rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-100 mb-20 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
            {/* Portrait Document Area */}
            <div className="lg:w-[40%] relative group overflow-hidden bg-industrial-950 p-12 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-furnace-500 via-transparent to-transparent"></div>
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                <div
                    className="relative z-10 w-full aspect-[3/4] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] transition-transform duration-700 cursor-pointer overflow-hidden rounded-sm"
                    onClick={onOpenDossier}
                >
                    <img
                        src={image}
                        alt={`Third-party verified performance report for ${client}`}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-furnace-600/0 group-hover:bg-furnace-600/10 transition-colors flex items-center justify-center">
                        <div className="bg-white p-3 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 translate-y-4 group-hover:translate-y-0 duration-500">
                            <Search className="text-furnace-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-4 text-left">
                    <div className="w-10 h-10 bg-white rounded p-1 shrink-0">
                        <img src={image} className="w-full h-full object-contain" alt="Report icon" />
                    </div>
                    <div>
                        <span className="text-white/80 text-[8px] uppercase tracking-[0.2em] font-black block">{t('cases.authPlate')}</span>
                        <p className="text-white text-[10px] font-medium leading-tight">{t('cases.clickExpand')}</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-[60%] p-12 flex flex-col justify-center text-left">
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
                                <span className="px-2 py-0.5 bg-industrial-900 text-white text-[8px] font-black uppercase tracking-widest rounded whitespace-nowrap">{t('cases.peakPerformance')}</span>
                            )}
                        </div>
                        {result === "≥30%" && (
                            <p className="text-[9px] text-gray-400 mt-1 italic leading-tight">{t('cases.includesFuel')}</p>
                        )}
                    </div>
                    <div className="flex items-end pb-1">
                        <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                            <ShieldCheck size={12} /> {t('cases.verifiedData')}
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
                    {t('cases.reportBtn')} <TrendingDown size={18} className="group-hover/btn:translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

const HeroCases: React.FC = () => {
    const { t, l } = useLanguage();
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
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('cases.title')}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t('cases.subtitle')}
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <HeroCase
                        title={t('cases.desheng.title')}
                        client="Sichuan Desheng Group"
                        companySummary={t('cases.desheng.summary')}
                        metric={t('cases.desheng.metric')}
                        result="≥30%"
                        desc={t('cases.desheng.desc')}
                        image="/desheng.png"
                        onOpenDossier={() => setDossierClient("Sichuan Desheng Group")}
                    />

                    <HeroCase
                        title={t('cases.binxin.title')}
                        client="Jiangsu Binxin Steel"
                        companySummary={t('cases.binxin.summary')}
                        metric={t('cases.binxin.metric')}
                        result="<0.4%"
                        desc={t('cases.binxin.desc')}
                        isReversed
                        image="/binxin.png"
                        onOpenDossier={() => setDossierClient("Jiangsu Binxin Steel")}
                    />

                    <HeroCase
                        title={t('cases.fangda.title')}
                        client="Fangda Special Steel"
                        companySummary={t('cases.fangda.summary')}
                        metric={t('cases.fangda.metric')}
                        result="-21.8%"
                        desc={t('cases.fangda.desc')}
                        image="/dafang.png"
                        onOpenDossier={() => setDossierClient("Fangda Special Steel")}
                    />

                    <HeroCase
                        title={t('cases.jincheng.title')}
                        client="Fogang Jincheng"
                        companySummary={t('cases.jincheng.summary')}
                        metric={t('cases.jincheng.metric')}
                        result=">15%"
                        desc={t('cases.jincheng.desc')}
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
                    <h2 className="text-3xl font-heading font-bold mb-8">{t('cases.readyTitle')}</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        {t('perf.ctaDesc')}
                    </p>
                    <Link
                        to={l('/about#assessment')}
                        className="inline-block px-10 py-4 bg-furnace-600 hover:bg-furnace-500 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-furnace-500/20 active:scale-95"
                    >
                        {t('cases.readyBtn')}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HeroCases;
