"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

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

const SPACING = 110;
const COUNT = categories.length;

export default function CategoryCarousel() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const step = (dir: number) => {
    setActive((prev) => (prev + dir + COUNT) % COUNT);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Label + arrows */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/50">Browse</p>
        <div className="flex gap-2">
          <button
            onClick={() => step(-1)}
            className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors text-white"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => step(1)}
            className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors text-white"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Coverflow stage */}
      <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: 320 }}>
        {categories.map((cat, i) => {
          // Shortest-path offset with wraparound
          let offset = i - active;
          if (offset > COUNT / 2) offset -= COUNT;
          if (offset < -COUNT / 2) offset += COUNT;

          const absOffset = Math.abs(offset);
          const scale = 1 - absOffset * 0.18;
          const opacity = 1 - absOffset * 0.35;
          const x = offset * SPACING;
          const zIndex = 10 - absOffset;
          const isCenter = offset === 0;

          return (
            <div
              key={cat.label}
              onClick={() => {
                if (isCenter) router.push(cat.href);
                else setActive(i);
              }}
              className="absolute cursor-pointer"
              style={{
                transform: `translateX(${x}px) scale(${scale})`,
                opacity,
                zIndex,
                transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease",
                width: 160,
              }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div
                  className="absolute inset-0 transition-colors duration-300"
                  style={{ background: isCenter ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.45)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-display text-xl text-white leading-none">{cat.label}</p>
                  {isCenter && (
                    <p className="text-[10px] tracking-widest uppercase text-white/60 mt-1">
                      Shop now →
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
