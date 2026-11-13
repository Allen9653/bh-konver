import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDeviceAdaptation } from "@/contexts/DeviceAdaptationContext";

const YOUTUBE_VIDEO_ID = "I9ySTxSZYms";

interface YTPlayerInstance {
  mute?: () => void;
  playVideo?: () => void;
  seekTo?: (seconds: number, allowSeekAhead?: boolean) => void;
  destroy?: () => void;
}

interface YTGlobal {
  Player: new (
    element: HTMLElement | string,
    options: {
      events?: {
        onReady?: (event: { target: YTPlayerInstance }) => void;
        onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayerInstance;
}

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * Full-bleed global YouTube video background rendered behind all routes of www.bh-konver.com.
 * - Uses YouTube IFrame Player API + postMessage readiness confirmation so blocked/error frames
 *   never paint Chromium's gray sad-page icon over the UI.
 * - Includes HD YouTube poster frame underneath for instant visual continuity during buffering.
 * - Automatically retries muted playback on load and on first user gesture (iOS/Android battery-saver fallback).
 */
export const YouTubeVideoBackground: React.FC = () => {
  const { videoBgEnabled } = useDeviceAdaptation();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [posterUrl, setPosterUrl] = useState(
    `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`
  );

  const originParam =
    typeof window !== "undefined" && window.location?.origin
      ? `&origin=${encodeURIComponent(window.location.origin)}`
      : "";

  const isCrossOriginIsolated =
    typeof window !== "undefined" &&
    Boolean((window as unknown as { crossOriginIsolated?: boolean }).crossOriginIsolated);

  const embedSrc = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&widgetid=1${originParam}`;

  const triggerPlayback = useCallback(() => {
    try {
      playerRef.current?.mute?.();
      playerRef.current?.playVideo?.();
    } catch {
      // Ignore player state errors during setup
    }

    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    try {
      win.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
      win.postMessage(JSON.stringify({ event: "command", func: "mute", args: [] }), "*");
      win.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
    } catch {
      // Ignore cross-origin postMessage errors if iframe is not reachable
    }
  }, []);

  // Listen for genuine YouTube postMessage events (blocked sad-frame errors never emit these)
  useEffect(() => {
    if (!videoBgEnabled) {
      setIframeReady(false);
      setIframeError(false);
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (
        !event.origin ||
        (!event.origin.includes("youtube.com") && !event.origin.includes("youtube-nocookie.com"))
      ) {
        return;
      }
      if (typeof event.data !== "string") return;
      try {
        const payload = JSON.parse(event.data);
        if (payload?.event === "onError") {
          setIframeError(true);
          setIframeReady(false);
          return;
        }
        if (
          payload?.event === "onReady" ||
          payload?.event === "initialDelivery" ||
          payload?.event === "infoDelivery"
        ) {
          setIframeError(false);
          setIframeReady(true);
          const state = payload?.info?.playerState;
          if (state === 0) {
            triggerPlayback();
          }
        }
      } catch {
        // Non-JSON postMessage
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [videoBgEnabled, triggerPlayback]);

  // Attach official YouTube IFrame API when available
  useEffect(() => {
    if (!videoBgEnabled) return;

    let cancelled = false;

    const attachPlayer = () => {
      if (cancelled || !iframeRef.current || !window.YT?.Player || playerRef.current) return;
      try {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (e) => {
              if (cancelled) return;
              setIframeError(false);
              setIframeReady(true);
              try {
                e.target.mute?.();
                e.target.playVideo?.();
              } catch {
                // Ignore autoplay restriction
              }
            },
            onStateChange: (e) => {
              if (cancelled) return;
              if (e.data === 1 || e.data === 3) {
                setIframeError(false);
                setIframeReady(true);
              } else if (e.data === 0) {
                try {
                  e.target.seekTo?.(0, true);
                  e.target.playVideo?.();
                } catch {
                  // Ignore loop seek errors
                }
              }
            },
            onError: () => {
              if (cancelled) return;
              setIframeError(true);
              setIframeReady(false);
            },
          },
        });
      } catch {
        // Fallback to postMessage handshake if YT.Player attachment throws
      }
    };

    if (window.YT?.Player) {
      attachPlayer();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        attachPlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
      playerRef.current = null;
    };
  }, [videoBgEnabled]);

  // Trigger playback on first interaction for strict mobile browsers (iOS Low Power Mode, etc.)
  useEffect(() => {
    if (!videoBgEnabled) return;

    const handleFirstInteraction = () => {
      triggerPlayback();
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [videoBgEnabled, triggerPlayback]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-[#020617]"
      aria-hidden="true"
    >
      {/* HD poster frame visible immediately and as clean fallback if iframe is blocked by network/preview */}
      {videoBgEnabled && !posterFailed && (
        <img
          src={posterUrl}
          alt=""
          onError={() => {
            if (posterUrl.includes("maxresdefault")) {
              setPosterUrl(`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`);
            } else {
              setPosterFailed(true);
            }
          }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        />
      )}

      {/* Video iframe remains hidden (opacity-0) until YouTube confirms it loaded cleanly, preventing sad-page error icons */}
      {videoBgEnabled && !iframeError && (
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
            iframeReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <iframe
            id="bh-yt-bg-player"
            ref={iframeRef}
            src={embedSrc}
            title="BH KONVER pozadinski video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            {...(isCrossOriginIsolated ? ({ credentialless: "" } as Record<string, string>) : {})}
            onLoad={() => {
              triggerPlayback();
              setTimeout(triggerPlayback, 300);
              setTimeout(triggerPlayback, 900);
              setTimeout(triggerPlayback, 1800);
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.12] border-0"
            style={{
              width: "max(100vw, 177.78vh)",
              height: "max(100vh, 56.25vw)",
              minWidth: "100%",
              minHeight: "100%",
            }}
          />
        </div>
      )}

      {/* Balanced readability scrim so content stays legible over the video */}
      <div className="absolute inset-0 bg-[#020617]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617]/45" />
    </div>
  );
};

export default YouTubeVideoBackground;
