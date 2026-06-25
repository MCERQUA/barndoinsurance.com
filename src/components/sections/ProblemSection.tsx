import Link from "next/link";
import {
  Building2, Layers, MapPinned, CloudHail, FileQuestion, ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const REASONS = [
  {
    icon: Building2,
    title: "Non-standard construction",
    desc: "Steel frame and metal siding have no standard actuarial history with big-box carriers. Their underwriting models were built for stick-frame homes — so a barndo lands as “decline” before anyone looks at the actual risk.",
  },
  {
    icon: Layers,
    title: "Mixed-use classification confusion",
    desc: "Residential living space plus a workshop, garage, or storage puts a barndo in an underwriting gray zone: is it a homeowners policy, a farm/ranch form, or commercial? The wrong answer guts your coverage.",
  },
  {
    icon: MapPinned,
    title: "Rural-location surcharge",
    desc: "Longer volunteer fire-department response times raise the rated risk on rural acreage — even when your barndo has a metal roof that outperforms shingles in a fire.",
  },
  {
    icon: CloudHail,
    title: "Metal-roof hail objections",
    desc: "Carriers flag metal roofs for hail exposure — often overstated. Metal routinely outperforms asphalt in severe hail, but standard underwriting rarely credits it.",
  },
  {
    icon: FileQuestion,
    title: "No comparable appraisal data",
    desc: "Adjusters can’t comp a barndo like a stick-frame house. With limited sales data, standard carriers can’t value it confidently — so they decline or lowball replacement cost to ACV.",
  },
];

export function ProblemSection() {
  return (
    <section className="section-pad bg-panel/70">
      <div className="container-xl">
        <FadeIn>
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-3">The Problem</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink font-extrabold mb-4 tracking-tight">
              Why is barndo insurance so hard to find?
            </h2>
            <p className="font-body text-lg text-muted leading-relaxed">
              This is the question every barndo owner asks first. Standard homeowners carriers
              decline, misclassify, or underprice barndominiums for five predictable reasons &mdash;
              and none of them mean your home is uninsurable. They just mean you need a broker who
              knows the specialty markets.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-10">
          {REASONS.map((r, i) => (
            <FadeIn key={r.title} delay={(i % 3) * 0.07}>
              <div className="flex gap-4 bg-card border border-line rounded-2xl p-6 h-full shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/10 ring-1 ring-brand/15 flex items-center justify-center">
                  <r.icon className="w-6 h-6 text-brand" strokeWidth={1.9} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-ink text-lg mb-1.5 leading-snug">
                    {r.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* The solution card fills the 6th grid slot */}
          <FadeIn delay={0.14}>
            <div className="relative overflow-hidden h-full rounded-2xl bg-brand-ink p-7 shadow-float">
              <div className="absolute inset-0 bg-grid-dark opacity-30" />
              <div className="absolute -top-16 -right-10 w-60 h-60 rounded-full bg-cta/15 blur-3xl" />
              <div className="relative">
                <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-cedar-bright mb-3">
                  The CCA answer
                </p>
                <p className="font-heading text-xl font-extrabold text-white leading-snug mb-4">
                  None of this means your barndo is uninsurable.
                </p>
                <p className="font-body text-sm text-white/75 leading-relaxed mb-5">
                  Farm/ranch carriers and surplus-lines markets have priced steel-frame homes
                  correctly. We know which underwriters say yes &mdash; and write replacement cost,
                  not ACV.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-cta text-white px-5 py-3 rounded-xl font-body font-bold text-sm shadow-cta hover:bg-cta-dark hover:-translate-y-0.5 transition-all"
                >
                  See real barndo coverage
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
