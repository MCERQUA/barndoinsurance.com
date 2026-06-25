"use client";

import { useState } from "react";
import { CheckCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "",
    propertyAddress: "", barndominium: "", squareFootage: "",
    yearBuilt: "", estimatedValue: "", farmOperations: "", state: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const field = (name: keyof typeof formData, label: string, type = "text", required = true) => (
    <div key={name}>
      <label className="block font-body text-sm font-bold text-bark mb-1.5">
        {label}{required && <span className="text-ember-orange ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white"
      />
    </div>
  );

  const select = (name: keyof typeof formData, label: string, options: string[], required = true) => (
    <div key={name}>
      <label className="block font-body text-sm font-bold text-bark mb-1.5">
        {label}{required && <span className="text-ember-orange ml-1">*</span>}
      </label>
      <select
        name={name}
        required={required}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

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
                  {submitted ? (
                    <div className="bg-white rounded-2xl border border-border p-10 text-center">
                      <CheckCircle className="w-14 h-14 text-forest-green mx-auto mb-4" />
                      <h2 className="font-heading text-2xl text-bark font-bold mb-3">Quote Request Received!</h2>
                      <p className="font-body text-muted mb-2">We&apos;ll prepare your barndominium insurance quote and be in touch today.</p>
                      <p className="font-body text-sm text-muted">
                        For immediate assistance, call{" "}
                        <a href={SITE.phoneHref} className="text-forest-green font-bold">{SITE.phone}</a>
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-border p-8">
                      <h2 className="font-heading text-2xl text-bark font-bold mb-6">
                        {SITE.name} Quote Request
                      </h2>
                      <form
                        name="quote"
                        method="POST"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <input type="hidden" name="form-name" value="quote" />
                        <p hidden>
                          <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {field("name", "Full Name")}
                          {field("company", "Company / Business Name", "text", false)}
                          {field("email", "Email Address", "email")}
                          {field("phone", "Phone Number", "tel")}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {field("propertyAddress", "Property Address")}
                          {select("barndominium", "Property Type", [
                            "Barndominium (steel frame / metal siding)",
                            "Pole-barn / post-frame home",
                            "Metal building home",
                            "Barndo + shop / workshop",
                            "Not sure",
                          ])}
                          {select("squareFootage", "Square Footage", [
                            "Under 1,000", "1,000–1,500", "1,500–2,500", "2,500–4,000", "4,000+",
                          ])}
                          {field("yearBuilt", "Year Built", "text", false)}
                          {select("estimatedValue", "Estimated Replacement Value", [
                            "Under $200K", "$200K–$400K", "$400K–$600K", "$600K–$1M", "Over $1M",
                          ])}
                          {select("farmOperations", "Farm / Ranch Operations on Site?", [
                            "None — residence only",
                            "Small hobby farm",
                            "Working farm / ranch",
                            "Agricultural income",
                          ])}
                          {field("state", "State")}
                        </div>

                        <div>
                          <label className="block font-body text-sm font-bold text-bark mb-1.5">
                            Additional Notes
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Still building (need builders risk)? Attached shop or outbuildings? Coverage questions..."
                            className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green resize-none bg-white"
                          />
                        </div>

                        {error && (
                          <div className="rounded-lg border border-ember-orange/40 bg-ember-orange/10 px-4 py-3">
                            <p className="font-body text-sm font-bold text-ember-orange">
                              Something went wrong — please call{" "}
                              <a href={SITE.phoneHref} className="underline">{SITE.phone}</a> or try again.
                            </p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-ember-orange text-white py-3.5 rounded-lg font-body font-bold hover:bg-ember-orange-dark transition-colors disabled:opacity-60"
                        >
                          {loading ? "Submitting..." : `Get My ${SITE.name} Quote →`}
                        </button>
                      </form>
                    </div>
                  )}
                </FadeIn>
              </div>

              <aside className="space-y-5">
                <FadeIn direction="left">
                  <div className="bg-forest-green rounded-2xl p-7">
                    <h3 className="font-heading text-lg text-white font-bold mb-3">Prefer to Call?</h3>
                    <p className="font-body text-white/70 text-sm mb-4">
                      Our barndominium insurance specialists are ready to quote you now.
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
