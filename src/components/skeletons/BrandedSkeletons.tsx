import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

interface SkeletonProps {
  className?: string;
}

export function ShimmerBox({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-muted/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
    />
  );
}

/**
 * Branded skeleton loader for CategoryLanding and category hub pages.
 * Mimics the exact layout of CategoryLanding (Navbar silhouette, breadcrumb,
 * category title, description, and responsive grid of tool cards).
 */
export function CategoryLandingSkeleton({ category = "Alati" }: { category?: string }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background" aria-label="Učitavanje kategorije...">
      {/* Branded Header Silhouette */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <ShimmerBox className="h-4 w-24" />
              <ShimmerBox className="h-2.5 w-16" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <ShimmerBox key={i} className="h-8 w-20 rounded-lg" />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ShimmerBox className="h-8 w-8 rounded-full" />
            <ShimmerBox className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <ShimmerBox className="h-8 w-36 rounded-lg" />
        </div>

        {/* Category Header */}
        <div className="mb-8 border-b border-border/60 pb-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 mb-3">
            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              BH KONVER · {category}
            </span>
          </div>
          <ShimmerBox className="h-9 sm:h-11 w-64 sm:w-96 rounded-xl mb-3" />
          <ShimmerBox className="h-4 w-full max-w-2xl mb-2" />
          <ShimmerBox className="h-4 w-2/3 max-w-lg" />
        </div>

        {/* Grid of Tool Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border/80 bg-card/60 p-5 shadow-sm space-y-3.5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <ShimmerBox className="h-10 w-10 rounded-xl" />
                <ShimmerBox className="h-5 w-16 rounded-full" />
              </div>
              <ShimmerBox className="h-5 w-3/4 rounded-md" />
              <div className="space-y-1.5 pt-1">
                <ShimmerBox className="h-3.5 w-full rounded" />
                <ShimmerBox className="h-3.5 w-5/6 rounded" />
              </div>
              <div className="pt-2 flex justify-end">
                <ShimmerBox className="h-4 w-20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Silhouette */}
      <footer className="mt-auto border-t border-border/60 py-6 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <ShimmerBox className="h-4 w-48" />
          <div className="flex gap-3">
            <ShimmerBox className="h-4 w-16" />
            <ShimmerBox className="h-4 w-16" />
            <ShimmerBox className="h-4 w-16" />
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Branded skeleton loader for PremiumAccessGate.
 * Mimics the guarded page with a sophisticated branded status badge,
 * previewing tool availability while validating credentials in the background.
 */
export function PremiumGateSkeleton({
  category = "Premium",
}: {
  category?: string;
}) {
  const displayLabel = category.replace(/^./, (letter) => letter.toLocaleUpperCase());

  return (
    <div
      className="relative flex min-h-screen flex-col bg-background"
      aria-label="Provjera Premium pristupa..."
    >
      {/* Top Navbar Skeleton */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <ShimmerBox className="h-4 w-24" />
              <ShimmerBox className="h-2.5 w-14" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <ShimmerBox key={i} className="h-8 w-20 rounded-lg" />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ShimmerBox className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Main Container with Branded Verifying Centerpiece */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        {/* Verification Card */}
        <div className="w-full max-w-xl rounded-2xl border border-primary/20 bg-card/60 p-8 text-center shadow-lg backdrop-blur-xl">
          {/* Animated emblem badge */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/10 to-accent/20 border border-primary/30">
            <span className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-30" />
            <ShieldCheck className="h-8 w-8 text-primary animate-pulse" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">
            BH KONVER · {displayLabel}
          </p>

          <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-foreground">
            Provjera Premium pristupa...
          </h2>

          <p className="mx-auto mt-2.5 max-w-md text-sm text-muted-foreground leading-relaxed">
            Sinhronizacija pretplatničkog statusa i priprema radnog okruženja za {displayLabel.toLocaleLowerCase("bs")}.
          </p>

          {/* Shimmering progress indicator */}
          <div className="mt-6 mx-auto max-w-xs">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-accent animate-[pulse_1.5s_infinite]" />
            </div>
          </div>
        </div>

        {/* Content Layout Ghost preview behind */}
        <div className="mt-10 w-full opacity-40 blur-[1px] pointer-events-none select-none">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card/40 p-5 space-y-3">
                <ShimmerBox className="h-8 w-8 rounded-lg" />
                <ShimmerBox className="h-4 w-3/4 rounded" />
                <ShimmerBox className="h-3 w-full rounded" />
                <ShimmerBox className="h-3 w-2/3 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Silhouette */}
      <footer className="mt-auto border-t border-border/60 py-6 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <ShimmerBox className="h-4 w-40" />
          <ShimmerBox className="h-4 w-32" />
        </div>
      </footer>
    </div>
  );
}

/**
 * Branded skeleton loader for tool interfaces, panels, and converter modals.
 */
export function ToolInterfaceSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-border/80 bg-card/70 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm" aria-label="Učitavanje alata...">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <ShimmerBox className="h-6 w-48 rounded-lg" />
          <ShimmerBox className="h-3.5 w-32 rounded" />
        </div>
        <ShimmerBox className="h-6 w-24 rounded-full" />
      </div>
      <div className="rounded-2xl border-2 border-dashed border-border/70 p-10 flex flex-col items-center justify-center space-y-3 bg-muted/20">
        <ShimmerBox className="h-12 w-12 rounded-2xl" />
        <ShimmerBox className="h-4 w-52 rounded" />
        <ShimmerBox className="h-3 w-40 rounded" />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <ShimmerBox className="h-9 w-24 rounded-lg" />
        <ShimmerBox className="h-9 w-36 rounded-lg" />
      </div>
    </div>
  );
}

