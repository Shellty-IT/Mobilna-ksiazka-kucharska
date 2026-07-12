import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "/",
        name: "Mobilna Książka Kucharska",
        short_name: "Książka Kucharska",
        description: "Przepisy, składniki i kuchenny minutnik.",
        lang: "pl",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#dc5735",
        background_color: "#fffaf5",
        icons: [
          { src: "/logo192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/logo512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        ],
        shortcuts: [
          { name: "Znajdź przepis", url: "/szukaj", icons: [{ src: "/logo192.png", sizes: "192x192" }] },
          { name: "Minutnik", url: "/minutnik", icons: [{ src: "/logo192.png", sizes: "192x192" }] },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/pomocnik-cc6da-default-rtdb\.firebaseio\.com\/.*$/i,
            handler: "NetworkFirst",
            options: { cacheName: "recipe-data", networkTimeoutSeconds: 4, expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 7 } },
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*$/i,
            handler: "CacheFirst",
            options: { cacheName: "recipe-images", expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
        ],
      },
    }),
  ],
  server: { port: 3010, strictPort: true },
});
