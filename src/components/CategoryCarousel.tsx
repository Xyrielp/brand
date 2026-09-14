"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    label: "Tops",
    href: "/shop?category=tops",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
  },
  {
    label: "Bottoms",
    href: "/shop?category=bottoms",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
  },
  {
    label: "Dresses",
    href: "/shop?category=dresses",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  },
  {
    label: "Outerwear",
    href: "/shop?category=outerwear",
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80",
  },
];

export default function CategoryCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    const card = ref.current.querySelector("a") as HTMLElement;
    const amount = card ? card.offsetWidth + 24 : 300;
    ref.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-1">Browse by</p>
          <h2 className="font-display text-4xl text-[var(--ink)]">Category</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 border border-[var(--border)] flex items-center justify-center hover:border-[var(--ink)] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 border border-[var(--border)] flex items-center justify-center hover:border-[var(--ink)] transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group shrink-0 w-[260px] sm:w-[300px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f0ede8]">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-3xl text-white leading-none">{cat.label}</p>
                <p className="text-[10px] tracking-widest uppercase text-white/70 mt-1">Shop now →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
