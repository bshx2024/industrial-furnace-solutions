import React from 'react';
import { Target, CheckCircle, Database, BarChart4 } from 'lucide-react';
import { useLanguage, translations } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = ({ location }) => {
    const lang = location.pathname.startsWith('/vi') ? 'vi' : 'en';
    const t = translations[lang];
    return [
        { title: `${t['nav.caseStudies']} | EcoReheating` },
        { name: "description", content: t['case.subtitle'] },
    ];
};

const CaseStudies: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white">

            {/* Hero Section */}
            <section className="pt-40 pb-20 bg-industrial-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-furnace-600/30 animate-pulse"></div>
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <span className="text-furnace-500 font-black tracking-widest uppercase text-xs mb-4 block">{t('case.badge')}</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('case.title')}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t('case.subtitle')}
                    </p>
                </div>
            </section>

            {/* Project Overview */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-6 underline decoration-furnace-500 underline-offset-8">{t('case.plantTitle')}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {t('case.plantDesc')}
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 italic text-gray-500 border-l-4 border-l-furnace-600">
                                "{t('case.quote')}"
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                                    <Target className="text-furnace-600 shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-industrial-950 mb-1">{t('case.feature1Title')}</h4>
                                        <p className="text-xs text-gray-500">{t('case.feature1Desc')}</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                                    <CheckCircle className="text-green-500 shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-industrial-950 mb-1">{t('case.feature2Title')}</h4>
                                        <p className="text-xs text-gray-500">{t('case.feature2Desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-industrial-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-furnace-600 rounded-full blur-3xl opacity-20"></div>
                            <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                                <Database className="text-furnace-500" /> {t('case.scopeTitle')}
                            </h3>
                            <ul className="space-y-8">
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-furnace-500 mt-2 shrink-0"></div>
                                    <div>
                                        <h4 className="font-bold mb-1">{t('case.scopeItem1Title')}</h4>
                                        <p className="text-sm text-gray-400">{t('case.scopeItem1Desc')}</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-furnace-500 mt-2 shrink-0"></div>
                                    <div>
                                        <h4 className="font-bold mb-1">{t('case.scopeItem2Title')}</h4>
                                        <p className="text-sm text-gray-400">{t('case.scopeItem2Desc')}</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-furnace-500 mt-2 shrink-0"></div>
                                    <div>
                                        <h4 className="font-bold mb-1">{t('case.scopeItem3Title')}</h4>
                                        <p className="text-sm text-gray-400">{t('case.scopeItem3Desc')}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Results */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-heading font-bold text-industrial-900">{t('case.targetsTitle')}</h2>
                        <p className="text-gray-500 mt-4 italic">{t('case.targetsSubtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="text-furnace-600 font-heading font-black text-4xl mb-2">7-15%</div>
                            <div className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-4">{t('case.target1Title')}</div>
                            <p className="text-gray-400 text-xs text-left">{t('case.target1Desc')}</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center font-bold">
                            <div className="text-furnace-600 font-heading font-black text-4xl mb-2">5-15%</div>
                            <div className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-4">{t('case.target2Title')}</div>
                            <p className="text-gray-400 text-xs text-left font-normal">{t('case.target2Desc')}</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="text-furnace-600 font-heading font-black text-4xl mb-2">0.1-0.3%</div>
                            <div className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-4">{t('case.target3Title')}</div>
                            <p className="text-gray-400 text-xs text-left">{t('case.target3Desc')}</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col justify-center">
                            <BarChart4 className="mx-auto text-furnace-600 mb-2" size={32} />
                            <div className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-2 font-heading">{t('case.target4Title')}</div>
                            <p className="text-gray-400 text-[10px] leading-tight font-light">{t('case.target4Desc')}</p>
                        </div>
                    </div>

                    <div className="mt-20 p-8 rounded-2xl bg-white border border-slate-200">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="bg-furnace-100 p-6 rounded-2xl">
                                <Database className="text-furnace-600" size={48} />
                            </div>
                            <div>
                                <h4 className="text-industrial-950 font-bold text-xl mb-2 uppercase tracking-tight">{t('case.noteTitle')}</h4>
                                <p className="text-gray-500 leading-relaxed italic">
                                    {t('case.noteDesc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudies;
