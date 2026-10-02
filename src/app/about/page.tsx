import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SphinxLogo } from "@/components/SphinxLogo";
import { smsLink } from "@/lib/contact";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-12 md:grid-cols-[7fr_4fr] md:px-8 md:py-20">
        <div>
          <h1 className="wordmark max-w-3xl text-6xl leading-[0.95] md:text-8xl">Silver, chosen by hand in New York.</h1>
          <p className="mt-8 max-w-xl text-lg text-muted md:text-xl">
            Silver Sphinx is one person with a good eye and a strong opinion. Every piece here was hand picked and chosen carefully before it earned a spot in the collection.
          </p>
        </div>
        <SphinxLogo mode="full" className="mx-auto aspect-[13/25] h-[clamp(300px,50dvh,560px)] md:justify-self-center" />
      </section>

      <section className="mx-auto max-w-[1400px] border-t border-line px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="display text-3xl md:text-5xl">The Sphinx&apos;s Beginning</h2>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
            Close to ten years on 47th Street. He started in the Diamond District doing the work nobody sees, sorting, grading, running stones between benches, and stayed long enough to learn how the whole block works. Today he buys, sells and makes custom pieces from the same street. If you want to know what something is really worth, or what it would take to make it, ask him.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] border-t border-line px-4 py-20 md:px-8 md:py-32">
        <Reveal>
          <p className="display max-w-2xl text-2xl md:text-4xl">Want to see a piece before you buy? Come by. We meet in the city by appointment.</p>
          <a href={smsLink("Hi, I'd like to see a piece in person.")} className="btn btn-solid mt-8">Contact</a>
        </Reveal>
      </section>
    </>
  );
}
