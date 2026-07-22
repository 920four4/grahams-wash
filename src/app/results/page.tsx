import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ResultsGallery } from "@/components/ResultsGallery";

export const metadata: Metadata = {
  title: "Before & After Results | Solar, Driveways, Bins — Graham's Wash",
  description:
    "Interactive before and after photos from Graham's Wash in Rocklin, CA. Drag to reveal solar panel cleaning, pressure washing, trash bin cleaning, and more.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Before & After Results | Graham's Wash",
    description: "Drag the slider to see real cleaning transformations across Rocklin and Greater Sacramento.",
    images: [{ url: "/images/compare/solar-z-after.webp" }],
  },
};

export default function ResultsPage() {
  return (
    <>
      <ResultsGallery />
      <CtaBand
        title="Want results like these?"
        subtitle="Send a few details through the contact form — Graham will reply with next steps and a clear quote."
      />
    </>
  );
}
