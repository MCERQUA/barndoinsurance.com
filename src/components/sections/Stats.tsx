"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { STATS } from "@/lib/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 100 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  if (isInView) mv.set(value);

  return (
    <span
      ref={ref}
      className="font-heading text-4xl sm:text-5xl font-extrabold text-white tabular-nums"
    >
      <motion.span>{display}</motion.span>
      <span className="text-cedar-bright">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative section-pad overflow-hidden bg-brand-ink">
      {/* Layered barn-red depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-ink to-brand-900" />
      <div className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full bg-brand-bright/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-24 w-[44rem] h-[44rem] rounded-full bg-cta/12 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      <div className="relative container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 ${i !== 0 ? "lg:border-l lg:border-white/15" : ""}`}
            >
              <span className="block w-10 h-1 rounded-full bg-cedar-bright mx-auto mb-5" />
              <Counter value={s.value} suffix={s.suffix} />
              <p className="font-body text-sm text-white/70 mt-3 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
