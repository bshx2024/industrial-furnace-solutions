import React, { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { MetaFunction } from 'react-router';
import { ShieldAlert, RefreshCw, Flame, FileSpreadsheet, Layers, HelpCircle, CheckCircle2, ArrowRight, BookOpen, Activity, Globe, Info } from 'lucide-react';

export const meta: MetaFunction = () => {
    const title = "Furnace Heat Balance Calculator: Free Tool | EcoReheating";
    const description = "Free furnace heat balance calculator for steel reheating furnaces. Calculate thermal efficiency, stack losses, skid cooling drag, and fuel savings in minutes.";
    const image = "https://www.ecoreheating.com/hero-bg.png";
    const pageUrl = "https://www.ecoreheating.com/calculators/reheating-furnace-heat-balance";

    return [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        { property: "og:site_name", content: "EcoReheating" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
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

    // 4. Water cooling losses (skid pipes in walking beam)
    // Typically 8-12% of heat input in standard walking beam, reducible with insulation
    const coolingWaterHeatLoss = totalHeatInput * 0.085; // kJ/ton
    const waterCoolingLoss = coolingWaterHeatLoss;

    // 5. Radiation and wall losses through refractory + openings
    // In legacy brick/castable ~10-15%, full fiber ~3-5%
    const wallRadiationLoss = totalHeatInput * 0.075; // kJ/ton

    // 6. Other unaccounted losses (scale formation enthalpy, air infiltration, door openings)
    const otherLosses = Math.max(0, totalHeatInput - (heatSteelAbsorbed + stackHeatLoss + coolingWaterHeatLoss + wallRadiationLoss));
    const unaccountedLoss = otherLosses;

    // Efficiency Calculations
    const thermalEfficiency = totalHeatInput > 0 ? (heatSteelAbsorbed / totalHeatInput) * 100 : 0;
    const stackLossPercent = totalHeatInput > 0 ? (stackHeatLoss / totalHeatInput) * 100 : 0;
    const coolingLossPercent = totalHeatInput > 0 ? (coolingWaterHeatLoss / totalHeatInput) * 100 : 0;
    const wallLossPercent = totalHeatInput > 0 ? (wallRadiationLoss / totalHeatInput) * 100 : 0;
    const otherLossPercent = totalHeatInput > 0 ? (otherLosses / totalHeatInput) * 100 : 0;

    // Percentages aliases
    const pctSteel = thermalEfficiency;
    const pctStack = stackLossPercent;
    const pctCooling = coolingLossPercent;
    const pctWall = wallLossPercent;
    const pctUnaccounted = otherLossPercent;

    // Total MW Power Equivalent
    const totalThermalPowerMW = (totalHeatInput * productionRate) / 3600000; // kJ/h to MW
    const usefulPowerMW = (heatSteelAbsorbed * productionRate) / 3600000;
    const totalMW = totalThermalPowerMW;
    const steelMW = usefulPowerMW;
    const stackMW = (stackHeatLoss * productionRate) / 3600000;

    // Potential fuel savings if air preheat is increased to 450°C and wall insulation upgraded
    const optimizedAirHeat = combustionAirVolume * 1.3 * (450 - 20);
    const potentialSavingPercent = Math.min(22, Math.max(5, ((optimizedAirHeat - airHeatInput) / totalHeatInput) * 100 + 4.5));
    const annualFuelSavedM3 = (productionRate * fuelConsumption * (potentialSavingPercent / 100) * 7500); // 7500 operating hours/yr

    // Translations
    const t = {
        en: {
            title: "Furnace Heat Balance Calculator",
            subtitle: "Model thermodynamic energy distribution across your reheat furnace. Balance steel heat absorption against stack, cooling, and radiation losses.",
            inputProd: "Production Throughput",
            inputFuel: "Specific Gas Consumption",
            inputDischarge: "Billet Discharge Temp",
            inputPreheat: "Combustion Air Preheat",
            thermoSummary: "Thermodynamic Heat Balance Breakdown",
            heatInputTotal: "Total Heat Input Rate",
            steelAbsorption: "Useful Steel Heat Absorption (Efficiency)",
            stackLoss: "Flue Gas Stack Loss",
            coolingLoss: "Cooling Water Loss (Skid Pipes)",
            wallLoss: "Wall & Opening Radiation Loss",
            otherLoss: "Other Unaccounted Losses",
            modelDisclaimer: "Note: Simplified thermodynamic model calibrated for standard pipeline natural gas (LHV 35.8 MJ/Nm³). Detailed on-site thermal balance requires flue gas O₂ / CO chromatography and surface thermography.",
            requestAudit: "Request Complete On-Site Thermal Audit & ROI Report →",
            back: "← Back to Calculators",
            guideLinkText: "Explore Walking Beam Furnace Modernization Solutions →",
        },
        zh: {
            title: "加热炉热平衡在线计算器",
            subtitle: "模拟轧钢加热炉内部热力学能量流向。精确评估钢坯有效吸热与排烟、水冷及炉体散热损失。",
            inputProd: "轧钢生产线产能",
            inputFuel: "单位天然气单耗",
            inputDischarge: "钢坯出炉目标温度",
            inputPreheat: "助燃空气预热温度",
            thermoSummary: "热平衡能量收支分析",
            heatInputTotal: "炉体总供入热量",
            steelAbsorption: "钢坯有效吸热 (热效率)",
            stackLoss: "烟气排烟热损失",
            coolingLoss: "水冷构件带走热量 (步进梁/滑道)",
            wallLoss: "炉墙与孔道辐射散热损失",
            otherLoss: "化学不完全燃烧与其他损失",
            modelDisclaimer: "注：本模型基于标准天然气低位发热量计算。工厂实际热平衡需结合现场烟气氧含量色谱分析与外壁红外成像实测。",
            requestAudit: "申请专业级现场热平衡测试与节能诊断报告 →",
            back: "← 返回计算工具集",
            guideLinkText: "查看步进式加热炉全纤维与智能燃烧改造方案 →",
        },
        vi: {
            title: "Công Cụ Tính Cân Bằng Nhiệt Lò Nung Phôi Thép",
            subtitle: "Mô phỏng phân phối nhiệt lượng trong lò nung cán thép. Định lượng nhiệt hữu ích nung thép so với tổn thất khói thải, nước làm mát và bức xạ.",
            inputProd: "Sản Lượng Cán Thép",
            inputFuel: "Tiêu Hao Khí Đốt / Tấn Phôi",
            inputDischarge: "Nhiệt Độ Ra Lò Phôi Thép",
            inputPreheat: "Nhiệt Độ Gió Sấy Đốt Lò",
            thermoSummary: "Phân Tích Cân Bằng Nhiệt Động Học",
            heatInputTotal: "Tổng Nhiệt Lượng Cấp Vào",
            steelAbsorption: "Nhiệt Hữu Ích Nung Thép (Hiệu Suất)",
            stackLoss: "Tổn Thất Nhiệt Khói Thải (Ống Khói)",
            coolingLoss: "Tổn Thất Nước Làm Mát Cột Dầm",
            wallLoss: "Tổn Thất Bức X xạ Vỏ Lò & Cửa Mở",
            otherLoss: "Tổn Thất Chưa Tính Khác",
            modelDisclaimer: "Lưu ý: Mô hình nhiệt động lực học chuẩn hóa cho khí tự nhiên / LPG. Khảo sát thực tế yêu cầu đo sắc ký khí O₂ và chụp ảnh nhiệt hồng ngoại.",
            requestAudit: "Đăng Ký Khảo Sát Tổn Thất Nhiệt & Báo Cáo ROI Cho Nhà Máy →",
            back: "← Quay lại danh sách công cụ",
            guideLinkText: "Xem Giải Pháp Cải Tạo Lò Nung Dầm Bước →",
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
            requestAudit: "Dapatkan Audit Kehilangan Panas & Studi Kelayakan ROI Pabrik →",
            back: "← Kembali ke Kalkulator",
            guideLinkText: "Jelajahi Solusi Retrofit Tungku Walking Beam →",
        }
    };

    const currentT = t[lang as keyof typeof t] || t.en;

    const auditLink = lang === 'en' ? '/about#assessment' : `/${lang}/about#assessment`;
    const guideLink = lang === 'en' ? '/furnaces/walking-beam-reheating-furnace' : `/${lang}/furnaces/walking-beam-reheating-furnace`;

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Furnace Heat Balance Calculator Free",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Free online furnace heat balance calculator for steel reheating furnaces. Calculate thermal efficiency, stack loss, and fuel savings."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the furnace heat balance calculation formula?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The furnace heat balance calculation formula follows the First Law of Thermodynamics: Q_total = Q_fuel + Q_air = Q_steel + Q_stack + Q_cooling + Q_wall + Q_openings. Thermal efficiency (η) is calculated as: η = (Q_steel / Q_total) × 100%, where useful heat Q_steel = Steel Throughput (kg/h) × Specific Heat (0.68 kJ/kg·°C) × Temperature Rise."
                }
            },
            {
                "@type": "Question",
                "name": "What is a furnace heat balance calculator and why is it used?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A furnace heat balance calculator is an industrial thermodynamic tool that quantifies the energy distribution within a steel reheating furnace based on the First Law of Thermodynamics. It accounts for all heat inputs (fuel combustion chemical energy and preheated combustion air sensible heat) and balances them against useful heat absorbed by steel billets, flue gas stack losses, skid pipe water cooling losses, and shell radiation."
                }
            },
            {
                "@type": "Question",
                "name": "How does an online furnace heat balance calculator compare to an Excel spreadsheet?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While a furnace heat balance calculator Excel spreadsheet is useful for static record-keeping, an online engineering calculator provides real-time iterative modeling. Plant managers can dynamically drag throughput, combustion air preheat, and gas consumption parameters to instantly visualize how recuperator upgrades or ceramic fiber roofs impact MW thermal capacity and fuel costs."
                }
            },
            {
                "@type": "Question",
                "name": "Can this furnace heat balance calculator be applied to rolling mills in Vietnam or California?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. For rolling mills in Vietnam (evaluating FO oil, LPG, and LNG under EVN peak electricity rate hikes in Ba Ria-Vung Tau or Hai Phong) and industrial facilities in California (complying with SCAQMD Rule 1147 NOx limits and Title 24 industrial thermal efficiency mandates), this calculator provides the thermodynamic baseline required to size waste heat recuperators and verify fuel savings."
                }
            },
            {
                "@type": "Question",
                "name": "Why are stack losses typically the largest heat loss in a reheating furnace?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flue gas stack losses represent 25% to 45% of total heat input in unoptimized furnaces because combustion exhaust gases exit at high temperatures (often 750°C to 950°C before recuperation). Installing high-efficiency double-pass metallic or ceramic recuperators preheats combustion air up to 450°C–550°C, capturing waste sensible heat and directly reducing natural gas consumption by 10% to 18%."
                }
            },
            {
                "@type": "Question",
                "name": "What is the typical heat loss through water-cooled skid pipes in walking beam furnaces?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In walking beam reheating furnaces, water-cooled fixed and moving skid pipes extract 6% to 12% of total thermal energy. Applying interlocking ceramic fiber skid insulation covers and optimizing pipe hydraulic diameters reduces cooling water extraction by 40% to 60%, recovering valuable sensible heat for billet plastic deformation."
                }
            }
        ]
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
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
                                onChange={(e) => setProductionRate(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-furnace-500"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                <span>30 t/h (Small Mill)</span>
                                <span>150 t/h (Medium)</span>
                                <span>300 t/h (Mega Plant)</span>
                            </div>
                        </div>

                        {/* Specific Fuel Consumption */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentT.inputFuel}</label>
                                <span className="text-base font-mono font-bold text-furnace-500">
                                    {fuelConsumption} <span className="text-xs text-slate-500">Nm³/t</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="30"
                                max="85"
                                step="1"
                                value={fuelConsumption}
                                onChange={(e) => setFuelConsumption(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-furnace-500"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                <span>30 Nm³/t (T80 Target)</span>
                                <span>55 Nm³/t (Avg Industry)</span>
                                <span>85 Nm³/t (Unoptimized)</span>
                            </div>
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
                                min="1000"
                                max="1280"
                                step="10"
                                value={dischargeTemp}
                                onChange={(e) => setDischargeTemp(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-furnace-500"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                <span>1000°C</span>
                                <span>1150°C (Standard Rebar)</span>
                                <span>1280°C (Special Alloy)</span>
                            </div>
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
                                onChange={(e) => setAirPreheatTemp(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-furnace-500"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                <span>20°C (Cold Air)</span>
                                <span>150°C (Basic Recuperator)</span>
                                <span>600°C (Regenerative / Double Pass)</span>
                            </div>
                        </div>

                        {/* Quick Reset */}
                        <div className="pt-2">
                            <button
                                onClick={() => {
                                    setProductionRate(150);
                                    setFuelConsumption(55);
                                    setDischargeTemp(1150);
                                    setAirPreheatTemp(150);
                                }}
                                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                            >
                                <RefreshCw size={13} />
                                Reset to Default Benchmark
                            </button>
                        </div>
                    </div>

                    {/* Output Visualization */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
                                {currentT.thermoSummary}
                            </h2>

                            {/* Stacked Percentage Bar */}
                            <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                    <span>Thermal Energy Distribution</span>
                                    <span className="font-mono">{pctSteel.toFixed(0)}% Useful Heat</span>
                                </div>
                                <div className="h-6 w-full bg-slate-900 rounded-md overflow-hidden flex font-mono text-[10px] text-white font-bold">
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
                                className="w-full inline-flex items-center justify-center py-3 px-4 bg-furnace-500 hover:bg-furnace-600 text-white rounded-lg transition-colors font-bold text-xs uppercase tracking-wider shadow-lg shadow-furnace-500/20"
                            >
                                {currentT.requestAudit}
                            </Link>
                            <div className="pt-2 text-center">
                                <Link
                                    to={guideLink}
                                    className="text-xs text-furnace-400 hover:text-furnace-300 font-medium underline underline-offset-4"
                                >
                                    {(currentT as any).guideLinkText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Intent Disambiguation Callout */}
                <div className="mt-8 p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-start gap-3 text-xs text-slate-400">
                    <Info className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <p className="leading-relaxed">
                        <strong className="text-slate-300">Industrial Metallurgy Scope:</strong> This engineering tool is a specialized <strong className="text-white">furnace heat balance calculator free</strong> for heavy industrial reheating furnaces (steel billets, walking beam, and pusher rolling mills rated in megawatts and metric tons per hour). It is not intended for residential HVAC load sizing (such as room square feet, heating sizing for a house, garage, or shop, contractor lookup by zip code, or Minecraft gaming furnace mechanics).
                    </p>
                </div>

                {/* Comprehensive Engineering Guide & Documentation */}
                <section className="mt-20 pt-12 border-t border-slate-800/80 space-y-12">
                    {/* Section Header */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                            <BookOpen size={14} />
                            Engineering Reference Guide
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                            Furnace Heat Balance Calculator: Principles, Formulas & Loss Benchmarks
                        </h2>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                            In continuous steel hot rolling operations, conducting a comprehensive thermal heat balance is the fundamental prerequisite for identifying energy waste, sizing heat recovery equipment, and lowering natural gas consumption. This free online <strong>furnace heat balance calculator</strong> models the thermodynamic distribution of energy across your walking beam or pusher-type reheating furnace based on the First Law of Thermodynamics.
                        </p>
                    </div>

                    {/* Thermodynamic Governing Equations */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Flame className="text-orange-500 shrink-0" size={22} />
                            <h3 className="text-xl font-bold text-white">
                                1. Furnace Heat Balance Calculation Formula & Thermodynamic Governing Equations
                            </h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            The standard <strong className="text-white">furnace heat balance calculation formula</strong> is formulated under steady-state continuous rolling conditions. Conservation of energy dictates that the total heat introduced into the reheating furnace chamber must equal the total useful heat absorbed by the steel billets plus all cumulative thermal losses:
                        </p>

                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-orange-400 overflow-x-auto">
                            Q_total = Q_fuel + Q_preheated_air = Q_useful_steel + Q_flue_stack + Q_cooling_water + Q_radiation_wall + Q_openings
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 pt-2">
                            <div className="space-y-3 bg-slate-950/40 p-4 rounded-lg border border-slate-800/50">
                                <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                                    Thermal Heat Inputs (Q_in)
                                </h4>
                                <ul className="space-y-2 text-xs text-slate-400">
                                    <li><strong className="text-slate-200">Chemical Heat of Fuel (Q_fuel):</strong> Volume of fuel gas (Nm³/t) multiplied by its Lower Heating Value (LHV, e.g., 35,800 kJ/Nm³ for pipeline natural gas).</li>
                                    <li><strong className="text-slate-200">Sensible Heat of Combustion Air (Q_air):</strong> Preheated air enthalpy delivered from the recuperator: V_air × C_p,air × (T_preheat - T_ambient).</li>
                                    <li><strong className="text-slate-200">Hot Charging Enthalpy (Q_charge):</strong> Sensible heat retained in billets directly charged from the continuous casting machine (typically 500°C–700°C).</li>
                                </ul>
                            </div>

                            <div className="space-y-3 bg-slate-950/40 p-4 rounded-lg border border-slate-800/50">
                                <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                    Thermal Heat Discharges (Q_out)
                                </h4>
                                <ul className="space-y-2 text-xs text-slate-400">
                                    <li><strong className="text-slate-200">Useful Heat Absorbed by Steel (Q_steel):</strong> M_steel × C_p,steel × (T_discharge - T_charge), where steel specific heat averages 0.68 kJ/kg·°C.</li>
                                    <li><strong className="text-slate-200">Flue Gas Stack Loss (Q_stack):</strong> Sensible heat carried away by high-temperature exhaust gases: V_flue × C_p,flue × (T_stack - T_ambient).</li>
                                    <li><strong className="text-slate-200">Skid Pipe Cooling Loss (Q_cooling):</strong> Sensible heat extracted by treated cooling water flowing through walking beam skid supports.</li>
                                    <li><strong className="text-slate-200">Wall Radiation & Openings (Q_wall):</strong> Conduction and radiation through refractory walls, roof casing, charging doors, and peep holes.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Online Calculator vs Excel */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="text-orange-500 shrink-0" size={22} />
                            <h3 className="text-xl font-bold text-white">
                                2. Furnace Heat Balance Calculator in Excel vs. Interactive Online Model
                            </h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Plant thermal engineers and mill metallurgists frequently search for a <strong>furnace heat balance calculator Excel</strong> spreadsheet template to analyze energy consumption. While an offline Excel sheet offers static formula tracking, this dynamic web-based <strong>furnace heat balance calculator</strong> offers decisive operational advantages for real-time steel mill optimization:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-slate-200 font-bold text-sm flex items-center gap-2">
                                    <span className="text-amber-500 font-mono">⚠️</span>
                                    Traditional Excel Spreadsheet Models
                                </h4>
                                <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                                    <li>Static calculation: Requires manual cell re-entry for every production variance.</li>
                                    <li>No dynamic coupling between air preheat temperature and stack exhaust enthalpy.</li>
                                    <li>Difficult to model transient mill delays, idle holding modes, or air-fuel ratio drift.</li>
                                    <li>Prone to broken macro links and inconsistent gas caloric value baselines across teams.</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-slate-200 font-bold text-sm flex items-center gap-2">
                                    <span className="text-green-400 font-mono">✓</span>
                                    EcoReheating Online Heat Balance Calculator
                                </h4>
                                <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                                    <li>Instant visual sensitivity analysis: Drag sliders to see real-time MW thermal load shifts.</li>
                                    <li>Coupled recuperator thermodynamics: Higher air preheat automatically lowers exit stack temperature.</li>
                                    <li>Calibrated against CISA T80 extreme efficiency benchmarks across 300+ operating reheat lines.</li>
                                    <li>Direct integration with Zero CAPEX retrofit ROI projections and CBAM carbon intensity estimates.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Benchmark Table */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Layers className="text-orange-500 shrink-0" size={22} />
                            <h3 className="text-xl font-bold text-white">
                                3. Thermal Loss Benchmarking: Pusher Furnaces vs. Walking Beam Furnaces
                            </h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Understanding where your energy is being lost compared to industry best practices is the first step toward reducing specific fuel consumption (SFC). Below is an engineering benchmark comparing legacy furnaces against modern T80-optimized installations:
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 bg-slate-950/80 text-orange-400 font-bold uppercase tracking-wider">
                                        <th className="p-3">Heat Balance Component</th>
                                        <th className="p-3">Legacy Pusher Furnace</th>
                                        <th className="p-3">Standard Walking Beam</th>
                                        <th className="p-3">CISA T80 Optimized Benchmark</th>
                                        <th className="p-3">Primary Countermeasure</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                    <tr className="hover:bg-slate-800/30">
                                        <td className="p-3 font-semibold text-white">Useful Steel Absorption (η)</td>
                                        <td className="p-3 text-red-400 font-mono">35% – 48%</td>
                                        <td className="p-3 text-amber-400 font-mono">52% – 62%</td>
                                        <td className="p-3 text-green-400 font-bold font-mono">68% – 76%</td>
                                        <td className="p-3">Stoichiometric AI air-fuel tuning & high-E coating</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30">
                                        <td className="p-3 font-semibold text-white">Flue Gas Stack Loss</td>
                                        <td className="p-3 text-red-400 font-mono">35% – 45%</td>
                                        <td className="p-3 text-amber-400 font-mono">25% – 32%</td>
                                        <td className="p-3 text-green-400 font-bold font-mono">15% – 20%</td>
                                        <td className="p-3">Double-pass metallic recuperator (air preheat &gt; 450°C)</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30">
                                        <td className="p-3 font-semibold text-white">Cooling Water Loss</td>
                                        <td className="p-3 font-mono">8% – 14% (Wet skids)</td>
                                        <td className="p-3 font-mono">6% – 10% (Insulated skids)</td>
                                        <td className="p-3 text-green-400 font-bold font-mono">4% – 6%</td>
                                        <td className="p-3">Fiber-reinforced modular skid pipe insulation covers</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30">
                                        <td className="p-3 font-semibold text-white">Wall & Roof Radiation Loss</td>
                                        <td className="p-3 text-red-400 font-mono">10% – 16% (Castable/Brick)</td>
                                        <td className="p-3 text-amber-400 font-mono">7% – 10%</td>
                                        <td className="p-3 text-green-400 font-bold font-mono">3% – 5%</td>
                                        <td className="p-3">Pre-assembled ceramic full-fiber roof modules</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30">
                                        <td className="p-3 font-semibold text-white">Billet Scale Oxidation Loss</td>
                                        <td className="p-3 text-red-400 font-mono">1.2% – 1.8% of yield</td>
                                        <td className="p-3 font-mono">0.8% – 1.2%</td>
                                        <td className="p-3 text-green-400 font-bold font-mono">0.3% – 0.5%</td>
                                        <td className="p-3">AI furnace atmosphere management (O₂ &lt; 1.5%)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Regional Applications: Vietnam & California */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Globe className="text-orange-500 shrink-0" size={22} />
                            <h3 className="text-xl font-bold text-white">
                                4. Regional Applications: Vietnam Steel Mills vs. California Industrial Standards
                            </h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Furnace heat balance baselines must reflect regional fuel economics and environmental compliance mandates. Our thermal engineering audits routinely apply this model across two prominent high-demand regions:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Southeast Asia</span>
                                    <span className="text-xs text-slate-500">·</span>
                                    <span className="text-xs text-slate-400 font-medium">Billet Reheating</span>
                                </div>
                                <h4 className="text-white font-bold text-sm">Furnace Heat Balance Calculator Vietnam</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Steel rolling mills across Vietnam (including key industrial clusters in Ba Ria-Vung Tau, Dong Nai, and Hai Phong) navigate severe EVN peak electricity rate surcharges and variable Fuel Oil (FO), LPG, and imported LNG prices. Conducting a rigorous reheat furnace heat balance enables Vietnamese mill operators to benchmark specific fuel consumption against CISA T80 standards, size waste heat recuperators, and capture 7% to 15% fuel reductions under zero CAPEX performance contracts.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">North America</span>
                                    <span className="text-xs text-slate-500">·</span>
                                    <span className="text-xs text-slate-400 font-medium">Emissions & Efficiency</span>
                                </div>
                                <h4 className="text-white font-bold text-sm">Furnace Heat Balance Calculator California</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    In California, industrial heat processing facilities and metal forges operate under the nation’s strictest environmental mandates, including SCAQMD Rule 1147 (NOx emission limits for industrial furnaces) and California Title 24 industrial efficiency codes. Modeling furnace thermal balance and recuperator air preheat allows California plant engineers to minimize natural gas firing rates, reduce peak flue gas volumes, and comply with strict ultra-low-NOx mandates without sacrificing furnace throughput.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4 Retrofit Strategies */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Activity className="text-orange-500 shrink-0" size={22} />
                            <h3 className="text-xl font-bold text-white">
                                5. Four Proven Retrofits to Rebalance Furnace Heat and Cut Fuel Costs by 7–15%
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Strategy 01</span>
                                <h4 className="text-white font-bold text-sm">Pre-Assembled Ceramic Full-Fiber Roof Modernization</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Replacing dense refractory castables with modular ceramic fiber modules cuts roof heat storage capacity by 60%. Cold startup heat-up time drops from 16 hours to under 4 hours, and wall skin temperature decreases from 120°C to below 75°C, recovering 3% to 6% of total fuel input.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Strategy 02</span>
                                <h4 className="text-white font-bold text-sm">High-Efficiency Recuperator Exhaust Energy Recovery</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Stack loss is the largest heat sink in any reheating furnace. Sizing a double-pass metallic recuperator or air-gas crossflow heat exchanger preheats combustion air to 450°C–550°C. For every 100°C rise in combustion air temperature, net natural gas consumption falls by approximately 4.5%.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Strategy 03</span>
                                <h4 className="text-white font-bold text-sm">AI Stoichiometric Closed-Loop Air-Fuel Tuning</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Standard pneumatic ratio regulators allow air-fuel ratios to drift to 1.3 or higher during production pacing slowdowns. AI combustion automation tracks continuous flue gas oxygen meters and trims air blowers within 3 seconds, keeping oxygen below 1.5% and eliminating sensible heat flue waste.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Strategy 04</span>
                                <h4 className="text-white font-bold text-sm">High-Emissivity (High-E) Refractory Coatings</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Spraying a transition-metal-oxide coating (emissivity ε ≥ 0.92 at 1,300°C) onto furnace refractory linings increases radiant heat flux back to the steel stock by 10% to 15%. This accelerates heating rates, narrows core-to-surface temperature gradients, and delivers a typical payback within 6 months.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="text-orange-500 shrink-0" size={22} />
                            <h3 className="text-xl font-bold text-white">
                                6. Frequently Asked Questions (Furnace Heat Balance FAQ)
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="text-orange-500 font-mono">Q.</span>
                                    What is the furnace heat balance calculation formula?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                                    The furnace heat balance calculation formula follows the First Law of Thermodynamics: Q_total = Q_fuel + Q_air = Q_steel + Q_stack + Q_cooling + Q_wall + Q_openings. Thermal efficiency (η) is calculated as: η = (Q_steel / Q_total) × 100%, where useful heat Q_steel equals steel throughput (kg/h) × steel specific heat (0.68 kJ/kg·°C) × temperature rise from charging to rolling discharge.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="text-orange-500 font-mono">Q.</span>
                                    Can this furnace heat balance calculator be applied to rolling mills in Vietnam or California?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                                    Yes. For rolling mills in Vietnam (evaluating FO oil, LPG, and LNG under EVN peak electricity rate hikes in Ba Ria-Vung Tau or Hai Phong) and industrial facilities in California (complying with SCAQMD Rule 1147 NOx limits and Title 24 industrial thermal efficiency mandates), this calculator provides the thermodynamic baseline required to size waste heat recuperators and verify fuel savings.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="text-orange-500 font-mono">Q.</span>
                                    What is a furnace heat balance calculator and why is it essential for steel mills?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                                    A furnace heat balance calculator is an industrial thermodynamic tool that quantifies the energy distribution within a steel reheating furnace based on the First Law of Thermodynamics. It calculates how much of the chemical fuel energy is successfully transferred to the steel billets versus how much is wasted through the stack, cooling water, and wall radiation, enabling engineers to prioritize revamping investments.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="text-orange-500 font-mono">Q.</span>
                                    How is reheating furnace thermal efficiency calculated?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                                    Thermal efficiency (η) is calculated as: η = (Useful Heat in Steel / Total Heat Input) × 100%. Useful heat equals billet throughput (kg/h) × steel specific heat (0.68 kJ/kg·°C) × temperature delta (Discharge Temp - Ambient). In high-performance CISA T80 reheating furnaces, thermal efficiency exceeds 68%, compared to only 35%–45% in uninsulated legacy pusher furnaces.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="text-orange-500 font-mono">Q.</span>
                                    Why is stack loss the single largest heat loss in a reheat furnace?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                                    Because flue gases leave the heating chamber at temperatures between 750°C and 950°C, sensible heat carried away in combustion products (CO₂, H₂O, N₂, and excess O₂) can easily consume 25% to 45% of total input energy. Upgrading to a modern double-pass recuperator that preheats combustion air to 450°C+ directly captures this waste heat and returns it into the combustion zones.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="text-orange-500 font-mono">Q.</span>
                                    How do water-cooled skids impact walking beam furnace heat balance?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                                    In walking beam furnaces, water-cooled fixed and moving skid pipes extract 6% to 12% of total heat input. Furthermore, cold skid pipes cause "skid mark" temperature drops in billets, requiring furnace operators to overheat the entire chamber to ensure plastic rolling compliance. Applying interlocking ceramic fiber skid insulation shields and optimizing pipe diameters reduces skid cooling water heat extraction by 40% to 60%.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="text-orange-500 font-mono">Q.</span>
                                    Can EcoReheating implement heat balance retrofits with Zero CAPEX?
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                                    Yes. Under our turnkey Energy Steward Model (powered by South Technology), we fund 100% of the engineering, hardware, and installation costs for ceramic fiber roofs, AI combustion controls, and recuperators. The steel mill invests $0 upfront, and compensation is paid strictly from a negotiated percentage of measured, IPMVP-verified fuel cost savings over a 24 to 36 month term.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="bg-gradient-to-r from-orange-500/10 via-slate-900 to-orange-500/10 border border-orange-500/30 rounded-2xl p-8 text-center space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                            Ready to Balance Your Furnace and Cut Fuel Bills by 7–15%?
                        </h3>
                        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
                            Stop guessing your thermal losses. Request an on-site thermal audit by South Technology’s senior thermal engineers. We will analyze your fuel intensity, profile flue gas oxygen, and deliver a guaranteed T80 heat balance improvement plan at zero upfront cost.
                        </p>
                        <div className="pt-2">
                            <Link
                                to={auditLink}
                                className="inline-flex items-center gap-2 py-3 px-8 bg-furnace-500 hover:bg-furnace-600 text-white rounded-lg transition-colors font-bold text-sm uppercase tracking-wider shadow-lg shadow-furnace-500/20"
                            >
                                Schedule On-Site Thermal Audit →
                            </Link>
                        </div>
                        <p className="text-[11px] text-slate-500">
                            Zero financial commitment · Backed by CISA T80 industrial standards across 300+ production lines
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HeatBalanceCalc;
