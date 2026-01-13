import React, { useMemo } from 'react';

const logos = [
  { src: '/logos/logo2.png', alt: 'Jianlong Steel' },
  { src: '/logos/logo3.png', alt: 'Jinnan Steel' },
  { src: '/logos/logo1.png', alt: 'Danieli' },
  { src: '/logos/logo6.png', alt: 'Anyang Iron & Steel' },
  { src: '/logos/logo8.png', alt: 'KSRM' },
  { src: '/logos/logo4.png', alt: 'Jingye Group' },
  { src: '/logos/logo5.png', alt: 'Fangda Steel' },
  { src: '/logos/logo7.png', alt: 'Liuzhou Steel' },
  { src: '/logos/logo9.png', alt: 'Jingxi Group' },
  { src: '/logos/logo10.png', alt: 'Shaanxi Steel' },
];

const LogoMarquee: React.FC = () => {
  // Apple-style Refinement: Subtlety is key.
  // 1. Reduced height (22px) for a more sophisticated, "technical" look.
  // 2. Increased gap (120px) to provide premium "breathing room".
  // 3. Muted base opacity (0.25) to act as a background trust signal rather than a distraction.

  const LOGO_HEIGHT = 22;
  const GAP_WIDTH = 120;

  const duplicatedLogos = useMemo(() => [...logos, ...logos], []);

  return (
    <div className="relative w-full h-[60px] overflow-hidden flex items-center marquee-container">
      {/* Precision Edge Fading */}
      <div className="absolute inset-0 z-20 pointer-events-none marquee-mask" />

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
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height: `${LOGO_HEIGHT}px` }}
              className="logo-img"
            />
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

        .logo-img {
          width: auto;
          object-fit: contain;
          opacity: 0.25; /* Muted base state for Apple-like subtlety */
          filter: grayscale(100%) brightness(180%);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* Smoother transition */
          pointer-events: auto;
        }

        .logo-img:hover {
          opacity: 0.9;
          filter: grayscale(0%) brightness(100%);
          transform: scale(1.08); /* Sophisticated micro-interaction */
        }

        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            /* Precise loop calculation: moving single set + half the gap */
            transform: translate3d(calc(-50% - ${GAP_WIDTH / 2}px), 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default LogoMarquee;
