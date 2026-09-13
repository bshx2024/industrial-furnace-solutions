import React, { useState } from 'react';
import { MapPin, Clock, ShieldCheck, FileSpreadsheet, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface IndonesiaAuditCTAProps {
  lang?: 'en' | 'id' | 'vi' | 'pt-br';
}

export const IndonesiaAuditCTA: React.FC<IndonesiaAuditCTAProps> = ({ lang = 'en' }) => {
  const isId = lang === 'id';

  const [millName, setMillName] = useState('');
  const [location, setLocation] = useState('cilegon');
  const [furnaceType, setFurnaceType] = useState('walking-beam');
  const [capacity, setCapacity] = useState('60-100');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Track event if gtag exists
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: 'indonesia_onsite_audit_request',
        location,
        furnaceType,
        capacity,
        millName
      });
    }

    // Compose redirect with URL query params
    const assessmentUrl = isId ? '/id/#assessment' : '/#assessment';
    const params = new URLSearchParams({
      source: 'indonesia_blog_cta',
      location,
      furnace: furnaceType,
      capacity,
      mill: millName,
      contact: contactName,
      email,
      phone
    });

    setTimeout(() => {
      window.location.href = `${assessmentUrl}?${params.toString()}`;
    }, 1200);
  };

  return (
    <section 
      id="indonesia-audit-form" 
      className="my-14 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-2 border-orange-500/80 rounded-2xl shadow-2xl relative overflow-hidden text-left not-prose"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-oswald">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          {isId ? 'Layanan Lapangan Khusus Indonesia' : 'Dedicated Indonesia Field Audit Service'}
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          {isId ? 'Respons Mobilisasi: < 48 Jam' : 'Mobilization Response: < 48 Hours'}
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-oswald tracking-wide leading-tight mb-3">
          {isId 
            ? 'Ajukan Audit Lapangan Tungku Reheating di Cilegon / Surabaya (Indonesia)' 
            : 'Request On-Site Furnace Audit in Cilegon / Surabaya (Indonesia)'}
        </h3>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          {isId 
            ? 'Tim spesialis pembakaran termal kami siap diterjunkan langsung ke fasilitas rolling mill Anda di kawasan industri Cilegon (Banten) dan Surabaya / Gresik (Jawa Timur). Audit baseline tanpa menghentikan produksi regular dengan metodologi standar CISA T80.'
            : 'Our thermal combustion specialists provide direct on-site mobilization to steel rolling mills across the Cilegon (Banten) and Surabaya / Gresik (East Java) industrial corridors. Conduct thermodynamic baseline audits with zero rolling line downtime under CISA T80 standards.'}
        </p>
      </div>

      {/* Trust & Capability Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 text-xs">
        <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-bold block">{isId ? 'Cilegon & Surabaya' : 'Cilegon & Surabaya Hubs'}</span>
            <span className="text-zinc-400 text-[11px]">{isId ? 'Mobilisasi lokal < 48 jam' : 'Local Java deployment < 48h'}</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-bold block">{isId ? 'Nol Gangguan Operasional' : 'Zero Production Downtime'}</span>
            <span className="text-zinc-400 text-[11px]">{isId ? 'Ukur gas & suhu non-invasif' : 'Non-intrusive thermal telemetry'}</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-bold block">{isId ? 'Model Tanpa CAPEX' : 'Zero CAPEX Model'}</span>
            <span className="text-zinc-400 text-[11px]">{isId ? 'Biaya $0 di muka, bagi hemat' : '$0 upfront, paid from fuel savings'}</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg flex items-start gap-2.5">
          <FileSpreadsheet className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-bold block">{isId ? 'Laporan Kepatuhan SIH' : 'SIH & HGBT Quota Report'}</span>
            <span className="text-zinc-400 text-[11px]">{isId ? 'Kemenperin SIH & ESDM' : 'Full compliance balance PDF'}</span>
          </div>
        </div>
      </div>

      {/* Interactive Booking Form */}
      {submitted ? (
        <div className="p-8 bg-zinc-900/90 border border-green-500/40 rounded-xl text-center flex flex-col items-center justify-center animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-green-400 mb-3" />
          <h4 className="text-xl font-bold text-white uppercase font-oswald mb-2">
            {isId ? 'Permintaan Audit Lapangan Diterima!' : 'On-Site Audit Request Registered!'}
          </h4>
          <p className="text-zinc-300 text-sm max-w-md mb-4">
            {isId 
              ? 'Mengalihkan Anda ke formulir spesifikasi teknis mendalam untuk mengonfirmasi jadwal kunjungan tim insinyur Cilegon / Surabaya...'
              : 'Redirecting you to complete furnace thermodynamic parameters for final dispatch scheduling in Cilegon / Surabaya...'}
          </p>
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/60 p-5 sm:p-6 rounded-xl border border-zinc-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mill / Company Name */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-oswald">
                {isId ? 'Nama Perusahaan / Pabrik Baja *' : 'Steel Mill / Company Name *'}
              </label>
              <input
                type="text"
                required
                value={millName}
                onChange={(e) => setMillName(e.target.value)}
                placeholder={isId ? 'contoh: PT Krakatau Steel / Surabaya Rolling Mill' : 'e.g., PT Rebar Rolling Plant Cilegon'}
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Plant Location */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-oswald">
                {isId ? 'Lokasi Fasilitas Pabrik *' : 'Plant Location Hub *'}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="cilegon">Cilegon, Banten (West Java Corridor)</option>
                <option value="surabaya">Surabaya & Gresik (East Java Corridor)</option>
                <option value="jakarta-westjava">Jakarta / Karawang / Bekasi (West Java)</option>
                <option value="medan-sumatra">Medan / Lampung (Sumatra)</option>
                <option value="sulawesi">Morowali / Kendari (Sulawesi)</option>
                <option value="other-indonesia">Other Indonesian Region</option>
              </select>
            </div>

            {/* Furnace Type */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-oswald">
                {isId ? 'Tipe Tungku Reheating *' : 'Reheating Furnace Type *'}
              </label>
              <select
                value={furnaceType}
                onChange={(e) => setFurnaceType(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="walking-beam">Walking Beam Reheating Furnace</option>
                <option value="pusher-type">Pusher-Type Reheating Furnace</option>
                <option value="walking-hearth">Walking Hearth Furnace</option>
                <option value="rotary-hearth">Rotary Hearth Furnace</option>
                <option value="soaking-pit">Soaking Pit / Batch Furnace</option>
                <option value="not-sure">Other / Not Sure</option>
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-oswald">
                {isId ? 'Kapasitas Produksi (ton/jam) *' : 'Rolling Capacity (t/h) *'}
              </label>
              <select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="below-40">&lt; 40 t/h (Small/Medium Rolling Line)</option>
                <option value="40-80">40 – 80 t/h (Standard Section / Rebar Mill)</option>
                <option value="80-120">80 – 120 t/h (High-Speed Wire Rod / Merchant)</option>
                <option value="above-120">&gt; 120 t/h (Heavy Plate / Strip Mill)</option>
              </select>
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-oswald">
                {isId ? 'Nama Lengkap & Jabatan *' : 'Contact Person & Title *'}
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={isId ? 'contoh: Bpk. Hendra (Direktur Teknik / Plant Manager)' : 'e.g., Plant Manager / Lead Thermal Engineer'}
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-oswald">
                {isId ? 'Nomor WhatsApp / Telepon *' : 'WhatsApp / Phone Number (+62) *'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 812-xxxx-xxxx"
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-oswald">
              {isId ? 'Email Resmi Kantor *' : 'Corporate Email Address *'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@steelmill.co.id"
              className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Submit and Direct Links */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-zinc-800">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold font-oswald uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all text-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {isId 
                ? 'Jadwalkan Audit Lapangan di Cilegon / Surabaya →' 
                : 'Schedule On-Site Audit in Cilegon / Surabaya →'}
            </button>

            <a
              href={isId ? '/id/#assessment' : '/#assessment'}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-bold uppercase tracking-wider transition-colors py-2"
            >
              {isId ? 'Lihat Formulir Penilaian Lengkap' : 'Or Open Full Assessment Wizard'}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </form>
      )}

      {/* Footer reassurance */}
      <div className="mt-4 text-center text-xs text-zinc-500">
        {isId 
          ? '🔒 Privasi Data Terjamin: Data konsumsi gas HGBT dan spesifikasi bilet Anda dilindungi NDA industri yang ketat.'
          : '🔒 Industrial NDA Guarantee: Your HGBT gas billing records and proprietary billet specifications remain strictly confidential.'}
      </div>
    </section>
  );
};

export default IndonesiaAuditCTA;
