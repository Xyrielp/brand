"use client";
import { useStore } from "@/store/useStore";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  return (
    <div className="page-enter max-w-7xl mx-auto px-6 py-12">
      <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
        {items.length} saved {items.length === 1 ? "piece" : "pieces"}
      </p>
      <h1 className="font-display text-5xl text-[var(--ink)] mb-12">Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-32 flex flex-col items-center gap-6">
          <Heart size={40} strokeWidth={1} className="text-[var(--border)]" />
          <p className="font-display text-3xl text-[var(--muted)]">Nothing saved yet.</p>
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase border border-[var(--ink)] px-8 py-3 hover:bg-[var(--ink)] hover:text-white transition-all duration-200"
          >
            Browse the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
