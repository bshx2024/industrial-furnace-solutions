import React, { useState } from 'react';
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
    Users
} from 'lucide-react';
import type { MetaFunction } from 'react-router';
import emailjs from '@emailjs/browser';

export const meta: MetaFunction = () => {
    return [
        { title: "Tuân thủ CBAM cho Thép Việt Nam | Giải pháp Năng lượng Không cần Vốn | EcoReheating" },
        { name: "description", content: "Giảm chi phí CBAM và tiết kiệm nhiên liệu 7-15% với giải pháp thu hồi nhiệt thải không cần vốn đầu tư. Đã chứng minh tại Thép Shengli Việt Nam. Đánh giá miễn phí." },
    ];
};

const VietnamSteelLP: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');

        const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.currentTarget, PUBLIC_KEY)
            .then(() => {
                setFormState('success');
            })
            .catch((error) => {
                console.error('FAILED...', error);
                alert("Đã xảy ra lỗi. Vui lòng thử lại hoặc gửi email cho chúng tôi tại contact@ecoreheating.com");
                setFormState('idle');
            });
    };

    // Calculate target month for availability
    const today = new Date();
    const displayDate = new Date();
    if (today.getDate() >= 15) {
        displayDate.setMonth(today.getMonth() + 1);
    }
    const targetMonth = displayDate.toLocaleString('vi-VN', { month: 'long' });

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-furnace-500/30">
            {/* HERO SECTION */}
            <header className="relative py-20 lg:py-32 bg-industrial-950 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-furnace-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-furnace-500 text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in">
                        CÔNG NGHỆ NIÊM YẾT CISA T80
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 leading-tight">
                        Giảm Chi phí CBAM + <br />
                        <span className="text-furnace-500 underline decoration-white/20">Tiết kiệm Nhiên liệu 7-15%</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
                        Giải pháp Thu hồi Nhiệt thải Không cần Vốn đầu tư cho Nhà máy Thép Việt Nam
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                        <div className="flex items-center gap-2 text-gray-400">
                            <CheckCircle size={18} className="text-green-500" />
                            <span>Đã chứng minh tại Thép Shengli (Thăng Long) Việt Nam</span>
                        </div>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <CheckCircle size={18} className="text-green-500" />
                            <span>300+ dây chuyền sản xuất trên toàn thế giới</span>
                        </div>
                    </div>
                    <a
                        href="#assessment-form"
                        className="inline-flex items-center gap-3 bg-furnace-600 hover:bg-furnace-700 text-white font-black px-10 py-5 rounded-xl text-xl transition-all shadow-2xl shadow-furnace-600/20 uppercase tracking-wider group"
                    >
                        NHẬN ĐÁNH GIÁ MIỄN PHÍ (CÒN 1 CHỖ)
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </header>

            {/* VIETNAM CASE STUDY SECTION */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-heading font-black mb-16 text-center">
                            🇻🇳 Đã Chứng minh tại Việt Nam: <span className="text-furnace-600">Thép Shengli (Thăng Long)</span>
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">DỰ ÁN</p>
                                        <p className="font-bold">Lò nung nạp nguội 120 t/h</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">ĐỊA ĐIỂM</p>
                                        <p className="font-bold">Việt Nam</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between col-span-2">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">TRẠNG THÁI</p>
                                            <p className="font-bold">Hiệu suất Đã xác thực</p>
                                        </div>
                                        <CheckCircle size={24} className="text-green-500" />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-4">
                                    <h4 className="font-heading font-black text-slate-900">CÔNG NGHỆ ÁP DỤNG:</h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Mái lò kết cấu sợi gốm toàn phần",
                                            "Điều khiển gia nhiệt thông minh",
                                            "Lớp phủ chức năng phát xạ cao"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-furnace-500"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-industrial-950 p-8 rounded-2xl text-white">
                                <h4 className="text-sm font-black text-furnace-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                                    KẾT QUẢ ĐIỂN HÌNH (TIÊU CHUẨN CISA T80):
                                </h4>
                                <div className="space-y-6">
                                    {[
                                        { label: "Giảm tiêu thụ nhiên liệu", value: "7-15%", color: "text-furnace-500" },
                                        { label: "Giảm hao hụt lớp vảy oxit", value: "5-15%", color: "text-white" },
                                        { label: "Cải thiện năng suất", value: "0,1-0,3%", color: "text-white" },
                                        { label: "Thời gian hoàn vốn", value: "1-2 năm", color: "text-green-400" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2">
                                            <span className="text-gray-400 text-sm">{stat.label}</span>
                                            <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-8 py-4 border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-all uppercase tracking-widest text-xs">
                                    TẢI THÔNG SỐ KỸ THUẬT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CBAM URGENCY SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest mb-6">
                                    <AlertTriangle size={14} />
                                    Cảnh báo Thị trường
                                </div>
                                <h2 className="text-4xl font-heading font-black mb-6 leading-tight text-slate-900">
                                    Tác động của CBAM đến Xuất khẩu Thép Việt Nam (2026)
                                </h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    Bắt đầu từ ngày 1 tháng 1 năm 2026, các nhà nhập khẩu EU phải trả <strong>€75-100</strong> cho mỗi tấn CO2 trong các sản phẩm thép nhập khẩu.
                                </p>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                                    <h4 className="font-bold mb-4 text-slate-800">Đối với một nhà máy thép Việt Nam điển hình:</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between border-b border-slate-200 py-2">
                                            <span>Sản lượng hàng năm:</span>
                                            <span className="font-bold">500.000 tấn</span>
                                        </li>
                                        <li className="flex justify-between border-b border-slate-200 py-2">
                                            <span>Tỷ lệ xuất khẩu sang EU:</span>
                                            <span className="font-bold">30%</span>
                                        </li>
                                        <li className="flex justify-between border-b border-slate-200 py-2">
                                            <span>Lượng phát thải:</span>
                                            <span className="font-bold">2,1 tấn CO2/tấn thép</span>
                                        </li>
                                        <li className="flex justify-between py-2 text-red-600 font-black text-lg">
                                            <span>Chi phí bổ sung hàng năm:</span>
                                            <span>€2,4 - 3,2M</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Giảm phát thải 20-40%", desc: "Hạ thấp gánh nặng thuế CBAM trực tiếp thông qua tối ưu hóa nhiệt.", icon: <Zap className="text-furnace-500" /> },
                                    { title: "Cắt giảm 7-15% chi phí", desc: "Tăng biên lợi nhuận ngay lập tức bằng cách tiết kiệm nhiên liệu.", icon: <BarChart3 className="text-furnace-500" /> },
                                    { title: "Dữ liệu phát thải xác thực", desc: "Đáp ứng các yêu cầu báo cáo nghiêm ngặt của Liên minh châu Âu.", icon: <ShieldCheck className="text-furnace-500" /> },
                                    { title: "Vốn đầu tư ban đầu bằng 0", desc: "Mô hình chia sẻ lợi nhuận, chúng tôi chịu mọi rủi ro tài chính.", icon: <DollarSign className="text-furnace-500" /> }
                                ].map((benefit, i) => (
                                    <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-lg hover:border-furnace-500/20 transition-all flex flex-col gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 mb-2">✅ {benefit.title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERNATIONAL CREDIBILITY SECTION */}
            <section className="py-24 bg-industrial-950 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-black mb-16 text-center">
                        🌏 Đã Triển khai trên Toàn Đông Nam Á
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {[
                            { country: "Việt Nam", plant: "Shengli (Thăng Long)", capacity: "120 t/h", flag: "🇻🇳" },
                            { country: "Indonesia", plant: "DCP Steel", capacity: "100 t/h Dual Fuel", flag: "🇮🇩" },
                            { country: "Malaysia", plant: "Ann Joo Steel", capacity: "90 t/h Dual Fuel", flag: "🇲🇾" },
                            { country: "Bangladesh", plant: "KSRM Steel", capacity: "150 t/h", flag: "🇧🇩" },
                            { country: "Ethiopia", plant: "Steel Plant", capacity: "50 t/h Oil/Gas", flag: "🇪🇹" }
                        ].map((project, i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{project.flag}</span>
                                <p className="text-xs font-black text-furnace-500 uppercase tracking-widest mb-1">{project.country}</p>
                                <h4 className="font-bold mb-2 text-white">{project.plant}</h4>
                                <p className="text-sm text-gray-400">{project.capacity}</p>
                                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-green-400 uppercase tracking-tighter">
                                    <CheckCircle size={12} />
                                    Hiệu suất Đã xác thực
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ZERO-CAPEX MODEL SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 text-center">
                            💰 Mô hình <span className="text-furnace-600">Không cần Vốn đầu tư</span> Hoạt động như thế nào
                        </h2>
                        <p className="text-center text-slate-500 mb-16 max-w-2xl mx-auto italic">
                            Chúng tôi tin tưởng vào công nghệ của mình đến mức sẵn sàng đầu tư toàn bộ chi phí thay cho bạn.
                        </p>

                        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                            {/* Traditional */}
                            <div className="p-10 bg-slate-50">
                                <h4 className="text-xl font-black mb-8 text-slate-400 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-sm">❌</div>
                                    Cách Tiếp cận Truyền thống
                                </h4>
                                <ul className="space-y-6">
                                    {[
                                        "Đầu tư ban đầu $5-10M",
                                        "Thời gian hoàn vốn 3-5 năm",
                                        "Rủi ro công nghệ",
                                        "Gánh nặng bảo trì"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-slate-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Energy Steward */}
                            <div className="p-10 bg-industrial-950 text-white relative">
                                <div className="absolute top-0 right-0 p-4">
                                    <span className="bg-furnace-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">ĐỀ XUẤT</span>
                                </div>
                                <h4 className="text-xl font-black mb-8 text-furnace-500 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-furnace-600 flex items-center justify-center text-white text-sm">✅</div>
                                    Mô hình Quản lý Năng lượng
                                </h4>
                                <ul className="space-y-6">
                                    {[
                                        "Chúng tôi đầu tư thiết bị ($0 từ bạn)",
                                        "Chia sẻ tiết kiệm nhiên liệu xác thực (50/50)",
                                        "Chúng tôi bảo trì thiết bị (bao gồm trong phí)",
                                        "Bạn sở hữu 100% tiết kiệm sau hợp đồng (5-7 năm)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-gray-200">
                                            <div className="w-1.5 h-1.5 rounded-full bg-furnace-500"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ASSESSMENT FORM SECTION */}
            <section id="assessment-form" className="py-24 bg-slate-50 relative scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100 max-w-7xl mx-auto">

                        {/* Copy Side */}
                        <div className="lg:w-2/5 p-10 md:p-16 bg-industrial-950 text-white flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-furnace-600 rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                            <span className="text-furnace-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">CƠ HỘI CÓ HẠN</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight">
                                Nhận Đánh giá <br />
                                <span className="text-furnace-500">Tuân thủ CBAM</span> Miễn phí
                            </h2>
                            <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                                Giảm Thuế Cacbon EU + Cắt giảm Chi phí Nhiên liệu 7-15%. Tìm hiểu chính xác mức độ tiết kiệm của bạn. Chúng tôi cung cấp báo cáo đánh giá hiện trạng và dự báo ROI toàn diện không tốn phí.
                            </p>

                            <div className="p-8 bg-furnace-600/10 border border-furnace-500/20 rounded-3xl mb-12 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-furnace-400">TÌNH TRẠNG HIỆN TẠI</span>
                                        <span className="text-[10px] font-black text-white bg-furnace-600 px-3 py-1 rounded-full animate-pulse transition-all">CÒN 1 CHỖ</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
                                        <div className="h-full bg-gradient-to-r from-furnace-600 to-furnace-400 w-[90%]"></div>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed font-light italic">
                                        Do tính chất đòi hỏi vốn lớn của mô hình, chúng tôi chỉ chấp nhận 2 dự án mới mỗi tháng. <span className="text-white font-bold underline decoration-furnace-500">Còn 1 chỗ cho {targetMonth}.</span>
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-furnace-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { title: "Dựa trên Dữ liệu", desc: "Đường cơ sở được thiết lập qua nhật ký sản xuất thực tế của nhà máy", icon: <BarChart3 size={20} /> },
                                    { title: "Phân tích Chuyên gia", desc: "Đánh giá kỹ thuật cấp độ CISA T80", icon: <Users size={20} /> },
                                    { title: "Đã Chứng minh tại Việt Nam", desc: "Thép Shengli: Lò 120 tấn/giờ, giảm nhiên liệu 7-15%", icon: <Building2 size={20} /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-5">
                                        <div className="bg-furnace-600/20 p-3 rounded-2xl text-furnace-500 shrink-0 border border-furnace-500/20">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-base mb-1">✓ {item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                            {formState === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in-up">
                                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Gửi Thành Công!</h3>
                                    <p className="text-slate-600 max-w-md mx-auto text-lg leading-relaxed">
                                        Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong vòng 24 giờ để bắt đầu quá trình đánh giá.
                                    </p>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="mt-10 text-furnace-600 font-black hover:underline tracking-widest text-sm uppercase"
                                    >
                                        GỬI YÊU CẦU KHÁC
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                                                HỌ VÀ TÊN <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_name"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-medium"
                                                placeholder="Họ và tên của bạn"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                                                CÔNG TY <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_company"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-medium"
                                                placeholder="Tên nhà máy thép / Tập đoàn"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                                                QUỐC GIA / KHU VỰC <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_region"
                                                defaultValue="Việt Nam"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-medium"
                                                placeholder="Ví dụ: Việt Nam, Trung Quốc, Brazil..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                                                EMAIL CÔNG TY <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                name="user_email"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-medium"
                                                placeholder="email@congty.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                                                SẢN LƯỢNG HÀNG NĂM <span className="text-furnace-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="user_production"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-medium"
                                                placeholder="Ví dụ: 2,5 triệu tấn/năm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                                CHỨC VỤ (Tùy chọn)
                                            </label>
                                            <select
                                                name="user_role"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all bg-white font-medium"
                                            >
                                                <option value="">Chọn chức vụ...</option>
                                                <option value="CEO">CEO / Tổng giám đốc</option>
                                                <option value="Technical-Director">Giám đốc kỹ thuật</option>
                                                <option value="Energy-Manager">Quản lý năng lượng</option>
                                                <option value="Procurement-Manager">Quản lý mua sắm</option>
                                                <option value="Other">Khác</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                                ĐIỆN THOẠI / WHATSAPP (Tùy chọn)
                                            </label>
                                            <input
                                                type="tel"
                                                name="user_phone"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-medium"
                                                placeholder="+84..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                                LOẠI LÒ NUNG (Tùy chọn)
                                            </label>
                                            <select
                                                name="user_furnace_type"
                                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all bg-white font-medium"
                                            >
                                                <option value="">Chọn loại lò...</option>
                                                <option value="Walking-Beam">Lò dầm bước (Walking Beam)</option>
                                                <option value="Walking-Hearth">Lò đáy sàn (Walking Hearth)</option>
                                                <option value="Pusher">Lò đẩy (Pusher Type)</option>
                                                <option value="Rotary">Lò xoay (Rotary Hearth)</option>
                                                <option value="Other">Khác / Không rõ</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                            LỜI NHẮN (Tùy chọn)
                                        </label>
                                        <textarea
                                            rows={3}
                                            name="message"
                                            className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-furnace-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            placeholder="Các thách thức cụ thể hoặc mối quan tâm về CBAM..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formState === 'submitting'}
                                        className={`w-full bg-furnace-600 text-white font-black text-xl py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-furnace-700 transition-all shadow-2xl shadow-furnace-600/30 flex items-center justify-center gap-4 group ${formState === 'submitting' ? 'opacity-75 cursor-wait' : ''}`}
                                    >
                                        {formState === 'submitting' ? 'ĐANG XỬ LÝ...' : (
                                            <>
                                                GỬI YÊU CẦU ĐÁNH GIÁ (1 CHỖ CÒN LẠI)
                                                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
                                        <p className="text-[10px] text-slate-400 leading-relaxed text-center md:text-left max-w-sm">
                                            Tham gia cùng 300+ nhà máy thép trên toàn thế giới (bao gồm Thép Shengli Việt Nam) đã được tối ưu hóa.
                                        </p>
                                        <p className="text-[10px] font-black text-slate-900 border-2 border-slate-900 px-3 py-1 rounded">
                                            ĐẢM BẢO QUYỀN RIÊNG TƯ (MNDA)
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER MINI */}
            <footer className="py-12 bg-industrial-950 border-t border-white/5 text-center">
                <div className="container mx-auto px-4">
                    <p className="text-gray-500 text-xs">
                        &copy; 2026 EcoReheating. Đã đăng ký bản quyền. Công nghệ CISA T80 được xác thực.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default VietnamSteelLP;
