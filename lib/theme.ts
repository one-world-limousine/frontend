export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "ow-theme";

/** Dismissing the announcement bar is remembered per version; change ANNOUNCE_VERSION when the text changes. */
export const ANNOUNCE_STORAGE_KEY = "ow-announce-dismissed";
export const ANNOUNCE_VERSION = "2026-10";

/**
 * Runs inline in <head> before first paint: applies the saved theme (or the system preference when
 * the visitor has not chosen one) and hides a dismissed announcement bar, so neither flashes on load.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",t);if(localStorage.getItem("${ANNOUNCE_STORAGE_KEY}")==="${ANNOUNCE_VERSION}")d.setAttribute("data-announce","off")}catch(e){}})()`;
