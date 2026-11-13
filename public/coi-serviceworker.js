/**
 * Cleanup Service Worker:
 * Unregisters any previously installed coi-serviceworker so Cross-Origin-Embedder-Policy
 * does not block third-party YouTube video background iframes.
 */
if (typeof window === "undefined") {
  self.addEventListener("install", () => {
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        try {
          await self.registration.unregister();
          const clientsList = await self.clients.matchAll({ type: "window" });
          for (const client of clientsList) {
            client.navigate(client.url);
          }
        } catch {
          // Ignore cleanup errors
        }
      })()
    );
  });
} else if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const reg of registrations) {
      const scriptUrl = reg.active?.scriptURL || reg.waiting?.scriptURL || reg.installing?.scriptURL || "";
      if (scriptUrl.includes("coi-serviceworker")) {
        reg.unregister();
      }
    }
  });
}
