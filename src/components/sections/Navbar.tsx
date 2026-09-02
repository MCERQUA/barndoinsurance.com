"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Warehouse } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl shadow-soft border-b border-line"
          : "bg-canvas/70 backdrop-blur-md"
      }`}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-[68px]">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label={`${SITE.name} home`}>
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-ink flex items-center justify-center shadow-soft ring-1 ring-cedar/30">
              <Warehouse className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <span className="font-heading font-extrabold text-ink text-lg leading-none tracking-tight">
              Barndo<span className="text-brand">Insurance</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-semibold text-ink-soft hover:text-brand transition-colors relative after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-cta after:transition-all after:duration-300 after:w-0 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/quote"
              className="bg-cta text-white px-5 py-2.5 rounded-full font-body text-sm font-bold shadow-cta hover:bg-cta-dark hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-line px-4 py-4 space-y-1 shadow-card">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-body font-semibold text-ink hover:text-brand py-2.5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="block bg-cta text-white text-center px-4 py-3 rounded-xl font-body font-bold shadow-cta"
            onClick={() => setOpen(false)}
          >
            Get a Free Quote
          </Link>
        </div>
      )}
    </header>
  );
}
