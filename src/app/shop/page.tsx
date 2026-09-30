import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Shop" };

const isCategory = (v: unknown): v is Category => CATEGORIES.some((c) => c.key === v);

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const active = isCategory(c) ? c : undefined;
  const list = active ? PRODUCTS.filter((p) => p.category === active) : PRODUCTS;
  const title = active ? CATEGORIES.find((x) => x.key === active)!.label : "All pieces";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-16">
      <div className="flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <h1 className="text-4xl display md:text-6xl">{title}</h1>
        <nav className="-mx-4 flex gap-6 overflow-x-auto px-4 md:mx-0 md:px-0" aria-label="Categories">
          <Link href="/shop" className="label link-line shrink-0" aria-current={!active ? "page" : undefined}>All</Link>
          {CATEGORIES.map((cat) => (
            <Link key={cat.key} href={`/shop?c=${cat.key}`} className="label link-line shrink-0" aria-current={active === cat.key ? "page" : undefined}>
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>

      {list.length === 0 ? (
        <div className="py-32 text-center">
          <p className="text-2xl display">Nothing here yet.</p>
          <p className="mt-2 text-muted">New pieces land every week.</p>
          <Link href="/shop" className="btn btn-ghost mt-8">All pieces</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
        </div>
      )}
    </section>
  );
}
