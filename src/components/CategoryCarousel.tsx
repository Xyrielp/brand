"use client";
import { useState, useRef } from "react";
import Image from "next/image";
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
  const touchStartX = useRef<number | null>(null);

  const step = (dir: number) => setActive((prev) => (prev + dir + COUNT) % COUNT);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) step(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] tracking-[0.3em] uppercase text-white/50">Browse</p>

      {/* Coverflow stage */}
      <div
        className="relative flex items-center justify-center select-none"
        style={{ height: 280 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {categories.map((cat, i) => {
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
              onClick={() => (isCenter ? router.push(cat.href) : setActive(i))}
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
                <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="160px" />
                <div
                  className="absolute inset-0 transition-colors duration-300"
                  style={{ background: isCenter ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.45)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-display text-xl text-white leading-none">{cat.label}</p>
                  {isCenter && (
                    <p className="text-[10px] tracking-widest uppercase text-white/60 mt-1">Shop now →</p>
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
