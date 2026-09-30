import type { Metadata, Viewport } from "next";
import { Jost, Pirata_One } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", weight: ["300", "400", "500"], display: "swap" });
const pirata = Pirata_One({ subsets: ["latin"], variable: "--font-pirata", weight: "400", display: "swap" });

// Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is bought; VERCEL_URL covers preview deploys.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: { default: "The Silver Sphinx of New York", template: "%s | The Silver Sphinx of New York" },
  description: "Sterling silver jewelry, hand selected in New York. Cuffs, chains, pendants, rings and brooches. Text to ask about any piece.",
  openGraph: { title: "The Silver Sphinx of New York", description: "Sterling silver jewelry, hand selected in New York.", type: "website" },
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
