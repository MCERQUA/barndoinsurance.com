import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

// Barndo-specific reasons (template copy was a framing find-replace).
const REASONS = [
  {
    title: "Barndo Specialists, Not Generalists",
    desc: "We know the difference between a steel-frame barndo, a pole-barn home, and a manufactured home — and why that distinction decides whether your claim gets paid.",
  },
  {
    title: "Specialty + Farm/Ranch Markets",
    desc: "Access to farm/ranch carriers, surplus-lines markets, and specialty dwelling programs that underwrite metal buildings every day — not standard auto carriers that auto-decline.",
  },
  {
    title: "Replacement Cost, Not ACV",
    desc: "A 15-year-old barndo under ACV can settle at half its rebuild cost. We place replacement-cost coverage so a serious loss actually lets you rebuild.",
  },
  {
    title: "The Form-Selection Expertise",
    desc: "HO3 vs. farm/ranch vs. dwelling fire — getting the form right is as important as the limits. We navigate classification so your shop, outbuildings, and rural use are covered.",
  },
  {
    title: "One Broker, Start to Finish",
    desc: "Builders risk during construction, then a seamless transition to your permanent dwelling policy. No coverage gap at completion — we quote both up front.",
  },
  {
    title: "Claims Advocacy",
    desc: "When a tornado or hail event hits your barndo, we’re in your corner — not a carrier call center that has never valued a steel-frame structure.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad bg-canvas">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="right" className="relative">
            <div className="relative h-[440px] sm:h-[520px] rounded-3xl overflow-hidden shadow-float ring-1 ring-line">
              <Image
                src="/images/agent-handshake.jpg"
                alt="Insurance agent reviewing a barndominium property policy with a homeowner at a kitchen table"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-ink/45 via-brand/10 to-transparent" />
            </div>
            {/* Floating credential chip */}
            <div className="absolute -bottom-5 -right-3 sm:right-6 bg-card rounded-2xl shadow-card ring-1 ring-line px-5 py-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand text-white">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-heading font-extrabold text-ink text-lg leading-none">20+ yrs</p>
                <p className="font-body text-xs text-muted mt-1">50-state licensed</p>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <p className="eyebrow mb-3">Why CCA</p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink font-extrabold mb-4 tracking-tight">
                The specialty insurer for{" "}
                <span className="text-brand">barndominium owners</span>
              </h2>
              <p className="font-body text-lg text-muted leading-relaxed mb-8">
                We&rsquo;re not a generalist agency guessing at barndo values at claim time. We know
                steel-frame construction, we know the HO3-vs-farm/ranch form question, and we know
                the markets built to write this niche.
              </p>
            </FadeIn>

            <div className="space-y-5">
              {REASONS.map((r, i) => (
                <FadeIn key={r.title} delay={i * 0.05}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand/10 ring-1 ring-brand/20 flex items-center justify-center mt-0.5">
                      <BadgeCheck className="w-4 h-4 text-brand" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="font-body font-bold text-ink text-[0.95rem] mb-1">{r.title}</p>
                      <p className="font-body text-sm text-muted leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
