// Product catalog for The Silver Sphinx of New York.
// No prices on the site: every piece is negotiated over text or a call.
// `images` are paths under /public/products, generated from the cleaned photos.

export type Category = "bracelets" | "pendants" | "rings" | "brooches";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  images: string[];
  short: string;
  details: string[];
  featured?: boolean;
};

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "bracelets", label: "Bracelets" },
  { key: "pendants", label: "Pendants" },
  { key: "rings", label: "Rings" },
  { key: "brooches", label: "Brooches" },
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
    images: ["/products/silver-bead-bracelet-1.webp", "/products/silver-bead-bracelet-2.webp"],
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
    slug: "link-bracelet-buckle-clasp",
    name: "Link Bracelet with Buckle Clasp",
    category: "bracelets",
    images: ["/products/link-bracelet-buckle-clasp-1.webp", "/products/link-bracelet-buckle-clasp-2.webp"],
    short: "Alternating polished links finished with a stamped buckle clasp.",
    details: ["Sterling silver", "Buckle-style clasp", "Stamped sterling"],
  },
  {
    slug: "rolo-chain-bracelet",
    name: "Rolo Chain Bracelet",
    category: "bracelets",
    images: ["/products/rolo-chain-bracelet-1.webp"],
    short: "Round rolo links with a lobster clasp. Wears alone or stacked.",
    details: ["Sterling silver", "Rolo link", "Lobster clasp"],
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
    slug: "silver-bar-pendant",
    name: "Silver Bar Pendant",
    category: "pendants",
    images: ["/products/silver-bar-pendant-1.webp"],
    short: "A plain ingot bar, brushed finish, stamped at the top.",
    details: ["Sterling silver", "Brushed finish", "Fixed bail"],
  },
  {
    slug: "grape-cluster-brooch",
    name: "Grape Cluster Brooch",
    category: "brooches",
    images: ["/products/grape-cluster-brooch-1.webp"],
    short: "Bunch of grapes with vine leaves. Also wears as a pendant.",
    details: ["Sterling silver", "Approx. 1.5 in.", "Pin stem and pendant loop"],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
