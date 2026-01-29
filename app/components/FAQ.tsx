 import React, { useState } from 'react';

import { FAQItem } from '../types';

import { ChevronDown, ChevronUp, FileQuestion } from 'lucide-react';



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

        <p className="text-gray-600 leading-relaxed">

          {item.answer}

        </p>

      </div>

    </div>

  );

};



const FAQ: React.FC = () => {

  const faqs: FAQItem[] = [

    {

      question: "How do you calculate reheating furnace efficiency?",

      answer: "We perform a comprehensive heat balance calculation based on fuel caloric value, flue gas temperature, oxygen content, and wall heat losses. Our audit determines the exact thermal efficiency percentage and identifies specific areas for heat recovery potential."

    },

    {

      question: "What is the difference between Walking Beam and Pusher Furnaces?",

      answer: "Pusher furnaces slide steel on skids, which can cause skid marks and surface damage. Walking Beam furnaces lift and move material, reducing damage and allowing for better bottom-side heating. However, Walking Beam furnaces have more openings, requiring advanced sealing and pressure control to maintain high efficiency."

    },

    {

      question: "How much can I save with regenerative burners?",

      answer: "Regenerative burners can recover up to 80-90% of waste heat from flue gases, preheating combustion air to very high temperatures. Typically, clients see fuel savings between 30% to 50% compared to cold air burners, and 10-15% compared to standard recuperative systems."

    },

    {

      question: "Do you comply with industrial energy standards?",

      answer: "Yes, our solutions are designed to help you meet ISO 50001 Energy Management standards and local environmental regulations regarding NOx and CO2 emissions."

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

                <span className="font-bold uppercase tracking-wider">Expert Insights</span>

              </div>

              <h3 className="text-3xl font-heading font-bold text-industrial-900 mb-4">

                Industrial Furnace <br/>Efficiency

              </h3>

              <p className="text-gray-600 mb-6">

                Understanding the technical nuances of combustion control and insulation is key to ROI. We answer the most common engineering questions about furnace retrofitting here.

              </p>

              <a href="#contact" className="text-industrial-900 font-bold underline hover:text-furnace-600">

                Have a specific technical question?

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

