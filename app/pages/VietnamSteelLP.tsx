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
    X,
    ChevronDown,
    Plus,
    Minus,
    ArrowUpRight
} from 'lucide-react';
import type { MetaFunction } from 'react-router';
import emailjs from '@emailjs/browser';

export const meta: MetaFunction = ({ location }) => {
    return [
        { title: "Tuân thủ CBAM cho Thép Việt Nam | Tiết kiệm €2-3M phí Carbon mỗi năm" },
        { name: "description", content: "Bạn đang lo lắng về thuế Carbon EU? Giảm 20-40% phát thải và tiết kiệm 7-15% nhiên liệu với giải pháp Zero CAPEX. Đã chứng minh tại Thép Shengli. Đánh giá ROI miễn phí ngay." },
        { property: "og:title", content: "Tuân thủ CBAM cho Thép Việt Nam | EcoReheating" },
        { property: "og:description", content: "Giảm chi phí CBAM 20-40% + Tiết kiệm nhiên liệu 7-15%. Không cần vốn đầu tư ban đầu." },
        { property: "og:image", content: "https://www.ecoreheating.com/images/vietnam-steel-og.jpg" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://www.ecoreheating.com${location.pathname}` },
        { tagName: "link", rel: "canonical", href: `https://www.ecoreheating.com${location.pathname}` },
    ];
};

const VietnamSteelLP: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [showExitIntent, setShowExitIntent] = useState(false);
    const [hasExited, setHasExited] = useState(false);
    const [showSpecsModal, setShowSpecsModal] = useState(false);
    const [calcAnnualProd, setCalcAnnualProd] = useState<number | string>('');
    const [calcEuRatio, setCalcEuRatio] = useState<number | string>('');
    const [calcIntensity, setCalcIntensity] = useState<number | string>(2.1);
    const [isCalculating, setIsCalculating] = useState(false);
    const [calcResult, setCalcResult] = useState<{ cost: number; savings: number } | null>(null);
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null);

    // Countdown Logic
    useEffect(() => {
        // Count down to the end of the 2026 Summer Peak Season (August 31)
        const targetDate = new Date('2026-08-31T23:59:59');
        const timer = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            if (diff <= 0) {
                clearInterval(timer);
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                secs: Math.floor((diff % (1000 * 60)) / 1000)
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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

    const handleCalculate = () => {
        if (!calcAnnualProd || isNaN(Number(calcAnnualProd))) return;
        setIsCalculating(true);
        trackEvent('calculator_use', 'engagement', 'hero_calc');

        setTimeout(() => {
            const prod = Number(calcAnnualProd);
            const ratio = Number(calcEuRatio || 100) / 100;
            const intensity = Number(calcIntensity || 2.1);

            const euVolume = prod * ratio;
            // Rough calculation: EU Volume * Intensity tCO2/t * 80 EUR/tCO2
            const carbonCost = euVolume * intensity * 80;
            
            // NEW: Summer Electricity Spike Calculation (Decision 963 impact)
            // Assuming 20% of energy is during peak hours, and peak is 3.3x costlier
            const summerElectricityCost = (prod * 0.05) * 3.3 * 100; // Simplified proxy for cost hike
            
            const totalCost = carbonCost + summerElectricityCost;
            // Savings are roughly 15% of the intensity reduction + 20% load shifting savings
            const savings = totalCost * 0.18;

            setCalcResult({ cost: totalCost, savings });
            setIsCalculating(false);
            trackEvent('calculator_result', 'engagement', 'hero_calc', Math.round(cost));
        }, 800);
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
            {/* SUMMER CRISIS ALERT BANNER */}
            <div className="bg-red-600 text-white py-3 px-4 text-center sticky top-0 z-[60] shadow-lg">
                <div className="container mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-black uppercase tracking-widest">
                    <Zap size={18} className="animate-pulse" />
                    CẢNH BÁO: QUY ĐỊNH 963 CỦA EVN ĐÃ CÓ HIỆU LỰC - GIÁ ĐIỆN CAO ĐIỂM TĂNG 3.3X
                    <a href="#decision-963" className="underline hover:text-white/80 ml-4 hidden md:inline">XEM GIẢI PHÁP TỨC THÌ →</a>
                </div>
            </div>

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

            {/* SPECS MODAL */}
            {showSpecsModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-industrial-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
                    <div className="bg-white rounded-[32px] overflow-hidden max-w-2xl w-full shadow-2xl relative my-8">
                        {/* Header */}
                        <div className="bg-industrial-950 p-6 sm:p-8 text-white relative">
                            <button
                                onClick={() => setShowSpecsModal(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-furnace-500 text-xs font-black uppercase tracking-widest">THÔNG SỐ KỸ THUẬT CHI TIẾT</span>
                            </div>
                            <h3 className="text-2xl font-black mb-0">Thép Shengli (Thăng Long)</h3>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">

                            {/* Dự án */}
                            <div>
                                <h4 className="flex items-center gap-2 text-slate-900 font-black mb-4"><Building2 size={18} className="text-furnace-500" /> THÔNG TIN DỰ ÁN</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Nhà máy</span>
                                        <strong className="text-slate-900">Shengli Steel, Việt Nam</strong>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Thiết bị</span>
                                        <strong className="text-slate-900">Lò Nạp Liệu Lạnh 120t/h</strong>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Thời gian triển khai</span>
                                        <strong className="text-slate-900">2023</strong>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                                        <span className="text-[10px] text-green-600 font-bold uppercase block mb-1">Trạng thái</span>
                                        <strong className="text-green-800 flex items-center gap-1">Đã xác thực <CheckCircle size={14} /></strong>
                                    </div>
                                </div>
                            </div>

                            {/* Công nghệ */}
                            <div>
                                <h4 className="flex items-center gap-2 text-slate-900 font-black mb-4"><Zap size={18} className="text-furnace-500" /> CÔNG NGHỆ TRIỂN KHAI</h4>
                                <div className="space-y-3">
                                    {[
                                        { title: "Mái lò sợi đầy đủ", effect: "Giảm thất thoát nhiệt qua mái lò", result: "Tiết kiệm nhiên liệu 3-5%" },
                                        { title: "Điều khiển nung thông minh", effect: "Tối ưu hóa tỷ lệ không khí/nhiên liệu", result: "Giảm tiêu hao gas 5-8%" },
                                        { title: "Lớp phủ phát xạ cao", effect: "Tăng hiệu suất truyền nhiệt", result: "Giảm oxy hóa cán 5-15%" },
                                        { title: "Tối ưu hóa đốt cháy tiên tiến", effect: "Cải thiện phân bố nhiệt độ", result: "Tăng sản lượng 0.1-0.3%" }
                                    ].map((tech, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="sm:w-1/3">
                                                <strong className="text-slate-900 text-sm block">{i + 1}. {tech.title}</strong>
                                            </div>
                                            <div className="sm:w-2/3 text-sm text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <ArrowRight size={14} className="text-slate-400 shrink-0" /> {tech.effect}
                                                </div>
                                                <div className="flex items-center gap-2 text-furnace-600 font-medium mt-1">
                                                    <ArrowRight size={14} className="text-furnace-400 shrink-0" /> {tech.result}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Kết quả */}
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="flex items-center gap-2 text-slate-900 font-black mb-4"><BarChart3 size={18} className="text-furnace-500" /> KẾT QUẢ ĐÃ XÁC THỰC</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Giảm tiêu thụ nhiên liệu:</span>
                                            <strong className="text-furnace-600">7-15%</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Giảm cán oxy hóa:</span>
                                            <strong className="text-slate-900">5-15%</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Cải thiện năng suất:</span>
                                            <strong className="text-slate-900">0.1-0.3%</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Thời gian hoàn vốn:</span>
                                            <strong className="text-green-600">1-2 năm</strong>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="flex items-center gap-2 text-slate-900 font-black mb-4"><DollarSign size={18} className="text-furnace-500" /> TÁC ĐỘNG TÀI CHÍNH <span className="text-[10px] font-normal text-slate-400 ml-1">(Nhà máy 500K tấn/năm)</span></h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Tiết kiệm nhiên liệu:</span>
                                            <strong className="text-slate-900">$800K - $1.2M/năm</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Giảm phế phẩm:</span>
                                            <strong className="text-slate-900">$200K - $400K/năm</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Tăng sản lượng:</span>
                                            <strong className="text-slate-900">$100K - $300K/năm</strong>
                                        </div>
                                        <div className="flex justify-between bg-furnace-50 p-2 rounded-lg border border-furnace-100 mt-2">
                                            <span className="text-furnace-700 font-bold">Tổng tiết kiệm:</span>
                                            <strong className="text-furnace-600 text-base">$1.1M - $1.9M/năm</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer (Actions) */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => handlePdfDownload('shengli_specs_full')}
                                className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                TẢI BẢN ĐẦY ĐỦ (PDF)
                            </button>
                            <a
                                href="#assessment-form"
                                onClick={() => {
                                    setShowSpecsModal(false);
                                    trackEvent('cta_click', 'conversion', 'modal_consultation');
                                }}
                                className="flex-1 bg-furnace-600 hover:bg-furnace-700 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-furnace-600/20"
                            >
                                <Users size={16} />
                                ĐẶT LỊCH TƯ VẤN
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* HERO SECTION */}
            <header className="relative py-20 lg:py-32 bg-industrial-950 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-furnace-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in">
                            <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-furnace-500 text-[10px] font-black tracking-widest uppercase">
                                CÔNG NGHỆ NIÊM YẾT CISA T80
                            </span>
                            <span className="px-4 py-1 rounded-full bg-furnace-600/20 border border-furnace-500/20 text-white text-[10px] font-black tracking-widest uppercase">
                                ĐÃ CHỨNG MINH TẠI THÉP SHENGLI (THĂNG LONG)
                            </span>
                        </div>

                        {/* CBAM COUNTDOWN TIMER */}
                        {timeLeft && (
                            <div className="inline-flex flex-wrap items-center justify-center gap-4 mb-10 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 animate-fade-in shadow-xl">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-furnace-500 pl-4 pr-2">
                                    ĐẾM NGƯỢC THUẾ CBAM:
                                </div>
                                <div className="flex gap-2">
                                    {[
                                        { v: timeLeft.days, u: "Ngày" },
                                        { v: timeLeft.hours, u: "Giờ" },
                                        { v: timeLeft.mins, u: "Phút" },
                                        { v: timeLeft.secs, u: "Giây" }
                                    ].map((t, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-industrial-950 rounded-xl border border-white/10">
                                            <span className="text-xl font-black tracking-tighter tabular-nums text-white">
                                                {t.v.toString().padStart(2, '0')}
                                            </span>
                                            <span className="text-[8px] font-black uppercase text-gray-500 tracking-tighter">{t.u}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="hidden lg:flex items-center gap-2 pl-2 pr-4 text-[10px] font-bold text-red-500 animate-pulse">
                                    <AlertTriangle size={12} />
                                    KẾT THÚC MÙA CAO ĐIỂM HÈ
                                </div>
                            </div>
                        )}

                        <h1 className="text-4xl md:text-7xl font-heading font-black mb-8 leading-tight max-w-6xl mx-auto tracking-tight">
                            Khủng Hoảng Điện Hè & CBAM 2026? <br />
                            <span className="text-furnace-500 underline decoration-white/10 italic">Giảm 30% Phụ Tải Đỉnh, Tiết Kiệm Tới 15% Nhiên Liệu</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                            Đối phó với Quyết định 963 và Thuế Carbon EU với mô hình Zero CAPEX.
                            Giảm chi phí vận hành ngay trong đợt nắng nóng kỷ lục này.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-2 md:p-3 mb-20 backdrop-blur-md shadow-2xl overflow-hidden">
                        <div className="flex flex-col md:flex-row items-stretch gap-2">
                            <div className="flex-1 p-8 md:p-10">
                                <label className="block text-[10px] font-black text-furnace-500 uppercase tracking-[0.3em] mb-6">
                                    CÔNG CỤ TÍNH CHI PHÍ KHỦNG HOẢNG NĂNG LƯỢNG 2026
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sản lượng (tấn/năm)</label>
                                        <input
                                            type="text"
                                            value={calcAnnualProd}
                                            onChange={(e) => setCalcAnnualProd(e.target.value)}
                                            placeholder="VD: 500,000"
                                            className="w-full bg-white/5 border-b border-white/20 py-2 outline-none focus:border-furnace-500 transition-all font-black text-xl text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tỷ lệ xuất EU (%)</label>
                                        <input
                                            type="text"
                                            value={calcEuRatio}
                                            onChange={(e) => setCalcEuRatio(e.target.value)}
                                            placeholder="VD: 30"
                                            className="w-full bg-white/5 border-b border-white/20 py-2 outline-none focus:border-furnace-500 transition-all font-black text-xl text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cường độ CO2 (t/t)</label>
                                        <input
                                            type="text"
                                            value={calcIntensity}
                                            onChange={(e) => setCalcIntensity(e.target.value)}
                                            className="w-full bg-white/5 border-b border-white/20 py-2 outline-none focus:border-furnace-500 transition-all font-black text-xl text-white"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleCalculate}
                                    className="w-full bg-furnace-600 hover:bg-furnace-700 text-white py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-furnace-600/20 uppercase tracking-widest text-sm"
                                >
                                    <BarChart3 size={18} />
                                    TÍNH TOÁN CHI PHÍ & TIẾT KIỆM
                                </button>
                            </div>

                            <div className={`md:w-2/5 p-8 md:p-10 rounded-[32px] transition-all duration-700 flex flex-col justify-center relative overflow-hidden ${calcResult ? 'bg-furnace-600 text-white shadow-[0_20px_50px_rgba(249,115,22,0.3)]' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                                {isCalculating ? (
                                    <div className="flex flex-col items-center gap-4 py-4 animate-pulse">
                                        <div className="w-12 h-12 border-4 border-furnace-500/30 border-t-furnace-500 rounded-full animate-spin"></div>
                                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-furnace-500">ĐANG PHÂN TÍCH...</span>
                                    </div>
                                ) : calcResult ? (
                                    <div className="animate-fade-in-up">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-white/70">KẾT QUẢ DỰ BÁO CBAM:</p>
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase text-white/60 mb-1">PHẢI TRẢ (DỰ KIẾN):</p>
                                                <div className="text-4xl font-black tracking-tighter italic">
                                                    $ {(calcResult.cost / 1000000).toFixed(2)}M <span className="text-xl font-normal opacity-60">/năm</span>
                                                </div>
                                            </div>
                                            <div className="pt-6 border-t border-white/20">
                                                <p className="text-[10px] font-bold uppercase text-white/60 mb-1 tracking-widest">CƠ HỘI TIẾT KIỆM TỨC THÌ:</p>
                                                <div className="text-3xl font-black text-white flex items-center gap-2">
                                                    $ {(calcResult.savings / 1000000).toFixed(2)}M
                                                    <ArrowUpRight size={24} className="text-white/40" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4 py-4 relative z-10 animate-fade-in text-white/70">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-white/5">
                                            <Info size={32} className="text-furnace-500/50" />
                                        </div>
                                        <p className="text-sm font-bold italic leading-relaxed max-w-[180px] mx-auto">
                                            Nhập thông tin để <span className="text-furnace-500">xem ngay</span> thiệt hại từ Điện & CBAM
                                        </p>
                                    </div>
                                )}

                                {/* Background glow for empty state */}
                                {!calcResult && !isCalculating && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-furnace-600/5 to-transparent pointer-events-none"></div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <a
                            href="#assessment-form"
                            onClick={() => trackEvent('cta_click', 'conversion', 'hero_assessment')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-furnace-600 hover:bg-furnace-700 text-white font-black px-12 py-6 rounded-2xl text-xl transition-all shadow-2xl shadow-furnace-600/40 uppercase tracking-widest group"
                        >
                            NHẬN BÁO CÁO CẮT GIẢM CHI PHÍ
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
                        <div className="text-sm font-black tracking-tighter italic">CISA T80 Listed</div>
                        <div className="text-sm font-black tracking-tighter italic">ISO 50001 Verified</div>
                        <div className="text-sm font-black tracking-tighter italic">Performance Guaranteed</div>
                    </div>
                </div>
            </header>

            {/* CBAM URGENCY SECTION - MOVED TO SECOND SCREEN */}
            <section className="py-24 bg-white relative scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-8 border border-orange-200 shadow-sm shadow-orange-600/10 animate-pulse">
                                    <AlertTriangle size={14} />
                                    CBAM ĐÃ CÓ HIỆU LỰC TỪ 01/01/2026
                                </div>
                                <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight text-slate-900">
                                    Tác động của CBAM đến <br />
                                    Thép Xuất Khẩu Việt Nam
                                </h2>
                                <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
                                    EU bắt đầu áp dụng thuế carbon đầy đủ. Nếu không hành động ngay, chi phí xuất khẩu sẽ tăng <strong>€75-100/tấn CO2</strong>, trực tiếp xóa sổ lợi thế cạnh tranh của các nhà máy thép Việt Nam.
                                </p>

                                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 mb-10">
                                    <h4 className="font-black text-red-900 mb-4 flex items-center gap-2">⚠️ RỦI RO NẾU KHÔNG HÀNH ĐỘNG NGAY:</h4>
                                    <ul className="space-y-3 text-red-800 text-sm font-medium">
                                        <li className="flex items-start gap-2">
                                            <X size={16} className="shrink-0 mt-0.5" /> Chi phí xuất khẩu tăng vọt (không kiểm soát được thuế Carbon)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <X size={16} className="shrink-0 mt-0.5" /> Mất lợi thế cạnh tranh so với các đối thủ đã tối ưu hóa
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <X size={16} className="shrink-0 mt-0.5" /> Đối tác EU ưu tiên chuyển sang các nhà cung cấp Carbon thấp
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-slate-950 p-8 rounded-3xl text-white mb-10 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl rounded-full"></div>
                                    <h4 className="font-bold mb-6 text-furnace-500 flex items-center gap-2">
                                        <Info size={18} />
                                        Mô phỏng thiệt hại tài chính:
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                            <span className="text-gray-400 text-sm">Sản lượng xuất khẩu:</span>
                                            <span className="font-black">150.000 tấn/năm</span>
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
                            </div>

                            <div className="lg:w-1/2">
                                <h4 className="text-[10px] font-black text-furnace-500 uppercase tracking-[0.3em] mb-8">
                                    LỘ TRÌNH 3 BƯỚC KHẮC PHỤC
                                </h4>
                                <div className="space-y-6">
                                    {[
                                        {
                                            step: "01",
                                            title: "Đánh giá Baseline",
                                            desc: "Đo lường cường độ phát thải thực tế của nhà máy.",
                                            icon: <BarChart3 />
                                        },
                                        {
                                            step: "02",
                                            title: "Tối ưu hóa Lò Nung",
                                            desc: "Giảm 7-15% nhiên liệu = Giảm 7-15% CO2 phát thải.",
                                            icon: <Zap />
                                        },
                                        {
                                            step: "03",
                                            title: "Xác thực & Báo cáo",
                                            desc: "Dữ liệu đo đạc thực tế theo tiêu chuẩn CISA T80 cho đối tác EU.",
                                            icon: <ShieldCheck />
                                        }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[32px] shadow-lg hover:shadow-2xl transition-all group">
                                            <div className="w-16 h-16 bg-slate-50 text-furnace-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-furnace-600 group-hover:text-white transition-all duration-500 shadow-xl">
                                                {s.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-slate-300 font-black text-2xl italic">{s.step}</span>
                                                    <h4 className="font-black text-slate-900 text-xl">{s.title}</h4>
                                                </div>
                                                <p className="text-sm text-slate-500 leading-relaxed font-bold italic">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12">
                                    <a
                                        href="#assessment-form"
                                        onClick={() => trackEvent('cta_click', 'engagement', 'cbam_strategy_click')}
                                        className="w-full flex items-center justify-center gap-4 bg-slate-900 text-white font-black py-8 rounded-3xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl group"
                                    >
                                        <MousePointerClick size={24} className="text-furnace-500 group-hover:scale-110 transition-transform" />
                                        NHẬN TƯ VẤN LỘ TRÌNH MIỄN PHÍ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DECISION 963 TECHNICAL SECTION */}
            <section id="decision-963" className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-furnace-500 to-transparent"></div>
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="p-8 md:p-12 bg-white/5 rounded-[40px] border border-white/10 relative">
                                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-furnace-600 rounded-3xl flex items-center justify-center shadow-xl rotate-3">
                                        <Zap size={40} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-8 pt-4">Phân tích Quyết định 963/QĐ-BCT</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 font-bold">!</div>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                <strong className="text-white">Giờ cao điểm mới:</strong> 17:30 – 22:30 hàng ngày. Đây là khung giờ tiêu thụ điện của lò nung lại đắt đỏ nhất (gấp 3.3 lần giờ thấp điểm).
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-furnace-500/20 text-furnace-500 flex items-center justify-center shrink-0 font-bold">✓</div>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                <strong className="text-white">Giải pháp T80:</strong> Sử dụng AI để dự báo nhu cầu cán và "nạp nhiệt tích lũy" trong giờ bình thường. Khi đến 17:30, lò tự động chuyển sang chế độ duy trì tiêu thụ điện tối thiểu mà không làm gián đoạn dây chuyền.
                                            </p>
                                        </div>
                                        <div className="pt-6 border-t border-white/10 mt-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tiềm năng tiết kiệm điện mùa hè:</span>
                                                <span className="text-xl font-black text-furnace-500">20% - 30%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-furnace-600 w-[75%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <span className="text-furnace-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">KỸ THUẬT & VẬN HÀNH</span>
                                <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight">
                                    Dịch Chuyển Phụ Tải <br />
                                    Thông Minh Bằng AI
                                </h2>
                                <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
                                    Chúng tôi không chỉ cải thiện hiệu suất nhiệt; chúng tôi cung cấp khả năng <strong>"Phản ứng phụ tải" (Demand Response)</strong>. Lò nung T80 của bạn sẽ tự động biết khi nào nên tăng tốc và khi nào nên tiết kiệm để tối ưu hóa hóa đơn tiền điện EVN.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Kiểm soát Stoichiometry dự đoán theo thời gian thực",
                                        "Tự động hóa nạp/xuất phôi dựa trên biểu giá điện",
                                        "Giảm tỷ lệ oxy hóa bề mặt trong điều kiện nhiệt độ cao",
                                        "Báo cáo carbon kỹ thuật số tự động cho CBAM"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-200 font-bold text-sm">
                                            <CheckCircle size={18} className="text-furnace-500 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                    onClick={() => {
                                        setShowSpecsModal(true);
                                        trackEvent('view_specs_modal', 'engagement', 'vietnam_steel_lp');
                                    }}
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

            {/* COMPETITOR COMPARISON SECTION */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 text-slate-900 leading-tight italic uppercase tracking-tighter">
                                Vì sao 300+ nhà máy <br />
                                <span className="text-furnace-600">Chọn EcoReheating?</span>
                            </h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed italic border-l-4 border-furnace-500 pl-6 text-left inline-block">
                                So sánh các phương án tối ưu hóa lò nung và tuân thủ CBAM hiện nay tại thị trường Việt Nam.
                            </p>
                        </div>

                        <div className="overflow-x-auto pb-8">
                            <table className="w-full min-w-[800px] border-collapse bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-200">
                                <thead>
                                    <tr className="bg-industrial-950 text-white">
                                        <th className="p-8 text-left text-xs font-black uppercase tracking-[0.2em] opacity-40">TÍNH NĂNG</th>
                                        <th className="p-8 text-center text-xs font-black uppercase tracking-[0.2em] opacity-40 bg-white/5">MUA MỚI / EPC</th>
                                        <th className="p-8 text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">TỰ CẢI TẠO</th>
                                        <th className="p-8 text-center text-sm font-black uppercase tracking-[0.3em] text-furnace-500 bg-white/10 relative">
                                            ECOREHEATING
                                            <div className="absolute top-0 right-0 p-2">
                                                <div className="bg-furnace-600 text-[8px] px-2 py-0.5 rounded text-white font-black animate-pulse">CISA T80</div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700 font-bold">
                                    {[
                                        { field: "Vốn đầu tư (CAPEX)", traditional: "$2M - $5M+", self: "$500k - $1M+", eco: "$0 (Không đồng)", highlight: true },
                                        { field: "Rủi ro kỹ thuật", traditional: "Chủ đầu tư chịu", self: "Rất cao (tự mò mẫm)", eco: "100% EcoReheating chịu" },
                                        { field: "Tuân thủ CBAM", traditional: "Tùy nhà sản xuất", self: "Không đảm bảo", eco: "Đạt chuẩn CISA T80" },
                                        { field: "Sâu định hướng Carbon", traditional: "Kén thiết bị", self: "Khó thực hiện", eco: "Theo bộ tiêu chuẩn EU" },
                                        { field: "Thời gian hoàn vốn", traditional: "3 - 5 năm", self: "Không rõ ràng", eco: "Tức thì (Tiết kiệm > Chi phí)" },
                                        { field: "Bảo trì & Vận hành", traditional: "Chủ đầu tư", self: "Tự cung tự cấp", eco: "Trọn gói (Miễn phí)" }
                                    ].map((row, i) => (
                                        <tr key={i} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-all ${row.highlight ? 'bg-orange-50/30' : ''}`}>
                                            <td className="p-8 text-sm uppercase tracking-tight font-black border-r border-slate-100">{row.field}</td>
                                            <td className="p-8 text-center opacity-60 text-sm">{row.traditional}</td>
                                            <td className="p-8 text-center opacity-60 text-sm">{row.self}</td>
                                            <td className="p-8 text-center text-slate-900 font-black text-base bg-furnace-50/30">
                                                <span className={row.eco.includes("$0") || row.eco.includes("100%") ? "text-furnace-600" : ""}>{row.eco}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                    <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight text-white">
                                        Tính Toán Chi Phí <br />
                                        <span className="text-furnace-500">CBAM Của Bạn</span> (Miễn Phí)
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
                            <div className="mb-12">
                                <h3 className="text-2xl md:text-3xl font-heading font-black text-slate-900 mb-2 tracking-tighter uppercase italic">
                                    Tính Toán Chi Phí CBAM Của Bạn <span className="text-furnace-600">(Miễn Phí)</span>
                                </h3>
                                <p className="text-slate-500 text-sm font-bold italic border-l-2 border-furnace-500/30 pl-4 uppercase tracking-tighter opacity-70">
                                    Điền thông tin để nhận báo cáo phân tích lộ trình giảm Carbon & Tiết kiệm chi tiết.
                                </p>
                            </div>

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
                                            <label className="block text-[12px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
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
                                            <label className="block text-[12px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                                LƯỢNG XUẤT KHẨU EU (TẤN) <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_eu_export"
                                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 outline-none focus:border-furnace-500 transition-all font-bold placeholder:italic"
                                                placeholder="Sản lượng xuất EU mỗi năm"
                                            />
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
                                        className={`w-full bg-furnace-600 hover:bg-furnace-700 text-white font-black text-2xl py-8 rounded-[24px] uppercase tracking-[0.2em] transition-all shadow-2xl shadow-furnace-600/30 flex items-center justify-center gap-4 group ${formState === 'submitting' ? 'opacity-75 cursor-wait' : 'hover:scale-[1.01]'}`}
                                    >
                                        {formState === 'submitting' ? 'ĐANG GỬI...' : (
                                            <>
                                                NHẬN TƯ VẤN & TÍNH TOÁN NGAY
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
            {/* FAQ SECTION */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-furnace-600 text-xs font-black uppercase tracking-[0.3em] mb-4 block">HỎI ĐÁP QUAN TRỌNG</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tighter uppercase italic">
                                Bạn còn thắc mắc <br />
                                <span className="text-furnace-600">về CBAM & Tối ưu hóa?</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "CISA T80 là gì và tại sao nó lại quan trọng cho CBAM?",
                                    a: "CISA T80 (CISA Technical Standard 80) là bộ tiêu chuẩn quốc tế cho hiệu suất lò nung thép. Các đối tác EU tin tưởng dữ liệu được xác thực bởi CISA T80 hơn các báo cáo đo lường nội bộ thủ công, giúp nhà máy chứng minh nỗ lực giảm Carbon một cách chính xác trước khi áp thuế CBAM đầy đủ."
                                },
                                {
                                    q: "Làm thế nào để đo lường tiết kiệm nhiên liệu một cách khách quan?",
                                    a: "Chúng tôi lắp đặt hệ thống đồng hồ đo khí đốt/dầu và lưu lượng kế đạt chuẩn quốc tế trước khi thực hiện tối ưu hóa để lấy dữ liệu Baseline (đường cơ sở). Khoản tiết kiệm được tính bằng chênh lệch giữa Baseline và số đo thực tế sau nung, được cả hai bên xác nhận dựa trên nhật ký vận hành."
                                },
                                {
                                    q: "Tại sao EcoReheating có thể đầu tư 100% vốn cho nhà máy?",
                                    a: "Dựa trên 300+ dự án thành công, chúng tôi có sự tin cậy tuyệt đối vào công nghệ của mình. Mô hình Zero-CAPEX (Quản lý Năng lượng) cho phép chúng tôi chia sẻ lợi ích từ chính khoản nhiên liệu mà bạn tiết kiệm được. Nếu không tiết kiệm được, chúng tôi không nhận được gì."
                                },
                                {
                                    q: "Dự án lắp đặt có ảnh hưởng đến lịch sản xuất của nhà máy không?",
                                    a: "Mọi hoạt động khảo sát và lắp đặt đều được phối hợp chặt chẽ với kế hoạch dừng lò bảo trì định kỳ của nhà máy. Chúng tôi cam kết không gây gián đoạn sản xuất ngoài kế hoạch."
                                },
                                {
                                    q: "Thời hạn CBAM bắt đầu có hiệu lực và áp thuế đầy đủ là khi nào?",
                                    a: "CBAM đã bắt đầu giai đoạn chuyển tiếp. Giai đoạn áp thuế đầy đủ sẽ bắt đầu từ 01/01/2026. Nếu nhà máy chưa có giải pháp giảm phát thải trước thời điểm này, chi phí xuất khẩu sang EU sẽ tăng vọt trung bình 15-25% tùy cường độ Carbon."
                                }
                            ].map((faq, i) => (
                                <details key={i} className="group bg-slate-50 rounded-[24px] border border-slate-100 overflow-hidden transition-all duration-300 open:shadow-xl open:border-furnace-100">
                                    <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                                        <h4 className="font-black text-slate-900 pr-8 group-open:text-furnace-600 transition-colors uppercase tracking-tight italic">
                                            {faq.q}
                                        </h4>
                                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-open:bg-furnace-600 group-open:text-white transition-all group-open:rotate-180">
                                            <ChevronDown size={20} />
                                        </div>
                                    </summary>
                                    <div className="px-8 pb-8 animate-fade-in">
                                        <p className="text-slate-600 leading-relaxed font-medium italic border-l-2 border-furnace-500/20 pl-6">
                                            {faq.a}
                                        </p>
                                    </div>
                                </details>
                            ))}
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

            {/* FLOATING ACTION BUTTON */}
            <div className="fixed bottom-6 right-6 z-50">
                <a
                    href="#assessment-form"
                    onClick={() => trackEvent('cta_click', 'conversion', 'floating_widget_survey')}
                    className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-4 hover:-translate-y-1 hover:border-furnace-500 hover:shadow-furnace-500/20 transition-all cursor-pointer group animate-bounce-subtle"
                >
                    <div className="w-10 h-10 bg-furnace-600 text-white rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-furnace-600/30">
                        <BarChart3 size={20} />
                    </div>
                    <div className="text-left pr-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <p className="text-[10px] font-black text-furnace-500 uppercase tracking-widest">ĐANG TRỰC TUYẾN</p>
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-furnace-600 transition-colors tracking-tight">Khảo sát baseline miễn phí</p>
                    </div>
                </a>
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
