import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, CATEGORIES } from "@/lib/products";
import { PHONE_DISPLAY } from "@/lib/contact";
import { ProductCard } from "@/components/ProductCard";
import { Gallery } from "@/components/Gallery";
import { InquireButtons } from "@/components/InquireButtons";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.short, openGraph: { images: [p.images[0]] } } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const catLabel = CATEGORIES.find((c) => c.key === p.category)!.label;
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto grid max-w-[1400px] gap-8 px-4 py-6 md:grid-cols-12 md:gap-12 md:px-8 md:py-12">
        <div className="md:col-span-7">
          <Gallery images={p.images} name={p.name} />
        </div>
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <Link href={`/shop?c=${p.category}`} className="label link-line text-muted">{catLabel}</Link>
          <h1 className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">{p.name}</h1>
          <p className="mt-3 text-muted">Price on request</p>
          <p className="mt-6 max-w-md">{p.short}</p>
          <InquireButtons pieceName={p.name} />
          <ul className="mt-10 grid gap-2 border-t border-line pt-6">
            {p.details.map((d) => <li key={d} className="text-sm">{d}</li>)}
          </ul>
          <p className="mt-8 text-sm text-muted">Text {PHONE_DISPLAY} to ask about this piece.</p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
          <h2 className="border-b border-line pb-5 text-2xl font-medium tracking-tight md:text-4xl">More {catLabel.toLowerCase()}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
