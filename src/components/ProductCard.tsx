import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [a, b] = product.images;
  const cat = CATEGORIES.find((c) => c.key === product.category)!.label;
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="plate relative aspect-square overflow-hidden">
        <Image
          src={a}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04] ${b ? "group-hover:opacity-0" : ""}`}
        />
        {b && (
          <Image
            src={b}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-3 grid gap-1">
        <p className="label">{product.name}</p>
        <p className="label text-muted">{cat}</p>
      </div>
    </Link>
  );
}
