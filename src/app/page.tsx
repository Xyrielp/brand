import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import CategoryCarousel from "@/components/CategoryCarousel";

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[#1a1a1a]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full min-h-[90vh] flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16 py-20">
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[var(--accent)]" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)]">
                New Season — 2025
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-display text-white leading-[0.92] mb-6">
              <span className="block text-5xl sm:text-7xl lg:text-8xl">Dress like</span>
              <span className="block text-5xl sm:text-7xl lg:text-8xl italic text-[var(--accent)]">you mean it.</span>
            </h1>

            {/* Subline */}
            <p className="text-sm text-white/40 font-light tracking-wide max-w-xs mb-10 leading-relaxed">
              Curated pieces for every vibe — minimal, bold, romantic, and beyond.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-white text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:bg-white hover:text-[var(--ink)]"
              >
                Shop the Collection
                <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white/70 text-[11px] tracking-[0.2em] uppercase hover:border-white hover:text-white transition-all duration-300"
              >
                Explore Vibes
              </Link>
            </div>

            {/* Social proof */}
            <p className="mt-8 text-[10px] tracking-widest uppercase text-white/25">
              Free shipping on orders over ₱3,000
            </p>
          </div>

          {/* Category carousel */}
          <div className="w-full lg:w-[420px] shrink-0">
            <CategoryCarousel />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
              Handpicked
            </p>
            <h2 className="font-display text-4xl text-[var(--ink)]">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--ink)] transition-colors border-b border-[var(--border)] pb-0.5"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Brand strip */}
      <section className="bg-[var(--ink)] py-20 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-[var(--accent)] mb-4">
          The Philosophy
        </p>
        <h2 className="font-display text-4xl sm:text-6xl text-white max-w-3xl mx-auto leading-tight">
          Less noise. More intention.
        </h2>
        <p className="mt-6 text-sm text-white/50 max-w-md mx-auto leading-relaxed">
          Every piece is chosen for how it makes you feel — not just how it looks on a hanger.
        </p>
      </section>

      {/* All products */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl text-[var(--ink)]">The Collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
