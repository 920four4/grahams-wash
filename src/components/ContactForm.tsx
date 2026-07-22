"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { services, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const serviceOptions = [
  { value: "pressure-washing", label: "Hot Pressure Washing" },
  { value: "solar-panel-cleaning", label: "Solar Panel Cleaning" },
  { value: "trash-bin-cleaning", label: "Garbage Bin Cleaning" },
  { value: "permanent-christmas-lights", label: "Permanent Christmas Lights" },
  { value: "multiple", label: "Multiple services / not sure" },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  preferredContact: "call" | "text" | "email";
  message: string;
  website: string; // honeypot
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  preferredContact: "text",
  message: "",
  website: "",
};

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [form, setForm] = useState<FormState>({
    ...initial,
    service: defaultService && services.some((s) => s.slug === defaultService) ? defaultService : defaultService || "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please call or text instead.");
      }
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send. Please call or text Graham.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-success/20 bg-success/5 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display mt-4 text-2xl font-bold text-navy">Got it — talk soon!</h3>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Graham will reach out using your preferred method. Need something faster? Call or text{" "}
          <a href={`tel:${site.phoneTel}`} className="font-semibold text-brand">
            {site.phoneDisplay}
          </a>
          .
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-[15px] text-navy placeholder:text-muted/60 transition focus:border-brand";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-semibold text-navy">Name *</span>
          <input
            required
            name="name"
            autoComplete="name"
            className={field}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">Phone *</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(916) 555-0123"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@email.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">City *</span>
          <input
            required
            name="city"
            autoComplete="address-level2"
            className={field}
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Rocklin, Roseville…"
          />
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-navy">What do you need? *</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceOptions.map((opt) => {
            const selected = form.service === opt.value;
            return (
              <label
                key={opt.value}
                className={cn(
                  "pressable flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium transition",
                  selected
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-border bg-white text-navy hover:border-brand/30",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={opt.value}
                  required
                  checked={selected}
                  onChange={() => update("service", opt.value)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    selected ? "border-brand" : "border-muted/40",
                  )}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-brand" />}
                </span>
                {opt.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-navy">Preferred contact</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { value: "text", label: "Text me" },
              { value: "call", label: "Call me" },
              { value: "email", label: "Email me" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("preferredContact", opt.value)}
              className={cn(
                "pressable rounded-full px-4 py-2 text-sm font-semibold transition",
                form.preferredContact === opt.value
                  ? "bg-navy text-white"
                  : "bg-white text-muted ring-1 ring-border hover:text-navy",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">Tell Graham about the job</span>
        <textarea
          name="message"
          rows={4}
          className={cn(field, "resize-y min-h-[120px]")}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Driveway oil stains, solar panels, number of bins, 2-story lights… anything that helps quote faster."
        />
      </label>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send to Graham
          </>
        )}
      </Button>
      <p className="text-xs text-muted">
        Prefer not to wait? Call or text{" "}
        <a href={`tel:${site.phoneTel}`} className="font-semibold text-brand">
          {site.phoneDisplay}
        </a>{" "}
        anytime.
      </p>
    </form>
  );
}
