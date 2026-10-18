import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BackButton } from "@/components/common/BackButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import {
  ArrowRight,
  Barcode,
  Calculator,
  ChevronDown,
  ClipboardCheck,
  Copy,
  FileImage,
  FileText,
  Link2,
  Menu,
  QrCode,
  Repeat2,
  Ruler,
  Type,
  WandSparkles,
  X,
  BookOpen,
  Shield,
  User,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import logo from "@/assets/bh-konver-logo.png";

const toolGroups = [
  {
    label: "GENERATORI",
    image: "/categories/generatori.png",
    icon: WandSparkles,
    columns: [
      {
        title: "Generatori",
        items: [
          { label: "Europass CV Generator", to: "/category/generatori?tab=cv", icon: FileText },
          { label: "UUID Generator", to: "/category/generatori?tab=uuid", icon: Copy },
          { label: "QR Code Generator", to: "/category/generatori?tab=qr", icon: QrCode },
          { label: "Slug Generator", to: "/category/generatori?tab=slug", icon: Link2 },
          { label: "Barcode Generator", to: "/category/generatori?tab=barcode", icon: Barcode },
        ],
      },
    ],
  },
  {
    label: "KONVERTORI",
    image: "/categories/konvertori.png",
    icon: Repeat2,
    columns: [
      {
        title: "Tekst i podaci",
        items: [
          { label: "Jedinice", to: "/category/konvertori?tab=unit", icon: Ruler },
          { label: "Valute", to: "/category/konvertori?tab=currency" },
          { label: "Ćirilica / Latinica", to: "/category/konvertori?tab=script", icon: Type },
          { label: "Text Case", to: "/category/konvertori?tab=case" },
        ],
      },
      {
        title: "Mjere i formati",
        items: [
          { label: "Hidžretski datum", to: "/category/konvertori?tab=hijri" },
          { label: "Dužina", to: "/category/konvertori?tab=length", icon: Ruler },
          { label: "Rimski brojevi", to: "/category/konvertori?tab=roman" },
          { label: "Temperatura", to: "/category/konvertori?tab=temperature" },
        ],
      },
      {
        title: "Konverzija datoteka",
        items: [
          { label: "Freemium alati", to: "/alati", icon: WandSparkles },
          { label: "Audio", to: "/modul/audio" },
          { label: "Video", to: "/modul/video" },
          { label: "Image", to: "/slika-pdf", icon: FileImage },
          { label: "PDF", to: "/alati", icon: FileText },
        ],
      },
    ],
  },
  {
    label: "KALKULATORI",
    image: "/categories/kalkulatori.png",
    icon: Calculator,
    columns: [
      {
        title: "Kalkulatori",
        items: [
          { label: "Gorivo", to: "/kalkulatori/gorivo" },
          { label: "PDV", to: "/kalkulatori/pdv" },
          { label: "Staž", to: "/kalkulatori/staz" },
          { label: "Struja", to: "/kalkulatori/struja" },
          { label: "Ostali kalkulatori", to: "/category/kalkulatori" },
        ],
      },
    ],
  },
  {
    label: "TESTOVI",
    image: "/categories/testovi.png",
    icon: ClipboardCheck,
    columns: [
      {
        title: "Testovi i provjere",
        items: [
          { label: "Historija i kultura BiH", to: "/testovi/opste-znanje" },
          { label: "Saobraćajni testovi", to: "/testovi/saobracajni" },
          { label: "IQ test", to: "/testovi/logika" },
          { label: "Test ličnosti", to: "/testovi/licnost" },
        ],
      },
    ],
  },
];

const toolLinkClass =
  "group flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/75 transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const categoryPaths = {
  GENERATORI: "/category/generatori",
  KONVERTORI: "/category/konvertori",
  KALKULATORI: "/category/kalkulatori",
  TESTOVI: "/category/testovi",
  BLOG: "/blog",
};

