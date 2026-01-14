import React, { useMemo } from 'react';

const logos = [
  "DANIELI", "JIANLONG STEEL", "JINNAN STEEL", "LIUZHOU STEEL", "FANGDA GROUP",
  "JINGYE GROUP", "TIANGONG INTER.", "NANSHAN GROUP", "SHAANXI STEEL", "KSRM", "AKS STEEL"
];

const LogoMarquee: React.FC = () => {
  const LOGO_HEIGHT = 18; // Slightly smaller for marquee
  const GAP_WIDTH = 100;

  const duplicatedLogos = useMemo(() => [...logos, ...logos], []);

  return (
    <div className="relative w-full h-[50px] overflow-hidden flex items-center marquee-container">
      {/* Precision Edge Fading */}
      <div className="absolute inset-0 z-20 pointer-events-none" />

      {/* Flat Track for zero-overlap reliability */}
      <div
        className="marquee-track flex items-center"
        style={{ gap: `${GAP_WIDTH}px` }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center translate-z-0"
          >
            <span
              className="logo-text text-white/30 font-black whitespace-nowrap tracking-tighter hover:text-white/80 transition-all duration-500 cursor-default"
              style={{
                fontSize: `${LOGO_HEIGHT}px`,
                fontFamily: '"Oswald", "Inter", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              {logo}
            </span>
          </div>
        ))}
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};

export default LogoMarquee;
