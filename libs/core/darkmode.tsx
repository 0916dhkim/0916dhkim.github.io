import Script from "next/script";

/**
 * Inject script for detecting dark mode.
 * This prevents dark mode flickering.
 */
export const DarkMode = () => (
  <Script>{`(() => {
    const isOsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const root = document.documentElement;
    root.setAttribute("data-theme", isOsDark ? "dark" : "light");
  })();
  `}</Script>
);
