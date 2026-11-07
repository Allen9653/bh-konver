import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Globe, Check, ChevronDown } from "lucide-react";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import {
  useLanguage,
  SUPPORTED_LANGUAGES,
  normalizeLanguageCode,
  type Script,
  type LanguageOption,
} from "@/hooks/useLanguage";

export { SUPPORTED_LANGUAGES, normalizeLanguageCode };
export type { Script, LanguageOption };

const cyrillicTranslit = CyrillicToTranslit();

export const LanguageSwitcher = () => {
  const { language, activeOption, setLanguage, supportedLanguages } = useLanguage();

  const isEnglish = language === "en";
  const isBosnianLatin = language === "bs";

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Izbor jezika / Language selector">
      {/* Prominent Direct BS / EN Segmented Switcher */}
      <div className="inline-flex items-center rounded-lg border border-border/80 bg-muted/50 p-0.5 shadow-sm">
        <button
          type="button"
          onClick={() => setLanguage("bs")}
          className={`flex min-h-[32px] items-center gap-1 rounded-md px-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            isBosnianLatin
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Prebaci na Bosanski jezik"
          aria-pressed={isBosnianLatin}
        >
          <span>BS</span>
          <span className="hidden lg:inline font-normal text-[11px] opacity-90">· Bosanski</span>
        </button>

        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`flex min-h-[32px] items-center gap-1 rounded-md px-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            isEnglish
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Switch to English"
          aria-pressed={isEnglish}
        >
          <span>EN</span>
          <span className="hidden lg:inline font-normal text-[11px] opacity-90">· English</span>
        </button>
      </div>

      {/* Dropdown for other languages (Cyrillic, German, Turkish) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-border/80 bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-sm"
            aria-label={`Više jezika (trenutno: ${activeOption.name})`}
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-1.5 bg-background/95 backdrop-blur-md border-border shadow-xl z-50">
          <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Svi jezici / All languages
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1" />

          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between px-2.5 py-2 text-xs rounded-md cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border leading-none ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {lang.short}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs">{lang.nativeName}</span>
                    <span className="text-[10px] text-muted-foreground">{lang.name}</span>
                  </div>
                </div>

                {isSelected && (
                  <Check className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Hook to use script conversion for backward compatibility
export const useScript = () => {
  const [script, setScript] = useState<Script>(() => {
    try {
      return (localStorage.getItem("script") as Script) || "latin";
    } catch {
      return "latin";
    }
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleScriptChange = () => {
      try {
        const storedScript = localStorage.getItem("script") as Script;
        if (storedScript) {
          setScript(storedScript);
        } else if (i18n.language === "bs-Cyrl") {
          setScript("cyrillic");
        } else {
          setScript("latin");
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("scriptchange", handleScriptChange);
    window.addEventListener("languagechange", handleScriptChange);
    return () => {
      window.removeEventListener("scriptchange", handleScriptChange);
      window.removeEventListener("languagechange", handleScriptChange);
    };
  }, [i18n.language]);

  const convertText = (text: string): string => {
    if ((i18n.language === "bs-Cyrl" || script === "cyrillic") && text) {
      return cyrillicTranslit.transform(text, "-");
    }
    return text;
  };

  return { script, convertText };
};
