import React from "react";

export type CategoryTheme = "blog" | "konvertori" | "generatori" | "kalkulatori" | "testovi";

interface AmbientCategoryBackdropProps {
  category: CategoryTheme;
  className?: string;
}

const CATEGORY_CONFIG: Record<
  CategoryTheme,
  {
    logo: string;
    title: string;
    haloGradient: string;
    secondaryHalo: string;
    accentColor: string;
  }
> = {
  blog: {
    logo: "/android-chrome-512x512.png", // Sijalica (BH KONVER novi logotip)
    title: "BH KONVER Sijalica",
    haloGradient: "radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(59, 130, 246, 0.15) 45%, rgba(245, 158, 11, 0.08) 70%, transparent 85%)",
    secondaryHalo: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 80%)",
    accentColor: "#06b6d4",
  },
  konvertori: {
    logo: "/categories/konvertori.png",
    title: "Konvertori",
    haloGradient: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.18) 50%, transparent 80%)",
    secondaryHalo: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 75%)",
    accentColor: "#10b981",
  },
  generatori: {
    logo: "/categories/generatori.png",
    title: "Generatori",
    haloGradient: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.18) 50%, transparent 80%)",
    secondaryHalo: "radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 75%)",
    accentColor: "#3b82f6",
  },
  kalkulatori: {
    logo: "/categories/kalkulatori.png",
    title: "Kalkulatori",
    haloGradient: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(234, 88, 12, 0.15) 50%, transparent 80%)",
    secondaryHalo: "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 75%)",
    accentColor: "#f59e0b",
  },
  testovi: {
    logo: "/categories/testovi.png",
    title: "Testovi",
    haloGradient: "radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(139, 92, 246, 0.18) 50%, transparent 80%)",
    secondaryHalo: "radial-gradient(circle, rgba(217, 70, 239, 0.18) 0%, transparent 75%)",
    accentColor: "#a855f7",
  },
};

export const AmbientCategoryBackdrop: React.FC<AmbientCategoryBackdropProps> = ({
  category,
  className = "",
}) => {
  const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.blog;
  const isBlog = category === "blog";

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Dynamic Atmospheric Light Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] opacity-30" />

      {/* Floating Animated & Illuminated Logo Container */}
      <div className="absolute top-[8%] sm:top-[12%] right-[5%] sm:right-[10%] md:right-[15%] w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] flex items-center justify-center">
        {/* Breathing Halo 1 */}
        <div
          className="absolute inset-0 rounded-full blur-[80px] sm:blur-[110px] animate-aura-pulse"
          style={{ background: config.haloGradient }}
        />

        {/* Pulsing Core Glow */}
        <div
          className="absolute inset-10 rounded-full blur-[60px] animate-pulse"
          style={{ background: config.secondaryHalo }}
        />

        {/* Ambient Orbiting Ring */}
        <div className="absolute inset-14 rounded-full border border-white/[0.04] animate-spin [animation-duration:35s]" />

        {/* The Animated Category / Bulb Logo */}
        <img
          src={config.logo}
          alt={config.title}
          className={`relative z-10 w-full h-full object-contain ${
            isBlog ? "animate-bulb-glow" : "animate-category-float"
          }`}
          style={{
            // Keeps readability crystal clear while making the artwork prominent and alive
            opacity: isBlog ? undefined : 0.18,
            filter: !isBlog
              ? `drop-shadow(0 0 40px ${config.accentColor}40)`
              : undefined,
          }}
          loading="lazy"
        />
      </div>

      {/* Subtle secondary floating glow in bottom-left for atmospheric balance */}
      <div
        className="absolute bottom-[-10%] left-[-5%] w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full blur-[100px] opacity-25 animate-aura-pulse [animation-delay:3s]"
        style={{ background: config.secondaryHalo }}
      />
    </div>
  );
};

export default AmbientCategoryBackdrop;
