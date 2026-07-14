import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/countries";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCountry = COUNTRY_PHONE_PATTERNS[value] || { flag: "🇨🇭", dial: "+41" };

  return (
    <div ref={containerRef} className="relative" style={{ width: "110px" }}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between gap-1 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 text-sm text-ink hover:bg-neutral-100/50 transition focus:outline-none focus:ring-2 focus:ring-[var(--cobalt)]/20 focus:border-[var(--cobalt)]/40"
        style={{ cursor: "pointer" }}
      >
        <span className="truncate">
          {activeCountry.flag} {activeCountry.dial}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Downward Dropdown List */}
      {isOpen && (
        <div
          className="absolute left-0 top-full z-[300] mt-1.5 w-[150px] max-h-64 overflow-y-auto rounded-2xl border border-neutral-100 bg-white p-1.5 shadow-xl transition-all"
          style={{ animation: "slide-down 0.15s ease-out" }}
        >
          {Object.entries(COUNTRY_PHONE_PATTERNS).map(([code, info]) => {
            const isSelected = code === value;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  onChange(code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[var(--hover-accent)] text-[var(--cobalt)] font-medium"
                    : "text-ink hover:bg-neutral-50"
                }`}
                style={{ cursor: "pointer" }}
              >
                <span className="text-base">{info.flag}</span>
                <span className="flex-1 truncate text-ink">{info.dial}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
