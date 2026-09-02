import Link from "next/link";
import { Mail, MapPin, Warehouse } from "lucide-react";
import { SITE, SERVICES, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative bg-brand-ink text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900 to-brand-ink" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cedar/50 to-transparent" />

      <div className="relative container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center ring-1 ring-cedar/30">
                <Warehouse className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <span className="font-heading font-extrabold text-white text-lg leading-none">
                Barndo<span className="text-cedar-bright">Insurance</span>
              </span>
            </div>
            <p className="font-body text-sm text-white/65 leading-relaxed mb-5">
              Specialty insurance for barndominium owners &mdash; replacement cost on the steel, the
              shop and outbuildings correctly classified, and the markets standard carriers
              won&rsquo;t write. Licensed in all 50 states since 2005.
            </p>
            <div className="space-y-2.5">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 font-body text-sm text-white/65 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />{SITE.email}
              </a>
              <div className="flex items-start gap-2 font-body text-sm text-white/65">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}</span>
              </div>
            </div>
          </div>

          {/* Coverage */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-[0.14em]">Coverage</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-body text-sm text-white/65 hover:text-cedar-bright transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-[0.14em]">Company</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-white/65 hover:text-cedar-bright transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/quote" className="font-body text-sm text-cedar-bright hover:text-cedar transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-[0.14em]">Ready to Get Insured?</h3>
            <p className="font-body text-sm text-white/65 mb-4">
              Same-day barndo quotes with builders-risk-to-dwelling handled. Start your quote online.
            </p>
            <Link href="/quote" className="block w-full bg-cta text-white text-center px-4 py-3 rounded-xl font-body font-bold text-sm shadow-cta hover:bg-cta-dark transition-colors">
              Get a Free Quote
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/45 text-center md:text-left">
            © {new Date().getFullYear()} {SITE.name}. A specialty division of Contractors
            Choice Agency · NPN #{SITE.npn} · Licensed in all 50 states.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-body text-xs text-white/45 hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="font-body text-xs text-white/45 hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
