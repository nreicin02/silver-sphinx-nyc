import type { Metadata, Viewport } from "next";
import { Archivo, Pirata_One } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", weight: ["400", "500", "600"], display: "swap" });
const pirata = Pirata_One({ subsets: ["latin"], variable: "--font-pirata", weight: "400", display: "swap" });

// Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is bought; VERCEL_URL covers preview deploys.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "The Silver Prince of New York", template: "%s | The Silver Prince of New York" },
  description: "Sterling silver jewelry, hand selected in New York. Cuffs, chains, pendants, rings and brooches. Text to ask about any piece.",
  openGraph: { title: "The Silver Prince of New York", description: "Sterling silver jewelry, hand selected in New York.", type: "website" },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f5f3" }, { media: "(prefers-color-scheme: dark)", color: "#131313" }] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${pirata.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
