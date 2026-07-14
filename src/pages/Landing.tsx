import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, ArrowRight, ShieldCheck, LineChart, Bell,
  Brain, BarChart3, FileText,
} from "lucide-react";
import { HeroDashboard } from "@/components/hero-dashboard";
import { MiniChart, Donut } from "@/components/charts";
import { useReveal } from "@/hooks/use-reveal";
import { AuthModal } from "@/components/auth-modal";
import { ContactForm } from "@/components/contact-form";

type AuthMode = "signin" | "signup";

/* ------------------------- Custom cursor ------------------------- */
function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, dx = 0, dy = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,[data-cursor='hover']");
      if (ring.current) {
        ring.current.style.width = interactive ? "56px" : "28px";
        ring.current.style.height = interactive ? "56px" : "28px";
        ring.current.style.borderColor = interactive ? "var(--cobalt)" : "color-mix(in oklab, var(--ink) 30%, transparent)";
      }
    };
    let raf = 0;
    const loop = () => {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      dx += (tx - dx) * 0.55; dy += (ty - dy) * 0.55;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (dot.current) dot.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block rounded-full border transition-[width,height,border-color] duration-300" style={{ width: 28, height: 28, mixBlendMode: "difference" as never }} />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block h-1 w-1 rounded-full bg-[var(--cobalt)]" />
    </>
  );
}

