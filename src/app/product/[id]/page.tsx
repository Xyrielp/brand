"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, ShoppingBag, Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { useStore } from "@/store/useStore";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const { wishlist, toggleWishlist, addToCart, addRecentlyViewed } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id]);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 1500); return; }
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="page-enter max-w-7xl mx-auto px-6 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--ink)] transition-colors mb-10">
        <ChevronLeft size={14} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-20 relative overflow-hidden border-2 transition-all ${
                  activeImage === i ? "border-[var(--ink)]" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
          <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-[#f0ede8]">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-[var(--ink)] text-white px-2 py-1">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
            {product.category}
          </p>
          <h1 className="font-display text-4xl text-[var(--ink)] mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-medium">₱{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-base text-[var(--muted)] line-through">
                ₱{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-sm text-[var(--muted)] leading-relaxed mb-8">{product.description}</p>

          {/* Color */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-3">
              Color — <span className="text-[var(--ink)]">{selectedColor.name}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor.name === c.name ? "border-[var(--ink)] scale-110" : "border-[var(--border)]"
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className={`text-xs tracking-widest uppercase transition-colors ${sizeError ? "text-red-500" : "text-[var(--muted)]"}`}>
                {sizeError ? "Please select a size" : "Size"}
              </p>
              <button className="text-xs text-[var(--muted)] hover:text-[var(--ink)] underline underline-offset-2 transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => {
                const inStock = (product.stock[size] ?? 0) > 0;
                const lowStock = (product.stock[size] ?? 0) <= 3 && inStock;
                return (
                  <button
                    key={size}
                    disabled={!inStock}
                    onClick={() => setSelectedSize(size)}
                    className={`relative px-4 py-2.5 text-sm border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                        : inStock
                        ? "border-[var(--border)] hover:border-[var(--ink)]"
                        : "border-[var(--border)] text-[var(--muted)] line-through cursor-not-allowed opacity-40"
                    }`}
                  >
                    {size}
                    {lowStock && inStock && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--accent)]" />
                    )}
                  </button>
                );
              })}
            </div>
            {selectedSize && (product.stock[selectedSize] ?? 0) <= 3 && (
              <p className="mt-2 text-xs text-[var(--accent)]">
                Only {product.stock[selectedSize]} left in {selectedSize}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--ink)] text-white hover:bg-[var(--accent)]"
              }`}
            >
              {added ? <><Check size={16} /> Added to Bag</> : <><ShoppingBag size={16} /> Add to Bag</>}
            </motion.button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-14 border border-[var(--border)] flex items-center justify-center hover:border-[var(--ink)] transition-colors"
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                className={isWishlisted ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--ink)]"}
              />
            </button>
          </div>

          {/* Vibe tags */}
          <div className="flex gap-2 mt-8">
            {product.vibe.map((v) => (
              <span key={v} className="text-[10px] tracking-widest uppercase px-3 py-1 border border-[var(--border)] text-[var(--muted)]">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-8">
            You Might Also Like
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed />
    </div>
  );
}
