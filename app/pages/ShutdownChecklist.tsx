import React, { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';
import { FileSpreadsheet, Download, CheckCircle, Shield } from 'lucide-react';

export const meta: MetaFunction = () => {
    return [
        { title: "Reheating Furnace Shutdown Maintenance Checklist | EcoReheating" },
        { name: "description", content: "Download our free engineering SOP checklist for industrial reheating furnace maintenance. Covers refractory inspect, burner alignment, and pressure testing." },
    ];
};

const ShutdownChecklist: React.FC = () => {
    const { language: lang } = useLanguage();
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
        role: 'plantManager',
        company: '',
        email: '',
        phone: '',
        production: '1.5'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Track download submission event in GA4
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'checklist_download_request', {
                ...formData,
                page_location: window.location.href,
            });
        }

        setSubmitted(true);
    };

    // Translations
    const t = {
        en: {
            title: "Reheating Furnace Shutdown Maintenance Checklist",
            subtitle: "Download the standard engineering SOP template for steel mill maintenance shutdowns. Optimize furnace lining inspection, burner alignment, and recuperator seal checks.",
            formTitle: "Request Free Excel SOP Template",
            nameLabel: "Your Name",
            roleLabel: "Your Role",
            role1: "Plant Manager / Operations Director",
            role2: "Maintenance Engineer / Refractory Lead",
            role3: "Energy / EHS Manager",
            companyLabel: "Steel Mill / Company Name",
            emailLabel: "Work Email",
            phoneLabel: "Phone (Optional)",
            prodLabel: "Annual Production (Mtpa)",
            submitBtn: "Download Excel Template Now",
            successTitle: "Checklist Link Sent!",
            successDesc: "Thank you. The comprehensive Excel SOP template has been sent to your work email. A download link is also available below:",
            downloadMockBtn: "Download Excel SOP (XLSX, 1.4 MB) ↓",
            privacyNote: "Your data is protected under MNDA. We do not share your contact details.",
            checklistDetailsTitle: "What is included in this SOP Checklist?",
            detail1: "Refractory ceiling inspection guidelines (identifying micro-cracking and fiber degradation).",
            detail2: "Burner nozzle alignment & air-fuel ratio solenoid calibration checks.",
            detail3: "Recuperator tube seal pressure-test procedures to eliminate flue gas cross-leakage.",
            back: "← Back to Home",
        },
        vi: {
            title: "Quy Trình Kiểm Tra Bảo Trì Dừng Lò Nung Lại",
            subtitle: "Tải xuống mẫu SOP kỹ thuật chuẩn cho các kỳ dừng lò bảo trì nhà máy thép. Tối ưu hóa kiểm tra lớp lót lò, căn chỉnh đầu đốt và kiểm tra niêm phong换热器.",
            formTitle: "Đăng ký nhận mẫu SOP Excel Miễn phí",
            nameLabel: "Họ và Tên",
            roleLabel: "Chức vụ của bạn",
            role1: "Giám đốc nhà máy / Quản lý vận hành",
            role2: "Kỹ sư bảo trì / Trưởng bộ phận chịu lửa",
            role3: "Quản lý năng lượng / EHS",
            companyLabel: "Tên nhà máy thép / Doanh nghiệp",
            emailLabel: "Email công việc",
            phoneLabel: "Số điện thoại (Tùy chọn)",
            prodLabel: "Sản lượng hàng năm (Mtpa)",
            submitBtn: "Tải xuống mẫu Excel ngay",
            successTitle: "Đã gửi liên kết tải xuống!",
            successDesc: "Cảm ơn bạn. Mẫu SOP Excel toàn diện đã được gửi đến email công việc của bạn. Bạn cũng có thể nhấp tải trực tiếp bên dưới:",
            downloadMockBtn: "Tải trực tiếp file Excel (XLSX, 1.4 MB) ↓",
            privacyNote: "Thông tin của bạn được bảo mật tuyệt đối theo cam kết MNDA.",
            checklistDetailsTitle: "Nội dung bao gồm trong quy trình SOP này?",
            detail1: "Hướng dẫn kiểm tra mái lò chịu lửa (phát hiện nứt vỡ nhỏ và suy thoái sợi gốm).",
            detail2: "Căn chỉnh vòi phun đầu đốt & kiểm tra van điện từ tỷ lệ gió-gas.",
            detail3: "Quy trình thử áp suất niêm phong bộ trao đổi nhiệt để loại bỏ rò rỉ chéo khói thải.",
            back: "← Quay lại Trang chủ",
        },
        id: {
            title: "Daftar Periksa Perawatan Shutdown Tungku Reheating",
            subtitle: "Unduh templat SOP teknik standar untuk shutdown pemeliharaan pabrik baja. Optimalkan inspeksi lapisan tungku, penyelarasan burner, dan pemeriksaan segel rekuperator.",
            formTitle: "Minta Templat Excel SOP Gratis",
            nameLabel: "Nama Anda",
            roleLabel: "Peran Anda",
            role1: "Manajer Pabrik / Direktur Operasi",
            role2: "Kini Kebersihan / Pemimpin Refraktori",
            role3: "Manajer Energi / EHS",
            companyLabel: "Nama Pabrik Baja / Perusahaan",
            emailLabel: "Email Kerja",
            phoneLabel: "Telepon (Opsional)",
            prodLabel: "Produksi Tahunan (Mtpa)",
            submitBtn: "Unduh Templat Excel Sekarang",
            successTitle: "Tautan Unduhan Dikirim!",
            successDesc: "Terima kasih. Templat SOP Excel yang komprehensif telah dikirim ke email kerja Anda. Tautan unduhan juga tersedia di bawah:",
            downloadMockBtn: "Unduh SOP Excel (XLSX, 1.4 MB) ↓",
            privacyNote: "Data Anda dilindungi oleh MNDA.",
            checklistDetailsTitle: "Apa yang termasuk dalam SOP ini?",
            detail1: "Panduan inspeksi atap tahan api (mengidentifikasi retak mikro).",
            detail2: "Penyelarasan nosel pembakar & kalibrasi rasio bahan bakar-udara.",
            detail3: "Prosedur uji tekanan segel rekuperator untuk menghilangkan kebocoran.",
            back: "← Kembali ke Beranda",
        },
        "pt-br": {
            title: "Checklist de Manutenção de Parada do Forno de Reaquecimento",
            subtitle: "Baixe o modelo SOP de engenharia padrão para paradas de manutenção em siderúrgicas. Otimize a inspeção de revestimentos e calibração de queimadores.",
            formTitle: "Solicitar Modelo de SOP em Excel",
            nameLabel: "Seu Nome",
            roleLabel: "Seu Cargo",
            role1: "Gerente de Planta / Diretor de Operações",
            role2: "Engenheiro de Manutenção / Líder de Refratários",
            role3: "Gerente de Energia / EHS",
            companyLabel: "Nome da Siderúrgica / Empresa",
            emailLabel: "E-mail Corporativo",
            phoneLabel: "Telefone (Opcional)",
            prodLabel: "Produção Anual (Mtpa)",
            submitBtn: "Baixar Modelo Excel Agora",
            successTitle: "Link de Download Enviado!",
            successDesc: "Obrigado. O modelo completo de SOP em Excel foi enviado para seu e-mail de trabalho. O link de download também está disponível abaixo:",
            downloadMockBtn: "Baixar SOP Excel (XLSX, 1.4 MB) ↓",
            privacyNote: "Seus dados estão protegidos sob MNDA.",
            checklistDetailsTitle: "O que está incluído neste Checklist SOP?",
            detail1: "Diretrizes de inspeção do teto refratário (identificação de microfissuras).",
            detail2: "Alinhamento do bocal do queimador e verificação das válvulas de proporção ar-combustível.",
            detail3: "Procedimentos de teste de pressão dos selos do recuperador para eliminar vazamentos.",
            back: "← Voltar para a Home",
        }
    };

    const currentT = t[lang as keyof typeof t] || t.en;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.1),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 carbon-pattern pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link to={lang === 'en' ? '/' : `/${lang}`} className="text-furnace-500 hover:text-furnace-600 transition-colors font-medium">
                        {currentT.back}
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Info details */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-4">
                            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-furnace-500 uppercase bg-furnace-500/10 border border-furnace-500/20 rounded-full flex items-center gap-1.5 w-fit">
                                <FileSpreadsheet size={12} />
                                Free Engineering Resource
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                                {currentT.title}
                            </h1>
                            <p className="text-slate-400 text-base leading-relaxed">
                                {currentT.subtitle}
                            </p>
                        </div>

                        {/* List details */}
                        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
                            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                                {currentT.checklistDetailsTitle}
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-furnace-500 shrink-0 mt-0.5" size={16} />
                                    <span>{currentT.detail1}</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-furnace-500 shrink-0 mt-0.5" size={16} />
                                    <span>{currentT.detail2}</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-furnace-500 shrink-0 mt-0.5" size={16} />
                                    <span>{currentT.detail3}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Lead Capture Form */}
                    <div className="lg:col-span-5">
                        <div className="glass-panel border-furnace-500/20 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/80 to-slate-950/80">
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        {currentT.formTitle}
                                    </h3>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{currentT.nameLabel}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-905 border border-slate-800 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-furnace-500"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{currentT.roleLabel}</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-furnace-500"
                                        >
                                            <option value="plantManager">{currentT.role1}</option>
                                            <option value="maintenance">{currentT.role2}</option>
                                            <option value="energy">{currentT.role3}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{currentT.companyLabel}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-slate-905 border border-slate-800 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-furnace-500"
                                            placeholder="Steel Group Ltd."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{currentT.emailLabel}</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-905 border border-slate-800 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-furnace-500"
                                            placeholder="john@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{currentT.phoneLabel}</label>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-slate-905 border border-slate-800 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-furnace-500"
                                            placeholder="+84 90 123 4567"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-furnace-500 hover:bg-furnace-600 text-white rounded-lg transition-colors font-bold text-sm uppercase tracking-wider shadow-lg shadow-furnace-500/20"
                                    >
                                        <Download size={16} />
                                        {currentT.submitBtn}
                                    </button>

                                    <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
                                        <Shield size={10} />
                                        {currentT.privacyNote}
                                    </p>
                                </form>
                            ) : (
                                <div className="space-y-6 text-center py-6">
                                    <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        {currentT.successTitle}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {currentT.successDesc}
                                    </p>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            alert("Mock Download Triggered: reheating-furnace-shutdown-checklist-SOP.xlsx");
                                        }}
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-bold text-sm"
                                    >
                                        <Download size={16} />
                                        {currentT.downloadMockBtn}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShutdownChecklist;
