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
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full min-h-[90vh] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 py-16">
          {/* Text */}
          <div className="flex-1">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
              New Season
            </p>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-8 max-w-2xl">
              Dress like you mean it.
            </h1>
            <div className="flex gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-white text-[var(--ink)] text-xs tracking-widest uppercase hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
              >
                Shop Now
              </Link>
              <Link
                href="/shop"
                className="px-8 py-4 border border-white text-white text-xs tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
              >
                Explore Vibes
              </Link>
            </div>
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
