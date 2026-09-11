"use client";
import { useStore } from "@/store/useStore";
import { products } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function RecentlyViewed() {
  const { recentlyViewed } = useStore();
  const items = recentlyViewed
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  if (items.length === 0) return null;

  return (
    <section className="py-16 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-8">
          Recently Viewed
        </p>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {items.map((p) => (
            <div key={p.id} className="min-w-[200px] max-w-[200px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
