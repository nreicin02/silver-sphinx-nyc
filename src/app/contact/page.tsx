import type { Metadata } from "next";
import { ChatCircle, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { INSTAGRAM, INSTAGRAM_HANDLE, PHONE_DISPLAY, TEL, smsLink } from "@/lib/contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-28">
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">Talk to the Prince</h1>
      <a href={TEL} className="wordmark mt-8 block text-5xl transition-colors hover:text-muted sm:text-7xl md:text-8xl">{PHONE_DISPLAY}</a>
      <div className="mt-10 flex flex-col items-start gap-8">
        <a href={smsLink("Hi, I saw your site and have a question.")} className="btn btn-solid w-full sm:w-auto sm:min-w-[240px]"><ChatCircle size={16} /> Contact</a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="label link-line inline-flex items-center gap-2"><InstagramLogo size={16} /> {INSTAGRAM_HANDLE}</a>
      </div>
    </section>
  );
}
