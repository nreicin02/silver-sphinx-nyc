import type { Spot } from "./metals";

// Spot prices (USD per troy oz) from metalpriceapi.com. The free plan updates once a day, so a
// 12-hour cache loses nothing and keeps us to about 60 calls a month. Without a key, falls back to
// SPOT_SILVER_USD / SPOT_GOLD_USD, which also lets the owner pin a price by hand.
// Returns null when neither is available.
export async function getSpot(): Promise<Spot | null> {
  const key = process.env.METALPRICE_API_KEY;
  if (key) {
    try {
      const res = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${key}&base=USD&currencies=XAG,XAU`, {
        next: { revalidate: 43200 },
        signal: AbortSignal.timeout(8000),
      });
      const data = await res.json();
      const r = data?.rates ?? {};
      // USDXAG is dollars per ounce. XAG alone is the inverse (ounces per dollar).
      const silver = r.USDXAG ?? (r.XAG > 0 ? 1 / r.XAG : 0);
      const gold = r.USDXAU ?? (r.XAU > 0 ? 1 / r.XAU : 0);
      if (data?.success && silver > 0 && gold > 0) {
        const asOf = data.timestamp ? new Date(data.timestamp * 1000).toISOString() : new Date().toISOString();
        return { silver, gold, asOf };
      }
      console.error("metalpriceapi returned an unexpected response", data?.error);
    } catch (err) {
      console.error("metalpriceapi request failed", err);
    }
  }
  const silver = Number(process.env.SPOT_SILVER_USD);
  const gold = Number(process.env.SPOT_GOLD_USD);
  if (silver > 0 && gold > 0) return { silver, gold, asOf: new Date().toISOString() };
  return null;
}
