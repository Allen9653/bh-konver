import { useLanguage } from "@/hooks/useLanguage";
import { Globe, ArrowRight } from "lucide-react";

export function LegalLanguageNotice() {
  const { language, activeOption, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs backdrop-blur-sm sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-foreground">
        <Globe className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
        <div>
          <span className="font-semibold">
            {isEnglish ? "Current Document Language: " : "Trenutni jezik dokumenta: "}
          </span>
          <span className="font-bold text-primary">{activeOption.name}</span>
          <span className="text-muted-foreground ml-1.5 hidden sm:inline">
            {isEnglish
              ? "— All terms & policies apply equally in both English and Bosnian."
              : "— Sva pravila i uslovi jednako važe na bosanskom i engleskom jeziku."}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 sm:mt-0 shrink-0">
        <button
          type="button"
          onClick={() => setLanguage(isEnglish ? "bs" : "en")}
          className="inline-flex min-h-[32px] items-center gap-1 rounded-lg border border-primary/30 bg-background px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span>{isEnglish ? "Prebaci na Bosanski" : "Switch to English"}</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
