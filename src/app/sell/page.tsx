import type { Metadata } from "next";
import { getSpot } from "@/lib/spot";
import { SellForm } from "@/components/SellForm";

// Rebuild every 12 hours so the spot price on the page stays current (matches the fetch cache in lib/spot).
export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Sell",
  description: "Sell your silver and gold in New York. Enter the weight and purity for an instant estimate based on today's spot price.",
};

export default async function SellPage() {
  const spot = await getSpot();
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-16">
      <div className="border-b border-line pb-8">
        <p className="label text-muted">We buy</p>
        <h1 className="mt-3 text-4xl display md:text-6xl">Sell your silver and gold</h1>
        <p className="mt-4 max-w-xl text-muted">
          Enter your item&apos;s details for an estimate based on today&apos;s spot price. Submit with photos to receive an offer.
        </p>
      </div>
      <SellForm spot={spot} />
    </section>
  );
}
