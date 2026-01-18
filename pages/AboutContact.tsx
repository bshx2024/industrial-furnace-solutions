import React from 'react';
import ContactForm from '../components/ContactForm';
import { Users, Globe, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

const AboutContact: React.FC = () => {
    return (
        <div className="bg-white">
            <SEO
                title="About South Technology & Contact Us"
                description="Expert engineering for industrial furnaces since 2014. Contact us for turnkey energy-saving solutions and thermal process optimization."
            />
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
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-industrial-900 mb-2">SOUTH TECHNOLOGY</h2>
                            <p className="text-furnace-600 font-bold mb-8 uppercase tracking-wider text-sm">Engineering Excellence Since 2014</p>

                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Headquartered in Shanghai's prestigious <span className="text-industrial-950 font-bold">Hopson International Center</span>, South Technology is a leading engineering enterprise specialized in turnkey (EPC) solutions for industrial furnaces and environmental systems.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Since our strategic technology transfer from <span className="text-industrial-950 font-bold">UK-based FCS in 2014</span>, we have successfully implemented advanced British thermal engineering in <span className="text-industrial-950 font-bold">nearly 300 production lines</span> globally, achieving comprehensive energy efficiency gains of <span className="text-furnace-600 font-bold">up to 20%</span> (including yield improvements) for major facility retrofits.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Guided by the mission of industrial carbon neutrality, we have evolved from a specialized manufacturer into an "Energy Steward" service provider, integrating full-fiber roof technology and AI-supported smart combustion to deliver sustainable industrial wealth.
                            </p>
                            <div className="p-8 bg-industrial-950 text-white rounded-2xl border border-slate-100 mb-8 flex items-center justify-center gap-6 shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-furnace-600/10 to-transparent"></div>
                                <div className="text-2xl md:text-3xl font-heading font-black italic text-center relative z-10">
                                    "Mastering Energy. <br className="md:hidden" /> Creating Wealth."
                                </div>
                            </div>

                            {/* Evidence: Signing Photo moved here for narrative alignment */}
                            <div className="space-y-4 max-w-md">
                                <div className="relative group/img overflow-hidden rounded-2xl shadow-lg border border-slate-100">
                                    <img
                                        src="/fcs-signing.jpg"
                                        alt="Strategic Alliance 2014"
                                        className="h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                                    />
                                </div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                                    Strategic Alliance Signing (2014): <br />
                                    Chairman Chao & Michael (FCS UK Legal Representative)
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="flex gap-8">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-industrial-900 mb-2">Strategic Alliance</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Backed by <span className="text-industrial-950 font-bold">Dongming Green Energy</span> for robust capital support, ensuring zero-risk project delivery for large-scale steel groups.
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
                                        Demonstrated excellence across nearly 300 production lines globally, setting the benchmark for low-carbon metallurgy and extreme resource utilization.
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
                                        Continuous R&D in AI-supported smart combustion control and advanced regenerative refractory materials.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Authority & Trust */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-heading font-bold text-industrial-900 mb-6">Technical Foundation & Global Credentials</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Our strength lies in a high-caliber professional team covering thermal processes, mechanical design, electrical automation, environmental engineering, and vaporization cooling. This integrated expertise allows us to provide truly seamless turnkey solutions with strict quality control and a dedicated after-sales service system.
                            </p>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="p-6 bg-white rounded-xl border border-slate-200">
                                    <div className="text-3xl font-bold text-industrial-950 mb-1">300+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Production Lines</div>
                                </div>
                                <div className="p-6 bg-white rounded-xl border border-slate-200">
                                    <div className="text-3xl font-bold text-industrial-950 mb-1">Up to 20%</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Comprehensive Gain</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-4 border-t border-slate-200">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">Integrity</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">Innovation</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">Shared Success</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40">Dedication</span>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="space-y-4 max-w-md ml-auto">
                                <div className="relative group/img overflow-hidden rounded-2xl shadow-lg border border-white">
                                    <img
                                        src="/patent-wall.png"
                                        alt="Technical Patent Wall"
                                        className="h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                                    />
                                </div>
                                <div className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Core Intellectual Property & Global Patent Portfolio</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
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
                            <h5 className="text-xs font-black uppercase tracking-widest text-industrial-950 mb-2">Global Operations</h5>
                            <p className="text-gray-500 text-sm">Headquartered in Shanghai, China, with a global engineering hub serving steel mills across Asia and beyond.</p>
                        </div>
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-industrial-950 mb-2">Email Inquiry</h5>
                            <p className="text-gray-500 text-sm">contact@ecoreheating.com</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Image Modals Removed for Performance/Quality */}
        </div>
    );
};

export default AboutContact;
