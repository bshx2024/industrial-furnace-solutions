import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LogoWall: React.FC = () => {
    const { t, language } = useLanguage();

    // 5x4 Matrix: 20 Curated Partners with standard English business abbreviations
    const logos = [
        "DANIELI", "AKS STEEL", "FANGDA GROUP", "KSRM", "JINGYE GROUP",
        "JIANLONG", "JINNAN STEEL", "LIUZHOU STEEL", "SANSTEEL", "JINXI GROUP",
        "SHAANXI STEEL", "NANSHAN", "TIANGONG INTL.", "DESHENG", "SANBAO",
        "AOSEN STEEL", "JIANBANG", "YASTEN", "HUAMAO", "BINXIN STEEL"
    ];

    return (
        <section className="py-24 bg-[#F5F5F7] border-t border-slate-200/50">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-industrial-900/5 border border-industrial-900/10">
                        <span className="text-[10px] md:text-xs font-black text-industrial-800 uppercase tracking-[0.4em]">
                            {t('wall.badge')}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8 leading-[1.1]">
                        {language === 'en' ? (
                            <>
                                Powering the World's <span className="text-furnace-600">Steel Giants</span>
                            </>
                        ) : (
                            <>
                                Tiếp sức cho các <span className="text-furnace-600">Người khổng lồ Ngành thép</span> Thế giới
                            </>
                        )}
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('wall.subtitle_1')}
                        <span className="text-slate-900 font-bold">{t('wall.subtitle_2')}</span>
                        {t('wall.subtitle_3')}
                        <span className="text-slate-900 font-bold border-b-2 border-furnace-500/20 px-1">{t('wall.subtitle_4')}</span>
                    </p>
                </div>

                {/* Logo Grid Container */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white p-12 md:p-20 rounded-[40px] md:rounded-[64px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-white flex flex-col items-center">
                        {/* 5 columns x 4 rows matrix */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 md:gap-y-20 gap-x-4 md:gap-x-12 w-full">
                            {logos.map((logo, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                                >
                                    <span
                                        className="text-[#333333] font-bold text-center leading-none tracking-tight opacity-90 group-hover:opacity-100 group-hover:text-black transition-all"
                                        style={{
                                            fontSize: '24px',
                                            fontFamily: '"Inter", "Helvetica", "Arial Black", sans-serif'
                                        }}
                                    >
                                        {logo}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Status Bar */}
                        <div className="mt-20 md:mt-24 pt-10 border-t border-slate-100 w-full text-center">
                            <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                                {t('wall.footer')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoWall;
