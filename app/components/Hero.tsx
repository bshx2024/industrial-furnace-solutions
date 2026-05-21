import React, { useState } from 'react';
import { ArrowRight, Activity, Zap, ShieldCheck, Gauge, Calculator } from 'lucide-react';
import { Link } from 'react-router';
import LogoMarquee from './LogoMarquee';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const [production, setProduction] = useState<number>(2.5);
  const { t, l } = useLanguage();

  // Constants for calculation (example based on T80 targets)
  const fuelSavingRate = 0.11; // 11% average target
  const co2SavingPerTon = 0.052; // Metric tons of CO2 saved per ton of steel produced (est)
  const fuelCostPerTon = 14; // Est. fuel cost saving per ton produced in USD (purely example)

  const estimatedSavings = (production * 1000000 * fuelCostPerTon * fuelSavingRate).toLocaleString('en-US', {
    maximumFractionDigits: 0
  });

  const co2Savings = (production * 1000000 * co2SavingPerTon).toLocaleString('en-US', {
    maximumFractionDigits: 0
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-industrial-950 pt-32 lg:pt-20">
      {/* IMMERSIVE BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-bg.png"
          className="absolute inset-0 w-full h-full object-cover engine-bg-animate opacity-60"
        >
          <source src="/hero-bg_x264.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 engine-shimmer-animate bg-gradient-to-t from-furnace-950 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-industrial-950/40"></div>
        <div className="absolute inset-0 carbon-overlay"></div>
        <div className="engine-scan-animate"></div>
      </div>

      {/* SUMMER CRISIS ALERT BANNER - SITE WIDE URGENCE */}
      <div className="relative z-30 bg-red-600/90 backdrop-blur-md border-b border-white/10 py-3 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 text-white text-xs md:text-sm font-black tracking-widest uppercase animate-pulse">
          <Zap size={16} />
          {t('hero.summerAlert')}
          <Link to={l('/vietnam-steel-industry-outlook-2026-cbam-roadmap')} className="underline hover:text-white/80 transition-colors flex items-center gap-2">
            {t('hero.summerCta')} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none"></div>
      </div>

      {/* TOP CONTENT: Heading & Action */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-grow flex flex-col justify-center py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center w-full mb-16">
          <div className="flex-grow max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-furnace-600/10 border border-furnace-500/30 text-furnace-400 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-furnace-500 animate-ping"></span>
              {t('hero.badge')}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[1.0] mb-6 tracking-tight">
              {t('hero.title')}<br /><span className="text-furnace-500 text-6xl md:text-8xl">{t('hero.titleAccent')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white font-medium mb-4 max-w-4xl leading-snug">
              {t('hero.subtitle')}
            </p>

            <p className="text-sm md:text-base text-gray-300 mb-8 font-bold flex items-center gap-2">
              {t('hero.optimized')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12 max-w-4xl">
              {[
                t('hero.bullet1'),
                t('hero.bullet2'),
                t('hero.bullet3'),
                t('hero.bullet4'),
              ].map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 text-gray-300">
                  <ShieldCheck size={20} className="text-furnace-500 shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <Link
                  to={l('/#assessment')}
                  className="group relative overflow-hidden bg-furnace-600 text-white text-lg px-8 py-6 rounded-sm font-bold uppercase tracking-[0.1em] transition-all shadow-2xl flex items-center justify-center gap-3"
                >
                  <span className="relative z-10 text-base md:text-lg text-center">{t('hero.btnRoi')}</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-furnace-500 to-orange-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                </Link>
                <Link
                  to={l('/hero-cases')}
                  className="group relative px-8 py-6 border border-white/20 hover:border-white/40 text-white text-lg rounded-sm font-bold uppercase tracking-[0.1em] transition-all backdrop-blur-md flex items-center justify-center text-center"
                >
                  <span className="text-base md:text-lg">{t('hero.btnCases')}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CALCULATOR CARD - Apple-style Refined */}
          <div className="w-full lg:w-[380px] glass-hud p-8 rounded-xl border border-white/10 relative overflow-hidden shadow-2xl self-center bg-white/[0.02] backdrop-blur-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calculator size={80} className="text-white" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-furnace-500 rounded-full"></span>
              {t('calc.title')}
            </h3>

            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-end mb-5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{t('calc.production')}</label>
                  <span className="text-2xl font-mono font-bold text-furnace-500">{production} <span className="text-[10px] text-white/30 uppercase font-sans">Mtpa</span></span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.1"
                  value={production}
                  onChange={(e) => setProduction(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-furnace-500 hover:accent-furnace-400 transition-all"
                />
                <div className="flex justify-between text-[10px] text-white/20 font-bold mt-3 font-mono">
                  <span>0.5 Mtpa</span>
                  <span className="text-white/10 uppercase tracking-widest">{t('calc.adjust')}</span>
                  <span>6.0 Mtpa</span>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Zap size={10} className="text-furnace-500/50" /> {t('calc.value')}
                    </span>
                    <span className="text-[10px] text-white/20 uppercase tracking-tight">{t('calc.savings')}</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-white tracking-tight">
                    ${estimatedSavings}
                    <span className="text-[10px] ml-1.5 text-white/30 font-normal">/yr</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck size={10} className="text-green-500/50" /> {t('calc.carbon')}
                    </span>
                    <span className="text-[10px] text-white/20 uppercase tracking-tight">{co2Savings} {t('calc.credits')}</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-green-500/90 tracking-tight">
                    {co2Savings}
                    <span className="text-[10px] ml-1.5 text-white/30 font-normal">t/yr</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to={l('/#assessment')}
                  className="block w-full bg-furnace-600 hover:bg-furnace-500 text-white font-bold py-4 rounded-lg transition-all shadow-xl text-center uppercase tracking-widest text-xs active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {t('calc.btn')}
                  <ArrowRight size={14} />
                </Link>
                <p className="text-[9px] text-white/20 mt-4 text-center uppercase tracking-[0.3em] font-black">
                  {t('calc.footer')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST SIGNALS - INFINITE MARQUEE */}
        <div className="flex flex-col items-start gap-4 w-full overflow-hidden border-t border-white/5 pt-16 opacity-100 transition-all duration-700">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">{t('calc.trusted')}</span>
            <div className="flex items-center gap-2 bg-furnace-600/10 text-furnace-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-furnace-500/20">
              <ShieldCheck size={10} /> {t('calc.verified')}
            </div>
          </div>
          <div className="w-full">
            <LogoMarquee />
          </div>
        </div>
      </div>

      {/* BOTTOM DASHBOARD: System Status Tags */}
      <div className="relative z-20 w-full glass-hud border-t border-white/5 pb-8 pt-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 items-center text-center lg:text-left">
            <div className="border-r border-white/5 lg:pr-8 last:border-r-0">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2">
                <Zap size={12} className="text-furnace-500" /> {t('stat.fuel')}
              </div>
              <div className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter">7-15<span className="text-xs ml-0.5 text-gray-500">%</span></div>
            </div>

            <div className="border-r border-white/5 lg:pr-8 last:border-r-0">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck size={12} className="text-green-500" /> {t('stat.oxidation')}
              </div>
              <div className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter">5-15<span className="text-xs ml-0.5 text-gray-500">%</span></div>
            </div>

            <div className="border-r border-white/5 lg:pr-8 last:border-r-0 text-white/90">
              <div className="text-[10px] text-furnace-500 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2 font-black">
                <Gauge size={12} /> {t('stat.temp')}
              </div>
              <div className="text-xl md:text-2xl font-mono text-white font-bold tracking-tighter">280-350<span className="text-xs ml-0.5 text-gray-500"> °C</span></div>
            </div>

            <div className="border-r border-white/5 lg:pr-8 last:border-r-0">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2">
                <Activity size={12} className="text-blue-500" /> {t('stat.oxygen')}
              </div>
              <div className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter">1.8-2.5<span className="text-xs ml-0.5 text-gray-500">%</span></div>
            </div>

            <div className="flex flex-col items-center lg:items-end col-span-2 lg:col-span-1 border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] mb-2 font-black">{t('stat.status')}</div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <div className="relative">
                  <span className="block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-75"></span>
                </div>
                <span className="text-[10px] text-green-400 font-mono font-black tracking-widest uppercase">{t('stat.optimized')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
