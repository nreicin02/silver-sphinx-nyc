import { ITEM_TYPES, PAYOUT_RATE, UNITS, estimate, findPurity, usd, type Metal, type WeightUnit } from "@/lib/metals";
import { getSpot } from "@/lib/spot";
import { PHONE_DISPLAY } from "@/lib/contact";

// Receives a Sell form submission and emails it, photos attached, to the owner through Resend.
// Photos arrive already shrunk in the browser so the request stays under Vercel's 4.5 MB body limit.

const MAX_PHOTOS = 6;
const MAX_TOTAL_BYTES = 4_000_000;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const fail = (error: string, status = 400) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("The upload was too large. Try fewer photos.", 413);
  }
  const text = (k: string, max = 200) => String(form.get(k) ?? "").trim().slice(0, max);

  // Honeypot: real people never see or fill this field.
  if (text("company")) return Response.json({ ok: true });

  const name = text("name", 80);
  const phone = text("phone", 30);
  const email = text("email", 120);
  const itemType = text("itemType", 40);
  const metal = text("metal") as Metal;
  const purityKey = text("purity", 10);
  const unit = text("unit") as WeightUnit;
  const weight = Number(text("weight", 20));
  const notes = text("notes", 1500);
  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0).slice(0, MAX_PHOTOS);

  if (!name) return fail("Add your name.");
  if (phone.replace(/\D/g, "").length < 10) return fail("Enter a valid phone number.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("That email address looks off.");
  if (!ITEM_TYPES.includes(itemType)) return fail("Pick an item type.");
  if (metal !== "silver" && metal !== "gold") return fail("Pick a metal.");
  const purity = findPurity(metal, purityKey);
  if (!purity) return fail("Pick the purity stamped on the piece.");
  if (!UNITS.some((u) => u.key === unit) || !(weight > 0) || weight > 100_000) return fail("Add the weight.");
  if (photos.length === 0) return fail("Add at least one photo.");
  if (photos.some((p) => !p.type.startsWith("image/"))) return fail("Photos only, please.");
  if (photos.reduce((n, p) => n + p.size, 0) > MAX_TOTAL_BYTES) return fail("The photos are too large. Try fewer.", 413);

  // Recompute on the server. Never trust the number the browser showed.
  const spot = await getSpot();
  const offer = estimate({ metal, purityKey, weight, unit, spot });
  const unitLabel = UNITS.find((u) => u.key === unit)!.label.toLowerCase();
  const offerText = offer != null ? usd(offer) : "No estimate (spot price unavailable)";

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "None given"],
    ["Item", itemType],
    ["Metal", purity.label],
    ["Weight", `${weight} ${unitLabel}`],
    ["Estimate", offerText],
    ["Spot used", spot ? `${usd(spot[metal])}/oz ${metal}, as of ${new Date(spot.asOf).toUTCString()}` : "Unavailable"],
    ["Payout rate", `${PAYOUT_RATE * 100}% of melt value`],
    ["Notes", notes || "None"],
  ];
  const html = `<h2 style="font-family:sans-serif">New sell request</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>
<p style="font-family:sans-serif;color:#666">${photos.length} photo${photos.length === 1 ? "" : "s"} attached. Reply to this email or text ${esc(phone)}.</p>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SELL_EMAIL_TO;
  const subject = `Sell request: ${purity.label} ${itemType.toLowerCase()}, ${weight} ${unit}, est. ${offer != null ? usd(offer) : "n/a"}`;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      // Local dev without email set up: log instead of sending so the form can still be tested.
      console.log(`[sell] would email ${to ?? "(no SELL_EMAIL_TO)"}: ${subject}\n`, rows, photos.map((p) => `${p.name} ${p.size}B`));
      return Response.json({ ok: true, estimate: offer });
    }
    console.error("[sell] RESEND_API_KEY or SELL_EMAIL_TO missing");
    return fail(`We couldn't send this right now. Please try again or call ${PHONE_DISPLAY}.`, 500);
  }

  const attachments = await Promise.all(
    photos.map(async (p, i) => ({ filename: p.name || `photo-${i + 1}.jpg`, content: Buffer.from(await p.arrayBuffer()).toString("base64") })),
  );
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.SELL_EMAIL_FROM ?? "Silver Sphinx <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: email || undefined,
      subject,
      html,
      attachments,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    console.error("[sell] Resend error", res.status, await res.text());
    return fail(`We couldn't send this right now. Please try again or call ${PHONE_DISPLAY}.`, 502);
  }
  return Response.json({ ok: true, estimate: offer });
}
