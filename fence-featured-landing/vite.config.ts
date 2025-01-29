import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { securityHeadersPlugin } from "./src/security/vite-security-headers";

// https://vitejs.dev/config/
// Configured for GitHub Pages deployment at scroggsfencing.github.io/Homepage
// Testing connection and GitHub Actions workflow
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: './',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      // Temporarily removing security headers plugin until we can configure it properly
      // securityHeadersPlugin()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Expose env variables on import.meta.env
      'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
      'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
      'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY),
    },
  };
});
