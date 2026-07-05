import React, { useState, useEffect } from 'react';
import { Globe, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Language } from '../contexts/LanguageContext';

interface SmartLanguageBannerProps {
  currentLang: Language;
  slug: string;
  availableLangs: {
    en: boolean;
    vi: boolean;
    id: boolean;
    'pt-br': boolean;
  };
}

const SmartLanguageBanner: React.FC<SmartLanguageBannerProps> = ({ currentLang, slug, availableLangs }) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [targetLang, setTargetLang] = useState<Language | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user has already dismissed the banner in this session
    const isDismissed = sessionStorage.getItem(`dismiss-lang-banner-${slug}`);
    if (isDismissed === 'true') return;

    // Detect browser language
    const browserLangCode = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
    
    let preferredLang: Language | null = null;
    if (browserLangCode.startsWith('vi')) {
      preferredLang = 'vi';
    } else if (browserLangCode.startsWith('id') || browserLangCode.startsWith('in')) {
      preferredLang = 'id';
    } else if (browserLangCode.startsWith('pt')) {
      preferredLang = 'pt-br';
    } else if (browserLangCode.startsWith('en')) {
      preferredLang = 'en';
    }

    // Only suggest if:
    // 1. We successfully mapped the browser language.
    // 2. It is different from the current page language.
    // 3. The current post has a translation in that language.
    if (preferredLang && preferredLang !== currentLang && availableLangs[preferredLang]) {
      setTargetLang(preferredLang);
      setShowBanner(true);
    }
  }, [currentLang, slug, availableLangs]);

  const handleDismiss = () => {
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`dismiss-lang-banner-${slug}`, 'true');
    }
  };

  if (!showBanner || !targetLang) return null;

  const copy = {
    vi: {
      text: "Đọc bài viết này bằng tiếng Việt để có trải nghiệm tốt nhất.",
      cta: "Chuyển sang tiếng Việt"
    },
    id: {
      text: "Baca artikel ini dalam Bahasa Indonesia untuk pengalaman terbaik.",
      cta: "Beralih ke Bahasa Indonesia"
    },
    'pt-br': {
      text: "Leia este artigo em Português para uma melhor experiência.",
      cta: "Mudar para Português"
    },
    en: {
      text: "Read this article in English for the best experience.",
      cta: "Switch to English"
    }
  };

  const currentCopy = copy[targetLang];

  const targetPath = targetLang === 'en' 
    ? `/blog/${slug}` 
    : `/${targetLang}/blog/${slug}`;

  return (
    <div className="bg-orange-600 text-white py-3 px-4 sm:px-6 relative shadow-md transition-all duration-300 z-50 rounded-lg mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-orange-500/30">
      <div className="flex items-center gap-3">
        <div className="bg-white/10 p-1.5 rounded-lg text-white shrink-0">
          <Globe size={16} />
        </div>
        <p className="text-xs sm:text-sm font-medium leading-normal text-left">
          {currentCopy.text}
        </p>
      </div>

      <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
        <Link
          to={targetPath}
          onClick={() => setShowBanner(false)}
          className="inline-flex items-center gap-1.5 bg-white text-orange-600 font-bold text-xs uppercase tracking-widest py-1.5 px-4 rounded hover:bg-orange-50 transition-colors shadow-sm"
        >
          {currentCopy.cta}
          <ArrowRight size={12} />
        </Link>
        <button
          onClick={handleDismiss}
          className="text-white/80 hover:text-white transition-colors p-1"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default SmartLanguageBanner;
