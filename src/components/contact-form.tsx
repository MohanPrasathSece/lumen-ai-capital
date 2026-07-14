import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/crm";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/countries";
import { CountrySelector } from "./country-selector";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string(),
  phone: z.string(),
  message: z.string().optional(),
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

type FormData = z.infer<typeof schema>;

export function ContactForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittedKey = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { countryCode: "CH" } });
  const countryCode = watch("countryCode") || "CH";

  const onSubmit = async (data: FormData) => {
    // Prevent duplicate submissions with same email
    const key = data.email.toLowerCase();
    if (submittedKey.current === key) return;

    setStatus("loading");
    setErrorMessage("");

    const result = await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      countryCode: data.countryCode,
      message: data.message,
      leadType: "contact",
    });

    if (result.success) {
      submittedKey.current = key;
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      if (result.error === "ALREADY_EXISTS") {
        setErrorMessage("You have already contacted us.");
      } else {
        setErrorMessage("Please verify that all fields are filled out correctly and try again.");
      }
    }
  };

  if (status === "success") {
    return (
      <div className={`rounded-3xl border hairline bg-white p-10 text-center ${className}`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--hover-accent)]">
          <CheckCircle className="h-7 w-7 text-[var(--cobalt)]" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">
          Enquiry received
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-subtle">
          Thank you for reaching out. Our team will be in touch with you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[var(--cobalt)] hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`rounded-3xl border hairline bg-white p-8 space-y-4 ${className}`}
    >
      {/* Name */}
      <div>
        <label className="block text-xs font-medium text-subtle mb-1.5" htmlFor="contact-name">
          Full Name <span className="text-[var(--cobalt)]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          {...register("name")}
          className="w-full rounded-2xl border hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-[var(--cobalt)]/20 focus:border-[var(--cobalt)]/40 transition"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-subtle mb-1.5" htmlFor="contact-email">
          Email Address <span className="text-[var(--cobalt)]">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@firm.com"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-2xl border hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-[var(--cobalt)]/20 focus:border-[var(--cobalt)]/40 transition"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-medium text-subtle mb-1.5" htmlFor="contact-phone">
          Phone Number <span className="text-[var(--cobalt)]">*</span>
        </label>
        
<div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center' }}>
    <input type="hidden" {...register("countryCode")} />
    <CountrySelector value={countryCode} onChange={(val) => setValue("countryCode", val, { shouldValidate: true })} />
<input
          id="contact-phone"
          type="tel"
          placeholder="+1 555 000 0000"
          autoComplete="tel"
          {...register("phone")}
          className="w-full rounded-2xl border hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-[var(--cobalt)]/20 focus:border-[var(--cobalt)]/40 transition"
         style={{ flex: 1 }} />
</div>
        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Message (optional) */}
      <div>
        <label className="block text-xs font-medium text-subtle mb-1.5" htmlFor="contact-message">
          Message <span className="text-subtle/60">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Tell us about your investment goals or any questions you have..."
          {...register("message")}
          className="w-full rounded-2xl border hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-[var(--cobalt)]/20 focus:border-[var(--cobalt)]/40 transition resize-none"
        />
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-600">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="magnetic-btn w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--cobalt)] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Send Enquiry
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-subtle">
        By submitting this form you agree to our{" "}
        <a href="/privacy-policy" className="text-[var(--cobalt)] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
