import { cn } from "@/lib/utils";

/**
 * Clean menu toggle: three bold rounded strokes → X.
 * CSS transforms on the paths can be flaky in Safari; use a simple flex layout instead.
 */
export function MenuToggleIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <span
      className={cn("relative block h-[18px] w-[22px]", className)}
      aria-hidden
    >
      <span
        className={cn(
          "absolute left-0 block h-[2.5px] w-full rounded-full bg-current transition-all duration-300 ease-out",
          open ? "top-[7.75px] rotate-45" : "top-0 rotate-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-[7.75px] block h-[2.5px] w-full rounded-full bg-current transition-all duration-200 ease-out",
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-[2.5px] w-full rounded-full bg-current transition-all duration-300 ease-out",
          open ? "top-[7.75px] -rotate-45" : "top-[15.5px] rotate-0",
        )}
      />
    </span>
  );
}
