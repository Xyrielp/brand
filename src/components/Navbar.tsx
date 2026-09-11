"use client";
import Link from "next/link";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cart, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=tops", label: "Tops" },
    { href: "/shop?category=bottoms", label: "Bottoms" },
    { href: "/shop?category=dresses", label: "Dresses" },
    { href: "/shop?category=outerwear", label: "Outerwear" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--paper)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-widest text-[var(--ink)]">
            DRIP
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/wishlist" className="relative">
              <Heart size={20} strokeWidth={1.5} className="text-[var(--ink)]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--accent)] rounded-full text-[10px] text-white flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingBag size={20} strokeWidth={1.5} className="text-[var(--ink)]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--ink)] rounded-full text-[10px] text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[var(--paper)] flex flex-col p-8"
          >
            <button className="self-end mb-12" onClick={() => setMenuOpen(false)}>
              <X size={24} strokeWidth={1.5} />
            </button>
            <nav className="flex flex-col gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl text-[var(--ink)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
