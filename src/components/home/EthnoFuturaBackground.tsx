import React, { useMemo } from "react";

interface FloatingCube {
  id: number;
  size: number;
  left: number; // percentage
  top: number; // percentage
  depth: number;
  duration: number; // seconds
  delay: number; // seconds
  color: "cyan" | "indigo" | "emerald" | "amber";
  rotateZ: number;
}

export const EthnoFuturaBackground: React.FC = () => {
  // Light geometric cubes positioned strategically around the stećak center
  const cubes: FloatingCube[] = useMemo(
    () => [
      { id: 1, size: 28, left: 18, top: 22, depth: 1.1, duration: 9, delay: 0, color: "cyan", rotateZ: 12 },
      { id: 2, size: 42, left: 28, top: 48, depth: 1.3, duration: 12, delay: 1.5, color: "cyan", rotateZ: -18 },
      { id: 3, size: 22, left: 35, top: 16, depth: 0.9, duration: 8, delay: 3, color: "indigo", rotateZ: 25 },
      { id: 4, size: 50, left: 72, top: 28, depth: 1.4, duration: 13, delay: 0.8, color: "cyan", rotateZ: 15 },
      { id: 5, size: 32, left: 82, top: 52, depth: 1.0, duration: 10, delay: 2.2, color: "emerald", rotateZ: -12 },
      { id: 6, size: 24, left: 64, top: 18, depth: 0.8, duration: 7.5, delay: 4, color: "cyan", rotateZ: 30 },
      { id: 7, size: 36, left: 45, top: 72, depth: 1.2, duration: 11, delay: 1.1, color: "cyan", rotateZ: -8 },
      { id: 8, size: 18, left: 52, top: 12, depth: 0.7, duration: 8.5, delay: 2.7, color: "amber", rotateZ: 45 },
      { id: 9, size: 30, left: 12, top: 62, depth: 1.0, duration: 10.5, delay: 3.5, color: "indigo", rotateZ: 20 },
      { id: 10, size: 26, left: 88, top: 20, depth: 0.85, duration: 9.2, delay: 1.8, color: "cyan", rotateZ: -22 },
    ],
    []
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Underlying Stećak Ethno-Futura Architectural Motif */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full max-w-7xl object-cover scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="steckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C9A7" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00C9A7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Monolithic Stećak Silhouette with Circuit Engravings */}
          <g opacity="0.85">
            {/* Pedestal & Monolith Outline */}
            <path
              d="M 400 680 L 800 680 L 830 730 L 370 730 Z"
              stroke="url(#steckGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 430 260 L 770 260 L 800 680 L 400 680 Z"
              stroke="url(#steckGrad)"
              strokeWidth="2"
            />
            {/* Stećak Gabled Crest */}
            <path
              d="M 430 260 L 600 180 L 770 260"
              stroke="url(#steckGrad)"
              strokeWidth="2.5"
            />

            {/* Ethno Spirals and Rosettes (Radimlja motif inspiration) */}
            <circle cx="600" cy="380" r="70" stroke="#00C9A7" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="600" cy="380" r="45" stroke="#C9A84C" strokeWidth="1.5" />
            <circle cx="600" cy="380" r="18" fill="#00C9A7" fillOpacity="0.2" stroke="#00C9A7" strokeWidth="2" />
            <path
              d="M 600 310 L 600 450 M 530 380 L 670 380"
              stroke="#06B6D4"
              strokeWidth="1"
              strokeOpacity="0.6"
            />

            {/* Medieval Bosnian Lilium / Stylized Fleur Motif */}
            <path
              d="M 600 480 C 585 520, 560 550, 530 560 C 565 570, 595 550, 600 620 C 605 550, 635 570, 670 560 C 640 550, 615 520, 600 480 Z"
              stroke="url(#steckGrad)"
              strokeWidth="1.75"
              fill="rgba(201, 168, 76, 0.05)"
            />

            {/* Cyber Circuit Lines radiating from Stećak */}
            <path d="M 430 300 L 250 300 L 200 350 L 80 350" stroke="#06B6D4" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
            <path d="M 770 300 L 950 300 L 1000 350 L 1120 350" stroke="#06B6D4" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
            <path d="M 415 480 L 280 480 L 220 540 L 120 540" stroke="#00C9A7" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
            <path d="M 785 480 L 920 480 L 980 540 L 1080 540" stroke="#00C9A7" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />

            <circle cx="80" cy="350" r="3" fill="#00C9A7" />
            <circle cx="1120" cy="350" r="3" fill="#C9A84C" />
            <circle cx="120" cy="540" r="3" fill="#06B6D4" />
            <circle cx="1080" cy="540" r="3" fill="#00C9A7" />
          </g>
        </svg>
      </div>

      {/* 2. Cybernetic Gradient Overlays for High Contrast & Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/85 via-[#020617]/75 to-[#020617] backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#020617_85%)]" />

      {/* 3. Subtle IT Cybernetic Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:4rem_4rem] animate-tech-drift" />

      {/* 4. Ambient Energy Light Pulses around the Monument */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[580px] h-[340px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[360px] h-[260px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[380px] h-[280px] bg-fuchsia-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 5. Floating Glowing Cubes ("svjetlosne kocke") orbiting the stećak */}
      <div className="absolute inset-0">
        {cubes.map((cube) => {
          const colorStyles = {
            cyan: {
              border: "border-cyan-400/50",
              glow: "shadow-[0_0_18px_rgba(6,182,212,0.45)]",
              bg: "bg-cyan-500/10",
              innerDot: "bg-cyan-300",
            },
            indigo: {
              border: "border-indigo-400/40",
              glow: "shadow-[0_0_16px_rgba(99,102,241,0.35)]",
              bg: "bg-indigo-500/10",
              innerDot: "bg-indigo-300",
            },
            emerald: {
              border: "border-emerald-400/45",
              glow: "shadow-[0_0_16px_rgba(52,211,153,0.35)]",
              bg: "bg-emerald-500/10",
              innerDot: "bg-emerald-300",
            },
            amber: {
              border: "border-amber-400/45",
              glow: "shadow-[0_0_16px_rgba(251,191,36,0.35)]",
              bg: "bg-amber-500/10",
              innerDot: "bg-amber-300",
            },
          }[cube.color];

          return (
            <div
              key={cube.id}
              className="absolute animate-floating-cube"
              style={{
                left: `${cube.left}%`,
                top: `${cube.top}%`,
                width: `${cube.size}px`,
                height: `${cube.size}px`,
                animationDuration: `${cube.duration}s`,
                animationDelay: `${cube.delay}s`,
                transform: `scale(${cube.depth}) rotate(${cube.rotateZ}deg)`,
              }}
            >
              {/* Isometric / Cyber 3D Light Cube */}
              <div
                className={`relative w-full h-full rounded-md border ${colorStyles.border} ${colorStyles.bg} ${colorStyles.glow} backdrop-blur-[1px] transition-all duration-700 flex items-center justify-center`}
                style={{
                  transform: "perspective(600px) rotateX(25deg) rotateY(-25deg)",
                }}
              >
                {/* Glowing edge accents */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <div
                  className={`w-1.5 h-1.5 rounded-full ${colorStyles.innerDot} shadow-[0_0_8px_currentColor] animate-ping`}
                  style={{ animationDuration: `${cube.duration * 0.7}s` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EthnoFuturaBackground;
