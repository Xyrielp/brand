"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, vibes } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useStore } from "@/store/useStore";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const { selectedVibe } = useStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVibe, setActiveVibe] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
    if (selectedVibe && selectedVibe !== "all") setActiveVibe(selectedVibe);
  }, [searchParams, selectedVibe]);

  let filtered = products.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const vibeMatch = !activeVibe || p.vibe.includes(activeVibe);
    return catMatch && vibeMatch;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="page-enter max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-1">
          {filtered.length} pieces
        </p>
        <h1 className="font-display text-5xl text-[var(--ink)]">Shop</h1>
      </div>

      {/* Filters bar */}
      <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
        {/* Category tabs */}
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[var(--ink)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs tracking-wide border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--ink)] focus:outline-none"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* Vibe filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase border border-[var(--border)] px-4 py-2 hover:border-[var(--ink)] transition-colors"
          >
            <SlidersHorizontal size={14} />
            Vibe
            {activeVibe && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
          </button>
        </div>
      </div>

      {/* Vibe filter panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-10"
          >
            <div className="border border-[var(--border)] p-6 flex flex-wrap gap-3">
              <p className="w-full text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                Filter by vibe
              </p>
              {vibes.map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVibe(activeVibe === v ? null : v)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase border transition-all duration-200 ${
                    activeVibe === v
                      ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                  }`}
                >
                  {v}
                </button>
              ))}
              {activeVibe && (
                <button
                  onClick={() => setActiveVibe(null)}
                  className="flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--ink)] ml-auto"
                >
                  <X size={12} /> Clear
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-32">
          <p className="font-display text-3xl text-[var(--muted)]">No pieces found.</p>
          <button
            onClick={() => { setActiveCategory("all"); setActiveVibe(null); }}
            className="mt-4 text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <RecentlyViewed />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-12"><p className="text-xs tracking-widest uppercase text-[var(--muted)]">Loading...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
