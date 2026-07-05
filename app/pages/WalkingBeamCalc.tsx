import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';
import { Flame, Info, CheckCircle2 } from 'lucide-react';

export const meta: MetaFunction = () => {
    return [
        { title: "Walking Beam Reheating Furnace ROI Calculator | EcoReheating" },
        { name: "description", content: "Estimate natural gas savings, carbon offset value, and payback periods for walking beam reheating furnace efficiency retrofits." },
    ];
};

const WalkingBeamCalc: React.FC = () => {
    const { language: lang } = useLanguage();
    const [production, setProduction] = useState<number>(2.5); // Mtpa
    const [gasPrice, setGasPrice] = useState<number>(0.45); // USD/m3
    const [liningType, setLiningType] = useState<string>('refractory_castable'); // castable vs. full-fiber
    
    // Calculations
    const fuelConsumptionBaseline = 60; // m3 gas per ton of steel
    const fuelSavingRate = liningType === 'refractory_castable' ? 0.12 : 0.05; // 12% saving target if converting old castable
    const co2Factor = 0.0022; // tons of CO2 per m3 gas
    const cbamFactor = 85; // EUR per ton CO2

    const annualGasBaseline = production * 1000000 * fuelConsumptionBaseline;
    const annualGasSavings = annualGasBaseline * fuelSavingRate;
    const annualFinancialSavings = annualGasSavings * gasPrice;
    
    const carbonOffsetTons = annualGasSavings * co2Factor;
    const cbamTaxSavings = carbonOffsetTons * cbamFactor;

    // GA4 tracking
    useEffect(() => {
        if (typeof window === 'undefined' || !(window as any).gtag) return;
        const handler = setTimeout(() => {
            (window as any).gtag('event', 'walking_beam_calc_change', {
                production,
                gasPrice,
                liningType,
                page_location: window.location.href,
            });
        }, 1000);
        return () => clearTimeout(handler);
    }, [production, gasPrice, liningType]);

    // Translations
    const t = {
        en: {
            title: "Walking Beam Furnace ROI Calculator",
            subtitle: "Model fuel savings, carbon tax reductions, and retrofitting ROI according to CISA T80 benchmarks.",
            prodLabel: "Annual Steel Production",
            gasLabel: "Natural Gas Price",
            liningLabel: "Current Lining Status",
            liningOld: "Traditional Castable / Damaged Roof",
            liningSemi: "Semi-Fiber / Partially Modernized",
            resultsTitle: "Estimated Annual Savings",
            gasSavings: "Fuel Savings",
            financialSavings: "Annual Financial Return",
            carbonOffset: "CO₂ Emissions Reduction",
            cbamSavings: "CBAM Carbon Tax Offset",
            ctaBtn: "Book T80 Audit & Site Survey",
            ctaDesc: "Zero CAPEX Energy Steward Model. We cover 100% of equipment & installation costs.",
            back: "← Back to Calculators",
        },
        vi: {
            title: "Công Cụ Tính ROI Lò Dầm Bước",
            subtitle: "Mô hình hóa tiết kiệm gas, giảm thuế carbon và ROI cải tạo theo tiêu chuẩn CISA T80.",
            prodLabel: "Sản lượng thép hàng năm",
            gasLabel: "Giá khí tự nhiên (Natural Gas)",
            liningLabel: "Trạng thái lớp lót hiện tại",
            liningOld: "Mái lò đúc truyền thống / Mái hỏng",
            liningSemi: "Mái bán sợi / Hiện đại hóa một phần",
            resultsTitle: "Ước Tính Tiết Kiệm Hàng Năm",
            gasSavings: "Lượng Gas Tiết Kiệm",
            financialSavings: "Lợi nhuận tài chính / Năm",
            carbonOffset: "Giảm phát thải CO₂",
            cbamSavings: "Thuế Carbon CBAM được giảm",
            ctaBtn: "Đặt lịch kiểm toán T80 & Khảo sát",
            ctaDesc: "Mô hình Quản gia Năng lượng Zero CAPEX. Chúng tôi tài trợ 100% chi phí thiết bị và lắp đặt.",
            back: "← Quay lại danh sách công cụ",
        },
        id: {
            title: "Kalkulator ROI Tungku Walking Beam",
            subtitle: "Modelkan penghematan bahan bakar, pengurangan pajak karbon, dan ROI retrofit sesuai dengan tolok ukur CISA T80.",
            prodLabel: "Produksi Baja Tahunan",
            gasLabel: "Harga Gas Alam",
            liningLabel: "Status Lapisan Tungku Saat Ini",
            liningOld: "Castable Tradisional / Atap Rusak",
            liningSemi: "Semi-Fiber / Modernisasi Sebagian",
            resultsTitle: "Estimasi Penghematan Tahunan",
            gasSavings: "Penghematan Gas",
            financialSavings: "Pengembalian Finansial Tahunan",
            carbonOffset: "Pengurangan Emisi CO₂",
            cbamSavings: "Penghematan Pajak Karbon CBAM",
            ctaBtn: "Pesan Audit T80 & Survei Lapangan",
            ctaDesc: "Model Energy Steward Tanpa CAPEX. Kami menanggung 100% biaya peralatan & instalasi.",
            back: "← Kembali ke Kalkulator",
        },
        "pt-br": {
            title: "Calculadora de ROI de Forno de Vigas Caminhantes",
            subtitle: "Simule economia de combustível, redução de impostos de carbono e ROI de modernização sob o padrão CISA T80.",
            prodLabel: "Produção Anual de Aço",
            gasLabel: "Preço do Gás Natural",
            liningLabel: "Status Atual do Revestimento",
            liningOld: "Refratário Concreto Tradicional / Teto Danificado",
            liningSemi: "Semi-Fibra / Parcialmente Modernizado",
            resultsTitle: "Economia Anual Estimada",
            gasSavings: "Economia de Combustível",
            financialSavings: "Retorno Financeiro Anual",
            carbonOffset: "Redução de Emissões de CO₂",
            cbamSavings: "Redução de Imposto de Carbono CBAM",
            ctaBtn: "Agendar Auditoria T80 & Visita Técnica",
            ctaDesc: "Modelo Energy Steward Zero CAPEX. Nós cobrimos 100% dos custos de equipamentos e instalação.",
            back: "← Voltar para Calculadoras",
        }
    };

    const currentT = t[lang as keyof typeof t] || t.en;
    const locale = lang === 'vi' ? 'vi-VN' : lang === 'id' ? 'id-ID' : lang === 'pt-br' ? 'pt-BR' : 'en-US';

    const contactUrl = lang === 'en'
        ? `/about?production=${production}&gasPrice=${gasPrice}&liningType=${liningType}#assessment`
        : `/${lang}/about?production=${production}&gasPrice=${gasPrice}&liningType=${liningType}#assessment`;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 carbon-pattern pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link to={lang === 'en' ? '/calculators' : `/${lang}/calculators`} className="text-furnace-500 hover:text-furnace-600 transition-colors font-medium">
                        {currentT.back}
                    </Link>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                        {currentT.title}
                    </h1>
                    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
                        {currentT.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Parameters panel */}
                    <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                            <Flame className="text-furnace-500" size={20} />
                            Inputs
                        </h2>

                        {/* Production Capacity */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentT.prodLabel}</label>
                                <span className="text-lg font-mono font-bold text-furnace-500">
                                    {production} <span className="text-xs text-slate-500">Mtpa</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="6.0"
                                step="0.1"
                                value={production}
                                onChange={(e) => setProduction(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-furnace-500 focus:outline-none"
                            />
                        </div>

                        {/* Natural Gas Cost */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentT.gasLabel}</label>
                                <span className="text-lg font-mono font-bold text-furnace-500">
                                    ${gasPrice} <span className="text-xs text-slate-500">/ m³</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.25"
                                max="1.00"
                                step="0.05"
                                value={gasPrice}
                                onChange={(e) => setGasPrice(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-furnace-500 focus:outline-none"
                            />
                        </div>

                        {/* Lining Type Select */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                {currentT.liningLabel}
                            </label>
                            <div className="space-y-3">
                                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${liningType === 'refractory_castable' ? 'bg-furnace-500/10 border-furnace-500 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                                    <input
                                        type="radio"
                                        name="liningType"
                                        value="refractory_castable"
                                        checked={liningType === 'refractory_castable'}
                                        onChange={() => setLiningType('refractory_castable')}
                                        className="sr-only"
                                    />
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${liningType === 'refractory_castable' ? 'border-furnace-500' : 'border-slate-700'}`}>
                                        {liningType === 'refractory_castable' && <div className="w-2 h-2 rounded-full bg-furnace-500" />}
                                    </div>
                                    <span className="font-medium text-sm">{currentT.liningOld}</span>
                                </label>

                                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${liningType === 'partially_modernized' ? 'bg-furnace-500/10 border-furnace-500 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                                    <input
                                        type="radio"
                                        name="liningType"
                                        value="partially_modernized"
                                        checked={liningType === 'partially_modernized'}
                                        onChange={() => setLiningType('partially_modernized')}
                                        className="sr-only"
                                    />
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${liningType === 'partially_modernized' ? 'border-furnace-500' : 'border-slate-700'}`}>
                                        {liningType === 'partially_modernized' && <div className="w-2 h-2 rounded-full bg-furnace-500" />}
                                    </div>
                                    <span className="font-medium text-sm">{currentT.liningSemi}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Results panel */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="glass-panel border-furnace-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/80 to-slate-950/80">
                            <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-3">
                                {currentT.resultsTitle}
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{currentT.gasSavings}</span>
                                    <span className="text-xl sm:text-2xl font-mono font-bold text-white">
                                        {annualGasSavings.toLocaleString(locale, { maximumFractionDigits: 0 })} <span className="text-sm font-sans text-slate-400">m³/year</span>
                                    </span>
                                </div>

                                <div>
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{currentT.financialSavings}</span>
                                    <span className="text-2xl sm:text-3xl font-mono font-bold text-furnace-500">
                                        ${annualFinancialSavings.toLocaleString(locale, { maximumFractionDigits: 0 })} <span className="text-sm font-sans text-slate-400">/ year</span>
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
                                    <div>
                                        <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{currentT.carbonOffset}</span>
                                        <span className="text-sm sm:text-base font-mono font-bold text-green-500">
                                            {carbonOffsetTons.toLocaleString(locale, { maximumFractionDigits: 0 })} tCO₂/yr
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{currentT.cbamSavings}</span>
                                        <span className="text-sm sm:text-base font-mono font-bold text-green-500">
                                            €{cbamTaxSavings.toLocaleString(locale, { maximumFractionDigits: 0 })}/yr
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* B2B Conversion Box */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
                            <div className="flex gap-3 mb-4">
                                <CheckCircle2 className="text-furnace-500 shrink-0" size={18} />
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    {currentT.ctaDesc}
                                </p>
                            </div>
                            <a
                                href={contactUrl}
                                className="w-full inline-flex items-center justify-center py-3 px-4 bg-furnace-500 hover:bg-furnace-600 text-white rounded-lg transition-colors font-bold text-sm uppercase tracking-wider shadow-lg shadow-furnace-500/20"
                            >
                                {currentT.ctaBtn}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalkingBeamCalc;
