import { ViteReactSSG } from "vite-react-ssg";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useMemo } from "react";
import { Flame, X, Menu, Linkedin, Twitter, Globe, Mail, ShieldCheck, ArrowRight, Calculator, Zap, Gauge, Activity, Target, TrendingUp, Shield, BookOpen, Settings, ChevronLeft, ChevronRight, ArrowRightCircle, Layers, Construction, TrendingDown, Percent, BarChart3, Clock, CheckCircle2, Search, PenTool, Wrench, BarChart4, Award, CheckCircle, Send, AlertTriangle, Lightbulb, FileText, Info, Database, Users } from "lucide-react";
import { useLocation, Link, Outlet } from "react-router-dom";
import emailjs from "@emailjs/browser";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/hero-cases" },
    { name: "About", href: "/about" }
  ];
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `fixed w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== "/" ? "bg-industrial-900 shadow-lg py-3" : "bg-transparent py-5"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-furnace-600 p-2 rounded text-white group-hover:bg-furnace-500 transition-colors", children: /* @__PURE__ */ jsx(Flame, { size: 24, fill: "currentColor" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-heading font-bold text-xl uppercase tracking-wider leading-none text-white", children: [
                "Eco",
                /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "Reheating" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: `text-[10px] tracking-widest uppercase ${isScrolled ? "text-gray-400" : "text-gray-300"}`, children: "Industrial Solutions" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
            navLinks.map((link) => /* @__PURE__ */ jsx(
              Link,
              {
                to: link.href,
                className: `text-sm font-semibold transition-colors uppercase tracking-wide ${location.pathname === link.href ? "text-furnace-500" : "text-gray-300 hover:text-furnace-500"}`,
                children: link.name
              },
              link.name
            )),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/#assessment",
                className: "bg-furnace-600 hover:bg-furnace-500 text-white px-6 py-2 rounded font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-furnace-600/30",
                children: "Free Assessment"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "md:hidden text-white",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 28 }) : /* @__PURE__ */ jsx(Menu, { size: 28 })
            }
          )
        ] }),
        isMobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-industrial-900 border-t border-gray-800 absolute w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4 space-y-4", children: [
          navLinks.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.href,
              onClick: () => setIsMobileMenuOpen(false),
              className: `font-semibold uppercase tracking-wide ${location.pathname === link.href ? "text-furnace-500" : "text-gray-300 hover:text-furnace-500"}`,
              children: link.name
            },
            link.name
          )),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/#assessment",
              onClick: () => setIsMobileMenuOpen(false),
              className: "bg-furnace-600 text-center text-white px-6 py-3 rounded font-bold uppercase tracking-wide",
              children: "Free Assessment"
            }
          )
        ] }) })
      ]
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-industrial-950 text-gray-400 py-16 border-t border-industrial-800", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-4 gap-12 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-1", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-6 text-white group", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-furnace-600 p-2 rounded group-hover:bg-furnace-500 transition-colors", children: /* @__PURE__ */ jsx(Flame, { size: 20, fill: "currentColor" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-heading font-bold text-xl uppercase tracking-wider", children: "EcoReheating" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mb-6 leading-relaxed", children: "Leading the transition to extreme energy efficiency in the steel industry through T80-listed thermal engineering and AI optimization." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "w-10 h-10 rounded-full bg-industrial-900 flex items-center justify-center hover:bg-furnace-600 hover:text-white transition-all border border-industrial-800", children: /* @__PURE__ */ jsx(Linkedin, { size: 18 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "w-10 h-10 rounded-full bg-industrial-900 flex items-center justify-center hover:bg-furnace-600 hover:text-white transition-all border border-industrial-800", children: /* @__PURE__ */ jsx(Twitter, { size: 18 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "w-10 h-10 rounded-full bg-industrial-900 flex items-center justify-center hover:bg-furnace-600 hover:text-white transition-all border border-industrial-800", children: /* @__PURE__ */ jsx(Globe, { size: 18 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-bold uppercase tracking-widest text-xs mb-6", children: "Navigation" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-furnace-500 transition-colors", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/solutions", className: "hover:text-furnace-500 transition-colors", children: "Energy Solutions" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/hero-cases", className: "hover:text-furnace-500 transition-colors", children: "Case Studies" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-furnace-500 transition-colors", children: "About & Contact" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-bold uppercase tracking-widest text-xs mb-6", children: "Technologies" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/#tech-roof", className: "hover:text-furnace-500 transition-colors", children: "Full-fiber Furnace Roof" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/#tech-ai", className: "hover:text-furnace-500 transition-colors", children: "Intelligent Reheating" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/#tech-coating", className: "hover:text-furnace-500 transition-colors", children: "High-Emissivity Coatings" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/#energy-steward", className: "hover:text-furnace-500 transition-colors", children: "Energy Steward Model" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-bold uppercase tracking-widest text-xs mb-6", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { size: 16, className: "text-furnace-500" }),
            /* @__PURE__ */ jsx("span", { children: "contact@ecoreheating.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "leading-relaxed", children: [
            "Global HQ: Shanghai,",
            /* @__PURE__ */ jsx("br", {}),
            "China"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-industrial-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest", children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-4 md:mb-0", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ECOREHEATING. Strategic partner: DONGMING GREEN ENERGY."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Privacy" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Terms" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "T80 Compliance" })
      ] })
    ] })
  ] }) });
};
const ScrollToHashElement = () => {
  const { hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);
  return null;
};
const App = () => {
  return /* @__PURE__ */ jsxs("div", { className: "font-sans antialiased text-gray-900 bg-white selection:bg-furnace-500 selection:text-white flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(ScrollToHashElement, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const logos = [
  "DANIELI",
  "JIANLONG STEEL",
  "JINNAN STEEL",
  "LIUZHOU STEEL",
  "FANGDA GROUP",
  "JINGYE GROUP",
  "TIANGONG INTER.",
  "NANSHAN GROUP",
  "SHAANXI STEEL",
  "KSRM",
  "AKS STEEL"
];
const LogoMarquee = () => {
  const LOGO_HEIGHT = 18;
  const GAP_WIDTH = 100;
  const duplicatedLogos = useMemo(() => [...logos, ...logos], []);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[50px] overflow-hidden flex items-center marquee-container", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-20 pointer-events-none" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "marquee-track flex items-center",
        style: { gap: `${GAP_WIDTH}px` },
        children: duplicatedLogos.map((logo, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex-shrink-0 flex items-center justify-center translate-z-0",
            children: /* @__PURE__ */ jsx(
              "span",
              {
                className: "logo-text text-white/30 font-black whitespace-nowrap tracking-tighter hover:text-white/80 transition-all duration-500 cursor-default",
                style: {
                  fontSize: `${LOGO_HEIGHT}px`,
                  fontFamily: '"Oswald", "Inter", sans-serif',
                  letterSpacing: "-0.02em"
                },
                children: logo
              }
            )
          },
          index
        ))
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        .marquee-container {
          /* Softer mask for a more premium fade */
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }

        .marquee-track {
          width: max-content;
          animation: marquee-scroll 50s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-50% - ${GAP_WIDTH / 2}px), 0, 0);
          }
        }
      ` })
  ] });
};
const Hero = () => {
  const [production, setProduction] = useState(2.5);
  const fuelSavingRate = 0.11;
  const co2SavingPerTon = 0.052;
  const fuelCostPerTon = 14;
  const estimatedSavings = (production * 1e6 * fuelCostPerTon * fuelSavingRate).toLocaleString("en-US", {
    maximumFractionDigits: 0
  });
  const co2Savings = (production * 1e6 * co2SavingPerTon).toLocaleString("en-US", {
    maximumFractionDigits: 0
  });
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex flex-col justify-between overflow-hidden bg-industrial-950 pt-32 lg:pt-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "video",
        {
          autoPlay: true,
          loop: true,
          muted: true,
          playsInline: true,
          poster: "/hero-bg.png",
          className: "absolute inset-0 w-full h-full object-cover engine-bg-animate opacity-60",
          children: /* @__PURE__ */ jsx("source", { src: "/hero-bg_x264.mp4", type: "video/mp4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 engine-shimmer-animate bg-gradient-to-t from-furnace-950 via-transparent to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-industrial-950 via-industrial-950/60 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-industrial-950/40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 carbon-overlay" }),
      /* @__PURE__ */ jsx("div", { className: "engine-scan-animate" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 relative z-10 flex-grow flex flex-col justify-center py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 items-center w-full mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-grow max-w-4xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-furnace-600/10 border border-furnace-500/30 text-furnace-400 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-xl", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-furnace-500 animate-ping" }),
            "System Intelligence v4.2"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[1.0] mb-6 tracking-tight", children: [
            "Stop Reheating Furnace ",
            /* @__PURE__ */ jsx("br", {}),
            "Fuel Waste. ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500 text-6xl md:text-8xl", children: "Zero CAPEX Upgrades." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl md:text-2xl text-white font-medium mb-4 max-w-4xl leading-snug", children: [
            "We invest, you save. Achieve a ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500 font-bold", children: "typical 7–15% fuel consumption reduction" }),
            " in your reheating furnaces with our T80-validated extreme efficiency tech—paid entirely from verified energy savings."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm md:text-base text-gray-300 mb-8 font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "✅" }),
            " Optimized for Walking Beam & Walking Hearth Furnaces in Long/Flat Steel Mills."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12 max-w-4xl", children: [
            "Performance-based 'Energy Steward' model – No CAPEX, paid by verified savings.",
            "Enhance yield and surface quality through T80-listed low-oxidation technologies.",
            "Designed and validated in integrated steel mills.",
            "Listed in CISA T80 extreme efficiency technologies."
          ].map((bullet, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-gray-300", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { size: 20, className: "text-furnace-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm md:text-base font-medium", children: bullet })
          ] }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center gap-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/about",
                className: "group relative overflow-hidden bg-furnace-600 text-white text-lg px-8 py-6 rounded-sm font-bold uppercase tracking-[0.1em] transition-all shadow-2xl flex items-center justify-center gap-3",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10 text-base md:text-lg text-center", children: "Get Free ROI Audit" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 22, className: "relative z-10 group-hover:translate-x-2 transition-transform" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-furnace-500 to-orange-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/hero-cases",
                className: "group relative px-8 py-6 border border-white/20 hover:border-white/40 text-white text-lg rounded-sm font-bold uppercase tracking-[0.1em] transition-all backdrop-blur-md flex items-center justify-center text-center",
                children: /* @__PURE__ */ jsx("span", { className: "text-base md:text-lg", children: "View Case Studies" })
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[380px] glass-hud p-8 rounded-xl border border-white/10 relative overflow-hidden shadow-2xl self-center bg-white/[0.02] backdrop-blur-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsx(Calculator, { size: 80, className: "text-white" }) }),
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-heading font-bold text-white mb-8 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1 h-6 bg-furnace-500 rounded-full" }),
            "ROI Calculator"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-5", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-white/40 uppercase tracking-[0.2em]", children: "Annual Production" }),
                /* @__PURE__ */ jsxs("span", { className: "text-2xl font-mono font-bold text-furnace-500", children: [
                  production,
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/30 uppercase font-sans", children: "Mt/y" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: "0.5",
                  max: "6.0",
                  step: "0.1",
                  value: production,
                  onChange: (e) => setProduction(parseFloat(e.target.value)),
                  className: "w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-furnace-500 hover:accent-furnace-400 transition-all"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] text-white/20 font-bold mt-3 font-mono", children: [
                /* @__PURE__ */ jsx("span", { children: "0.5 MT" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/10 uppercase tracking-widest", children: "Adjust Capacity" }),
                /* @__PURE__ */ jsx("span", { children: "6.0 MT" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-6 border-t border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(Zap, { size: 10, className: "text-furnace-500/50" }),
                    " Annual Value"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/20 uppercase tracking-tight", children: "Shared wealth potential" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-2xl font-mono font-bold text-white tracking-tight", children: [
                  "$",
                  estimatedSavings,
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] ml-1.5 text-white/30 font-normal", children: "/yr" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(ShieldCheck, { size: 10, className: "text-green-500/50" }),
                    " carbon offset"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/20 uppercase tracking-tight", children: "7.5k Credits equivalent" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-2xl font-mono font-bold text-green-500/90 tracking-tight", children: [
                  co2Savings,
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] ml-1.5 text-white/30 font-normal", children: "t/yr" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/#assessment",
                  className: "block w-full bg-furnace-600 hover:bg-furnace-500 text-white font-bold py-4 rounded-lg transition-all shadow-xl text-center uppercase tracking-widest text-xs active:scale-[0.98] flex items-center justify-center gap-2",
                  children: [
                    "Calculate My Full ROI",
                    /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] text-white/20 mt-4 text-center uppercase tracking-[0.3em] font-black", children: "No CAPEX Required • Performance Based" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-4 w-full overflow-hidden border-t border-white/5 pt-8 opacity-100 transition-all duration-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-black tracking-[0.2em] text-gray-400", children: "Trusted by Global Steel Leaders:" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-furnace-600/10 text-furnace-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-furnace-500/20", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { size: 10 }),
            " CISA T80 Verified"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(LogoMarquee, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-20 w-full glass-hud border-t border-white/5 pb-8 pt-6", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-8 items-center text-center lg:text-left", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-r border-white/5 lg:pr-8 last:border-r-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2", children: [
          /* @__PURE__ */ jsx(Zap, { size: 12, className: "text-furnace-500" }),
          " Typical Fuel Saving"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter", children: [
          "7–15",
          /* @__PURE__ */ jsx("span", { className: "text-xs ml-0.5 text-gray-500", children: "%" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-r border-white/5 lg:pr-8 last:border-r-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 12, className: "text-green-500" }),
          " CO2 Reduction (Est.)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter", children: [
          "7–15",
          /* @__PURE__ */ jsx("span", { className: "text-xs ml-0.5 text-gray-500", children: "%" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-r border-white/5 lg:pr-8 last:border-r-0 text-white/90", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-furnace-500 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2 font-black", children: [
          /* @__PURE__ */ jsx(Gauge, { size: 12 }),
          " Zone Temp. (Typical)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xl md:text-2xl font-mono text-white font-bold tracking-tighter", children: [
          "1,150–1,250",
          /* @__PURE__ */ jsx("span", { className: "text-xs ml-0.5 text-gray-500", children: "°C" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-r border-white/5 lg:pr-8 last:border-r-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1.5 flex items-center justify-center lg:justify-start gap-2", children: [
          /* @__PURE__ */ jsx(Activity, { size: 12, className: "text-blue-500" }),
          " Flue Oxygen (Example)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl md:text-3xl font-mono text-white font-bold tracking-tighter", children: [
          "1.8–2.5",
          /* @__PURE__ */ jsx("span", { className: "text-xs ml-0.5 text-gray-500", children: "%" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center lg:items-end col-span-2 lg:col-span-1 border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] mb-2 font-black", children: "Control Status" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "block w-1.5 h-1.5 rounded-full bg-green-500" }),
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-75" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-green-400 font-mono font-black tracking-widest uppercase", children: "Optimized" })
        ] })
      ] })
    ] }) }) })
  ] });
};
const ProjectPositioning = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-8 leading-tight", children: [
        "Why Choose the ",
        /* @__PURE__ */ jsx("span", { className: "text-furnace-600", children: "Energy Steward Solution" }),
        "?"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-600 mb-8 leading-relaxed", children: [
        /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "EcoReheating" }),
        " provides Zero CAPEX reheating furnace optimization using ",
        /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "CISA T80 verified technologies" }),
        " like narrow window temperature control and full-fiber roofs, helping steel mills reduce fuel consumption by ",
        /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-bold", children: "7-15%" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-500 mb-8", children: [
        "Developed by South Technology, this industry-defining solution—now a national benchmark—optimizes the entire thermal journey from ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold italic", children: "continuous caster exit" }),
        " to ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold italic", children: "reheating furnace exit" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-furnace-100 p-4 rounded-lg h-fit", children: /* @__PURE__ */ jsx(Target, { className: "text-furnace-600", size: 32 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-industrial-900 mb-2", children: "Maximize Heating Capacity" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Eliminate bottlenecks in the reheating process to ensure peak production throughput." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-furnace-100 p-4 rounded-lg h-fit", children: /* @__PURE__ */ jsx(TrendingUp, { className: "text-furnace-600", size: 32 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-industrial-900 mb-2", children: "Optimize Reheating Process" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Advanced AI and process simulation to achieve precise thermal curves and minimum fuel usage." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-furnace-100 p-4 rounded-lg h-fit", children: /* @__PURE__ */ jsx(Shield, { className: "text-furnace-600", size: 32 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-industrial-900 mb-2", children: "Zero-Downtime Reliability" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Long-term expert steward service ensuring equipment longevity and consistent performance." })
        ] })
      ] })
    ] })
  ] }) }) });
};
const TechCard = ({ id, title, description, keywords, imageSrc, isReversed }) => /* @__PURE__ */ jsxs("div", { id, className: `flex flex-col lg:flex-row items-center gap-12 py-16 scroll-mt-24 ${isReversed ? "lg:flex-row-reverse" : ""}`, children: [
  /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 relative group", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-furnace-600 rounded-lg transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-700 ease-out opacity-20" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-furnace-600/10 rounded-lg transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 delay-75" }),
    /* @__PURE__ */ jsxs("div", { className: "relative rounded-lg overflow-hidden shadow-2xl aspect-video bg-gray-900 border border-white/5", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imageSrc,
          alt: title,
          className: "w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-industrial-900/80 via-transparent to-transparent opacity-60" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-furnace-500/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1500ms] ease-in-out" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-furnace-500/5 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-1000" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0", children: /* @__PURE__ */ jsx("div", { className: "bg-industrial-950/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] font-black text-furnace-500 uppercase tracking-widest", children: "Technical Detail" }) })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-heading font-bold text-industrial-900 mb-6", children: title }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-8 border-l-4 border-furnace-500 pl-6", children: Array.isArray(description) ? description.map((point, idx) => /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed font-medium", children: point }, idx)) : /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed", children: description }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-industrial-700 uppercase tracking-wide mb-3", children: "Key Performance Indicators:" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: keywords.map((keyword, idx) => /* @__PURE__ */ jsx("span", { className: "bg-slate-100 text-industrial-800 px-3 py-1 rounded text-sm font-medium border border-slate-200", children: keyword }, idx)) })
    ] })
  ] })
] });
const Technologies = () => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [activeDetail, setActiveDetail] = React.useState(null);
  React.useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setCurrentPage(0);
      setActiveDetail(null);
    }
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (activeDetail) setActiveDetail(null);
        else setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isZoomed, activeDetail]);
  return /* @__PURE__ */ jsxs("section", { id: "technologies", className: "py-20 bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-bold tracking-widest uppercase text-sm mb-2 block", children: "Our Expertise" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-heading font-bold text-industrial-900", children: [
          "Core Technologies for ",
          /* @__PURE__ */ jsx("br", {}),
          "Furnace Conservation"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "divide-y divide-gray-100", children: [
        /* @__PURE__ */ jsx(
          TechCard,
          {
            id: "tech-roof",
            title: "Full-fiber Furnace Roof",
            description: [
              "1. Fuel Efficiency: >10% energy saving under identical conditions. No pre-heating required, drastically reducing startup fuel costs.",
              "2. Rapid Assembly: Factory pre-assembled modules; on-site installation completed in just 2 days.",
              "3. Long Lifespan: Durable design ensuring a service life of over 10 years.",
              "4. Safety & Stability: Enhanced performance in extreme heat, high vibration, and corrosive environments, lowering O&M risks."
            ],
            keywords: [">10% Fuel Saving", "2-Day Assembly", "10+ Year Lifespan", "Operational Safety"],
            imageSrc: "/tech-roof.png"
          }
        ),
        /* @__PURE__ */ jsx(
          TechCard,
          {
            id: "tech-ai",
            title: "Intelligent Combustion System",
            description: [
              "1. Full-Process Traceability: Comprehensive material tracking from initial charging to final discharge.",
              "2. Precision Control: Saves >5% fuel and reduces relative oxidation loss by >10% through accurate temp management.",
              "3. Core Tech: Driven by mechanism modeling, self-learning AI, and advanced proprietary algorithms."
            ],
            keywords: ["Material Traceability", ">5% Fuel Saving", "Lower Oxidation Loss", "Self-learning AI"],
            imageSrc: "/tech-ai.png",
            isReversed: true
          }
        ),
        /* @__PURE__ */ jsx(
          TechCard,
          {
            id: "tech-coating",
            title: "High-Temperature Energy-Saving Coating",
            description: [
              "1. Advanced Formula: Unique 'High-Emissivity' recipe solves the industry-wide problem of delamination and peeling.",
              "2. Durable Efficiency: Withstands 1700°C without efficiency decay, compatible with all refractory materials.",
              "3. Performance Gains: Lowers furnace shell temperature, boosts productivity, and extends refractory life."
            ],
            keywords: ["High-Emissivity Formula", "1700°C Heat Resistance", "Shell Temp Reduction", "Extends Refractory Life"],
            imageSrc: "/tech-coating.png"
          }
        ),
        /* @__PURE__ */ jsx(
          TechCard,
          {
            title: "Intelligent O&M Platform",
            description: [
              "1. Remote Expert Diagnostics: Online support and a massive professional knowledge base for rapid troubleshooting.",
              "2. AI Prediction: Real-time monitoring and predictive failure analysis to optimize maintenance decisions.",
              "3. Big Data Insight: Precision energy efficiency analysis and big data for strategic cost control.",
              "4. Process Visibility: Decarburization layer prediction and real-time visualization to minimize specialty steel defects."
            ],
            keywords: ["Expert Knowledge Base", "Predictive Maintenance", "Energy Big Data", "Decarburization Control"],
            imageSrc: "/tech-digital.png",
            isReversed: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-32 text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 14, className: "animate-pulse" }),
          ' Officially Verified: The "Extreme Efficiency" Selection'
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-heading font-bold text-industrial-900 leading-[1.1] mb-6", children: [
          "Nationally Recognized ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-furnace-600", children: '"Extreme Efficiency" Technologies' })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-medium", children: [
          "Selected by the ",
          /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-extrabold underline decoration-furnace-500 decoration-2", children: "China Iron & Steel Association (CISA)" }),
          " — representing 50%+ of global steel capacity. Only the most rigorous, scale-proven technologies make this industry benchmark list."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 rounded-3xl p-8 md:p-16 border border-slate-200 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 400 }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-16 items-start relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 group", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative rounded-2xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-white cursor-zoom-in",
                onClick: () => setIsZoomed(true),
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/cisa-cover.jpg",
                      alt: "CISA T80 Certification Document",
                      className: "w-full h-auto transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-furnace-600 text-white px-3 py-1.5 rounded shadow-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", children: [
                    /* @__PURE__ */ jsx(ShieldCheck, { size: 14 }),
                    " T80 Verified"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-white/95 p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500", children: /* @__PURE__ */ jsx(BookOpen, { className: "text-furnace-600 animate-pulse", size: 32 }) }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]", children: "Official Document: CISA [2024] No. 185" }),
              /* @__PURE__ */ jsx("span", { className: "text-furnace-500 font-black text-[10px] uppercase tracking-widest animate-pulse cursor-pointer", onClick: () => setIsZoomed(true), children: "View Official Document & Full Directory →" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
              /* @__PURE__ */ jsx("div", { className: "group/item cursor-pointer", onClick: () => {
                setIsZoomed(true);
                setCurrentPage(1);
                setActiveDetail(47);
              }, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-industrial-900 shadow-xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-furnace-600 transition-colors duration-500", children: /* @__PURE__ */ jsx("span", { className: "font-heading font-black text-white text-lg", children: "47" }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-industrial-900 font-heading font-bold text-xl leading-tight text-furnace-600 underline underline-offset-4 decoration-furnace-200", children: [
                    '"Narrow Window" Precision Control for ',
                    /* @__PURE__ */ jsx("br", {}),
                    "Discharge Temperature"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm leading-relaxed", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1", children: "Benefit" }),
                    "Maximizes heating uniformity and ensures precise temperature consistency closer to the theoretical limit."
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "group/item cursor-pointer", onClick: () => {
                setIsZoomed(true);
                setCurrentPage(1);
                setActiveDetail(51);
              }, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-industrial-900 shadow-xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-furnace-600 transition-colors duration-500", children: /* @__PURE__ */ jsx("span", { className: "font-heading font-black text-white text-lg", children: "51" }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-industrial-900 font-heading font-bold text-xl leading-tight text-furnace-600 underline underline-offset-4 decoration-furnace-200", children: [
                    "High-Emissivity Coating for ",
                    /* @__PURE__ */ jsx("br", {}),
                    "Enhanced Thermal Radiation"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm leading-relaxed", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1", children: "Benefit" }),
                    "Boosts wall radiation and heat transfer efficiency by 10-15%, significantly shortening heating cycles."
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "group/item cursor-pointer", onClick: () => {
                setIsZoomed(true);
                setCurrentPage(1);
                setActiveDetail(52);
              }, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-industrial-900 shadow-xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:bg-furnace-600 transition-colors duration-500", children: /* @__PURE__ */ jsx("span", { className: "font-heading font-black text-white text-lg", children: "52" }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-industrial-900 font-heading font-bold text-xl leading-tight text-furnace-600 underline underline-offset-4 decoration-furnace-200", children: "All-Ceramic Fiber Roof Structure" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm leading-relaxed", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-bold uppercase text-[10px] tracking-wider block mb-1", children: "Benefit" }),
                    "Advanced refractory design for minimal heat loss and drastically reduced thermal inertia."
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-12 p-8 bg-white rounded-2xl border-2 border-furnace-500/20 shadow-[0_20px_40px_-15px_rgba(234,88,12,0.1)] relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-6 px-4 py-1 bg-furnace-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded", children: "Exclusive Intellectual Property" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx(ShieldCheck, { className: "text-furnace-600 shrink-0 mt-1", size: 24 }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h5", { className: "text-industrial-900 font-bold text-lg mb-2", children: "Original Standard Innovator" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm leading-relaxed italic", children: [
                    '"South Technology holds the ',
                    /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "exclusive invention patents" }),
                    ' for these T80-listed solutions. We are the original innovators behind these national standards."'
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    isZoomed && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-[100] bg-industrial-950/98 flex items-center justify-center p-4 md:p-8 overflow-y-auto cursor-pointer",
        onClick: () => setIsZoomed(false),
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl w-full my-auto flex flex-col items-center cursor-default bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full bg-slate-800/50 border-b border-white/5 py-4 px-8 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-furnace-600 rounded-lg flex items-center justify-center shadow-lg shadow-furnace-600/20", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "text-white", size: 22 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-heading font-bold uppercase tracking-[0.1em] text-sm", children: "Technical Validation Dossier" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-[10px] uppercase tracking-widest", children: "CISA T80 Extreme Efficiency Selection (2024)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setCurrentPage(0),
                    className: `px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${currentPage === 0 ? "bg-furnace-600 text-white" : "text-gray-500 hover:text-white"}`,
                    children: "1. Official Notice"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setCurrentPage(1);
                      setActiveDetail(null);
                    },
                    className: `px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${currentPage === 1 ? "bg-furnace-600 text-white" : "text-gray-500 hover:text-white"}`,
                    children: "2. Selection Directory"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "text-white/40 hover:text-white transition-colors p-2",
                  onClick: () => setIsZoomed(false),
                  children: /* @__PURE__ */ jsx(Settings, { size: 20, className: "hover:rotate-90 transition-transform" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full h-[75vh] flex flex-col lg:flex-row relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 h-full bg-white relative flex items-center justify-center overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-100/50 pointer-events-none" }),
              currentPage === 0 ? /* @__PURE__ */ jsx("img", { src: "/cisa-cover.jpg", className: "h-[95%] w-auto object-contain shadow-2xl animate-in fade-in slide-in-from-left duration-700", alt: "Notice" }) : /* @__PURE__ */ jsx("div", { className: "relative h-[95%] w-[95%] flex flex-col items-center justify-center", children: activeDetail === 47 ? /* @__PURE__ */ jsx("img", { src: "/item47.png", className: "h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700", alt: "Item 47 Detail" }, "item47") : activeDetail === 51 ? /* @__PURE__ */ jsx("img", { src: "/item51.png", className: "h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700", alt: "Item 51 Detail" }, "item51") : activeDetail === 52 ? /* @__PURE__ */ jsx("img", { src: "/item52.png", className: "h-[95%] w-auto object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-700", alt: "Item 52 Detail" }, "item52") : /* @__PURE__ */ jsx("img", { src: "/cisa-directory.png", className: "h-[95%] w-auto object-contain shadow-2xl animate-in fade-in slide-in-from-right duration-700", alt: "Directory" }, "directory") }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 flex gap-4", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    disabled: currentPage === 0,
                    onClick: () => setCurrentPage(0),
                    className: "w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center disabled:opacity-20 hover:bg-furnace-600 transition-colors",
                    children: /* @__PURE__ */ jsx(ChevronLeft, { size: 20 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    disabled: currentPage === 1,
                    onClick: () => setCurrentPage(1),
                    className: "w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center disabled:opacity-20 hover:bg-furnace-600 transition-colors",
                    children: /* @__PURE__ */ jsx(ChevronRight, { size: 20 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 h-full bg-industrial-950 p-8 md:p-12 overflow-y-auto border-l border-white/5", children: [
              currentPage === 0 && /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-bottom duration-700", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center border-b border-white/10 pb-8 mb-8", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-white text-2xl font-bold font-serif mb-2 leading-relaxed text-center w-full", children: "China Iron and Steel Association" }),
                  /* @__PURE__ */ jsx("p", { className: "text-furnace-500 font-mono font-bold tracking-[0.2em] text-xs", children: "CISA [2024] No. 185" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-300 font-serif leading-relaxed", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-lg text-center px-4", children: "Notice on the Update and Release of the List of Ultimate Energy Efficiency Technologies (T80)" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-400 italic", children: "To all relevant units:" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: 'Following multiple rounds of rigorous expert review, CISA hereby releases the 2024 edition of the "T80" list. This list defines the national benchmark for advanced industrial furnace performance and energy efficiency.' }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border-l-[3px] border-furnace-500 mt-8 group cursor-pointer", onClick: () => {
                    setCurrentPage(1);
                    setActiveDetail(null);
                  }, children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm italic mb-2 text-white", children: "Click to view the directory containing technologies 47, 51, and 52." }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-furnace-500 font-bold uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform", children: [
                      "Flip to Directory ",
                      /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
                    ] })
                  ] })
                ] })
              ] }),
              currentPage === 1 && /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-top duration-700", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-white font-heading font-bold text-xl mb-4 border-l-4 border-furnace-500 pl-4 text-left w-full", children: "Selection Directory Explorer" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Below are the specific entries recognized in the CISA T80 catalogue. Click on an item to see its detailed technical transformation roadmap." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [47, 51, 52].map((id) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `p-6 rounded-2xl border transition-all cursor-pointer group ${activeDetail === id ? "bg-furnace-600/10 border-furnace-500" : "bg-white/5 border-white/10 hover:border-white/20"}`,
                    onClick: () => setActiveDetail(id),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                        /* @__PURE__ */ jsxs("span", { className: "bg-industrial-900 text-white font-black text-xs px-2 py-1 rounded", children: [
                          "Item ",
                          id
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: `text-[10px] font-bold uppercase tracking-widest transition-colors ${activeDetail === id ? "text-furnace-500" : "text-gray-600"}`, children: "Technical Profile" })
                      ] }),
                      /* @__PURE__ */ jsx("h5", { className: "text-white font-bold leading-tight group-hover:text-furnace-500 transition-colors", children: id === 47 ? '"Narrow Window" Control for Discharge Temp' : id === 51 ? "High-Emissivity Enhanced Radiation Coating" : "All-Ceramic Fiber Roof Structure Reheating Furnace" }),
                      activeDetail === id && /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-white/5 animate-in fade-in zoom-in-95 duration-500", children: id === 47 ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-furnace-500 text-[10px] font-bold uppercase tracking-widest", children: "Technical Brief" }),
                          /* @__PURE__ */ jsxs("p", { className: "text-gray-300 text-sm leading-relaxed", children: [
                            "Integrated application of heat & mass transfer theories combined with high-precision numerical modeling. Using the ",
                            /* @__PURE__ */ jsx("span", { className: "text-white font-bold italic", children: '"Overall Heat Absorption Rate Method"' }),
                            " and online parameter identification, the system estimates internal billet temperature distributions using accessible real-time furnace data."
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: 'It directly links temperature setpoints to discharge targets via a self-learning "Narrow Window" search algorithm, minimizing both fuel consumption and oxidation loss in real-time.' })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "bg-industrial-900/50 p-4 rounded-xl border border-blue-500/20", children: [
                          /* @__PURE__ */ jsx("h6", { className: "text-white text-xs font-bold mb-2 uppercase tracking-tight", children: "Technical Benchmarks:" }),
                          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-y-3", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 uppercase", children: "Temp Precision" }),
                              /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: "±8°C Window" })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 uppercase", children: "Intelligent Rate" }),
                              /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: ">95%" })
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-furnace-500 text-[10px] font-bold uppercase tracking-widest", children: "Validated Impact (Pangang, Jianlong, Yaxin)" }),
                          /* @__PURE__ */ jsxs("ul", { className: "text-gray-300 text-sm space-y-2", children: [
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "📉 ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "≥7%" }),
                              " Fuel Consumption Saving"
                            ] }),
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "📈 ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "+0.1%~0.2% Yield" }),
                              " Improvement"
                            ] }),
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "🛡️ ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "≥5%" }),
                              " Reduction in Oxidation Scale Loss"
                            ] })
                          ] })
                        ] })
                      ] }) : id === 51 ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-furnace-500 text-[10px] font-bold uppercase tracking-widest", children: "Technical Brief" }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: 'Innovative "High-Emissivity" nano-coating. Penetrates surface micro-pores of refractories to form an integrated 30-micron high-emissivity layer. Unlike traditional coatings, its elastic properties eliminate "peeling" caused by thermal expansion mismatches.' })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 uppercase mb-1", children: "Max Temp" }),
                            /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: "1700°C" })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-3 rounded-lg border border-white/5", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 uppercase mb-1", children: "Emissivity" }),
                            /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: "~0.94" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-furnace-500 text-[10px] font-bold uppercase tracking-widest", children: "Performance Impact" }),
                          /* @__PURE__ */ jsxs("ul", { className: "text-gray-300 text-sm space-y-2", children: [
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "🔥 ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "+5%" }),
                              " Production Efficiency"
                            ] }),
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "🛡️ ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "+30%" }),
                              " Refractory Life Extension"
                            ] }),
                            /* @__PURE__ */ jsx("li", { className: "flex gap-2", children: "📉 Lower Shell Temperature & Tonne Consumption" })
                          ] })
                        ] })
                      ] }) : id === 52 ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-furnace-500 text-[10px] font-bold uppercase tracking-widest", children: "Technical Brief" }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: "Pure fiber roof design utilizing structural innovation and specialized coatings. Replaces traditional construction with standardized modular assembly. Drastically reduces thermal inertia and radiant heat loss compared to conventional roofs." })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "bg-industrial-900/50 p-4 rounded-xl border border-furnace-500/20", children: [
                          /* @__PURE__ */ jsx("h6", { className: "text-white text-xs font-bold mb-2 uppercase tracking-tight", children: "Industrial Implementation:" }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-[11px] leading-relaxed", children: "Successfully deployed in 100+ furnaces including Jinnan Steel, Fangda Steel, Ausun, Qian'an Jiujiang, and Liugang." })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-furnace-500 text-[10px] font-bold uppercase tracking-widest", children: "Core Benefits" }),
                          /* @__PURE__ */ jsxs("ul", { className: "text-gray-300 text-sm space-y-2", children: [
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "⚡ ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "No Baking" }),
                              " required (Direct Startup)"
                            ] }),
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "💎 ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "10-Year" }),
                              " Service Life"
                            ] }),
                            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                              "📉 ",
                              /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "5%+" }),
                              " Fuel Saving per Ton"
                            ] })
                          ] })
                        ] })
                      ] }) : null })
                    ]
                  },
                  id
                )) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full bg-slate-800/80 p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left", children: [
            /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 italic", children: "Exclusive Intellectual Property Announcement" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-[10px] leading-relaxed font-medium", children: '"South Technology holds the exclusive invention patents or authorized application licenses for T80 items 47, 51, and 52."' })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Settings, { className: "text-furnace-500", size: 16 }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-[10px] font-bold uppercase tracking-widest", children: "Industry Benchmark 2024" })
            ] }) })
          ] })
        ] })
      }
    )
  ] });
};
const ProcessStep = ({ icon, label }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center group", children: [
  /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-furnace-50 group-hover:border-furnace-200 transition-all", children: icon }),
  /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-bold text-center text-sm md:text-base", children: label })
] });
const ProcessCoverage = () => {
  return /* @__PURE__ */ jsxs("section", { className: "py-24 bg-industrial-950 text-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-furnace-600/5 to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-20", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-heading font-bold mb-6", children: "From Continuous Caster to Furnace Discharge" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Unlocking Hidden Efficiency across the entire reheating process, not just single equipment retrofits. We optimize the complete thermal flow." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto relative px-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-10 left-32 right-32 h-[2px] bg-gradient-to-r from-furnace-500/20 via-furnace-500 to-furnace-500/20 hidden md:block" }),
        /* @__PURE__ */ jsx(ProcessStep, { icon: /* @__PURE__ */ jsx(ArrowRightCircle, { className: "text-furnace-500", size: 32 }), label: "Continuous Casting Exit" }),
        /* @__PURE__ */ jsx(ProcessStep, { icon: /* @__PURE__ */ jsx(Layers, { className: "text-furnace-500", size: 32 }), label: "Soaking Pits (5th Caster)" }),
        /* @__PURE__ */ jsx(ProcessStep, { icon: /* @__PURE__ */ jsx(Construction, { className: "text-furnace-500", size: 32 }), label: "Reheating Furnace" }),
        /* @__PURE__ */ jsx(ProcessStep, { icon: /* @__PURE__ */ jsx(Zap, { className: "text-furnace-500", size: 32 }), label: "Rolling Mill Entry" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs", children: "Phase 1" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Synchronized temperature management at the caster exit to preserve latent heat." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs", children: "Phase 2" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Advanced 5th caster soaking pit energy saving project integration." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs", children: "Phase 3" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "T80-listed retrofits for the main reheating furnace body." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-furnace-400 font-bold mb-3 uppercase tracking-widest text-xs", children: "Phase 4" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Intelligent mill-pacing integration for optimized entry temperature." })
        ] })
      ] })
    ] })
  ] });
};
const BenefitCard = ({ icon, range, label, description }) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center group", children: [
  /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 rounded-full bg-slate-50 text-furnace-600 group-hover:bg-furnace-600 group-hover:text-white transition-colors", children: icon }),
  /* @__PURE__ */ jsx("div", { className: "text-4xl font-heading font-black text-industrial-950 mb-2", children: range }),
  /* @__PURE__ */ jsx("div", { className: "text-furnace-600 font-bold uppercase tracking-widest text-xs mb-4", children: label }),
  /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed text-sm", children: description })
] });
const BenefitsSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-20", children: [
      /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block", children: "Proven Performance" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-8", children: "Typical Results from T80-level Reheating Furnace Upgrades" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: "Our benchmarks are based on the China Iron and Steel Association T80 extreme efficiency list and real-world results from the Jinnan Steel project." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsx(
        BenefitCard,
        {
          icon: /* @__PURE__ */ jsx(TrendingDown, { size: 32 }),
          range: "7–15%",
          label: "Fuel Consumption",
          description: "Typical reduction range in fuel used per ton of steel after comprehensive upgrade."
        }
      ),
      /* @__PURE__ */ jsx(
        BenefitCard,
        {
          icon: /* @__PURE__ */ jsx(Percent, { size: 32 }),
          range: "5–15%",
          label: "Oxidation Scale",
          description: "Significant reduction in surface oxidation loss during the reheating process."
        }
      ),
      /* @__PURE__ */ jsx(
        BenefitCard,
        {
          icon: /* @__PURE__ */ jsx(BarChart3, { size: 32 }),
          range: "0.1–0.3%",
          label: "Yield Improvement",
          description: "Overall increase in saleable product through optimized thermal management."
        }
      ),
      /* @__PURE__ */ jsx(
        BenefitCard,
        {
          icon: /* @__PURE__ */ jsx(Clock, { size: 32 }),
          range: "1–3 Years",
          label: "Payback Period",
          description: "Typical ROI timeframe under performance-based energy steward contracts."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-xl", children: /* @__PURE__ */ jsx("h3", { className: "text-2xl font-heading font-bold mb-4 italic", children: "“The exact performance depends on each plant’s baseline and process, but our projects are engineered to achieve T80-level benchmarks.”" }) }),
      /* @__PURE__ */ jsxs("div", { className: "shrink-0", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-furnace-600 text-xs font-bold px-4 py-2 rounded-sm border border-furnace-500 mb-2", children: "EXTREME EFFICIENCY LIST" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-xs", children: "CISA T80 STANDARDS COMPLIANT" })
      ] })
    ] })
  ] }) });
};
const ModelStep = ({ num, title, desc, icon }) => /* @__PURE__ */ jsxs("div", { className: "relative p-8 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-furnace-300 transition-colors", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -right-4 w-12 h-12 bg-industrial-950 text-white flex items-center justify-center font-heading font-black rounded-xl text-xl border-4 border-white", children: num }),
  /* @__PURE__ */ jsx("div", { className: "mb-6 text-furnace-600", children: icon }),
  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-industrial-900 mb-4", children: title }),
  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm leading-relaxed", children: desc })
] });
const BusinessModel = () => {
  return /* @__PURE__ */ jsx("section", { id: "energy-steward", className: "py-24 bg-white scroll-mt-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-16 items-start", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:w-1/3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block", children: "Our Model" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-heading font-bold text-industrial-900 mb-2 leading-tight", children: "The Shared Savings Model" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-heading font-bold text-gray-400 mb-8 uppercase tracking-wide", children: "Contract Energy Management (CEM)" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-lg mb-8 italic", children: [
        '"Performance First. Payment Second." — A win-win philosophy proven across ',
        /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "nearly 100 production lines" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-md mb-8", children: "We eliminate CAPEX barriers. SOUTH TECHNOLOGY invests in the technology and equipment; we share the wealth created by verified fuel savings." }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "text-furnace-600 shrink-0", size: 24 }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium font-heading", children: "Zero Initial Investment" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "text-furnace-600 shrink-0", size: 24 }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium font-heading", children: "Performance-Based Sharing" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "text-furnace-600 shrink-0", size: 24 }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium font-heading", children: "Turnkey Energy Stewardship" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsx(
        ModelStep,
        {
          num: "01",
          icon: /* @__PURE__ */ jsx(Search, { size: 40 }),
          title: "Assessment & Collection",
          desc: "Pre-assessment & data collection for reheating furnace and soaking pits baseline establish."
        }
      ),
      /* @__PURE__ */ jsx(
        ModelStep,
        {
          num: "02",
          icon: /* @__PURE__ */ jsx(PenTool, { size: 40 }),
          title: "Technical Solution",
          desc: "Full-fiber roof, intelligent reheating, high-emissivity coatings, and advanced controls integration."
        }
      ),
      /* @__PURE__ */ jsx(
        ModelStep,
        {
          num: "03",
          icon: /* @__PURE__ */ jsx(Wrench, { size: 40 }),
          title: "Retrofit & AI Tuning",
          desc: "On-site retrofitting, commissioning, and AI-enabled process optimization for maximum efficiency."
        }
      ),
      /* @__PURE__ */ jsx(
        ModelStep,
        {
          num: "04",
          icon: /* @__PURE__ */ jsx(BarChart4, { size: 40 }),
          title: "Long-term Steward",
          desc: "Continuous maintenance and expert services with shared energy savings as compensation."
        }
      )
    ] })
  ] }) }) });
};
const SocialProof = () => {
  return /* @__PURE__ */ jsx("section", { id: "recognition", className: "py-24 bg-industrial-950 text-white overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block", children: "Industry Recognition" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-heading font-bold mb-8", children: "Recognized by Leading Steel Industry Bodies" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-furnace-500/30 transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-furnace-600/10 p-4 rounded-xl text-furnace-500 group-hover:bg-furnace-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(Award, { size: 32 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-2", children: "T80 Extreme Efficiency Listed" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: "Listed in the 2024 ‘Extreme Energy Efficiency Technologies (T80)’ of China Iron and Steel Association for full-fiber furnace roof, intelligent reheating, and high-emissivity coatings." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-furnace-500/30 transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-furnace-600/10 p-4 rounded-xl text-furnace-500 group-hover:bg-furnace-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(CheckCircle, { size: 32 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-2", children: "Jinnan Steel Demonstration Project" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: "Project launched at JINNAN STEEL GROUP as a ‘green, low-carbon demonstration and high-efficiency resource utilization benchmark’." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-furnace-600/20 blur-3xl rounded-full opacity-50" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-2xl p-2 aspect-[3/4] border border-white/10 relative overflow-hidden group shadow-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-industrial-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest px-4 text-center", children: "T80 Extreme Efficiency Technology Catalogue" }) }),
          /* @__PURE__ */ jsx("img", { src: "/t80-doc.png", alt: "T80 Catalogue", className: "w-full h-full object-cover rounded-xl" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-2xl p-2 aspect-[3/4] border border-white/10 relative overflow-hidden group translate-y-8 shadow-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-industrial-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest px-4 text-center", children: "Jinnan Steel Demonstration Site" }) }),
          /* @__PURE__ */ jsx("img", { src: "/jinnan-site.png", alt: "Jinnan Steel Site", className: "w-full h-full object-cover rounded-xl" })
        ] })
      ] })
    ] })
  ] }) });
};
const LogoWall = () => {
  const logos2 = [
    "DANIELI",
    "AKS STEEL",
    "FANGDA GROUP",
    "KSRM",
    "JINGYE GROUP",
    "JIANLONG",
    "JINNAN STEEL",
    "LIUZHOU STEEL",
    "SANSTEEL",
    "JINXI GROUP",
    "SHAANXI STEEL",
    "NANSHAN",
    "TIANGONG INTER.",
    "DESHENG",
    "SANBAO",
    "AOSEN STEEL",
    "JIANBANG",
    "YASTEN",
    "HUAMAO",
    "BINXIN STEEL"
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 bg-[#F5F5F7] border-t border-slate-200/50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center mb-16 md:mb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 mb-6 rounded-full bg-industrial-900/5 border border-industrial-900/10", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] md:text-xs font-black text-industrial-800 uppercase tracking-[0.4em]", children: "Global Partner Network" }) }),
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8 leading-[1.1]", children: [
        "Powering the World's ",
        /* @__PURE__ */ jsx("span", { className: "text-furnace-600", children: "Steel Giants" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed", children: [
        "Successfully deployed in ",
        /* @__PURE__ */ jsx("span", { className: "text-slate-900 font-bold", children: "100+ production lines" }),
        " with a combined capacity of ",
        /* @__PURE__ */ jsx("span", { className: "text-slate-900 font-bold border-b-2 border-furnace-500/20 px-1", children: ">200 Million Tons/Year" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-12 md:p-20 rounded-[40px] md:rounded-[64px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-white flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-y-12 md:gap-y-20 gap-x-4 md:gap-x-12 w-full", children: logos2.map((logo, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex items-center justify-center transition-all duration-300 hover:scale-105 group",
          children: /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-[#333333] font-bold text-center leading-none tracking-tight opacity-90 group-hover:opacity-100 group-hover:text-black transition-all",
              style: {
                fontSize: "24px",
                fontFamily: '"Inter", "Helvetica", "Arial Black", sans-serif'
              },
              children: logo
            }
          )
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-20 md:mt-24 pt-10 border-t border-slate-100 w-full text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold", children: "Including Tier-1 Global technical giants and major regional industry leaders" }) })
    ] }) })
  ] }) });
};
const ContactForm = () => {
  const [formState, setFormState] = useState("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    const SERVICE_ID = "service_o9epdy2";
    const TEMPLATE_ID = "template_nqbb9ry";
    const PUBLIC_KEY = "CsB6RxJ8pdWjnTpRn";
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.currentTarget, PUBLIC_KEY).then(() => {
      setFormState("success");
    }).catch((error) => {
      console.error("FAILED...", error);
      alert("Submission failed. Please try again or contact us directly via email.");
      setFormState("idle");
    });
  };
  const today = /* @__PURE__ */ new Date();
  const displayDate = /* @__PURE__ */ new Date();
  if (today.getDate() >= 15) {
    displayDate.setMonth(today.getMonth() + 1);
  }
  const targetMonth = displayDate.toLocaleString("en-US", { month: "long" });
  return /* @__PURE__ */ jsx("section", { id: "assessment", className: "py-24 bg-slate-50 relative scroll-mt-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:w-2/5 p-12 bg-industrial-950 text-white flex flex-col justify-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-furnace-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2" }),
      /* @__PURE__ */ jsx("span", { className: "text-furnace-500 font-bold uppercase tracking-widest text-xs mb-4 block", children: "Limited Opportunity" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-heading font-bold mb-6 relative z-10", children: [
        "Claim Your Free ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "ROI Potential Audit" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-10 text-lg relative z-10 leading-relaxed", children: [
        "Find out exactly how much you can save. We provide a comprehensive baseline assessment and ROI projection ",
        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "at no upfront cost" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 bg-furnace-600/20 border border-furnace-500/30 rounded-xl mb-10 relative overflow-hidden group", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-widest text-furnace-400", children: "Current Availability" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-white bg-furnace-600 px-2 py-0.5 rounded", children: "1 SLOT LEFT" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-2 bg-industrial-900 rounded-full overflow-hidden mb-3", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-furnace-500 w-1/2 animate-pulse" }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-gray-300 leading-relaxed italic", children: [
            "Due to the capital-heavy nature of our model, we only accept 2 new projects per month. ",
            /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
              "1 slot remaining for ",
              targetMonth,
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-furnace-500/5 rounded-full -translate-y-1/2 translate-x-1/2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-furnace-600/20 p-2 rounded text-furnace-500", children: /* @__PURE__ */ jsx(CheckCircle, { size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm", children: "Data Driven" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Baseline established via actual mill production logs." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-furnace-600/20 p-2 rounded text-furnace-500", children: /* @__PURE__ */ jsx(CheckCircle, { size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm", children: "Expert Analysis" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "T80-level engineering review of your process geometry." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lg:w-3/5 p-12 bg-white", children: formState === "success" ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center min-h-[500px]", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(CheckCircle, { size: 40 }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-industrial-900 mb-2", children: "Assessment Requested!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-sm mx-auto", children: "Thank you. One of our energy stewards will contact you to collect the necessary production data for the preliminary assessment." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFormState("idle"),
          className: "mt-8 text-furnace-600 font-bold hover:underline",
          children: "Submit another request"
        }
      )
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2", children: [
            "Name ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              type: "text",
              name: "user_name",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all",
              placeholder: "Your full name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2", children: [
            "Role ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              required: true,
              name: "user_role",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all bg-white",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select your role..." }),
                /* @__PURE__ */ jsx("option", { value: "plant-manager", children: "Plant Manager" }),
                /* @__PURE__ */ jsx("option", { value: "energy-manager", children: "Energy Manager" }),
                /* @__PURE__ */ jsx("option", { value: "maintenance-manager", children: "Maintenance Manager" }),
                /* @__PURE__ */ jsx("option", { value: "other", children: "Other" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2", children: [
            "Company ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              type: "text",
              name: "user_company",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all",
              placeholder: "Steel mill / Group name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2", children: [
            "Country / Region ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              type: "text",
              name: "user_region",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all",
              placeholder: "e.g. China, Vietnam, Brazil..."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2", children: [
            "Work Email ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              type: "email",
              name: "user_email",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all",
              placeholder: "name@company.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-gray-400", children: "Phone / WhatsApp (Optional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              name: "user_phone",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all",
              placeholder: "+86..."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2", children: [
            "Annual Production ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              type: "text",
              name: "user_production",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all",
              placeholder: "e.g. 2.5"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2", children: [
            "Furnace Type ",
            /* @__PURE__ */ jsx("span", { className: "text-furnace-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              required: true,
              name: "user_furnace_type",
              className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all bg-white",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select type..." }),
                /* @__PURE__ */ jsx("option", { value: "walking-beam", children: "Walking Beam" }),
                /* @__PURE__ */ jsx("option", { value: "walking-hearth", children: "Walking Hearth" }),
                /* @__PURE__ */ jsx("option", { value: "pusher", children: "Pusher" }),
                /* @__PURE__ */ jsx("option", { value: "other", children: "Others" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-black text-industrial-900 uppercase tracking-widest mb-2 text-gray-400", children: "Message (Optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: 3,
            name: "message",
            className: "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-furnace-500 focus:ring-4 focus:ring-furnace-500/10 outline-none transition-all",
            placeholder: "Specific challenges or process details..."
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: formState === "submitting",
          className: `w-full bg-furnace-600 text-white font-bold text-lg py-5 rounded-xl uppercase tracking-widest hover:bg-furnace-700 transition-all shadow-xl flex items-center justify-center gap-3 ${formState === "submitting" ? "opacity-75 cursor-wait" : ""}`,
          children: formState === "submitting" ? "Analyzing Data..." : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Analyze My ROI Now ",
            /* @__PURE__ */ jsx(Send, { size: 20 })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-center text-gray-500 mt-6 leading-relaxed", children: [
        "Join 15+ steel mills already optimized by our T80 technology. ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Privacy Guarantee:" }),
        " Your data is protected by MNDA."
      ] })
    ] }) })
  ] }) }) });
};
const SEO = ({ title, description, canonical }) => {
  const location = useLocation();
  const baseUrl = "https://www.ecoreheating.com";
  useEffect(() => {
    document.title = `${title} | ecoreheating.com`;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonical || `${baseUrl}${location.pathname}`);
    const setMetaTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    setMetaTag("og:title", title);
    setMetaTag("og:description", description);
    setMetaTag("og:url", canonical || `${baseUrl}${location.pathname}`);
    setMetaTag("og:type", "website");
    const schemaId = "seo-schema-data";
    let scriptElement = document.getElementById(schemaId);
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = schemaId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "EcoReheating",
      "url": "https://www.ecoreheating.com",
      "logo": "https://www.ecoreheating.com/og-image.jpg",
      "description": "Leader in industrial furnace energy efficiency solutions and Zero CAPEX optimization."
    };
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Industrial Furnace Optimization",
      "image": "https://www.ecoreheating.com/hero-bg.png",
      "description": "Reduce fuel consumption by 7-15% with CISA T80 verified technology.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CN"
      },
      "url": "https://www.ecoreheating.com/solutions"
    };
    scriptElement.text = JSON.stringify([organizationSchema, serviceSchema]);
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-7FKDBWSQJ7", {
        page_path: location.pathname + location.search
      });
    }
  }, [title, description, canonical, location.pathname, location.search]);
  return null;
};
const Home = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Zero CAPEX Reheating Furnace Efficiency",
        description: "Zero CAPEX reheating furnace optimization. Reduce fuel consumption by 7-15% with CISA T80 verified technology and our Energy Steward model for guaranteed savings."
      }
    ),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(ProjectPositioning, {}),
    /* @__PURE__ */ jsx(Technologies, {}),
    /* @__PURE__ */ jsx(ProcessCoverage, {}),
    /* @__PURE__ */ jsx(BenefitsSection, {}),
    /* @__PURE__ */ jsx(BusinessModel, {}),
    /* @__PURE__ */ jsx(SocialProof, {}),
    /* @__PURE__ */ jsx(LogoWall, {}),
    /* @__PURE__ */ jsx(ContactForm, {})
  ] });
};
const Solutions = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Integrated Energy-Saving Solutions",
        description: "Comprehensive furnace optimization: Process simulation, T80 extreme efficiency standards, and AI-driven control for consistent heating and reduced defects."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "pt-40 pb-20 bg-industrial-950 text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-heading font-bold mb-6", children: "Integrated Energy-Saving Solutions" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-3xl leading-relaxed", children: "Integrated energy-saving solution for reheating furnaces and soaking pits in steel rolling mills, built around the ‘energy steward’ model pioneered with Jinnan Steel." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 border-b border-slate-100", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold text-industrial-900 mb-6", children: "Process Scope" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8 leading-relaxed", children: "Our solutions address the entire thermal journey of the steel product, ensuring consistency and efficiency from start to finish." }),
        /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          "Continuous caster exit",
          "Soaking pits integration",
          "Walking beam reheating furnaces",
          "Walking hearth reheating furnaces",
          "Rolling mill entry synchronization"
        ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center text-gray-700", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { size: 18, className: "text-furnace-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: item })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:w-1/2 bg-slate-50 p-8 rounded-2xl border border-slate-100 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-furnace-600 font-black text-6xl mb-2", children: "T80" }),
        /* @__PURE__ */ jsx("div", { className: "text-industrial-900 font-bold uppercase tracking-widest text-sm", children: "Extreme Efficiency Standards" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold text-industrial-900 mb-12 text-center", children: "Pain Points & Solution Strategy" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-100", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-industrial-950 text-white", children: [
          /* @__PURE__ */ jsx("th", { className: "p-6 font-heading uppercase tracking-widest text-sm", children: "Pain Point" }),
          /* @__PURE__ */ jsx("th", { className: "p-6 font-heading uppercase tracking-widest text-sm", children: "Solution Module" }),
          /* @__PURE__ */ jsx("th", { className: "p-6 font-heading uppercase tracking-widest text-sm", children: "Expected Direction" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-slate-100", children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-900 mb-2", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-red-500" }),
                " High fuel consumption"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Inefficient insulation and unoptimized burner control leading to excessive gas/fuel bills." })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-6 align-top", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-950 mb-2", children: [
              /* @__PURE__ */ jsx(Lightbulb, { size: 16, className: "text-furnace-500" }),
              " Full-fiber roof + combustion optimization"
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-industrial-900 mb-1 text-sm", children: [
                "Fuel consumption: ",
                ">",
                "10% reduction target (Full Fiber Roof)"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-industrial-900 mb-1 text-sm", children: [
                "Fuel consumption: ",
                ">",
                "5% reduction (Smart Combustion)"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] leading-tight text-gray-500 italic", children: "Combined modernization targets to achieve T80 extreme efficiency benchmarks." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-900 mb-2", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-red-500" }),
                " High oxidation scale loss"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Excessive furnace atmosphere leading to metal surface loss." })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-6 align-top", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-950 mb-2", children: [
              /* @__PURE__ */ jsx(Lightbulb, { size: 16, className: "text-furnace-500" }),
              " Non-ceramic coatings + intelligent reheating"
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-industrial-900 mb-1 text-sm", children: "Oxidation Loss: 0.1%–0.5% reduction target" }),
              /* @__PURE__ */ jsx("div", { className: "font-bold text-industrial-900 mb-1 text-sm", children: "Yield: +0.1–0.5 percentage points improvement" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] leading-tight text-gray-500 italic", children: "Domestic leading levels achievement based on T80-validated intelligent reheating and functional coatings." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-900 mb-2", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-red-500" }),
                " Unstable furnace temp"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Inconsistent heating quality affecting the subsequent rolling stage." })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-6 align-top", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-950 mb-2", children: [
              /* @__PURE__ */ jsx(Lightbulb, { size: 16, className: "text-furnace-500" }),
              " Intelligent reheating control (AI)"
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-industrial-900 mb-1 text-sm", children: [
                "Exit temperature hit rate: ",
                ">",
                "95% design target"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] leading-tight text-gray-500 italic", children: "AI-supported intelligent reheating aims to keep reheating furnace exit temperature within tight bands, reducing downstream quality deviations." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-900 mb-2", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-red-500" }),
                " Frequent maintenance"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Short lifespan of traditional furnace linings under extreme thermal cycling." })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-6 align-top", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 font-bold text-industrial-950 mb-2", children: [
              /* @__PURE__ */ jsx(Lightbulb, { size: 16, className: "text-furnace-500" }),
              " Enhanced linings & coatings"
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "p-6 align-top", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-industrial-900 mb-1 text-sm", children: "Maintenance intervals: extended by one major shutdown cycle (target)" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] leading-tight text-gray-500 italic", children: "Full-fiber roof and non-ceramic functional coatings are designed to reduce lining wear and unplanned shutdowns; actual intervals depend on your operation profile." })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 text-center px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 italic font-medium", children: "All target ranges are based on China Iron and Steel Association's T80 extreme energy efficiency benchmarks and similar reheating furnace retrofit cases. Actual performance will be determined after baseline assessment at your plant." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold text-industrial-900 mb-16", children: "How it Works" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-heading font-black text-2xl mb-2 text-furnace-600", children: "01" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-900 font-bold text-sm", children: "Data Collection" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block text-slate-300", children: "→" }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-heading font-black text-2xl mb-2 text-furnace-600", children: "02" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-900 font-bold text-sm", children: "Process Simulation" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block text-slate-300", children: "→" }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-heading font-black text-2xl mb-2 text-furnace-600", children: "03" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-900 font-bold text-sm", children: "Modernization" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block text-slate-300", children: "→" }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-heading font-black text-2xl mb-2 text-furnace-600", children: "04" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-900 font-bold text-sm", children: "Online Optimization" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block text-slate-300", children: "→" }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-heading font-black text-2xl mb-2 text-furnace-600", children: "05" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-900 font-bold text-sm", children: "Long-term Steward" })
        ] })
      ] })
    ] }) })
  ] });
};
const PerformanceList = () => {
  const sections = [
    {
      title: "Strip Steel Reheating Furnaces",
      projects: [
        { client: "Qian'an Jiujiang Wire Rod", detail: "1250mm Strip 220t/h Reheating Furnace" },
        { client: "Shanxi Gaoyi Iron & Steel", detail: "1250mm Strip Cold Charging 210t/h" },
        { client: "Tangshan Guotang Special Steel", detail: "1100mm Strip 200t/h Reheating Furnace" },
        { client: "Shanxi Gaoyi", detail: "1000mm Strip 180t/h Reheating Furnace" },
        { client: "Jinjiang Zhonghui", detail: "900mm Strip 215t/h Reheating Furnace" },
        { client: "Hebei Fengnan Bensen", detail: "850mm Strip 160t/h Reheating Furnace" },
        { client: "Cangzhou Middle Iron", detail: "850mm Strip 180t/h Reheating Furnace" },
        { client: "Guangxi Liugang Zhongjin", detail: "850mm Stainless Strip 150t/h" },
        { client: "Fujian Fuxin", detail: "780mm Strip 250t/h Reheating Furnace" },
        { client: "Shanxi Gaoyi", detail: "750mm Strip 180t/h Reheating Furnace" },
        { client: "Tangshan Guotang", detail: "650mm Strip 215t/h Reheating Furnace" },
        { client: "Shanxi Longmen", detail: "650mm Strip 200t/h Reheating Furnace" },
        { client: "Guangdong Hongtai", detail: "650mm Strip 150t/h Reheating Furnace" },
        { client: "Guangdong Fogang Jincheng", detail: "650mm Strip 120t/h Reheating Furnace" },
        { client: "Qian'an Jiujiang", detail: "650mm Strip 180t/h Reheating Furnace" },
        { client: "Hangtian Union", detail: "650mm Strip Reheating Furnace" },
        { client: "Shanxi Gaoyi", detail: "650mm Strip Reheating Furnace" },
        { client: "Guangdong Fogang Jincheng", detail: "650mm Strip 180t/h Reheating Furnace" }
      ]
    },
    {
      title: "Bar & Wire Reheating Furnaces",
      projects: [
        { client: "Bangladesh KSRM Steel", detail: "150t/h Side Charge/Discharge Furnace", isInternational: true },
        { client: "Vietnam Shengli (Thang Long)", detail: "120t/h Cold Charging Furnace", isInternational: true },
        { client: "Indonesia DCP Steel", detail: "100t/h Dual Fuel (Gas/Natural Gas)", isInternational: true },
        { client: "Malaysia Ann Joo Steel", detail: "90t/h Dual Fuel Reheating Furnace", isInternational: true },
        { client: "Ethiopia Steel Plant", detail: "50t/h Oil/Gas Dual Fuel Furnace", isInternational: true },
        { client: "Jiangsu Binxin Steel", detail: "250t/h Regenerative Walking Beam Furnace" },
        { client: "Dazhou Iron & Steel", detail: "240t/h BFG Regenerative Furnace" },
        { client: "Dazhou Iron & Steel", detail: "220t/h BFG Regenerative Furnace" },
        { client: "Yunnan Qujing Minyuan", detail: "Dual High Speed Bar 220t/h Reheating Furnace" },
        { client: "Shanxi Longmen", detail: "220t/h BFG Regenerative Furnace" },
        { client: "Yancheng Liansin", detail: "200t/h Reheating Furnace (Cold Charging)" },
        { client: "Dazhi Hualu", detail: "200t/h BFG Regenerative Furnace" },
        { client: "Qian'an Jiujiang", detail: "200t/h BFG Regenerative Furnace" },
        { client: "Fangda Special Steel", detail: "BFG Regenerative Walking Beam Furnace" },
        { client: "Nanchang Changli", detail: "200t/h BFG Regenerative Furnace" },
        { client: "Fengnan Bensen", detail: "190t/h Natural Gas Regenerative Furnace" },
        { client: "Lianyugang Binxin Steel", detail: "180t/h BFG Regenerative Furnace" },
        { client: "Shanxi Xinyu", detail: "180t/h Coal/Gas Dual Fuel Furnace" },
        { client: "Shandong Binxin", detail: "180t/h BFG Regenerative Walking Beam Furnace" },
        { client: "Longyan Shengfeng", detail: "180t/h BFG Regenerative Furnace" },
        { client: "Shanxi Shengtai", detail: "170t/h BFG Regenerative Furnace" },
        { client: "Fangda Special Steel", detail: "150t/h BFG Regenerative Furnace" },
        { client: "Dazhou Iron & Steel", detail: "150t/h BFG Regenerative Furnace" },
        { client: "Sichuan Desheng Group", detail: "150t/h BFG Regenerative Reheating Furnace" },
        { client: "Jiangsu Binxin Steel", detail: "150t/h Producer Gas to Natural Gas Retrofit" },
        { client: "Shanxi Jinnan Steel", detail: "150t/h Coal/Gas Regenerative Reheating Furnace" },
        { client: "Zhongwei Energy", detail: "150t/h Coal Bed Methane Reheating Furnace" },
        { client: "Jiangsu Hehua", detail: "150t/h Producer Gas Single Regenerative Furnace" },
        { client: "Dongtai Jinyuan", detail: "150t/h Natural Gas Reheating Furnace" },
        { client: "Shanxi Gaoyi", detail: "150t/h BFG Regenerative Reheating Furnace" },
        { client: "Shanxi Jianlong", detail: "140t/h Regenerative Reheating Furnace" },
        { client: "Shanxi Jinnan Steel", detail: "140t/h BFG Regenerative Reheating Furnace" },
        { client: "Chongqing Fengdu Metal", detail: "140t/h Natural Gas Regenerative Furnaces" },
        { client: "Hebei Hongzhong", detail: "140t/h BFG Regenerative Reheating Furnace" },
        { client: "Jiangsu Binxin Steel", detail: "130t/h Regenerative Reheating Furnace" },
        { client: "Shandong Binxin", detail: "130t/h BFG Regenerative Reheating Furnace" },
        { client: "Zhonghaicheng", detail: "130t/h Natural Gas Reheating Furnace" },
        { client: "Fangda Special Steel", detail: "120t/h BFG Regenerative Reheating Furnace" },
        { client: "Shanxi Gaoyi", detail: "120t/h BFG Regenerative Reheating Furnace" },
        { client: "Tangshan Guotang", detail: "120t/h Reheating Furnace" },
        { client: "Xinzhou Zhongyuan", detail: "120t/h BFG Regenerative Furnace" },
        { client: "Qian'an Jiujiang", detail: "120t/h BFG Regenerative Furnace" },
        { client: "Ningxia Tailier", detail: "120t/h Coal/Gas Reheating Furnace" },
        { client: "Chongqing Yonghang", detail: "120t/h Natural Gas Reheating Furnace" },
        { client: "Fangda Special Steel", detail: "110t/h Natural Gas Regenerative Reheating Furnace" },
        { client: "Qinghuangdao Yaoxin", detail: "100t/h Coal Bed Methane Reheating Furnace" },
        { client: "Tangshan Guotang", detail: "100t/h Reheating Furnace" },
        { client: "Qian'an Jiujiang", detail: "90t/h Natural Gas Regenerative Furnace" },
        { client: "Qian'an Jiujiang", detail: "80t/h Natural Gas Regenerative Furnace" },
        { client: "Xinjidong State", detail: "80t/h BFG Regenerative Reheating Furnace" },
        { client: "Qian'an Jiujiang", detail: "70t/h Natural Gas Regenerative Furnace" },
        { client: "Dongtai Jinyuan", detail: "60t/h Natural Gas Reheating Furnace" },
        { client: "Jiangsu Shenli", detail: "60t/h High Efficiency Regenerative Furnace" }
      ]
    },
    {
      title: "Section Steel Reheating Furnaces",
      projects: [
        { client: "Guangxi Wuzhou", detail: "300t/h BFG Regenerative Walking Beam Furnace" },
        { client: "Guangxi Wuzhou", detail: "235t/h BFG Regenerative Walking Beam Furnace" },
        { client: "Guangxi Wuzhou", detail: "200t/h BFG Regenerative Reheating Furnace" },
        { client: "Shanxi Jinnan Steel", detail: "180t/h Coal/Gas Composite Reheating Furnace" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Global Reheating Furnace Track Record",
        description: "Browse our extensive portfolio of reheating furnace optimizations across strip steel, bar/wire, and section steel production lines worldwide."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-40 pb-20 bg-industrial-950 text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-furnace-600/10 skew-x-12 transform translate-x-20" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-furnace-600/20 text-furnace-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-furnace-600/30", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 14 }),
          " Global Track Record"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-heading font-bold mb-6", children: "Proven Industrial Excellence" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-400 max-w-3xl leading-relaxed", children: [
          "Extensive deployment across ",
          /* @__PURE__ */ jsx("span", { className: "text-furnace-500 font-bold", children: "100+ production lines" }),
          ", delivering extreme energy efficiency to leading steel producers from China to Southeast Asia."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsx("div", { className: "space-y-32", children: sections.map((section, idx) => /* @__PURE__ */ jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-industrial-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl", children: idx + 1 }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold text-industrial-900 uppercase tracking-tight", children: section.title }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-grow bg-slate-200" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: section.projects.map((project, pIdx) => /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group/card relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-1 h-0 group-hover/card:h-full bg-furnace-600 transition-all duration-500" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-industrial-950 text-lg group-hover/card:text-furnace-600 transition-colors leading-tight", children: project.client }),
          project.isInternational && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100", children: [
            /* @__PURE__ */ jsx(Globe, { size: 10 }),
            " International"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6 leading-relaxed", children: project.detail }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-furnace-600 font-bold text-xs group/link cursor-pointer pt-4 border-t border-slate-50", children: [
          "Performance Verified ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "group-hover/link:translate-x-1 transition-transform" })
        ] })
      ] }, pIdx)) })
    ] }, idx)) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-industrial-950 text-white text-center", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Ready to join our portfolio of excellence?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-10 max-w-xl mx-auto", children: "Our specialists can analyze your furnace baseline and project potential savings based on these real-world benchmarks." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/about#assessment",
          className: "inline-block px-10 py-4 bg-furnace-600 text-white font-bold rounded-full hover:bg-furnace-500 transition-all shadow-xl hover:shadow-furnace-600/20",
          children: "Discuss Your Project"
        }
      )
    ] }) })
  ] });
};
const CAS_DOSSIER_DATA = {
  "Sichuan Desheng Group": {
    originalText: [
      "四川德胜集团钒钛有限公司轧钢厂",
      "一车间加热炉大修项目节能报告",
      "南方节能科技（贵州）有限公司于2021年11月15日至2022年1月13日，对我公司轧钢厂一车间加热炉进行了大修设计、施工节能改造总承包。",
      "通过南方节能科技（贵州）有限公司的整体优化设计和对节能轻型纤维炉顶的应用，自2022年1月13日顺利出钢生产后，经过几个月的观察统计测算：加热炉加热能力显著提升，钢坯温度均匀、氧化烧损减少，吨钢节能降耗效果明显，和之前对比吨钢节能率>30%。"
    ],
    translatedText: [
      "Sichuan Desheng Group Vanadium-Titanium Co., Ltd. Rolling Mill",
      "Energy Efficiency Report: Record-Breaking Major Reheating Furnace Overhaul",
      "South Energy Saving Tech performed the EPC for the comprehensive furnace overhaul and technical modernization from Nov 2021 to Jan 2022.",
      "Peak Performance Result: By completely replacing the refractory roof and integrating AI control, we maximized total thermal efficiency far beyond standard retrofits, achieving a massive comprehensive energy gain of ≥30%."
    ],
    introduction: "Sichuan Desheng Group is the largest private steel enterprise in Sichuan and a Top 500 China Private Enterprise. This major overhaul project set a new benchmark for comprehensive efficiency recovery in aging furnace systems.",
    reportDate: "June 6, 2022"
  },
  "Jiangsu Binxin Steel": {
    originalText: [
      "江苏省镔鑫钢铁集团有限公司",
      "260t/h双高棒加热炉项目成果说明",
      "镔鑫钢铁坐落于连云港市赣榆区柘汪临港产业区，沿海布局核心优势明显，具有发展钢铁工业得天独厚的先天条件，全国民营企业500强。",
      "我司承建的冷装能力260t/h双高棒加热炉项目，通过应用智慧加热控制技术与全纤维结构优化，投产后吨钢煤气消耗、氧化烧损指标均处于国内领先水平。"
    ],
    translatedText: [
      "Jiangsu Binxin Steel Group Co., Ltd.",
      "Project Summary: 260t/h Double-High Speed Bar Reheating Furnace",
      "Located in Lianyugang's coastal industrial zone with strategic logistics advantages, Binxin Steel is a China Top 500 Private Enterprise.",
      "The 260t/h double-high bar reheating furnace project (cold charging) utilizes intelligent heating control and fiber structure optimization. Post-commissioning gas consumption and oxidation loss metrics rank among the industry's elite."
    ],
    introduction: "Binxin Steel is a strategic coastal steel production base in East China. This project demonstrated the extreme precision of our AI atmosphere control in high-speed bar production lines.",
    reportDate: "October 12, 2023"
  },
  "Fangda Special Steel": {
    originalText: [
      "江西方大钢铁集团有限公司",
      "方大特钢加热炉节能改造项目简报",
      "方大钢铁是一所以钢铁为主业，向汽车弹簧、矿业、国内外贸易等行业多元发展的大型钢铁联合企业。公司年产钢能力2000万吨。",
      "我司为方大特钢完成了两座加热炉的系统性节能改造项目，通过热工制度优化与先进内衬技术应用，实测节能效果均达到了20%以上。"
    ],
    translatedText: [
      "Jiangxi Fangda Iron & Steel Group Co., Ltd.",
      "Fangda Special Steel Reheating Furnace Efficiency Retrofit Brief",
      "A large-scale steel conglomerate with diversified operations in automotive components and mining, boasting an annual capacity of 20 million tons.",
      "We completed systematic energy-saving retrofits for two furnaces at Fangda Special Steel. Through thermal regime optimization and advanced lining technology, verified energy savings exceeded 20%."
    ],
    introduction: "Fangda Special Steel is a global leader in automotive spring steel. Our optimization helped maintain their competitive edge by drastically reducing fuel intensity in their core heating process.",
    reportDate: "March 20, 2023"
  },
  "Fogang Jincheng": {
    originalText: [
      "佛冈金城金属制品公司",
      "全纤维炉顶带钢加热炉项目报告",
      "佛冈金城主要经营生产、加工、销售钢铁产品；冶炼普碳钢、不锈钢、特种钢；轧制线材、螺纹棒材、带钢等深加工钢铁制品。",
      "我司承建的全纤维炉顶带钢加热炉项目，在同等工况下，通过显著降低炉顶散热与蓄热损失，节能效果均达到了15%以上。"
    ],
    translatedText: [
      "Fogang Jincheng Metal Products Co., Ltd.",
      "Project Report: Full-Fiber Roof Strip Reheating Furnace",
      "Specializes in the production and deep processing of specialty steels, including stainless steel, threading bars, and strip steel products.",
      "The full-fiber roof retrofit project for the strip reheating furnace achieved over 15% energy savings under equivalent operating conditions by minimizing radiant heat loss and thermal inertia."
    ],
    introduction: "Jincheng Metal's multi-product rolling lines require high thermal flexibility. Our full-fiber solution provided the rapid response and efficiency needed for their diverse production schedule.",
    reportDate: "August 15, 2022"
  }
};
const CaseDossier = ({ isOpen, onClose, client, image }) => {
  const data = CAS_DOSSIER_DATA[client];
  if (!isOpen || !data) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] bg-industrial-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 bg-slate-100 flex flex-col border-r border-slate-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-200/50 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FileText, { size: 18, className: "text-industrial-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-industrial-900", children: "Original Technical Evidence" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 px-2 py-0.5 bg-white/80 rounded border border-slate-300", children: [
          /* @__PURE__ */ jsx(Search, { size: 12, className: "text-slate-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500 font-medium", children: "Verified Scan" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-grow overflow-auto p-4 md:p-8 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-white shadow-xl border border-slate-300 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[90%] md:max-w-full", children: /* @__PURE__ */ jsx("img", { src: image, alt: "Original Document", className: "w-full h-auto shadow-sm" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 flex flex-col bg-white overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-industrial-950 flex justify-between items-center sticky top-0 z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-white", children: [
          /* @__PURE__ */ jsx(Globe, { size: 18, className: "text-furnace-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: "Digital Twin & Translation" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-white/60 hover:text-white transition-colors", children: /* @__PURE__ */ jsx(X, { size: 24 }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-12 space-y-10", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(Info, { size: 16, className: "text-furnace-600" }),
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400", children: "Project Context" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-industrial-900 font-medium leading-relaxed border-l-4 border-furnace-500 pl-6 text-sm", children: data.introduction })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "space-y-8", children: data.originalText.map((text, idx) => /* @__PURE__ */ jsx("div", { className: "group flex flex-col gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-400", children: idx + 1 }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-xs italic font-serif leading-relaxed", children: [
              '"',
              text,
              '"'
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-industrial-900 font-bold leading-relaxed", children: data.translatedText[idx] })
          ] })
        ] }) }, idx)) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-slate-100 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 uppercase tracking-widest font-bold", children: "Certification Date" }),
            /* @__PURE__ */ jsx("p", { className: "text-industrial-950 font-bold text-sm", children: data.reportDate })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { size: 12 }),
            " Authenticated"
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const HeroCase = ({ title, client, companySummary, metric, result, desc, image, isReversed, onOpenDossier }) => /* @__PURE__ */ jsxs("div", { className: `flex flex-col lg:flex-row items-stretch gap-0 rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-100 mb-20 ${isReversed ? "lg:flex-row-reverse" : ""}`, children: [
  /* @__PURE__ */ jsxs("div", { className: "lg:w-[40%] relative group overflow-hidden bg-industrial-950 p-12 flex items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-furnace-500 via-transparent to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative z-10 w-full aspect-[3/4] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.02] transition-transform duration-700 cursor-pointer overflow-hidden rounded-sm",
        onClick: onOpenDossier,
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: client,
              className: "w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-industrial-950/30 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-furnace-600/0 group-hover:bg-furnace-600/10 transition-colors flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-3 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 translate-y-4 group-hover:translate-y-0 duration-500", children: /* @__PURE__ */ jsx(Search, { className: "text-furnace-600", size: 24 }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white rounded p-1 shrink-0", children: /* @__PURE__ */ jsx("img", { src: image, className: "w-full h-full object-contain", alt: "thumbnail" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-white/80 text-[8px] uppercase tracking-[0.2em] font-black block", children: "Authenticated Plate" }),
        /* @__PURE__ */ jsx("p", { className: "text-white text-[10px] font-medium leading-tight", children: "Click to expand technical autopsy." })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "lg:w-[60%] p-12 flex flex-col justify-center", children: [
    /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block", children: title }),
    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-heading font-bold text-industrial-900 mb-2", children: client }),
    companySummary && /* @__PURE__ */ jsx("p", { className: "text-furnace-600/80 font-bold text-[10px] uppercase tracking-wider mb-6", children: companySummary }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1", children: metric }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-4xl font-heading font-black text-industrial-900 tracking-tighter", children: result }),
          result === "≥30%" && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-industrial-900 text-white text-[8px] font-black uppercase tracking-widest rounded", children: "Peak Performance" })
        ] }),
        result === "≥30%" && /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400 mt-1 italic leading-tight", children: "Includes fuel reduction & yield improvement" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-end pb-1", children: /* @__PURE__ */ jsxs("div", { className: "px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { size: 12 }),
        " Verified Data"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed mb-8", children: desc }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: onOpenDossier,
        className: "flex items-center gap-2 text-industrial-950 font-bold hover:text-furnace-600 transition-colors group/btn",
        children: [
          "Full Technical Report ",
          /* @__PURE__ */ jsx(TrendingDown, { size: 18, className: "group-hover/btn:translate-y-1 transition-transform" })
        ]
      }
    )
  ] })
] });
const HeroCases = () => {
  const [dossierClient, setDossierClient] = useState(null);
  useEffect(() => {
    if (dossierClient) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [dossierClient]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-50", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Furnace Modernization Success Stories",
        description: "Explore our T80-verified reheating furnace modernization case studies. See how major steel mills achieved >30% efficiency gains with Zero CAPEX."
      }
    ),
    /* @__PURE__ */ jsx(
      CaseDossier,
      {
        isOpen: !!dossierClient,
        onClose: () => setDossierClient(null),
        client: dossierClient || "",
        image: dossierClient === "Sichuan Desheng Group" ? "/desheng.png" : dossierClient === "Jiangsu Binxin Steel" ? "/binxin.png" : dossierClient === "Fangda Special Steel" ? "/dafang.png" : dossierClient === "Fogang Jincheng" ? "/jincheng.png" : ""
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "pt-40 pb-20 bg-industrial-950 text-white text-center", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-heading font-bold mb-6", children: "High-Conversion Case Studies" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed", children: "Data-driven results from the field, authenticated by client-stamped proof and technical audits." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx(
        HeroCase,
        {
          title: "Major Overhaul & Retrofit",
          client: "Sichuan Desheng Group",
          companySummary: "Largest Private Steel Enterprise in Sichuan · Top 500 China Private Enterprises",
          metric: "Record-Breaking Efficiency",
          result: "≥30%",
          desc: "Unlike standard optimization (7–15%), this major overhaul project achieved a massive ≥30% comprehensive efficiency gain by combining our Full-Fiber Roof technology with AI Combustion Control, significantly reducing oxidation loss.",
          image: "/desheng.png",
          onOpenDossier: () => setDossierClient("Sichuan Desheng Group")
        }
      ),
      /* @__PURE__ */ jsx(
        HeroCase,
        {
          title: "Surface Quality & Yield",
          client: "Jiangsu Binxin Steel",
          companySummary: "Strategic Coastal Production Base · China Top 500 Private Enterprise",
          metric: "Oxidation Scale",
          result: "<0.4%",
          desc: "Implementation of intelligent atmosphere control achieving domestic leading levels of oxidation loss reduction and yield improvement.",
          isReversed: true,
          image: "/binxin.png",
          onOpenDossier: () => setDossierClient("Jiangsu Binxin Steel")
        }
      ),
      /* @__PURE__ */ jsx(
        HeroCase,
        {
          title: "Efficiency Modernization",
          client: "Fangda Special Steel",
          companySummary: "Annual Capacity 20M Tons · Diversified Industrial Conglomerate",
          metric: "Gas Consumption",
          result: "-21.8%",
          desc: "Modernization project drop gas consumption from 228m³/t down to 178.3m³/t through systematic thermal optimization.",
          image: "/dafang.png",
          onOpenDossier: () => setDossierClient("Fangda Special Steel")
        }
      ),
      /* @__PURE__ */ jsx(
        HeroCase,
        {
          title: "Structural Retrofit",
          client: "Fogang Jincheng",
          companySummary: "Specialty Steel Deep Processing · Comprehensive Rolling Operations",
          metric: "Fuel Saving",
          result: ">15%",
          desc: "Full-fiber furnace roof retrofit demonstration showing rapid ROI and significant reduction in thermal inertia and standby heat loss.",
          isReversed: true,
          image: "/jincheng.png",
          onOpenDossier: () => setDossierClient("Fogang Jincheng")
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "full-performance-list", className: "border-t border-slate-200", children: /* @__PURE__ */ jsx(PerformanceList, {}) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-industrial-900 text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold mb-8", children: "Ready for Your Free ROI Audit?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-10 max-w-2xl mx-auto", children: "Connect with our 'Energy Steward' specialists to analyze your current baseline and project potential savings based on these benchmarks." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/about#assessment",
          className: "inline-block px-10 py-4 bg-furnace-600 hover:bg-furnace-500 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-furnace-500/20 active:scale-95",
          children: "Get Free ROI Audit"
        }
      )
    ] }) })
  ] });
};
const CaseStudies = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-50", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Jinnan Steel Energy Steward Project",
        description: "Analysis of the pioneering energy steward model at Jinnan Steel Group, featuring full-fiber roof retrofit and intelligent reheating control."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-40 pb-20 bg-industrial-950 text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-furnace-600/30 animate-pulse" }) }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 relative z-10 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-furnace-500 font-black tracking-widest uppercase text-xs mb-4 block", children: "Selected Success Story" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-heading font-bold mb-6", children: "Energy Steward Project at JINNAN STEEL GROUP" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed", children: "Domestic pioneering energy steward model launch as a green, low-carbon demonstration and resource utilization benchmark." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold text-industrial-900 mb-6 underline decoration-furnace-500 underline-offset-8", children: "Plant & Process" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-lg leading-relaxed", children: [
            "JINNAN STEEL GROUP (Shanxi, China) is an integrated steel producer with a complete steel rolling process. The project focuses on the ",
            /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "Reheating furnace and 5th caster soaking pit" }),
            " in their steel rolling process."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-8 rounded-2xl bg-slate-50 border border-slate-100 italic text-gray-500 border-l-4 border-l-furnace-600", children: '"Jointly implemented by SOUTH TECHNOLOGY, DONGMING GREEN ENERGY, and JINNAN STEEL GROUP to build a green, low-carbon demonstration project."' }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4", children: [
            /* @__PURE__ */ jsx(Target, { className: "text-furnace-600 shrink-0", size: 24 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-industrial-950 mb-1", children: "AI Integration" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Full-process thermal management powered by proprietary AI algorithms." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 shrink-0", size: 24 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-industrial-950 mb-1", children: "Safe Operation" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Long-term steward service ensuring 24/7 reliability and performance monitoring." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-industrial-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-10 -right-10 w-40 h-40 bg-furnace-600 rounded-full blur-3xl opacity-20" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-heading font-bold mb-8 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Database, { className: "text-furnace-500" }),
          " Technical Scope"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-furnace-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold mb-1", children: "Full-fiber furnace roof retrofit" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Total replacement of traditional roof with high-efficiency fiber lining to minimize thermal inertia." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-furnace-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold mb-1", children: "Intelligent reheating control" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "End-to-end optimization from caster exit to furnace exit, ensuring precise temperature uniformity." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-furnace-500 mt-2 shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold mb-1", children: "High-Emissivity functional coatings" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Applied on critical furnace lining areas to reduce oxidation scale and protect refractory surfaces." })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50 border-t border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold text-industrial-900", children: "Project Performance Targets" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-4 italic", children: "Benchmarks aligned with T80 Extreme Efficiency standards" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-furnace-600 font-heading font-black text-4xl mb-2", children: "7–15%" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-900 font-bold text-xs uppercase tracking-widest mb-4", children: "Target Fuel Saving" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs text-left", children: "Per ton of steel, based on T80 extreme efficiency benchmarks for reheating furnaces." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center font-bold", children: [
          /* @__PURE__ */ jsx("div", { className: "text-furnace-600 font-heading font-black text-4xl mb-2", children: "5–15%" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-900 font-bold text-xs uppercase tracking-widest mb-4", children: "Scale Loss Reduction" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs text-left font-normal", children: "Significant decrease in surface metal loss due to atmosphere control." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-furnace-600 font-heading font-black text-4xl mb-2", children: "0.1–0.3%" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-900 font-bold text-xs uppercase tracking-widest mb-4", children: "Yield Improvement" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs text-left", children: "Incremental gain in saleable material across the entire reheating process." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx(BarChart4, { className: "mx-auto text-furnace-600 mb-2", size: 32 }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-900 font-bold text-xs uppercase tracking-widest mb-2 font-heading", children: "Benchmark Achievement" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-[10px] leading-tight font-light", children: "Engineered to achieve high-efficiency resource utilization benchmarks." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-20 p-8 rounded-2xl bg-white border border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-furnace-100 p-6 rounded-2xl", children: /* @__PURE__ */ jsx(Database, { className: "text-furnace-600", size: 48 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-industrial-950 font-bold text-xl mb-2 uppercase tracking-tight", children: "Note on performance:" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed italic", children: "“The exact performance depends on each plant’s baseline and process, but the project is designed and implemented to meet or exceed T80-level performance benchmarks established by the China Iron and Steel Association.”" })
        ] })
      ] }) })
    ] }) })
  ] });
};
const AboutContact = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "About South Technology & Contact Us",
        description: "Expert engineering for industrial furnaces since 2014. Contact us for turnkey energy-saving solutions and thermal process optimization."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "pt-40 pb-20 bg-industrial-950 text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-heading font-bold mb-6", children: "About & Contact" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-3xl leading-relaxed", children: "Leading the transition to extreme energy efficiency in the steel industry through advanced thermal engineering and AI optimization." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-20 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-black tracking-widest uppercase text-xs mb-4 block", children: "Our Company" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-heading font-bold text-industrial-900 mb-2", children: "SOUTH TECHNOLOGY" }),
        /* @__PURE__ */ jsx("p", { className: "text-furnace-600 font-bold mb-8 uppercase tracking-wider text-sm", children: "Engineering Excellence Since 2014" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-lg leading-relaxed mb-6", children: [
          "Headquartered in Shanghai's prestigious ",
          /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "Hopson International Center" }),
          ", South Technology is a leading engineering enterprise specialized in turnkey (EPC) solutions for industrial furnaces and environmental systems."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-lg leading-relaxed mb-6", children: [
          "Since our strategic technology transfer from ",
          /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "UK-based FCS in 2014" }),
          ", we have successfully implemented advanced British thermal engineering in ",
          /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "nearly 300 production lines" }),
          " globally, achieving comprehensive energy efficiency gains of ",
          /* @__PURE__ */ jsx("span", { className: "text-furnace-600 font-bold", children: "up to 20%" }),
          " (including yield improvements) for major facility retrofits."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed mb-8", children: 'Guided by the mission of industrial carbon neutrality, we have evolved from a specialized manufacturer into an "Energy Steward" service provider, integrating full-fiber roof technology and AI-supported smart combustion to deliver sustainable industrial wealth.' }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-industrial-950 text-white rounded-2xl border border-slate-100 mb-8 flex items-center justify-center gap-6 shadow-xl relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-furnace-600/10 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "text-2xl md:text-3xl font-heading font-black italic text-center relative z-10", children: [
            '"Mastering Energy. ',
            /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
            ' Creating Wealth."'
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md", children: [
          /* @__PURE__ */ jsx("div", { className: "relative group/img overflow-hidden rounded-2xl shadow-lg border border-slate-100", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/fcs-signing.jpg",
              alt: "Strategic Alliance 2014",
              className: "h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed", children: [
            "Strategic Alliance Signing (2014): ",
            /* @__PURE__ */ jsx("br", {}),
            "Chairman Chao & Michael (FCS UK Legal Representative)"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600", children: /* @__PURE__ */ jsx(Users, { size: 32 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-industrial-900 mb-2", children: "Strategic Alliance" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 leading-relaxed", children: [
              "Backed by ",
              /* @__PURE__ */ jsx("span", { className: "text-industrial-950 font-bold", children: "Dongming Green Energy" }),
              " for robust capital support, ensuring zero-risk project delivery for large-scale steel groups."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600", children: /* @__PURE__ */ jsx(Globe, { size: 32 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-industrial-900 mb-2", children: "Global Vision" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed", children: "Demonstrated excellence across nearly 300 production lines globally, setting the benchmark for low-carbon metallurgy and extreme resource utilization." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-furnace-600", children: /* @__PURE__ */ jsx(TrendingUp, { size: 32 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-industrial-900 mb-2", children: "Innovation Driven" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed", children: "Continuous R&D in AI-supported smart combustion control and advanced regenerative refractory materials." })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50 border-y border-slate-200", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "order-2 md:order-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-heading font-bold text-industrial-900 mb-6", children: "Technical Foundation & Global Credentials" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8 leading-relaxed", children: "Our strength lies in a high-caliber professional team covering thermal processes, mechanical design, electrical automation, environmental engineering, and vaporization cooling. This integrated expertise allows us to provide truly seamless turnkey solutions with strict quality control and a dedicated after-sales service system." }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border border-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-industrial-950 mb-1", children: "300+" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 uppercase tracking-widest font-bold", children: "Production Lines" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-xl border border-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-industrial-950 mb-1", children: "Up to 20%" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 uppercase tracking-widest font-bold", children: "Comprehensive Gain" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-8 gap-y-2 pt-4 border-t border-slate-200", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40", children: "Integrity" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40", children: "Innovation" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40", children: "Shared Success" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] font-black text-industrial-950/40", children: "Dedication" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "order-1 md:order-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md ml-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "relative group/img overflow-hidden rounded-2xl shadow-lg border border-white", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/patent-wall.png",
            alt: "Technical Patent Wall",
            className: "h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 text-center uppercase tracking-widest", children: "Core Intellectual Property & Global Patent Portfolio" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 bg-slate-50 border-t border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-heading font-bold text-industrial-900", children: "Get in Touch" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-4 max-w-2xl mx-auto", children: "Whether you're looking for an energy audit, technical consultation, or partnership opportunities, our experts are ready to assist." })
      ] }),
      /* @__PURE__ */ jsx(ContactForm, {}),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 flex flex-col md:flex-row justify-center gap-12 text-center md:text-left border-t border-slate-200 pt-16", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "text-xs font-black uppercase tracking-widest text-industrial-950 mb-2", children: "Global Operations" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Headquartered in Shanghai, China, with a global engineering hub serving steel mills across Asia and beyond." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "text-xs font-black uppercase tracking-widest text-industrial-950 mb-2", children: "Email Inquiry" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "contact@ecoreheating.com" })
        ] })
      ] })
    ] }) })
  ] });
};
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(App, {}),
    children: [
      {
        path: "",
        element: /* @__PURE__ */ jsx(Home, {})
      },
      {
        path: "solutions",
        element: /* @__PURE__ */ jsx(Solutions, {})
      },
      {
        path: "hero-cases",
        element: /* @__PURE__ */ jsx(HeroCases, {})
      },
      {
        path: "case-studies",
        element: /* @__PURE__ */ jsx(CaseStudies, {})
      },
      {
        path: "about",
        element: /* @__PURE__ */ jsx(AboutContact, {})
      }
    ]
  }
];
const createApp = ViteReactSSG(
  { routes }
);
export {
  createApp
};
