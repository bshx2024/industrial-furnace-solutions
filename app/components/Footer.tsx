import React from 'react';
import { Flame, Linkedin, Twitter, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t, l } = useLanguage();

  return (
    <footer className="bg-industrial-950 text-gray-400 py-16 border-t border-industrial-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to={l('/')} className="flex items-center gap-2 mb-6 text-white group">
              <div className="bg-furnace-600 p-2 rounded group-hover:bg-furnace-500 transition-colors">
                <Flame size={20} fill="currentColor" />
              </div>
              <span className="font-heading font-bold text-xl uppercase tracking-wider">EcoReheating</span>
            </Link>
            <p className="text-sm mb-6 leading-relaxed">
              {language === 'vi'
                ? 'Dẫn đầu sự chuyển đổi sang hiệu quả năng lượng cực cao trong ngành thép thông qua kỹ thuật nhiệt tiên tiến và tối ưu hóa AI.'
                : 'Leading the transition to extreme energy efficiency in the steel industry through T80-listed thermal engineering and AI optimization.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-industrial-900 flex items-center justify-center hover:bg-furnace-600 hover:text-white transition-all border border-industrial-800"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-industrial-900 flex items-center justify-center hover:bg-furnace-600 hover:text-white transition-all border border-industrial-800"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-industrial-900 flex items-center justify-center hover:bg-furnace-600 hover:text-white transition-all border border-industrial-800"><Globe size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{t('nav.solutions')}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to={l('/')} className="hover:text-furnace-500 transition-colors">{t('nav.home')}</Link></li>
              <li><Link to={l('/solutions')} className="hover:text-furnace-500 transition-colors">{t('nav.solutions')}</Link></li>
              <li><Link to={l('/hero-cases')} className="hover:text-furnace-500 transition-colors">{t('nav.caseStudies')}</Link></li>
              <li><Link to={l('/about')} className="hover:text-furnace-500 transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{t('tech.badge')}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to={l('/#tech-roof')} className="hover:text-furnace-500 transition-colors">{t('tech.roof.title')}</Link></li>
              <li><Link to={l('/#tech-ai')} className="hover:text-furnace-500 transition-colors">{t('tech.ai.title')}</Link></li>
              <li><Link to={l('/#tech-coating')} className="hover:text-furnace-500 transition-colors">{t('tech.coating.title')}</Link></li>
              <li><Link to={l('/#energy-steward')} className="hover:text-furnace-500 transition-colors">{t('footer.energySteward')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{t('common.contactUs')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-furnace-500" />
                <span>contact@ecoreheating.com</span>
              </li>
              <li className="leading-relaxed">
                Global HQ: Shanghai,<br />
                China
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-industrial-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ECOREHEATING. {t('calc.verified').toUpperCase()}
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.compliance')}</a>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;

