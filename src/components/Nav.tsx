"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE_DISPLAY, TEL } from "@/lib/contact";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const links = LINKS.map((l) => (
    <Link key={l.href} href={l.href} className="label link-line" aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
      {l.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-sm">
      {/* Desktop: one row. Mobile: wordmark on top, links and phone underneath. */}
      <div className="mx-auto max-w-[1400px] px-4 md:grid md:h-[72px] md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8">
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">{links}</nav>
        <div className="flex h-14 items-center justify-center md:h-auto">
          <Link href="/" className="wordmark text-[28px] leading-none md:text-[32px]" aria-label="The Silver Prince of New York, home">
            Silver Prince
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <a href={TEL} className="label link-line hidden md:inline">{PHONE_DISPLAY}</a>
        </div>
        <div className="-mx-4 flex h-11 items-center justify-between border-t border-line px-4 md:hidden">
          <nav className="flex items-center gap-5" aria-label="Primary">{links}</nav>
          <a href={TEL} className="label link-line">{PHONE_DISPLAY}</a>
        </div>
      </div>
    </header>
  );
}
