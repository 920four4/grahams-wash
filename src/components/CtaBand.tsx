import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function CtaBand({
  title = "Something that needs a wash?",
  subtitle = "From driveways to solar panels to permanent lights—text Graham and get a straightforward quote.",
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
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="dark" size="lg" className="bg-white text-brand hover:bg-white/95">
              Request a quote
            </Button>
            <Button
              href={`tel:${site.phoneTel}`}
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
              icon={<Phone className="h-5 w-5" />}
            >
              {site.phoneDisplay}
            </Button>
            <Button
              href={`sms:${site.phoneTel}`}
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 sm:hidden"
              icon={<MessageCircle className="h-5 w-5" />}
            >
              Text Graham
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
