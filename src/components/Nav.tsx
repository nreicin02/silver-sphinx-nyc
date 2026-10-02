"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "@phosphor-icons/react";
import { PHONE_DISPLAY, TEL } from "@/lib/contact";
import { SphinxLogo } from "./SphinxLogo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const links = LINKS.map((l) => (
    <Link key={l.href} href={l.href} className="label link-line" aria-current={(l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)) ? "page" : undefined}>
      {l.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/55 backdrop-blur-md">
      {/* Desktop: one row. Mobile: logo lockup on top, links and phone underneath. */}
      <div className="mx-auto max-w-[1400px] px-4 md:grid md:h-[76px] md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8">
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">{links}</nav>
        <div className="flex h-[58px] items-center justify-center md:h-auto">
          <Link href="/" className="flex items-center gap-3" aria-label="Silver Sphinx, home">
            <SphinxLogo mode="s" priority className="h-[42px] w-[23px] shrink-0 md:h-[54px] md:w-[30px]" />
            <span className="wordmark text-[28px] md:text-[34px]">Silver Sphinx</span>
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <a href={TEL} className="label link-line hidden md:inline">{PHONE_DISPLAY}</a>
        </div>
        <div className="-mx-4 flex h-11 items-center justify-between border-t border-line px-4 md:hidden">
          <nav className="flex items-center gap-5" aria-label="Primary">{links}</nav>
          <a href={TEL} aria-label={`Call ${PHONE_DISPLAY}`} className="-mr-2 flex h-10 w-10 items-center justify-center transition-colors hover:text-accent"><Phone size={18} /></a>
        </div>
      </div>
    </header>
  );
}
