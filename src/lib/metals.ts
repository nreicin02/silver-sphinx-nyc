// Buy-side pricing for the Sell page. Shared by the form (live estimate) and the API route (email).
// Offer = weight in troy oz × purity × spot price × PAYOUT_RATE.

export const PAYOUT_RATE = 0.75;

export type Metal = "silver" | "gold";
export type WeightUnit = "g" | "ozt";

export const GRAMS_PER: Record<WeightUnit, number> = { g: 1, ozt: 31.1034768 };

export const UNITS: { key: WeightUnit; label: string }[] = [
  { key: "g", label: "Grams" },
  { key: "ozt", label: "Ounces (troy)" },
];

// Purity is the fraction of pure metal. Silver is stamped in parts per thousand, gold in karats (k / 24).
export const PURITIES: Record<Metal, { key: string; label: string; purity: number }[]> = {
  silver: [
    { key: "999", label: "999 fine silver", purity: 0.999 },
    { key: "980", label: "980 silver", purity: 0.98 },
    { key: "950", label: "950 silver", purity: 0.95 },
    { key: "925", label: "925 sterling", purity: 0.925 },
  ],
  gold: [24, 22, 18, 14, 10].map((k) => ({ key: `${k}k`, label: `${k}k gold`, purity: k / 24 })),
};

export const ITEM_TYPES = [
  "Ring", "Chain or necklace", "Bracelet", "Earrings", "Pendant or charm", "Brooch",
  "Coin", "Bar or round", "Flatware or tableware", "Broken or scrap", "Other",
];

export type Spot = { silver: number; gold: number; asOf: string };

export const findPurity = (metal: Metal, key: string) => PURITIES[metal].find((p) => p.key === key);

export function estimate(opts: { metal: Metal; purityKey: string; weight: number; unit: WeightUnit; spot: Spot | null }) {
  const p = findPurity(opts.metal, opts.purityKey);
  if (!p || !opts.spot || !(opts.weight > 0)) return null;
  const troyOz = (opts.weight * GRAMS_PER[opts.unit]) / GRAMS_PER.ozt;
  return troyOz * p.purity * opts.spot[opts.metal] * PAYOUT_RATE;
}

export const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
