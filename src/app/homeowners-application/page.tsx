"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import {
  HOMEOWNERS_APPLICATION,
  HA_FIELD_NAMES,
  HA_FORM_NAME,
  HA_REQUIRED,
  type HAField,
} from "@/lib/homeownersApplication";

/** DOM id for a PDF field name (names contain "/", "(", "," and spaces). */
const idFor = (name: string) => `ha-${name.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

const isRequired = (name: string) => HA_REQUIRED.includes(name);

/** Fields the PDF lays out as a full-width multi-line box. */
const isLongText = (label: string) =>
  /^(Describe|Explain|List )/.test(label) ||
  label === "Additional underwriting remarks" ||
  label === "Additional named insureds or household contacts";

const INPUT_CLASS =
  "w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white";

const LABEL_CLASS = "block font-body text-sm font-bold text-bark mb-1.5";

type Values = Record<string, string>;

export default function HomeownersApplicationPage() {
  const [values, setValues] = useState<Values>({});
  const [botField, setBotField] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const setText = (name: string, v: string) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const toggleBox = (name: string, checked: boolean) =>
    setValues((prev) => ({ ...prev, [name]: checked ? "Yes" : "" }));

  /** Yes/No are two separate PDF checkboxes; keep them from contradicting. */
  const pickYesNo = (on: string, off: string, checked: boolean) =>
    setValues((prev) => ({
      ...prev,
      [on]: checked ? "Yes" : "",
      [off]: checked ? "" : prev[off] ?? "",
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (botField) return;
    setLoading(true);
    setError(false);

    const payload = new URLSearchParams();
    payload.append("form-name", HA_FORM_NAME);
    payload.append("bot-field", "");
    // every one of the 281 fields, in PDF order
    for (const name of HA_FIELD_NAMES) payload.append(name, values[name] ?? "");

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const textInput = (f: HAField) => (
    <>
      <label htmlFor={idFor(f.name)} className={LABEL_CLASS}>
        {f.label}
        {isRequired(f.name) && <span className="text-ember-orange ml-1">*</span>}
      </label>
      {isLongText(f.label) ? (
        <textarea
          id={idFor(f.name)}
          name={f.name}
          rows={3}
          maxLength={f.maxlen}
          value={values[f.name] ?? ""}
          onChange={(e) => setText(f.name, e.target.value)}
          className={`${INPUT_CLASS} resize-none`}
        />
      ) : (
        <input
          id={idFor(f.name)}
          name={f.name}
          type="text"
          required={isRequired(f.name)}
          maxLength={f.maxlen}
          value={values[f.name] ?? ""}
          onChange={(e) => setText(f.name, e.target.value)}
          className={INPUT_CLASS}
        />
      )}
    </>
  );

  const checkbox = (f: HAField) => (
    <label
      key={f.name}
      htmlFor={idFor(f.name)}
      className="flex items-center gap-3 border border-border rounded-lg px-4 py-2.5 bg-white cursor-pointer hover:border-forest-green transition-colors"
    >
      <input
        id={idFor(f.name)}
        name={f.name}
        type="checkbox"
        checked={values[f.name] === "Yes"}
        onChange={(e) => toggleBox(f.name, e.target.checked)}
        className="w-4 h-4 accent-forest-green flex-shrink-0"
      />
      <span className="font-body text-sm text-bark">{f.label}</span>
    </label>
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">
                Homeowners Insurance Application
              </h1>
              <p className="font-body text-white/80 text-lg max-w-2xl mb-6">
                The complete homeowners application, in seven sections. Fill in what you
                know — you don&apos;t have to finish every field to send it, and we&apos;ll follow
                up on anything missing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 font-body text-sm text-white/90 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {SITE.email}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl max-w-4xl">
            {submitted ? (
              <FadeIn>
                <div className="bg-white rounded-2xl border border-border p-10 text-center">
                  <CheckCircle className="w-14 h-14 text-forest-green mx-auto mb-4" />
                  <h2 className="font-heading text-2xl text-bark font-bold mb-3">
                    Application Received!
                  </h2>
                  <p className="font-body text-muted mb-2">
                    Thanks — we&apos;ve got your homeowners application. An agent will review
                    it and be in touch, usually the same business day.
                  </p>
                  <p className="font-body text-sm text-muted mb-6">
                    For immediate assistance, call{" "}{" "}
                    or email{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-forest-green font-bold"
                    >
                      {SITE.email}
                    </a>
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 font-body font-bold text-sm text-forest-green"
                  >
                    Back to Home <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>
            ) : (
              <form
                name={HA_FORM_NAME}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value={HA_FORM_NAME} />
                <p hidden>
                  <label>
                    Don&apos;t fill this out:{" "}
                    <input
                      name="bot-field"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </p>

                {HOMEOWNERS_APPLICATION.map((section) => (
                  <FadeIn key={section.number}>
                    <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-heading text-2xl font-bold text-forest-green">
                          {section.number}.
                        </span>
                        <h2 className="font-heading text-xl sm:text-2xl text-bark font-bold">
                          {section.title}
                        </h2>
                      </div>
                      <p className="font-body text-sm text-muted mb-8">{section.intro}</p>

                      {section.groups.map((group, gi) => (
                        <fieldset key={gi} className="mb-8 last:mb-0">
                          {group.heading && (
                            <legend className="font-body text-xs font-bold uppercase tracking-wider text-muted mb-4 block">
                              {group.heading}
                            </legend>
                          )}

                          {/* text fields, two-up */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {group.items.map((item, ii) =>
                              item.kind === "field" && item.field.type === "text" ? (
                                <div
                                  key={ii}
                                  className={
                                    isLongText(item.field.label) ? "sm:col-span-2" : ""
                                  }
                                >
                                  {textInput(item.field)}
                                </div>
                              ) : null
                            )}
                          </div>

                          {/* plain checkboxes */}
                          {group.items.some(
                            (i) => i.kind === "field" && i.field.type === "checkbox"
                          ) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                              {group.items.map((item) =>
                                item.kind === "field" && item.field.type === "checkbox"
                                  ? checkbox(item.field)
                                  : null
                              )}
                            </div>
                          )}

                          {/* Yes / No question pairs */}
                          {group.items.some((i) => i.kind === "yesno") && (
                            <div className="mt-5 space-y-3">
                              {group.items.map((item, ii) =>
                                item.kind === "yesno" ? (
                                  <div
                                    key={ii}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-border rounded-lg px-4 py-3 bg-white"
                                  >
                                    <span className="font-body text-sm text-bark">
                                      {item.question}
                                    </span>
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                      <label
                                        htmlFor={idFor(item.yes.name)}
                                        className="flex items-center gap-2 cursor-pointer"
                                      >
                                        <input
                                          id={idFor(item.yes.name)}
                                          name={item.yes.name}
                                          type="checkbox"
                                          checked={values[item.yes.name] === "Yes"}
                                          onChange={(e) =>
                                            pickYesNo(
                                              item.yes.name,
                                              item.no.name,
                                              e.target.checked
                                            )
                                          }
                                          className="w-4 h-4 accent-forest-green"
                                        />
                                        <span className="font-body text-sm text-bark">
                                          {item.yes.label}
                                        </span>
                                      </label>
                                      <label
                                        htmlFor={idFor(item.no.name)}
                                        className="flex items-center gap-2 cursor-pointer"
                                      >
                                        <input
                                          id={idFor(item.no.name)}
                                          name={item.no.name}
                                          type="checkbox"
                                          checked={values[item.no.name] === "Yes"}
                                          onChange={(e) =>
                                            pickYesNo(
                                              item.no.name,
                                              item.yes.name,
                                              e.target.checked
                                            )
                                          }
                                          className="w-4 h-4 accent-forest-green"
                                        />
                                        <span className="font-body text-sm text-bark">
                                          {item.no.label}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                ) : null
                              )}
                            </div>
                          )}

                          {/* loss history table */}
                          {group.items.map((item, ii) =>
                            item.kind === "losstable" ? (
                              <div key={ii} className="space-y-5">
                                {item.rows.map((row, ri) => (
                                  <div
                                    key={ri}
                                    className="border border-border rounded-lg p-4 bg-warm-white"
                                  >
                                    <div className="font-body text-xs font-bold uppercase tracking-wider text-muted mb-4">
                                      Loss {ri + 1}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                      {row.map((f) => (
                                        <div key={f.name}>
                                          <label
                                            htmlFor={idFor(f.name)}
                                            className="block font-body text-xs font-bold text-bark mb-1.5"
                                          >
                                            {f.label}
                                          </label>
                                          <input
                                            id={idFor(f.name)}
                                            name={f.name}
                                            type="text"
                                            maxLength={f.maxlen}
                                            value={values[f.name] ?? ""}
                                            onChange={(e) =>
                                              setText(f.name, e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null
                          )}

                          {/* authorization prose */}
                          {group.items.map((item, ii) =>
                            item.kind === "prose" ? (
                              <p
                                key={ii}
                                className="font-body text-sm text-muted leading-relaxed border border-border rounded-lg px-5 py-4 bg-warm-white mb-5"
                              >
                                {item.text}
                              </p>
                            ) : null
                          )}
                        </fieldset>
                      ))}
                    </div>
                  </FadeIn>
                ))}

                {error && (
                  <div className="rounded-lg border border-ember-orange/40 bg-ember-orange/10 px-4 py-3 mb-5">
                    <p className="font-body text-sm font-bold text-ember-orange">
                      Something went wrong submitting your application. Please call{" "}
                      email {SITE.email} and we&apos;ll take it from there.
                    </p>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-cta text-white px-7 py-3.5 rounded-xl font-body font-bold text-base shadow-cta hover:bg-cta-dark disabled:opacity-60 transition-all"
                  >
                    {loading ? "Submitting…" : "Submit Application"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <p className="font-body text-xs text-muted text-center mt-4">
                    This application does not bind coverage. Your information is secure
                    and never sold.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
