import Link from "next/link";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { INSTAGRAM, PHONE_DISPLAY, TEL } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 md:grid-cols-[1fr_auto_1fr] md:items-end md:px-8">
        <div>
          <p className="wordmark text-4xl">Silver Sphinx</p>
          <p className="mt-3 max-w-xs text-sm text-muted">Sterling silver, hand selected in New York.</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-12 gap-y-3 md:justify-self-center" aria-label="Footer">
          <Link href="/shop" className="label link-line w-fit">Shop</Link>
          <Link href="/about" className="label link-line w-fit">About</Link>
          <Link href="/contact" className="label link-line w-fit">Contact</Link>
          <a href={TEL} className="label link-line w-fit">Call</a>
        </nav>
        <div className="flex items-center gap-4 md:justify-self-end">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-60">
            <InstagramLogo size={22} />
          </a>
          <a href={TEL} className="label text-muted transition-colors hover:text-fg">{PHONE_DISPLAY}</a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="label mx-auto max-w-[1400px] px-4 py-4 text-muted md:px-8">&copy; {new Date().getFullYear()} The Silver Sphinx of New York. All rights reserved.</p>
      </div>
    </footer>
  );
}
