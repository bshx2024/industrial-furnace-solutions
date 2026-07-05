import React from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';
import { Flame, Calculator, ShieldCheck } from 'lucide-react';

export const meta: MetaFunction = () => {
    return [
        { title: "Walking Beam Reheating Furnace Design & Energy Saving | EcoReheating" },
        { name: "description", content: "Learn the engineering principles, refractory design, and AI-enabled combustion optimizations for high-efficiency walking beam reheating furnaces in steel mills." },
    ];
};

const WalkingBeamGuide: React.FC = () => {
    const { language: lang } = useLanguage();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the primary advantage of a walking beam reheating furnace?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Unlike pusher-type furnaces, walking beam furnaces lift and move slabs or billets, eliminating physical scratching, reducing skid marks, and permitting top-and-bottom heating for superior thermal uniformity."
                }
            },
            {
                "@type": "Question",
                "name": "How does a full-fiber roof reduce walking beam furnace fuel consumption?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ceramic fiber roofs exhibit extremely low thermal mass and thermal conductivity. This minimizes radiation losses through the furnace ceiling and allows the furnace to heat up or cool down rapidly, eliminating standby fuel waste."
                }
            }
        ]
    };

    // Translations
    const t = {
        en: {
            title: "Walking Beam Reheating Furnace: Design & Energy Efficiency Guide",
            subtitle: "An engineering breakdown of thermal optimization, lining revamps, and smart atmosphere control for steel rolling mills.",
            introTitle: "1. Overview of Walking Beam Reheating Furnace Design",
            introText: "The walking beam reheating furnace is the modern standard for heating steel slabs, billets, and blooms prior to hot rolling. Unlike legacy pusher-type furnaces where steel is slid across skid rails, a walking beam furnace utilizes a mechanical mechanism to lift, step forward, and lower steel stock. This eliminates physical surface scratching, allows uniform heating on four sides, and prevents structural bending.",
            designTitle: "2. Pusher vs. Walking Beam Furnace: The Energy Equation",
            designP1: "In pusher furnaces, massive mechanical forces are applied to push the entire row of steel billets. This requires continuous water-cooled skid support structures that absorb up to 10-15% of the total fuel heat. Walking beam designs, while structurally more complex, reduce skid thermal shielding and support localized burner placement, boosting thermal efficiency.",
            liningTitle: "3. Heat Loss Mitigation: Full-Fiber Roof Upgrade",
            liningText: "Traditional brick or castable furnace roofs have large thermal inertia. Converting to a modular Ceramic Full-Fiber Roof reduces heat losses through the ceiling by over 40%. It also enables zero-preheating startups, meaning the furnace can reach operating temperature in less than 2 hours compared to the typical 24-48 hours required for heavy castable refractories, saving thousands of cubic meters of natural gas per shutdown cycle.",
            calculatorCta: "Run Walking Beam ROI Calculation →",
            back: "← Back to Home",
        },
        vi: {
            title: "Lò Nung Lại Dầm Bước: Thiết Kế & Cẩm Nang Hiệu Suất Năng Lượng",
            subtitle: "Phân tích kỹ thuật tối ưu hóa nhiệt, cải tạo lớp lót và kiểm soát khí quyển thông minh cho nhà máy cán thép.",
            introTitle: "1. Tổng Quan Về Thiết Kế Lò Nung Lại Dầm Bước",
            introText: "Lò nung lại dầm bước (Walking Beam) là tiêu chuẩn hiện đại để gia nhiệt phôi dẹt, phôi thanh và phôi lớn trước khi cán nóng. Khác với lò đẩy (Pusher) truyền thống trượt phôi trên đường ray, lò dầm bước sử dụng cơ cấu cơ khí nâng phôi, bước về phía trước và hạ xuống. Điều này loại bỏ vết trầy xước bề mặt, cho phép gia nhiệt đồng đều bốn mặt và ngăn ngừa cong vênh phôi.",
            designTitle: "2. So sánh Lò Đẩy và Lò Dầm Bước: Bài Toán Năng Lượng",
            designP1: "Trong lò đẩy, lực đẩy cơ khí cực lớn tác dụng lên toàn bộ hàng phôi thép. Điều này đòi hỏi các cấu trúc đỡ làm mát bằng nước liên tục hấp thụ tới 10-15% tổng nhiệt lượng của nhiên liệu. Thiết kế dầm bước, mặc dù phức tạp hơn về mặt cấu trúc, giảm thiểu diện tích che chắn nhiệt của dầm và hỗ trợ bố trí đầu đốt cục bộ, tăng hiệu suất nhiệt.",
            liningTitle: "3. Giảm Tổn Thất Nhiệt: Nâng Cấp Mái Lò Toàn Sợi",
            liningText: "Mái lò bằng gạch chịu lửa hoặc bê tông đúc truyền thống có quán tính nhiệt lớn. Việc chuyển đổi sang Mái toàn sợi gốm (Ceramic Full-Fiber Roof) dạng mô-đun giúp giảm tổn thất nhiệt qua trần lò hơn 40%. Nó cũng cho phép khởi động lò không cần sấy trước, nghĩa là lò có thể đạt nhiệt độ làm việc dưới 2 giờ so với mức 24-48 giờ thông thường của bê tông đúc nặng, tiết kiệm hàng nghìn mét khối khí gas.",
            calculatorCta: "Tính Toán ROI Lò Dầm Bước Ngay →",
            back: "← Quay lại Trang chủ",
        },
        id: {
            title: "Tungku Reheating Walking Beam: Panduan Desain & Efisiensi Energi",
            subtitle: "Analisis teknik optimalisasi termal, pembaruan lapisan refratary, dan kontrol atmosfer cerdas untuk pabrik rolling baja.",
            introTitle: "1. Ikhtisar Desain Tungku Reheating Walking Beam",
            introText: "Tungku pemanas walking beam adalah standar modern untuk memanaskan slab, billet, dan bloom baja sebelum hot rolling. Berbeda dengan tungku tipe pendorong lama di mana baja digeser di atas rel, tungku walking beam menggunakan mekanisme mekanis untuk mengangkat, melangkah maju, dan menurunkan stok baja. Ini menghilangkan goresan fisik pada permukaan, memungkinkan pemanasan seragam di empat sisi.",
            designTitle: "2. Tungku Pusher vs. Walking Beam: Persamaan Energi",
            designP1: "Dalam tungku pusher, gaya mekanis yang sangat besar diterapkan untuk mendorong seluruh baris billet baja. Ini membutuhkan struktur pendukung berpendingin air terus-menerus yang menyerap hingga 10-15% dari total panas bahan bakar. Desain walking beam, meskipun secara struktural lebih rumit, mengurangi pelindung termal skid dan mendukung penempatan burner lokal, meningkatkan efisiensi termal.",
            liningTitle: "3. Mitigasi Kehilangan Panas: Peningkatan Atap Serat Penuh",
            liningText: "Atap tungku bata tradisional atau castable memiliki inersia termal yang besar. Mengubah ke Atap Serat Penuh Keramik modular mengurangi kehilangan panas melalui langit-langit lebih dari 40%. Ini juga memungkinkan startup tanpa pemanasan awal, menghemat ribuan meter kubik gas alam per siklus pemadaman.",
            calculatorCta: "Jalankan Kalkulator ROI Walking Beam →",
            back: "← Kembali ke Beranda",
        },
        "pt-br": {
            title: "Forno de Vigas Caminhantes: Guia de Projeto e Eficiência",
            subtitle: "Detalhamento de engenharia para otimização térmica, reforma de revestimento e controle de atmosfera inteligente em laminação de aço.",
            introTitle: "1. Visão Geral do Projeto do Forno de Vigas Caminhantes",
            introText: "O forno de vigas caminhantes (walking beam) é o padrão moderno para aquecimento de placas e tarugos de aço antes da laminação a quente. Diferente dos antigos fornos do tipo empurrador (pusher), o forno de vigas caminhantes utiliza um mecanismo mecânico para levantar, avançar e baixar o tarugo. Isso elimina riscos físicos na superfície, permite o aquecimento uniforme nas quatro faces e evita empenamentos.",
            designTitle: "2. Forno Empurrador vs. Vigas Caminhantes: A Equação de Energia",
            designP1: "Nos fornos empurradores, enormes forças mecânicas são aplicadas para empurrar toda a linha de tarugos. Isso requer estruturas de skid resfriadas a água que absorvem de 10% a 15% do calor do combustível. Os projetos de vigas caminhantes reduzem a perda térmica dessas estruturas de suporte, aumentando a eficiência térmica.",
            liningTitle: "3. Redução de Perdas Térmicas: Upgrade para Teto de Fibra Cerâmica",
            liningText: "Os tetos de forno tradicionais têm grande inércia térmica. A conversão para um Teto Modular de Fibra Cerâmica reduz as perdas de calor pelo teto em mais de 40%. Isso também possibilita partidas rápidas em menos de 2 horas, economizando milhares de metros cúbicos de gás natural a cada parada.",
            calculatorCta: "Calcular ROI do Forno de Vigas →",
            back: "← Voltar para a Home",
        }
    };

    const currentT = t[lang as keyof typeof t] || t.en;

    const calcLink = lang === 'en'
        ? '/calculators/walking-beam-furnace-efficiency-calculator'
        : `/${lang}/calculators/walking-beam-furnace-efficiency-calculator`;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.1),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 carbon-pattern pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link to={lang === 'en' ? '/' : `/${lang}`} className="text-furnace-500 hover:text-furnace-600 transition-colors font-medium">
                        {currentT.back}
                    </Link>
                </div>

                {/* Hero Header */}
                <div className="border-b border-slate-800 pb-8 mb-12">
                    <span className="px-3 py-1 text-xs font-semibold tracking-wider text-furnace-500 uppercase bg-furnace-500/10 border border-furnace-500/20 rounded-full flex items-center gap-1.5 w-fit">
                        <ShieldCheck size={12} />
                        Engineering Standard Guide
                    </span>
                    <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
                        {currentT.title}
                    </h1>
                    <p className="mt-4 text-lg text-slate-400 leading-relaxed font-sans">
                        {currentT.subtitle}
                    </p>
                </div>

                {/* Article Content */}
                <div className="space-y-10 text-slate-300 leading-relaxed text-base font-sans">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-heading">
                            <Flame className="text-furnace-500" size={22} />
                            {currentT.introTitle}
                        </h2>
                        <p>{currentT.introText}</p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-heading">
                            <Flame className="text-furnace-500" size={22} />
                            {currentT.designTitle}
                        </h2>
                        <p>{currentT.designP1}</p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-heading">
                            <Flame className="text-furnace-500" size={22} />
                            {currentT.liningTitle}
                        </h2>
                        <p>{currentT.liningText}</p>
                    </section>

                    {/* Interactive CTA Link */}
                    <div className="glass-panel border-furnace-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-6 my-12">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-white">Interactive Engineering Assessment</h3>
                            <p className="text-xs text-slate-400">Estimate your steel mill's potential fuel savings and ROI using T80 coefficients.</p>
                        </div>
                        <Link
                            to={calcLink}
                            className="inline-flex items-center gap-2 py-3 px-6 bg-furnace-500 hover:bg-furnace-600 text-white rounded-lg transition-colors font-bold text-sm uppercase tracking-wider shadow-lg shadow-furnace-500/20 shrink-0"
                        >
                            <Calculator size={16} />
                            {currentT.calculatorCta}
                        </Link>
                    </div>

                    {/* FAQ Schema display */}
                    <section className="border-t border-slate-800 pt-10">
                        <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Engineering Questions</h3>
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80">
                                <h4 className="font-semibold text-white mb-2">Q: What is the primary advantage of a walking beam reheating furnace?</h4>
                                <p className="text-sm text-slate-400">A: Unlike pusher-type furnaces, walking beam furnaces lift and move slabs or billets, eliminating physical scratching, reducing skid marks, and permitting top-and-bottom heating for superior thermal uniformity.</p>
                            </div>
                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80">
                                <h4 className="font-semibold text-white mb-2">Q: How does a full-fiber roof reduce walking beam furnace fuel consumption?</h4>
                                <p className="text-sm text-slate-400">A: Ceramic fiber roofs exhibit extremely low thermal mass and thermal conductivity. This minimizes radiation losses through the furnace ceiling and allows the furnace to heat up or cool down rapidly, eliminating standby fuel waste.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default WalkingBeamGuide;
