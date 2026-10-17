import { useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  // Automatically retrieve, reconcile, and synchronize stored language on load
  useLanguage();

  useEffect(() => {
    // Ensure onboarding is marked completed so any legacy checks pass
    if (!localStorage.getItem("bh-konver-onboarding-complete")) {
      localStorage.setItem("bh-konver-onboarding-complete", "true");
    }
  }, []);

  return <>{children}</>;
};

export default AppInitializer;
