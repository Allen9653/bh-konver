import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center space-y-4">
          <p className="text-sm">
            {t("footer.copyright", "© 2026 BH KONVER. Sva prava zadržana.")}
          </p>
          <p className="text-sm">
            {t("footer.developed", "Razvijeno u Bosni i Hercegovini")}
          </p>
          <p className="text-sm">
            {t("footer.ownership", "Platforma za napredne konverzije")}
          </p>
          <p className="text-base font-semibold">
            {t("footer.motto", "Brzo, tačno i pouzdano")}
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Pravni i pomoćni linkovi">
            <Link to="/pravne-napomene" className="hover:opacity-80 transition-opacity">
              Pravne napomene
            </Link>
            <span className="opacity-60">|</span>
            <Link to="/sigurnost" className="hover:opacity-80 transition-opacity">
              Sigurnost
            </Link>
            <span className="opacity-60">|</span>
            <Link to="/kolacici" className="hover:opacity-80 transition-opacity">
              Kolačići
            </Link>
            <span className="opacity-60">|</span>
            <Link to="/privatnost" className="hover:opacity-80 transition-opacity">
              {t("footer.privacy", "Privatnost")}
            </Link>
            <span className="opacity-60">|</span>
            <Link to="/uslovi-koristenja" className="hover:opacity-80 transition-opacity">
              {t("footer.terms", "Uslovi korištenja")}
            </Link>
            <span className="opacity-60">|</span>
            <Link to="/blog" className="hover:opacity-80 transition-opacity">
              Blog & Vodiči
            </Link>
            <span className="opacity-60">|</span>
            <Link to="/support" className="hover:opacity-80 transition-opacity">
              {t("footer.support", "Podrška")}
            </Link>
          </nav>
          <div className="pt-2 text-xs opacity-75">
            <a
              href="mailto:info@bh-assistant.ba"
              className="hover:underline inline-block mr-3"
            >
              info@bh-assistant.ba
            </a>
            <a
              href="https://www.bh-konver.ba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-block"
            >
              www.bh-konver.ba
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
