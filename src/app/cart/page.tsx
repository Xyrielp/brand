"use client";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart } = useStore();
  const subtotal = cart.reduce((a, c) => a + c.product.price * c.qty, 0);

  return (
    <div className="page-enter max-w-5xl mx-auto px-6 py-12">
      <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>
      <h1 className="font-display text-5xl text-[var(--ink)] mb-12">Your Bag</h1>

      {cart.length === 0 ? (
        <div className="text-center py-32 flex flex-col items-center gap-6">
          <ShoppingBag size={40} strokeWidth={1} className="text-[var(--border)]" />
          <p className="font-display text-3xl text-[var(--muted)]">Your bag is empty.</p>
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase border border-[var(--ink)] px-8 py-3 hover:bg-[var(--ink)] hover:text-white transition-all duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-[var(--border)]">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-5 py-6">
                <div className="relative w-24 h-32 shrink-0 bg-[#f0ede8] overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${item.product.id}`} className="text-sm hover:text-[var(--accent)] transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-[var(--muted)] mt-1">Size: {item.size}</p>
                    <p className="text-xs text-[var(--muted)]">Qty: {item.qty}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      ₱{(item.product.price * item.qty).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-[var(--muted)] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-[var(--border)] p-6 sticky top-24">
              <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-6">
                Order Summary
              </p>
              <div className="flex justify-between text-sm mb-3">
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-6 text-[var(--muted)]">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-[var(--border)] pt-4 flex justify-between font-medium mb-6">
                <span>Total</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <button className="w-full py-4 bg-[var(--ink)] text-white text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-all duration-300">
                Proceed to Checkout
              </button>
              <Link
                href="/shop"
                className="block text-center mt-4 text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
