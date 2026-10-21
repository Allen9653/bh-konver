import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Facebook, Instagram, Mail, Music2, Youtube } from "lucide-react";
import logo from "@/assets/bh-konver-logo.png";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/SpajamoKultureStvaramoSanse", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/bh.assist/", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@bhassst", icon: Music2 },
  { label: "YouTube", href: "https://www.youtube.com/@Assistant-d1y", icon: Youtube },
];

const footerLinkClass =
  "w-fit text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export const SocialLinks = ({ className = "mt-5 flex items-center gap-2" }) => (
  <nav className={className} aria-label="BH KONVER na društvenim mrežama">
    {socialLinks.map(({ label, href, icon: Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`BH KONVER na mreži ${label}`}
        title={label}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-current/25 text-current/70 transition-colors hover:bg-current/10 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </a>
    ))}
  </nav>
);

export const Footer = ({ activeCategory, onNavigate }) => {
  const { t } = useTranslation();

  const footerColumns = [
    {
      title: t("footer.navigation", "Navigacija"),
      links: [
        { label: t("footer.home", "Početna"), to: "/", category: "Home" },
        { label: t("footer.blog", "Blog & Vodiči"), to: "/blog", category: "BLOG" },
        { label: t("footer.categories", "Kategorije alata"), to: "/category/generatori", category: "GENERATORI" },
        { label: t("footer.allTools", "Svi alati"), to: "/alati", category: "KONVERTORI" },
      ],
    },
    {
      title: t("footer.toolsAndModules", "Alati i moduli"),
      links: [
        { label: t("footer.converters", "Konvertori"), to: "/category/konvertori", category: "KONVERTORI" },
        { label: t("footer.calculators", "Kalkulatori"), to: "/category/kalkulatori", category: "KALKULATORI" },
        { label: t("footer.generators", "Generatori"), to: "/category/generatori", category: "GENERATORI" },
        { label: t("footer.tests", "Testovi i kvizovi"), to: "/category/testovi", category: "TESTOVI" },
      ],
    },
    {
      title: t("footer.legalAndSecurity", "Pravno i bezbjednost"),
      links: [
        { label: t("footer.legalNotice", "Pravne napomene"), to: "/pravne-napomene", category: "Legal" },
        { label: t("footer.security", "Sigurnost"), to: "/sigurnost", category: "Security" },
        { label: t("footer.privacy", "Privatnost"), to: "/privatnost", category: "Privacy Policy" },
      ],
    },
    {
      title: t("footer.termsAndContact", "Uslovi i kontakt"),
      links: [
        { label: t("footer.terms", "Uslovi korištenja"), to: "/uslovi-koristenja", category: "Terms" },
        { label: t("footer.cookies", "Kolačići"), to: "/kolacici", category: "Cookies" },
        { label: t("footer.contact", "Kontakt & Podrška"), to: "/support", category: "Contact" },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-[90rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="BH KONVER, početna stranica"
            >
              <img src={logo} alt="BH KONVER" className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-bold">
                BH <span className="text-emerald-400">KONVER</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/65">
              {t(
                "footer.description",
                "BH KONVER donosi praktične online alate za svakodnevne konverzije, proračune i provjere."
              )}{" "}
              Posjetite www.bh-konver.com.
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              <a href="mailto:info@bh-assistant.ba" className={`inline-flex items-center gap-2 ${footerLinkClass}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                info@bh-assistant.ba
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a href="mailto:alen.jusufovic@proton.me" className={`inline-flex items-center gap-2 ${footerLinkClass}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                alen.jusufovic@proton.me
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <SocialLinks />
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase text-primary-foreground/50">{column.title}</h2>
              <div className="mt-4 flex flex-col items-start gap-3">
                {column.links.map((item) => (
                  <Link
                    key={`${item.label}-${item.to}`}
                    to={item.to}
                    className={`${footerLinkClass} ${activeCategory === item.category ? "text-primary-foreground font-medium" : ""}`}
                    onClick={() => {
                      onNavigate?.(item.category);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BH KONVER. {t("footer.rights", "Sva prava zadržana.")}</p>
          <div className="flex items-center gap-2.5">
            <Link to="/?lang=en" className="inline-flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground underline font-semibold transition-colors">
              🌐 English (Direct Access)
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/?lang=bs" className="inline-flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground underline font-semibold transition-colors">
              Bosanski
            </Link>
          </div>
          <a
            href="https://www.bh-konver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 transition-colors hover:text-primary-foreground"
          >
            www.bh-konver.com <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
