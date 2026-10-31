import { CvLanguage } from "@/types/cv";
import { Sparkles, Check } from "lucide-react";

interface CvLanguageSelectorProps {
  language: CvLanguage;
  onLanguageChange: (lang: CvLanguage) => void;
  isUnlocked: boolean;
}

export function CvLanguageSelector({
  language,
  onLanguageChange,
  isUnlocked,
}: CvLanguageSelectorProps) {
  const isBosnian = language === "bs" || language === "bs-Cyrl";
  const isCyrillic = language === "bs-Cyrl";

  const languages = [
    {
      code: isCyrillic ? "bs-Cyrl" : "bs",
      name: "Bosanski / BHS",
      flag: "🇧🇦",
      subtext: "Domaći standard",
      tier: "free" as const,
      badgeText: "FREEMIUM · Besplatno",
    },
    {
      code: "en" as CvLanguage,
      name: "English",
      flag: "🇬🇧",
      subtext: "Global EU & International",
      tier: "premium" as const,
      badgeText: isUnlocked ? "Otključano ✓" : "PREMIUM · 2.00 € (~3.91 BAM)",
    },
    {
      code: "de" as CvLanguage,
      name: "Deutsch",
      flag: "🇩🇪",
      subtext: "Njemačka, Austrija, Švicarska",
      tier: "premium" as const,
      badgeText: isUnlocked ? "Otključano ✓" : "PREMIUM · 2.00 € (~3.91 BAM)",
    },
    {
      code: "tr" as CvLanguage,
      name: "Türkçe",
      flag: "🇹🇷",
      subtext: "Turska & međunarodno tržište",
      tier: "premium" as const,
      badgeText: isUnlocked ? "Otključano ✓" : "PREMIUM · 2.00 € (~3.91 BAM)",
    },
  ];

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">1</span>
            <span>KORAK 1: IZBOR JEZIKA I PISMA ŽIVOTOPISA</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-foreground mt-0.5">
            Na kojem jeziku želite Vaš Europass CV?
          </h2>
        </div>

        {/* Bosnian Script Sub-choice */}
        {isBosnian && (
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-muted/70 p-1 rounded-xl border border-border/80">
            <span className="text-xs font-semibold px-2 text-muted-foreground">Pismo:</span>
            <button
              type="button"
              onClick={() => onLanguageChange("bs")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                !isCyrillic
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-background/80"
              }`}
            >
              Latinica (Abeceda)
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("bs-Cyrl")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                isCyrillic
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-background/80"
              }`}
            >
              Ћирилица (Азбука)
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {languages.map((item) => {
          const isSelected =
            (item.code === "bs" && isBosnian) ||
            (item.code === "bs-Cyrl" && isBosnian) ||
            language === item.code;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                if (item.name.startsWith("Bosanski")) {
                  onLanguageChange(isCyrillic ? "bs-Cyrl" : "bs");
                } else {
                  onLanguageChange(item.code);
                }
              }}
              className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all group ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                  : "border-border/80 bg-background hover:border-primary/40 hover:bg-muted/40"
              }`}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs shadow-sm">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
              )}

              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl" role="img" aria-label={item.name}>
                  {item.flag}
                </span>
                <span className="font-bold text-sm sm:text-base text-foreground">
                  {item.name}
                </span>
              </div>

              <span className="text-xs text-muted-foreground mb-3">
                {item.subtext}
              </span>

              <span
                className={`mt-auto inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  item.tier === "free"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : isUnlocked
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {item.tier === "premium" && !isUnlocked && <Sparkles className="h-3 w-3" />}
                {item.badgeText}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
