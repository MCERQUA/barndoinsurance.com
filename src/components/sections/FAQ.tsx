"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQS, SITE } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-canvas scroll-mt-24">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">Frequently Asked Questions</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink font-extrabold mb-4 tracking-tight">
              Barndominium Insurance, Answered
            </h2>
            <p className="font-body text-lg text-muted leading-relaxed">
              Real answers from barndo specialists &mdash; not a chatbot guessing at why a carrier
              declines a steel-frame home.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={i} delay={Math.min(i * 0.03, 0.3)}>
                <div
                  className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                    isOpen ? "border-brand/40 bg-card shadow-soft" : "border-line bg-panel/60"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-brand/5 transition-colors"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-body font-bold text-ink text-[0.95rem] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? "bg-brand text-white rotate-180" : "bg-brand/10 text-brand"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 font-body text-[0.95rem] text-muted leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Still-have-questions CTA */}
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left bg-card border border-line rounded-2xl p-6 shadow-soft">
            <p className="font-body text-ink">
              <span className="font-bold">Still have questions?</span>{" "}
              <span className="text-muted">Talk to a barndominium insurance specialist.</span>
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/quote"
                className="inline-flex items-center font-body text-sm font-bold text-brand hover:text-brand-700 transition-colors"
              >
                Get a quote →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
