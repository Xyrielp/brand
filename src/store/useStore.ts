"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data";

type CartItem = { product: Product; size: string; qty: number };

type Store = {
  wishlist: string[];
  cart: CartItem[];
  recentlyViewed: string[];
  quizDone: boolean;
  selectedVibe: string | null;

  toggleWishlist: (id: string) => void;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  addRecentlyViewed: (id: string) => void;
  setQuizDone: (vibe: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      wishlist: [],
      cart: [],
      recentlyViewed: [],
      quizDone: false,
      selectedVibe: null,

      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        })),

      addToCart: (product, size) =>
        set((s) => {
          const existing = s.cart.find(
            (c) => c.product.id === product.id && c.size === size
          );
          if (existing) {
            return {
              cart: s.cart.map((c) =>
                c.product.id === product.id && c.size === size
                  ? { ...c, qty: c.qty + 1 }
                  : c
              ),
            };
          }
          return { cart: [...s.cart, { product, size, qty: 1 }] };
        }),

      removeFromCart: (id, size) =>
        set((s) => ({
          cart: s.cart.filter((c) => !(c.product.id === id && c.size === size)),
        })),

      addRecentlyViewed: (id) =>
        set((s) => ({
          recentlyViewed: [id, ...s.recentlyViewed.filter((r) => r !== id)].slice(0, 6),
        })),

      setQuizDone: (vibe) => set({ quizDone: true, selectedVibe: vibe }),
    }),
    { name: "drip-store" }
  )
);
