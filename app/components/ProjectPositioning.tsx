import React from 'react';
import { Target, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectPositioning: React.FC = () => {
    const { t } = useLanguage();

    const steps = [
        {
            badge: t('why.step1.badge'),
            icon: Target,
            title: t('why.step1.title'),
            desc: t('why.step1.desc'),
        },
        {
            badge: t('why.step2.badge'),
            icon: TrendingUp,
            title: t('why.step2.title'),
            desc: t('why.step2.desc'),
        },
        {
            badge: t('why.step3.badge'),
            icon: Shield,
            title: t('why.step3.title'),
            desc: t('why.step3.desc'),
        },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-5">
                        <span className="text-furnace-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                            {t('why.badge')}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-industrial-900 mb-6 leading-tight">
                            {t('why.title')}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {t('why.p1')}
                        </p>
                        <p className="text-base text-gray-500 leading-relaxed">
                            {t('why.p2')}
                        </p>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                        {steps.map((step, idx) => {
                            const IconComponent = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex items-start gap-6 group"
                                >
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                        <div className="bg-furnace-50 group-hover:bg-furnace-600 p-3.5 rounded-xl text-furnace-600 group-hover:text-white transition-colors duration-300">
                                            <IconComponent size={28} />
                                        </div>
                                        <span className="text-[11px] font-black text-slate-400 font-mono tracking-wider uppercase">
                                            {step.badge}
                                        </span>
                                    </div>
                                    <div className="space-y-1.5 flex-1">
                                        <h3 className="text-xl font-bold text-industrial-900 group-hover:text-furnace-600 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectPositioning;
