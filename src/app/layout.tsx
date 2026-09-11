import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StyleQuiz from "@/components/StyleQuiz";

export const metadata: Metadata = {
  title: "DRIP — Premium Clothing",
  description: "Curated clothing for every vibe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <StyleQuiz />
        <main className="flex-1 pt-16">{children}</main>
        <footer className="border-t border-[var(--border)] py-12 mt-24">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="font-display text-xl tracking-widest">DRIP</span>
            <p className="text-xs text-[var(--muted)] tracking-wide">
              © {new Date().getFullYear()} DRIP. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
