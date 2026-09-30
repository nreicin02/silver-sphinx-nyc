"use client";
import Image from "next/image";
import { useState } from "react";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div className={images.length > 1 ? "grid gap-3 md:grid-cols-[72px_minmax(0,1fr)] md:gap-4" : "grid"}>
      {images.length > 1 && (
        <div className="order-2 flex gap-3 md:order-1 md:flex-col">
          {images.map((src, k) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(k)}
              aria-label={`View image ${k + 1}`}
              aria-pressed={k === i}
              className={`plate relative aspect-square w-[72px] overflow-hidden border transition-colors ${k === i ? "border-fg" : "border-transparent hover:border-line"}`}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="plate relative order-1 aspect-square w-full overflow-hidden md:order-2">
        <div key={images[i]} className="fade-in absolute inset-0">
          <Image src={images[i]} alt={`${name}, view ${i + 1}`} fill priority sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
