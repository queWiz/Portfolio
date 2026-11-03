/**
 * Inline scripts that run in <head> before first paint.
 * Kept out of "use client" modules on purpose: a server component that imports a value from a
 * client module gets a client reference instead of the string, and the script silently vanishes.
 */

export const THEME_STORAGE_KEY = "portfolio-theme";
export const NAME_STORAGE_KEY = "portfolio-name";

/** Light is the default; only an explicit choice (the toggle) switches to dark, with no light flash. */
const themeInitScript = `(function(){try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

/** Hero name alternates signature / pixel on every visit (first visit: signature). */
const nameInitScript = `(function(){var n="signature";try{n=localStorage.getItem("${NAME_STORAGE_KEY}")==="signature"?"pixel":"signature";localStorage.setItem("${NAME_STORAGE_KEY}",n)}catch(e){}document.documentElement.setAttribute("data-name",n)})();`;

export const headInitScript = themeInitScript + nameInitScript;
