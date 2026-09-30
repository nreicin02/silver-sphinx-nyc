"use client";
import { useEffect, useRef } from "react";

type Instance = { destroy: () => void } | null;
declare global {
  interface Window {
    SilverSphinxLogo?: { mount: (el: HTMLElement, opts?: Record<string, unknown>) => Promise<Instance> | null };
  }
}

const SCRIPT = "/brand/silversphinx-logo.js";
const THREE = "/vendor/three-r128.min.js";
let scriptPromise: Promise<void> | null = null;

// Load the logo script once, after the page is idle, so the static image paints first.
function loadScript(): Promise<void> {
  if (window.SilverSphinxLogo) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SCRIPT;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("logo script failed to load"));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

const idle = (fn: () => void) => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(fn, { timeout: 1500 });
  else setTimeout(fn, 300);
};

type Props = {
  mode: "s" | "full";
  className?: string;
  priority?: boolean;
};

export function SphinxLogo({ mode, className = "", priority = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let pending: Promise<Instance> | null = null;

    const start = () => {
      loadScript()
        .then(() => {
          if (cancelled || !window.SilverSphinxLogo) return;
          pending = window.SilverSphinxLogo.mount(el, { mode, threeSrc: THREE });
        })
        .catch(() => {});
    };
    idle(start);

    return () => {
      cancelled = true;
      pending?.then((inst) => inst?.destroy()).catch(() => {});
    };
  }, [mode]);

  const src = mode === "s" ? "/brand/silversphinx-s.webp" : "/brand/silversphinx-logo.webp";
  return (
    <div ref={ref} className={`sphinx-logo ${className}`}>
      {/* Plain img on purpose: the script positions it and fades the canvas in over it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={mode === "s" ? "" : "Silver Sphinx"} decoding="async" fetchPriority={priority ? "high" : "auto"} />
    </div>
  );
}
