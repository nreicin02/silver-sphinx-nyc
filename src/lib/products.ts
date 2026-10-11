// Product catalog for Silver Sphinx.
// No prices on the site: every piece is negotiated over text or a call.
// `images` are paths under /public/products, generated from the cleaned photos.

export type Category = "bracelets" | "chains" | "pendants" | "rings" | "brooches" | "bullion";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  images: string[];
  short: string;
  details: string[];
  // Shown as its own "Weight" line on the product page (bullion sells by weight).
  weight?: string;
  featured?: boolean;
};

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "bracelets", label: "Bracelets" },
  { key: "chains", label: "Chains" },
  { key: "pendants", label: "Pendants" },
  { key: "rings", label: "Rings" },
  { key: "brooches", label: "Brooches" },
  { key: "bullion", label: "Bullion" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "lion-head-cuff",
    name: "Lion Head Torque Cuff",
    category: "bracelets",
    images: ["/products/lion-head-cuff-1.webp"],
    short: "Open cuff with two cast lion heads at the terminals.",
    details: ["Sterling silver", "Open torque, slides on from the side", "Cast lion heads with ribbed collars", "Stamped sterling"],
    featured: true,
  },
  {
    slug: "moon-face-pendant",
    name: "Moon Face Pendant",
    category: "pendants",
    images: ["/products/moon-face-pendant-1.webp", "/products/moon-face-pendant-2.webp"],
    short: "Carved bone face set in silver scrollwork with mixed stones.",
    details: ["Sterling silver", "Carved bone face", "Peridot, iolite, garnet, moonstone and amethyst", "Fixed bail"],
    featured: true,
  },
  {
    slug: "byzantine-chain-bracelet",
    name: "Byzantine Chain Bracelet",
    category: "bracelets",
    images: ["/products/byzantine-chain-bracelet-1.webp", "/products/byzantine-chain-bracelet-2.webp"],
    short: "Heavy Byzantine weave with decorated end caps and a hook clasp.",
    details: ["Sterling silver", "Byzantine link", "Hook and ring closure", "Approx. 74 g"],
    featured: true,
  },
  {
    slug: "art-nouveau-profile-brooch",
    name: "Art Nouveau Profile Brooch",
    category: "brooches",
    images: ["/products/art-nouveau-profile-brooch-1.webp", "/products/art-nouveau-profile-brooch-2.webp"],
    short: "Woman in profile with flowing hair, cast in the Art Nouveau manner.",
    details: ["Sterling silver", "Approx. 3 in. tall", "Pin stem with safety catch", "Stamped on the reverse"],
    featured: true,
  },
  {
    slug: "silver-bead-bracelet",
    name: "Silver Bead Bracelet",
    category: "bracelets",
    images: ["/products/bead-bracelet-1.webp", "/products/bead-bracelet-2.webp"],
    short: "Graduated hollow silver beads on a hidden chain.",
    details: ["Sterling silver", "Graduated beads", "Box clasp", "Southwestern pearl style"],
  },
  {
    slug: "red-enamel-buckle-ring",
    name: "Red Enamel Buckle Ring",
    category: "rings",
    images: ["/products/red-enamel-buckle-ring-1.webp"],
    short: "Belt buckle band with a red guilloché enamel panel and marcasite edge.",
    details: ["Sterling silver", "Red guilloché enamel", "Marcasite border", "Sizing available on request"],
    featured: true,
  },
  {
    slug: "harp-link-bracelet",
    name: "Harp Link Bracelet",
    category: "bracelets",
    images: ["/products/rolo-chain-bracelet-1.webp", "/products/link-bracelet-buckle-clasp-1.webp", "/products/link-bracelet-buckle-clasp-2.webp"],
    short: "Cast harp links finished with a stamped clasp.",
    details: ["Sterling silver", "Harp link", "Stamped clasp"],
  },
  {
    slug: "turquoise-drop-pendant",
    name: "Turquoise Double Drop Pendant",
    category: "pendants",
    images: ["/products/turquoise-drop-pendant-1.webp"],
    short: "Two natural turquoise cabochons in a stacked silver bezel.",
    details: ["Sterling silver", "Two turquoise cabochons", "Hinged bail"],
    featured: true,
  },
  {
    slug: "peacock-charm",
    name: "Peacock Charm",
    category: "pendants",
    images: ["/products/peacock-charm-1.webp"],
    short: "Small cast peacock with a fanned tail.",
    details: ["Sterling silver", "Jump ring bail"],
  },
  {
    slug: "silver-bar",
    name: "925 Silver Bar",
    category: "bullion",
    images: ["/products/silver-bar-pendant-1.webp"],
    short: "A poured sterling silver ingot, stamped 925 at the top.",
    details: ["925 sterling silver", "Poured ingot finish", "Stamped 925"],
  },
  {
    slug: "grape-cluster-brooch",
    name: "Grape Cluster Brooch",
    category: "brooches",
    images: ["/products/grape-cluster-brooch-1.webp"],
    short: "Bunch of grapes with vine leaves. Also wears as a pendant.",
    details: ["Sterling silver", "Approx. 1.5 in.", "Pin stem and pendant loop"],
  },
  {
    slug: "mexican-libertad-1992-1oz",
    name: "1992 Mexican Libertad, 1 oz",
    category: "bullion",
    images: ["/products/libertad-1992-1oz-1.webp", "/products/libertad-1992-1oz-2.webp", "/products/libertad-coin-pendant-1.webp", "/products/libertad-coin-pendant-2.webp"],
    short: "A 1992 Mexican Libertad in .999 fine silver. Winged Victory over the volcanoes on the front, the Mexican eagle on the back. Toned with age.",
    details: [".999 fine silver", "Mexican Libertad, dated 1992", "Mexico City Mint (Mo mark)", "Natural toning", "Pendant bezel with bail"],
    weight: "1 troy oz (31.1 g)",
    featured: true,
  },
  {
    slug: "mexican-libertad-2003-1oz",
    name: "2003 Mexican Libertad, 1 oz",
    category: "bullion",
    images: ["/products/libertad-2003-1oz-1.webp", "/products/libertad-2003-1oz-2.webp"],
    short: "A 2003 Mexican Libertad in .999 fine silver. Victory atop the Angel of Independence column on the front, ringed by historic eagle seals on the back.",
    details: [".999 fine silver", "Mexican Libertad, dated 2003", "Mexico City Mint (Mo mark)"],
    weight: "1 troy oz (31.1 g)",
  },
  {
    slug: "vintage-italian-figaro-bracelet",
    name: "Vintage Italian Figaro Bracelet",
    category: "bracelets",
    images: ["/products/figaro-bracelet-1.webp", "/products/figaro-bracelet-2.webp"],
    short: "Vintage Italian figaro bracelet in 925 sterling silver, with long links alternating with anchor links.",
    details: ["925 sterling silver", "Made in Italy", "Length: 7.25 in", "Width: 9 mm", "Lobster clasp"],
    weight: "25.1 g",
  },
  {
    slug: "vintage-angel-link-bracelet",
    name: "Vintage Angel Link Bracelet",
    category: "bracelets",
    images: ["/products/angel-link-bracelet-1.webp", "/products/angel-link-bracelet-2.webp"],
    short: "Vintage 925 sterling silver bracelet with angel links.",
    details: ["925 sterling silver", "Length: 7 in", "Width: 6 mm", "Lobster clasp"],
    weight: "8.4 g",
  },
  {
    slug: "mexican-articulated-fish-pendant",
    name: "Rare Mexican Articulated Fish Pendant",
    category: "pendants",
    images: ["/products/fish-pendant-1.webp", "/products/fish-pendant-2.webp", "/products/fish-pendant-3.webp"],
    short: "Rare Mexican 925 sterling silver fish pendant with an articulated body that moves scale by scale.",
    details: ["925 sterling silver", "Made in Mexico", "Articulated body", "Stamped Mexico 925"],
    weight: "31 g",
    featured: true,
  },
  {
    slug: "vintage-anchor-link-chain",
    name: "Vintage Anchor Link Chain",
    category: "chains",
    images: ["/products/anchor-link-chain-1.webp", "/products/anchor-link-chain-2.webp", "/products/anchor-link-chain-3.webp"],
    short: "Vintage anchor link chain in 925 sterling silver, stamped 925 Italy at the clasp.",
    details: ["925 sterling silver", "Made in Italy", "Length: 30 in", "Width: 10 mm", "Lobster clasp"],
    weight: "81.9 g",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
