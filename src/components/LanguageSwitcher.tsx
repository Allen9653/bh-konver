import { useState, useEffect, useCallback } from "react";
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

const cyrillicTranslit = CyrillicToTranslit();

export type Script = "latin" | "cyrillic";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  short: string;
  script?: Script;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "bs",
    name: "Bosanski (Latinica)",
    nativeName: "Bosanski",
    short: "BS",
    script: "latin",
  },
  {
    code: "bs-Cyrl",
    name: "Bosanski (Ćirilica)",
    nativeName: "Ћирилица",
    short: "ĆIR",
    script: "cyrillic",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    short: "EN",
  },
  {
    code: "de",
    name: "Deutsch",
    nativeName: "Deutsch",
    short: "DE",
  },
  {
    code: "tr",
    name: "Türkçe",
    nativeName: "Türkçe",
    short: "TR",
  },
];

/** Normalize various language code representations into supported codes */
export const normalizeLanguageCode = (code?: string): string => {
  if (!code) return "bs";
  const lower = code.toLowerCase().trim();
  if (lower === "bs-cyrl" || lower === "bs_cyrl" || lower === "sr" || lower === "sr-cyrl") {
    return "bs-Cyrl";
  }
  if (lower.startsWith("en")) return "en";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("tr")) return "tr";
  if (lower.startsWith("bs")) return "bs";
  return code;
};

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Internal reactive state to ensure immediate UI feedback across re-renders
  const [currentLangCode, setCurrentLangCode] = useState<string>(() => {
    return normalizeLanguageCode(i18n.language || localStorage.getItem("language") || "bs");
  });

  // Sync state whenever i18n triggers a languageChanged event
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLangCode(normalizeLanguageCode(lng));
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = useCallback(
    (code: string) => {
      const normalized = normalizeLanguageCode(code);
      setCurrentLangCode(normalized);

      // Persist to localStorage
      try {
        localStorage.setItem("language", normalized);
        if (normalized === "bs-Cyrl") {
          localStorage.setItem("script", "cyrillic");
        } else if (normalized === "bs") {
          localStorage.setItem("script", "latin");
        }
      } catch {
        // storage disabled in some private modes
      }

      // Tell i18next to change
      i18n.changeLanguage(normalized);

      // Dispatch global events for components listening to changes
      window.dispatchEvent(new Event("languagechange"));
      window.dispatchEvent(new Event("scriptchange"));
    },
    [i18n]
  );

  const activeOption =
    SUPPORTED_LANGUAGES.find((item) => item.code === currentLangCode) ||
    SUPPORTED_LANGUAGES[0];

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 px-2.5 sm:px-3 border-border/80 bg-background/80 hover:bg-muted font-medium text-foreground transition-all shadow-sm"
            aria-label={`Trenutni jezik: ${activeOption.name}. Kliknite za promjenu jezika.`}
          >
            <Globe className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 border border-primary/25 rounded px-1 py-0.2 leading-tight">
              {activeOption.short}
            </span>
            <span className="hidden md:inline text-xs truncate max-w-[85px]">
              {activeOption.nativeName}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground opacity-60" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-1.5 bg-background/95 backdrop-blur-md border-border shadow-xl z-50">
          <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Izbor jezika / Language
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1" />

          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLangCode;
            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
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
