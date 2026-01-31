import React from 'react';
import { Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const PerformanceList: React.FC = () => {
    const { t, l } = useLanguage();

    const sections = [
        {
            title: t('perf.cat1'),
            projects: [
                { client: "Qian'an Jiujiang Wire Rod", detail: "1250mm Strip 220 t/h Reheating Furnace" },
                { client: "Shanxi Gaoyi Iron & Steel", detail: "1250mm Strip Cold Charging 210 t/h" },
                { client: "Tangshan Guotang Special Steel", detail: "1100mm Strip 200 t/h Reheating Furnace" },
                { client: "Shanxi Gaoyi", detail: "1000mm Strip 180 t/h Reheating Furnace" },
                { client: "Jinjiang Zhonghui", detail: "900mm Strip 215 t/h Reheating Furnace" },
                { client: "Hebei Fengnan Bensen", detail: "850mm Strip 160 t/h Reheating Furnace" },
                { client: "Cangzhou Middle Iron", detail: "850mm Strip 180 t/h Reheating Furnace" },
                { client: "Guangxi Liugang Zhongjin", detail: "850mm Stainless Strip 150 t/h" },
                { client: "Fujian Fuxin", detail: "780mm Strip 250 t/h Reheating Furnace" },
                { client: "Shanxi Gaoyi", detail: "750mm Strip 180 t/h Reheating Furnace" },
                { client: "Tangshan Guotang", detail: "650mm Strip 215 t/h Reheating Furnace" },
                { client: "Shanxi Longmen", detail: "650mm Strip 200 t/h Reheating Furnace" },
                { client: "Guangdong Hongtai", detail: "650mm Strip 150 t/h Reheating Furnace" },
                { client: "Guangdong Fogang Jincheng", detail: "650mm Strip 120 t/h Reheating Furnace" },
                { client: "Qian'an Jiujiang", detail: "650mm Strip 180 t/h Reheating Furnace" },
                { client: "Hangtian Union", detail: "650mm Strip Reheating Furnace" },
                { client: "Shanxi Gaoyi", detail: "650mm Strip Reheating Furnace" },
                { client: "Guangdong Fogang Jincheng", detail: "650mm Strip 180 t/h Reheating Furnace" },
            ]
        },
        {
            title: t('perf.cat2'),
            projects: [
                { client: "Bangladesh KSRM Steel", detail: "150 t/h Side Charge/Discharge Furnace", isInternational: true },
                { client: "Vietnam Shengli (Thang Long)", detail: "120 t/h Cold Charging Furnace", isInternational: true },
                { client: "Indonesia DCP Steel", detail: "100 t/h Dual Fuel (Gas/Natural Gas)", isInternational: true },
                { client: "Malaysia Ann Joo Steel", detail: "90 t/h Dual Fuel Reheating Furnace", isInternational: true },
                { client: "Ethiopia Steel Plant", detail: "50 t/h Oil/Gas Dual Fuel Furnace", isInternational: true },
                { client: "Jiangsu Binxin Steel", detail: "250 t/h Regenerative Walking Beam Furnace" },
                { client: "Dazhou Iron & Steel", detail: "240 t/h BFG Regenerative Furnace" },
                { client: "Dazhou Iron & Steel", detail: "220 t/h BFG Regenerative Furnace" },
                { client: "Yunnan Qujing Minyuan", detail: "Dual High Speed Bar 220 t/h Reheating Furnace" },
                { client: "Shanxi Longmen", detail: "220 t/h BFG Regenerative Furnace" },
                { client: "Yancheng Liansin", detail: "200 t/h Reheating Furnace (Cold Charging)" },
                { client: "Dazhi Hualu", detail: "200 t/h BFG Regenerative Furnace" },
                { client: "Qian'an Jiujiang", detail: "200 t/h BFG Regenerative Furnace" },
                { client: "Fangda Special Steel", detail: "BFG Regenerative Walking Beam Furnace" },
                { client: "Nanchang Changli", detail: "200 t/h BFG Regenerative Furnace" },
                { client: "Fengnan Bensen", detail: "190 t/h Natural Gas Regenerative Furnace" },
                { client: "Lianyugang Binxin Steel", detail: "180 t/h BFG Regenerative Furnace" },
                { client: "Shanxi Xinyu", detail: "180 t/h Coal/Gas Dual Fuel Furnace" },
                { client: "Shandong Binxin", detail: "180 t/h BFG Regenerative Walking Beam Furnace" },
                { client: "Longyan Shengfeng", detail: "180 t/h BFG Regenerative Furnace" },
                { client: "Shanxi Shengtai", detail: "170 t/h BFG Regenerative Furnace" },
                { client: "Fangda Special Steel", detail: "150 t/h BFG Regenerative Furnace" },
                { client: "Dazhou Iron & Steel", detail: "150 t/h BFG Regenerative Furnace" },
                { client: "Sichuan Desheng Group", detail: "150 t/h BFG Regenerative Reheating Furnace" },
                { client: "Jiangsu Binxin Steel", detail: "150 t/h Producer Gas to Natural Gas Retrofit" },
                { client: "Shanxi Jinnan Steel", detail: "150 t/h Coal/Gas Regenerative Reheating Furnace" },
                { client: "Zhongwei Energy", detail: "150 t/h Coal Bed Methane Reheating Furnace" },
                { client: "Jiangsu Hehua", detail: "150 t/h Producer Gas Single Regenerative Furnace" },
                { client: "Dongtai Jinyuan", detail: "150 t/h Natural Gas Reheating Furnace" },
                { client: "Shanxi Gaoyi", detail: "150 t/h BFG Regenerative Reheating Furnace" },
                { client: "Shanxi Jianlong", detail: "140 t/h Regenerative Reheating Furnace" },
                { client: "Shanxi Jinnan Steel", detail: "140 t/h BFG Regenerative Reheating Furnace" },
                { client: "Chongqing Fengdu Metal", detail: "140 t/h Natural Gas Regenerative Furnaces" },
                { client: "Hebei Hongzhong", detail: "140 t/h BFG Regenerative Reheating Furnace" },
                { client: "Jiangsu Binxin Steel", detail: "130 t/h Regenerative Reheating Furnace" },
                { client: "Shandong Binxin", detail: "130 t/h BFG Regenerative Reheating Furnace" },
                { client: "Zhonghaicheng", detail: "130 t/h Natural Gas Reheating Furnace" },
                { client: "Fangda Special Steel", detail: "120 t/h BFG Regenerative Reheating Furnace" },
                { client: "Shanxi Gaoyi", detail: "120 t/h BFG Regenerative Reheating Furnace" },
                { client: "Tangshan Guotang", detail: "120 t/h Reheating Furnace" },
                { client: "Xinzhou Zhongyuan", detail: "120 t/h BFG Regenerative Furnace" },
                { client: "Qian'an Jiujiang", detail: "120 t/h BFG Regenerative Furnace" },
                { client: "Ningxia Tailier", detail: "120 t/h Coal/Gas Reheating Furnace" },
                { client: "Chongqing Yonghang", detail: "120 t/h Natural Gas Reheating Furnace" },
                { client: "Fangda Special Steel", detail: "110 t/h Natural Gas Regenerative Reheating Furnace" },
                { client: "Qinhuangdao Yaoxin", detail: "100 t/h Coal Bed Methane Reheating Furnace" },
                { client: "Tangshan Guotang", detail: "100 t/h Reheating Furnace" },
                { client: "Qian'an Jiujiang", detail: "90 t/h Natural Gas Regenerative Furnace" },
                { client: "Qian'an Jiujiang", detail: "80 t/h Natural Gas Regenerative Furnace" },
                { client: "Xinjidong State", detail: "80 t/h BFG Regenerative Reheating Furnace" },
                { client: "Qian'an Jiujiang", detail: "70 t/h Natural Gas Regenerative Furnace" },
                { client: "Dongtai Jinyuan", detail: "60 t/h Natural Gas Reheating Furnace" },
                { client: "Jiangsu Shenli", detail: "60 t/h High Efficiency Regenerative Furnace" },
            ]
        },
        {
            title: t('perf.cat3'),
            projects: [
                { client: "Guangxi Wuzhou", detail: "300 t/h BFG Regenerative Walking Beam Furnace" },
                { client: "Guangxi Wuzhou", detail: "235 t/h BFG Regenerative Walking Beam Furnace" },
                { client: "Guangxi Wuzhou", detail: "200 t/h BFG Regenerative Reheating Furnace" },
                { client: "Shanxi Jinnan Steel", detail: "180 t/h Coal/Gas Composite Reheating Furnace" },
            ]
        }
    ];

    return (
        <div className="bg-white">
            <SEO
                title={t('perf.title')}
                description={t('perf.subtitle')}
            />
            <section className="pt-40 pb-20 bg-industrial-950 text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-furnace-600/10 skew-x-12 transform translate-x-20"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-furnace-600/20 text-furnace-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-furnace-600/30">
                        <ShieldCheck size={14} /> {t('perf.international')} {t('perf.trackRecord')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('perf.title')}</h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        {t('perf.subtitle')}
                    </p>
                </div>
            </section>

            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="space-y-32">
                        {sections.map((section, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-12 h-12 bg-industrial-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl">
                                        {idx + 1}
                                    </div>
                                    <h2 className="text-3xl font-heading font-bold text-industrial-900 uppercase tracking-tight">
                                        {section.title}
                                    </h2>
                                    <div className="h-px flex-grow bg-slate-200"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {section.projects.map((project, pIdx) => (
                                        <div key={pIdx} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group/card relative overflow-hidden">
                                            {/* Hover accent */}
                                            <div className="absolute top-0 left-0 w-1 h-0 group-hover/card:h-full bg-furnace-600 transition-all duration-500"></div>

                                            <div className="flex justify-between items-start mb-6">
                                                <h4 className="font-bold text-industrial-950 text-lg group-hover/card:text-furnace-600 transition-colors leading-tight">
                                                    {project.client}
                                                </h4>
                                                {project.isInternational && (
                                                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                                                        <Globe size={10} /> {t('perf.international')}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                                {project.detail}
                                            </p>
                                            <div className="flex items-center gap-2 text-furnace-600 font-bold text-xs group/link cursor-pointer pt-4 border-t border-slate-50">
                                                {t('perf.verified')} <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 bg-industrial-950 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">{t('perf.ctaTitle')}</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto">{t('perf.ctaDesc')}</p>
                    <Link
                        to={l('/about#assessment')}
                        className="inline-block px-10 py-4 bg-furnace-600 text-white font-bold rounded-full hover:bg-furnace-500 transition-all shadow-xl hover:shadow-furnace-600/20"
                    >
                        {t('perf.ctaBtn')}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PerformanceList;
