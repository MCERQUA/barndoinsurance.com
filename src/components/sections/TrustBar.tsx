import {
  ShieldCheck, Award, MapPin, Warehouse, BadgeCheck, ArrowLeftRight,
} from "lucide-react";
import { CREDENTIALS } from "@/lib/site";

// Match each credential to a meaningful icon by keyword; fallback ShieldCheck.
function iconFor(text: string) {
  const t = text.toLowerCase();
  if (t.includes("50") || t.includes("state")) return MapPin;
  if (t.includes("npn")) return BadgeCheck;
  if (t.includes("founded") || t.includes("2005")) return Award;
  if (t.includes("specialist") || t.includes("metal") || t.includes("barndo")) return Warehouse;
  if (t.includes("transition") || t.includes("builders")) return ArrowLeftRight;
  return ShieldCheck;
}

export function TrustBar() {
  return (
    <section className="relative bg-brand-ink overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-800 via-brand-ink to-brand-800" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="relative container-xl py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
          {CREDENTIALS.map((text) => {
            const Icon = iconFor(text);
            return (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-cedar-bright flex-shrink-0" strokeWidth={2.2} />
                <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-wide text-white/95 whitespace-nowrap">
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
