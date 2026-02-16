import React from 'react';
import { TechCardProps } from '../types';
import { Settings, Cpu, Factory, ShieldCheck, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TechCard: React.FC<TechCardProps> = ({ id, title, description, keywords, imageSrc, isReversed }) => {
  const { t } = useLanguage();
  return (
    <div id={id} className={`flex flex-col lg:flex-row items-center gap-12 py-16 scroll-mt-24 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute inset-0 bg-furnace-600 rounded-lg transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-700 ease-out opacity-20"></div>
        <div className="absolute inset-0 bg-furnace-600/10 rounded-lg transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 delay-75"></div>

        <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video bg-gray-900 border border-white/5">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/80 via-transparent to-transparent opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-furnace-500/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1500ms] ease-in-out"></div>
          <div className="absolute inset-0 bg-furnace-500/5 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-1000"></div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="bg-industrial-950/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] font-black text-furnace-500 uppercase tracking-widest">
              {t('tech.detail')}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <h3 className="text-3xl font-heading font-bold text-industrial-900 mb-6">{title}</h3>
        <div className="space-y-3 mb-8 border-l-4 border-furnace-500 pl-6">
          {Array.isArray(description) ? (
            description.map((point, idx) => (
              <p key={idx} className="text-gray-600 text-lg leading-relaxed font-medium">
                {point}
              </p>
            ))
          ) : (
            <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-bold text-industrial-700 uppercase tracking-wide mb-3">{t('tech.kpi')}</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, idx) => (
              <span key={idx} className="bg-slate-100 text-industrial-800 px-3 py-1 rounded text-sm font-medium border border-slate-200">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Technologies: React.FC = () => {
  const { t, language } = useLanguage();
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [activeDetail, setActiveDetail] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setCurrentPage(0);
      setActiveDetail(null);
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeDetail) setActiveDetail(null);
        else setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isZoomed, activeDetail]);

  return (
    <section id="technologies" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-furnace-600 font-bold tracking-widest uppercase text-sm mb-2 block">{t('tech.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900">
            {t('tech.title')}
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          <TechCard
            id="tech-roof"
            title={t('tech.roof.title')}
            description={[
              t('tech.roof.desc1'),
              t('tech.roof.desc2'),
              t('tech.roof.desc3'),
              t('tech.roof.desc4')
            ]}
            keywords={t('tech.roof.kpis') as unknown as string[]}
            imageSrc="/tech-roof.png"
          />

          <TechCard
            id="tech-ai"
            title={t('tech.ai.title')}
            description={[
              t('tech.ai.desc1'),
              t('tech.ai.desc2'),
              t('tech.ai.desc3')
            ]}
            keywords={t('tech.ai.kpis') as unknown as string[]}
            imageSrc="/tech-ai.png"
            isReversed={true}
          />

          <TechCard
            id="tech-coating"
            title={t('tech.coating.title')}
            description={[
              t('tech.coating.desc1'),
              t('tech.coating.desc2'),
              t('tech.coating.desc3')
            ]}
            keywords={t('tech.coating.kpis') as unknown as string[]}
            imageSrc="/tech-coating.png"
          />

          <TechCard
            id="tech-om"
            title={t('tech.om.title')}
            description={[
              t('tech.om.desc1'),
              t('tech.om.desc2'),
              t('tech.om.desc3'),
              t('tech.om.desc4')
            ]}
            keywords={t('tech.om.kpis') as unknown as string[]}
            imageSrc="/tech-digital.png"
            isReversed={true}
          />
        </div>

        <div className="mt-32 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
            <ShieldCheck size={14} className="animate-pulse" /> {t('tech.verifiedBadge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 leading-[1.1] mb-6">
            {t('tech.verifiedTitle')} <br />
            <span className="text-furnace-600">{t('tech.verifiedAccent')}</span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            {t('tech.verifiedDesc')}
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 md:p-16 border border-slate-200 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none">
            <ShieldCheck size={400} />
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
            <div className="w-full lg:w-1/2 group">
              <div
                className="relative rounded-2xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-white cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              >
                <img
                  src="/cisa-cover.jpg"
                  alt="CISA T80 Certification Document"
                  className="w-full h-auto transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                />
                <div className="absolute top-4 right-4 bg-furnace-600 text-white px-3 py-1.5 rounded shadow-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} /> {t('calc.verified')}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <div className="bg-white/95 p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500">
                    <BookOpen className="text-furnace-600 animate-pulse" size={32} />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                  {t('tech.officialDocNum')}
                </p>
                <span className="text-furnace-500 font-black text-[10px] uppercase tracking-widest animate-pulse cursor-pointer" onClick={() => setIsZoomed(true)}>
                  {t('tech.viewDoc')} ?
                </span>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="space-y-10">
                <div className="group/item cursor-pointer" onClick={() => { setIsZoomed(true); setCurrentPage(1); setActiveDetail(47); }}>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-industrial-900 shadow-xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-furnace-600 transition-colors duration-500">
                      <span className="font-heading font-black text-white text-lg">47</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-industrial-900 font-heading font-bold text-xl leading-tight text-furnace-600 underline underline-offset-4 decoration-furnace-200">
                        {t('tech.item47Title')}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        <span className="text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Benefit</span>
                        {t('tech.item47Benefit')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group/item cursor-pointer" onClick={() => { setIsZoomed(true); setCurrentPage(1); setActiveDetail(51); }}>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-industrial-900 shadow-xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-furnace-600 transition-colors duration-500">
                      <span className="font-heading font-black text-white text-lg">51</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-industrial-900 font-heading font-bold text-xl leading-tight text-furnace-600 underline underline-offset-4 decoration-furnace-200">
                        {t('tech.item51Title')}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        <span className="text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Benefit</span>
                        {t('tech.item51Benefit')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group/item cursor-pointer" onClick={() => { setIsZoomed(true); setCurrentPage(1); setActiveDetail(52); }}>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-industrial-900 shadow-xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-furnace-600 transition-colors duration-500">
                      <span className="font-heading font-black text-white text-lg">52</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-industrial-900 font-heading font-bold text-xl leading-tight text-furnace-600 underline underline-offset-4 decoration-furnace-200">
                        {t('tech.item52Title')}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        <span className="text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Benefit</span>
                        {t('tech.item52Benefit')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-white rounded-2xl border-2 border-furnace-500/20 shadow-[0_20px_40px_-15px_rgba(234,88,12,0.1)] relative group">
                <div className="absolute -top-4 left-6 px-4 py-1 bg-furnace-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded">
                  {t('tech.ipLabel')}
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-furnace-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h5 className="text-industrial-900 font-bold text-lg mb-2">{t('tech.ipTitle')}</h5>
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      {t('tech.ipQuote')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-industrial-950/98 flex items-center justify-center p-4 md:p-8 overflow-y-auto cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-7xl w-full my-auto flex flex-col items-center cursor-default bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="w-full bg-slate-800/50 border-b border-white/5 py-4 px-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-furnace-600 rounded-lg flex items-center justify-center shadow-lg shadow-furnace-600/20">
                  <ShieldCheck className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-bold uppercase tracking-[0.1em] text-sm">{t('tech.dossierTitle')}</h3>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest">{t('tech.dossierSubtitle')}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(0)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${currentPage === 0 ? 'bg-furnace-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    {t('tech.page1')}
                  </button>
                  <button
                    onClick={() => { setCurrentPage(1); setActiveDetail(null); }}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${currentPage === 1 ? 'bg-furnace-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    {t('tech.page2')}
                  </button>
                </div>
                <button
                  className="text-white/40 hover:text-white transition-colors p-2"
                  onClick={() => setIsZoomed(false)}
                >
                  <Settings size={20} className="hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>

            <div className="w-full h-[75vh] flex flex-col lg:flex-row relative">
              <div className="w-full lg:w-1/2 h-full bg-white relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-100/50 pointer-events-none"></div>

                {currentPage === 0 ? (
                  <img src="/cisa-cover.jpg" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in slide-in-from-left duration-700" alt="CISA T80 Verified Technology Certificate Cover" />
                ) : (
                  <div className="relative h-[95%] w-[95%] flex flex-col items-center justify-center">
                    {activeDetail === 47 ? (
                      <img src="/item47.png" key="item47" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700" alt="Item 47: Heat Absorption Rate Method Technical Detail" />
                    ) : activeDetail === 51 ? (
                      <img src="/item51.png" key="item51" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700" alt="Item 51: High-Emissivity Nano-Coating Technical Detail" />
                    ) : activeDetail === 52 ? (
                      <img src="/item52.png" key="item52" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700" alt="Item 52: Ceramic Fiber Block Roof Structure Technical Detail" />
                    ) : (
                      <img src="/cisa-directory.png" key="directory" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in slide-in-from-right duration-700" alt="CISA Technology Verified Directory Table of Contents" />
                    )}
                  </div>
                )}

                <div className="absolute bottom-6 flex gap-4">
                  <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(0)}
                    className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center disabled:opacity-20 hover:bg-furnace-600 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center disabled:opacity-20 hover:bg-furnace-600 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full bg-industrial-950 p-8 md:p-12 overflow-y-auto border-l border-white/5">
                {currentPage === 0 && (
                  <div className="animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="text-center border-b border-white/10 pb-8 mb-8">
                      <h2 className="text-white text-2xl font-bold font-serif mb-2 leading-relaxed text-center w-full">{t('tech.dossierNoticeHeader')}</h2>
                      <p className="text-furnace-500 font-mono font-bold tracking-[0.2em] text-xs">{t('tech.dossierNoticeDocNum')}</p>
                    </div>

                    <div className="space-y-6 text-gray-300 font-serif leading-relaxed">
                      <h4 className="text-white font-bold text-lg text-center px-4">{t('tech.dossierNoticeTitle')}</h4>
                      <p className="font-bold text-gray-400 italic">{t('tech.dossierNoticeGreeting')}</p>
                      <p className="text-sm">
                        {t('tech.dossierNoticeP1')}
                      </p>
                      <div className="bg-white/5 p-6 rounded-2xl border-l-[3px] border-furnace-500 mt-8 group cursor-pointer" onClick={() => { setCurrentPage(1); setActiveDetail(null); }}>
                        <p className="text-sm italic mb-2 text-white">{t('tech.dossierNoticeP2')}</p>
                        <div className="flex items-center gap-2 text-furnace-500 font-bold uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                          {t('tech.dossierFlip')} <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentPage === 1 && (
                  <div className="animate-in fade-in slide-in-from-top duration-700">
                    <div className="mb-8">
                      <h3 className="text-white font-heading font-bold text-xl mb-4 border-l-4 border-furnace-500 pl-4 text-left w-full">{t('tech.explorerTitle')}</h3>
                      <p className="text-gray-400 text-sm">{t('tech.explorerDesc')}</p>
                    </div>

                    <div className="space-y-4">
                      {[47, 51, 52].map((id) => (
                        <div
                          key={id}
                          className={`p-6 rounded-2xl border transition-all cursor-pointer group ${activeDetail === id ? 'bg-furnace-600/10 border-furnace-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                          onClick={() => setActiveDetail(id)}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="bg-industrial-900 text-white font-black text-xs px-2 py-1 rounded">Item {id}</span>
                            <div className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeDetail === id ? 'text-furnace-500' : 'text-gray-600'}`}>
                              {t('tech.profile')}
                            </div>
                          </div>
                          <h5 className="text-white font-bold leading-tight group-hover:text-furnace-500 transition-colors text-left w-full">
                            {id === 47 ? t('tech.item47Title') :
                              id === 51 ? t('tech.item51Title') :
                                t('tech.item52Title')}
                          </h5>

                          {activeDetail === id && (
                            <div className="mt-6 pt-6 border-t border-white/5 animate-in fade-in zoom-in-95 duration-500">
                              {id === 47 ? (
                                <div className="space-y-6">
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">{t('tech.brief')}</span>
                                    <p className="text-gray-300 text-sm leading-relaxed text-left">
                                      {language === 'vi' ?
                                        "Ứng dụng tích hợp các lý thuyết truyền nhiệt & khối kết hợp với mô hình số độ chính xác cao. Sử dụng 'Phương pháp Tỷ lệ Hấp thụ Nhiệt Tổng thể' và nhận dạng thông số trực tuyến, hệ thống ước tính phân bố nhiệt độ phôi nội bộ bằng cách sử dụng dữ liệu lò thời gian thực có thể truy cập." :
                                        "Integrated application of heat & mass transfer theories combined with high-precision numerical modeling. Using the 'Overall Heat Absorption Rate Method' and online parameter identification, the system estimates internal billet temperature distributions using accessible real-time furnace data."
                                      }
                                    </p>
                                  </div>
                                  <div className="bg-industrial-900/50 p-4 rounded-xl border border-blue-500/20">
                                    <h6 className="text-white text-xs font-bold mb-2 uppercase tracking-tight text-left">{t('tech.benchmarks')}</h6>
                                    <div className="grid grid-cols-2 gap-y-3">
                                      <div>
                                        <p className="text-[10px] text-gray-500 uppercase text-left">{t('tech.tempPrecision')}</p>
                                        <p className="text-white font-bold text-left">± 8°C Window</p>
                                      </div>
                                      <div>
                                        <p className="text-[10px] text-gray-500 uppercase text-left">{t('tech.intelligentRate')}</p>
                                        <p className="text-white font-bold text-left">&gt;95%</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : id === 51 ? (
                                <div className="space-y-6 text-left">
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">{t('tech.brief')}</span>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                      {language === 'vi' ?
                                        "Lớp phủ nano 'Phát xạ cao' sáng tạo. Thâm nhập vào các lỗ rỗng vi mô bề mặt của vật liệu chịu lửa để tạo thành một lớp phát xạ cao 30 micron tích hợp. Không giống như các lớp phủ truyền thống, các đặc tính đàn hồi của nó giúp loại bỏ hiện tượng 'bong tróc' do sự không phù hợp của giãn nở nhiệt." :
                                        "Innovative 'High-Emissivity' nano-coating. Penetrates surface micro-pores of refractories to form an integrated 30-micron high-emissivity layer. Unlike traditional coatings, its elastic properties eliminate 'peeling' caused by thermal expansion mismatches."
                                      }
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-6 text-left">
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">Technical Brief</span>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                      {language === 'vi' ?
                                        "Cấu trúc mái lò sợi gốm khối cải tiến với hệ thống neo chịu nhiệt đặc biệt. Giảm trọng lượng mái lò xuống 90% so với gạch chịu lửa truyền thống, giảm quán tính nhiệt đáng kể cho phép tăng/giảm nhiệt nhanh chóng và tiết kiệm nhiên liệu tối ưu." :
                                        "Innovative ceramic fiber block roof structure with specialized heat-resistant anchoring system. Reduces roof weight by 90% compared to traditional refractory bricks, significantly reducing thermal inertia for rapid heating/cooling and optimal fuel savings."
                                      }
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Technologies;
