/**
 * BH KONVER — Cross-Origin Isolation Service Worker
 *
 * Problem: ffmpeg.wasm (video/GIF konverzija) zahtijeva SharedArrayBuffer,
 * a to zahtijeva da stranica bude "cross-origin isolated" — što znači da
 * server mora slati Cross-Origin-Opener-Policy i Cross-Origin-Embedder-Policy
 * HTTP zaglavlja. Statični hosting servisi (Lovable, GitHub Pages, mnogi
 * cPanel shared hosting paketi) često ne dozvoljavaju podešavanje proizvoljnih
 * zaglavlja za sve fajlove.
 *
 * Rješenje: Service worker presreće SVAKI mrežni zahtjev i "dodaje" ova
 * zaglavlja na odgovor prije nego što stigne do browsera — bez potrebe za
 * bilo kakvom podrškom na strani servera. Ovo je standardna, poznata tehnika
 * (koristi je npr. StackBlitz WebContainers, mnogi ffmpeg.wasm projekti).
 */

if (typeof window === "undefined") {
  // Izvršava se unutar samog service workera (sw kontekst)
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
      return;
    }

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) {
            return response;
          }
          const newHeaders = new Headers(response.headers);
          newHeaders.set("Cross-Origin-Embedder-Policy", "credentialless");
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        })
        .catch((err) => {
          console.error("[coi-serviceworker] fetch failed:", err);
          throw err;
        })
    );
  });
} else {
  // Izvršava se u glavnom prozoru
  (() => {
    // Ako je stranica u iframe-u (npr. AI Studio preview), NIKADA ne pokreći coi-serviceworker
    // jer COOP/COEP blokira renderovanje unutar iframe-a!
    if (window.self !== window.top) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const reg of registrations) {
            if (reg.active && reg.active.scriptURL && reg.active.scriptURL.includes("coi-serviceworker")) {
              reg.unregister();
            }
          }
        });
      }
      return;
    }

    if (window.crossOriginIsolated) return;

    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register(window.document.currentScript ? window.document.currentScript.src : "/coi-serviceworker.js")
      .then((registration) => {
        if (registration.active && !navigator.serviceWorker.controller) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.warn("[coi-serviceworker] Registracija neuspješna:", err);
      });
  })();
}
