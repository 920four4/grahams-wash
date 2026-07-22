import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wider",
            light ? "text-brand" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-base leading-relaxed sm:text-lg", light ? "text-white/70" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
