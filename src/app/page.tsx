import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PRODUCTS, CATEGORIES, getProduct } from "@/lib/products";
import { smsLink } from "@/lib/contact";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SphinxLogo } from "@/components/SphinxLogo";

const CATEGORY_IMAGE: Record<string, string> = {
  bracelets: "/products/byzantine-chain-bracelet-1.webp",
  pendants: "/products/turquoise-drop-pendant-1.webp",
  rings: "/products/red-enamel-buckle-ring-1.webp",
  brooches: "/products/art-nouveau-profile-brooch-1.webp",
};

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const statement = getProduct("moon-face-pendant")!;

  return (
    <>
      {/* Hero: the full mark is the visual, name and two actions beside it. */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 pb-16 pt-4 md:min-h-[calc(100dvh-76px)] md:grid-cols-[6fr_5fr] md:gap-6 md:px-8 md:pb-24 md:pt-6">
        <div className="order-2 md:order-1">
          <h1 className="wordmark text-[56px] sm:text-7xl md:text-[64px] lg:text-[96px] xl:text-[116px]">Silver Sphinx</h1>
          <p className="mt-6 max-w-sm text-base text-muted md:text-lg">
            Sterling silver, hand selected in New York. Cuffs, chains, pendants and pins with weight to them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-solid">Shop all pieces</Link>
            <a href={smsLink()} className="btn btn-ghost">Contact</a>
          </div>
        </div>
        <div className="order-1 md:order-2 md:justify-self-center">
          <SphinxLogo mode="full" priority className="mx-auto aspect-[13/25] h-[clamp(300px,44dvh,660px)] md:h-[clamp(420px,70dvh,700px)]" />
        </div>
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <h2 className="text-3xl display md:text-5xl">Selected pieces</h2>
            <Link href="/shop" className="label link-line hidden sm:inline-flex items-center gap-2">
              All pieces <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Link href="/shop" className="btn btn-ghost mt-10 w-full sm:hidden">All pieces</Link>
      </section>

      {/* Statement: one big image, one short paragraph, offset. */}
      <section className="border-y border-line">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-12">
          <div className="plate relative aspect-[4/5] md:col-span-7 md:aspect-auto md:min-h-[640px]">
            <Image src={statement.images[1]} alt={statement.name} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-between gap-10 px-4 py-12 md:col-span-5 md:px-12 md:py-20">
            <Reveal>
              <p className="wordmark text-5xl md:text-7xl">Heavy.<br />Honest.<br />Silver.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-base text-muted md:text-lg">
                Every piece is sterling checked by hand before it goes out. Ask the Sphinx for this piece&apos;s story.
              </p>
              <Link href="/about" className="label link-line mt-6 inline-flex items-center gap-2">
                About the house <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories: horizontal scroll-snap on mobile, four across on desktop. */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="text-3xl display md:text-5xl">Shop by type</h2>
        </Reveal>
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:px-0">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.06} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-auto">
              <Link href={`/shop?c=${c.key}`} className="group block">
                <div className="plate relative aspect-[4/5] overflow-hidden">
                  <Image src={CATEGORY_IMAGE[c.key]} alt={c.label} fill sizes="(min-width: 768px) 25vw, 72vw" className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]" />
                </div>
                <p className="label mt-3 flex items-center justify-between">
                  {c.label}
                  <ArrowRight size={14} className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marquee: the wordmark, once, as a band. */}
      <section className="overflow-hidden border-y border-line py-5" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="wordmark outline-text px-8 text-5xl md:text-7xl">Silver Sphinx</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Closing: contact. */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl display md:text-5xl">Looking for something you don&apos;t see?</h2>
          <p className="mt-4 max-w-md text-base text-muted md:text-lg">New pieces come through every week. Text what you are after and he will keep an eye out.</p>
          <a href={smsLink("Hi, I'm looking for a specific piece.")} className="btn btn-solid mt-8">Contact</a>
        </Reveal>
      </section>
    </>
  );
}
