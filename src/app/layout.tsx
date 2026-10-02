import type { Metadata, Viewport } from "next";
import { Jost, Pirata_One } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", weight: ["300", "400", "500"], display: "swap" });
const pirata = Pirata_One({ subsets: ["latin"], variable: "--font-pirata", weight: "400", display: "swap" });

// Absolute base for share images and canonical links. Never use VERCEL_URL here: it is the private
// per-deployment address, which sits behind a Vercel login and breaks link previews.
// The apex domain redirects to www, so www is the address that actually serves the site.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://www.silversphinxnyc.com" : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Google needs a favicon that is a multiple of 48px and a stable URL, so no version query strings.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: { default: "Silver Sphinx", template: "%s | Silver Sphinx" },
  description: "Sterling silver jewelry, hand selected in New York. Cuffs, chains, pendants, rings and brooches. Text to ask about any piece.",
  applicationName: "Silver Sphinx",
  openGraph: { siteName: "Silver Sphinx", title: "Silver Sphinx", description: "Sterling silver jewelry, hand selected in New York.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#05070c", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${pirata.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Starfield />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
