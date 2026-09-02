"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingQuoteBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-[9998] bg-forest-green border-t-2 border-ember-orange shadow-2xl">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-body text-white text-sm text-center sm:text-left">
          <span className="font-bold">Our agents are working on quotes now.</span>{" "}
          Submit online to get in the queue faster — or call{" "}
          <a href={`tel:${SITE.phoneE164}`} className="font-bold text-ember-orange hover:text-amber-300 transition-colors whitespace-nowrap">
            {SITE.phone}
          </a>
          .
        </p>
        <Link
          href="/quote"
          className="flex-shrink-0 flex items-center gap-1.5 bg-ember-orange text-white px-5 py-2 rounded-full font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors whitespace-nowrap shadow-sm"
        >
          Request a Quote <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function QuotePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("quote-popup-dismissed")) return;
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("quote-popup-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="bg-forest-green px-6 py-5">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-xs font-body font-bold uppercase tracking-widest text-white/70 mb-1">A note from our team</p>
          <h2 id="popup-title" className="font-heading font-extrabold text-white text-xl leading-snug">
            Our agents are actively working on quotes right now
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="font-body text-bark text-sm leading-relaxed mb-4">
            By submitting your information online, our AI software gathers everything we need to prepare your quote accurately — so our agents can work more efficiently and get back to you faster.
          </p>
          <p className="font-body text-bark text-sm leading-relaxed mb-6">
            If you&apos;d prefer to speak with someone, you&apos;re welcome to submit the form first and then call us at{" "}
            <a href={`tel:${SITE.phoneE164}`} className="font-bold text-forest-green hover:text-ember-orange transition-colors whitespace-nowrap">
              {SITE.phone}
            </a>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/quote"
              onClick={dismiss}
              className="flex-1 bg-ember-orange text-white text-center px-5 py-3 rounded-xl font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors shadow-sm"
            >
              Submit a Quote Request
            </Link>
            <button
              onClick={dismiss}
              className="flex-1 border border-line text-muted text-center px-5 py-3 rounded-xl font-body text-sm hover:border-bark hover:text-bark transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
