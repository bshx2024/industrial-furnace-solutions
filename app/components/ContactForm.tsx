import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';

const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [production, setProduction] = useState<number>(2.5);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prodParam = params.get('production');
      if (prodParam) {
        const parsed = parseFloat(prodParam);
        if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 6.0) {
          setProduction(parsed);
        }
      }
    }
  }, []);

  // ROI Logic
  const fuelSavingRate = 0.11;
  const fuelCostPerTon = 14;
  const cbamFactor = 85; // EUR per ton CO2
  const co2PerTon = 0.052;

  const locale = language === 'vi' ? 'vi-VN' : language === 'id' ? 'id-ID' : language === 'pt-br' ? 'pt-BR' : 'en-US';

  const estimatedSavings = (production * 1000000 * fuelCostPerTon * fuelSavingRate).toLocaleString(locale, {
    maximumFractionDigits: 0
  });

  const cbamSavings = (production * 1000000 * co2PerTon * cbamFactor).toLocaleString(locale, {
    maximumFractionDigits: 0
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    // Environment variables - use import.meta.env for Vite
    const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.currentTarget, PUBLIC_KEY)
      .then(() => {
        setFormState('success');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert("Submission failed. Please try again or contact us directly via email.");
        setFormState('idle');
      });
  };

  // Calculate target month for availability (Show next month if we're past the 15th)
  const today = new Date();
  const displayDate = new Date();
  if (today.getDate() >= 15) {
    displayDate.setMonth(today.getMonth() + 1);
  }
  const targetMonth = displayDate.toLocaleString(locale, { month: 'long' });

  return (
    <section id="assessment" className="py-24 bg-slate-50 relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100">

          {/* Text/Magnet Side */}
          <div className="lg:w-2/5 p-12 bg-industrial-950 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-furnace-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>

            <span className="text-furnace-500 font-bold uppercase tracking-widest text-xs mb-4 block">{t('contact.badge')}</span>
            <h2 className="text-4xl font-heading font-bold mb-6 relative z-10">
              {language === 'en' ? (
                <>Claim Your Free <br /><span className="text-furnace-500">ROI Potential Audit</span></>
              ) : language === 'vi' ? (
                <>Nhận Đánh giá <br /><span className="text-furnace-500">Tiềm năng ROI Miễn phí</span></>
              ) : language === 'id' ? (
                <>Klaim Audit Potensi <br /><span className="text-furnace-500">ROI Gratis Anda</span></>
              ) : (
                <>Solicite sua Auditoria <br /><span className="text-furnace-500">de ROI Gratuita</span></>
              )}
            </h2>
            <p className="text-gray-400 mb-10 text-lg relative z-10 leading-relaxed">
              {t('contact.desc')}
            </p>

            <div className="p-6 bg-furnace-600/20 border border-furnace-500/30 rounded-xl mb-10 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-furnace-400">{t('contact.avail.head')}</span>
                  <span className="text-xs font-black text-white bg-furnace-600 px-2 py-0.5 rounded">{t('contact.avail.slot')}</span>
                </div>
                <div className="h-2 bg-industrial-900 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-furnace-500 w-1/2 animate-pulse"></div>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed italic text-left">
                  {t('contact.avail.desc')} <span className="text-white font-bold">{targetMonth}.</span>
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-furnace-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="bg-furnace-600/20 p-2 rounded text-furnace-500">
                  <CheckCircle size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm">{t('contact.feature1.title')}</h4>
                  <p className="text-xs text-gray-400">{t('contact.feature1.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="bg-furnace-600/20 p-2 rounded text-furnace-500">
                  <CheckCircle size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm">{t('contact.feature2.title')}</h4>
                  <p className="text-xs text-gray-400">{t('contact.feature2.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-furnace-500/10 border border-furnace-500/30">
                <div className="bg-furnace-500 text-white p-2 rounded font-black text-xs shrink-0">
                  T80
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-furnace-400">{t('contact.form.cisa_verification')}</h4>
                  <p className="text-xs text-gray-300">{t('contact.form.cisa_sub')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 bg-white">
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center min-h-[500px]">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-industrial-900 mb-2">{t('contact.success.title')}</h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  {t('contact.success.desc')}
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-furnace-600 font-bold hover:underline"
                >
                  {t('contact.success.btn')}
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {/* ROI Slider Tool */}
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 mb-10">
                  <h3 className="text-sm font-black uppercase tracking-widest text-industrial-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-furnace-500 rounded-full"></span>
                    {t('contact.roi.title')}
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('contact.roi.production')}</label>
                        <span className="text-xl font-mono font-bold text-furnace-600">{production} <span className="text-[10px] text-slate-400">Mtpa</span></span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="6.0"
                        step="0.1"
                        value={production}
                        onChange={(e) => setProduction(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-furnace-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('contact.roi.savings')}</span>
                        <span className="text-lg font-mono font-bold text-industrial-950">${estimatedSavings}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('contact.roi.cbam')}</span>
                        <span className="text-lg font-mono font-bold text-green-600">€{cbamSavings}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-left">
                      {t('contact.form.name')} <span className="text-furnace-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="user_name"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder={t('contact.form.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-left">
                      {t('contact.form.role')} <span className="text-furnace-500">*</span>
                    </label>
                    <select
                      required
                      name="user_role"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all bg-white"
                    >
                      <option value="">{t('contact.form.role_placeholder')}</option>
                      <option value="plant-manager">{t('contact.role.plantManager')}</option>
                      <option value="energy-manager">{t('contact.role.energyManager')}</option>
                      <option value="maintenance-manager">{t('contact.role.maintenanceManager')}</option>
                      <option value="other">{t('contact.role.other')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-left">
                      {t('contact.form.company')} <span className="text-furnace-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="user_company"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder={t('contact.form.company_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-left">
                      {t('contact.form.region')} <span className="text-furnace-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="user_region"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder={t('contact.form.region_placeholder')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-left">
                      {t('contact.form.email')} <span className="text-furnace-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="user_email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder={t('contact.form.email_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-gray-400 text-left">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="user_phone"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder="+84..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-left">
                      {t('contact.form.production')} <span className="text-furnace-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="user_production"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder={t('contact.form.production_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-left">
                      {t('contact.form.furnace')} <span className="text-furnace-500">*</span>
                    </label>
                    <select
                      required
                      name="user_furnace_type"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all bg-white"
                    >
                      <option value="">{t('contact.form.furnace_placeholder')}</option>
                      <option value="walking-beam">{t('contact.furnace.walkingBeam')}</option>
                      <option value="walking-hearth">{t('contact.furnace.walkingHearth')}</option>
                      <option value="pusher">{t('contact.furnace.pusher')}</option>
                      <option value="other">{t('contact.furnace.other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-gray-400 text-left">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                    placeholder={t('contact.form.message_placeholder')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className={`w-full bg-furnace-600 text-white font-bold text-lg py-5 rounded-xl uppercase tracking-widest hover:bg-furnace-700 transition-all shadow-xl flex items-center justify-center gap-3 ${formState === 'submitting' ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {formState === 'submitting' ? t('contact.form.submitting') : (
                    <>{t('contact.form.submit')} <Send size={20} /></>
                  )}
                </button>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">
                    {t('contact.form.or_chat')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="https://zalo.me/84908888888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0068ff] hover:bg-[#0052cc] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-98"
                    >
                      <span className="w-5 h-5 flex items-center justify-center bg-white text-[#0068ff] rounded-full font-black text-[10px]">Z</span>
                      {t('contact.form.zalo')}
                    </a>
                    <a
                      href="https://wa.me/84908888888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-98"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.418 1.489 5.546 0 10.059-4.509 10.062-10.057.002-2.688-1.043-5.215-2.943-7.117C17.228 1.567 14.7.523 12.008.523c-5.55 0-10.063 4.512-10.066 10.06-.001 1.93.498 3.81 1.442 5.461l-.955 3.487 3.618-.949zm12.188-7.85c-.32-.16-1.89-.933-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.828 1.04-.984 1.22-.156.18-.312.2-.63.04-.32-.16-1.343-.496-2.56-1.582-.947-.845-1.58-1.89-1.767-2.21-.186-.32-.02-.49.14-.65.14-.145.31-.34.47-.51.16-.17.21-.29.32-.48.11-.19.05-.36-.03-.52-.08-.16-.723-1.74-.99-2.39-.26-.62-.52-.54-.723-.55-.186-.01-.4-.01-.61-.01s-.55.07-.84.38c-.29.32-1.103 1.08-1.103 2.63s1.125 3.05 1.28 3.26c.156.21 2.214 3.38 5.36 4.74.75.32 1.33.52 1.79.66.756.24 1.444.2 1.99.12.607-.09 1.89-.77 2.155-1.48.266-.71.266-1.32.187-1.45-.08-.13-.294-.21-.614-.37z"/>
                      </svg>
                      {t('contact.form.whatsapp')}
                    </a>
                  </div>
                </div>

                <p className="text-[11px] text-center text-gray-500 mt-6 leading-relaxed">
                  {t('contact.form.footer_1')} <br />
                  <span className="font-bold">{t('contact.form.footer_2')}</span>
                </p>
              </form>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
