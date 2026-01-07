import React, { useState } from 'react';
import { ArrowRight, Activity, Zap, ShieldCheck, Gauge, Calculator, Info } from 'lucide-react';

const Hero: React.FC = () => {
  const [production, setProduction] = useState<number>(2.5);

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

      {/* TOP CONTENT: Heading & Action */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-grow flex items-center">
        <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
          <div className="flex-grow max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-furnace-600/10 border border-furnace-500/30 text-furnace-400 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-furnace-500 animate-ping"></span>
              System Intelligence v4.2
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[1.0] mb-6 tracking-tight">
              Stop Fuel Waste. <br />
              <span className="text-furnace-500">Zero CAPEX</span> Upgrades.
            </h1>

            <p className="text-xl md:text-2xl text-white font-medium mb-4 max-w-4xl leading-snug">
              We invest, you save. Achieve <span className="text-furnace-500 font-bold">7–15% fuel reduction</span> in your reheating furnaces with our T80-validated extreme efficiency tech—paid entirely from verified energy savings.
            </p>

            <p className="text-sm md:text-base text-gray-400 mb-8 uppercase tracking-[0.1em] font-bold">
              For walking beam and walking hearth reheating furnaces in long and flat steel rolling mills.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12 max-w-4xl">
              {[
                "Performance-based 'Energy Steward' model – No CAPEX, paid by verified savings.",
                "Enhance yield and surface quality through T80-listed low-oxidation technologies.",
                "Designed and validated in integrated steel mills.",
                "Listed in CISA T80 extreme efficiency technologies."
              ].map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 text-gray-300">
                  <ShieldCheck size={20} className="text-furnace-500 shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <a
                  href="#assessment"
                  className="group relative overflow-hidden bg-furnace-600 text-white text-lg px-8 py-6 rounded-sm font-bold uppercase tracking-[0.1em] transition-all shadow-2xl flex items-center justify-center gap-3"
                >
                  <span className="relative z-10 text-base md:text-lg text-center">Get Free ROI Audit</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-furnace-500 to-orange-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                </a>
                <a
                  href="#case-summary"
                  className="group relative px-8 py-6 border border-white/20 hover:border-white/40 text-white text-lg rounded-sm font-bold uppercase tracking-[0.1em] transition-all backdrop-blur-md flex items-center justify-center text-center"
                >
                  <span className="text-base md:text-lg">View Case Study</span>
                </a>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CALCULATOR CARD */}
          <div className="w-full lg:w-[400px] glass-hud p-8 rounded-sm border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Calculator size={60} className="text-white" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-furnace-500"></span>
              Quick ROI Projection
            </h3>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Annual Production</label>
                  <span className="text-2xl font-mono font-bold text-furnace-500">{production} <span className="text-xs text-gray-500">Mt/y</span></span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.1"
                  value={production}
                  onChange={(e) => setProduction(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-furnace-500"
                />
                <div className="flex justify-between text-[10px] text-gray-600 font-bold mt-2 font-mono uppercase">
                  <span>0.5 Mt</span>
                  <span>Scale Your Mill</span>
                  <span>6.0 Mt</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between group/row">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Zap size={10} className="text-furnace-500" /> Est. Fuel Saving
                    </span>
                    <span className="text-xs text-gray-600 group-hover/row:text-gray-400 transition-colors">Target 11% average</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white tracking-widest italic animate-pulse">
                    ${estimatedSavings}
                    <span className="text-[10px] ml-1 text-gray-500 font-normal">/yr</span>
                  </div>
                </div>

                <div className="flex items-center justify-between group/row">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck size={10} className="text-green-500" /> CO2 Offset
                    </span>
                    <span className="text-xs text-gray-600 group-hover/row:text-gray-400 transition-colors">7.5k Carbon Credits est.</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-green-500 tracking-widest italic animate-pulse">
                    {co2Savings}
                    <span className="text-[10px] ml-1 text-gray-500 font-normal">t/yr</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/5 rounded border border-white/5 flex gap-3">
                <Info size={16} className="text-furnace-500 shrink-0" />
                <p className="text-[10px] text-gray-500 italic leading-relaxed">
                  Projections based on T80 benchmarks. Actual results vary by furnace geometry and grade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM DASHBOARD: System Status Tags */}
      <div className="relative z-20 w-full glass-hud border-t border-white/5 pb-8 pt-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 items-center text-center lg:text-left">

            <div className="border-r border-white/5 lg:pr-8">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center justify-center lg:justify-start gap-2">
                <Zap size={12} className="text-furnace-500" /> Fuel Saving (Target)
              </div>
              <div className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter">7–15<span className="text-xs ml-1 text-gray-500">%</span></div>
            </div>

            <div className="border-r border-white/5 lg:pr-8">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck size={12} className="text-green-500" /> CO2 Reduction (Est.)
              </div>
              <div className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter">7–15<span className="text-xs ml-1 text-gray-500">%</span></div>
            </div>

            <div className="hidden lg:block lg:col-span-1"></div>

            <div className="border-r border-white/5 lg:pr-8">
              <div className="text-[10px] text-furnace-500 font-bold uppercase tracking-[0.2em] mb-1 flex items-center justify-center lg:justify-start gap-2">
                <Gauge size={12} /> Zone Temp. (Typical Range)
              </div>
              <div className="text-xl md:text-2xl font-mono text-white font-bold tracking-tighter">1,150–1,250<span className="text-xs ml-1 text-gray-500">°C</span></div>
            </div>

            <div className="border-r border-white/5 lg:pr-8">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center justify-center lg:justify-start gap-2">
                <Activity size={12} className="text-blue-500" /> Flue Oxygen (Example)
              </div>
              <div className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter">1.8–2.5<span className="text-xs ml-1 text-gray-500">%</span></div>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Syst. Status</div>
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-green-400 font-mono font-bold">OPTIMIZED</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;