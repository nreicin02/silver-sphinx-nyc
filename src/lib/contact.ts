// Single source of truth for how customers reach him. Prices are negotiated per piece over text or a call.
export const PHONE_DISPLAY = "(347) 615-5577";
export const PHONE_E164 = "+13476155577";
export const TEL = `tel:${PHONE_E164}`;
export const INSTAGRAM = "https://www.instagram.com/silver.sphinx";
export const INSTAGRAM_HANDLE = "@silver.sphinx";

export const smsLink = (body?: string) => (body ? `sms:${PHONE_E164}?&body=${encodeURIComponent(body)}` : `sms:${PHONE_E164}`);
export const smsAbout = (pieceName: string) => smsLink(`Hi, I'm interested in the ${pieceName} on your site. Is it still available?`);
