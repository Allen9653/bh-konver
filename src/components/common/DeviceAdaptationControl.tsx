import React from "react";
import { useTranslation } from "react-i18next";
import { Laptop, Smartphone, Sparkles, Video, VideoOff } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  useDeviceAdaptation,
  type AdaptationMode,
  type PlatformKind,
} from "@/contexts/DeviceAdaptationContext";

interface DeviceAdaptationControlProps {
  variant?: "compact" | "panel";
  className?: string;
}

const getPlatformLabel = (platform: PlatformKind, t: (k: string, d: string) => string) => {
  switch (platform) {
    case "ios":
      return t("deviceAdaptation.platformIos", "iOS");
    case "android":
      return t("deviceAdaptation.platformAndroid", "Android");
    default:
      return t("deviceAdaptation.platformDesktop", "Desktop");
  }
};

const AdaptationPanelContent: React.FC = () => {
  const { t } = useTranslation();
  const {
    mode,
    setMode,
    detectedPlatform,
    effectivePlatform,
    videoBgEnabled,
    setVideoBgEnabled,
  } = useDeviceAdaptation();

  const modes: { id: AdaptationMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "auto", label: t("deviceAdaptation.modeAuto", "Auto"), icon: Sparkles },
    { id: "ios", label: "iOS", icon: Smartphone },
    { id: "android", label: "Android", icon: Smartphone },
    { id: "desktop", label: "Desktop", icon: Laptop },
  ];

  const isAutoEnabled = mode === "auto";

  return (
    <div className="space-y-3.5 text-left">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-foreground">
            {t("deviceAdaptation.title", "Prilagodba za iOS / Android")}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {t("deviceAdaptation.detectedPrefix", "Detektovano")}:{" "}
            <span className="font-semibold text-cyan-400">
              {getPlatformLabel(detectedPlatform, t)}
            </span>
            {" · "}
            {t("deviceAdaptation.activePrefix", "Aktivno")}:{" "}
            <span className="font-semibold text-foreground">
              {getPlatformLabel(effectivePlatform, t)}
            </span>
          </p>
        </div>
        <Switch
          checked={isAutoEnabled}
          onCheckedChange={(checked) => setMode(checked ? "auto" : "desktop")}
          aria-label={t("deviceAdaptation.toggleAria", "Automatska prilagodba za iOS i Android uređaje")}
        />
      </div>

      <div className="grid grid-cols-4 gap-1.5" role="group" aria-label={t("deviceAdaptation.modeSelect", "Način prikaza uređaja")}>
        {modes.map((item) => {
          const Icon = item.icon;
          const active = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`flex min-h-[38px] flex-col items-center justify-center gap-0.5 rounded-lg border px-1.5 py-1.5 text-[11px] font-semibold transition-colors ${
                active
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                  : "border-border/70 bg-background/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
        <div className="flex items-center gap-2 min-w-0">
          {videoBgEnabled ? (
            <Video className="h-4 w-4 text-cyan-400 shrink-0" aria-hidden="true" />
          ) : (
            <VideoOff className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {t("deviceAdaptation.videoBgLabel", "Video pozadina")}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {t("deviceAdaptation.videoBgDesc", "Ambijentalni YouTube video")}
            </p>
          </div>
        </div>
        <Switch
          checked={videoBgEnabled}
          onCheckedChange={setVideoBgEnabled}
          aria-label={t("deviceAdaptation.videoBgToggleAria", "Uključi ili isključi video pozadinu")}
        />
      </div>
    </div>
  );
};

export const DeviceAdaptationControl: React.FC<DeviceAdaptationControlProps> = ({
  variant = "compact",
  className = "",
}) => {
  const { t } = useTranslation();
  const { isMobileAdapted, effectivePlatform } = useDeviceAdaptation();

  if (variant === "panel") {
    return (
      <div
        className={`rounded-xl border border-border/80 bg-card/85 p-3.5 backdrop-blur-md ${className}`}
      >
        <AdaptationPanelContent />
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            isMobileAdapted
              ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25"
              : "border-border/70 bg-card/70 text-foreground/80 hover:bg-muted hover:text-foreground"
          } ${className}`}
          aria-label={t("deviceAdaptation.title", "Prilagodba za iOS / Android")}
          title={t("deviceAdaptation.title", "Prilagodba za iOS / Android")}
        >
          {isMobileAdapted ? (
            <Smartphone className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
          ) : (
            <Laptop className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          )}
          <span className="hidden md:inline">
            {effectivePlatform === "ios"
              ? "iOS"
              : effectivePlatform === "android"
                ? "Android"
                : t("deviceAdaptation.shortLabel", "Uređaj")}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 border-border/80 bg-slate-950/95 p-4 text-foreground backdrop-blur-xl shadow-2xl"
      >
        <AdaptationPanelContent />
      </PopoverContent>
    </Popover>
  );
};

export default DeviceAdaptationControl;
