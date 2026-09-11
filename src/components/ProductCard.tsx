"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const lowStock = Object.values(product.stock).some((s) => s > 0 && s <= 3);
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!showSizes) { setShowSizes(true); return; }
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => { setAdded(false); setShowSizes(false); setSelectedSize(null); }, 1500);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div
        className="relative overflow-hidden bg-[#f0ede8] aspect-[3/4]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setShowSizes(false); }}
      >
        {/* Images */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${hovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-[var(--ink)] text-white px-2 py-1">
            {product.badge}
          </span>
        )}

        {/* Low stock */}
        {lowStock && totalStock > 0 && (
          <span className="absolute top-3 right-3 text-[10px] tracking-wide text-[var(--accent)] bg-white/90 px-2 py-1">
            Almost gone
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={isWishlisted ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--ink)]"}
          />
        </button>

        {/* Quick add */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3"
              onClick={(e) => e.preventDefault()}
            >
              {showSizes ? (
                <div className="bg-white/95 backdrop-blur-sm p-3 flex flex-col gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {product.sizes.map((size) => {
                      const inStock = (product.stock[size] ?? 0) > 0;
                      return (
                        <button
                          key={size}
                          disabled={!inStock}
                          onClick={() => setSelectedSize(size)}
                          className={`text-xs px-2.5 py-1 border transition-all ${
                            selectedSize === size
                              ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                              : inStock
                              ? "border-[var(--border)] hover:border-[var(--ink)]"
                              : "border-[var(--border)] text-[var(--muted)] line-through cursor-not-allowed"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleQuickAdd}
                    disabled={!selectedSize}
                    className={`w-full py-2 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
                      selectedSize
                        ? "bg-[var(--ink)] text-white hover:bg-[var(--accent)]"
                        : "bg-[var(--border)] text-[var(--muted)] cursor-not-allowed"
                    }`}
                  >
                    {added ? <><Check size={14} /> Added</> : <><ShoppingBag size={14} /> Add to Bag</>}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleQuickAdd}
                  className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-xs tracking-widest uppercase text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Quick Add
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-[var(--ink)] leading-snug">{product.name}</p>
          <div className="flex gap-1 shrink-0 mt-0.5">
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-3 h-3 rounded-full border border-[var(--border)]"
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">₱{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-[var(--muted)] line-through">
              ₱{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
