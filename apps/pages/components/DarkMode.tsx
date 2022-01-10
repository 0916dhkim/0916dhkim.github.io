import { memo } from "react";

/**
 * Empty component for setting `data-theme` attribute of the <html> tag.
 */
const DarkMode = (): null => {
  // Only run on client-side.
  if (typeof window !== "undefined") {
    const isOsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const root = document.documentElement;
    root.setAttribute("data-theme", isOsDark ? "dark" : "light");
  }
  return null;
};

export default memo(DarkMode);
