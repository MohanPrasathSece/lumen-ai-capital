import { CandleChart } from "./candle-chart";
import { TrendingUp } from "lucide-react";

export function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* Minimal dashboard card */}
      <div
        className="relative rounded-3xl bg-white border border-neutral-100 overflow-hidden"
        style={{ boxShadow: "var(--shadow-floating)" }}
      >
        {/* macOS-style title bar */}
        <div className="relative flex items-center border-b border-neutral-100 px-5 py-3 bg-neutral-50/50">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--cobalt)] anim-pulse-dot" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">Live Signal</span>
          </div>
        </div>

        {/* Minimal balance & chart */}
        <div className="p-8">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Net Asset Value</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="font-display text-4xl font-semibold tracking-tight text-ink">$1,284,930</div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[var(--hover-accent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--cobalt)]">
              <TrendingUp className="h-3.5 w-3.5" /> +12.4%
            </div>
          </div>
          <div className="mt-8 h-28">
            <CandleChart className="h-full w-full opacity-85" />
          </div>
        </div>
      </div>
    </div>
  );
}
