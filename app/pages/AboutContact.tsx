import React from 'react';
import ContactForm from '../components/ContactForm';
import { Users, Globe, TrendingUp } from 'lucide-react';
import { useLanguage, translations } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = ({ location }) => {
    const lang = location.pathname.startsWith('/vi') ? 'vi' : 'en';
    const t = translations[lang];

    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "EcoReheating",
            "description": t['about.subtitle']
        }
    };

    return [
        { title: `${t['about.title']} | EcoReheating` },
        { name: "description", content: t['about.subtitle'] },
        {
            "script:ld+json": aboutSchema,
        }
    ];
};

const AboutContact: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white">

            {/* Header */}
            <section className="pt-40 pb-20 bg-industrial-950 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('about.title')}</h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        {t('about.subtitle')}
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block">{t('about.company')}</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-industrial-900 mb-2">{t('about.companyTitle')}</h2>
                            <p className="text-furnace-600 font-bold mb-8 uppercase tracking-wider text-sm">{t('about.excellence')}</p>

                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {t('about.p1')}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {t('about.p2')}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {t('about.p3')}
                            </p>
                            <div className="p-8 bg-industrial-950 text-white rounded-2xl border border-slate-100 mb-8 flex items-center justify-center gap-6 shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-furnace-600/10 to-transparent"></div>
                                <div className="text-2xl md:text-3xl font-heading font-black italic text-center relative z-10">
                                    {t('about.quote')}
                                </div>
                            </div>

                            {/* Evidence: Signing Photo */}
                            <div className="space-y-4 max-w-md">
                                <div className="relative group/img overflow-hidden rounded-2xl shadow-lg border border-slate-100">
                                    <img
                                        src="/fcs-signing.jpg"
                                        alt="Strategic Alliance signing ceremony between FCS and EcoReheating in 2014"
                                        className="h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                                    />
                                </div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                                    {t('about.signedBy')}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="flex gap-8">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-industrial-900 mb-2">{t('about.advantage1Title')}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {t('about.advantage1Desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600">
                                    <Globe size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-industrial-900 mb-2">{t('about.advantage2Title')}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {t('about.advantage2Desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600">
                                    <TrendingUp size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-industrial-900 mb-2">{t('about.advantage3Title')}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {t('about.advantage3Desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Authority & Trust */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-6">{t('about.foundationTitle')}</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {t('about.foundationDesc')}
                            </p>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="p-6 bg-white rounded-xl border border-slate-200">
                                    <div className="text-3xl font-bold text-industrial-950 mb-1">300+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{t('nav.caseStudies')}</div>
                                </div>
                                <div className="p-6 bg-white rounded-xl border border-slate-200">
                                    <div className="text-3xl font-bold text-industrial-950 mb-1">Up to 20%</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{t('stat.fuel')}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-4 border-t border-slate-200">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">{t('about.integrity')}</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">{t('about.innovation')}</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">{t('about.success')}</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">{t('about.dedication')}</span>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="space-y-4 max-w-md ml-auto">
                                <div className="relative group/img overflow-hidden rounded-2xl shadow-lg border border-white">
                                    <img
                                        src="/patent-wall.png"
                                        alt="Technical Patent Wall"
                                        className="h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                                    />
                                </div>
                                <div className="text-[10px] text-gray-400 text-center uppercase tracking-widest">{t('about.ipTitle')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-industrial-900">{t('about.getInTouch')}</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            {t('about.getInTouchDesc')}
                        </p>
                    </div>
                    <ContactForm />

                    <div className="mt-20 flex flex-col md:flex-row justify-center gap-12 text-center md:text-left border-t border-slate-200 pt-16">
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-industrial-950 mb-2">{t('about.globalOps')}</h5>
                            <p className="text-gray-500 text-sm">{t('about.globalOpsDesc')}</p>
                        </div>
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-industrial-950 mb-2">{t('common.contactUs')}</h5>
                            <p className="text-gray-500 text-sm">contact@ecoreheating.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutContact;

