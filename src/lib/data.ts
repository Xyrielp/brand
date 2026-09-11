export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  vibe: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  badge?: string;
  stock: Record<string, number>;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Linen Shirt",
    price: 1850,
    category: "tops",
    vibe: ["minimal", "classic"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#C9B99A" },
      { name: "White", hex: "#F5F5F0" },
      { name: "Slate", hex: "#8A9BA8" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    ],
    badge: "Bestseller",
    stock: { XS: 5, S: 2, M: 0, L: 8, XL: 3 },
    description: "Relaxed linen weave, dropped shoulders, single chest pocket.",
  },
  {
    id: "2",
    name: "Wide-Leg Trousers",
    price: 2400,
    originalPrice: 3200,
    category: "bottoms",
    vibe: ["minimal", "bold"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ecru", hex: "#EDE8DC" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
    ],
    badge: "Sale",
    stock: { XS: 1, S: 4, M: 6, L: 2 },
    description: "High-rise, fluid drape, invisible side zip.",
  },
  {
    id: "3",
    name: "Ribbed Tank Top",
    price: 890,
    category: "tops",
    vibe: ["streetwear", "minimal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#F2EDE4" },
      { name: "Mocha", hex: "#7B5E52" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
    ],
    stock: { XS: 10, S: 8, M: 3, L: 7, XL: 5 },
    description: "Fine-rib cotton blend, slim fit, cropped length.",
  },
  {
    id: "4",
    name: "Cargo Utility Pants",
    price: 2950,
    category: "bottoms",
    vibe: ["streetwear", "bold"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#6B7C5C" },
      { name: "Charcoal", hex: "#4A4A4A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    ],
    badge: "New",
    stock: { S: 3, M: 5, L: 4, XL: 2 },
    description: "6-pocket utility cut, adjustable ankle tabs, relaxed through the thigh.",
  },
  {
    id: "5",
    name: "Slip Midi Dress",
    price: 3200,
    category: "dresses",
    vibe: ["romantic", "minimal"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#D4C5A9" },
      { name: "Dusty Rose", hex: "#C4A0A0" },
    ],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    ],
    badge: "New",
    stock: { XS: 2, S: 4, M: 3, L: 1 },
    description: "Bias-cut satin, adjustable straps, midi length with side slit.",
  },
  {
    id: "6",
    name: "Structured Blazer",
    price: 4500,
    category: "outerwear",
    vibe: ["classic", "bold"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80",
    ],
    stock: { XS: 3, S: 5, M: 4, L: 6, XL: 2 },
    description: "Single-button closure, padded shoulders, fully lined.",
  },
  {
    id: "7",
    name: "Knit Cardigan",
    price: 2100,
    category: "tops",
    vibe: ["romantic", "classic"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oat", hex: "#E8DCC8" },
      { name: "Sage", hex: "#9CAF88" },
    ],
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    ],
    stock: { S: 6, M: 4, L: 3, XL: 5 },
    description: "Open-front, chunky rib knit, oversized fit.",
  },
  {
    id: "8",
    name: "Mini Pleated Skirt",
    price: 1650,
    category: "bottoms",
    vibe: ["romantic", "bold"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Plum", hex: "#7B4F6E" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cream", hex: "#F2EDE4" },
    ],
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80",
    ],
    badge: "Bestseller",
    stock: { XS: 4, S: 2, M: 5, L: 3 },
    description: "Knife-pleat construction, elasticated waist, above-knee length.",
  },
];

export const vibes = ["minimal", "bold", "romantic", "streetwear", "classic"];
export const categories = ["all", "tops", "bottoms", "dresses", "outerwear"];
