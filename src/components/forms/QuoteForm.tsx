"use client";

import { Fragment, useEffect, useMemo, useState, type FormEvent } from "react";
import { US_STATES } from "@/lib/quote-form-options";
import {
  SECTIONS, MAILING_COPY, effectiveValues, validate, isVisible, isRequired,
  type Def, type Problem, type Values, type Ctx,
} from "./quote-fields";

/*
 * /quote - ACORD-complete homeowners / barndominium quote request (Mike 2026-11-17).
 *
 * Real Netlify form: native POST to /quote/success (static export, no fetch, no
 * preventDefault on a valid submit). Every control NAME rendered here (see
 * quote-fields.ts) is registered in public/__forms.html - keep the two in
 * lockstep, Netlify silently drops any field the registration copy lacks.
 * Existing live names are never renamed.
 *
 * Validation: HTML required/pattern/maxLength attrs on every visible required
 * control PLUS validate() in quote-fields.ts. The submit button stays disabled
 * until validate() returns no problems; onSubmit re-runs it and blocks the POST if
 * anything is still wrong (the message names the field).
 *
 * Privacy: DOB and driver's-license values are never logged or echoed; they travel
 * only in the POST body (method POST, never GET), not in the URL or the thank-you page.
 */

const FORM_NAME = "quote";

const inputClass =
  "w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white";
const labelClass = "block font-body text-sm font-bold text-bark mb-1.5";
const errClass = "font-body text-xs text-red-700 mt-1";
const hintClass = "font-body text-xs text-muted mt-1.5";
const h3Class = "font-heading text-lg text-bark font-bold mb-1 mt-6";
const grid2 = "grid grid-cols-1 sm:grid-cols-2 gap-5";
const followUp = "pl-4 border-l-2 border-forest-green/30 space-y-4";

function todayISO(): string {
  const dt = new Date();
  return `${dt.getFullYear()}-${`${dt.getMonth() + 1}`.padStart(2, "0")}-${`${dt.getDate()}`.padStart(2, "0")}`;
}

type Ctl = {
  v: Values;
  today: string;
  set: (name: string, value: string) => void;
  touch: (name: string) => void;
  err: (name: string) => string | null;
};

function Star({ on }: { on: boolean }) {
  return on ? <span className="text-ember-orange ml-1">*</span> : null;
}

/** Keystroke filter so numeric fields only ever hold clean numbers. */
function clean(def: Def, raw: string): string {
  switch (def.kind) {
    case "int": return raw.replace(/\D/g, "");
    case "year": return raw.replace(/\D/g, "").slice(0, 4);
    case "zip": return raw.replace(/\D/g, "").slice(0, 5);
    case "money":
    case "dec": {
      const x = raw.replace(/[^0-9.]/g, "");
      const i = x.indexOf(".");
      return i < 0 ? x : x.slice(0, i + 1) + x.slice(i + 1).replace(/\./g, "");
    }
    default: return raw;
  }
}

