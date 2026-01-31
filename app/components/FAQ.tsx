import React, { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, ChevronUp, FileQuestion } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQAccordion: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold text-industrial-900 pr-8">{item.question}</span>
        {isOpen ? <ChevronUp className="text-furnace-500 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed text-left">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t } = useLanguage();

  const faqs: FAQItem[] = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* SEO Content Side */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-furnace-500 sticky top-24">
              <div className="flex items-center gap-3 mb-4 text-furnace-600">
                <FileQuestion size={28} />
                <span className="font-bold uppercase tracking-wider">{t('faq.badge')}</span>
              </div>
              <h3 className="text-3xl font-heading font-bold text-industrial-900 mb-4 text-left">
                {t('faq.title').split('Furnace')[0]}
                <br />
                {t('faq.title').includes('Furnace') ? 'Furnace Efficiency' : t('faq.title')}
              </h3>
              <p className="text-gray-600 mb-6 text-left">
                {t('faq.desc')}
              </p>
              <a href="#assessment" className="text-industrial-900 font-bold underline hover:text-furnace-600 block text-left">
                {t('faq.specific')}
              </a>
            </div>
          </div>

          {/* FAQ Accordion Side */}
          <div className="lg:w-2/3">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} item={faq} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
