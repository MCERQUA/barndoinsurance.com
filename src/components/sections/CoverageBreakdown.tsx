import { Check, X } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

type Row = { label: string; specialty: boolean; standard: boolean };

const ROWS: Row[] = [
  { label: "Replacement cost on the steel structure (no ACV depreciation)", specialty: true, standard: false },
  { label: "Correct policy form (farm/ranch, not a forced HO3)", specialty: true, standard: false },
  { label: "Attached shop / workshop properly classified", specialty: true, standard: false },
  { label: "Outbuildings beyond a 10% Coverage B cap", specialty: true, standard: false },
  { label: "Farm operations, livestock & equipment on one policy", specialty: true, standard: false },
  { label: "Extended replacement cost endorsement", specialty: true, standard: false },
  { label: "Builders risk → seamless dwelling transition", specialty: true, standard: false },
  { label: "Markets that actually write barndos (not auto-decline)", specialty: true, standard: false },
];

function Mark({ yes }: { yes: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
        yes ? "bg-brand text-white" : "bg-line text-muted"
      }`}
      aria-label={yes ? "Included" : "Not included"}
    >
      {yes ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <X className="w-3.5 h-3.5" strokeWidth={3} />}
    </span>
  );
}

export function CoverageBreakdown() {
  return (
    <section className="section-pad bg-canvas">
      <div className="container-xl">
        <FadeIn>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">Coverage Breakdown</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink font-extrabold mb-4 tracking-tight">
              Specialty barndo policy vs. a standard HO3
            </h2>
            <p className="font-body text-lg text-muted leading-relaxed">
              Where a standard homeowners form stops short, a purpose-built barndo policy picks up
              &mdash; feature by feature.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="max-w-4xl mx-auto rounded-3xl border border-line overflow-hidden shadow-card">
            {/* Header row */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-panel">
              <div className="p-5 sm:p-6" />
              <div className="p-5 sm:p-6 text-center bg-gradient-to-br from-brand-600 to-brand-800">
                <p className="font-heading font-extrabold text-white text-sm sm:text-base leading-tight">
                  Specialty Barndo Policy
                </p>
                <p className="font-body text-[0.7rem] text-cedar-bright font-bold uppercase tracking-wider mt-1">
                  Recommended
                </p>
              </div>
              <div className="p-5 sm:p-6 text-center">
                <p className="font-heading font-bold text-ink-soft text-sm sm:text-base leading-tight">
                  Standard HO3 Homeowners
                </p>
                <p className="font-body text-[0.7rem] text-muted font-semibold uppercase tracking-wider mt-1">
                  Typical
                </p>
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((r, i) => (
              <div
                key={r.label}
                className={`grid grid-cols-[1.6fr_1fr_1fr] items-center ${
                  i % 2 ? "bg-canvas/50" : "bg-card"
                } border-t border-line-soft`}
              >
                <p className="p-4 sm:p-5 font-body text-sm sm:text-[0.95rem] font-semibold text-ink">
                  {r.label}
                </p>
                <div className="p-4 sm:p-5 flex justify-center"><Mark yes={r.specialty} /></div>
                <div className="p-4 sm:p-5 flex justify-center"><Mark yes={r.standard} /></div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
