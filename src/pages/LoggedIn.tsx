import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Activity, Lock } from "lucide-react";
import { CandleChart } from "@/components/candle-chart";
import { Donut } from "@/components/charts";
import { ContactForm } from "@/components/contact-form";
import { useReveal } from "@/hooks/use-reveal";

export default function LoggedIn() {
  const ref = useReveal<HTMLDivElement>();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-white text-ink antialiased">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "glass" : "bg-transparent"}`}>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white">
                <span className="font-display text-sm font-semibold">L</span>
              </div>
              <span className="font-display text-base font-semibold tracking-tight text-ink">Lumen</span>
            </Link>

            {/* Nav Options */}
            <nav className="hidden items-center gap-8 md:flex">
              {[
                { label: "Our Process", href: "#process" },
                { label: "Growth Engine", href: "#growth" },
                { label: "Security", href: "#security" },
                { label: "Inquire", href: "#inquire" }
              ].map((item) => (
                <a key={item.label} href={item.href} className="group relative text-sm text-ink/80 hover:text-ink transition-colors">
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--cobalt)] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-neutral-50 transition">
                <LogOut className="h-3.5 w-3.5" /> Log out
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Welcome */}
      <section className="relative overflow-hidden bg-aurora pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center reveal">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)] mb-3">Lumen Client Portal</div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink max-w-2xl mx-auto leading-tight">
            How we protect, manage, and grow your capital.
          </h1>
          <p className="mt-4 text-base text-subtle max-w-md mx-auto">
            Review our operational framework, yield mechanisms, and asset custody reports below.
          </p>
        </div>
      </section>

      {/* Section 1: How Our Company Works */}
      <section id="process" className="py-24 border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 reveal">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--cobalt)] mb-3">Our Operations</div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight text-ink tracking-tight text-balance">
                A structured process built for absolute discipline.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-subtle">
                Lumen replaces traditional speculative trading with a systematized pipeline. We aggregate macro on-chain signals, model correlation risks under stress scenarios, and execute allocations through institutional smart routers.
              </p>
              <div className="mt-8 h-px w-48 bg-gradient-to-r from-[var(--cobalt)] to-transparent" />
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 reveal" style={{ transitionDelay: "0.15s" }}>
              {[
                {
                  step: "01",
                  title: "Signal Aggregation",
                  desc: "Our AI systems scan whale wallet movements, derivatives funding rates, and protocol growth metrics to filter noise from thesis."
                },
                {
                  step: "02",
                  title: "Risk Calibration",
                  desc: "Every potential allocation passes through a multi-factor stress modeller to verify correlations and historical drawdowns."
                },
                {
                  step: "03",
                  title: "Smart Execution",
                  desc: "Approved rebalances are routed across 12 liquidity venues simultaneously to execute order batches with minimal price impact."
                },
                {
                  step: "04",
                  title: "Reporting Attribution",
                  desc: "Every transaction, cost basis, and yield event is logged into an audit-ready dashboard to preserve full transaction provenance."
                }
              ].map((s) => (
                <div key={s.step} className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <div className="font-serif-display text-3xl italic text-[var(--cobalt)] mb-4">{s.step}</div>
                  <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-subtle">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How It Increases Amount */}
      <section id="growth" className="py-24 bg-neutral-50/50 border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 reveal order-last lg:order-first">
              <div className="rounded-3xl border border-neutral-100 bg-white p-6 md:p-8 shadow-sm">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-subtle font-medium">Compound Yield Performance</div>
                    <div className="mt-1 text-2xl font-bold text-ink">$1,284,930</div>
                  </div>
                  <span className="rounded-full bg-[var(--hover-accent)] px-2.5 py-1 text-xs font-semibold text-[var(--cobalt)]">
                    +12.4% MTD
                  </span>
                </div>
                <div className="h-44">
                  <CandleChart className="h-full w-full" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-5 text-center">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-subtle">Arbitrage Yield</div>
                    <div className="text-sm font-bold text-ink mt-0.5">4.8% APY</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-subtle">Slippage Saved</div>
                    <div className="text-sm font-bold text-ink mt-0.5">$18,420</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-subtle">Rebalance Delta</div>
                    <div className="text-sm font-bold text-ink mt-0.5">+$4,290</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 reveal" style={{ transitionDelay: "0.1s" }}>
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--cobalt)] mb-3">Yield Engine</div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight text-ink tracking-tight text-balance">
                Optimized capital compounding, driven by mathematics.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-subtle">
                Lumen increases your capital through three core systematic channels. First, our automated yield allocator puts idle capital to work in low-risk staking and validator nodes. Second, our smart routing engine minimizes execution costs (slippage), preserving returns. Third, periodic mathematical rebalancing captures volatility gains during market swings.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { title: "Liquidity Provision", desc: "Automated routing into vetted decentralized lending pools and staking vaults." },
                  { title: "Volatility Harvesting", desc: "Forced profit-taking at mathematical thresholds, reinvesting into stable assets." }
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <Activity className="h-4 w-4 text-[var(--cobalt)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                      <p className="text-xs text-subtle mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Security & Custody Architecture (Additional Section) */}
      <section id="security" className="py-24 border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 reveal">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--cobalt)] mb-3">Custody Infrastructure</div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight text-ink tracking-tight text-balance">
                State-of-the-art security, absolute control.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-subtle">
                We believe assets should never have a single point of vulnerability. Lumen employs Multi-Party Computation (MPC) cryptography to shard private keys across separate, air-gapped systems. Your credentials never exist in a single location, protecting your funds from external threats.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-between rounded-xl bg-[var(--hover-accent)] text-[var(--cobalt)] px-2.5">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">SOC 2 Type II Certified</h4>
                  <p className="text-xs text-subtle">Rigorous external security testing and audits performed annually.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="rounded-3xl border border-neutral-100 bg-[var(--ice)]/50 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-4 max-w-sm">
                  <div className="text-xs uppercase tracking-widest text-subtle font-semibold">Security Health Dashboard</div>
                  <p className="text-xs text-subtle leading-relaxed">
                    Our real-time MPC monitoring score assesses transaction validity, API signature rotations, and network security compliance parameters.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--cobalt)] anim-pulse-dot" />
                    <span className="text-[11px] font-semibold text-ink">System Guard Active</span>
                  </div>
                </div>
                <div className="shrink-0 h-24 w-24">
                  <Donut value={98} label="MPC" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Contact Form */}
      <section id="inquire" className="py-24 bg-neutral-50/50 border-t border-neutral-100 reveal">
        <div className="mx-auto max-w-xl px-6">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--cobalt)] mb-2">Direct Inquiry</div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink">Speak with our analysts</h2>
            <p className="mt-2 text-sm text-subtle">Submit your query below. Our compliance and investment specialists generally reply within 12 hours.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-100 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-subtle">
          <div>© {new Date().getFullYear()} Lumen Capital Technologies, Inc. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ink transition-colors">Terms & Conditions</Link>
            <a href="#" className="hover:text-ink transition-colors">Disclosures</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
