import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import { QuoteForm } from "@/components/forms/QuoteForm";

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">
                Get a {SITE.name} Quote
              </h1>
              <p className="font-body text-white/80 text-lg max-w-xl">
                Tell us about your barndominium and we&apos;ll prepare a specialty-market quote — replacement cost, correct policy form, same-day turnaround.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <FadeIn>
                  <div className="bg-white rounded-2xl border border-border p-8">
                    <h2 className="font-heading text-2xl text-bark font-bold mb-6">
                      {SITE.name} Quote Request
                    </h2>
                    {/* Client component: native Netlify POST + full ACORD validation. See QuoteForm.tsx. */}
                    <QuoteForm />
                  </div>
                </FadeIn>
              </div>

              <aside className="space-y-5">
                <FadeIn direction="left">
                  <div className="bg-forest-green rounded-2xl p-7">
                    <h3 className="font-heading text-lg text-white font-bold mb-3">Prefer to Call?</h3>
                    <p className="font-body text-white/70 text-sm mb-4">
                      Our barndominium insurance specialists are ready to help you now.
                    </p>
                    <a href={SITE.phoneHref} className="flex items-center gap-2 text-ember-orange font-body font-bold">
                      <Phone className="w-4 h-4" />{SITE.phone}
                    </a>
                    <p className="font-body text-white/50 text-xs mt-2">{SITE.hours}</p>
                  </div>
                </FadeIn>
                <FadeIn direction="left" delay={0.05}>
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">
                      What We&apos;ll Cover
                    </h3>
                    {[
                      "Replacement Cost on the Steel Structure",
                      "Correct Policy Form (HO3 / Farm-Ranch)",
                      "Shop, Workshop & Outbuildings",
                      "Builders Risk → Dwelling Transition",
                      "Farm / Ranch Package (if applicable)",
                      "Flood (NFIP / Private)",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2 mb-2.5">
                        <CheckCircle className="w-4 h-4 text-forest-green flex-shrink-0" />
                        <span className="font-body text-sm text-bark">{i}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
