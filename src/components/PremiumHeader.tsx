import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BackButton } from "@/components/common/BackButton";
import { LogIn, LogOut, History, Shield, Crown } from "lucide-react";
import logo from "@/assets/bh-konver-logo.png";

interface PremiumHeaderProps {
  user: { email?: string } | null;
  isAdmin: boolean;
  isPremium: boolean;
  expiresAt: Date | null;
  onSignOut: () => void | Promise<void>;
  /** True while the auth session is still being rehydrated. */
  loading?: boolean;
}

export const PremiumHeader = ({ user, isAdmin, isPremium, expiresAt, onSignOut, loading = false }: PremiumHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleSignOut = async () => {
    try {
      await onSignOut();
      toast.success(t("auth.signedOut"));
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.success(t("auth.signedOut"));
    }
    // Return to the public homepage; the login option stays available there.
    navigate("/", { replace: true });
  };



  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-95" aria-label="BH KONVER početna">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-cyan-500/30 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300">
              <img
                src={logo}
                onError={(e) => {
                  e.currentTarget.src = "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/3dc8c276-3ec4-4061-99c1-7286e42958d3/1791857100458-a3ba0bc3/BH_Assistant.png";
                }}
                alt="BH Konver Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold font-display tracking-tight text-foreground leading-none block">
                BH <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">KONVER</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80 block mt-0.5">
                {t("nav.tagline", "Online alati & konverteri")}
              </span>
            </div>
          </Link>

          {location.pathname !== "/" && (
            <BackButton label={t("nav.back", "Nazad")} className="py-1 px-2.5 text-xs" />
          )}
        </div>

        <nav className="order-3 flex w-full items-center justify-center gap-1 border-t border-border/60 pt-2 sm:order-none sm:w-auto sm:border-0 sm:pt-0" aria-label="Glavna navigacija">
          {[
            { label: t("nav.generators", "GENERATORI"), to: "/category/generatori" },
            { label: t("nav.converters", "KONVERTORI"), to: "/category/konvertori" },
            { label: t("nav.calculators", "KALKULATORI"), to: "/category/kalkulatori" },
            { label: t("nav.tests", "TESTOVI"), to: "/category/testovi" },
            { label: t("nav.blog", "BLOG"), to: "/blog" },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="rounded-md px-2 py-2 text-[10px] font-bold text-foreground/75 transition-colors hover:bg-muted hover:text-primary sm:px-2.5 sm:text-xs">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <LanguageSwitcher />
          {loading ? (
            // Placeholder while the session rehydrates — prevents a flash of
            // either the signed-in or signed-out UI.
            <div className="h-8 w-24 rounded-md bg-muted animate-pulse" aria-hidden="true" />
          ) : user ? (

            <>
              <span className="text-xs text-muted-foreground hidden md:inline">{user.email}</span>
              {isAdmin && (
                <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="h-8 px-2" aria-label="Otvori admin panel">
                  <Shield className="h-3.5 w-3.5" />
                </Button>
              )}
              {isPremium && !isAdmin && (
                <span className="text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3" /> PRO
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={() => navigate("/history")} className="h-8 px-2" aria-label="Otvori historiju dokumenata">
                <History className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="h-8 px-2 sm:px-3 text-xs"
                aria-label={t("auth.signOut")}
              >
                <LogOut className="h-3.5 w-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">{t("auth.signOut")}</span>
              </Button>

            </>
          ) : (
            <Button size="sm" onClick={() => navigate("/auth")} className="h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
              <LogIn className="mr-1 h-3.5 w-3.5" />
              {t('quickActions.login')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
