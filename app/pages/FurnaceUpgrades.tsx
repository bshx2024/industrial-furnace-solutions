import React, { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';
import { Flame, Cpu, Settings, TrendingUp } from 'lucide-react';

export const meta: MetaFunction = () => {
    return [
        { title: "Industrial Reheating Furnace Energy Saving Upgrades | EcoReheating" },
        { name: "description", content: "Comprehensive guide to reheating furnace efficiency revamps. Explore air preheat recuperators, regenerative burners, lining upgrades, and scale loss control." },
    ];
};

const FurnaceUpgrades: React.FC = () => {
    const { language: lang } = useLanguage();
    const [airPreheat, setAirPreheat] = useState<number>(300); // degrees C

    // Quick calculation: ~1% fuel saving per 20C of air preheating
    const estimatedSavingRate = (airPreheat - 20) / 20;

    // Translations
    const t = {
        en: {
            title: "Industrial Reheating Furnace Energy Efficiency Upgrades",
            subtitle: "Optimize thermal efficiency, recover waste heat, and minimize scale losses through T80-compliant modernizations.",
            h2Recuperator: "1. Flue Gas Waste Heat Recovery & Recuperator Optimization",
            recuperatorText: "Flue gases exiting steel reheating furnaces carry away 30-45% of total combustion heat energy. Installing or optimizing a metallic convection recuperator captures this waste heat, using it to preheat incoming combustion air. Every 20°C increase in combustion air preheat temperature reduces fuel gas consumption by approximately 1%. Regular leakage checks and tube alignment are critical to prevent pressure collapse in preheaters.",
            preheatSliderLabel: "Adjust Combustion Air Preheat Temp",
            estSavingLabel: "Estimated Fuel Savings Rate",
            h2Burners: "2. Regenerative Burner Systems & Smart Combustion",
            burnersText: "Unlike standard recuperative systems, regenerative burners operate in pairs, using ceramic honeycomb beds to alternate between absorbing flue gas heat and heating incoming air. This achieves air preheating up to 800°C+, yielding natural gas savings of 30% to 50% compared to cold-air designs, while keeping NOx emissions within environmental parameters.",
            h2ScaleLoss: "3. Atmosphere Control & Scale Losses Mitigation",
            scaleLossText: "Excess oxygen in the reheating furnace atmosphere reactively oxidizes steel surfaces, creating mill scale. In a typical steel reheating furnace, scale losses will result in a 1% to 2.5% loss of steel yield. Deploying AI-supported smart atmosphere control maintains combustion in a tight window (1.5-2.0% excess O₂), minimizing scale loss by up to 0.5%, translating directly into higher mill production.",
            ctaTitle: "Get a Turnkey Thermal Audit",
            ctaBtn: "Book Free Site Audit",
            back: "← Back to Home",
        },
        vi: {
            title: "Cải Tạo & Nâng Cấp Tiết Kiệm Năng Lượng Lò Nung Thép",
            subtitle: "Tối ưu hóa hiệu suất nhiệt, thu hồi nhiệt dư và giảm thiểu hao hụt khí thải qua nâng cấp đạt tiêu chuẩn T80.",
            h2Recuperator: "1. Thu Hồi Nhiệt Dư Khói Thải & Tối Ưu Hóa Bộ Trao Đổi Nhiệt (Recuperator)",
            recuperatorText: "Khói thải thoát ra từ lò nung lại mang đi 30-45% tổng năng lượng nhiệt đốt cháy. Việc lắp đặt hoặc tối ưu hóa bộ trao đổi nhiệt (Recuperator) thu hồi lượng nhiệt dư này để sấy gió cấp. Mỗi khi nhiệt độ gió sấy tăng 20°C, lượng tiêu hao gas giảm khoảng 1%. Kiểm tra rò rỉ và căn chỉnh ống trao đổi nhiệt thường xuyên là tối quan trọng để tránh suy giảm áp suất khí.",
            preheatSliderLabel: "Điều chỉnh nhiệt độ gió sấy",
            estSavingLabel: "Tỷ lệ tiết kiệm nhiên liệu ước tính",
            h2Burners: "2. Hệ Thống Đầu Đốt Tái Sinh (Regenerative Burner) & Đốt Cháy Thông Minh",
            burnersText: "Khác với các hệ thống thu hồi nhiệt tiêu chuẩn, đầu đốt tái sinh hoạt động theo cặp, sử dụng các hạt gốm tích nhiệt để luân phiên hấp thụ nhiệt khói thải và nung nóng gió cấp. Điều này giúp gió sấy đạt tới trên 800°C, tiết kiệm 30-50% lượng gas tự nhiên so với thiết kế gió lạnh thông thường.",
            h2ScaleLoss: "3. Kiểm Soát Khí Quyển & Giảm Thiểu Hao Hụt Lớp Vảy Oxit (Scale Loss)",
            scaleLossText: "Lượng oxy dư thừa trong khí quyển lò nung sẽ phản ứng oxy hóa bề mặt thép, tạo ra lớp vảy sắt (mill scale). Trong lò nung lại thép điển hình, tổn thất do vảy oxit sẽ làm hao hụt 1% đến 2,5% năng lượng sản lượng thép. Tích hợp điều khiển không khí/nhiên liệu tự động AI giúp duy trì oxy dư trong dải hẹp (1,5-2.0%), giảm hao hụt vảy tới 0,5%.",
            ctaTitle: "Đăng Ký Đánh Giá Nhiệt Toàn Diện",
            ctaBtn: "Đặt lịch kiểm toán miễn phí",
            back: "← Quay lại Trang chủ",
        },
        id: {
            title: "Peningkatan Efisiensi Energi Tungku Reheating Industri",
            subtitle: "Optimalkan efisiensi termal, pulihkan panas buang, dan minimalkan kehilangan oksida melalui modernisasi kepatuhan T80.",
            h2Recuperator: "1. Pemulihan Panas Buang Gas & Optimalisasi Rekuperator",
            recuperatorText: "Gas buang yang keluar membawa 30-45% dari total energi panas pembakaran. Memasang rekuperator logam menangkap panas ini untuk memanaskan udara pembakaran. Setiap kenaikan 20°C pada suhu pemanasan udara mengurangi konsumsi bahan bakar sekitar 1%.",
            preheatSliderLabel: "Sesuaikan Suhu Pemanasan Udara",
            estSavingLabel: "Estimasi Tingkat Penghematan Gas",
            h2Burners: "2. Sistem Regenerative Burner & Pembakaran Cerdas",
            burnersText: "Regenerative burner menggunakan media keramik untuk memanaskan udara pembakaran hingga 800°C+, menghasilkan penghematan gas alam 30% hingga 50% dibandingkan dengan desain udara dingin.",
            h2ScaleLoss: "3. Kontrol Atmosfer & Pengurangan Kehilangan Kerak (Scale Loss)",
            scaleLossText: "Di tungku pemanas ulang baja, kehilangan kerak akan menghasilkan kerugian hasil baja sebesar 1% hingga 2,5%. Kontrol atmosfer cerdas mempertahankan O₂ berlebih pada 1,5-2,0% untuk meminimalkan kehilangan.",
            ctaTitle: "Dapatkan Audit Termal Lengkap",
            ctaBtn: "Pesan Audit Lapangan Gratis",
            back: "← Kembali ke Beranda",
        },
        "pt-br": {
            title: "Modernizações de Eficiência Energética de Forno de Reaquecimento",
            subtitle: "Otimize a eficiência térmica, recupere calor residual e minimize perdas por oxidação sob o padrão CISA T80.",
            h2Recuperator: "1. Recuperação de Calor de Gases & Otimização do Recuperador",
            recuperatorText: "Os gases de exaustão levam de 30% a 45% do calor da combustão. A instalação ou otimização de um recuperador metálico pré-aquece o ar de combustão. Cada 20°C de aumento no pré-aquecimento do ar economiza cerca de 1% de gás natural.",
            preheatSliderLabel: "Ajustar Temperatura de Pré-aquecimento do Ar",
            estSavingLabel: "Taxa de Economia Estimada",
            h2Burners: "2. Sistemas de Queimadores Regenerativos & Combustão Inteligente",
            burnersText: "Os queimadores regenerativos utilizam leitos cerâmicos para pré-aquecer o ar a mais de 800°C, proporcionando economia de gás de 30% a 50% em comparação com ar frio.",
            h2ScaleLoss: "3. Controle de Atmosfera & Redução de Perdas por Carepa",
            scaleLossText: "Nos fornos de reaquecimento, as perdas por carepa resultam em perdas de rendimento de aço de 1% a 2,5%. O controle de atmosfera reduz o excesso de O₂ para 1,5-2,0%, reduzindo a perda por carepa.",
            ctaTitle: "Solicitar Auditoria Térmica",
            ctaBtn: "Agendar Visita de Auditoria",
            back: "← Voltar para a Home",
        }
    };

    const currentT = t[lang as keyof typeof t] || t.en;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.1),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 carbon-pattern pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link to={lang === 'en' ? '/' : `/${lang}`} className="text-furnace-500 hover:text-furnace-600 transition-colors font-medium">
                        {currentT.back}
                    </Link>
                </div>

                {/* Article Header */}
                <div className="border-b border-slate-800 pb-8 mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
                        {currentT.title}
                    </h1>
                    <p className="mt-4 text-lg text-slate-400 leading-relaxed font-sans">
                        {currentT.subtitle}
                    </p>
                </div>

                {/* Main Technical Content */}
                <div className="space-y-12 text-slate-300 leading-relaxed text-base font-sans">
                    {/* Section 1: Recuperators */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-heading">
                            <Settings className="text-furnace-500" size={22} />
                            {currentT.h2Recuperator}
                        </h2>
                        <p>{currentT.recuperatorText}</p>

                        {/* Interactive Preheat Simulation Widget */}
                        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 my-6">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-slate-300">{currentT.preheatSliderLabel}</label>
                                <span className="text-lg font-mono font-bold text-furnace-500">{airPreheat}°C</span>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="450"
                                step="10"
                                value={airPreheat}
                                onChange={(e) => setAirPreheat(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-furnace-500 focus:outline-none"
                            />
                            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800/80 text-slate-400">
                                <span>{currentT.estSavingLabel}:</span>
                                <span className="font-mono font-bold text-green-500">~{estimatedSavingRate.toFixed(1)}%</span>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Burners */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-heading">
                            <Flame className="text-furnace-500" size={22} />
                            {currentT.h2Burners}
                        </h2>
                        <p>{currentT.burnersText}</p>
                    </section>

                    {/* Section 3: Scale Losses */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-heading">
                            <TrendingUp className="text-furnace-500" size={22} />
                            {currentT.h2ScaleLoss}
                        </h2>
                        <p>{currentT.scaleLossText}</p>
                    </section>

                    {/* Conversion Banner */}
                    <div className="glass-panel border-furnace-500/30 rounded-2xl p-8 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-6 my-12">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white">{currentT.ctaTitle}</h3>
                            <p className="text-xs text-slate-400">We invest 100% of equipment costs; payback is covered by verified natural gas savings.</p>
                        </div>
                        <Link
                            to={lang === 'en' ? '/about#assessment' : `/${lang}/about#assessment`}
                            className="inline-flex items-center gap-2 py-3 px-6 bg-furnace-500 hover:bg-furnace-600 text-white rounded-lg transition-colors font-bold text-sm uppercase tracking-wider shadow-lg shadow-furnace-500/20 shrink-0"
                        >
                            <Cpu size={16} />
                            {currentT.ctaBtn}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FurnaceUpgrades;
