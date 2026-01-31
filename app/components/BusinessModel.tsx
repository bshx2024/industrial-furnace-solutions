import React from 'react';
import { Search, PenTool, Wrench, BarChart4, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
    const { t } = useLanguage();

    return (
        <section id="energy-steward" className="py-24 bg-white scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3">
                        <span className="text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block">{t('model.badge')}</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-2 leading-tight">
                            {t('model.title')}
                        </h2>
                        <h3 className="text-xl font-heading font-bold text-gray-400 mb-8 uppercase tracking-wide">
                            {t('model.subtitle')}
                        </h3>
                        <p className="text-gray-500 text-lg mb-8 italic">
                            {t('model.quote')}
                        </p>
                        <p className="text-gray-500 text-md mb-8">
                            {t('model.desc')}
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <CheckCircle2 className="text-furnace-600 shrink-0" size={24} />
                                <span className="text-gray-700 font-medium font-heading">{t('model.check1')}</span>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="text-furnace-600 shrink-0" size={24} />
                                <span className="text-gray-700 font-medium font-heading">{t('model.check2')}</span>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="text-furnace-600 shrink-0" size={24} />
                                <span className="text-gray-700 font-medium font-heading">{t('model.check3')}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ModelStep
                            num="01"
                            icon={<Search size={40} />}
                            title={t('model.step1.title')}
                            desc={t('model.step1.desc')}
                        />
                        <ModelStep
                            num="02"
                            icon={<PenTool size={40} />}
                            title={t('model.step2.title')}
                            desc={t('model.step2.desc')}
                        />
                        <ModelStep
                            num="03"
                            icon={<Wrench size={40} />}
                            title={t('model.step3.title')}
                            desc={t('model.step3.desc')}
                        />
                        <ModelStep
                            num="04"
                            icon={<BarChart4 size={40} />}
                            title={t('model.step4.title')}
                            desc={t('model.step4.desc')}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessModel;
