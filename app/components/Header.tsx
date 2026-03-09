import React, { useState, useEffect, useRef } from 'react';

import { Menu, X, Flame, Globe, ChevronDown } from 'lucide-react';

import { Link, useLocation } from 'react-router';

import { useLanguage, Language } from '../contexts/LanguageContext';



const Header: React.FC = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const location = useLocation();

  const { language, switchLanguage, t, l } = useLanguage();

  const dropdownRef = useRef<HTMLDivElement>(null);



  useEffect(() => {

    const handleScroll = () => {

      setIsScrolled(window.scrollY > 50);

    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

        setIsLangDropdownOpen(false);

      }

    };



    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);



  const navLinks = [
    { name: t('nav.home'), href: l('/') },
    {
      name: t('nav.solutions'),
      href: l('/solutions'),
      dropdown: language === 'vi' ? [
        { name: t('nav.vietnamSteel'), href: '/vi/lp/cbam-steel-vietnam' }
      ] : undefined
    },
    { name: t('nav.caseStudies'), href: l('/hero-cases') },
    { name: t('nav.about'), href: l('/about') },
    { name: t('nav.blog'), href: l('/blog') },
  ];



  const languages: { code: Language; name: string; flag: string }[] = [

    { code: 'en', name: t('lang.english'), flag: '🇬🇧' },

    { code: 'vi', name: t('lang.vietnamese'), flag: '🇻🇳' },

  ];



  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];



  return (

    <header

      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-industrial-900 shadow-lg py-3' : 'bg-transparent py-5'

        }`}

    >

      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">

        {/* Logo */}

        <Link to={l('/')} className="flex items-center gap-2 group">

          <div className="bg-furnace-600 p-2 rounded text-white group-hover:bg-furnace-500 transition-colors">

            <Flame size={24} fill="currentColor" />

          </div>

          <div className="flex flex-col">

            <span className="font-heading font-bold text-xl uppercase tracking-wider leading-none text-white">

              Eco<span className="text-furnace-500">Reheating</span>

            </span>

            <span className={`text-[10px] tracking-widest uppercase ${isScrolled ? 'text-gray-400' : 'text-gray-300'}`}>

              Industrial Solutions

            </span>

          </div>

        </Link>



        {/* Desktop Nav */}

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group/nav">
              <Link
                to={link.href}
                className={`text-sm font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${location.pathname === link.href ? 'text-furnace-500' : 'text-gray-300 hover:text-furnace-500'
                  }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform" />}
              </Link>

              {link.dropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-industrial-800 border border-gray-700 rounded shadow-xl opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all z-50 p-2">
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="block px-4 py-3 text-[10px] font-black tracking-widest text-gray-400 hover:bg-industrial-700 hover:text-furnace-500 transition-colors border-l-2 border-transparent hover:border-furnace-500 uppercase italic"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}



          {/* Language Dropdown */}

          <div className="relative" ref={dropdownRef}>

            <button

              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}

              className="flex items-center gap-2 text-gray-300 hover:text-furnace-500 transition-colors border border-gray-700 hover:border-furnace-500 px-3 py-2 rounded"

            >

              <Globe size={18} />

              <span className="text-sm font-semibold uppercase">{currentLanguage.flag}</span>

              <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />

            </button>



            {isLangDropdownOpen && (

              <div className="absolute right-0 mt-2 w-48 bg-industrial-800 border border-gray-700 rounded shadow-xl z-50">

                {languages.map((lang) => (

                  <button

                    key={lang.code}

                    onClick={() => {

                      switchLanguage(lang.code);

                      setIsLangDropdownOpen(false);

                    }}

                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-industrial-700 transition-colors ${language === lang.code ? 'bg-industrial-700 text-furnace-500' : 'text-gray-300'

                      }`}

                  >

                    <span className="text-xl">{lang.flag}</span>

                    <span className="text-sm font-semibold">{lang.name}</span>

                  </button>

                ))}

              </div>

            )}

          </div>



          <a
            href={l('/#assessment')}

            className="bg-furnace-600 hover:bg-furnace-500 text-white px-6 py-2 rounded font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-furnace-600/30"

          >

            {t('nav.freeAssessment')}

          </a>

        </nav>



        {/* Mobile Menu Button */}

        <button

          className="md:hidden text-white"

          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

        >

          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}

        </button>

      </div>



      {/* Mobile Menu */}

      {isMobileMenuOpen && (

        <div className="md:hidden bg-industrial-900 border-t border-gray-800 absolute w-full">

          <div className="flex flex-col p-4 space-y-4">

            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-semibold uppercase tracking-wide flex items-center justify-between ${location.pathname === link.href ? 'text-furnace-500' : 'text-gray-300 hover:text-furnace-500'
                    }`}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 flex flex-col space-y-3 border-l-2 border-gray-800">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs font-black tracking-widest text-gray-500 hover:text-furnace-500 uppercase italic"
                      >
                        → {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}



            {/* Mobile Language Selector */}

            <div className="border-t border-gray-800 pt-4">

              <div className="flex flex-col gap-2">

                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase mb-2">

                  <Globe size={14} />

                  <span>Language</span>

                </div>

                {languages.map((lang) => (

                  <button

                    key={lang.code}

                    onClick={() => {

                      switchLanguage(lang.code);

                      setIsMobileMenuOpen(false);

                    }}

                    className={`flex items-center gap-3 px-3 py-2 rounded ${language === lang.code ? 'bg-industrial-700 text-furnace-500' : 'text-gray-300 hover:bg-industrial-800'

                      }`}

                  >

                    <span className="text-xl">{lang.flag}</span>

                    <span className="text-sm font-semibold">{lang.name}</span>

                  </button>

                ))}

              </div>

            </div>



            <a
              href={l('/#assessment')}

              onClick={() => setIsMobileMenuOpen(false)}

              className="bg-furnace-600 text-center text-white px-6 py-3 rounded font-bold uppercase tracking-wide"

            >

              {t('nav.freeAssessment')}

            </a>

          </div>

        </div>

      )}

    </header>

  );

};



export default Header;

