"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircleQuestion, Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  /** Section heading. The government page calls its FAQ "Questions on Implementation". */
  title?: string;
  intro?: string;
  theme?: "light" | "beige";
  variant?: "default" | "article";
};

/**
 * Accordion FAQ used across the marketing pages. The matching FAQPage
 * structured data is emitted by the page itself via `faqSchema`, so this
 * component stays presentational and can be dropped into any section order.
 */
const FAQ = ({ items, title = "FAQ", intro, theme = "light", variant = "default" }: Props) => {
  const [open, setOpen] = useState<number | null>(0);

  if (variant === "article") {
    return (
      <section aria-labelledby="article-faq-title" className="overflow-hidden rounded-[28px] border border-zolix-dark/10 bg-zolix-beige shadow-[0_20px_60px_rgba(26,26,26,0.08)] md:rounded-[36px]">
        <header className="relative overflow-hidden bg-zolix-dark px-6 py-8 text-white md:px-10 md:py-11">
          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[28px] border-zolix-orange/30" />
          <div className="relative max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zolix-orange">
              <MessageCircleQuestion size={16} /> Answers at a glance
            </div>
            <h2 id="article-faq-title" className="text-3xl font-extrabold leading-none tracking-tight md:text-5xl">
              {title}
            </h2>
            {intro && <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">{intro}</p>}
          </div>
        </header>

        <div className="space-y-3 p-3 md:space-y-4 md:p-5">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-zolix-orange/40 bg-white shadow-sm" : "border-zolix-dark/10 bg-white/60 hover:border-zolix-orange/30 hover:bg-white"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`article-faq-answer-${i}`}
                    className="group flex w-full items-center gap-4 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zolix-orange md:px-6 md:py-6"
                  >
                    <span className="hidden text-xs font-bold tabular-nums text-zolix-orange sm:block">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`flex-1 text-lg font-bold leading-snug transition-colors md:text-xl ${isOpen ? "text-zolix-dark" : "text-zolix-dark/85 group-hover:text-zolix-orange"}`}>
                      {item.q}
                    </span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-zolix-orange text-white" : "bg-zolix-beige text-zolix-dark/55 group-hover:bg-zolix-orange/15 group-hover:text-zolix-orange"}`}>
                      <Plus size={18} strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={`article-faq-answer-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mx-5 mb-5 border-l-2 border-zolix-orange/50 pl-4 md:mx-6 md:mb-6 md:pl-5">
                    <p className="max-w-3xl text-base leading-relaxed text-zolix-dark/65 md:text-lg">{item.a}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      data-nav-theme={theme === "beige" ? "beige" : "light"}
      className={`py-32 px-6 ${theme === "beige" ? "bg-zolix-beige" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zolix-dark mb-6">
            {title}
          </h2>
          {intro && (
            <p className="text-xl text-zolix-dark/40 font-medium leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>

        <div className="divide-y divide-zolix-dark/10 border-y border-zolix-dark/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex items-start justify-between gap-8 py-8 text-left group"
                  >
                    <span className="text-lg md:text-xl font-bold text-zolix-dark group-hover:text-zolix-orange transition-colors">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-zolix-orange text-white rotate-45"
                          : "bg-zolix-dark/5 text-zolix-dark/40 group-hover:bg-zolix-orange/10 group-hover:text-zolix-orange"
                      }`}
                    >
                      <Plus size={16} strokeWidth={3} />
                    </span>
                  </button>
                </h3>

                {/* Answers stay mounted and are collapsed with height/opacity so
                    the copy is always present in the DOM for crawlers. */}
                <motion.div
                  id={`faq-answer-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 pr-16 text-lg leading-relaxed text-zolix-dark/60 font-medium">
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