export const Navbar = ({ activeCategory, onCategoryChange }) => {
  const { t } = useTranslation();
  const { user, isAdmin, signOut } = useAdminAuth();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const selectCategory = (category) => {
    if (onCategoryChange) onCategoryChange(category);
    else navigate(categoryPaths[category]);
  };

  const getGroupLabel = (groupKey) => {
    switch (groupKey) {
      case "GENERATORI":
        return t("nav.generators", "GENERATORI");
      case "KONVERTORI":
        return t("nav.converters", "KONVERTORI");
      case "KALKULATORI":
        return t("nav.calculators", "KALKULATORI");
      case "TESTOVI":
        return t("nav.tests", "TESTOVI");
      default:
        return groupKey;
    }
  };

  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[4.5rem] max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="BH KONVER, početna stranica"
            onClick={() => {
              closeMenus();
              onCategoryChange?.("Home");
            }}
          >
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
            <span className="font-display text-base font-bold text-foreground sm:text-lg">
              BH <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">KONVER</span>
            </span>
          </Link>

          {location.pathname !== "/" && (
            <BackButton label={t("nav.back", "Nazad")} className="py-1.5 px-3 text-xs" />
          )}
        </div>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Glavna navigacija">
          {toolGroups.map((group) => {
            const Icon = group.icon;
            const isOpen = openMenu === group.label;
            const labelText = getGroupLabel(group.label);
            return (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold text-foreground/75 transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isOpen || activeCategory === group.label ? "bg-muted text-primary" : ""}`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => {
                    selectCategory(group.label);
                    setOpenMenu(isOpen ? null : group.label);
                  }}
                >
                  <img src={group.image} alt="" className="h-4 w-4 object-contain" />
                  {labelText}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className={`absolute left-1/2 top-full z-50 mt-3 ${group.columns.length > 1 ? "w-[min(92vw,48rem)]" : "w-[min(92vw,22rem)]"} -translate-x-1/2 rounded-lg border border-border bg-background p-4 shadow-xl`}>
                    <div className={`grid gap-5 ${group.columns.length > 1 ? "sm:grid-cols-3" : "grid-cols-1"}`}>
                      {group.columns.map((column) => (
                        <div key={column.title}>
                          <h2 className="mb-2 px-3 text-[11px] font-bold uppercase text-muted-foreground">{column.title}</h2>
                          <div className="flex flex-col">
                            {column.items.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <Link key={item.label} to={item.to} className={toolLinkClass} onClick={closeMenus}>
                                  <span className="flex items-center gap-2.5">
                                    {ItemIcon && <ItemIcon className="h-4 w-4 text-primary/75" aria-hidden="true" />}
                                    {item.label}
                                  </span>
                                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <Link
            to="/blog"
            onClick={closeMenus}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              activeCategory === "BLOG" ? "bg-muted text-primary" : "text-foreground/75"
            }`}
          >
            <img src="/categories/blog.png" alt="" className="h-4 w-4 object-contain" />
            {t("nav.blog", "BLOG")}
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
          <GlobalSearch />
          <LanguageSwitcher />
          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500/25 transition-colors"
                >
                  <Shield className="h-3.5 w-3.5 text-amber-400" />
                  Admin Panel
                </Link>
              )}
              <Link
                to="/history"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors max-w-[150px] truncate"
                title={user.email || "Korisnički račun"}
              >
                <User className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{user.email?.split("@")[0] || "Korisnik"}</span>
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title={t("nav.logout", "Odjava")}
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{t("nav.logout", "Odjava")}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth?tab=login"
                className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {t("nav.login", "Prijava")}
              </Link>
              <Link
                to="/auth?tab=signup"
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t("nav.signup", "Registracija")}
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <GlobalSearch />
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={mobileOpen ? t("nav.closeNav", "Zatvori navigaciju") : t("nav.openNav", "Otvori navigaciju")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-border/70 bg-background px-4 py-3 shadow-lg xl:hidden" aria-label="Mobilna navigacija">
          <div className="mx-auto flex max-w-3xl flex-col">
            <div className="mb-3 pt-1">
              <GlobalSearch variant="full" />
            </div>
            {toolGroups.map((group) => {
              const Icon = group.icon;
              const isOpen = openMenu === group.label;
              return (
                <section key={group.label} className="border-b border-border/70 last:border-b-0">
                  <button
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between gap-3 px-2 text-left text-sm font-bold text-foreground"
                    aria-expanded={isOpen}
                    onClick={() => {
                      selectCategory(group.label);
                      setOpenMenu(isOpen ? null : group.label);
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      <img src={group.image} alt="" className="h-5 w-5 object-contain" />
                      {getGroupLabel(group.label)}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="grid gap-4 pb-4 sm:grid-cols-2">
                      {group.columns.map((column) => (
                        <div key={column.title}>
                          <h2 className="px-3 pb-1 text-[11px] font-bold uppercase text-muted-foreground">{column.title}</h2>
                          <div className="flex flex-col">
                            {column.items.map((item) => (
                              <Link key={item.label} to={item.to} className={toolLinkClass} onClick={closeMenus}>{item.label}</Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
            <Link
              to="/blog"
              onClick={closeMenus}
              className="flex min-h-12 w-full items-center justify-between gap-3 px-2 text-left text-sm font-bold text-foreground border-b border-border/70"
            >
              <span className="flex items-center gap-2.5">
                <img src="/categories/blog.png" alt="" className="h-5 w-5 object-contain" />
                {t("nav.blog", "BLOG")}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            {user ? (
              <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-border/70">
                <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
                  <span>{t("nav.signedInAs", "Prijavljeni kao")}:</span>
                  <span className="font-semibold text-foreground truncate max-w-[180px]">{user.email}</span>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 rounded-md bg-amber-500/15 border border-amber-500/30 px-4 py-2.5 text-sm font-semibold text-amber-400 hover:bg-amber-500/25"
                    onClick={closeMenus}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/history"
                    className="flex items-center justify-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-center text-sm font-semibold text-foreground hover:bg-muted"
                    onClick={closeMenus}
                  >
                    <User className="h-4 w-4 text-primary" />
                    Historija
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      closeMenus();
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-center text-sm font-semibold text-destructive hover:bg-destructive/20"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("nav.logout", "Odjava")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  to="/auth?tab=login"
                  className="rounded-md border border-border px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  onClick={closeMenus}
                >
                  {t("nav.login", "Prijava")}
                </Link>
                <Link
                  to="/auth?tab=signup"
                  className="rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  onClick={closeMenus}
                >
                  {t("nav.signup", "Registracija")}
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
