import type { CSSProperties } from "react";

// Enter-on-scroll, done in CSS (see .reveal in globals.css). Visible by default: no JavaScript is needed,
// and browsers without scroll-driven animations simply show the content.
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ "--d": delay } as CSSProperties}>
      {children}
    </div>
  );
}
