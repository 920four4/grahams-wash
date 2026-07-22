import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CtaBand({
  title = "Ready to get something cleaned?",
  subtitle = "Tell Graham what you need through the contact form. You’ll get a clear reply with next steps and timing.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-white shadow-xl shadow-brand/30 sm:px-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-navy/20 blur-2xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base text-white/85 sm:text-lg">{subtitle}</p>
          <div className="mt-7">
            <Button href="/contact" variant="dark" size="lg" className="bg-white text-brand hover:bg-white/95">
              Go to contact form
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
