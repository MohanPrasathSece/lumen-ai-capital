import { useEffect, useRef } from "react";

// Animated candlestick chart — bars drift upward and a new candle prints periodically
export function CandleChart({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";

    const W = 320;
    const H = 120;
    const COUNT = 22;
    const GAP = 4;
    const cw = (W - GAP * (COUNT - 1)) / COUNT;

    // Generate a smooth-ish random walk
    let price = 50;
    type Candle = { o: number; h: number; l: number; c: number };
    const candles: Candle[] = [];
    for (let i = 0; i < COUNT; i++) {
      const drift = (Math.random() - 0.45) * 6;
      const o = price;
      const c = Math.max(8, Math.min(H - 8, o + drift));
      const h = Math.max(o, c) + Math.random() * 4;
      const l = Math.min(o, c) - Math.random() * 4;
      candles.push({ o, h, l, c });
      price = c;
    }

    svg.innerHTML = "";
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    // grid baseline
    const baseline = document.createElementNS(NS, "line");
    baseline.setAttribute("x1", "0"); baseline.setAttribute("x2", String(W));
    baseline.setAttribute("y1", String(H - 1)); baseline.setAttribute("y2", String(H - 1));
    baseline.setAttribute("stroke", "var(--hairline)");
    baseline.setAttribute("stroke-width", "1");
    svg.appendChild(baseline);

    const groups: SVGGElement[] = [];

    const drawCandle = (i: number, cd: Candle) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("transform", `translate(${i * (cw + GAP)}, 0)`);
      const up = cd.c <= cd.o; // svg y is inverted: lower y = higher price
      const color = up ? "var(--cobalt)" : "color-mix(in oklab, var(--cobalt) 25%, white)";
      // wick
      const wick = document.createElementNS(NS, "line");
      wick.setAttribute("x1", String(cw / 2));
      wick.setAttribute("x2", String(cw / 2));
      wick.setAttribute("y1", String(cd.h));
      wick.setAttribute("y2", String(cd.l));
      wick.setAttribute("stroke", color);
      wick.setAttribute("stroke-width", "1");
      g.appendChild(wick);
      // body
      const body = document.createElementNS(NS, "rect");
      const top = Math.min(cd.o, cd.c);
      const h = Math.max(1.5, Math.abs(cd.c - cd.o));
      body.setAttribute("x", "0");
      body.setAttribute("y", String(top));
      body.setAttribute("width", String(cw));
      body.setAttribute("height", String(h));
      body.setAttribute("rx", "1.5");
      body.setAttribute("fill", color);
      g.appendChild(body);
      return g;
    };

    candles.forEach((cd, i) => {
      const g = drawCandle(i, cd);
      svg.appendChild(g);
      groups.push(g);
    });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last > 1400) {
        last = now;
        // shift left
        const first = groups.shift();
        first?.remove();
        candles.shift();
        groups.forEach((g, i) => {
          g.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1)";
          g.setAttribute("transform", `translate(${i * (cw + GAP)}, 0)`);
        });
        // new candle
        const last2 = candles[candles.length - 1];
        const o = last2.c;
        const drift = (Math.random() - 0.45) * 8;
        const c = Math.max(8, Math.min(H - 8, o + drift));
        const h = Math.max(o, c) + Math.random() * 5;
        const l = Math.min(o, c) - Math.random() * 5;
        const cd: Candle = { o, h, l, c };
        candles.push(cd);
        const ng = drawCandle(COUNT - 1, cd);
        ng.style.opacity = "0";
        ng.style.transition = "opacity 0.5s ease";
        svg.appendChild(ng);
        requestAnimationFrame(() => { ng.style.opacity = "1"; });
        groups.push(ng);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <svg ref={ref} className={className} preserveAspectRatio="none" />;
}
