import React from 'react';

const LogoWall: React.FC = () => {
    const logos = [
        { name: 'Fangda Group', src: '/南方科技公司业绩/640.jpg' }, // Using the composite image for now as it contains many logos
    ];

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h3 className="text-xl font-heading font-bold text-industrial-800 mb-12 uppercase tracking-widest">
                    Trusted by Industry Leaders
                </h3>

                <div className="max-w-5xl mx-auto overflow-hidden bg-white p-8 rounded-3xl shadow-industrial-sm border border-slate-100">
                    <p className="text-gray-500 mb-8 text-sm">
                        Partners including Fangda Group, Liugang Group, Desheng Group, Qian'an Jiujiang, and nearly 100 other production lines.
                    </p>
                    <div className="relative group">
                        <img
                            src="/partner-logos.jpg"
                            alt="Partner Logos"
                            className="w-full h-auto grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoWall;
