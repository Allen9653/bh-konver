import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Mail,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { PremiumHeader } from "@/components/PremiumHeader";
import { PremiumFooter } from "@/components/PremiumFooter";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/common/BackButton";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useLanguage, normalizeLanguageCode } from "@/hooks/useLanguage";
import { BLOG_ARTICLES, BLOG_CATEGORIES, BlogArticle } from "@/data/blogPosts";
import { getLocalizedArticle, getLocalizedCategoryName } from "@/data/blogTranslations";
import { HowToUseCarousel } from "@/components/blog/HowToUseCarousel";
import { ArticleReader } from "@/components/blog/ArticleReader";
import { AmbientCategoryBackdrop } from "@/components/layout/AmbientCategoryBackdrop";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

export default function Blog() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const currentLang = normalizeLanguageCode(language);

  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const { hasActiveSubscription, expiresAt } = useSubscription(user?.id);
  const isPremium = isAdmin || hasActiveSubscription;

  const [selectedCategory, setSelectedCategory] = useState<string>("Svi članci");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Localized articles collection based on current language
  const localizedArticles = useMemo(() => {
    return BLOG_ARTICLES.map((article) => getLocalizedArticle(article, currentLang));
  }, [currentLang]);

  // Check if a specific article is requested via URL slug
  const currentArticle = useMemo(() => {
    if (!slug) return null;
    const found = BLOG_ARTICLES.find((a) => a.slug === slug);
    return found ? getLocalizedArticle(found, currentLang) : null;
  }, [slug, currentLang]);

  // Filtered articles for the grid
  const filteredArticles = useMemo(() => {
    return localizedArticles.filter((post) => {
      const matchesCat =
        selectedCategory === "Svi članci" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [localizedArticles, selectedCategory, searchQuery]);

  // Featured article (first one)
  const featuredArticle = localizedArticles[0];

  // Related articles for single article reader
  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    return localizedArticles
      .filter((a) => a.id !== currentArticle.id)
      .slice(0, 2);
  }, [currentArticle, localizedArticles]);

  // Schema.org Blog collection data
  const blogListJsonLd = {
    "@type": "Blog",
    name: "BH KONVER Blog & Baza znanja",
    description:
      "Vodiči kroz digitalne formate (MP4, MKV, DOCX, HEIC, HTML), kalkulatore, testove i besplatne alate za Bosnu i Hercegovinu.",
    url: "https://www.bh-konver.com/blog",
    publisher: {
      "@type": "Organization",
      name: "BH KONVER",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bh-konver.com/bh-konver-logo-320.webp",
      },
    },
    blogPost: BLOG_ARTICLES.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      image: article.image,
      datePublished: article.isoDate,
      url: `https://www.bh-konver.com/blog/${article.slug}`,
    })),
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary">
      {/* Animated & Illuminated Moving Bulb Background (BH KONVER Logo) */}
      <AmbientCategoryBackdrop category="blog" />

      <PremiumHeader
        user={user}
        isAdmin={isAdmin}
        isPremium={isPremium}
        expiresAt={expiresAt}
        onSignOut={signOut}
        loading={loading}
      />

      <main className="relative z-10 flex-1">
        {currentArticle ? (
          /* Single Article Reader View */
          <ArticleReader
            article={currentArticle}
            relatedArticles={relatedArticles}
            onBack={() => navigate("/blog")}
          />
        ) : (
          /* Main Blog Listing View */
          <>
            <SEO
              title="Blog i vodiči kroz digitalne formate | BH KONVER"
              description="Edukativni tekstovi i praktični savjeti o video formatima (MP4, MKV), DOCX, iPhone HEIC slikama, HTML-u i domaćim kalkulatorima za BiH."
              path="/blog"
              image="https://www.bh-konver.com/bh-konver-logo-320.webp"
              jsonLd={blogListJsonLd}
            />

            {/* Hero Section */}
            <section className="relative border-b border-border/70 py-12 sm:py-16 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              {/* Ambient Background Watermark Logo */}
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-80 sm:w-[500px] md:w-[640px] h-full pointer-events-none overflow-hidden select-none opacity-15 sm:opacity-20 flex items-center justify-end">
                <img
                  src="/categories/blog.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto max-h-[140%] object-contain filter drop-shadow-[0_0_60px_rgba(6,182,212,0.5)] transform translate-x-10 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
              </div>

              <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
                <div className="mb-6 flex justify-start">
                  <BackButton label={t("blog.backHome", "← Povratak na početnu")} fallbackTo="/" />
                </div>

                <div className="relative mx-auto mb-6 flex h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 items-center justify-center rounded-3xl bg-slate-900/80 border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.3)] backdrop-blur-xl p-4 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-transparent rounded-3xl opacity-80 blur-xl pointer-events-none group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-[1px] rounded-[23px] border border-white/10 pointer-events-none" />
                  <ShimmerImage
                    src="/categories/blog.png"
                    alt="BH KONVER Blog"
                    className="relative z-10 h-full w-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105"
                    containerClassName="w-full h-full"
                    roundedClassName="rounded-2xl"
                  />
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1 text-xs font-bold text-cyan-300 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{t("blog.heroBadge", "Znanje, vodiči i digitalna pismenost")}</span>
                </div>

                <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl">
                  BH KONVER{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                    {t("blog.title", "Blog")}
                  </span>
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:text-lg leading-relaxed font-normal">
                  {t(
                    "blog.heroDesc",
                    "Praktična uputstva i objašnjenja koja vam pomažu da razumijete video i dokument formate (MP4, DOCX, HEIC, HTML), savladate poreze i maksimalno iskoristite besplatne alate."
                  )}
                </p>

                {/* Instant Search Bar */}
                <div className="mx-auto mt-8 flex max-w-lg items-center rounded-2xl border border-border/80 bg-card/90 px-4 py-2.5 shadow-md backdrop-blur-md focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder={t("blog.searchPlaceholder", "Pretraži članke (npr. MP4, HEIC, Word, PDV)...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ml-3 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    aria-label="Pretraži blog članke"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-muted-foreground hover:text-foreground font-medium px-1.5"
                    >
                      {t("blog.clearSearch", "Poništi")}
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {BLOG_CATEGORIES.map((category) => {
                    const count =
                      category === "Svi članci"
                        ? localizedArticles.length
                        : localizedArticles.filter((a) => a.category === category).length;
                    const isSelected = selectedCategory === category;
                    const displayLabel = getLocalizedCategoryName(category, currentLang, t);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-sm scale-105"
                            : "border border-border/80 bg-card/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span>{displayLabel}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] tabular-nums ${
                            isSelected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Interactive "How to use BH KONVER" Carousel */}
            <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
              <HowToUseCarousel />
            </section>

            {/* Featured Article Card (only when no search query and 'Svi članci') */}
            {!searchQuery && selectedCategory === "Svi članci" && featuredArticle && (
              <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <TrendingUp className="h-4 w-4" />
                  <span>{t("blog.featuredWeekly", "Izdvojeni članak sedmice")}</span>
                </div>

                <div className="group relative overflow-hidden rounded-3xl border border-primary/25 bg-card/80 shadow-lg backdrop-blur-xl transition-all hover:border-primary/50">
                  <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                          {getLocalizedCategoryName(featuredArticle.category, currentLang, t)}
                        </span>
                        {featuredArticle.badge && (
                          <span className="rounded-full bg-accent/15 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
                            {featuredArticle.badge}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {featuredArticle.readTime}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        <Link to={`/blog/${featuredArticle.slug}`}>
                          {featuredArticle.title}
                        </Link>
                      </h2>

                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{featuredArticle.author.name}</span>
                          <span>•</span>
                          <span>{featuredArticle.date}</span>
                        </div>

                        <Link
                          to={`/blog/${featuredArticle.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 hover:gap-2.5"
                        >
                          <span>{t("blog.readGuide", "Pročitaj cijeli vodič")}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Articles Grid */}
            <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {selectedCategory === "Svi članci"
                    ? t("blog.allArticlesHeading", "Svi objavljeni članci")
                    : getLocalizedCategoryName(selectedCategory, currentLang, t)}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {t("blog.showingCount", "Prikazano:")} {filteredArticles.length} {t("blog.articlesUnit", "članaka")}
                </span>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                  <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/60 mb-3" />
                  <p className="font-semibold text-foreground">{t("blog.noArticlesFound", "Nijedan članak ne odgovara pretrazi")}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("blog.tryOtherKeywords", "Pokušajte sa drugim ključnim riječima ili poništite filter kategorije.")}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Svi članci");
                    }}
                    className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    {t("blog.showAllArticles", "Prikaži sve članke")}
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card hover:shadow-md"
                    >
                      <div>
                        {/* Card Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <span className="absolute top-3 left-3 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm backdrop-blur-md">
                            {getLocalizedCategoryName(post.category, currentLang, t)}
                          </span>
                          {post.badge && (
                            <span className="absolute top-3 right-3 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
                              {post.badge}
                            </span>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {post.readTime}
                            </span>
                          </div>

                          <h4 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>

                          <p className="mt-2 text-xs sm:text-sm leading-6 text-muted-foreground line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="border-t border-border/60 p-5 pt-3 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                          {post.author.name}
                        </span>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                          <span>{t("blog.readArticle", "Čitaj")}</span>
                          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Feedback and Topic Submission Box */}
              <div className="mt-14 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-6 sm:p-8 text-center shadow-lg backdrop-blur-xl">
                <BookOpen className="mx-auto h-9 w-9 text-primary mb-3" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {t("blog.suggestTitle", "Želite vodič za specifičan format ili alat?")}
                </h3>
                <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(
                    "blog.suggestDesc",
                    "Redovno pišemo nove praktične članke o konverzijama dokumenata, video produkciji i lokalnim zakonima. Pošaljite nam svoje pitanje ili predložite temu!"
                  )}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="mailto:alen.jusufovic@proton.me?subject=Prijedlog%20teme%20za%20BH%20KONVER%20Blog"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    <Mail className="h-4 w-4" /> {t("blog.suggestAction", "Predložite temu (alen.jusufovic@proton.me)")}
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    {t("blog.tryTools", "Isprobaj BH KONVER alate")} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <PremiumFooter />
    </div>
  );
}
