import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { useLanguage, translations } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = ({ location }) => {
    const lang = location.pathname.startsWith('/vi') ? 'vi' : 'en';
    const t = translations[lang];
    return [
        { title: `${t['solutions.title']} | EcoReheating` },
        { name: "description", content: t['solutions.subtitle'] },
    ];
};

const Solutions: React.FC = () => {
    const { t, l } = useLanguage();

    return (
        <div className="bg-white">

            {/* Page Header */}
            <section className="pt-40 pb-20 bg-industrial-950 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('solutions.title')}</h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        {t('solutions.subtitle')}
                    </p>
                </div>
            </section>

            {/* Scope Section */}
            <section className="py-20 border-b border-slate-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-6">{t('solutions.processScope')}</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {t('solutions.processDesc')}
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    t('solutions.scopeItem1'),
                                    t('solutions.scopeItem2'),
                                    t('solutions.scopeItem3'),
                                    t('solutions.scopeItem4'),
                                    t('solutions.scopeItem5')
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
                                <div className="text-industrial-900 font-bold uppercase tracking-widest text-sm">{t('calc.verified')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-12 text-center">{t('solutions.painPointsTitle')}</h2>
                    <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-industrial-950 text-white">
                                    <th className="p-6 font-heading uppercase tracking-widest text-sm">{t('solutions.tableHead1')}</th>
                                    <th className="p-6 font-heading uppercase tracking-widest text-sm">{t('solutions.tableHead2')}</th>
                                    <th className="p-6 font-heading uppercase tracking-widest text-sm">{t('solutions.tableHead3')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> {t('solutions.painPoint1Title')}
                                        </div>
                                        <p className="text-xs text-gray-500">{t('solutions.painPoint1Desc')}</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> {t('solutions.solution1Title')}
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">{t('solutions.direction1_1')}</div>
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">{t('solutions.direction1_2')}</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">{t('solutions.direction1Footer')}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> {t('solutions.painPoint2Title')}
                                        </div>
                                        <p className="text-xs text-gray-500">{t('solutions.painPoint2Desc')}</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> {t('solutions.solution2Title')}
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">{t('solutions.direction2_1')}</div>
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">{t('solutions.direction2_2')}</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">{t('solutions.direction2Footer')}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> {t('solutions.painPoint3Title')}
                                        </div>
                                        <p className="text-xs text-gray-500">{t('solutions.painPoint3Desc')}</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> {t('solutions.solution3Title')}
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">{t('solutions.direction3_1')}</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">{t('solutions.direction3Footer')}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-900 mb-2">
                                            <AlertTriangle size={16} className="text-red-500" /> {t('solutions.painPoint4Title')}
                                        </div>
                                        <p className="text-xs text-gray-500">{t('solutions.painPoint4Desc')}</p>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 font-bold text-industrial-950 mb-2">
                                            <Lightbulb size={16} className="text-furnace-500" /> {t('solutions.solution4Title')}
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-industrial-900 mb-1 text-sm">{t('solutions.direction4_1')}</div>
                                        <p className="text-[10px] leading-tight text-gray-500 italic">{t('solutions.direction4Footer')}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 text-center px-4 max-w-4xl mx-auto">
                        <p className="text-xs text-gray-400 italic font-medium">
                            {t('solutions.disclaimer')}
                        </p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-16">{t('solutions.howItWorksTitle')}</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">01</div>
                            <div className="text-blue-900 font-bold text-sm">{t('solutions.step1Title')}</div>
                        </div>
                        <div className="hidden md:block text-slate-300"> -&gt; </div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">02</div>
                            <div className="text-blue-900 font-bold text-sm">{t('solutions.step2Title')}</div>
                        </div>
                        <div className="hidden md:block text-slate-300"> -&gt; </div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">03</div>
                            <div className="text-blue-900 font-bold text-sm">{t('solutions.step3Title')}</div>
                        </div>
                        <div className="hidden md:block text-slate-300"> -&gt; </div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">04</div>
                            <div className="text-blue-900 font-bold text-sm">{t('solutions.step4Title')}</div>
                        </div>
                        <div className="hidden md:block text-slate-300"> -&gt; </div>
                        <div className="p-4">
                            <div className="font-heading font-black text-2xl mb-2 text-furnace-600">05</div>
                            <div className="text-blue-900 font-bold text-sm">{t('solutions.step5Title')}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Solutions;

