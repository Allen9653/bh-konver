import React from "react";

export const FluidTechBackground: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden select-none -z-10"
      aria-hidden="true"
    >
      {/* 1. Base dark background */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* 2. Fluid IT glowing mesh blobs that slowly drift */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-pulse pointer-events-none" style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 3. Subtle IT Cybernetic Grid Pattern with dynamic drift */}
      <div
        className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] animate-tech-drift"
      />

      {/* 4. Radial gradient focus to keep center readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_transparent_10%,_#020617_90%)]" />

      {/* 5. Subtle floating digital circuit nodes */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-dots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.2" fill="#06b6d4" opacity="0.6" />
              <line x1="30" y1="30" x2="60" y2="30" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
              <line x1="30" y1="30" x2="30" y2="60" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-dots)" />
        </svg>
      </div>
    </div>
  );
};

export default FluidTechBackground;