/* ------------------------- Nav ------------------------- */
function Nav({ onAuth }: { onAuth: (m: AuthMode) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "glass" : "bg-transparent"}`}>
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white">
              <span className="font-display text-sm font-semibold">L</span>
            </div>
            <span className="font-display text-base font-semibold tracking-tight text-ink">Lumen</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {["Product", "Intelligence", "Pricing", "Research", "Contact"].map((l) => {
              let href = "#";
              let onClick: (() => void) | undefined = undefined;
              if (l === "Product") href = "#features";
              else if (l === "Intelligence") href = "#intelligence";
              else if (l === "Contact") href = "#contact";
              else onClick = () => onAuth("signup");
              
              return (
                <a key={l} href={href} onClick={onClick} className="group relative text-sm text-ink/80 hover:text-ink transition-colors">
                  {l}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--cobalt)] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => onAuth("signin")} className="hidden md:inline-flex text-sm text-ink/80 hover:text-ink">Sign in</button>
            <button onClick={() => onAuth("signup")} className="magnetic-btn inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
              Get access <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------- SplitLine ------------------------- */
function SplitLine({ words, delay = 0, wordClassName }: { words: string[]; delay?: number; wordClassName?: (i: number) => string }) {
  return (
    <span className="block">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pr-[0.25em] pb-[0.18em] -mb-[0.18em] align-bottom">
          <span className={`inline-block ${wordClassName?.(i) ?? ""}`} style={{ animationDelay: `${delay + i * 0.07}s`, animationName: "rise-in", animationDuration: "0.9s", animationTimingFunction: "cubic-bezier(.2,.8,.2,1)", animationFillMode: "both" }}>
            {w}
          </span>
        </span>
      ))}
      <style>{`@keyframes rise-in { from { transform: translateY(110%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </span>
  );
}

/* ------------------------- Hero ------------------------- */
function Hero({ onAuth }: { onAuth: (m: AuthMode) => void }) {
  const ref = useReveal<HTMLDivElement>();
  const dashRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = dashRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(0)`;
    };
    const onLeave = () => { el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)"; };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  const line1 = ["Intelligent", "crypto"];
  const line2 = ["investing,", "engineered"];
  const line3 = ["for", "the", "long", "view."];
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-aurora pt-28 pb-20 flex items-center">
      <div className="absolute inset-0 bg-grid-faint opacity-60" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[color-mix(in_oklab,var(--cobalt)_22%,transparent)] blur-3xl anim-float-slow" />
      <div className="pointer-events-none absolute top-40 right-0 h-[360px] w-[360px] rounded-full bg-[color-mix(in_oklab,var(--sky-accent)_28%,transparent)] blur-3xl anim-float-tiny" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border hairline bg-white/60 px-3 py-1 text-xs text-ink/80 backdrop-blur reveal is-visible">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--cobalt)] anim-pulse-dot" />
            New · Lumen Research v3 is live
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink text-balance">
            <SplitLine words={line1} delay={0.15} />
            <SplitLine words={line2} delay={0.35} />
            <SplitLine words={line3} delay={0.55} wordClassName={(i) => (i === 2 ? "font-serif-display italic text-[var(--cobalt)]" : "")} />
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-subtle reveal" style={{ transitionDelay: "0.7s" }}>
            Lumen pairs institutional-grade research with AI-driven portfolio intelligence - so your capital compounds with the calm of a thesis, not the noise of the feed.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 reveal" style={{ transitionDelay: "0.85s" }}>
            <button onClick={() => onAuth("signup")} className="magnetic-btn group inline-flex items-center gap-2 rounded-full bg-[var(--cobalt)] px-6 py-3.5 text-sm font-medium text-white">
              Open an account <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a href="#features" className="magnetic-btn inline-flex items-center gap-2 rounded-full border hairline bg-white px-6 py-3.5 text-sm font-medium text-ink hover:bg-[var(--ice)]">
              Explore the platform
            </a>
          </div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 reveal" style={{ transitionDelay: "1s" }}>
            {[{ v: "SOC 2", l: "Type II Certified" }, { v: "$1.4B", l: "Assets Tracked" }, { v: "24/7", l: "AI Monitoring" }].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-medium text-ink">{s.v}</div>
                <div className="mt-0.5 text-xs text-subtle">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 h-px w-48 origin-left bg-gradient-to-r from-[var(--cobalt)] to-transparent anim-draw-line" />
        </div>
        <div className="relative lg:col-span-5 lg:-mt-20">
          <div ref={dashRef} className="transition-transform duration-300 will-change-transform">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Logo ticker ------------------------- */
function LogoTicker() {
  const items = ["Coinbase", "Fidelity", "Galaxy", "BlackRock", "Bitwise", "Pantera", "Paradigm", "a16z crypto", "Jump", "Wintermute"];
  const row = [...items, ...items];
  return (
    <section className="border-y hairline bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center text-xs uppercase tracking-[0.25em] text-subtle">Trusted by allocators at</div>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-14 anim-ticker">
            {row.map((n, i) => (
              <span key={i} className="font-display text-xl font-medium tracking-tight text-ink/60 whitespace-nowrap">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Features ------------------------- */
function Features() {
  const ref = useReveal<HTMLDivElement>();
  const items = [
    { icon: Brain, title: "AI Investment Insights", desc: "Models trained on a decade of on-chain and macro data surface theses you can actually act on." },
    { icon: LineChart, title: "Portfolio Analytics", desc: "Beautiful, real-time dashboards across exchanges, wallets, and DeFi positions." },
    { icon: Bell, title: "Smart Alerts", desc: "Context-aware notifications - only what matters, never the noise." },
    { icon: ShieldCheck, title: "Blockchain Security", desc: "Multi-sig, MPC custody, and continuous wallet hygiene scoring." },
    { icon: BarChart3, title: "Market Intelligence", desc: "Sentiment, flows, derivatives, and liquidity in a single coherent view." },
    { icon: FileText, title: "Automated Reports", desc: "Investor-grade PDFs and tax-ready summaries generated on schedule." },
  ];
  return (
    <section id="features" ref={ref} className="relative bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl reveal">
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)]">Platform</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink text-balance">
              A complete investment <span className="font-serif-display italic text-[var(--cobalt)]">studio</span>, not another dashboard.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-subtle reveal">
            Every workflow a serious investor needs - research, execution, risk, reporting - unified under one calm, deliberate interface.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-[var(--hairline)] ring-hairline md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div key={it.title} className="reveal group relative bg-white p-8 transition-colors duration-300 hover:bg-[var(--ice)]" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--hover-accent)] text-[var(--cobalt)] transition-transform duration-500 group-hover:-translate-y-1">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">{it.desc}</p>
              <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-subtle opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Stacked cards ------------------------- */
function StackedCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -r.top / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const cards = [
    { tag: "Research", title: "Theses, written by AI analysts.", body: "Lumen Research distills hundreds of sources daily into bull, base, and bear cases with cited evidence.", accent: "BTC dominance · macro · ETF flows" },
    { tag: "Execution", title: "Rebalance with one decision.", body: "Apply target allocations across venues with smart routing and slippage caps you control.", accent: "Smart routing · 12 venues" },
    { tag: "Risk", title: "See the trade before you take it.", body: "Pre-trade scenarios, correlation maps, and drawdown projections rendered in real time.", accent: "VaR · stress · correlation" },
    { tag: "Reporting", title: "Compliance, quietly handled.", body: "Audit-ready statements, performance attribution, and tax lots - generated on your schedule.", accent: "PDF · CSV · API" },
  ];
  const n = cards.length;
  return (
    <section id="intelligence" ref={ref} className="relative bg-[var(--ice)]" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)]">A workflow that flows</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink text-balance">
              From thesis to <span className="font-serif-display italic text-[var(--cobalt)]">execution</span>, without the seams.
            </h2>
            <p className="mt-5 max-w-md text-subtle">Scroll through the workflow. Each step builds on the last.</p>
            <div className="mt-8 flex gap-2">
              {cards.map((_, i) => (
                <div key={i} className="h-0.5 w-10 overflow-hidden rounded-full bg-[var(--hairline)]">
                  <div className="h-full bg-[var(--cobalt)] transition-all duration-500" style={{ width: progress * n > i ? "100%" : progress * n > i - 1 ? `${(progress * n - (i - 1)) * 100}%` : "0%" }} />
                </div>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-7 h-[440px]">
            {cards.map((c, i) => {
              const local = Math.min(Math.max(progress * n - i, 0), 1.6);
              const out = Math.max(local - 1, 0);
              return (
                <div key={i} className="absolute inset-0 rounded-3xl bg-white ring-hairline p-10 transition-[transform,opacity] duration-500 ease-out" style={{ transform: `translateY(${-out * 60 + Math.max(0, 1 - local) * 30}px) scale(${1 - out * 0.08})`, opacity: local > 1.5 ? 0 : 1, zIndex: n - i, boxShadow: "var(--shadow-floating)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)]">{c.tag}</span>
                    <span className="text-xs text-subtle">0{i + 1} / 0{n}</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-medium leading-tight tracking-tight text-ink text-balance">{c.title}</h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-subtle">{c.body}</p>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl border hairline p-4">
                      <div className="text-[10px] uppercase tracking-widest text-subtle">Confidence</div>
                      <Donut value={[72, 86, 64, 91][i]} label="Score" />
                    </div>
                    <div className="rounded-2xl border hairline p-4 col-span-2">
                      <div className="text-[10px] uppercase tracking-widest text-subtle">{c.accent}</div>
                      <div className="mt-3 h-20"><MiniChart className="h-full w-full" /></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}







/* ------------------------- Contact section ------------------------- */
function ContactSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contact" ref={ref} className="bg-[var(--ice)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">
          <div className="reveal">
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)]">Get in touch</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink text-balance">
              Let's talk about your <span className="font-serif-display italic text-[var(--cobalt)]">investment goals</span>.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-subtle">
              Whether you're looking to get started with crypto investing or want to learn more about Lumen's platform, our team is ready to help.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { t: "Institutional-grade research", d: "Access AI-powered investment insights" },
                { t: "Portfolio management", d: "Manage assets across all venues" },
                { t: "Risk analytics", d: "Understand and control your exposure" },
              ].map((f) => (
                <div key={f.t} className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--hover-accent)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--cobalt)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{f.t}</div>
                    <div className="text-xs text-subtle">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Footer ------------------------- */
function Footer() {
  const cols = [
    { h: "Product", links: ["Platform", "Intelligence", "Research", "Security", "Pricing"] },
    { h: "Company", links: ["About", "Customers", "Careers", "Press", "Contact"] },
    { h: "Resources", links: ["Documentation", "API", "Status", "Changelog", "Brand"] },
  ];
  return (
    <footer className="bg-white border-t hairline">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-white">
                <span className="font-display text-sm font-semibold">L</span>
              </div>
              <span className="font-display text-lg font-semibold text-ink">Lumen</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-subtle">
              Institutional-grade AI research, portfolio analytics, and automated investment intelligence.
            </p>

          </div>
          {cols.map((c) => (
            <div key={c.h} className="lg:col-span-2">
              <div className="text-xs uppercase tracking-[0.2em] text-subtle">{c.h}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}><a className="text-sm text-ink/80 hover:text-[var(--cobalt)] transition-colors" href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t hairline pt-8 md:flex-row md:items-center">
          <div className="text-xs text-subtle">© {new Date().getFullYear()} Lumen Capital Technologies, Inc. All rights reserved.</div>
          <div className="flex items-center gap-5 text-xs text-subtle">
            <Link to="/privacy-policy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ink transition-colors">Terms & Conditions</Link>
            <a href="#" className="hover:text-ink transition-colors">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------- Page ------------------------- */
export default function Landing() {
  const [auth, setAuth] = useState<{ open: boolean; mode: AuthMode }>({ open: false, mode: "signin" });
  const openAuth = (mode: AuthMode) => setAuth({ open: true, mode });
  return (
    <div className="relative bg-white text-ink antialiased">
      <CustomCursor />
      <Nav onAuth={openAuth} />
      <main>
        <Hero onAuth={openAuth} />
        <LogoTicker />
        <Features />
        <StackedCards />
        <ContactSection />
      </main>
      <Footer />
      <AuthModal open={auth.open} mode={auth.mode} onClose={() => setAuth((s) => ({ ...s, open: false }))} onSwitch={(m) => setAuth({ open: true, mode: m })} />
    </div>
  );
}
