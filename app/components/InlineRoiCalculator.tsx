import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import type { Language } from '../contexts/LanguageContext';

interface InlineRoiCalculatorProps {
  language: Language;
  slug?: string;
}

const InlineRoiCalculator: React.FC<InlineRoiCalculatorProps> = ({ language, slug }) => {
  const [production, setProduction] = useState<number>(2.5);

  // Debounced GA4 tracking for slider value change
  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;
    const handler = setTimeout(() => {
      (window as any).gtag('event', 'roi_slider_change', {
        event_category: 'engagement',
        event_label: `production_value_${production}`,
        value: production,
        page_location: window.location.href,
        blog_slug: slug
      });
    }, 1000);

    return () => clearTimeout(handler);
  }, [production, slug]);

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'roi_cta_click', {
        event_category: 'conversion',
        event_label: `redirect_to_assessment_from_${slug || 'unknown'}`,
        production_value: production,
        blog_slug: slug
      });
    }
  };

  // ROI Logic (matching ContactForm.tsx)
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

  const t = {
    en: {
      title: "Quick ROI Estimator",
      subtitle: "See how much you could save using our Energy Steward Model",
      productionLabel: "Annual Steel Production",
      fuelSavings: "Est. Fuel Savings / Year",
      carbonSavings: "Est. Carbon Offset / Year",
      cta: "Get Verified ROI Audit",
      note: "Based on typical 11% fuel efficiency optimization."
    },
    vi: {
      title: "Công cụ Ước tính ROI Nhanh",
      subtitle: "Xem mức tiết kiệm tiềm năng theo Mô hình Quản gia năng lượng",
      productionLabel: "Sản lượng thép hàng năm",
      fuelSavings: "Tiết kiệm nhiên liệu / năm",
      carbonSavings: "Giảm phát thải carbon / năm",
      cta: "Nhận Đánh giá ROI Xác minh",
      note: "Dựa trên mức tối ưu hóa hiệu suất nhiên liệu 11% điển hình."
    },
    id: {
      title: "Estimator ROI Cepat",
      subtitle: "Lihat seberapa banyak Anda bisa menghemat dengan Model Energy Steward",
      productionLabel: "Produksi Baja Tahunan",
      fuelSavings: "Est. Penghematan Bahan Bakar / Tahun",
      carbonSavings: "Est. Penurunan Karbon / Tahun",
      cta: "Dapatkan Audit ROI Terverifikasi",
      note: "Berdasarkan optimalisasi efisiensi bahan bakar khas sebesar 11%."
    },
    'pt-br': {
      title: "Estimador de ROI Rápido",
      subtitle: "Veja quanto você pode economizar com o modelo Energy Steward",
      productionLabel: "Produção Anual de Aço",
      fuelSavings: "Economia de Combustível / Ano",
      carbonSavings: "Redução de Carbono / Ano",
      cta: "Solicitar Auditoria de ROI",
      note: "Com base na otimização de eficiência de combustível típica de 11%."
    }
  };

  const currentT = t[language] || t.en;

  const redirectUrl = language === 'en' 
    ? `/?production=${production}${slug ? `&utm_source=blog_roi&utm_medium=internal&utm_campaign=${slug}` : ''}#assessment` 
    : `/${language}/?production=${production}${slug ? `&utm_source=blog_roi&utm_medium=internal&utm_campaign=${slug}` : ''}#assessment`;

  return (
    <div className="my-12 p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl relative overflow-hidden backdrop-blur-sm">
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
            <Flame size={20} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white font-oswald uppercase tracking-wider">{currentT.title}</h4>
            <p className="text-xs text-zinc-400">{currentT.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          {/* Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{currentT.productionLabel}</label>
              <span className="text-base font-mono font-bold text-orange-500">
                {production} <span className="text-[10px] text-zinc-500">Mtpa</span>
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6.0"
              step="0.1"
              value={production}
              onChange={(e) => setProduction(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-orange-500 focus:outline-none"
            />
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{currentT.fuelSavings}</span>
              <span className="text-base sm:text-lg font-mono font-bold text-white">${estimatedSavings}</span>
            </div>
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{currentT.carbonSavings}</span>
              <span className="text-base sm:text-lg font-mono font-bold text-green-500">€{cbamSavings}</span>
            </div>
          </div>

          {/* CTA & Disclaimer */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[10px] text-zinc-500 italic max-w-xs">{currentT.note}</p>
            <a
              href={redirectUrl}
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-lg transition-all group shrink-0"
            >
              {currentT.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlineRoiCalculator;
