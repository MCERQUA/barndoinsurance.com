"use client";

import { useEffect, useRef, useState } from "react";
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
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("quote-popup-dismissed")) return;
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("quote-popup-dismissed", "1");
    setVisible(false);
  };

  // Esc closes it, and focus stays inside while it is open.
  useEffect(() => {
    if (!visible) return;
    const panel = panelRef.current;
    const sel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>(sel) ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { dismiss(); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

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
      <div ref={panelRef} className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
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
          <p className="font-body text-bark text-sm leading-relaxed mb-4">Our agents are working on quotes now, and submitting online lets our AI gather what we need.</p>
          <p className="font-body text-bark text-sm leading-relaxed mb-3">
            If you&apos;d prefer to speak with someone please call us at{" "}
            <a href={`tel:${SITE.phoneE164}`} className="font-bold text-forest-green hover:text-ember-orange transition-colors whitespace-nowrap"> {SITE.phone} </a>
          </p>
          <div className="bg-ember-orange/10 border border-ember-orange/20 rounded-xl px-4 py-3 mb-6">
            <p className="font-body text-bark text-sm font-bold mb-0.5">Submit what you can — every bit helps.</p>
            <p className="font-body text-muted text-xs leading-relaxed">Even partial information saves us all time. Fill in what you know and we&apos;ll follow up for anything else we need.</p>
          </div>

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
