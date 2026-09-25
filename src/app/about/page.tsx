import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { smsLink } from "@/lib/contact";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-20">
        <h1 className="wordmark max-w-4xl text-6xl leading-[0.95] md:text-8xl">Silver, chosen by hand in New York.</h1>
        <p className="mt-8 max-w-xl text-lg text-muted md:text-xl">
          The Silver Prince of New York is one person with a good eye and a strong opinion. Every piece here was hand picked and chosen carefully before it earned a spot in the collection.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] border-t border-line px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl">The Prince&apos;s Beginning</h2>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
            Close to ten years on 47th Street. He started in the Diamond District doing the work nobody sees, sorting, grading, running stones between benches, and stayed long enough to learn how the whole block works. Today he buys, sells and makes custom pieces from the same street. If you want to know what something is really worth, or what it would take to make it, ask him.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] border-t border-line px-4 py-20 md:px-8 md:py-32">
        <Reveal>
          <p className="max-w-2xl text-2xl font-medium tracking-tight md:text-4xl">Want to see a piece before you buy? Come by. We meet in the city by appointment.</p>
          <a href={smsLink("Hi, I'd like to see a piece in person.")} className="btn btn-solid mt-8">Contact</a>
        </Reveal>
      </section>
    </>
  );
}
