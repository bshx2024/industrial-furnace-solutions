import React from 'react';
import { Target, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectPositioning: React.FC = () => {
    const { t, language } = useLanguage();

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-8 leading-tight">
                            {language === 'en' ? (
                                <>Why choose <span className="text-furnace-600">Energy Steward Solution</span>?</>
                            ) : (
                                <>Tại sao chọn <span className="text-furnace-600">Giải pháp Quản gia năng lượng</span>?</>
                            )}
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {t('why.p1')}
                        </p>
                        <p className="text-lg text-gray-500 mb-8">
                            {t('why.p2')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6">
                            <div className="bg-furnace-100 p-4 rounded-lg h-fit">
                                <Target className="text-furnace-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-industrial-900 mb-2">{t('why.item1.title')}</h3>
                                <p className="text-gray-500">{t('why.item1.desc')}</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6">
                            <div className="bg-furnace-100 p-4 rounded-lg h-fit">
                                <TrendingUp className="text-furnace-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-industrial-900 mb-2">{t('why.item2.title')}</h3>
                                <p className="text-gray-500">{t('why.item2.desc')}</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6">
                            <div className="bg-furnace-100 p-4 rounded-lg h-fit">
                                <Shield className="text-furnace-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-industrial-900 mb-2">{t('why.item3.title')}</h3>
                                <p className="text-gray-500">{t('why.item3.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectPositioning;
