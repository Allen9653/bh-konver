import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  fallbackSrc?: string;
  roundedClassName?: string;
}

export const ShimmerImage: React.FC<ShimmerImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = "/android-chrome-192x192.png",
  roundedClassName = "rounded-xl",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center shrink-0",
        roundedClassName,
        containerClassName
      )}
    >
      {/* Shimmer skeleton loader shown while image is loading */}
      {!isLoaded && !hasError && (
        <div
          className={cn(
            "absolute inset-0 z-10 animate-shimmer bg-slate-800/60 dark:bg-slate-900/70 border border-white/5",
            roundedClassName
          )}
          aria-hidden="true"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
      )}

      {/* Actual image with smooth transition */}
      <img
        src={imgSrc}
        alt={alt}
        onLoad={(e) => {
          setIsLoaded(true);
          props.onLoad?.(e);
        }}
        onError={(e) => {
          if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
            setHasError(true);
          } else {
            setIsLoaded(true);
          }
          props.onError?.(e);
        }}
        className={cn(
          "transition-all duration-500 ease-out",
          isLoaded ? "opacity-100 scale-100 filter-none" : "opacity-0 scale-95 blur-[2px]",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default ShimmerImage;
