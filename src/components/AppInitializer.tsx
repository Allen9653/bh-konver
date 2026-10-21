import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage, normalizeLanguageCode } from "@/hooks/useLanguage";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // Check if URL search parameters specify language (?lang=en or ?lng=en)
    try {
      const searchParams = new URLSearchParams(location.search);
      const urlLang = searchParams.get("lang") || searchParams.get("lng");
      if (urlLang) {
        const normalized = normalizeLanguageCode(urlLang);
        if (normalized && normalized !== language) {
          setLanguage(normalized);
        }
      }
    } catch {
      // Ignore URL parse errors
    }
  }, [location.search, language, setLanguage]);

  useEffect(() => {
    // Ensure onboarding is marked completed so any legacy checks pass
    if (!localStorage.getItem("bh-konver-onboarding-complete")) {
      localStorage.setItem("bh-konver-onboarding-complete", "true");
    }
  }, []);

  return <>{children}</>;
};

export default AppInitializer;
