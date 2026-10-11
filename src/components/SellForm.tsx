"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, CheckCircle, X } from "@phosphor-icons/react";
import { ITEM_TYPES, PAYOUT_RATE, PURITIES, UNITS, estimate, findPurity, usd, type Metal, type Spot, type WeightUnit } from "@/lib/metals";
import { smsLink } from "@/lib/contact";

const MAX_PHOTOS = 6;

// Phone photos run 3 to 5 MB each. Shrink to 1600px JPEG in the browser so six fit in one request.
async function shrink(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file; // Browser can't decode it (rare). Send as is; the server caps total size.
  }
}

type Photo = { file: File; url: string };

export function SellForm({ spot }: { spot: Spot | null }) {
  const [metal, setMetal] = useState<Metal>("silver");
  const [purityKey, setPurityKey] = useState("925");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<WeightUnit>("g");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const offer = useMemo(() => estimate({ metal, purityKey, weight: Number(weight), unit, spot }), [metal, purityKey, weight, unit, spot]);
  const purity = findPurity(metal, purityKey);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const pickMetal = (m: Metal) => {
    setMetal(m);
    setPurityKey(m === "silver" ? "925" : "14k");
  };

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_PHOTOS - photos.length;
    const shrunk = await Promise.all([...files].slice(0, room).map(shrink));
    setPhotos((prev) => [...prev, ...shrunk.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
    if (fileInput.current) fileInput.current.value = "";
  };

  const removePhoto = (i: number) => setPhotos((prev) => prev.filter((_, j) => j !== i));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (photos.length === 0) return setError("Add at least one photo.");
    const data = new FormData(e.currentTarget);
    data.set("metal", metal);
    data.set("purity", purityKey);
    data.set("unit", unit);
    photos.forEach((p) => data.append("photos", p.file));
    setStatus("sending");
    try {
      const res = await fetch("/api/sell", { method: "POST", body: data });
      const json = await res.json().catch(() => ({ ok: false, error: "Something went wrong. Please try again." }));
      if (!json.ok) throw new Error(json.error);
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-24 text-center">
        <CheckCircle size={40} weight="thin" className="mx-auto text-accent" />
        <p className="mt-6 text-3xl display md:text-4xl">Request received</p>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {offer != null ? `Your estimate was ${usd(offer)}. ` : ""}We will contact you at the number provided with a final offer.
        </p>
      </div>
    );
  }

  const estimatePanel = (
    <div className="plate p-6 md:p-8" aria-live="polite">
      <p className="label text-muted">Your estimate</p>
      <p className="mt-3 text-5xl display tabular-nums md:text-6xl">{offer != null ? usd(offer) : "$0.00"}</p>
      {spot ? (
        <div className="mt-5 grid gap-1.5 text-sm text-muted">
          <p>{metal === "silver" ? "Silver" : "Gold"} spot: {usd(spot[metal])} per troy oz</p>
          {purity && <p>{purity.label} is {(purity.purity * 100).toFixed(1)}% pure</p>}
          <p>Payout: {PAYOUT_RATE * 100}% of melt value</p>
        </div>
      ) : (
        <p className="mt-5 text-sm text-muted">Live pricing is unavailable. Submit your details to receive a quote.</p>
      )}
      <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        Estimate only. Spot prices update once daily{spot ? ` (last updated ${new Date(spot.asOf).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})` : ""} and may differ from live market rates. Final offer is subject to in-person weight and purity verification.
      </p>
    </div>
  );

  return (
    <form onSubmit={submit} className="mt-10 grid gap-12 md:grid-cols-12 md:gap-12">
      <div className="grid gap-12 md:col-span-7">
        {/* The piece */}
        <fieldset className="grid gap-6">
          <legend className="label mb-6">1 · The piece</legend>

          <label className="grid gap-2">
            <span className="text-sm text-muted">What is it?</span>
            <select name="itemType" required defaultValue="" className="field">
              <option value="" disabled>Choose a type</option>
              {ITEM_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>

          <div className="grid gap-2">
            <span className="text-sm text-muted">Metal</span>
            <div className="grid grid-cols-2 gap-2">
              {(["silver", "gold"] as Metal[]).map((m) => (
                <button key={m} type="button" className="chip" aria-pressed={metal === m} onClick={() => pickMetal(m)}>
                  {m === "silver" ? "Silver" : "Gold"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-sm text-muted">{metal === "silver" ? "Purity stamp" : "Karat"}</span>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${PURITIES[metal].length}, minmax(0, 1fr))` }}>
              {PURITIES[metal].map((p) => (
                <button key={p.key} type="button" className="chip" aria-pressed={purityKey === p.key} onClick={() => setPurityKey(p.key)}>
                  {metal === "silver" ? p.key : p.key.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted">
              No visible stamp? <a href={smsLink("Hi, I have a piece to sell but can't read the stamp. Can I send you a photo?")} className="link-line text-fg">Send us a photo.</a>
            </p>
          </div>

          <div className="grid gap-2">
            <span className="text-sm text-muted">Weight</span>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <input name="weight" type="number" inputMode="decimal" step="any" min="0.01" required placeholder="0.0" value={weight} onChange={(e) => setWeight(e.target.value)} className="field tabular-nums" aria-label="Weight" />
              <select value={unit} onChange={(e) => setUnit(e.target.value as WeightUnit)} className="field" aria-label="Weight unit">
                {UNITS.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
              </select>
            </div>
            <p className="text-xs text-muted">Enter the weight of the metal only, excluding stones.</p>
          </div>
        </fieldset>

        {/* Estimate shows here on phones, in the sticky column on desktop. */}
        <div className="md:hidden">{estimatePanel}</div>

        {/* Photos */}
        <fieldset className="grid gap-4">
          <legend className="label mb-6">2 · Photos</legend>
          <p className="text-sm text-muted">Include the full item and a close-up of the stamp. Up to {MAX_PHOTOS} photos.</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {photos.map((p, i) => (
              <div key={p.url} className="plate relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                <img src={p.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                <button type="button" onClick={() => removePhoto(i)} aria-label={`Remove photo ${i + 1}`} className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center bg-bg/80 transition-colors hover:text-accent">
                  <X size={14} />
                </button>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <button type="button" onClick={() => fileInput.current?.click()} className="plate flex aspect-square flex-col items-center justify-center gap-2 text-muted transition-colors hover:text-fg">
                <Camera size={24} weight="light" />
                <span className="label">Add</span>
              </button>
            )}
          </div>
          <input ref={fileInput} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addPhotos(e.target.files)} />
        </fieldset>

        {/* Contact */}
        <fieldset className="grid gap-6">
          <legend className="label mb-6">3 · How to reach you</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-muted">Name</span>
              <input name="name" required autoComplete="name" className="field" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-muted">Phone</span>
              <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" />
            </label>
          </div>
          <label className="grid gap-2">
            <span className="text-sm text-muted">Email (optional)</span>
            <input name="email" type="email" autoComplete="email" className="field" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-muted">Anything else? (optional)</span>
            <textarea name="notes" rows={4} maxLength={1500} placeholder="Markings, history, stones, how many pieces" className="field h-auto py-3" />
          </label>
          {/* Honeypot for bots. Hidden from people and screen readers. */}
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        </fieldset>

        <div className="grid gap-4">
          {error && <p role="alert" className="text-sm text-[#ffb4b4]">{error}</p>}
          <button type="submit" disabled={status === "sending"} className="btn btn-solid w-full disabled:opacity-60 sm:w-auto sm:min-w-[280px]">
            {status === "sending" ? "Sending…" : "Request an offer"}
          </button>
        </div>
      </div>

      <aside className="hidden md:col-span-5 md:block">
        <div className="md:sticky md:top-28">{estimatePanel}</div>
      </aside>
    </form>
  );
}
