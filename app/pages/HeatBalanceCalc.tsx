import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export const meta: MetaFunction = () => {
    return [
        { title: "Industrial Reheating Furnace Heat Balance Calculator | EcoReheating" },
        { name: "description", content: "Interactive thermal balance calculator for steel reheating furnaces. Map heat distribution, flue gas losses, and shell radiation." },
    ];
};

const HeatBalanceCalc: React.FC = () => {
    const { language: lang } = useLanguage();
    const [productionRate, setProductionRate] = useState<number>(150); // t/h
    const [fuelConsumption, setFuelConsumption] = useState<number>(55); // m3 gas/ton
    const [dischargeTemp, setDischargeTemp] = useState<number>(1150); // C
    const [airPreheatTemp, setAirPreheatTemp] = useState<number>(150); // C

    // Mathematical Thermal Model (simplified thermodynamic model)
    const steelSpecificHeat = 0.68; // kJ/kg.C
    const gasCaloricValue = 35800; // kJ/m3 (Natural Gas LHV)
    
    // 1. Total Heat Input (Fuel + preheated combustion air)
    const fuelHeatInput = fuelConsumption * gasCaloricValue; // kJ per ton steel
    
    // Combustion air volume estimation: ~10m3 air per m3 gas
    // Specific heat of air: ~1.3 kJ/m3.C
    const combustionAirVolume = fuelConsumption * 10.5; // m3 air/ton steel
    const airHeatInput = combustionAirVolume * 1.3 * (airPreheatTemp - 20); // kJ/ton
    const totalHeatInput = fuelHeatInput + airHeatInput;

    // 2. Heat absorbed by steel (useful heat)
    // Q_steel = m * cp * deltaT
    const heatSteelAbsorbed = 1000 * steelSpecificHeat * (dischargeTemp - 20); // kJ/ton

    // 3. Flue gas heat loss (stack loss)
    // Flue gas temp is typically 150-200C higher than furnace zone or estimated based on air preheat.
    // Higher preheat temperature means a better recuperator which drops the stack exit temperature.
    const stackTemp = Math.max(180, 850 - airPreheatTemp * 0.9); // C
    const flueGasVolume = fuelConsumption * 11.5; // m3 flue gas/ton steel
    const stackHeatLoss = flueGasVolume * 1.4 * (stackTemp - 20); // kJ/ton

    // 4. Cooling water heat loss (skid cooling in walking beam furnaces)
    const waterCoolingLoss = 0.08 * totalHeatInput; // 8% baseline cooling loss

    // 5. Wall Radiation & Opening loss
    // Full fiber roof drops this from 12% to 6%. Let's assume standard baseline.
    const wallRadiationLoss = 0.09 * totalHeatInput;

    // 6. Unaccounted & residue heat
    const unaccountedLoss = Math.max(0, totalHeatInput - (heatSteelAbsorbed + stackHeatLoss + waterCoolingLoss + wallRadiationLoss));

    // Percentages
    const pctSteel = (heatSteelAbsorbed / totalHeatInput) * 100;
    const pctStack = (stackHeatLoss / totalHeatInput) * 100;
    const pctCooling = (waterCoolingLoss / totalHeatInput) * 100;
    const pctWall = (wallRadiationLoss / totalHeatInput) * 100;
    const pctUnaccounted = (unaccountedLoss / totalHeatInput) * 100;

    // Total MW thermal capacity
    const totalMW = (totalHeatInput * productionRate) / (3600 * 1000);
    const steelMW = (heatSteelAbsorbed * productionRate) / (3600 * 1000);
    const stackMW = (stackHeatLoss * productionRate) / (3600 * 1000);

    // Translations
    const t = {
        en: {
            title: "Reheating Furnace Heat Balance Calculator",
            subtitle: "Model the distribution of heat energy inside your furnace. Balance useful steel heating against thermal losses.",
            inputProd: "Production Throughput",
            inputFuel: "Specific Gas Consumption",
            inputDischarge: "Billet Discharge Temp",
            inputPreheat: "Air Preheat Temp",
            thermoSummary: "Thermodynamic Analysis Summary",
            heatInputTotal: "Total Heat Input Rate",
            steelAbsorption: "Steel Heat Absorption (Efficiency)",
            stackLoss: "Flue Gas (Stack) Loss",
            coolingLoss: "Cooling Water Loss",
            wallLoss: "Wall Radiation & Openings Loss",
            otherLoss: "Other Unaccounted Loss",
            modelDisclaimer: "Disclaimer: This model is for technical planning and baseline estimation. Exact heat balance parameters require dynamic gas chromatography and pressure profiling during physical site audits.",
            requestAudit: "Request Complete Heat Balance Site Audit →",
            back: "← Back to Calculators",
        },
        vi: {
            title: "Tính Toán Cân Bằng Nhiệt Lò Nung",
            subtitle: "Mô hình hóa phân phối năng lượng nhiệt bên trong lò nung. Cân bằng nhiệt có ích với các tổn thất nhiệt.",
            inputProd: "Sản lượng làm việc",
            inputFuel: "Tiêu thụ gas riêng",
            inputDischarge: "Nhiệt độ phôi ra lò",
            inputPreheat: "Nhiệt độ gió sấy",
            thermoSummary: "Tóm Tắt Phân Tích Nhiệt Động Lực Học",
            heatInputTotal: "Tổng công suất nhiệt cấp",
            steelAbsorption: "Nhiệt hấp thụ của thép (Hiệu suất)",
            stackLoss: "Tổn thất khói thải (Ống khói)",
            coolingLoss: "Tổn thất nước làm mát",
            wallLoss: "Tổn thất bức xạ vỏ & khe hở",
            otherLoss: "Tổn thất không tính được khác",
            modelDisclaimer: "Lưu ý: Mô hình này phục vụ lập kế hoạch kỹ thuật. Việc tính toán cân bằng nhiệt chính xác cần thực hiện đo đạc khí thải và áp suất trực tiếp tại nhà máy.",
            requestAudit: "Đăng ký kiểm toán cân bằng nhiệt toàn diện →",
            back: "← Quay lại danh sách công cụ",
        },
        id: {
            title: "Kalkulator Keseimbangan Panas Tungku",
            subtitle: "Modelkan distribusi energi panas di dalam tungku Anda. Seimbangkan pemanasan baja yang berguna dengan kehilangan termal.",
            inputProd: "Kapasitas Produksi",
            inputFuel: "Konsumsi Gas Spesifik",
            inputDischarge: "Suhu Pelepasan Billet",
            inputPreheat: "Suhu Pemanasan Udara",
            thermoSummary: "Ringkasan Analisis Termodinamika",
            heatInputTotal: "Total Laju Input Panas",
            steelAbsorption: "Penyerapan Panas Baja (Efisiensi)",
            stackLoss: "Kehilangan Gas Buang (Cerobong)",
            coolingLoss: "Kehilangan Air Pendingin",
            wallLoss: "Kehilangan Radiasi Dinding & Celah",
            otherLoss: "Kehilangan Lainnya",
            modelDisclaimer: "Catatan: Model ini untuk perencanaan teknis. Parameter keseimbangan panas yang tepat memerlukan profil kromatografi gas dinamis selama audit fisik.",
            requestAudit: "Minta Audit Keseimbangan Panas Lengkap →",
            back: "← Kembali ke Kalkulator",
        },
        "pt-br": {
            title: "Calculadora de Balanço Térmico de Fornos",
            subtitle: "Simule a distribuição da energia térmica no interior do seu forno. Compare o aquecimento útil do aço com as perdas térmicas.",
            inputProd: "Produção Efetiva",
            inputFuel: "Consumo de Gás Específico",
            inputDischarge: "Temperatura de Saída do Tarugo",
            inputPreheat: "Temp. do Ar de Combustão",
            thermoSummary: "Resumo da Análise Termodinâmica",
            heatInputTotal: "Taxa Total de Entrada de Calor",
            steelAbsorption: "Absorção de Calor pelo Aço (Eficiência)",
            stackLoss: "Perda pelos Gases de Exaustão (Chaminé)",
            coolingLoss: "Perda pela Água de Resfriamento",
            wallLoss: "Perda por Radiação das Paredes e Aberturas",
            otherLoss: "Outras Perdas Não Contabilizadas",
            modelDisclaimer: "Nota: Este modelo serve para fins de planejamento técnico. O balanço térmico exato requer medições dinâmicas de cromatografia e pressão em campo.",
            requestAudit: "Solicitar Auditoria de Balanço Térmico →",
            back: "← Voltar para Calculadoras",
        }
    };

    const currentT = t[lang as keyof typeof t] || t.en;
    const locale = lang === 'vi' ? 'vi-VN' : lang === 'id' ? 'id-ID' : lang === 'pt-br' ? 'pt-BR' : 'en-US';

    const auditLink = lang === 'en' ? '/about#assessment' : `/${lang}/about#assessment`;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 carbon-pattern pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link to={lang === 'en' ? '/calculators' : `/${lang}/calculators`} className="text-furnace-500 hover:text-furnace-600 transition-colors font-medium">
                        {currentT.back}
                    </Link>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                        {currentT.title}
                    </h1>
                    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
                        {currentT.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Controls */}
                    <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* Production Throughput */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentT.inputProd}</label>
                                <span className="text-base font-mono font-bold text-furnace-500">
                                    {productionRate} <span className="text-xs text-slate-500">t/h</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="30"
                                max="300"
                                step="5"
                                value={productionRate}
                                onChange={(e) => setProductionRate(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-furnace-500 focus:outline-none"
                            />
                        </div>

                        {/* Specific Gas Consumption */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentT.inputFuel}</label>
                                <span className="text-base font-mono font-bold text-furnace-500">
                                    {fuelConsumption} <span className="text-xs text-slate-500">m³/t</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="35"
                                max="95"
                                step="1"
                                value={fuelConsumption}
                                onChange={(e) => setFuelConsumption(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-furnace-500 focus:outline-none"
                            />
                        </div>

                        {/* Billet Discharge Temp */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentT.inputDischarge}</label>
                                <span className="text-base font-mono font-bold text-furnace-500">
                                    {dischargeTemp} <span className="text-xs text-slate-500">°C</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="950"
                                max="1280"
                                step="10"
                                value={dischargeTemp}
                                onChange={(e) => setDischargeTemp(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-furnace-500 focus:outline-none"
                            />
                        </div>

                        {/* Combustion Air Preheat */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentT.inputPreheat}</label>
                                <span className="text-base font-mono font-bold text-furnace-500">
                                    {airPreheatTemp} <span className="text-xs text-slate-500">°C</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="600"
                                step="10"
                                value={airPreheatTemp}
                                onChange={(e) => setAirPreheatTemp(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-furnace-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Output Analysis */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="glass-panel border-furnace-500/20 rounded-2xl p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3 flex items-center gap-2">
                                <RefreshCw className="text-furnace-500 animate-spin" style={{ animationDuration: '6s' }} size={18} />
                                {currentT.thermoSummary}
                            </h2>

                            {/* Dynamic Stacked Bar Visualization */}
                            <div className="mb-8">
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Heat Balance Distribution</span>
                                <div className="h-6 w-full rounded-md overflow-hidden flex font-mono text-[9px] font-bold text-white text-center">
                                    <div className="bg-green-600 flex items-center justify-center transition-all duration-300" style={{ width: `${pctSteel}%` }}>
                                        {pctSteel > 12 && `${pctSteel.toFixed(0)}%`}
                                    </div>
                                    <div className="bg-red-600 flex items-center justify-center transition-all duration-300" style={{ width: `${pctStack}%` }}>
                                        {pctStack > 12 && `${pctStack.toFixed(0)}%`}
                                    </div>
                                    <div className="bg-blue-600 flex items-center justify-center transition-all duration-300" style={{ width: `${pctCooling}%` }}>
                                        {pctCooling > 12 && `${pctCooling.toFixed(0)}%`}
                                    </div>
                                    <div className="bg-amber-600 flex items-center justify-center transition-all duration-300" style={{ width: `${pctWall}%` }}>
                                        {pctWall > 12 && `${pctWall.toFixed(0)}%`}
                                    </div>
                                    {pctUnaccounted > 0 && (
                                        <div className="bg-slate-700 flex items-center justify-center transition-all duration-300" style={{ width: `${pctUnaccounted}%` }}>
                                            {pctUnaccounted > 12 && `${pctUnaccounted.toFixed(0)}%`}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-slate-900 pb-2">
                                    <span className="text-slate-400">{currentT.heatInputTotal}</span>
                                    <span className="font-mono font-bold text-white">{totalMW.toFixed(1)} MW</span>
                                </div>

                                <div className="flex justify-between items-center text-sm border-b border-slate-900 pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-green-600 rounded-sm shrink-0" />
                                        <span className="text-slate-400">{currentT.steelAbsorption}</span>
                                    </div>
                                    <span className="font-mono font-bold text-green-500">{pctSteel.toFixed(1)}% ({steelMW.toFixed(1)} MW)</span>
                                </div>

                                <div className="flex justify-between items-center text-sm border-b border-slate-900 pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-red-600 rounded-sm shrink-0" />
                                        <span className="text-slate-400">{currentT.stackLoss}</span>
                                    </div>
                                    <span className="font-mono font-bold text-red-500">{pctStack.toFixed(1)}% ({stackMW.toFixed(1)} MW)</span>
                                </div>

                                <div className="flex justify-between items-center text-sm border-b border-slate-900 pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-blue-600 rounded-sm shrink-0" />
                                        <span className="text-slate-400">{currentT.coolingLoss}</span>
                                    </div>
                                    <span className="font-mono font-bold text-blue-400">{pctCooling.toFixed(1)}%</span>
                                </div>

                                <div className="flex justify-between items-center text-sm border-b border-slate-900 pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-amber-600 rounded-sm shrink-0" />
                                        <span className="text-slate-400">{currentT.wallLoss}</span>
                                    </div>
                                    <span className="font-mono font-bold text-amber-500">{pctWall.toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer and conversion link */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
                            <div className="flex gap-3 items-start">
                                <ShieldAlert className="text-furnace-500 shrink-0 mt-0.5" size={16} />
                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                    {currentT.modelDisclaimer}
                                </p>
                            </div>
                            <Link
                                to={auditLink}
                                className="w-full inline-flex items-center justify-center py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-bold text-xs uppercase tracking-wider border border-slate-700"
                            >
                                {currentT.requestAudit}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeatBalanceCalc;
