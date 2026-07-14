export function MiniChart({ color = "var(--cobalt)", className = "" }: { color?: string; className?: string }) {
  // smooth, deterministic upward curve
  const points = [4, 18, 14, 28, 22, 36, 30, 44, 38, 54, 46, 62, 58, 74, 68, 86];
  const max = 90;
  const w = 240;
  const h = 80;
  const step = w / (points.length - 1);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="mc-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#mc-fill)" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BarChart({ className = "" }: { className?: string }) {
  const bars = [38, 52, 44, 68, 58, 76, 64, 82, 72, 88, 80, 94];
  return (
    <svg viewBox="0 0 240 80" className={className} preserveAspectRatio="none">
      {bars.map((b, i) => (
        <rect
          key={i}
          x={i * 20 + 2}
          y={80 - (b / 100) * 80}
          width={14}
          height={(b / 100) * 80}
          rx={3}
          fill={i === bars.length - 1 ? "var(--cobalt)" : "color-mix(in oklab, var(--cobalt) 18%, white)"}
        />
      ))}
    </svg>
  );
}

export function Donut({ value = 72, label = "Allocation" }: { value?: number; label?: string }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} stroke="var(--hairline)" strokeWidth="6" fill="none" />
        <circle
          cx="40" cy="40" r={r}
          stroke="var(--cobalt)" strokeWidth="6" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (value / 100) * c}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-semibold text-ink">{value}%</span>
        <span className="text-[9px] uppercase tracking-wider text-subtle">{label}</span>
      </div>
    </div>
  );
}
