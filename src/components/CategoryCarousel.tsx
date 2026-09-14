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
    const amount = card ? card.offsetWidth + 12 : 200;
    ref.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Arrows + label */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/50">Browse</p>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors text-white"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors text-white"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group shrink-0 w-[160px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="160px"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-display text-xl text-white leading-none">{cat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
