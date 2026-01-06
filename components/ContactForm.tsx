import React, { useState } from 'react';
import { FileText, Send, CheckCircle, HelpCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="assessment" className="py-24 bg-slate-50 relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100">

          {/* Text/Magnet Side */}
          <div className="lg:w-2/5 p-12 bg-industrial-950 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-furnace-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>

            <span className="text-furnace-500 font-bold uppercase tracking-widest text-xs mb-4 block">Limited Opportunity</span>
            <h2 className="text-4xl font-heading font-bold mb-6 relative z-10">
              Claim Your Free <br /><span className="text-furnace-500">ROI Potential Audit</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg relative z-10 leading-relaxed">
              Find out exactly how much you can save. We provide a comprehensive baseline assessment and ROI projection <span className="text-white font-bold">at no upfront cost</span>.
            </p>

            <div className="p-4 bg-furnace-600/20 border border-furnace-500/30 rounded-lg mb-8">
              <p className="text-sm text-furnace-200 italic">
                "Note: Due to the capital-heavy nature of our model, we only accept 2 new projects per month."
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="bg-furnace-600/20 p-2 rounded text-furnace-500">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Data Driven</h4>
                  <p className="text-xs text-gray-400">Baseline established via actual mill production logs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="bg-furnace-600/20 p-2 rounded text-furnace-500">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Expert Analysis</h4>
                  <p className="text-xs text-gray-400">T80-level engineering review of your process geometry.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 bg-white">
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center min-h-[500px]">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-industrial-900 mb-2">Assessment Requested!</h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  Thank you. One of our energy stewards will contact you to collect the necessary production data for the preliminary assessment.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-furnace-600 font-bold hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2">Role</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all bg-white"
                    >
                      <option value="">Select your role...</option>
                      <option value="plant-manager">Plant Manager</option>
                      <option value="energy-manager">Energy Manager</option>
                      <option value="maintenance-manager">Maintenance Manager</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2">Company</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder="Steel mill / Group name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2">Country / Region</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder="e.g. China, Vietnam, Brazil..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2">Annual Production (Mt/year)</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                      placeholder="e.g. 2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2">Furnace Type</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all bg-white"
                    >
                      <option value="">Select type...</option>
                      <option value="walking-beam">Walking Beam</option>
                      <option value="walking-hearth">Walking Hearth</option>
                      <option value="pusher">Pusher</option>
                      <option value="other">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all"
                    placeholder="Specific challenges or process details..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className={`w-full bg-furnace-600 text-white font-bold text-lg py-5 rounded-xl uppercase tracking-widest hover:bg-furnace-700 transition-all shadow-xl flex items-center justify-center gap-3 ${formState === 'submitting' ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {formState === 'submitting' ? 'Analyzing Data...' : (
                    <>Analyze My ROI Now <Send size={20} /></>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500 mt-6 leading-relaxed">
                  Join 15+ steel mills already optimized by our T80 technology. <br />
                  <span className="font-bold">Privacy Guarantee:</span> Your data is protected by MNDA.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;