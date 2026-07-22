import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ | Pressure Washing, Solar & Lights — Graham's Wash",
  description:
    "Answers on safety, pricing, service areas, soft wash vs pressure washing, solar cleaning, and permanent lights. Serving Rocklin and nearby cities.",
  alternates: { canonical: "/faq" },
};

const groups = [
  { id: "general", title: "General & service area", filter: (c: string) => c === "general" },
  { id: "pressure", title: "Pressure washing", filter: (c: string) => c === "pressure" },
  { id: "solar", title: "Solar panel cleaning", filter: (c: string) => c === "solar" },
  { id: "bins", title: "Trash bin cleaning", filter: (c: string) => c === "bins" },
  { id: "lights", title: "Permanent Christmas lights", filter: (c: string) => c === "lights" },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">FAQ</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
          Common questions
        </h1>
        <p className="mt-4 text-lg text-muted">
          Straight answers about pressure washing, solar cleaning, bins, lights, pricing, and where Graham works.
        </p>

        <div className="mt-12 space-y-12">
          {groups.map((group) => {
            const items = faqs.filter((f) => group.filter(f.category));
            if (!items.length) return null;
            return (
              <section key={group.id} id={group.id}>
                <h2 className="font-display mb-4 text-xl font-bold text-navy">{group.title}</h2>
                <FaqAccordion items={items} />
              </section>
            );
          })}
        </div>
      </div>
      <CtaBand
        title="Still have a question?"
        subtitle="Send a note through the contact form — Graham is happy to walk through your surface, timing, and budget."
      />
    </>
  );
}
