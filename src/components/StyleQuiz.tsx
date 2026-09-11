"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

const steps = [
  {
    question: "What's your everyday energy?",
    options: [
      { label: "Clean & quiet", vibe: "minimal", emoji: "🤍" },
      { label: "Statement pieces", vibe: "bold", emoji: "🖤" },
      { label: "Soft & feminine", vibe: "romantic", emoji: "🌸" },
      { label: "Street-ready", vibe: "streetwear", emoji: "🔥" },
      { label: "Timeless classics", vibe: "classic", emoji: "✨" },
    ],
  },
];

export default function StyleQuiz() {
  const { quizDone, setQuizDone } = useStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!quizDone) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, [quizDone]);

  const handleSelect = (vibe: string) => {
    setQuizDone(vibe);
    setVisible(false);
  };

  const skip = () => {
    setQuizDone("all");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[var(--paper)] w-full max-w-md p-8 relative"
          >
            <p className="text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
              Style Quiz
            </p>
            <h2 className="font-display text-3xl text-[var(--ink)] mb-8 leading-tight">
              {steps[0].question}
            </h2>

            <div className="flex flex-col gap-3">
              {steps[0].options.map((opt) => (
                <button
                  key={opt.vibe}
                  onClick={() => handleSelect(opt.vibe)}
                  className="flex items-center gap-4 px-5 py-4 border border-[var(--border)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-all duration-200 group text-left"
                >
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="text-sm tracking-wide">{opt.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={skip}
              className="mt-6 text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors tracking-widest uppercase"
            >
              Skip — show everything
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
