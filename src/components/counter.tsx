import { useState } from "react";

export function Counter({ to, duration = 2000, prefix = "", suffix = "", decimals = 0 }: {
  to: number; duration?: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = (node: HTMLSpanElement | null) => {
    if (!node || started) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setStarted(true);
        const start = performance.now();
        const animate = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(node);
  };
  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  });
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}
