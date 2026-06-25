import Link from "next/link";
import {
  Home, HardHat, Wrench, Tractor, Droplets,
  Warehouse, ShieldCheck, ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

// Icon map covers Worker C's barndo service icons + legacy names, with fallback.
const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Shield: ShieldCheck,
  ShieldCheck,
  Home,
  HardHat,
  Wrench,
  Tractor,
  Droplets,
  Warehouse,
};

export function ServicesGrid() {
  return (
    <section className="section-pad bg-canvas">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">Coverage Options</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink font-extrabold mb-4 tracking-tight">
              From the First Post to the Finished Barndo
            </h2>
            <p className="font-body text-lg text-muted leading-relaxed">
              Five purpose-built policies for barndominium owners &mdash; builders risk while you
              build, replacement-cost dwelling when you move in, and the shop, farm, and flood
              coverage a standard carrier won&rsquo;t write.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Warehouse;
            return (
              <FadeIn key={service.slug} delay={(i % 3) * 0.07}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block h-full bg-card border border-line rounded-2xl p-7 shadow-soft overflow-hidden hover:-translate-y-1 hover:shadow-card-hover hover:border-brand/40 transition-all duration-300"
                >
                  {/* Top accent bar that scales in on hover */}
                  <span className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-brand via-brand-bright to-cta" />

                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-600 to-brand-ink flex items-center justify-center mb-5 shadow-soft ring-1 ring-cedar/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.9} />
                  </div>

                  <h3 className="font-heading font-bold text-ink text-xl mb-2.5 leading-snug">
                    {service.title}
                  </h3>
                  <p className="font-body text-[0.95rem] text-muted leading-relaxed mb-5">
                    {service.short}
                  </p>
                  <div className="flex items-center gap-1.5 text-brand font-body text-sm font-bold group-hover:gap-2.5 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
