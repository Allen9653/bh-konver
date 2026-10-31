import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SocialLinks } from "@/components/layout/Footer";

export const PremiumFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border mt-24 py-8 bg-card/50">
      <div className="container mx-auto px-4 max-w-5xl text-center space-y-3">
        <p className="text-xs text-muted-foreground tracking-wide uppercase">
          {t("footer.copyright", "© 2026 BH KONVER")} · {t("footerLinks.tagline", "Sigurna i privatna konverzija datoteka")}
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
          aria-label="Footer navigacija"
        >
          <Link to="/category/generatori" className="hover:text-primary transition-colors">
            {t("footerLinks.categories", "Kategorije alata")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/blog" className="hover:text-primary transition-colors">
            {t("footerLinks.blog", "Blog & Vodiči")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/pravne-napomene" className="hover:text-primary transition-colors">
            {t("footerLinks.legal", "Pravne napomene")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/sigurnost" className="hover:text-primary transition-colors">
            {t("footerLinks.security", "Sigurnost")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/kolacici" className="hover:text-primary transition-colors">
            {t("footerLinks.cookies", "Kolačići")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/privatnost" className="hover:text-primary transition-colors">
            {t("footer.privacy", "Privatnost")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/uslovi-koristenja" className="hover:text-primary transition-colors">
            {t("footer.terms", "Uslovi korištenja")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/support" className="hover:text-primary transition-colors">
            {t("footerLinks.contact", "Kontakt & Podrška")}
          </Link>
          <span className="text-border">·</span>
          <Link to="/?lang=en" className="hover:text-primary transition-colors font-semibold">
            🌐 English (?lang=en)
          </Link>
        </nav>
        <SocialLinks className="flex items-center justify-center gap-2" />
        <p className="text-[11px] text-muted-foreground/60">
          {t("footer.developed", "Razvijeno u Bosni i Hercegovini")} · {t("footer.motto", "Brzo, tačno i pouzdano")}
        </p>
      </div>
    </footer>
  );
};
