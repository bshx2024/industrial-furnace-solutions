import React from 'react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
    return [
        { title: "Industrial Furnace Energy Efficiency Calculators | EcoReheating" },
        { name: "description", content: "Free, interactive thermodynamic and ROI calculators for walking beam reheating furnaces, heat balance analysis, and steel mill energy auditing." },
    ];
};

const CalculatorsHub: React.FC = () => {
    const { language: lang } = useLanguage();

    // Multilingual support for the Hub
    const t = {
        en: {
            title: "Reheating Furnace Efficiency Calculators",
            subtitle: "Free, interactive engineering tools to audit energy consumption, calculate heat distribution, and estimate ROI on retrofits.",
            card1Title: "Walking Beam ROI Calculator",
            card1Desc: "Calculate annual natural gas savings, payback periods, and OEE improvements based on CISA T80 performance benchmarks.",
            card1Btn: "Open ROI Calculator →",
            card2Title: "Furnace Heat Balance Calculator",
            card2Desc: "Map the thermodynamic heat distribution of your furnace. Estimate steel absorption, stack gas loss, water cooling loss, and wall radiation.",
            card2Btn: "Run Heat Balance Model →",
            card3Title: "CBAM Steel Carbon Calculator",
            card3Desc: "Estimate EU Carbon Border Adjustment Mechanism (CBAM) tax liabilities and carbon offset values for steel billet production.",
            card3Btn: "View Carbon Roadmap →",
            backToHome: "← Back to Home"
        },
        vi: {
            title: "Công Cụ Tính Toán Hiệu Suất Lò Nung",
            subtitle: "Các công cụ kỹ thuật tương tác miễn phí để kiểm toán tiêu thụ năng lượng, tính toán phân phối nhiệt và ước tính ROI.",
            card1Title: "Công Cụ Tính ROI Lò Dầm Bước",
            card1Desc: "Tính toán tiết kiệm gas hàng năm, thời gian hoàn vốn và cải thiện OEE dựa trên chuẩn hiệu suất CISA T80.",
            card1Btn: "Mở Công Cụ ROI →",
            card2Title: "Tính Toán Cân Bằng Nhiệt Lò Nung",
            card2Desc: "Bản đồ phân phối nhiệt động lực học của lò nung. Ước tính nhiệt hấp thụ của thép, tổn thất khí thải, nước làm mát và bức xạ vỏ lò.",
            card2Btn: "Chạy Mô Hình Cân Bằng Nhiệt →",
            card3Title: "Tính Toán Thuế Carbon CBAM Thép",
            card3Desc: "Ước tính nghĩa vụ thuế cơ chế điều chỉnh biên giới carbon EU (CBAM) và giá trị giảm phát thải cho phôi thép.",
            card3Btn: "Xem Lộ Trình Carbon →",
            backToHome: "← Quay lại Trang chủ"
        },
        id: {
            title: "Kalkulator Efisiensi Tungku Pemanas",
            subtitle: "Alat teknik interaktif gratis untuk mengaudit konsumsi energi, menghitung distribusi panas, dan memperkirakan ROI retrofit.",
            card1Title: "Kalkulator ROI Tungku Walking Beam",
            card1Desc: "Hitung penghematan gas alam tahunan, periode pengembalian modal, dan peningkatan OEE berdasarkan tolok ukur kinerja CISA T80.",
            card1Btn: "Buka Kalkulator ROI →",
            card2Title: "Kalkulator Keseimbangan Panas Tungku",
            card2Desc: "Petakan distribusi panas termodinamika tungku Anda. Perkirakan penyerapan baja, kehilangan gas buang, dan radiasi dinding.",
            card2Btn: "Jalankan Model Keseimbangan Panas →",
            card3Title: "Kalkulator Karbon Baja CBAM",
            card3Desc: "Perkirakan kewajiban pajak Mekanisme Penyesuaian Perbatasan Karbon UE (CBAM) dan nilai penggantian karbon.",
            card3Btn: "Lihat Peta Jalan Karbon →",
            backToHome: "← Kembali ke Beranda"
        },
        "pt-br": {
            title: "Calculadoras de Eficiência de Forno de Reaquecimento",
            subtitle: "Ferramentas de engenharia interativas gratuitas para auditar consumo de energia, calcular distribuição de calor e estimar ROI.",
            card1Title: "Calculadora de ROI do Forno de Vigas Caminhantes",
            card1Desc: "Calcule economia anual de gás natural, payback e melhorias de OEE baseadas nos benchmarks CISA T80.",
            card1Btn: "Abrir Calculadora de ROI →",
            card2Title: "Calculadora de Balanço Térmico do Forno",
            card2Desc: "Mapeie a distribuição térmica do seu forno. Estime absorção do aço, perda de gases da chaminé e radiação da parede.",
            card2Btn: "Executar Modelo de Balanço Térmico →",
            card3Title: "Calculadora de Carbono CBAM do Aço",
            card3Desc: "Estime as obrigações fiscais do Mecanismo de Ajuste de Carbono na Fronteira da UE (CBAM) para tarugos de aço.",
            card3Btn: "Ver Roteiro de Carbono →",
            backToHome: "← Voltar para a Home"
        }
    };

    const currentT = t[lang as keyof typeof t] || t.en;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 carbon-pattern pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link to={lang === 'en' ? '/' : `/${lang}`} className="text-furnace-500 hover:text-furnace-600 transition-colors font-medium flex items-center gap-2">
                        {currentT.backToHome}
                    </Link>
                </div>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="px-3 py-1 text-xs font-semibold tracking-wider text-furnace-500 uppercase bg-furnace-500/10 border border-furnace-500/20 rounded-full">
                        ENGINEERING PORTAL
                    </span>
                    <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
                        {currentT.title}
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        {currentT.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="glass-panel rounded-2xl p-8 flex flex-col justify-between hover:border-furnace-500/50 transition-all duration-300 group hover:-translate-y-1">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-furnace-500/10 border border-furnace-500/20 flex items-center justify-center mb-6 text-furnace-500 font-bold text-lg">
                                %
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-furnace-500 transition-colors">
                                {currentT.card1Title}
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                {currentT.card1Desc}
                            </p>
                        </div>
                        <Link
                            to={lang === 'en' ? '/calculators/walking-beam-furnace-efficiency-calculator' : `/${lang}/calculators/walking-beam-furnace-efficiency-calculator`}
                            className="w-full text-center py-3 px-4 bg-furnace-500 text-white rounded-lg hover:bg-furnace-600 transition-colors font-semibold"
                        >
                            {currentT.card1Btn}
                        </Link>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-panel rounded-2xl p-8 flex flex-col justify-between hover:border-furnace-500/50 transition-all duration-300 group hover:-translate-y-1">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-furnace-500/10 border border-furnace-500/20 flex items-center justify-center mb-6 text-furnace-500 font-bold text-lg">
                                Q
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-furnace-500 transition-colors">
                                {currentT.card2Title}
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                {currentT.card2Desc}
                            </p>
                        </div>
                        <Link
                            to={lang === 'en' ? '/calculators/reheating-furnace-heat-balance' : `/${lang}/calculators/reheating-furnace-heat-balance`}
                            className="w-full text-center py-3 px-4 bg-furnace-500 text-white rounded-lg hover:bg-furnace-600 transition-colors font-semibold"
                        >
                            {currentT.card2Btn}
                        </Link>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-panel rounded-2xl p-8 flex flex-col justify-between hover:border-furnace-500/50 transition-all duration-300 group hover:-translate-y-1">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-furnace-500/10 border border-furnace-500/20 flex items-center justify-center mb-6 text-furnace-500 font-bold text-lg">
                                CO₂
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-furnace-500 transition-colors">
                                {currentT.card3Title}
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                {currentT.card3Desc}
                            </p>
                        </div>
                        {lang === 'vi' ? (
                            <Link
                                to="/vi/lp/cbam-steel-vietnam"
                                className="w-full text-center py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold border border-slate-700"
                            >
                                {currentT.card3Btn}
                            </Link>
                        ) : (
                            <Link
                                to={lang === 'en' ? '/about' : `/${lang}/about`}
                                className="w-full text-center py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold border border-slate-700"
                            >
                                {currentT.card3Btn}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorsHub;
