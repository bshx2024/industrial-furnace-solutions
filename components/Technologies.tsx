import React from 'react';
import { TechCardProps } from '../types';
import { Settings, Cpu, Factory, ShieldCheck, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const TechCard: React.FC<TechCardProps> = ({ id, title, description, keywords, imageSrc, isReversed }) => (
  <div id={id} className={`flex flex-col lg:flex-row items-center gap-12 py-16 scroll-mt-24 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
    <div className="w-full lg:w-1/2 relative group">
      {/* Dynamic Background Shadow */}
      <div className="absolute inset-0 bg-furnace-600 rounded-lg transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-700 ease-out opacity-20"></div>
      <div className="absolute inset-0 bg-furnace-600/10 rounded-lg transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 delay-75"></div>

      <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video bg-gray-900 border border-white/5">
        {/* Ken Burns Image Effect */}
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
        />

        {/* Animated Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/80 via-transparent to-transparent opacity-60"></div>

        {/* Scanning Light Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-furnace-500/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1500ms] ease-in-out"></div>

        {/* Subtle Heat Shimmer Pulse */}
        <div className="absolute inset-0 bg-furnace-500/5 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-1000"></div>

        {/* Detail Badge on Hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="bg-industrial-950/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] font-black text-furnace-500 uppercase tracking-widest">
            Technical Detail
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
        <h4 className="text-sm font-bold text-industrial-700 uppercase tracking-wide mb-3">Key Performance Indicators:</h4>
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

const Technologies: React.FC = () => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0); // 0: Cover, 1: Directory
  const [activeDetail, setActiveDetail] = React.useState<number | null>(null);

  // Handle body scroll lock and ESC key
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
          <span className="text-furnace-600 font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900">
            Core Technologies for <br />Furnace Conservation
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          <TechCard
            id="tech-roof"
            title="Full-fiber Furnace Roof"
            description={[
              "1. Fuel Efficiency: >10% energy saving under identical conditions. No pre-heating required, drastically reducing startup fuel costs.",
              "2. Rapid Assembly: Factory pre-assembled modules; on-site installation completed in just 2 days.",
              "3. Long Lifespan: Durable design ensuring a service life of over 10 years.",
              "4. Safety & Stability: Enhanced performance in extreme heat, high vibration, and corrosive environments, lowering O&M risks."
            ]}
            keywords={['>10% Fuel Saving', '2-Day Assembly', '10+ Year Lifespan', 'Operational Safety']}
            imageSrc="/tech-roof.png"
          />

          <TechCard
            id="tech-ai"
            title="Intelligent Combustion System"
            description={[
              "1. Full-Process Traceability: Comprehensive material tracking from initial charging to final discharge.",
              "2. Precision Control: Saves >5% fuel and reduces relative oxidation loss by >10% through accurate temp management.",
              "3. Core Tech: Driven by mechanism modeling, self-learning AI, and advanced proprietary algorithms."
            ]}
            keywords={['Material Traceability', '>5% Fuel Saving', 'Lower Oxidation Loss', 'Self-learning AI']}
            imageSrc="/tech-ai.png"
            isReversed={true}
          />

          <TechCard
            id="tech-coating"
            title="High-Temperature Energy-Saving Coating"
            description={[
              "1. Advanced Formula: Unique 'High-Emissivity' recipe solves the industry-wide problem of delamination and peeling.",
              "2. Durable Efficiency: Withstands 1700°C without efficiency decay, compatible with all refractory materials.",
              "3. Performance Gains: Lowers furnace shell temperature, boosts productivity, and extends refractory life."
            ]}
            keywords={['High-Emissivity Formula', '1700°C Heat Resistance', 'Shell Temp Reduction', 'Extends Refractory Life']}
            imageSrc="/tech-coating.png"
          />

          <TechCard
            title="Intelligent O&M Platform"
            description={[
              "1. Remote Expert Diagnostics: Online support and a massive professional knowledge base for rapid troubleshooting.",
              "2. AI Prediction: Real-time monitoring and predictive failure analysis to optimize maintenance decisions.",
              "3. Big Data Insight: Precision energy efficiency analysis and big data for strategic cost control.",
              "4. Process Visibility: Decarburization layer prediction and real-time visualization to minimize specialty steel defects."
            ]}
            keywords={['Expert Knowledge Base', 'Predictive Maintenance', 'Energy Big Data', 'Decarburization Control']}
            imageSrc="/tech-digital.png"
            isReversed={true}
          />
        </div>

        {/* Authoritative Certification Section */}
        <div className="mt-32 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
            <ShieldCheck size={14} className="animate-pulse" /> Officially Verified: The "Extreme Efficiency" Selection
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-industrial-900 leading-[1.1] mb-6">
            Nationally Recognized <br />
            <span className="text-furnace-600">"Extreme Efficiency" Technologies</span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Selected by the <span className="text-industrial-950 font-extrabold underline decoration-furnace-500 decoration-2">China Iron & Steel Association (CISA)</span> — representing 50%+ of global steel capacity. Only the most rigorous, scale-proven technologies make this industry benchmark list.
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 md:p-16 border border-slate-200 relative overflow-hidden">
          {/* Subtle background badge */}
          <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none">
            <ShieldCheck size={400} />
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
            {/* Image Side (Left) */}
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

                {/* Floating "Verified" Badge on Image */}
                <div className="absolute top-4 right-4 bg-furnace-600 text-white px-3 py-1.5 rounded shadow-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} /> T80 Verified
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <div className="bg-white/95 p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500">
                    <BookOpen className="text-furnace-600 animate-pulse" size={32} />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                  Official Document: CISA [2024] No. 185
                </p>
                <span className="text-furnace-500 font-black text-[10px] uppercase tracking-widest animate-pulse cursor-pointer" onClick={() => setIsZoomed(true)}>
                  View Official Document & Full Directory →
                </span>
              </div>
            </div>

            {/* Text Side (Right) */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-10">
                <div className="group/item cursor-pointer" onClick={() => { setIsZoomed(true); setCurrentPage(1); setActiveDetail(47); }}>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-industrial-900 shadow-xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-furnace-600 transition-colors duration-500">
                      <span className="font-heading font-black text-white text-lg">47</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-industrial-900 font-heading font-bold text-xl leading-tight text-furnace-600 underline underline-offset-4 decoration-furnace-200">
                        "Narrow Window" Precision Control for <br />Discharge Temperature
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        <span className="text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Benefit</span>
                        Maximizes heating uniformity and ensures precise temperature consistency closer to the theoretical limit.
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
                        High-Emissivity Coating for <br />Enhanced Thermal Radiation
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        <span className="text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Benefit</span>
                        Boosts wall radiation and heat transfer efficiency by 10-15%, significantly shortening heating cycles.
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
                        All-Ceramic Fiber Roof Structure
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        <span className="text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Benefit</span>
                        Advanced refractory design for minimal heat loss and drastically reduced thermal inertia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exclusive IP Holder Highlight Box */}
              <div className="mt-12 p-8 bg-white rounded-2xl border-2 border-furnace-500/20 shadow-[0_20px_40px_-15px_rgba(234,88,12,0.1)] relative group">
                <div className="absolute -top-4 left-6 px-4 py-1 bg-furnace-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded">
                  Exclusive Intellectual Property
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-furnace-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h5 className="text-industrial-900 font-bold text-lg mb-2">Original Standard Innovator</h5>
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "South Technology holds the <span className="text-industrial-950 font-bold">exclusive invention patents</span> for these T80-listed solutions. We are the original innovators behind these national standards."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dossier Lightbox */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-industrial-950/98 flex items-center justify-center p-4 md:p-8 overflow-y-auto cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          {/* Dossier Container */}
          <div className="relative max-w-7xl w-full my-auto flex flex-col items-center cursor-default bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>

            {/* Dossier Header */}
            <div className="w-full bg-slate-800/50 border-b border-white/5 py-4 px-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-furnace-600 rounded-lg flex items-center justify-center shadow-lg shadow-furnace-600/20">
                  <ShieldCheck className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-bold uppercase tracking-[0.1em] text-sm">Technical Validation Dossier</h3>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest">CISA T80 Extreme Efficiency Selection (2024)</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(0)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${currentPage === 0 ? 'bg-furnace-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    1. Official Notice
                  </button>
                  <button
                    onClick={() => { setCurrentPage(1); setActiveDetail(null); }}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${currentPage === 1 ? 'bg-furnace-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    2. Selection Directory
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

            {/* Dossier Content: Document View */}
            <div className="w-full h-[75vh] flex flex-col lg:flex-row relative">

              {/* Left: Document Visual (Slideable) */}
              <div className="w-full lg:w-1/2 h-full bg-white relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-100/50 pointer-events-none"></div>

                {currentPage === 0 ? (
                  <img src="/cisa-cover.jpg" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in slide-in-from-left duration-700" alt="Notice" />
                ) : (
                  <div className="relative h-[95%] w-[95%] flex flex-col items-center justify-center">
                    {activeDetail === 47 ? (
                      <img src="/item47.png" key="item47" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700" alt="Item 47 Detail" />
                    ) : activeDetail === 51 ? (
                      <img src="/item51.png" key="item51" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700" alt="Item 51 Detail" />
                    ) : activeDetail === 52 ? (
                      <img src="/item52.png" key="item52" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700" alt="Item 52 Detail" />
                    ) : (
                      <img src="/cisa-directory.png" key="directory" className="h-[95%] w-auto object-contain shadow-2xl animate-in fade-in slide-in-from-right duration-700" alt="Directory" />
                    )}
                  </div>
                )}

                {/* Page Controls */}
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

              {/* Right: Technical Explanation & Page Flip Detail */}
              <div className="w-full lg:w-1/2 h-full bg-industrial-950 p-8 md:p-12 overflow-y-auto border-l border-white/5">

                {currentPage === 0 && (
                  <div className="animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="text-center border-b border-white/10 pb-8 mb-8">
                      <h2 className="text-white text-2xl font-bold font-serif mb-2 leading-relaxed text-center w-full">China Iron and Steel Association</h2>
                      <p className="text-furnace-500 font-mono font-bold tracking-[0.2em] text-xs">CISA [2024] No. 185</p>
                    </div>

                    <div className="space-y-6 text-gray-300 font-serif leading-relaxed">
                      <h4 className="text-white font-bold text-lg text-center px-4">Notice on the Update and Release of the List of Ultimate Energy Efficiency Technologies (T80)</h4>
                      <p className="font-bold text-gray-400 italic">To all relevant units:</p>
                      <p className="text-sm">
                        Following multiple rounds of rigorous expert review, CISA hereby releases the 2024 edition of the "T80" list. This list defines the national benchmark for advanced industrial furnace performance and energy efficiency.
                      </p>
                      <div className="bg-white/5 p-6 rounded-2xl border-l-[3px] border-furnace-500 mt-8 group cursor-pointer" onClick={() => { setCurrentPage(1); setActiveDetail(null); }}>
                        <p className="text-sm italic mb-2 text-white">Click to view the directory containing technologies 47, 51, and 52.</p>
                        <div className="flex items-center gap-2 text-furnace-500 font-bold uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                          Flip to Directory <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentPage === 1 && (
                  <div className="animate-in fade-in slide-in-from-top duration-700">
                    <div className="mb-8">
                      <h3 className="text-white font-heading font-bold text-xl mb-4 border-l-4 border-furnace-500 pl-4 text-left w-full">Selection Directory Explorer</h3>
                      <p className="text-gray-400 text-sm">Below are the specific entries recognized in the CISA T80 catalogue. Click on an item to see its detailed technical transformation roadmap.</p>
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
                              Technical Profile
                            </div>
                          </div>
                          <h5 className="text-white font-bold leading-tight group-hover:text-furnace-500 transition-colors">
                            {id === 47 ? '"Narrow Window" Control for Discharge Temp' :
                              id === 51 ? 'High-Emissivity Enhanced Radiation Coating' :
                                'All-Ceramic Fiber Roof Structure Reheating Furnace'}
                          </h5>

                          {activeDetail === id && (
                            <div className="mt-6 pt-6 border-t border-white/5 animate-in fade-in zoom-in-95 duration-500">
                              {id === 47 ? (
                                <div className="space-y-6">
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">Technical Brief</span>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                      Integrated application of heat & mass transfer theories combined with high-precision numerical modeling. Using the <span className="text-white font-bold italic">"Overall Heat Absorption Rate Method"</span> and online parameter identification, the system estimates internal billet temperature distributions using accessible real-time furnace data.
                                    </p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                      It directly links temperature setpoints to discharge targets via a self-learning "Narrow Window" search algorithm, minimizing both fuel consumption and oxidation loss in real-time.
                                    </p>
                                  </div>
                                  <div className="bg-industrial-900/50 p-4 rounded-xl border border-blue-500/20">
                                    <h6 className="text-white text-xs font-bold mb-2 uppercase tracking-tight">Technical Benchmarks:</h6>
                                    <div className="grid grid-cols-2 gap-y-3">
                                      <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Temp Precision</p>
                                        <p className="text-white font-bold">±8°C Window</p>
                                      </div>
                                      <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Intelligent Rate</p>
                                        <p className="text-white font-bold">&gt;95%</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">Validated Impact (Pangang, Jianlong, Yaxin)</span>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                      <li className="flex gap-2">📉 <span className="text-white font-bold">≥7%</span> Fuel Consumption Saving</li>
                                      <li className="flex gap-2">📈 <span className="text-white font-bold">+0.1%~0.2% Yield</span> Improvement</li>
                                      <li className="flex gap-2">🛡️ <span className="text-white font-bold">≥5%</span> Reduction in Oxidation Scale Loss</li>
                                    </ul>
                                  </div>
                                </div>
                              ) : id === 51 ? (
                                <div className="space-y-6">
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">Technical Brief</span>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                      Innovative "High-Emissivity" nano-coating. Penetrates surface micro-pores of refractories to form an integrated 30-micron high-emissivity layer. Unlike traditional coatings, its elastic properties eliminate "peeling" caused by thermal expansion mismatches.
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                      <p className="text-[10px] text-gray-400 uppercase mb-1">Max Temp</p>
                                      <p className="text-white font-bold">1700°C</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                      <p className="text-[10px] text-gray-400 uppercase mb-1">Emissivity</p>
                                      <p className="text-white font-bold">~0.94</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">Performance Impact</span>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                      <li className="flex gap-2">🔥 <span className="text-white font-bold">+5%</span> Production Efficiency</li>
                                      <li className="flex gap-2">🛡️ <span className="text-white font-bold">+30%</span> Refractory Life Extension</li>
                                      <li className="flex gap-2">📉 Lower Shell Temperature & Tonne Consumption</li>
                                    </ul>
                                  </div>
                                </div>
                              ) : id === 52 ? (
                                <div className="space-y-6">
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">Technical Brief</span>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                      Pure fiber roof design utilizing structural innovation and specialized coatings. Replaces traditional construction with standardized modular assembly. Drastically reduces thermal inertia and radiant heat loss compared to conventional roofs.
                                    </p>
                                  </div>
                                  <div className="bg-industrial-900/50 p-4 rounded-xl border border-furnace-500/20">
                                    <h6 className="text-white text-xs font-bold mb-2 uppercase tracking-tight">Industrial Implementation:</h6>
                                    <p className="text-gray-400 text-[11px] leading-relaxed">
                                      Successfully deployed in 100+ furnaces including Jinnan Steel, Fangda Steel, Ausun, Qian'an Jiujiang, and Liugang.
                                    </p>
                                  </div>
                                  <div className="space-y-3">
                                    <span className="text-furnace-500 text-[10px] font-bold uppercase tracking-widest">Core Benefits</span>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                      <li className="flex gap-2">⚡ <span className="text-white font-bold">No Baking</span> required (Direct Startup)</li>
                                      <li className="flex gap-2">💎 <span className="text-white font-bold">10-Year</span> Service Life</li>
                                      <li className="flex gap-2">📉 <span className="text-white font-bold">5%+</span> Fuel Saving per Ton</li>
                                    </ul>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Dossier Footer */}
            <div className="w-full bg-slate-800/80 p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className="max-w-md">
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 italic">Exclusive Intellectual Property Announcement</p>
                <p className="text-gray-500 text-[10px] leading-relaxed font-medium">
                  "South Technology holds the exclusive invention patents or authorized application licenses for T80 items 47, 51, and 52."
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
                  <Settings className="text-furnace-500" size={16} />
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">Industry Benchmark 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Technologies;