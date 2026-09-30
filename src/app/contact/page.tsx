import type { Metadata } from "next";
import { ChatCircle, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { INSTAGRAM, INSTAGRAM_HANDLE, PHONE_DISPLAY, TEL, smsLink } from "@/lib/contact";
import { SphinxLogo } from "@/components/SphinxLogo";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-14 md:min-h-[calc(100dvh-76px-200px)] md:grid-cols-[7fr_4fr] md:px-8 md:py-16">
      <div>
        <h1 className="display text-4xl md:text-6xl">Talk to the Sphinx</h1>
        <a href={TEL} className="wordmark mt-8 block whitespace-nowrap text-5xl transition-colors [text-shadow:0_0_44px_rgba(140,180,255,0.35)] hover:text-accent sm:text-6xl lg:text-8xl">{PHONE_DISPLAY}</a>
        <div className="mt-10 flex flex-col items-start gap-8">
          <a href={smsLink("Hi, I saw your site and have a question.")} className="btn btn-solid w-full sm:w-auto sm:min-w-[240px]"><ChatCircle size={16} /> Contact</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="label link-line inline-flex items-center gap-2"><InstagramLogo size={16} /> {INSTAGRAM_HANDLE}</a>
        </div>
      </div>
      <SphinxLogo mode="full" className="mx-auto aspect-[13/25] h-[clamp(300px,50dvh,560px)] md:justify-self-center" />
    </section>
  );
}
