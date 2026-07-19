import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ArrowRight, Mail, User, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/crm";
import { useNavigate } from "react-router-dom";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/countries";
import { CountrySelector } from "./country-selector";
import { apiSignup, apiSignin } from "@/lib/authApi";

type Mode = "signin" | "signup";

/* ---------- Schemas ---------- */
const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string(),
  phone: z.string(),
}).superRefine((val, ctx) => {
  const cleanNum = val.phone.replace(/[\s-]/g, "");
  if (!cleanNum) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Veuillez entrer un numéro de téléphone",
      path: ["phone"],
    });
    return;
  }
  const country = COUNTRY_PHONE_PATTERNS[val.countryCode];
  if (country && !country.pattern.test(cleanNum)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Format invalide (ex: ${country.example})`,
      path: ["phone"],
    });
  }
});

type SigninData = z.infer<typeof signinSchema>;
type SignupData = z.infer<typeof signupSchema>;

/* ---------- Modal ---------- */
export function AuthModal({
  open,
  mode,
  onClose,
  onSwitch,
}: {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onSwitch: (m: Mode) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted && !open) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center px-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onTransitionEnd={() => {
        if (!open) setMounted(false);
      }}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" onClick={onClose} />
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-3xl bg-white ring-hairline transition-all duration-500 ${
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
        style={{ boxShadow: "var(--shadow-floating)" }}
      >
        {/* macOS-style top bar */}
        <div className="relative flex items-center border-b hairline px-4 py-3">
          <div className="flex gap-1.5">
            <button
              onClick={onClose}
              aria-label="Close"
              className="group h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/5 hover:brightness-90"
            />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/5" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/5" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-subtle">
            themarketvault.app - {mode === "signin" ? "Sign in" : "Create account"}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-full p-1 text-subtle hover:bg-[var(--ice)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="px-8 pt-8 pb-7">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--cobalt)]">
            {mode === "signin" ? "Welcome back" : "Get started"}
          </div>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink">
            {mode === "signin" ? (
              <>
                Sign in to <span className="font-serif-display italic">The Market Vault</span>.
              </>
            ) : (
              <>
                Create your <span className="font-serif-display italic">The Market Vault</span> account.
              </>
            )}
          </h2>

          {mode === "signin" ? (
            <SigninForm onSuccess={() => { onClose(); navigate("/dashboard"); }} />
          ) : (
            <SignupForm onSuccess={() => { onClose(); navigate("/dashboard"); }} />
          )}

          <p className="mt-6 text-center text-xs text-subtle">
            {mode === "signin" ? "New to The Market Vault? " : "Already have an account? "}
            <button
              onClick={() => onSwitch(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-[var(--cobalt)] hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sign In Form (email only - auth only, no CRM) ---------- */
function SigninForm({ onSuccess }: { onSuccess: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninData) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      await apiSignin({ email: data.email });
      setStatus("idle");
      onSuccess();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An error occurred during sign in.");
    }
  };

  return (
    <form className="mt-7 space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label className="flex items-center gap-3 rounded-2xl border hairline bg-white px-4 py-3 transition focus-within:ring-2 focus-within:ring-[var(--cobalt)]/20 focus-within:border-[var(--cobalt)]/40">
          <Mail className="h-4 w-4 text-subtle shrink-0" />
          <input
            type="email"
            placeholder="you@firm.com"
            autoComplete="email"
            {...register("email")}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
          />
        </label>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="magnetic-btn mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--cobalt)] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>
        ) : (
          <>Sign in <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </form>
  );
}

/* ---------- Sign Up Form (name + email + phone → CRM) ---------- */
function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittedRef = useRef<string | null>(null);

  const [modalTimer, setModalTimer] = useState("10:00");

  useEffect(() => {
    const key = "market_vault_modal_timer";
    const getTargetTime = () => {
      const stored = sessionStorage.getItem(key);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (parsed > Date.now()) return parsed;
      }
      const newTarget = Date.now() + 10 * 60 * 1000;
      sessionStorage.setItem(key, newTarget.toString());
      return newTarget;
    };

    let targetTime = getTargetTime();

    const updateTimer = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        const newTarget = Date.now() + 10 * 60 * 1000;
        sessionStorage.setItem(key, newTarget.toString());
        targetTime = newTarget;
      }
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setModalTimer(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { countryCode: "CH" }
  });
  const countryCode = watch("countryCode") || "CH";

  const onSubmit = async (data: SignupData) => {
    const key = data.email.toLowerCase();
    if (submittedRef.current === key) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // 1. Persist user in Vercel Blob
      await apiSignup({
        name: data.name,
        email: data.email,
        phone: data.phone,
        countryCode: data.countryCode,
      });

      // 2. Submit lead to CRM
      await submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        countryCode: data.countryCode,
        leadType: "signup",
      });

      submittedRef.current = key;
      setStatus("success");
      setTimeout(onSuccess, 1200);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Please verify that all fields are filled out correctly and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-7 text-center py-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--hover-accent)]">
          <CheckCircle className="h-6 w-6 text-[var(--cobalt)]" />
        </div>
        <p className="mt-4 text-sm font-medium text-ink">Account created - taking you in…</p>
      </div>
    );
  }

  return (
    <form className="mt-7 space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/50 p-3.5 text-xs text-amber-800">
        <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 anim-pulse-dot shrink-0" />
        <div>
          <strong>Urgent:</strong> Your invitation space is temporarily held. Complete registration within <span className="font-mono font-bold underline">{modalTimer}</span> to secure slot #07 of this cycle.
        </div>
      </div>
      <div>
        <label className="flex items-center gap-3 rounded-2xl border hairline bg-white px-4 py-3 transition focus-within:ring-2 focus-within:ring-[var(--cobalt)]/20 focus-within:border-[var(--cobalt)]/40">
          <User className="h-4 w-4 text-subtle shrink-0" />
          <input
            type="text"
            placeholder="Full name"
            autoComplete="name"
            {...register("name")}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
          />
        </label>
        {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="flex items-center gap-3 rounded-2xl border hairline bg-white px-4 py-3 transition focus-within:ring-2 focus-within:ring-[var(--cobalt)]/20 focus-within:border-[var(--cobalt)]/40">
          <Mail className="h-4 w-4 text-subtle shrink-0" />
          <input
            type="email"
            placeholder="you@firm.com"
            autoComplete="email"
            {...register("email")}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
          />
        </label>
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="flex items-center gap-3 rounded-2xl border hairline bg-white px-4 py-3 transition focus-within:ring-2 focus-within:ring-[var(--cobalt)]/20 focus-within:border-[var(--cobalt)]/40">
          <Phone className="h-4 w-4 text-subtle shrink-0" />
          
<div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center' }}>
    <input type="hidden" {...register("countryCode")} />
    <CountrySelector value={countryCode} onChange={(val) => setValue("countryCode", val, { shouldValidate: true })} />
<input
            type="tel"
            placeholder="+1 555 000 0000"
            autoComplete="tel"
            {...register("phone")}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
           style={{ flex: 1 }} />
</div>
        </label>
        {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-600">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="magnetic-btn mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--cobalt)] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</>
        ) : (
          <>Create account <ArrowRight className="h-4 w-4" /></>
        )}
      </button>

      <p className="text-center text-[11px] text-subtle">
        By creating an account you agree to our{" "}
        <a href="/terms" className="text-[var(--cobalt)] hover:underline">Terms</a>{" "}
        and{" "}
        <a href="/privacy-policy" className="text-[var(--cobalt)] hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
