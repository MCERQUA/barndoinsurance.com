import { ClipboardList, Search, BadgeCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell Us About Your Barndo",
    desc: "A few quick questions: address, square footage, construction type (steel frame / post-frame), estimated rebuild value, and how you use it — residence, shop, farm, or still under construction.",
  },
  {
    icon: Search,
    step: "02",
    title: "We Shop Specialty Markets",
    desc: "We take it to the farm/ranch and specialty dwelling carriers that actually write barndos — and bring back the right policy form with replacement cost, shop coverage, and outbuildings correctly classified.",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Get Insured Today",
    desc: "Bind coverage with the right form and limits. If you’re building, we quote builders risk and your permanent dwelling together so there’s no gap at completion. Certificates issued the same day.",
  },
];

export function Process() {
  return (
    <section className="section-pad bg-panel/70">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">How It Works</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink font-extrabold mb-4 tracking-tight">
              From First Post to Finished Barndo
            </h2>
            <p className="font-body text-lg text-muted leading-relaxed">
              A process built for owners who would rather be on their land than chasing a carrier
              that keeps saying no.
            </p>
          </div>
        </FadeIn>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[16.6%] right-[16.6%] h-0.5 bg-line" aria-hidden />

          {STEPS.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.1}>
              <div className="relative text-center group">
                <div className="relative w-20 h-20 bg-canvas border-2 border-brand/25 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand group-hover:shadow-card">
                  <s.icon className="w-8 h-8 text-brand" strokeWidth={1.9} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-cta text-white text-xs font-extrabold rounded-full flex items-center justify-center font-heading shadow-cta ring-2 ring-canvas">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-ink text-xl mb-3">{s.title}</h3>
                <p className="font-body text-sm sm:text-[0.95rem] text-muted leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
