import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Info,
  AlertTriangle,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { BlogArticle } from "@/data/blogPosts";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, normalizeLanguageCode } from "@/hooks/useLanguage";
import { getLocalizedCategoryName } from "@/data/blogTranslations";

interface ArticleReaderProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
  onBack: () => void;
}

export function ArticleReader({ article, relatedArticles, onBack }: ArticleReaderProps) {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const currentLang = normalizeLanguageCode(language);
  const [copied, setCopied] = useState(false);

  const articleUrl = typeof window !== "undefined" ? window.location.href : `https://www.bh-konver.com/blog/${article.slug}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      toast({
        title: t("blog.linkCopied", "Link je kopiran!"),
        description: t("blog.shareToastDesc", "Možete podijeliti članak sa prijateljima i kolegama."),
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const schemaJsonLd = {
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "BH KONVER",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bh-konver.com/bh-konver-logo-320.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.tags.join(", "),
  };

  const categoryDisplay = getLocalizedCategoryName(article.category, currentLang, t);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <SEO
        title={article.seoTitle}
        description={article.seoDescription}
        path={`/blog/${article.slug}`}
        image={article.image}
        type="article"
        publishedTime={article.isoDate}
        author={article.author.name}
        jsonLd={schemaJsonLd}
      />

      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground" aria-label="Navigacija">
        <Link to="/" className="hover:text-primary transition-colors">
          {t("nav.home", "Početna")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <button type="button" onClick={onBack} className="hover:text-primary transition-colors">
          {t("nav.blog", "Blog")}
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-primary font-medium">{categoryDisplay}</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <BackButton label={t("blog.backToList", "← Svi članci")} onClick={onBack} fallbackTo="/blog" />
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-sm"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
          <span>{copied ? t("blog.copied", "Kopirano!") : t("blog.shareArticle", "Podijeli članak")}</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-border/70 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {categoryDisplay}
          </span>
          {article.badge && (
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground border border-accent/25">
              {article.badge}
            </span>
          )}
        </div>

        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {article.subtitle}
        </p>

        {/* Metadata byline */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-muted-foreground border-t border-border/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{article.author.name}</p>
              <p className="text-muted-foreground">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="my-8 overflow-hidden rounded-2xl border border-border/70 shadow-lg">
        <img
          src={article.image}
          alt={article.title}
          className="h-64 sm:h-96 w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Lead Paragraph */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-7 text-base sm:text-lg font-medium leading-relaxed text-foreground/90">
        <Sparkles className="inline-block mr-2 h-5 w-5 text-primary align-text-bottom" />
        {article.content.lead}
      </div>

      {/* Article Content Sections */}
      <div className="mt-10 space-y-10 text-foreground">
        {article.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
              {section.heading}
            </h2>

            {section.subheading && (
              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground/80">
                {section.subheading}
              </h3>
            )}

            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}

            {section.bullets && (
              <ul className="my-4 space-y-2.5 rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.table && (
              <div className="my-6 overflow-x-auto rounded-xl border border-border/80 shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/80 text-foreground font-semibold">
                    <tr>
                      {section.table.headers.map((th, hIdx) => (
                        <th key={hIdx} className="p-3 border-b border-border">
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-card/40">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 font-medium text-foreground/90">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.callout && (
              <div
                className={`my-6 rounded-2xl border p-5 sm:p-6 ${
                  section.callout.type === "warning"
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                    : section.callout.type === "tip"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                    : "border-blue-500/30 bg-blue-500/10 text-blue-900 dark:text-blue-200"
                }`}
              >
                <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base mb-1.5">
                  {section.callout.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                  {section.callout.type === "tip" && <Lightbulb className="h-4 w-4" />}
                  {section.callout.type === "info" && <Info className="h-4 w-4" />}
                  <span>{section.callout.title}</span>
                </div>
                <p className="text-xs sm:text-sm leading-6 opacity-90">
                  {section.callout.text}
                </p>
              </div>
            )}
          </section>
        ))}

        {/* FAQ Section */}
        {article.content.faq && article.content.faq.length > 0 && (
          <section className="mt-12 rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-sm space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                {t("blog.faq", "Često postavljana pitanja (FAQ)")}
              </h2>
            </div>
            <div className="space-y-4">
              {article.content.faq.map((item, fIdx) => (
                <div key={fIdx} className="rounded-xl border border-border/60 bg-background/60 p-4">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1.5">
                    {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Relevant BH KONVER Tool CTA Card */}
        {article.relatedTool && (
          <div className="mt-10 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-6 sm:p-8 text-center shadow-lg">
            <Sparkles className="mx-auto h-8 w-8 text-primary mb-3" />
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
              {t("blog.recommendedTool", "Preporučeni alat za vas")}: {article.relatedTool.name}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
              {article.relatedTool.description}
            </p>
            <div className="mt-5">
              <Link
                to={article.relatedTool.path}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:gap-3"
              >
                <span>{t("blog.tryRecommendedTool", "Pokreni alat odmah")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Article Tags */}
        <div className="pt-6 border-t border-border/60">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t("blog.tagsHeading", "Oznake i teme:")}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-border bg-card/80 px-2.5 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 border-t border-border/70 pt-10">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6">
            {t("blog.relatedArticles", "Povezani vodiči i članci")}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card/70 p-5 shadow-sm transition-all hover:border-primary/40 hover:bg-card cursor-pointer"
              >
                <div>
                  <span className="text-xs font-semibold text-primary">
                    {getLocalizedCategoryName(rel.category, currentLang, t)}
                  </span>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="mt-2 block font-display text-base font-bold text-foreground group-hover:text-primary transition-colors"
                  >
                    {rel.title}
                  </Link>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <span>{rel.readTime}</span>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {t("blog.readArticle", "Čitaj")} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default ArticleReader;
