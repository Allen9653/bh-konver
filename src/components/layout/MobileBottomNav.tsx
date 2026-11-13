import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calculator, ClipboardCheck, Home, Repeat2, WandSparkles } from "lucide-react";
import { useDeviceAdaptation } from "@/contexts/DeviceAdaptationContext";

/**
 * Thumb-zone bottom navigation bar automatically displayed when iOS or Android adaptation is active.
 * Respects iPhone safe-area-inset-bottom and enforces >= 44px touch targets within compact height.
 */
export const MobileBottomNav: React.FC = () => {
  const { isMobileAdapted, effectivePlatform } = useDeviceAdaptation();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (!isMobileAdapted) return null;

  const isIOS = effectivePlatform === "ios";

  const items = [
    {
      label: t("nav.home", "Početna"),
      to: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      label: t("deviceAdaptation.tabConverters", "Konvertori"),
      to: "/category/konvertori",
      icon: Repeat2,
      active:
        pathname.startsWith("/category/konvertori") ||
        pathname.startsWith("/alati") ||
        pathname.startsWith("/modul") ||
        pathname.startsWith("/slika-pdf"),
    },
    {
      label: t("deviceAdaptation.tabGenerators", "Generatori"),
      to: "/category/generatori",
      icon: WandSparkles,
      active: pathname.startsWith("/category/generatori"),
    },
    {
      label: t("deviceAdaptation.tabCalculators", "Kalkulatori"),
      to: "/category/kalkulatori",
      icon: Calculator,
      active: pathname.startsWith("/category/kalkulatori") || pathname.startsWith("/kalkulatori"),
    },
    {
      label: t("deviceAdaptation.tabTests", "Testovi"),
      to: "/testovi",
      icon: ClipboardCheck,
      active: pathname.startsWith("/testovi") || pathname.startsWith("/category/testovi"),
    },
  ];

  return (
    <nav
      aria-label={t("deviceAdaptation.mobileNavLabel", "Mobilna brza navigacija")}
      className={`fixed inset-x-0 bottom-0 z-50 border-t transition-colors ${
        isIOS
          ? "border-white/15 bg-slate-950/75 backdrop-blur-2xl"
          : "border-cyan-500/25 bg-slate-950/90 backdrop-blur-xl shadow-[0_-6px_24px_rgba(0,0,0,0.5)]"
      }`}
      style={{
        paddingBottom: "max(0.35rem, env(safe-area-inset-bottom, 0px))",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 items-center px-1 pt-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-semibold transition-all active:scale-95 ${
                item.active
                  ? "text-cyan-400"
                  : "text-slate-300/80 hover:text-white"
              }`}
            >
              <span
                className={`flex h-7 w-10 items-center justify-center transition-colors ${
                  isIOS ? "rounded-full" : "rounded-2xl"
                } ${item.active ? "bg-cyan-500/20 text-cyan-300" : ""}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="truncate max-w-full leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