function Control({ c, def, req }: { c: Ctl; def: Def; req: boolean }) {
  const e = c.err(def.name);
  const val = c.v[def.name] ?? "";
  const common = {
    id: def.name, name: def.name, required: req,
    "aria-invalid": e ? true : undefined,
    onBlur: () => c.touch(def.name),
  } as const;

  if (def.kind === "radio") {
    const opts = def.options ?? [];
    return (
      <fieldset className="border-0 p-0 m-0" aria-invalid={e ? true : undefined}>
        <legend className={labelClass}>{def.label}<Star on={req} /></legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {opts.map((o) => (
            <label key={o} className="inline-flex items-center gap-2 font-body text-sm text-bark cursor-pointer">
              <input
                type="radio" name={def.name} value={o} required={req} checked={val === o}
                onChange={() => { c.set(def.name, o); c.touch(def.name); }} className="w-4 h-4"
              />
              {o}
            </label>
          ))}
        </div>
        {e && <p className={errClass} role="alert">{e}</p>}
      </fieldset>
    );
  }

  let field: React.ReactNode;
  if (def.kind === "select" || def.kind === "state") {
    field = (
      <select {...common} value={val} onChange={(ev) => c.set(def.name, ev.target.value)} className={inputClass}>
        <option value="">Select...</option>
        {def.kind === "state"
          ? US_STATES.map(([code, name]) => <option key={code} value={code}>{name}</option>)
          : (def.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else if (def.kind === "area") {
    field = (
      <textarea
        {...common} rows={def.rows ?? 3} maxLength={def.max} value={val}
        onChange={(ev) => c.set(def.name, ev.target.value)}
        className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green resize-none bg-white"
      />
    );
  } else {
    const type = def.kind === "date" ? "date" : def.kind === "email" ? "email" : def.kind === "tel" ? "tel" : "text";
    const inputMode =
      def.kind === "int" || def.kind === "year" || def.kind === "zip" ? "numeric"
      : def.kind === "money" || def.kind === "dec" ? "decimal"
      : def.kind === "tel" ? "tel" : def.kind === "email" ? "email" : "text";
    const pattern =
      def.kind === "zip" ? "[0-9]{5}" : def.kind === "year" ? "[0-9]{4}" : def.kind === "int" ? "[0-9]*"
      : def.kind === "money" || def.kind === "dec" ? "[0-9]*\\.?[0-9]*" : undefined;
    let min: string | undefined, max: string | undefined;
    if (def.kind === "date" && c.today !== "0000-00-00") {
      if (def.date === "future") min = c.today;
      if (def.date === "past" || def.date === "dob") max = c.today;
    }
    field = (
      <input
        {...common} type={type} inputMode={inputMode} pattern={pattern} min={min} max={max}
        maxLength={def.kind === "date" ? undefined : def.max}
        autoComplete={def.auto ?? (def.kind === "int" || def.kind === "money" ? "off" : undefined)}
        value={val} onChange={(ev) => c.set(def.name, clean(def, ev.target.value))}
        className={inputClass}
      />
    );
  }
  return (
    <div>
      <label htmlFor={def.name} className={labelClass}>{def.label}<Star on={req} /></label>
      {field}
      {def.hint && <p className={hintClass}>{def.hint}</p>}
      {def.kind === "area" && def.max && <p className={hintClass}>{val.length} / {def.max} characters</p>}
      {e && <p className={errClass} role="alert">{e}</p>}
    </div>
  );
}

type Chunk = { key: string; kind: "grid" | "yn" | "full" | "heading"; lvl: boolean; defs: Def[] };

function chunkDefs(defs: Def[]): Chunk[] {
  const out: Chunk[] = [];
  for (const def of defs) {
    const kind: Chunk["kind"] =
      def.kind === "heading" ? "heading"
      : def.kind === "area" ? "full"
      : def.kind === "radio" ? ((def.options ?? []).length === 2 && def.options?.[0] === "Yes" ? "yn" : "full")
      : "grid";
    const lvl = !!def.lvl;
    const last = out[out.length - 1];
    if (last && last.kind === kind && last.lvl === lvl && (kind === "grid" || kind === "yn")) last.defs.push(def);
    else out.push({ key: def.name, kind, lvl, defs: [def] });
  }
  return out;
}

export function QuoteForm() {
  const [values, setValues] = useState<Values>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState(false);
  const [today, setToday] = useState("0000-00-00");
  useEffect(() => setToday(todayISO()), []);

  const eff = useMemo(() => effectiveValues(values, today), [values, today]);
  const problems = useMemo(() => validate(values, today), [values, today]);
  const byName = useMemo(() => {
    const m: Record<string, Problem> = {};
    for (const x of problems) if (!m[x.name]) m[x.name] = x;
    return m;
  }, [problems]);
  const valid = problems.length === 0 && today !== "0000-00-00";

  const c: Ctl = {
    v: values, today,
    set: (name, value) => setValues((prev) => ({ ...prev, [name]: value })),
    touch: (name) => setTouched((prev) => ({ ...prev, [name]: true })),
    err: (name) => (attempted || touched[name] ? byName[name]?.message ?? null : null),
  };
  const ctx: Ctx = { today };

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    setAttempted(true);
    if (!valid) {
      ev.preventDefault();
      const first = problems[0];
      if (first) (document.getElementsByName(first.name)[0] as HTMLElement | undefined)?.focus();
    }
    // valid: fall through to the native POST so Netlify Forms receives it.
  }

  const renderDef = (def: Def) => {
    if (!isVisible(def, eff, ctx)) return null;
    return <Control key={def.name} c={c} def={def} req={isRequired(def, eff, ctx)} />;
  };

  return (
    <form
      name={FORM_NAME}
      method="POST"
      action="/quote/success"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="space-y-5"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
      </p>

      <div className="bg-forest-green-50 border border-forest-green/30 rounded-lg p-4" role="note" data-testid="quote-notice">
        <p className="font-body text-sm text-bark font-bold">
          This is a complete, end-to-end quote request. We need all of the information below to prepare your quote. Please complete every field. Once your quote is prepared, you can review it and discuss it with your agent.
        </p>
      </div>

      {/* Derived values submitted with the form (no user input) */}
      <input type="hidden" name="lossDescription" value={eff.lossDescription ?? ""} />
      {eff.hasLossesLast5Years === "No" && <input type="hidden" name="lossCount" value="0" />}
      {eff.mailingAddressSameAsProperty === "Yes" &&
        MAILING_COPY.map(([, to]) => <input key={to} type="hidden" name={to} value={eff[to] ?? ""} />)}

      {SECTIONS.map((sec) => (
        <Fragment key={sec.title}>
          <h3 className={h3Class}>{sec.title}</h3>
          {sec.intro && <p className={hintClass}>{sec.intro}</p>}
          {chunkDefs(sec.defs.filter((d) => isVisible(d, eff, ctx))).map((ch) => {
            if (ch.kind === "heading") {
              return <p key={ch.key} className="font-body text-xs font-bold uppercase tracking-widest text-muted pt-3">{ch.defs[0].label}</p>;
            }
            const cls = ch.kind === "grid" ? grid2 : ch.kind === "yn" ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4" : "space-y-4";
            const body = <div className={cls}>{ch.defs.map(renderDef)}</div>;
            return <div key={ch.key} className={ch.lvl ? followUp : undefined}>{body}</div>;
          })}
          {sec.title === "Mailing Address" && eff.mailingAddressSameAsProperty === "Yes" && (
            <p className={hintClass}>We will use your property address as your mailing address.</p>
          )}
        </Fragment>
      ))}

      <h3 className={h3Class}>Additional Notes</h3>
      <div>
        <label htmlFor="notes" className={labelClass}>Anything else we should know (optional)</label>
        <textarea
          id="notes" name="notes" rows={3} value={values.notes ?? ""} onChange={(ev) => c.set("notes", ev.target.value)}
          placeholder="Still building (need builders risk)? Attached shop or outbuildings? Coverage questions..."
          className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green resize-none bg-white"
        />
      </div>

      <h3 className={h3Class}>Confirmation</h3>
      <p className={hintClass}>
        Do not enter a Social Security number, card number, or bank details anywhere on this form. Payment is arranged with your agent when you bind coverage.
      </p>
      <div>
        <label className="inline-flex items-start gap-2 font-body text-sm text-bark cursor-pointer">
          <input
            type="checkbox" name="applicantAttestation" value="Yes" required checked={values.applicantAttestation === "Yes"}
            onChange={(ev) => { c.set("applicantAttestation", ev.target.checked ? "Yes" : ""); c.touch("applicantAttestation"); }}
            className="w-4 h-4 mt-0.5"
          />
          <span>I confirm the information above is accurate and complete to the best of my knowledge as of today. Your signature happens when your quote is bound.<Star on /></span>
        </label>
        {c.err("applicantAttestation") && <p className={errClass} role="alert">{c.err("applicantAttestation")}</p>}
      </div>

      <button
        type="submit"
        disabled={!valid}
        data-testid="quote-submit"
        className="w-full bg-ember-orange text-white py-3.5 rounded-lg font-body font-bold hover:bg-ember-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Get My Barndo Insurance Quote →
      </button>
      {!valid && (
        <div className="font-body text-xs text-muted" data-testid="quote-missing" aria-live="polite">
          <p className="font-bold text-bark mb-1">Still needed before you can submit ({problems.length}):</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {problems.slice(0, 10).map((x) => <li key={x.name}>{x.label}</li>)}
          </ul>
          {problems.length > 10 && (
            <details className="mt-1">
              <summary className="cursor-pointer font-bold text-bark">and {problems.length - 10} more (show all)</summary>
              <ul className="list-disc pl-5 space-y-0.5 mt-1" data-testid="quote-missing-all">
                {problems.slice(10).map((x) => <li key={x.name}>{x.label}</li>)}
              </ul>
            </details>
          )}
        </div>
      )}
    </form>
  );
}
