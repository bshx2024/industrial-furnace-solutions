import React from 'react';
import ContactForm from '../components/ContactForm';
import { Users, Globe, Award, TrendingUp } from 'lucide-react';

const AboutContact: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Header */}
            <section className="pt-40 pb-20 bg-industrial-950 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">About & Contact</h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Leading the transition to extreme energy efficiency in the steel industry through advanced thermal engineering and AI optimization.
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block">Our Company</span>
                            <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-8">Jiangsu Nanfang Technology</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Jiangsu Nanfang Technology is a premier technology provider focusing on <span className="text-industrial-950 font-bold">full-fiber furnace roofs</span>, <span className="text-industrial-950 font-bold">intelligent reheating systems</span>, and <span className="text-industrial-950 font-bold">non-ceramic functional coatings</span> for industrial energy saving.
                            </p>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8 flex items-center gap-6">
                                <div className="bg-furnace-600 p-4 rounded-xl text-white">
                                    <Award size={32} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-industrial-950">Award Winning Excellence</h4>
                                    <p className="text-sm text-gray-500">Nominated and listed in the 2024 T80 Extreme Energy Efficiency Technologies.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="flex gap-8">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-industrial-900 mb-2">Strategic Partnership</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Working in strategic partnership with <span className="text-industrial-950 font-bold">Dongming Green Energy</span> to provide robust capital support and integrated energy service capabilities for large-scale steel groups.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600">
                                    <Globe size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-industrial-900 mb-2">Global Vision</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Serving major integrated steel producers globally with a focus on green, low-carbon demonstration and resource utilization benchmarks.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600">
                                    <TrendingUp size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-industrial-900 mb-2">Innovation Driven</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Continuous R&D in AI-supported intelligent steel burning and advanced regenerative refractory materials.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-industrial-900">Get in Touch</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Whether you're looking for an energy audit, technical consultation, or partnership opportunities, our experts are ready to assist.
                        </p>
                    </div>
                    {/* Reuse the ContactForm component but tailored for assessment */}
                    <ContactForm />

                    <div className="mt-20 flex flex-col md:flex-row justify-center gap-12 text-center md:text-left border-t border-slate-200 pt-16">
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-industrial-950 mb-2">Main Office</h5>
                            <p className="text-gray-500 text-sm">Jiangsu Province, China</p>
                        </div>
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-industrial-950 mb-2">Email Inquiry</h5>
                            <p className="text-gray-500 text-sm">contact@ecoreheating.com</p>
                        </div>
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-industrial-950 mb-2">Global Support</h5>
                            <p className="text-gray-500 text-sm">+86 (510) 555-0123</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutContact;
