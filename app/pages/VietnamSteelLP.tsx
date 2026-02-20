import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    AlertTriangle,
    Globe,
    DollarSign,
    Send,
    ArrowRight,
    BarChart3,
    Zap,
    ShieldCheck,
    Building2,
    Users,
    MousePointerClick,
    Info,
    X
} from 'lucide-react';
import type { MetaFunction } from 'react-router';
import emailjs from '@emailjs/browser';

export const meta: MetaFunction = ({ location }) => {
    return [
        { title: "Tuân thủ CBAM cho Thép Việt Nam | Giải pháp Năng lượng Không cần Vốn | EcoReheating" },
        { name: "description", content: "Giảm chi phí CBAM và tiết kiệm nhiên liệu 7-15% với giải pháp thu hồi nhiệt thải không cần vốn đầu tư. Đã chứng minh tại Thép Shengli Việt Nam. Đánh giá miễn phí." },
        { property: "og:title", content: "Tuân thủ CBAM cho Thép Việt Nam | EcoReheating" },
        { property: "og:description", content: "Giảm chi phí CBAM 20-40% + Tiết kiệm nhiên liệu 7-15%. Không cần vốn đầu tư ban đầu." },
        { property: "og:image", content: "https://ecoreheating.com/images/vietnam-steel-og.jpg" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://ecoreheating.com${location.pathname}` },
        { tagName: "link", rel: "canonical", href: `https://ecoreheating.com${location.pathname}` },
    ];
};

const VietnamSteelLP: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [showExitIntent, setShowExitIntent] = useState(false);
    const [hasExited, setHasExited] = useState(false);

    // GA Tracking Helper
    const trackEvent = (action: string, category: string, label: string, value?: number) => {
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }
    };

    // Exit Intent Logic
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 0 && !hasExited) {
                setShowExitIntent(true);
                setHasExited(true);
                trackEvent('exit_intent_show', 'engagement', 'vietnam_steel_lp');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasExited]);

    // Scroll Depth Tracking
    useEffect(() => {
        const thresholds = [25, 50, 75, 100];
        const tracked = new Set();

        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;
            const percentage = Math.round((scrollPos / totalHeight) * 100);

            thresholds.forEach(t => {
                if (percentage >= t && !tracked.has(t)) {
                    tracked.add(t);
                    trackEvent('scroll_depth', 'engagement', `vietnam_steel_lp_${t}%`, t);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');
        trackEvent('form_submit_start', 'conversion', 'vietnam_steel_lp');

        const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.currentTarget, PUBLIC_KEY)
            .then(() => {
                setFormState('success');
                trackEvent('generate_lead', 'conversion', 'vietnam_steel_lp');
            })
            .catch((error) => {
                console.error('FAILED...', error);
                alert("Đã xảy ra lỗi. Vui lòng thử lại hoặc gửi email cho chúng tôi tại contact@ecoreheating.com");
                setFormState('idle');
            });
    };

    const handlePdfDownload = (type: string) => {
        trackEvent('pdf_download', 'resource', type);
        // Link to actual PDF asset
        window.open('/assets/ecoreheating-vietnam-steel-cbam-guide.pdf', '_blank');
    };

    // Calculate target month for availability
    const today = new Date();
    const displayDate = new Date();
    if (today.getDate() >= 15) {
        displayDate.setMonth(today.getMonth() + 1);
    }
    const targetMonth = displayDate.toLocaleString('vi-VN', { month: 'long' });

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-furnace-500/30 overflow-x-hidden">
            {/* EXIT INTENT MODAL */}
            {showExitIntent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-industrial-950/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] overflow-hidden max-w-lg w-full shadow-2xl relative">
                        <button
                            onClick={() => setShowExitIntent(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <div className="p-10 text-center">
                            <div className="w-20 h-20 bg-orange-100 text-furnace-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                                <AlertTriangle size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                                ⚠️ Đợi đã! Đừng để CBAM <br />làm giảm lợi nhuận của bạn
                            </h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Tải xuống hướng dẫn miễn phí độc quyền của chúng tôi: <br />
                                <strong>"5 Bước Tuân thủ CBAM cho Nhà máy Thép Việt Nam"</strong>
                            </p>
                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        handlePdfDownload('exit_intent_guide');
                                        setShowExitIntent(false);
                                    }}
                                    className="w-full bg-furnace-600 text-white font-black py-5 rounded-2xl hover:bg-furnace-700 transition-all shadow-xl shadow-furnace-600/20 flex items-center justify-center gap-3"
                                >
                                    TẢI XUỐNG CẨM NANG MIỄN PHÍ
                                    <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={() => setShowExitIntent(false)}
                                    className="text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-slate-600"
                                >
                                    TÔI SẼ TỰ TÌM HIỂU SAU
                                </button>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Đã giúp 300+ nhà máy tối ưu hóa năng lượng</p>
                        </div>
                    </div>
                </div>
            )}

            {/* HERO SECTION */}
            <header className="relative py-20 lg:py-32 bg-industrial-950 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-furnace-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
                        <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-furnace-500 text-[10px] font-black tracking-widest uppercase">
                            CÔNG NGHỆ NIÊM YẾT CISA T80
                        </span>
                        <span className="px-4 py-1 rounded-full bg-furnace-600/20 border border-furnace-500/20 text-white text-[10px] font-black tracking-widest uppercase">
                            ĐÃ CHỨNG MINH TẠI THÉP SHENGLI (THĂNG LONG)
                        </span>
                        <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-widest uppercase">
                            300+ DÂY CHUYỀN TRÊN TOÀN THẾ GIỚI
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-heading font-black mb-8 leading-tight max-w-5xl mx-auto">
                        Giảm Chi phí CBAM + <br />
                        <span className="text-furnace-500 underline decoration-white/10">Tiết kiệm Nhiên liệu 7-15%</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                        Giải pháp Thu hồi Nhiệt thải Không cần Vốn đầu tư cho Nhà máy Thép Việt Nam.
                        Tối ưu hóa hành trình nhiệt từ máy đúc đến lò nung.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <a
                            href="#assessment-form"
                            onClick={() => trackEvent('cta_click', 'conversion', 'hero_assessment')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-furnace-600 hover:bg-furnace-700 text-white font-black px-12 py-6 rounded-2xl text-xl transition-all shadow-2xl shadow-furnace-600/40 uppercase tracking-widest group"
                        >
                            NHẬN ĐÁNH GIÁ MIỄN PHÍ (CÒN 1 CHỖ)
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#case-study"
                            onClick={() => trackEvent('cta_click', 'engagement', 'hero_case_study')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold px-12 py-6 rounded-2xl text-xl transition-all uppercase tracking-widest"
                        >
                            XEM DỰ ÁN VIỆT NAM
                        </a>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale contrast-150 brightness-200">
                        {/* Simple placeholder logos */}
                        <div className="text-sm font-black tracking-tighter italic">CISA T80 Listed</div>
                        <div className="text-sm font-black tracking-tighter italic">ISO 50001 Verified</div>
                        <div className="text-sm font-black tracking-tighter italic">Performance Guaranteed</div>
                    </div>
                </div>
            </header>

            {/* VIETNAM CASE STUDY SECTION */}
            <section id="case-study" className="py-24 bg-slate-50 scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-furnace-600 text-xs font-black uppercase tracking-widest mb-4 block">KẾT QUẢ THỰC TẾ</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900">
                                🇻🇳 Đã Chứng minh tại Việt Nam: <br className="hidden md:block" />
                                <span className="text-furnace-600 underline">Thép Shengli (Thăng Long)</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-200 shadow-xl flex flex-col justify-between">
                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 italic">DỰ ÁN</p>
                                            <p className="font-bold text-slate-900">Lò Nạp Liệu Lạnh 120 tấn/giờ</p>
                                        </div>
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 italic">ĐỊA ĐIỂM</p>
                                            <p className="font-bold text-slate-900">Việt Nam</p>
                                        </div>
                                        <div className="p-5 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between col-span-2">
                                            <div>
                                                <p className="text-[10px] text-green-700 uppercase font-black tracking-widest mb-1">TRẠNG THÁI</p>
                                                <p className="font-bold text-green-800">Hiệu suất Đã xác thực ✓</p>
                                            </div>
                                            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                                                <CheckCircle size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-heading font-black text-slate-900 flex items-center gap-2">
                                            <Zap size={18} className="text-furnace-500" />
                                            CÔNG NGHỆ TRIỂN KHAI:
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {[
                                                "Mái lò sợi đầy đủ",
                                                "Điều khiển nung thông minh",
                                                "Lớp phủ phát xạ cao",
                                                "Tối ưu hóa đốt cháy tiên tiến"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl text-slate-700 text-sm font-medium border border-transparent hover:border-slate-200 transition-all">
                                                    <CheckCircle size={14} className="text-furnace-500 shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handlePdfDownload('shengli_specs')}
                                    className="w-full mt-10 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 border border-slate-200"
                                >
                                    TẢI THÔNG SỐ KỸ THUẬT
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            <div className="bg-industrial-950 p-10 md:p-14 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-industrial-950/40">
                                <div className="absolute top-0 right-0 p-8">
                                    <ShieldCheck size={60} className="text-white/5" />
                                </div>

                                <h4 className="text-xs font-black text-furnace-500 uppercase tracking-[0.3em] mb-10 border-b border-white/10 pb-6 flex items-center justify-between">
                                    KẾT QUẢ ĐIỂN HÌNH (CISA T80):
                                    <span className="text-[10px] bg-furnace-600 text-white px-2 py-1 rounded">XÁC MINH 100%</span>
                                </h4>

                                <div className="space-y-8">
                                    {[
                                        { label: "Giảm tiêu thụ nhiên liệu", value: "7-15%", color: "text-furnace-500", detail: "Giảm trực tiếp chi phí vận hành" },
                                        { label: "Giảm cặn oxy hóa", value: "5-15%", color: "text-white", detail: "Phát hiện qua phôi tại máy cán" },
                                        { label: "Cải thiện năng suất", value: "0,1-0,3%", color: "text-white", detail: "Tăng lượng vật liệu thương mại" },
                                        { label: "Thời gian hoàn vốn", value: "1-2 năm", color: "text-green-400", detail: "Dựa trên tiết kiệm nhiên liệu thực" }
                                    ].map((stat, i) => (
                                        <div key={i} className="group cursor-default">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                                                <span className={`text-4xl md:text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{stat.detail}</p>
                                            <div className="h-1 bg-white/5 mt-4 rounded-full overflow-hidden">
                                                <div className="h-full bg-furnace-600 w-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CBAM URGENCY SECTION */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-8 border border-orange-200 shadow-sm">
                                    <AlertTriangle size={14} className="animate-pulse" />
                                    TÁC ĐỘNG TÀI CHÍNH 2026
                                </div>
                                <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight text-slate-900">
                                    Tác động của CBAM đến <br />
                                    Xuất khẩu Thép Việt Nam
                                </h2>
                                <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
                                    Từ <strong>01/01/2026</strong>, EU bắt đầu áp dụng thuế carbon đầy đủ. Các nhà nhập khẩu thép phải trả <strong>€75-100</strong> cho mỗi tấn CO2 trong thép Việt Nam nếu không chứng minh được hiệu quả năng lượng.
                                </p>

                                <div className="bg-slate-950 p-8 rounded-3xl text-white mb-10 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl rounded-full"></div>
                                    <h4 className="font-bold mb-6 text-furnace-500 flex items-center gap-2">
                                        <Info size={18} />
                                        Mô phỏng tác động nhà máy điển hình:
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                            <span className="text-gray-400 text-sm">Sản lượng mỗi năm:</span>
                                            <span className="font-black">500.000 tấn</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                            <span className="text-gray-400 text-sm">Tỷ lệ xuất khẩu EU:</span>
                                            <span className="font-black">30%</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                            <span className="text-gray-400 text-sm">Cường độ phát thải:</span>
                                            <span className="font-black text-red-400">2,1 tấn CO2/tấn</span>
                                        </div>
                                        <div className="flex flex-col pt-4">
                                            <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">CHI PHÍ PHÁT SINH HÀNG NĂM:</span>
                                            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">€2,4 - 3,2M</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-l-4 border-furnace-500 bg-furnace-50 flex items-center justify-between gap-6 rounded-r-2xl">
                                    <p className="text-slate-800 font-bold leading-tight">
                                        Muốn biết nhà máy của bạn có thể tiết kiệm được bao nhiêu?
                                    </p>
                                    <a
                                        href="#assessment-form"
                                        onClick={() => trackEvent('cta_click', 'engagement', 'cbam_urgency_arrow')}
                                        className="bg-furnace-600 text-white p-3 rounded-full hover:bg-furnace-700 transition-all shrink-0"
                                    >
                                        <ArrowRight />
                                    </a>
                                </div>
                            </div>

                            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Giảm phát thải 20-40%", desc: "Hạ thấp gánh nặng thuế CBAM trực tiếp thông qua tối ưu hóa nhiệt.", icon: <Zap className="text-furnace-500" /> },
                                    { title: "Cắt giảm 7-15% chi phí", desc: "Tăng biên lợi nhuận ngay lập tức bằng cách tiết kiệm nhiên liệu.", icon: <BarChart3 className="text-furnace-500" /> },
                                    { title: "Dữ liệu phát thải xác thực", desc: "Đáp ứng báo cáo khắt khe từ đối tác EU bằng chứng nhận thực tế.", icon: <ShieldCheck className="text-furnace-500" /> },
                                    { title: "Vốn đầu tư ban đầu bằng 0", desc: "Mô hình chia sẻ lợi nhuận, chúng tôi chịu rủi ro vốn.", icon: <DollarSign className="text-furnace-500" /> }
                                ].map((benefit, i) => (
                                    <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                                            {benefit.icon}
                                        </div>
                                        <h4 className="font-black text-slate-900 mb-3 text-lg">✅ {benefit.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                ))}

                                <div className="md:col-span-2 pt-6">
                                    <a
                                        href="#assessment-form"
                                        onClick={() => trackEvent('cta_click', 'engagement', 'benefit_calculator')}
                                        className="w-full flex items-center justify-center gap-4 bg-slate-900 text-white font-black py-6 rounded-2xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl group"
                                    >
                                        <MousePointerClick size={24} className="text-furnace-500 group-hover:scale-110 transition-transform" />
                                        TÍNH TOÁN TIẾT KIỆM CỦA BẠN
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERNATIONAL CREDIBILITY SECTION */}
            <section className="py-24 bg-industrial-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#ea580c_0%,transparent_50%)]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-furnace-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">MẠNG LƯỚI TOÀN CẦU</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black mb-4">
                            🌏 Đã Triển khai trên Toàn Đông Nam Á
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto font-light">
                            Hơn 300 dự án đã được bàn giao thành công với sự hài lòng tuyệt đối từ khách hàng.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {[
                            { country: "Việt Nam", plant: "Shengli (Thăng Long)", capacity: "120 t/h", flag: "🇻🇳", result: "Giảm 12% nhiên liệu, hoàn vốn trong 18 tháng" },
                            { country: "Indonesia", plant: "DCP Steel", capacity: "100 t/h Dual Fuel", flag: "🇮🇩", result: "Chuyển đổi nhiên liệu, giảm 40% phát thải CO2" },
                            { country: "Malaysia", plant: "Ann Joo Steel", capacity: "90 t/h Dual Fuel", flag: "🇲🇾", result: "Tối ưu hóa nhiệt độ dải hẹp, tăng 0.2% sản lượng" },
                            { country: "Bangladesh", plant: "KSRM Steel", capacity: "150 t/h", flag: "🇧🇩", result: "Giảm tiêu hao gas từ 180 xuống 155 m3/tấn" },
                            { country: "Ethiopia", plant: "Steel Plant", capacity: "50 t/h Oil/Gas", flag: "🇪🇹", result: "Hiện đại hóa mái lò, giảm 15% thất thoát nhiệt" }
                        ].map((project, i) => (
                            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-furnace-500/50 transition-all group flex flex-col justify-between h-full">
                                <div>
                                    <span className="text-5xl mb-6 block group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">{project.flag}</span>
                                    <p className="text-[10px] font-black text-furnace-500 uppercase tracking-widest mb-1 italic">{project.country}</p>
                                    <h4 className="font-black mb-2 text-white text-lg tracking-tight leading-tight">{project.plant}</h4>
                                    <p className="text-xs text-gray-500 mb-6 font-bold">{project.capacity}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[11px] text-gray-300 leading-snug italic">“{project.result}”</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-green-400 uppercase tracking-widest">
                                        <CheckCircle size={12} />
                                        Performance Verified
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ZERO-CAPEX MODEL SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 text-slate-900 leading-tight">
                                💰 Mô hình <span className="text-furnace-600">Không cần Vốn đầu tư</span> <br className="hidden md:block" /> Hoạt động như thế nào
                            </h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light italic">
                                Chúng tôi chịu 100% rủi ro tài chính và kỹ thuật. Bạn chỉ bắt đầu thanh toán khi khoản tiết kiệm đã được xác minh bằng đồng hồ đo thực tế.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-0 rounded-[40px] overflow-hidden shadow-2xl border border-slate-200">
                            {/* Traditional */}
                            <div className="p-10 md:p-14 bg-slate-50 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-black mb-10 text-slate-400 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-sm">❌</div>
                                        Phương pháp Truyền thống
                                    </h3>
                                    <ul className="space-y-8">
                                        {[
                                            "Đầu tư ban đầu $5-10M một lần",
                                            "Thời gian hoàn vốn dài (3-5 năm)",
                                            "Phải chịu mọi rủi ro về công nghệ",
                                            "Tự chịu gánh nặng bảo trì & phụ tùng"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-5 text-slate-500 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-12 p-6 bg-white/50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-xs text-slate-400 italic">Rủi ro: Dễ gặp thất bại nếu quy trình kỹ thuật không đạt yêu cầu.</p>
                                </div>
                            </div>

                            {/* Energy Steward */}
                            <div className="p-10 md:p-14 bg-industrial-950 text-white relative flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-8">
                                    <div className="bg-furnace-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20 shadow-lg">KHUYÊN DÙNG</div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-10 text-furnace-500 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-furnace-600 flex items-center justify-center text-white text-sm shadow-lg shadow-furnace-600/30">✅</div>
                                        Quản lý Năng lượng
                                    </h3>
                                    <ul className="space-y-8">
                                        {[
                                            "Chúng tôi đầu tư thiết bị ($0 từ bạn)",
                                            "Chia sẻ tiết kiệm nhiên liệu xác thực (50/50)",
                                            "Chúng tôi bảo trì thiết bị (đã bao gồm)",
                                            "Bạn giữ 100% tiết kiệm sau 5-7 năm"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-5 text-gray-200 font-bold">
                                                <div className="w-2 h-2 rounded-full bg-furnace-500 shadow-sm shadow-furnace-600"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 group hover:border-furnace-500/50 transition-all duration-500">
                                    <p className="text-[10px] text-furnace-500 font-black tracking-widest uppercase mb-4">VÍ DỤ TÁC ĐỘNG TÀI CHÍNH:</p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">Tiết kiệm dự kiến:</span>
                                            <span className="font-black text-white">$16M / năm</span>
                                        </div>
                                        <div className="flex justify-between text-xs p-2 bg-furnace-600/20 rounded-lg">
                                            <span className="text-gray-300 italic">Năm 1-5 (Chia sẻ):</span>
                                            <span className="font-black text-furnace-500">Bạn giữ $8M / năm</span>
                                        </div>
                                        <div className="flex justify-between text-xs p-2 bg-green-500/10 rounded-lg">
                                            <span className="text-gray-300 font-bold">Năm 6+ (Bạn sở hữu 100%):</span>
                                            <span className="font-black text-green-400">$16M / năm</span>
                                        </div>
                                        <div className="pt-2 border-t border-white/10">
                                            <div className="flex justify-between items-end">
                                                <span className="text-sm font-black text-white uppercase tracking-tighter">TỔNG LỢI ÍCH 10 NĂM:</span>
                                                <span className="text-2xl font-black text-furnace-500 tracking-tighter">$120M+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ASSESSMENT FORM SECTION */}
            <section id="assessment-form" className="py-24 bg-slate-50 relative scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 italic selection:bg-furnace-500/30">

                        {/* Copy Side (Left) */}
                        <div className="lg:w-2/5 p-10 md:p-16 bg-industrial-950 text-white relative">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-furnace-600 opacity-20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <span className="inline-block px-4 py-1 rounded-full bg-furnace-600/20 border border-furnace-500/30 text-furnace-500 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
                                        CƠ HỘI CÓ HẠN
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight">
                                        Nhận Đánh giá <br />
                                        <span className="text-furnace-500">Tuân thủ CBAM</span> Miễn phí
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light italic">
                                        Tìm hiểu chính xác bạn có thể tiết kiệm được bao nhiêu.
                                        Chúng tôi cung cấp đánh giá đường cơ sở toàn diện và
                                        dự báo ROI mà không mất chi phí trả trước.
                                    </p>

                                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl mb-12 group hover:border-furnace-500/30 transition-all">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-furnace-400">TÌNH TRẠNG HIỆN TẠI</span>
                                            <span className="text-[10px] font-black text-white bg-furnace-600 px-3 py-1 rounded-full animate-pulse">CÒN 1 CHỖ</span>
                                        </div>
                                        <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 mb-4 relative p-0.5">
                                            <div className="h-full bg-gradient-to-r from-furnace-600 via-furnace-500 to-furnace-400 w-[90%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                                        </div>
                                        <p className="text-[11px] text-gray-400 leading-relaxed italic">
                                            Do tính chất đòi hỏi vốn lớn của mô hình, chúng tôi chỉ chấp nhận 2 dự án mới mỗi tháng. <span className="text-white font-bold underline decoration-furnace-500">Còn 1 chỗ cho {targetMonth}.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    {[
                                        { title: "Dựa trên Dữ liệu", desc: "Đường cơ sở được thiết lập qua nhật ký sản xuất thực tế", icon: BarChart3 },
                                        { title: "Phân tích Chuyên gia", desc: "Đánh giá kỹ thuật cấp độ CISA T80", icon: Users },
                                        { title: "Đã Chứng minh tại Việt Nam", desc: "Thép Shengli: Lò 120 tấn/giờ, giảm nhiên liệu 7-15%", icon: Building2 }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 items-start group">
                                            <div className="w-12 h-12 bg-white/5 text-furnace-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-furnace-600 group-hover:text-white transition-all duration-500 shadow-xl border border-white/10">
                                                <item.icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-lg mb-1">✓ {item.title}</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed font-bold italic">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Side (Right) */}
                        <div className="lg:w-3/5 p-10 md:p-16">
                            {formState === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-green-600/10">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3 className="text-4xl font-heading font-black text-slate-900 mb-4 tracking-tighter uppercase">GỬI THÀNH CÔNG!</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto italic mb-10">
                                        Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu và sẽ liên hệ với bạn trong vòng 24 giờ.
                                    </p>

                                    <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 w-full mb-10">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">TÀI LIỆU DÀNH CHO BẠN:</p>
                                        <button
                                            onClick={() => handlePdfDownload('success_page_guide')}
                                            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
                                        >
                                            TẢI THÔNG SỐ KỸ THUẬT & HƯỚNG DẪN CBAM
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="mt-12 text-furnace-600 font-black hover:underline tracking-widest text-sm uppercase p-4"
                                    >
                                        GỬI YÊU CẦU KHÁC →
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                                HỌ VÀ TÊN <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_name"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold placeholder:text-slate-300 placeholder:italic"
                                                placeholder="Họ và tên của bạn"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                                CÔNG TY <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_company"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold placeholder:text-slate-300 placeholder:italic"
                                                placeholder="Tên nhà máy thép / Tập đoàn"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                                QUỐC GIA / KHU VỰC <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_region"
                                                defaultValue="Việt Nam"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                                EMAIL CÔNG TY <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                name="user_email"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold placeholder:italic"
                                                placeholder="name@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                                SẢN LƯỢNG HÀNG NĂM <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_production"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold placeholder:italic"
                                                placeholder="Ví dụ: 2,5 triệu tấn"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                                CHỨC VỤ (Tùy chọn)
                                            </label>
                                            <select
                                                name="user_role"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold bg-transparent"
                                            >
                                                <option value="">Chọn chức vụ...</option>
                                                <option value="CEO">CEO / Tổng giám đốc</option>
                                                <option value="Technical-Director">Giám đốc kỹ thuật</option>
                                                <option value="Energy-Manager">Quản lý năng lượng</option>
                                                <option value="Other">Khác</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                                ĐIỆN THOẠI / WHATSAPP
                                            </label>
                                            <input
                                                type="tel"
                                                name="user_phone"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold"
                                                placeholder="+84..."
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                                LOẠI LÒ NUNG (Tùy chọn)
                                            </label>
                                            <select
                                                name="user_furnace_type"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold bg-transparent"
                                            >
                                                <option value="">Chọn loại lò...</option>
                                                <option value="Walking-Beam">Lò dầm bước (Walking Beam)</option>
                                                <option value="Walking-Hearth">Lò đáy sàn (Walking Hearth)</option>
                                                <option value="Pusher">Lò đẩy (Pusher Type)</option>
                                                <option value="Other">Khác / Không rõ</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                            LỜI NHẮN (Tùy chọn)
                                        </label>
                                        <textarea
                                            rows={2}
                                            name="message"
                                            className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold placeholder:italic"
                                            placeholder="Các thách thức cụ thể hoặc mối quan tâm về CBAM..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formState === 'submitting'}
                                        className={`w-full bg-furnace-600 hover:bg-furnace-700 text-white font-black text-2xl py-8 rounded-[24px] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-furnace-600/30 flex items-center justify-center gap-4 group ${formState === 'submitting' ? 'opacity-75 cursor-wait' : 'hover:scale-[1.01]'}`}
                                    >
                                        {formState === 'submitting' ? 'ĐANG GỬI...' : (
                                            <>
                                                GỬI YÊU CẦU ĐÁNH GIÁ (CÒN 1 CHỖ)
                                                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <p className="text-[10px] text-slate-400 text-center sm:text-left italic">
                                            Tham gia cùng <span className="text-slate-900 font-bold">300+ nhà máy thép</span> toàn thế giới đã được tối ưu hóa bằng công nghệ CISA T80.
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-800 border-2 border-slate-900 px-4 py-2 rounded-xl">
                                            <ShieldCheck size={14} className="text-furnace-500" />
                                            ĐẢM BẢO QUYỀN RIÊNG TƯ (MNDA)
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* MINI FOOTER */}
            <footer className="py-20 bg-industrial-950 text-white border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 opacity-40 grayscale contrast-150">
                        {/* Symbolic elements */}
                        <div className="text-xl font-heading font-black tracking-tighter">EcoReheating</div>
                        <div className="w-1 h-1 rounded-full bg-gray-500 hidden md:block"></div>
                        <div className="text-lg font-bold tracking-widest">CISA T80 STANDARDS</div>
                        <div className="w-1 h-1 rounded-full bg-gray-500 hidden md:block"></div>
                        <div className="text-lg font-bold tracking-widest">PERFORMANCE GUARANTEED</div>
                    </div>
                    <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">
                        &copy; 2026 EcoReheating. Đã đăng ký bản quyền. <br className="md:hidden" />
                        Mastering Energy. Creating Value.
                    </p>
                </div>
            </footer>

            {/* EXIT INTENT (Pseudo Implementation for Landing Page) */}
            <div className="fixed bottom-8 right-8 z-50 pointer-events-none sm:pointer-events-auto">
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-4 animate-bounce-subtle">
                    <div className="w-10 h-10 bg-furnace-600 text-white rounded-full flex items-center justify-center shrink-0">
                        <BarChart3 size={20} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-black text-furnace-500 uppercase tracking-widest">ĐANG TRỰC TUYẾN</p>
                        <p className="text-xs font-bold text-slate-900">Khảo sát baseline miễn phí</p>
                    </div>
                </div>
            </div>

            {/* STYLES FOR ANIMATIONS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s infinite ease-in-out;
                }
                .font-heading {
                    font-family: 'Oswald', sans-serif;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
            `}} />
        </div>
    );
};

export default VietnamSteelLP;
