import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";

// Compatible with Node.js 20 (import.meta.dirname requires Node.js ≥ 21.2)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawPort = process.env.PORT || "5173";
const port = Number(rawPort);
const basePath = process.env.BASE_PATH || "/";
const SERVER_PORT = "8080";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // Use manifest.json so it matches the existing <link rel="manifest"> in index.html
      manifestFilename: "manifest.json",
      // Let VitePWA handle SW injection; the existing public/sw.js is superseded
      injectRegister: "auto",
      manifest: {
        name: "أمان — دعم نفسي ذكي",
        short_name: "أمان",
        description: "دعم الصحة النفسية للمتضررين من النزاعات",
        theme_color: "#0EA5E9",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: basePath,
        start_url: basePath,
        lang: "ar",
        dir: "rtl",
        categories: ["health", "lifestyle"],
        prefer_related_applications: false,
        // Use icons that actually exist in the public directory
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "images/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "images/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Only precache essential assets, not everything (avoids 2MB+ precache)
        globPatterns: ["**/*.{js,css,html,svg}"],
        globIgnores: ["**/music.mp3", "**/opengraph.jpg"],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^\/api\/(resources|workshops|community)/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-static-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            urlPattern: /^\/api\/(mood|jitai|messages)/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-dynamic-cache",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-cache" },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // Suppress the 500kB warning — manualChunks can cause stack overflow in rollup
    // on memory-constrained deployment environments due to circular dep analysis
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      "/api": {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
        secure: false,
      },
      "/dashboard": {
        target: "http://localhost:5000",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
