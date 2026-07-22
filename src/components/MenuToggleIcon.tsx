import { cn } from "@/lib/utils";

/**
 * Brand menu toggle: three "pressure-wash" strokes with a tiny droplet.
 * Reads as a hamburger when closed; morphs into a clean X when open.
 */
export function MenuToggleIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <span
      className={cn("relative inline-flex h-6 w-6 items-center justify-center", className)}
      aria-hidden
    >
      {/* Top stroke → / arm of X */}
      <span
        className={cn(
          "absolute left-1/2 h-[2.5px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[5px] rotate-0",
        )}
      />
      {/* Middle stroke + droplet (hides when open) */}
      <span
        className={cn(
          "absolute left-1/2 top-1/2 flex h-[2.5px] w-[18px] -translate-x-1/2 -translate-y-1/2 items-center transition-all duration-200",
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
        )}
      >
        <span className="h-full w-full rounded-full bg-current" />
        {/* Water droplet tip on the right of the middle stroke */}
        <span
          className={cn(
            "absolute -right-0.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand transition-transform duration-300",
            open ? "scale-0" : "scale-100",
          )}
          style={{
            borderRadius: "50% 50% 50% 0",
            transform: open
              ? "translateY(-50%) rotate(-45deg) scale(0)"
              : "translateY(-50%) rotate(-45deg) scale(1)",
          }}
        />
      </span>
      {/* Bottom stroke → \ arm of X */}
      <span
        className={cn(
          "absolute left-1/2 h-[2.5px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[16.5px] rotate-0",
        )}
      />
    </span>
  );
}
