"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtmLoaded?: boolean;
    dataLayer?: unknown[];
  }
}

const GTM_ID = "GTM-MDTS8P8L";

export default function GTMLoader() {
  useEffect(() => {
    const loadGTM = () => {
      if (window.gtmLoaded) return;
      window.gtmLoaded = true;
      (function (w: Window, d: Document, s: string, l: string, i: string) {
        (w as unknown as Record<string, unknown[]>)[l] =
          (w as unknown as Record<string, unknown[]>)[l] || [];
        (w as unknown as Record<string, unknown[]>)[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s) as HTMLScriptElement;
        const dl = l !== "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode?.insertBefore(j, f);
      })(window, document, "script", "dataLayer", GTM_ID);
    };

    let idleTimer: ReturnType<typeof setTimeout>;
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        idleTimer = setTimeout(loadGTM, 6000);
      });
    } else {
      idleTimer = setTimeout(loadGTM, 7000);
    }

    const events = ["scroll", "mousemove", "touchstart", "click"] as const;
    const trigger = () => {
      loadGTM();
      events.forEach((e) => window.removeEventListener(e, trigger));
    };
    events.forEach((e) => window.addEventListener(e, trigger, { passive: true }));

    return () => {
      clearTimeout(idleTimer);
      events.forEach((e) => window.removeEventListener(e, trigger));
    };
  }, []);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
